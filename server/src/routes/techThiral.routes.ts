import { Router } from "express";
import { z } from "zod";
import { TechThiralApplication } from "../models/TechThiralApplication.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadPaymentScreenshot } from "../utils/upload.js";

const router = Router();

// UPI transaction reference numbers (UTR/RRN) are always a 12-digit number.
const UPI_REFERENCE_REGEX = /^\d{12}$/;

const applySchema = z.object({
  paymentReference: z
    .string()
    .trim()
    .regex(UPI_REFERENCE_REGEX, "Enter a valid 12-digit UPI transaction reference ID."),
});

// Organization/contact details are collected separately via the booth application
// Google Form — this only records the UPI payment reference (and optional screenshot).
router.post(
  "/apply",
  uploadPaymentScreenshot.single("paymentScreenshot"),
  asyncHandler(async (req, res) => {
    const input = applySchema.parse(req.body);
    if (!req.file) {
      throw new ApiError(400, "Upload your payment screenshot to complete your booth application.", "paymentScreenshot");
    }

    const application = await TechThiralApplication.create({
      paymentReference: input.paymentReference,
      paymentScreenshotUrl: `/uploads/payment-screenshots/${req.file.filename}`,
    });

    res.status(201).json({ applicationId: application._id.toString() });
  }),
);

export default router;
