import type { HydratedDocument } from "mongoose";
import type { UserDoc } from "../models/User.js";

export function serializeUser(user: HydratedDocument<UserDoc>) {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    phone: user.phone,
    display_name: user.displayName,
    dob: user.dob ? user.dob.toISOString() : null,
    gender: user.gender ?? null,
    college: user.college ?? null,
    department: user.department ?? null,
    degree: user.degree ?? null,
    year_of_study: user.yearOfStudy ?? null,
    register_number: user.registerNumber ?? null,
    city: user.city ?? null,
    state: user.state ?? null,
    guardian_name: user.guardianName ?? null,
    emergency_contact: user.emergencyContact ?? null,
    profile_photo_url: user.profilePhotoUrl ?? null,
    managed_event: user.managedEvent ?? null,
    created_at: user.createdAt.toISOString(),
    updated_at: user.updatedAt.toISOString(),
  };
}
