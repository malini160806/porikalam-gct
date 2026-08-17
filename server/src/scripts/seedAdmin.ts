import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectToDatabase } from "../db/connection.js";
import { Admin } from "../models/Admin.js";
import { env } from "../config/env.js";

const SUPER_ADMIN_PERMISSIONS = [
  "manage_events",
  "view_registrations",
  "manage_users",
  "manage_admins",
  "view_attendance",
  "manage_event_settings",
  "view_payments",
];

function randomPassword(): string {
  // 16 random bytes, base64url, trimmed to 20 chars — comfortably clears the
  // admin password policy (upper/lower/digit) in practice, and is never
  // written anywhere but this one console line.
  return crypto.randomBytes(16).toString("base64url").slice(0, 20) + "Aa1!";
}

async function seed(): Promise<void> {
  await connectToDatabase();

  const existing = await Admin.findOne({ role: "super_admin" });
  if (existing) {
    console.log(`[seed:admin] a super admin already exists (${existing.username}) — skipping.`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const username = (env.adminSeedUsername || "admin").toLowerCase();
  const email = (env.adminSeedEmail || env.superAdminEmail || "admin@porikkalam.in").toLowerCase();
  const password = env.adminSeedPassword || randomPassword();

  const passwordHash = await bcrypt.hash(password, 12);

  await Admin.create({
    username,
    email,
    name: "Super Admin",
    role: "super_admin",
    permissions: SUPER_ADMIN_PERMISSIONS,
    assignedEvents: [],
    isActive: true,
    passwordHash,
  });

  console.log("[seed:admin] created the first super admin account.");
  console.log("[seed:admin] SAVE THESE CREDENTIALS NOW — the password is never shown again:");
  console.log(`[seed:admin]   username: ${username}`);
  console.log(`[seed:admin]   email:    ${email}`);
  console.log(`[seed:admin]   password: ${password}`);
  console.log("[seed:admin] sign in at /admin/login, then change the password immediately.");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((error) => {
  console.error("[seed:admin] failed:", error);
  process.exit(1);
});
