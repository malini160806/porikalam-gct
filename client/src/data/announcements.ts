import type { AnnouncementItem } from './types';

export const announcements: AnnouncementItem[] = [
  {
    id: 'an1',
    title: 'Registrations for Porikkalam 2026 are now open',
    date: '2026-08-01',
    category: 'registration',
    content:
      'Create your participant account and reserve your PKM26#### username. Early registration closes soon — head to the Register page to get started.',
    pinned: true,
  },
  {
    id: 'an2',
    title: 'Full 2-day schedule published',
    date: '2026-08-02',
    category: 'schedule',
    content:
      'The Day 1 / Day 2 event timeline is now live on the Schedule page, including the Inaugural Ceremony and Valedictory & Prize Distribution slots.',
  },
  {
    id: 'an3',
    title: 'AI Workshop seats are limited',
    date: '2026-08-02',
    category: 'workshop',
    content:
      'The AI Workshop has a capped seat count. Participants are encouraged to register early to secure a spot.',
  },
  {
    id: 'an4',
    title: 'Accommodation requests open for outstation participants',
    date: '2026-08-05',
    category: 'general',
    content:
      'On-campus accommodation can now be requested by outstation participants, subject to availability. See the Accommodation page for details.',
  },
  {
    id: 'an5',
    title: 'Online prequalifier round scheduled for Mid-August 2026',
    date: '2026-08-06',
    category: 'schedule',
    content:
      'Events marked "Prequalifier Required" will hold their online round in Mid-August 2026. Only participants who qualify will be selected to compete in person at the 2-day mega event on 25–26 September 2026. Check the Events page to see which events require a prequalifier.',
    pinned: true,
  },
];
