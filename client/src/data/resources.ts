import type { ResourceItem } from './types';

/** fileUrl stays null until real downloadable files are supplied — Resources.tsx renders these as disabled "coming soon". */
export const resources: ResourceItem[] = [
  {
    id: 'r1',
    title: 'Event Rulebook',
    description: 'Detailed rules, judging criteria, and conduct guidelines for every competition.',
    category: 'rulebook',
    icon: 'scroll-text',
    fileUrl: null,
  },
  {
    id: 'r2',
    title: 'Porikkalam 2026 Brochure',
    description: 'A complete overview of events, tracks, and highlights for this edition.',
    category: 'brochure',
    icon: 'clipboard-list',
    fileUrl: null,
  },
  {
    id: 'r3',
    title: 'Campus Map',
    description: 'Venue locations for every event, workshop, and facility across campus.',
    category: 'map',
    icon: 'map',
    fileUrl: null,
  },
  {
    id: 'r4',
    title: 'Event Handbook',
    description: 'A participant handbook covering schedules, guidelines, and on-campus support.',
    category: 'handbook',
    icon: 'landmark',
    fileUrl: null,
  },
];
