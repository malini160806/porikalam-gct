import { Router } from "express";
import { Event } from "../../models/Event.js";
import { User } from "../../models/User.js";
import { Registration } from "../../models/Registration.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAdminAuth } from "../../middleware/adminAuth.js";

const router = Router();
router.use(requireAdminAuth);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const eventFilter = req.adminRole === "super_admin" ? {} : { slug: { $in: req.adminAssignedEvents ?? [] } };
    const registrationFilter =
      req.adminRole === "super_admin" ? {} : { eventSlug: { $in: req.adminAssignedEvents ?? [] } };

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [totalEvents, totalParticipants, totalRegistrations, todayAttendance, paidRegistrations, pendingRegistrations] =
      await Promise.all([
        Event.countDocuments(eventFilter),
        req.adminRole === "super_admin" ? User.countDocuments() : Promise.resolve(null),
        Registration.countDocuments(registrationFilter),
        Registration.countDocuments({ ...registrationFilter, checkedInAt: { $gte: startOfToday } }),
        Registration.countDocuments({ ...registrationFilter, paymentReference: { $ne: null }, status: "confirmed" }),
        Registration.countDocuments({ ...registrationFilter, status: "submitted" }),
      ]);

    res.json({
      total_events: totalEvents,
      total_participants: totalParticipants,
      total_registrations: totalRegistrations,
      today_attendance: todayAttendance,
      paid_registrations: paidRegistrations,
      pending_registrations: pendingRegistrations,
    });
  }),
);

export default router;
