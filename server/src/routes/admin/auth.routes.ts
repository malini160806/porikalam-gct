import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Admin } from "../../models/Admin.js";
import { signAdminToken } from "../../utils/adminJwt.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { requireAdminAuth } from "../../middleware/adminAuth.js";
import { serializeAdmin } from "../../utils/serializers.js";
import { ROLE_PERMISSIONS } from "../../utils/adminRoles.js";
import { env } from "../../config/env.js";

const router = Router();

const loginSchema = z.object({
  identifier: z.string().trim().min(1),
  password: z.string().min(1),
});

const signupSchema = z.object({
  signupCode: z.string().min(1),
  username: z.string().trim().min(3).max(40).regex(/^[a-z0-9_.-]+$/i, "Letters, numbers, dots, underscores, and hyphens only"),
  email: z.string().trim().email(),
  name: z.string().trim().min(2).max(100),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Add an uppercase letter")
    .regex(/[a-z]/, "Add a lowercase letter")
    .regex(/\d/, "Add a number"),
});

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    // Signup only creates event_admin accounts — super_admin can only be granted
    // afterward by an existing super admin via the Admins management page.
    if (!env.adminSignupCode) throw new ApiError(403, "Admin signup is currently disabled.");

    const input = signupSchema.parse(req.body);
    if (input.signupCode !== env.adminSignupCode) {
      throw new ApiError(401, "Invalid signup code.", "signupCode");
    }

    const normalizedUsername = input.username.toLowerCase();
    const normalizedEmail = input.email.toLowerCase();

    const existing = await Admin.findOne({ $or: [{ username: normalizedUsername }, { email: normalizedEmail }] });
    if (existing) throw new ApiError(409, "An admin with this username or email already exists.");

    const passwordHash = await bcrypt.hash(input.password, 12);
    const admin = await Admin.create({
      username: normalizedUsername,
      email: normalizedEmail,
      name: input.name,
      role: "event_admin",
      permissions: ROLE_PERMISSIONS.event_admin,
      assignedEvents: [],
      passwordHash,
    });

    const token = signAdminToken(admin._id.toString(), admin.role);
    res.status(201).json({ token, admin: serializeAdmin(admin) });
  }),
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { identifier, password } = loginSchema.parse(req.body);
    const normalized = identifier.toLowerCase();

    const admin = await Admin.findOne({
      $or: [{ username: normalized }, { email: normalized }],
    }).select("+passwordHash");

    // Same generic message whether the account doesn't exist or the password is
    // wrong — never reveal which one, and never leak the hash to the client.
    if (!admin) throw new ApiError(401, "Invalid admin credentials.");

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) throw new ApiError(401, "Invalid admin credentials.");

    if (!admin.isActive) throw new ApiError(403, "This admin account has been deactivated.");

    admin.lastLogin = new Date();
    await admin.save();

    const token = signAdminToken(admin._id.toString(), admin.role);
    res.json({ token, admin: serializeAdmin(admin) });
  }),
);

router.get(
  "/me",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.adminId);
    if (!admin || !admin.isActive) throw new ApiError(401, "Session is no longer valid.");
    res.json({ admin: serializeAdmin(admin) });
  }),
);

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Add an uppercase letter")
    .regex(/[a-z]/, "Add a lowercase letter")
    .regex(/\d/, "Add a number"),
});

router.patch(
  "/password",
  requireAdminAuth,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);

    const admin = await Admin.findById(req.adminId).select("+passwordHash");
    if (!admin) throw new ApiError(401, "Session is no longer valid.");

    const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!valid) throw new ApiError(401, "Current password is incorrect.", "currentPassword");

    admin.passwordHash = await bcrypt.hash(newPassword, 12);
    await admin.save();

    res.json({ ok: true });
  }),
);

export default router;
