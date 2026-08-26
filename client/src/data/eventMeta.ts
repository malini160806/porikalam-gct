import type { EventItem } from './types';

export const EVENT_CATEGORY_LABELS: Record<EventItem['category'], string> = {
  technical: 'Technical',
  'non-technical': 'Non-Technical',
  premium: 'Premium',
};

/**
 * Filter tabs are displayed in a fixed order:
 * All → Premium → Technical → Non-Technical
 */
export function getEventFilters(
  events: EventItem[],
): { label: string; value: 'all' | EventItem['category'] }[] {
  const categoryOrder: EventItem['category'][] = [
    'premium',
    'technical',
    'non-technical',
  ];

  const existingCategories = new Set(
    events.map((event) => event.category),
  );

  return [
    { label: 'All', value: 'all' },
    ...categoryOrder
      .filter((category) => existingCategories.has(category))
      .map((category) => ({
        label: EVENT_CATEGORY_LABELS[category],
        value: category,
      })),
  ];
}