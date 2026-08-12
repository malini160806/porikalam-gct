import type { EventItem } from './types';

export const EVENT_CATEGORY_LABELS: Record<EventItem['category'], string> = {
  technical: 'Technical',
  'non-technical': 'Non-Technical',
  workshop: 'Workshops',
};

/** Filter tab options derived from whichever categories actually exist in the given events — never hardcoded. */
export function getEventFilters(events: EventItem[]): { label: string; value: 'all' | EventItem['category'] }[] {
  return [
    { label: 'All', value: 'all' },
    ...Array.from(new Set(events.map((event) => event.category))).map((category) => ({
      label: EVENT_CATEGORY_LABELS[category],
      value: category,
    })),
  ];
}
