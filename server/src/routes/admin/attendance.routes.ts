import { Router } from "express";
import { z } from "zod";
import { Registration } from "../../models/Registration.js";
import { User } from "../../models/User.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { requireAdminAuth, assertEventAccess } from "../../middleware/adminAuth.js";
import { serializeUser } from "../../utils/serializers.js";

const router = Router();
router.use(requireAdminAuth);

/**
 * A participant's QR pass encodes just their username (see ParticipantIdCard on the
 * dashboard). Scanning it — or typing the username in manually — pulls up every event
 * they're confirmed for so the admin can pick which one to check them into.
 */
router.get(
  "/lookup",
  asyncHandler(async (req, res) => {
    const { username } = z.object({ username: z.string().trim().min(1) }).parse(req.query);

    const user = await User.findOne({ username: new RegExp(`^${username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") });
    if (!user) throw new ApiError(404, "No participant found with that username.");

    const registrationFilter: Record<string, unknown> = { userId: user._id, status: "confirmed" };
    if (req.adminRole !== "super_admin") {
      registrationFilter.eventSlug = { $in: req.adminAssignedEvents ?? [] };
    }

    const registrations = await Registration.find(registrationFilter).sort({ createdAt: -1 });

    res.json({
      participant: serializeUser(user),
      registrations: registrations.map((registration) => ({
        id: registration._id.toString(),
        event_key: registration.eventSlug,
        event_name: registration.eventName,
        team_name: registration.teamName ?? null,
        checked_in_at: registration.checkedInAt ? registration.checkedInAt.toISOString() : null,
      })),
    });
  }),
);

router.post(
  "/:id/checkin",
  asyncHandler(async (req, res) => {
    const registration = await Registration.findById(req.params.id);
    if (!registration) throw new ApiError(404, "Registration not found.");
    assertEventAccess(req, registration.eventSlug);
    if (registration.status !== "confirmed") {
      throw new ApiError(409, "This registration isn't confirmed yet — resolve the payment first.");
    }

    registration.checkedInAt = new Date();
    registration.checkedInBy = req.adminId ?? null;
    await registration.save();

    res.json({ checked_in_at: registration.checkedInAt.toISOString() });
  }),
);

router.post(
  "/:id/undo",
  asyncHandler(async (req, res) => {
    const registration = await Registration.findById(req.params.id);
    if (!registration) throw new ApiError(404, "Registration not found.");
    assertEventAccess(req, registration.eventSlug);

    registration.checkedInAt = null;
    registration.checkedInBy = null;
    await registration.save();

    res.json({ checked_in_at: null });
  }),
);

export default router;
