import { Router } from "express";
import { z } from "zod";
import { Registration, type RegistrationDoc } from "../../models/Registration.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { requireAdminAuth, requireSuperAdmin } from "../../middleware/adminAuth.js";

const router = Router();
router.use(requireAdminAuth, requireSuperAdmin);

const querySchema = z.object({
  q: z.string().trim().optional(),
  status: z.enum(["all", "pending", "paid", "rejected"]).default("pending"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(200).default(25),
});

const STATUS_MAP = { pending: "submitted", paid: "confirmed", rejected: "cancelled" } as const;

function serializePayment(registration: RegistrationDoc) {
  const own = registration.teammates.find((t) => t.userId.toString() === registration.userId.toString());
  return {
    id: registration._id.toString(),
    username: own?.username ?? "—",
    participant_name: registration.participantName,
    contact_email: registration.contactEmail,
    phone: registration.phone,
    event_key: registration.eventSlug,
    event_name: registration.eventName,
    team_name: registration.teamName ?? null,
    payment_reference: registration.paymentReference ?? null,
    payment_screenshot_url: registration.paymentScreenshotUrl ?? null,
    status: registration.status,
    created_at: registration.createdAt.toISOString(),
  };
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const input = querySchema.parse(req.query);
    // Only paid events ever carry a payment reference — a free-event registration is never a "payment" to review.
    const filter: Record<string, unknown> = { paymentReference: { $ne: null } };
    if (input.status !== "all") filter.status = STATUS_MAP[input.status];
    if (input.q) {
      filter.$or = [
        { participantName: { $regex: input.q, $options: "i" } },
        { paymentReference: { $regex: input.q, $options: "i" } },
        { eventName: { $regex: input.q, $options: "i" } },
        { "teammates.username": { $regex: input.q, $options: "i" } },
      ];
    }

    const [registrations, total] = await Promise.all([
      Registration.find(filter)
        .sort({ createdAt: -1 })
        .skip((input.page - 1) * input.limit)
        .limit(input.limit),
      Registration.countDocuments(filter),
    ]);

    res.json({
      payments: registrations.map(serializePayment),
      total,
      page: input.page,
      limit: input.limit,
    });
  }),
);

router.post(
  "/:id/confirm",
  asyncHandler(async (req, res) => {
    const registration = await Registration.findById(req.params.id);
    if (!registration) throw new ApiError(404, "Registration not found.");
    registration.status = "confirmed";
    await registration.save();
    res.json({ payment: serializePayment(registration) });
  }),
);

router.post(
  "/:id/reject",
  asyncHandler(async (req, res) => {
    const registration = await Registration.findById(req.params.id);
    if (!registration) throw new ApiError(404, "Registration not found.");
    registration.status = "cancelled";
    await registration.save();
    res.json({ payment: serializePayment(registration) });
  }),
);

export default router;
