import { Schema, model, Types } from "mongoose";

export type AnnouncementCategory = "registration" | "schedule" | "workshop" | "general" | "social";
export type AnnouncementSource = "manual" | "instagram" | "facebook";

export interface AnnouncementDoc {
  _id: Types.ObjectId;
  title: string;
  content: string;
  date: Date;
  category: AnnouncementCategory;
  pinned: boolean;
  source: AnnouncementSource;
  /** External post id for instagram/facebook — unique so the poller can upsert without duplicating. */
  sourcePostId: string | null;
  sourceUrl: string | null;
  mediaUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema<AnnouncementDoc>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      required: true,
      enum: ["registration", "schedule", "workshop", "general", "social"],
      default: "general",
    },
    pinned: { type: Boolean, required: true, default: false },
    source: { type: String, required: true, enum: ["manual", "instagram", "facebook"], default: "manual" },
    // Left unset (not even `null`) for manual posts so the sparse unique index below only
    // applies to auto-pulled posts that actually carry an external id.
    sourcePostId: { type: String },
    sourceUrl: { type: String, trim: true, default: null },
    mediaUrl: { type: String, trim: true, default: null },
  },
  { timestamps: true },
);

// A plain `sparse: true` compound index still indexes manual posts here, since `source` is
// always present — sparse only skips a document when *every* indexed field is missing. A partial
// filter is the correct way to uniquely index only posts that actually carry an external id.
announcementSchema.index(
  { source: 1, sourcePostId: 1 },
  { unique: true, partialFilterExpression: { sourcePostId: { $exists: true } } },
);

export const Announcement = model<AnnouncementDoc>("Announcement", announcementSchema, "announcements");
