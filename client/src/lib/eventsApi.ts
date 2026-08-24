import { EVENTS } from '@/data/events';
import type { EventItem } from '@/data/types';

/** Returns every event from the static finalized list, in the organizers' order. */
export async function fetchEvents(): Promise<EventItem[]> {
  return EVENTS;
}

export async function fetchEventBySlug(slug: string): Promise<EventItem | null> {
  return EVENTS.find((event) => event.id === slug) ?? null;
}
