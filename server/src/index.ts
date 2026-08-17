import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import { connectToDatabase } from "./db/connection.js";
import { ensureCollections } from "./models/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { UPLOADS_ROOT } from "./utils/upload.js";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";
import adminRoutes from "./routes/admin/index.js";
import { pollSocialFeeds } from "./services/socialFeed.js";

// Phase 2+ will add: registrations, attendance, payments,
// certificates, sponsors, gallery, contact routes.

const SOCIAL_POLL_INTERVAL_MS = 15 * 60 * 1000;

async function main(): Promise<void> {
  await connectToDatabase();
  await ensureCollections();

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

  app.listen(env.port, () => {
    console.log(`[server] listening on http://localhost:${env.port}`);
  });

  if (env.metaAccessToken) {
    console.log("[social-feed] auto-pull enabled — polling Instagram/Facebook every 15 minutes");
    void pollSocialFeeds();
    setInterval(() => void pollSocialFeeds(), SOCIAL_POLL_INTERVAL_MS);
  }
}

main().catch((error) => {
  console.error("[server] failed to start:", error);
  process.exit(1);
});
