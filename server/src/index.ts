import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { env } from "./config/env.js";
import { connectToDatabase } from "./db/connection.js";
import { ensureCollections } from "./models/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { UPLOADS_ROOT } from "./utils/upload.js";

import authRoutes from "./routes/auth.routes.js";

// Phase 2+ will add: events, registrations, attendance, admin, payments,
// certificates, sponsors, gallery, announcements, contact routes.

async function main(): Promise<void> {
  await connectToDatabase();
  await ensureCollections();

  const app = express();
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
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

  app.use("/api/auth", authRoutes);

  app.get("/api/health", (_req, res) => res.json({ ok: true }));

  app.use(errorHandler);

  app.listen(env.port, () => {
    console.log(`[server] listening on http://localhost:${env.port}`);
  });
}

main().catch((error) => {
  console.error("[server] failed to start:", error);
  process.exit(1);
});
