import { Schema, model, Types } from "mongoose";

export type PrequalifierStatus = "submitted" | "reviewed" | "shortlisted" | "rejected";

export interface PrequalifierSubmissionDoc {
  _id: Types.ObjectId;
  eventId: Types.ObjectId;
  eventSlug: string;
  eventName: string;
  username: string;
  email: string;
  teammateUsernames: string[];
  problemStatement?: string | null;
  pptUrl: string;
  status: PrequalifierStatus;
  createdAt: Date;
  updatedAt: Date;
}

const prequalifierSubmissionSchema = new Schema<PrequalifierSubmissionDoc>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    eventSlug: { type: String, required: true, trim: true, lowercase: true },
    eventName: { type: String, required: true, trim: true },
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

prequalifierSubmissionSchema.index({ eventId: 1, username: 1 });

export const PrequalifierSubmission = model<PrequalifierSubmissionDoc>(
  "PrequalifierSubmission",
  prequalifierSubmissionSchema,
  "prequalifier_submissions",
);
