import { Router } from "express";
import authRoutes from "./auth.routes.js";
import eventsRoutes from "./events.routes.js";
import participantsRoutes from "./participants.routes.js";
import adminsRoutes from "./admins.routes.js";
import statsRoutes from "./stats.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/events", eventsRoutes);
router.use("/participants", participantsRoutes);
router.use("/admins", adminsRoutes);
router.use("/stats", statsRoutes);

export default router;
