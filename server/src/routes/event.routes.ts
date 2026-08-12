import { Router } from "express";
import { Event } from "../models/Event.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { serializeEvent } from "../utils/serializers.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const events = await Event.find().sort({ createdAt: 1 });
    res.json({ events: events.map(serializeEvent) });
  }),
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const slug = String(req.params.slug).toLowerCase();
    const event = await Event.findOne({ slug });
    if (!event) throw new ApiError(404, "Event not found.");
    res.json({ event: serializeEvent(event) });
  }),
);

export default router;
