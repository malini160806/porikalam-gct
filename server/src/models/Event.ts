import { Schema, model, Types } from "mongoose";

export type EventCategory = "technical" | "non-technical" | "workshop";
export type EventTeamType = "individual" | "team";
export type EventType = "competition" | "participation";

export interface EventDoc {
  _id: Types.ObjectId;
  eventName: string;
  slug: string;
  category: EventCategory;
  description: string;
  eligibility: string;
  targetParticipants: number;
  targetSubCategory: string[];
  whyIncluded?: string | null;
  teamType: EventTeamType;
  teamSize: string;
  eventType: EventType;
  prequalifierRequired: boolean;
  duration: string;
  expectedParticipants: number;
  venue: string;
  resources?: string | null;
  referenceLink?: string | null;
  budget?: string | null;
  prizePool?: string | null;
  registrationFee?: string | null;
  poster?: string | null;
  icon: string;
  registrationOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<EventDoc>(
  {
    eventName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, enum: ["technical", "non-technical", "workshop"] },
    description: { type: String, required: true },
    // Always "Open to All Departments" — every Porikkalam 2026 event is open to every department.
    eligibility: { type: String, required: true, default: "Open to All Departments" },
    targetParticipants: { type: Number, required: true },
    // Informational "primary domain" tags only — never used to gate registration.
    targetSubCategory: { type: [String], default: [] },
    whyIncluded: { type: String, trim: true, default: null },
    teamType: { type: String, required: true, enum: ["individual", "team"] },
    teamSize: { type: String, required: true, trim: true },
    eventType: { type: String, required: true, enum: ["competition", "participation"] },
    prequalifierRequired: { type: Boolean, required: true, default: false },
    duration: { type: String, required: true, trim: true },
    expectedParticipants: { type: Number, required: true },
    venue: { type: String, required: true, trim: true },
    resources: { type: String, trim: true, default: null },
    referenceLink: { type: String, trim: true, default: null },
    budget: { type: String, trim: true, default: null },
    prizePool: { type: String, trim: true, default: null },
    registrationFee: { type: String, trim: true, default: null },
    poster: { type: String, trim: true, default: null },
    icon: { type: String, required: true, trim: true },
    registrationOpen: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

export const Event = model<EventDoc>("Event", eventSchema, "events");
