import { Schema, model, Types } from "mongoose";

export type AdminRole = "super_admin" | "event_admin";

export interface AdminDoc {
  _id: Types.ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  name: string;
  role: AdminRole;
  permissions: string[];
  /** Event slugs this admin may manage. Only meaningful for role: "event_admin" — super_admin implicitly has all. */
  assignedEvents: string[];
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<AdminDoc>(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ["super_admin", "event_admin"], default: "event_admin" },
    permissions: { type: [String], default: [] },
    assignedEvents: { type: [String], default: [] },
    isActive: { type: Boolean, required: true, default: true },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true },
);

export const Admin = model<AdminDoc>("Admin", adminSchema, "admins");
