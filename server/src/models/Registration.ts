import { Schema, model, Types } from "mongoose";

export type RegistrationStatus = "submitted" | "confirmed" | "cancelled";

export interface RegistrationDoc {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  eventSlug: string;
  eventName: string;
  eventCategory: string;
  participantName: string;
  contactEmail: string;
  phone: string;
  college?: string | null;
  department?: string | null;
  yearOfStudy?: string | null;
  teamName?: string | null;
  teammateNames?: string | null;
  notes?: string | null;
  status: RegistrationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema<RegistrationDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    eventSlug: { type: String, required: true, trim: true, lowercase: true },
    eventName: { type: String, required: true, trim: true },
    eventCategory: { type: String, required: true, trim: true },
    // Snapshot of the participant's profile at registration time — the
    // profile itself is never re-collected, so this just mirrors it.
    participantName: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    college: { type: String, trim: true, default: null },
    department: { type: String, trim: true, default: null },
    yearOfStudy: { type: String, trim: true, default: null },
    teamName: { type: String, trim: true, default: null },
    teammateNames: { type: String, trim: true, default: null },
    notes: { type: String, trim: true, default: null },
    status: { type: String, required: true, enum: ["submitted", "confirmed", "cancelled"], default: "confirmed" },
  },
  { timestamps: true },
);

// One participant can only hold one (non-cancelled-aware-at-app-level) registration per event.
registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export const Registration = model<RegistrationDoc>("Registration", registrationSchema, "registrations");
