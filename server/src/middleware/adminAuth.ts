import type { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Admin, type AdminRole } from "../models/Admin.js";
import { verifyAdminToken } from "../utils/adminJwt.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

declare global {
  namespace Express {
    interface Request {
      adminId?: Types.ObjectId;
      adminRole?: AdminRole;
      adminAssignedEvents?: string[];
    }
  }
}

/** Verifies the admin JWT (signed with a secret distinct from participant tokens) and confirms the account is still active. */
export const requireAdminAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new ApiError(401, "Admin authentication required.");
  }

  let payload;
  try {
    payload = verifyAdminToken(header.slice("Bearer ".length));
  } catch {
    throw new ApiError(401, "Invalid or expired admin session.");
  }

  const admin = await Admin.findById(payload.sub);
  if (!admin || !admin.isActive) {
    throw new ApiError(401, "Invalid or expired admin session.");
  }

  req.adminId = admin._id;
  req.adminRole = admin.role;
  req.adminAssignedEvents = admin.assignedEvents;
  next();
});

export function requireSuperAdmin(req: Request, _res: Response, next: NextFunction): void {
  if (req.adminRole !== "super_admin") {
    next(new ApiError(403, "Super admin access required."));
    return;
  }
  next();
}

/** For event_admin, confirms the target event slug is one of their assigned events. Super admins always pass. */
export function assertEventAccess(req: Request, eventSlug: string): void {
  if (req.adminRole === "super_admin") return;
  if (req.adminAssignedEvents?.includes(eventSlug)) return;
  throw new ApiError(403, "You do not have access to this event.");
}
