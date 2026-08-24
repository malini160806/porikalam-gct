import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { UPLOADS_ROOT } from "./utils/upload.js";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
import adminRoutes from "./routes/admin/index.js";

// Phase 2+ will add: registrations, attendance, payments,
// certificates, sponsors, gallery, contact routes.

/** Builds the Express app. Pure request-handling setup only — no DB connection, no listen(). */
export function createApp(): express.Express {
  const app = express();
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(compression());
  app.use(cors({ origin: env.clientUrl, credentials: true }));
  app.use(express.json({ limit: "500kb" }));
  app.use("/uploads", express.static(UPLOADS_ROOT));

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api/auth", authLimiter);

  const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api/admin/auth/login", adminLoginLimiter);

  app.use("/api/auth", authRoutes);
  app.use("/api/events", eventRoutes);
  app.use("/api/announcements", announcementRoutes);
  app.use("/api/admin", adminRoutes);

  app.get("/api/health", (_req, res) => res.json({ ok: true }));

  app.use(errorHandler);

  return app;
}
