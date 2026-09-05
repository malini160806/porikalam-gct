import { Router } from "express";
import { z } from "zod";
import { ThuliraApplication } from "../models/ThuliraApplication.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendThuliraConfirmationEmail } from "../utils/mailer.js";
import { uploadPaymentScreenshot } from "../utils/upload.js";

const router = Router();

// UPI transaction reference numbers (UTR/RRN) are always a 12-digit number.
const UPI_REFERENCE_REGEX = /^\d{12}$/;

const applySchema = z.object({
  teamName: z.string().trim().min(1).max(120),
  startupTitle: z.string().trim().min(1).max(150),
  domain: z.string().trim().min(1).max(80),
  leaderName: z.string().trim().min(1).max(80),
  leaderEmail: z.string().trim().email().max(120),
  leaderPhone: z.string().trim().min(1).max(20),
  college: z.string().trim().min(1).max(150),
  // Teammates arrive as a JSON-encoded array string since this is a multipart form body.
  teammateNames: z.string().trim().optional(),
  paymentReference: z
    .string()
    .trim()
    .regex(UPI_REFERENCE_REGEX, "Enter a valid 12-digit UPI transaction reference ID."),
});

router.post(
  "/apply",
  uploadPaymentScreenshot.single("paymentScreenshot"),
  asyncHandler(async (req, res) => {
    const input = applySchema.parse(req.body);

    let teammateNames: string[] = [];
    if (input.teammateNames) {
      try {
        const parsed: unknown = JSON.parse(input.teammateNames);
        if (Array.isArray(parsed)) {
          teammateNames = parsed.filter(
            (value): value is string => typeof value === "string" && value.trim().length > 0,
          );
        }
      } catch {
        // Malformed input — treat as no teammates rather than failing the whole submission.
      }
    }

    const application = await ThuliraApplication.create({
      teamName: input.teamName,
      startupTitle: input.startupTitle,
      domain: input.domain,
      leaderName: input.leaderName,
      leaderEmail: input.leaderEmail,
      leaderPhone: input.leaderPhone,
      college: input.college,
      teammateNames,
      paymentReference: input.paymentReference,
      paymentScreenshotUrl: req.file ? `/uploads/payment-screenshots/${req.file.filename}` : null,
    });

    void sendThuliraConfirmationEmail(input.leaderEmail, input.teamName);

    res.status(201).json({ applicationId: application._id.toString() });
  }),
);

export default router;
