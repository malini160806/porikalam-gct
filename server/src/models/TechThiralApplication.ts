import { Schema, model, Types } from "mongoose";

export type TechThiralApplicationStatus = "submitted" | "confirmed" | "rejected";

export interface TechThiralApplicationDoc {
  _id: Types.ObjectId;
  paymentReference: string;
  paymentScreenshotUrl?: string | null;
  status: TechThiralApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const techThiralApplicationSchema = new Schema<TechThiralApplicationDoc>(
  {
    paymentReference: { type: String, required: true, trim: true },
    paymentScreenshotUrl: { type: String, trim: true, default: null },
    status: { type: String, required: true, enum: ["submitted", "confirmed", "rejected"], default: "submitted" },
  },
  { timestamps: true },
);

export const TechThiralApplication = model<TechThiralApplicationDoc>(
  "TechThiralApplication",
  techThiralApplicationSchema,
  "tech_thiral_applications",
);
