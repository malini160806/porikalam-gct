import type { StatItem, TimelineStep } from './types';

export const statistics: StatItem[] = [
  { id: 'st1', label: 'Events', value: 125, suffix: '+', icon: 'calendar' },
  { id: 'st2', label: 'Colleges', value: 50, suffix: '+', icon: 'landmark' },
  { id: 'st3', label: 'Participants', value: 5000, suffix: '+', icon: 'users' },
  { id: 'st4', label: 'Prize Pool', value: 300000, suffix: '+', icon: 'trophy' },
];

export const timeline: TimelineStep[] = [
  {
    id: 'tl1',
    label: 'Registrations',
    date: '01 – 28 Feb 2026',
    description: 'Open registrations across all technical and non-technical events.',
  },
  {
    id: 'tl2',
    label: 'Shortlisting',
    date: '01 – 05 Mar 2026',
    description: 'Teams and individuals are shortlisted based on preliminary submissions.',
  },
  {
    id: 'tl3',
    label: 'Competitions',
    date: '13 – 14 Mar 2026',
    description: 'Two days of intense technical battles, workshops, and exhibitions.',
  },
  {
    id: 'tl4',
    label: 'Finale',
    date: '15 Mar 2026',
    description: 'Grand finale, closing ceremony, and felicitation of winners.',
  },
];
