import type { HydratedDocument } from "mongoose";
import type { UserDoc } from "../models/User.js";
import type { EventDoc } from "../models/Event.js";
import type { AdminDoc } from "../models/Admin.js";
import type { AnnouncementDoc } from "../models/Announcement.js";
import type { RegistrationDoc } from "../models/Registration.js";

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
    registration_open: event.registrationOpen ?? true,
    created_at: event.createdAt.toISOString(),
    updated_at: event.updatedAt.toISOString(),
  };
}

export function serializeAnnouncement(announcement: HydratedDocument<AnnouncementDoc>) {
  return {
    id: announcement._id.toString(),
    title: announcement.title,
    content: announcement.content,
    date: announcement.date.toISOString(),
    category: announcement.category,
    pinned: announcement.pinned,
    source: announcement.source,
    source_url: announcement.sourceUrl ?? null,
    media_url: announcement.mediaUrl ?? null,
  };
}

export function serializeRegistration(registration: HydratedDocument<RegistrationDoc>) {
  return {
    id: registration._id.toString(),
    user_id: registration.userId.toString(),
    event_key: registration.eventSlug,
    event_name: registration.eventName,
    event_category: registration.eventCategory,
    participant_name: registration.participantName,
    contact_email: registration.contactEmail,
    phone: registration.phone,
    college: registration.college ?? null,
    department: registration.department ?? null,
    year_of_study: registration.yearOfStudy ?? null,
    team_id: registration.teamId.toString(),
    role: registration.role,
    team_name: registration.teamName ?? null,
    teammates: registration.teammates.map((teammate) => ({
      user_id: teammate.userId.toString(),
      username: teammate.username,
      name: teammate.name,
      role: teammate.role,
    })),
    payment_reference: registration.paymentReference ?? null,
    payment_screenshot_url: registration.paymentScreenshotUrl ?? null,
    notes: registration.notes ?? null,
    status: registration.status,
    checked_in_at: registration.checkedInAt ? registration.checkedInAt.toISOString() : null,
    created_at: registration.createdAt.toISOString(),
    updated_at: registration.updatedAt.toISOString(),
  };
}

export function serializeAdmin(admin: HydratedDocument<AdminDoc>) {
  return {
    id: admin._id.toString(),
    username: admin.username,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    permissions: admin.permissions,
    assigned_events: admin.assignedEvents,
    is_active: admin.isActive,
    last_login: admin.lastLogin ? admin.lastLogin.toISOString() : null,
    created_at: admin.createdAt.toISOString(),
    updated_at: admin.updatedAt.toISOString(),
  };
}
