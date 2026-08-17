import { Router } from "express";
import { Announcement } from "../models/Announcement.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { serializeAnnouncement } from "../utils/serializers.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const announcements = await Announcement.find().sort({ pinned: -1, date: -1 });
    res.json({ announcements: announcements.map(serializeAnnouncement) });
  }),
);

export default router;
