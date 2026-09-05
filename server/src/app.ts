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
import thuliraRoutes from "./routes/thulira.routes.js";
import techThiralRoutes from "./routes/techThiral.routes.js";

// Phase 2+ will add: attendance, payments,
// certificates, sponsors, gallery, contact routes.

// CLIENT_URL can hold one or more comma-separated allowed origins. Vercel's stable
// production alias (porikalam-gct.vercel.app) and its per-deployment preview URLs
// (porikalam-gct-<hash>.vercel.app) are always allowed on top of that, so a stale
// CLIENT_URL pointing at an old deployment hash doesn't silently CORS-block the
// live site (every API call — including username generation — would fail).
const configuredOrigins = env.clientUrl
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const VERCEL_PROJECT_ORIGIN = /^https:\/\/porikalam-gct(-[a-z0-9]+)?\.vercel\.app$/;

/** Builds the Express app. Pure request-handling setup only — no DB connection, no listen(). */
export function createApp(): express.Express {
  const app = express();
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(compression());
  app.use(
    cors({
      origin(origin, callback) {
        // No Origin header — same-origin requests, curl/health checks, etc.
        if (!origin) return callback(null, true);
        if (configuredOrigins.includes(origin) || VERCEL_PROJECT_ORIGIN.test(origin)) {
          return callback(null, true);
        }
        callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    }),
  );
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
  app.use("/api/thulira", thuliraRoutes);
  app.use("/api/tech-thiral", techThiralRoutes);

  app.get("/api/health", (_req, res) => res.json({ ok: true }));

  app.use(errorHandler);

  return app;
}
