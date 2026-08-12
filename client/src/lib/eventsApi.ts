import { apiFetch } from '@/lib/apiClient';
import type { EventDto } from '@/types/api';
import type { EventItem } from '@/data/types';

function toEventItem(dto: EventDto): EventItem {
  return {
    id: dto.slug,
    title: dto.event_name,
    category: dto.category,
    description: dto.description,
    format: dto.team_type,
    teamSize: dto.team_size,
    formatMode: dto.event_type,
    prequalifierRequired: dto.prequalifier_required,
    duration: dto.duration,
    expectedParticipants: dto.expected_participants,
    venue: dto.venue,
    resources: dto.resources ?? undefined,
    eligibility: dto.eligibility,
    primaryDomains: dto.target_sub_category.length > 0 ? dto.target_sub_category : undefined,
    whyIncluded: dto.why_included ?? undefined,
    budget: dto.budget ?? undefined,
    prizePool: dto.prize_pool ?? undefined,
    registrationFee: dto.registration_fee ?? undefined,
    icon: dto.icon,
    poster: dto.poster ?? undefined,
  };
}

/** Fetches every event from the database, in the organizers' finalized order. */
export async function fetchEvents(): Promise<EventItem[]> {
  const { events } = await apiFetch<{ events: EventDto[] }>('/events', { auth: false });
  return events.map(toEventItem);
}

export async function fetchEventBySlug(slug: string): Promise<EventItem | null> {
  try {
    const { event } = await apiFetch<{ event: EventDto }>(`/events/${slug}`, { auth: false });
    return toEventItem(event);
  } catch {
    return null;
  }
}
