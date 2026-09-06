import { Router, type Request } from "express";
import { z } from "zod";
import { Registration, type RegistrationDoc } from "../../models/Registration.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAdminAuth, assertEventAccess } from "../../middleware/adminAuth.js";

const router = Router();
router.use(requireAdminAuth);

const querySchema = z.object({
  q: z.string().trim().optional(),
  event: z.string().trim().optional(),
  payment: z.enum(["all", "paid", "pending", "free"]).default("all"),
  attendance: z.enum(["all", "checked-in", "not-checked-in"]).default("all"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(200).default(25),
});

function buildFilter(req: Request, input: z.infer<typeof querySchema>): Record<string, unknown> {
  const filter: Record<string, unknown> = {};

  if (req.adminRole !== "super_admin") {
    filter.eventSlug = { $in: req.adminAssignedEvents ?? [] };
  }

  if (input.event && input.event !== "all") {
    // Narrows to one event — but an event_admin may only narrow within their own
    // assigned events, never escape the $in scope set above by naming another event.
    assertEventAccess(req, input.event.toLowerCase());
    filter.eventSlug = input.event.toLowerCase();
  }

  if (input.payment === "paid") filter.status = "confirmed";
  else if (input.payment === "pending") filter.status = "submitted";
  else if (input.payment === "free") filter.paymentReference = null;

  if (input.attendance === "checked-in") filter.checkedInAt = { $ne: null };
  else if (input.attendance === "not-checked-in") filter.checkedInAt = null;

  if (input.q) {
    filter.$or = [
      { participantName: { $regex: input.q, $options: "i" } },
      { contactEmail: { $regex: input.q, $options: "i" } },
      { phone: { $regex: input.q, $options: "i" } },
      { college: { $regex: input.q, $options: "i" } },
      { department: { $regex: input.q, $options: "i" } },
      { teamName: { $regex: input.q, $options: "i" } },
      { eventName: { $regex: input.q, $options: "i" } },
      { "teammates.username": { $regex: input.q, $options: "i" } },
    ];
  }

  return filter;
}

/** Payment status as shown to admins: a registration only carries a UPI reference when its event charges a fee. */
function paymentLabel(registration: RegistrationDoc): "paid" | "pending" | "free" {
  if (!registration.paymentReference) return "free";
  return registration.status === "confirmed" ? "paid" : "pending";
}

function serializeForAdmin(registration: RegistrationDoc) {
  const own = registration.teammates.find((t) => t.userId.toString() === registration.userId.toString());
  return {
    id: registration._id.toString(),
    username: own?.username ?? "—",
    participant_name: registration.participantName,
    contact_email: registration.contactEmail,
    phone: registration.phone,
    college: registration.college ?? null,
    department: registration.department ?? null,
    year_of_study: registration.yearOfStudy ?? null,
    event_key: registration.eventSlug,
    event_name: registration.eventName,
    team_name: registration.teamName ?? null,
    role: registration.role,
    payment_reference: registration.paymentReference ?? null,
    payment_screenshot_url: registration.paymentScreenshotUrl ?? null,
    payment_status: paymentLabel(registration),
    status: registration.status,
    checked_in_at: registration.checkedInAt ? registration.checkedInAt.toISOString() : null,
    created_at: registration.createdAt.toISOString(),
  };
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const input = querySchema.parse(req.query);
    const filter = buildFilter(req, input);

    const [registrations, total] = await Promise.all([
      Registration.find(filter)
        .sort({ createdAt: -1 })
        .skip((input.page - 1) * input.limit)
        .limit(input.limit),
      Registration.countDocuments(filter),
    ]);

    res.json({
      registrations: registrations.map(serializeForAdmin),
      total,
      page: input.page,
      limit: input.limit,
    });
  }),
);

router.get(
  "/export",
  asyncHandler(async (req, res) => {
    const input = querySchema.parse({ ...req.query, page: 1, limit: 1 });
    const filter = buildFilter(req, input);

    const registrations = await Registration.find(filter).sort({ createdAt: -1 }).limit(5000);

    const columns = [
      "Participant",
      "Username",
      "Email",
      "Phone",
      "College",
      "Department",
      "Year",
      "Event",
      "Team",
      "Role",
      "Payment Reference",
      "Payment Status",
      "Status",
      "Checked In",
      "Registered On",
    ];

    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;

    const rows = registrations.map((registration) => {
      const admin = serializeForAdmin(registration);
      return [
        admin.participant_name,
        admin.username,
        admin.contact_email,
        admin.phone,
        admin.college ?? "",
        admin.department ?? "",
        admin.year_of_study ?? "",
        admin.event_name,
        admin.team_name ?? "",
        admin.role,
        admin.payment_reference ?? "",
        admin.payment_status,
        admin.status,
        admin.checked_in_at ?? "",
        admin.created_at,
      ]
        .map((value) => escapeCsv(String(value)))
        .join(",");
    });

    const csv = [columns.map(escapeCsv).join(","), ...rows].join("\r\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="registrations-${Date.now()}.csv"`);
    res.send(csv);
  }),
);

export default router;
