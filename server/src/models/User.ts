import { Schema, model, Types } from "mongoose";

export interface UserDoc {
  _id: Types.ObjectId;
  username: string;
  email: string;
  phone: string;
  passwordHash: string;
  displayName: string;
  dob?: Date | null;
  gender?: string | null;
  college?: string | null;
  department?: string | null;
  degree?: string | null;
  yearOfStudy?: string | null;
  registerNumber?: string | null;
  city?: string | null;
  state?: string | null;
  profilePhotoUrl?: string | null;
  managedEvent?: string | null;
  resetTokenHash?: string | null;
  resetTokenExpiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDoc>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    displayName: { type: String, required: true, trim: true },
    dob: { type: Date, default: null },
    gender: { type: String, trim: true, default: null },
    college: { type: String, trim: true, default: null },
    department: { type: String, trim: true, default: null },
    degree: { type: String, trim: true, default: null },
    yearOfStudy: { type: String, trim: true, default: null },
    registerNumber: { type: String, trim: true, default: null },
    city: { type: String, trim: true, default: null },
    state: { type: String, trim: true, default: null },
    profilePhotoUrl: { type: String, default: null },
    managedEvent: { type: String, default: null },
    resetTokenHash: { type: String, default: null, select: false },
    resetTokenExpiresAt: { type: Date, default: null, select: false },
  },
  { timestamps: true },
);

export const User = model<UserDoc>("User", userSchema, "users");
