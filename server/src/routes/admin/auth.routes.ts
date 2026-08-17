import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Admin } from "../../models/Admin.js";
import { signAdminToken } from "../../utils/adminJwt.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { requireAdminAuth } from "../../middleware/adminAuth.js";
import { serializeAdmin } from "../../utils/serializers.js";

const router = Router();

const loginSchema = z.object({
  identifier: z.string().trim().min(1),
  password: z.string().min(1),
});

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
