import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Admin } from "../../models/Admin.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { requireAdminAuth, requireSuperAdmin } from "../../middleware/adminAuth.js";
import { serializeAdmin } from "../../utils/serializers.js";

const router = Router();
router.use(requireAdminAuth, requireSuperAdmin);

const ROLE_PERMISSIONS: Record<"super_admin" | "event_admin", string[]> = {
  super_admin: [
    "manage_events",
    "view_registrations",
    "manage_users",
    "manage_admins",
    "view_attendance",
    "manage_event_settings",
    "view_payments",
  ],
  event_admin: ["view_assigned_registrations", "view_assigned_participants", "manage_assigned_attendance", "scan_qr"],
};

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const admins = await Admin.find().sort({ createdAt: 1 });
    res.json({ admins: admins.map(serializeAdmin) });
  }),
);

const createAdminSchema = z.object({
  username: z.string().trim().min(3).max(40).regex(/^[a-z0-9_.-]+$/i, "Letters, numbers, dots, underscores, and hyphens only"),
  email: z.string().trim().email(),
  name: z.string().trim().min(2).max(100),
  role: z.enum(["super_admin", "event_admin"]),
  assignedEvents: z.array(z.string().trim()).default([]),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Add an uppercase letter")
    .regex(/[a-z]/, "Add a lowercase letter")
    .regex(/\d/, "Add a number"),
});

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const input = createAdminSchema.parse(req.body);
    const normalizedUsername = input.username.toLowerCase();
    const normalizedEmail = input.email.toLowerCase();

    const existing = await Admin.findOne({ $or: [{ username: normalizedUsername }, { email: normalizedEmail }] });
    if (existing) throw new ApiError(409, "An admin with this username or email already exists.");

    const passwordHash = await bcrypt.hash(input.password, 12);
    const admin = await Admin.create({
      username: normalizedUsername,
      email: normalizedEmail,
      name: input.name,
      role: input.role,
      assignedEvents: input.role === "event_admin" ? input.assignedEvents : [],
      permissions: ROLE_PERMISSIONS[input.role],
      passwordHash,
    });

    res.status(201).json({ admin: serializeAdmin(admin) });
  }),
);

const updateAdminSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  role: z.enum(["super_admin", "event_admin"]).optional(),
  assignedEvents: z.array(z.string().trim()).optional(),
  isActive: z.boolean().optional(),
});

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const input = updateAdminSchema.parse(req.body);
    const update: Record<string, unknown> = { ...input };
    if (input.role) update.permissions = ROLE_PERMISSIONS[input.role];

    const admin = await Admin.findByIdAndUpdate(req.params.id, { $set: update }, { new: true });
    if (!admin) throw new ApiError(404, "Admin not found.");
    res.json({ admin: serializeAdmin(admin) });
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    if (String(req.adminId) === req.params.id) {
      throw new ApiError(400, "You cannot deactivate your own account.");
    }
    const admin = await Admin.findByIdAndUpdate(req.params.id, { $set: { isActive: false } }, { new: true });
    if (!admin) throw new ApiError(404, "Admin not found.");
    res.status(204).send();
  }),
);

export default router;
