import type { NextFunction, Request, Response } from "express";
import { Role } from "../models/Role.js";
import { ApiError } from "../utils/ApiError.js";

export async function requireAdmin(req: Request, _res: Response, next: NextFunction): Promise<void> {
  if (!req.userId) {
    next(new ApiError(401, "Authentication required."));
    return;
  }
  const isAdmin = await Role.exists({ userId: req.userId, role: { $in: ["super_admin", "event_admin", "volunteer"] } });
  if (!isAdmin) {
    next(new ApiError(403, "Admin access required."));
    return;
  }
  next();
}

export async function requireSuperAdmin(req: Request, _res: Response, next: NextFunction): Promise<void> {
  if (!req.userId) {
    next(new ApiError(401, "Authentication required."));
    return;
  }
  const isSuperAdmin = await Role.exists({ userId: req.userId, role: "super_admin" });
  if (!isSuperAdmin) {
    next(new ApiError(403, "Super admin access required."));
    return;
  }
  next();
}
