import type { HydratedDocument } from "mongoose";
import type { UserDoc } from "../models/User.js";
import type { EventDoc } from "../models/Event.js";

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

export function serializeEvent(event: HydratedDocument<EventDoc>) {
  return {
    id: event._id.toString(),
    event_name: event.eventName,
    slug: event.slug,
    category: event.category,
    description: event.description,
    eligibility: event.eligibility,
    target_participants: event.targetParticipants,
    target_sub_category: event.targetSubCategory,
    why_included: event.whyIncluded ?? null,
    team_type: event.teamType,
    team_size: event.teamSize,
    event_type: event.eventType,
    prequalifier_required: event.prequalifierRequired,
    duration: event.duration,
    expected_participants: event.expectedParticipants,
    venue: event.venue,
    resources: event.resources ?? null,
    reference_link: event.referenceLink ?? null,
    budget: event.budget ?? null,
    prize_pool: event.prizePool ?? null,
    registration_fee: event.registrationFee ?? null,
    poster: event.poster ?? null,
    icon: event.icon,
    created_at: event.createdAt.toISOString(),
    updated_at: event.updatedAt.toISOString(),
  };
}
