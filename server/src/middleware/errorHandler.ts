import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, field: err.field });
    return;
  }

  if (err && typeof err === "object" && "name" in err && (err as { name?: string }).name === "ZodError") {
    const issues = (err as { issues?: Array<{ path: (string | number)[]; message: string }> }).issues ?? [];
    const first = issues[0];
    res.status(400).json({ message: first?.message ?? "Invalid request.", field: first?.path?.[0] });
    return;
  }

  if (err && typeof err === "object" && "code" in err && (err as { code?: number }).code === 11000) {
    const keyValue = (err as { keyValue?: Record<string, unknown> }).keyValue ?? {};
    const field = Object.keys(keyValue)[0];
    res.status(409).json({ message: `${field ?? "Value"} already in use.`, field });
    return;
  }

  console.error("[api] unhandled error:", err);
  res.status(500).json({ message: "Something went wrong. Please try again." });
}
