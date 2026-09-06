import { Schema, model, Types } from "mongoose";

export type ThuliraPrequalifierStatus = "submitted" | "reviewed" | "shortlisted" | "rejected";

export interface ThuliraPrequalifierSubmissionDoc {
  _id: Types.ObjectId;
  startupTitle: string;
  username: string;
  email: string;
  teammateUsernames: string[];
  problemStatement?: string | null;
  pptUrl: string;
  status: ThuliraPrequalifierStatus;
  createdAt: Date;
  updatedAt: Date;
}

const thuliraPrequalifierSubmissionSchema = new Schema<ThuliraPrequalifierSubmissionDoc>(
  {
    startupTitle: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    teammateUsernames: { type: [String], default: [] },
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

thuliraPrequalifierSubmissionSchema.index({ username: 1 });

export const ThuliraPrequalifierSubmission = model<ThuliraPrequalifierSubmissionDoc>(
  "ThuliraPrequalifierSubmission",
  thuliraPrequalifierSubmissionSchema,
  "thulira_prequalifier_submissions",
);
