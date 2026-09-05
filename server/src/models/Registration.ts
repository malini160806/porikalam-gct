import { Schema, model, Types } from "mongoose";

export type RegistrationStatus = "submitted" | "confirmed" | "cancelled";
export type RegistrationRole = "leader" | "member";

export interface RegistrationTeammate {
  userId: Types.ObjectId;
  username: string;
  name: string;
  role: RegistrationRole;
}

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
  // Shared across every member's row so any teammate's own registration
  // reflects the same team and roster without a join.
  teamId: Types.ObjectId;
  role: RegistrationRole;
  teamName?: string | null;
  teammates: RegistrationTeammate[];
  paymentReference?: string | null;
  paymentScreenshotUrl?: string | null;
  notes?: string | null;
  status: RegistrationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const teammateSchema = new Schema<RegistrationTeammate>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ["leader", "member"] },
  },
  { _id: false },
);

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
    teamId: { type: Schema.Types.ObjectId, required: true },
    role: { type: String, required: true, enum: ["leader", "member"], default: "leader" },
    teamName: { type: String, trim: true, default: null },
    // Full roster snapshot, duplicated onto every member's own row so each
    // participant (leader or teammate) can see the whole team from their side.
    teammates: { type: [teammateSchema], default: [] },
    paymentReference: { type: String, trim: true, default: null },
    paymentScreenshotUrl: { type: String, trim: true, default: null },
    notes: { type: String, trim: true, default: null },
    status: { type: String, required: true, enum: ["submitted", "confirmed", "cancelled"], default: "confirmed" },
  },
  { timestamps: true },
);

// One participant can only hold one registration per event — enforced per
// row, so this also blocks a username being added to a second team for the
// same event.
registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });
registrationSchema.index({ teamId: 1 });

export const Registration = model<RegistrationDoc>("Registration", registrationSchema, "registrations");
