import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Deliberately signed with a separate secret (ADMIN_JWT_SECRET) from participant
 * tokens, so an admin session can never be forged from a participant token or
 * vice versa — the two auth systems are cryptographically independent.
 */
export interface AdminJwtPayload {
  sub: string;
  role: "super_admin" | "event_admin";
}

const EXPIRES_IN = "12h";

export function signAdminToken(adminId: string, role: AdminJwtPayload["role"]): string {
  return jwt.sign({ sub: adminId, role }, env.adminJwtSecret, { expiresIn: EXPIRES_IN });
}

export function verifyAdminToken(token: string): AdminJwtPayload {
  return jwt.verify(token, env.adminJwtSecret) as AdminJwtPayload;
}
