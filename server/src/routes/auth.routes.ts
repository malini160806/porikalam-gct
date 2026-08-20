import crypto from "node:crypto";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { User } from "../models/User.js";
import { Role } from "../models/Role.js";
import { Registration } from "../models/Registration.js";
import { generateUsername } from "../utils/username.js";
import { signToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { requireAuth, requireUserId } from "../middleware/auth.js";
import { serializeUser, serializeRegistration } from "../utils/serializers.js";
import { sendUsernameEmail, sendResetEmail } from "../utils/mailer.js";
import { uploadPhoto } from "../utils/upload.js";

const ADMIN_ROLES = ["super_admin", "event_admin", "volunteer"];

const router = Router();

const conflictsSchema = z.object({
  email: z.string().trim().email(),
  phone: z.string().trim().optional().default(""),
});

router.post(
  "/check-conflicts",
  asyncHandler(async (req, res) => {
    const { email, phone } = conflictsSchema.parse(req.body);
    const [emailTaken, phoneTaken] = await Promise.all([
      User.exists({ email: email.toLowerCase() }),
      phone ? User.exists({ phone }) : Promise.resolve(null),
    ]);
    res.json({ emailTaken: Boolean(emailTaken), phoneTaken: Boolean(phoneTaken) });
  }),
);

// Reserves the next username (atomic counter increment) without creating a
// User yet, so the registration wizard can show an exact confirmation-step
// preview. /register accepts the reserved value back so the created account
// matches what the participant was shown.
router.post(
  "/reserve-username",
  asyncHandler(async (_req, res) => {
    const username = await generateUsername();
    res.json({ username });
  }),
);

const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  dob: z.string().trim().min(1, "Date of birth is required"),
  gender: z.string().trim().min(1, "Gender is required").max(30),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(/^\d{7,15}$/),
  college: z.string().trim().min(2).max(120),
  department: z.string().trim().min(2).max(80),
  degree: z.string().trim().min(2).max(80),
  yearOfStudy: z.string().trim().min(1).max(40),
  registerNumber: z.string().trim().max(40).optional(),
  city: z.string().trim().min(1).max(80),
  state: z.string().trim().min(1).max(80),
  guardianName: z.string().trim().min(2).max(100),
  emergencyContact: z.string().trim().regex(/^\d{7,15}$/, "Enter a valid emergency contact number"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Add an uppercase letter")
    .regex(/[a-z]/, "Add a lowercase letter")
    .regex(/\d/, "Add a number")
    .regex(/[^A-Za-z0-9]/, "Add a special character"),
  reservedUsername: z.string().trim().optional(),
});

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const input = registerSchema.parse(req.body);
    const email = input.email.toLowerCase();

    const [emailTaken, phoneTaken] = await Promise.all([
      User.exists({ email }),
      User.exists({ phone: input.phone }),
    ]);
    if (emailTaken) throw new ApiError(409, "This email is already registered. Try signing in instead.", "email");
    if (phoneTaken) throw new ApiError(409, "This phone number is already registered.", "phone");

    const passwordHash = await bcrypt.hash(input.password, 12);
    const username = input.reservedUsername ?? (await generateUsername());

    const user = await User.create({
      username,
      email,
      phone: input.phone,
      passwordHash,
      displayName: input.fullName,
      dob: new Date(input.dob),
      gender: input.gender,
      college: input.college,
      department: input.department,
      degree: input.degree,
      yearOfStudy: input.yearOfStudy,
      registerNumber: input.registerNumber || null,
      city: input.city,
      state: input.state,
      guardianName: input.guardianName,
      emergencyContact: input.emergencyContact,
    });

    await Role.create({ userId: user._id, role: "participant" });

    void sendUsernameEmail(user.email, user.displayName, user.username);

    const token = signToken(user._id.toString());
    res.status(201).json({ token, username: user.username, userId: user._id.toString() });
  }),
);

router.post(
  "/photo",
  requireAuth,
  uploadPhoto.single("photo"),
  asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, "No photo uploaded.");

    const photoUrl = `/uploads/photos/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(requireUserId(req), { profilePhotoUrl: photoUrl }, { new: true });
    if (!user) throw new ApiError(401, "Session is no longer valid.");

    res.json({ user: serializeUser(user) });
  }),
);

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ username }).select("+passwordHash");
    if (!user) throw new ApiError(401, "Invalid username or password.");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new ApiError(401, "Invalid username or password.");

    const token = signToken(user._id.toString());
    res.json({ token });
  }),
);

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(requireUserId(req));
    if (!user) throw new ApiError(401, "Session is no longer valid.");

    const [roles, registrations] = await Promise.all([
      Role.find({ userId: user._id }),
      Registration.find({ userId: user._id }).sort({ createdAt: -1 }),
    ]);
    const roleNames = roles.map((role) => role.role);

    res.json({
      user: serializeUser(user),
      isAdmin: roleNames.some((role) => ADMIN_ROLES.includes(role)),
      isSuperAdmin: roleNames.includes("super_admin"),
      registrations: registrations.map(serializeRegistration),
    });
  }),
);

// Strict lock (per spec): only mobile number, address (city/state), and
// profile photo are ever editable after signup. Name, college, department,
// year, DOB, etc. are captured once during profile creation and never
// re-collected or re-edited, matching the "create once" participant model.
const profileUpdateSchema = z.object({
  phone: z.string().trim().min(7).max(20),
  city: z.string().trim().min(1).max(80),
  state: z.string().trim().min(1).max(80),
});

router.patch(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const input = profileUpdateSchema.parse(req.body);

    const phoneTaken = await User.exists({ phone: input.phone, _id: { $ne: requireUserId(req) } });
    if (phoneTaken) throw new ApiError(409, "This phone number is already in use.", "phone");

    const user = await User.findByIdAndUpdate(
      requireUserId(req),
      { phone: input.phone, city: input.city, state: input.state },
      { new: true },
    );
    if (!user) throw new ApiError(401, "Session is no longer valid.");
    res.json({ user: serializeUser(user) });
  }),
);

const forgotPasswordSchema = z.object({ email: z.string().trim().email() });

router.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    const { email } = forgotPasswordSchema.parse(req.body);
    const user = await User.findOne({ email: email.toLowerCase() });

    // Always respond the same way whether or not the email exists, so this
    // endpoint can't be used to enumerate registered accounts.
    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");
      user.resetTokenHash = resetTokenHash;
      user.resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();
      void sendResetEmail(user.email, user.displayName, token);
    }

    res.json({ message: "If that email is registered, a reset link has been sent." });
  }),
);

const resetPasswordSchema = z.object({
  token: z.string().trim().min(1),
  password: z.string().min(8),
});

router.post(
  "/reset-password",
  asyncHandler(async (req, res) => {
    const input = resetPasswordSchema.parse(req.body);
    const resetTokenHash = crypto.createHash("sha256").update(input.token).digest("hex");

    const user = await User.findOne({
      resetTokenHash,
      resetTokenExpiresAt: { $gt: new Date() },
    }).select("+resetTokenHash +resetTokenExpiresAt");

    if (!user) throw new ApiError(400, "This reset link is invalid or has expired.");

    user.passwordHash = await bcrypt.hash(input.password, 12);
    user.resetTokenHash = null;
    user.resetTokenExpiresAt = null;
    await user.save();

    res.json({ message: "Password updated. You can now sign in." });
  }),
);

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

router.post(
  "/change-password",
  requireAuth,
  asyncHandler(async (req, res) => {
    const input = changePasswordSchema.parse(req.body);
    const user = await User.findById(requireUserId(req)).select("+passwordHash");
    if (!user) throw new ApiError(401, "Session is no longer valid.");

    const valid = await bcrypt.compare(input.currentPassword, user.passwordHash);
    if (!valid) throw new ApiError(401, "Current password is incorrect.");

    user.passwordHash = await bcrypt.hash(input.newPassword, 12);
    await user.save();

    res.json({ message: "Password changed successfully." });
  }),
);

export default router;
