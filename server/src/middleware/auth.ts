import type { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { verifyToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";

declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId;
    }
  }
}

/** Narrows req.userId for handlers that always run after requireAuth. */
export function requireUserId(req: Request): Types.ObjectId {
  if (!req.userId) throw new ApiError(401, "Authentication required.");
  return req.userId;
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    next(new ApiError(401, "Authentication required."));
    return;
  }

  try {
    const payload = verifyToken(header.slice("Bearer ".length));
    req.userId = new Types.ObjectId(payload.sub);
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired session."));
  }
}
