import { Router } from "express";
import { z } from "zod";
import { TechThiralApplication } from "../models/TechThiralApplication.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendTechThiralConfirmationEmail } from "../utils/mailer.js";
import { uploadPaymentScreenshot } from "../utils/upload.js";

const router = Router();

// UPI transaction reference numbers (UTR/RRN) are always a 12-digit number.
const UPI_REFERENCE_REGEX = /^\d{12}$/;

const applySchema = z.object({
  organizationName: z.string().trim().min(1).max(150),
  contactPerson: z.string().trim().min(1).max(80),
  contactEmail: z.string().trim().email().max(120),
  contactPhone: z.string().trim().min(1).max(20),
  showcaseDescription: z.string().trim().max(500).optional(),
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

    const application = await TechThiralApplication.create({
      organizationName: input.organizationName,
      contactPerson: input.contactPerson,
      contactEmail: input.contactEmail,
      contactPhone: input.contactPhone,
      showcaseDescription: input.showcaseDescription ?? null,
      paymentReference: input.paymentReference,
      paymentScreenshotUrl: req.file ? `/uploads/payment-screenshots/${req.file.filename}` : null,
    });

    void sendTechThiralConfirmationEmail(input.contactEmail, input.organizationName);

    res.status(201).json({ applicationId: application._id.toString() });
  }),
);

export default router;
