import { Router } from "express";
import { z } from "zod";
import { Event } from "../../models/Event.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { requireAdminAuth, assertEventAccess } from "../../middleware/adminAuth.js";
import { serializeEvent } from "../../utils/serializers.js";

const router = Router();
router.use(requireAdminAuth);

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const eventSchema = z.object({
  eventName: z.string().trim().min(2).max(120),
  category: z.enum(["technical", "non-technical", "workshop"]),
  description: z.string().trim().min(10),
  eligibility: z.string().trim().min(2).default("Open to All Departments"),
  targetParticipants: z.number().int().positive(),
  targetSubCategory: z.array(z.string().trim()).default([]),
  whyIncluded: z.string().trim().optional(),
  teamType: z.enum(["individual", "team"]),
  teamSize: z.string().trim().min(1),
  eventType: z.enum(["competition", "participation"]),
  prequalifierRequired: z.boolean().default(false),
  duration: z.string().trim().min(1),
  expectedParticipants: z.number().int().positive(),
  venue: z.string().trim().min(1),
  resources: z.string().trim().optional(),
  referenceLink: z.string().trim().url().optional().or(z.literal("")),
  budget: z.string().trim().optional(),
  prizePool: z.string().trim().optional(),
  registrationFee: z.string().trim().optional(),
  poster: z.string().trim().optional(),
  icon: z.string().trim().min(1),
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const events =
      req.adminRole === "super_admin"
        ? await Event.find().sort({ createdAt: 1 })
        : await Event.find({ slug: { $in: req.adminAssignedEvents ?? [] } }).sort({ createdAt: 1 });
    res.json({ events: events.map(serializeEvent) });
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (req.adminRole !== "super_admin") throw new ApiError(403, "Super admin access required.");

    const input = eventSchema.parse(req.body);
    const slug = slugify(input.eventName);

    const existing = await Event.findOne({ slug });
    if (existing) throw new ApiError(409, "An event with this name already exists.", "eventName");

    const event = await Event.create({ ...input, slug });
    res.status(201).json({ event: serializeEvent(event) });
  }),
);

router.put(
  "/:slug",
  asyncHandler(async (req, res) => {
    if (req.adminRole !== "super_admin") throw new ApiError(403, "Super admin access required.");

    const slug = String(req.params.slug).toLowerCase();
    const input = eventSchema.partial().parse(req.body);
    const event = await Event.findOneAndUpdate({ slug }, { $set: input }, { new: true });
    if (!event) throw new ApiError(404, "Event not found.");
    res.json({ event: serializeEvent(event) });
  }),
);

router.patch(
  "/:slug/registration",
  asyncHandler(async (req, res) => {
    const slug = String(req.params.slug).toLowerCase();
    assertEventAccess(req, slug);

    const { open } = z.object({ open: z.boolean() }).parse(req.body);
    const event = await Event.findOneAndUpdate({ slug }, { $set: { registrationOpen: open } }, { new: true });
    if (!event) throw new ApiError(404, "Event not found.");
    res.json({ event: serializeEvent(event) });
  }),
);

router.delete(
  "/:slug",
  asyncHandler(async (req, res) => {
    if (req.adminRole !== "super_admin") throw new ApiError(403, "Super admin access required.");

    const slug = String(req.params.slug).toLowerCase();
    const result = await Event.deleteOne({ slug });
    if (result.deletedCount === 0) throw new ApiError(404, "Event not found.");
    res.status(204).send();
  }),
);

export default router;
