import { Router } from "express";
import { Types } from "mongoose";
import { z } from "zod";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";
import { Registration } from "../models/Registration.js";
import type { RegistrationTeammate } from "../models/Registration.js";
import { PrequalifierSubmission } from "../models/PrequalifierSubmission.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { requireAuth, requireUserId } from "../middleware/auth.js";
import { serializeEvent, serializeRegistration } from "../utils/serializers.js";
import { uploadPpt, uploadPaymentScreenshot } from "../utils/upload.js";
import { sendPrequalifierConfirmationEmail } from "../utils/mailer.js";

const router = Router();

// UPI transaction reference numbers (UTR/RRN) are always a 12-digit number.
const UPI_REFERENCE_REGEX = /^\d{12}$/;

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const events = await Event.find().sort({ createdAt: 1 });
    res.json({ events: events.map(serializeEvent) });
  }),
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const slug = String(req.params.slug).toLowerCase();
    const event = await Event.findOne({ slug });
    if (!event) throw new ApiError(404, "Event not found.");
    res.json({ event: serializeEvent(event) });
  }),
);

const registerSchema = z.object({
  teamName: z.string().trim().max(120).optional(),
  // Teammates are identified by their existing Porikkalam username — they
  // must already hold an account; one is never created on their behalf here.
  // Arrives as a JSON-encoded array string since this is a multipart form body.
  teammateUsernames: z.string().trim().optional(),
  paymentReference: z
    .string()
    .trim()
    .regex(UPI_REFERENCE_REGEX, "Enter a valid 12-digit UPI transaction reference ID.")
    .optional(),
});

// The participant's profile (name, email, phone, college, department, year)
// is never re-collected here — it's read straight off the existing User
// record so the same profile carries into every event the participant joins.
// For team events, every teammate gets their own registration row (sharing a
// teamId) so the same per-user unique-registration check also blocks a
// username being added to a second team, or registering twice, for the event.
router.post(
  "/:slug/register",
  requireAuth,
  uploadPaymentScreenshot.single("paymentScreenshot"),
  asyncHandler(async (req, res) => {
    const slug = String(req.params.slug).toLowerCase();
    const input = registerSchema.parse(req.body);

    const event = await Event.findOne({ slug });
    if (!event) throw new ApiError(404, "Event not found.");
    if (!event.registrationOpen) throw new ApiError(409, "Registration is closed for this event.");

    const leaderId = requireUserId(req);
    const leader = await User.findById(leaderId);
    if (!leader) throw new ApiError(401, "Session is no longer valid.");

    const existing = await Registration.findOne({ userId: leaderId, eventId: event._id });
    if (existing) throw new ApiError(409, "You are already registered for this event.");

    if (event.registrationFee && !input.paymentReference) {
      throw new ApiError(400, "Enter your UPI payment reference to complete registration.", "paymentReference");
    }

    let parsedTeammateUsernames: string[] = [];
    if (input.teammateUsernames) {
      try {
        const parsed: unknown = JSON.parse(input.teammateUsernames);
        if (Array.isArray(parsed)) {
          parsedTeammateUsernames = parsed.filter(
            (value): value is string => typeof value === "string" && value.trim().length > 0,
          );
        }
      } catch {
        // Malformed input — treat as no teammates rather than failing the whole registration.
      }
    }

    // Teammates only make sense for team events — silently ignore any sent
    // for an individual event rather than erroring on stray client state.
    // Usernames are looked up case-insensitively (the system always issues
    // them uppercase, but a participant may type one in lowercase), while
    // still deduplicating and excluding the leader's own username by value.
    const seenUsernames = new Set<string>();
    const requestedUsernames =
      event.teamType === "team"
        ? parsedTeammateUsernames.filter((username) => {
            const key = username.toLowerCase();
            if (key === leader.username.toLowerCase() || seenUsernames.has(key)) return false;
            seenUsernames.add(key);
            return true;
          })
        : [];

    if (event.teamType === "team") {
      const teamSizeLimit = Number.parseInt(event.teamSize, 10);
      const minTeammates = Math.max((event.minTeamSize ?? 2) - 1, 0);

      if (requestedUsernames.length < minTeammates) {
        throw new ApiError(
          400,
          `This event needs teams of ${event.minTeamSize ?? 2} to ${event.teamSize} — add at least ${minTeammates} teammate(s).`,
          "teammateUsernames",
        );
      }

      if (Number.isFinite(teamSizeLimit) && requestedUsernames.length > teamSizeLimit - 1) {
        throw new ApiError(
          400,
          `This event allows teams of up to ${teamSizeLimit} — you can add at most ${teamSizeLimit - 1} teammate(s).`,
          "teammateUsernames",
        );
      }
    }

    const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const teammateUsers = requestedUsernames.length
      ? await User.find({
          username: { $in: requestedUsernames.map((username) => new RegExp(`^${escapeRegex(username)}$`, "i")) },
        })
      : [];

    const foundUsernames = new Set(teammateUsers.map((user) => user.username.toLowerCase()));
    const missingUsernames = requestedUsernames.filter((username) => !foundUsernames.has(username.toLowerCase()));
    if (missingUsernames.length > 0) {
      throw new ApiError(
        400,
        `No Porikkalam account found for username(s): ${missingUsernames.join(", ")}. They need to register on the site first.`,
        "teammateUsernames",
      );
    }

    const rosterUserIds = [leaderId, ...teammateUsers.map((user) => user._id)];
    const alreadyRegistered = await Registration.find({ eventId: event._id, userId: { $in: rosterUserIds } });
    if (alreadyRegistered.length > 0) {
      const takenUserIds = new Set(alreadyRegistered.map((registration) => registration.userId.toString()));
      const names = [leader, ...teammateUsers]
        .filter((user) => takenUserIds.has(user._id.toString()))
        .map((user) => user.username);
      throw new ApiError(409, `Already registered for this event: ${names.join(", ")}.`, "teammateUsernames");
    }

    const teamId = new Types.ObjectId();
    const status = event.registrationFee ? "submitted" : "confirmed";
    const teamName = event.teamType === "team" ? input.teamName ?? null : null;

    const roster: RegistrationTeammate[] = [
      { userId: leader._id, username: leader.username, name: leader.displayName, role: "leader" },
      ...teammateUsers.map(
        (user): RegistrationTeammate => ({ userId: user._id, username: user.username, name: user.displayName, role: "member" }),
      ),
    ];

    const allMembers = [leader, ...teammateUsers];
    const docs = allMembers.map((member, index) => ({
      userId: member._id,
      eventId: event._id,
      eventSlug: event.slug,
      eventName: event.eventName,
      eventCategory: event.category,
      participantName: member.displayName,
      contactEmail: member.email,
      phone: member.phone,
      college: member.college,
      department: member.department,
      yearOfStudy: member.yearOfStudy,
      teamId,
      role: roster[index].role,
      teamName,
      teammates: roster,
      paymentReference: input.paymentReference ?? null,
      paymentScreenshotUrl: req.file ? `/uploads/payment-screenshots/${req.file.filename}` : null,
      status,
    }));

    try {
      await Registration.insertMany(docs, { ordered: true });
    } catch (error) {
      await Registration.deleteMany({ teamId }).catch(() => undefined);
      if (error && typeof error === "object" && "code" in error && error.code === 11000) {
        throw new ApiError(409, "One or more teammates are already registered for this event.");
      }
      throw error;
    }

    const leaderRegistration = await Registration.findOne({ userId: leaderId, teamId });
    if (!leaderRegistration) throw new ApiError(500, "Registration failed. Please try again.");

    res.status(201).json({ registration: serializeRegistration(leaderRegistration) });
  }),
);

const prequalifierSchema = z.object({
  username: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(120),
  // Teammates arrive as a JSON-encoded array string since this is a multipart form body.
  teammateUsernames: z.string().trim().optional(),
  problemStatement: z.string().trim().max(200).optional(),
});

router.post(
  "/:slug/prequalifier",
  uploadPpt.single("ppt"),
  asyncHandler(async (req, res) => {
    const slug = String(req.params.slug).toLowerCase();
    const event = await Event.findOne({ slug });
    if (!event) throw new ApiError(404, "Event not found.");

    const input = prequalifierSchema.parse(req.body);
    if (!req.file) throw new ApiError(400, "Please upload your PPT to submit.", "ppt");

    let teammateUsernames: string[] = [];
    if (input.teammateUsernames) {
      try {
        const parsed: unknown = JSON.parse(input.teammateUsernames);
        if (Array.isArray(parsed)) {
          teammateUsernames = parsed.filter(
            (value): value is string => typeof value === "string" && value.trim().length > 0,
          );
        }
      } catch {
        // Malformed input — treat as no teammates rather than failing the whole submission.
      }
    }

    const pptUrl = `/uploads/ppts/${req.file.filename}`;

    const submission = await PrequalifierSubmission.create({
      eventId: event._id,
      eventSlug: event.slug,
      eventName: event.eventName,
      username: input.username,
      email: input.email,
      teammateUsernames,
      problemStatement: input.problemStatement ?? null,
      pptUrl,
    });

    void sendPrequalifierConfirmationEmail(input.email, event.eventName);

    res.status(201).json({ submissionId: submission._id.toString() });
  }),
);

export default router;
