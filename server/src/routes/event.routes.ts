import { Router } from "express";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";
import { Registration } from "../models/Registration.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { requireAuth, requireUserId } from "../middleware/auth.js";
import { serializeEvent, serializeRegistration } from "../utils/serializers.js";

const router = Router();

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

// The participant's profile (name, email, phone, college, department, year)
// is never re-collected here — it's read straight off the existing User
// record so the same profile carries into every event the participant joins.
router.post(
  "/:slug/register",
  requireAuth,
  asyncHandler(async (req, res) => {
    const slug = String(req.params.slug).toLowerCase();
    const event = await Event.findOne({ slug });
    if (!event) throw new ApiError(404, "Event not found.");
    if (!event.registrationOpen) throw new ApiError(409, "Registration is closed for this event.");

    const userId = requireUserId(req);
    const user = await User.findById(userId);
    if (!user) throw new ApiError(401, "Session is no longer valid.");

    const existing = await Registration.findOne({ userId, eventId: event._id });
    if (existing) throw new ApiError(409, "You are already registered for this event.");

    try {
      const registration = await Registration.create({
        userId,
        eventId: event._id,
        eventSlug: event.slug,
        eventName: event.eventName,
        eventCategory: event.category,
        participantName: user.displayName,
        contactEmail: user.email,
        phone: user.phone,
        college: user.college,
        department: user.department,
        yearOfStudy: user.yearOfStudy,
        // No payment gateway is wired up yet — a listed fee marks the
        // registration as pending payment at the desk instead of confirmed.
        status: event.registrationFee ? "submitted" : "confirmed",
      });
      res.status(201).json({ registration: serializeRegistration(registration) });
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === 11000) {
        throw new ApiError(409, "You are already registered for this event.");
      }
      throw error;
    }
  }),
);

export default router;
