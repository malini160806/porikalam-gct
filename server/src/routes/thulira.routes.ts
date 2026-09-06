import { Router } from "express";
import { z } from "zod";
import { ThuliraApplication } from "../models/ThuliraApplication.js";
import { ThuliraPrequalifierSubmission } from "../models/ThuliraPrequalifierSubmission.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { sendThuliraConfirmationEmail, sendThuliraPrequalifierConfirmationEmail } from "../utils/mailer.js";
import { uploadPaymentScreenshot, uploadPpt } from "../utils/upload.js";

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

const prequalifierSchema = z.object({
  startupTitle: z.string().trim().min(1).max(150),
  username: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(120),
  // Teammates arrive as a JSON-encoded array string since this is a multipart form body.
  teammateUsernames: z.string().trim().optional(),
  problemStatement: z.string().trim().max(200).optional(),
});

router.post(
  "/prequalifier",
  uploadPpt.single("ppt"),
  asyncHandler(async (req, res) => {
    const input = prequalifierSchema.parse(req.body);
    if (!req.file) throw new ApiError(400, "Please upload your PPT to submit.", "ppt");

    let teammateUsernames: string[] = [];
    if (input.teammateUsernames) {
      try {
        const parsed: unknown = JSON.parse(input.teammateUsernames);
        if (Array.isArray(parsed)) {
          teammateUsernames = parsed.filter(
            (value): value is string => typeof value === "string" && value.trim().length > 0,
          );
        }
      } catch {
        // Malformed input — treat as no teammates rather than failing the whole submission.
      }
    }

    const pptUrl = `/uploads/ppts/${req.file.filename}`;

    const submission = await ThuliraPrequalifierSubmission.create({
      startupTitle: input.startupTitle,
      username: input.username,
      email: input.email,
      teammateUsernames,
      problemStatement: input.problemStatement ?? null,
      pptUrl,
    });

    void sendThuliraPrequalifierConfirmationEmail(input.email, input.startupTitle);

    res.status(201).json({ submissionId: submission._id.toString() });
  }),
);

export default router;
