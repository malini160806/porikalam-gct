import { Router } from "express";
import authRoutes from "./auth.routes.js";
import eventsRoutes from "./events.routes.js";
import participantsRoutes from "./participants.routes.js";
import adminsRoutes from "./admins.routes.js";
import statsRoutes from "./stats.routes.js";
import registrationsRoutes from "./registrations.routes.js";
import paymentsRoutes from "./payments.routes.js";
import attendanceRoutes from "./attendance.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/events", eventsRoutes);
router.use("/participants", participantsRoutes);
router.use("/admins", adminsRoutes);
router.use("/stats", statsRoutes);
router.use("/registrations", registrationsRoutes);
router.use("/payments", paymentsRoutes);
router.use("/attendance", attendanceRoutes);

export default router;
