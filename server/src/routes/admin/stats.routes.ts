import { Router } from "express";
import { Event } from "../../models/Event.js";
import { User } from "../../models/User.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAdminAuth } from "../../middleware/adminAuth.js";

const router = Router();
router.use(requireAdminAuth);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const eventFilter = req.adminRole === "super_admin" ? {} : { slug: { $in: req.adminAssignedEvents ?? [] } };

    const [totalEvents, totalParticipants] = await Promise.all([
      Event.countDocuments(eventFilter),
      req.adminRole === "super_admin" ? User.countDocuments() : Promise.resolve(null),
    ]);

    res.json({
      total_events: totalEvents,
      total_participants: totalParticipants,
      // Registration, attendance, and payment tracking ship once those systems
      // are built — reported as null (not zero) so the dashboard can render an
      // honest "not live yet" state instead of a misleading count.
      total_registrations: null,
      today_attendance: null,
      paid_registrations: null,
      pending_registrations: null,
    });
  }),
);

export default router;
