import { Router } from "express";
import { z } from "zod";
import { User } from "../../models/User.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAdminAuth, requireSuperAdmin } from "../../middleware/adminAuth.js";
import { serializeUser } from "../../utils/serializers.js";

const router = Router();
router.use(requireAdminAuth, requireSuperAdmin);

const querySchema = z.object({
  q: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(25),
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { q, page, limit } = querySchema.parse(req.query);

    const filter = q
      ? {
          $or: [
            { displayName: { $regex: q, $options: "i" } },
            { username: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
            { college: { $regex: q, $options: "i" } },
            { department: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const [participants, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    res.json({
      participants: participants.map(serializeUser),
      total,
      page,
      limit,
    });
  }),
);

export default router;
