import { Schema, model, Types } from "mongoose";

export type ThuliraPrequalifierStatus = "submitted" | "reviewed" | "shortlisted" | "rejected";

export interface ThuliraPrequalifierSubmissionDoc {
  _id: Types.ObjectId;
  teamName: string;
  startupTitle: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  teammateNames: string[];
  problemStatement?: string | null;
  pptUrl: string;
  status: ThuliraPrequalifierStatus;
  createdAt: Date;
  updatedAt: Date;
}

const thuliraPrequalifierSubmissionSchema = new Schema<ThuliraPrequalifierSubmissionDoc>(
  {
    teamName: { type: String, required: true, trim: true },
    startupTitle: { type: String, required: true, trim: true },
    leaderName: { type: String, required: true, trim: true },
    leaderEmail: { type: String, required: true, trim: true, lowercase: true },
    leaderPhone: { type: String, required: true, trim: true },
    teammateNames: { type: [String], default: [] },
    problemStatement: { type: String, trim: true, default: null },
    pptUrl: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["submitted", "reviewed", "shortlisted", "rejected"],
      default: "submitted",
    },
  },
  { timestamps: true },
);

thuliraPrequalifierSubmissionSchema.index({ leaderEmail: 1 });

export const ThuliraPrequalifierSubmission = model<ThuliraPrequalifierSubmissionDoc>(
  "ThuliraPrequalifierSubmission",
  thuliraPrequalifierSubmissionSchema,
  "thulira_prequalifier_submissions",
);
