import { Schema, model, Types } from "mongoose";

export type ThuliraApplicationStatus = "submitted" | "confirmed" | "rejected";

export interface ThuliraApplicationDoc {
  _id: Types.ObjectId;
  teamName: string;
  startupTitle: string;
  domain: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  college: string;
  teammateNames: string[];
  paymentReference: string;
  paymentScreenshotUrl?: string | null;
  status: ThuliraApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const thuliraApplicationSchema = new Schema<ThuliraApplicationDoc>(
  {
    teamName: { type: String, required: true, trim: true },
    startupTitle: { type: String, required: true, trim: true },
    domain: { type: String, required: true, trim: true },
    leaderName: { type: String, required: true, trim: true },
    leaderEmail: { type: String, required: true, trim: true, lowercase: true },
    leaderPhone: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    teammateNames: { type: [String], default: [] },
    paymentReference: { type: String, required: true, trim: true },
    paymentScreenshotUrl: { type: String, trim: true, default: null },
    status: { type: String, required: true, enum: ["submitted", "confirmed", "rejected"], default: "submitted" },
  },
  { timestamps: true },
);

export const ThuliraApplication = model<ThuliraApplicationDoc>(
  "ThuliraApplication",
  thuliraApplicationSchema,
  "thulira_applications",
);
