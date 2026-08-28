import type { StatItem, TimelineStep } from './types';

export const statistics: StatItem[] = [
  { id: 'st1', label: 'Events', value: 15, suffix: '+', icon: 'calendar' },
  { id: 'st2', label: 'Colleges', value: 40, suffix: '+', icon: 'landmark' },
  { id: 'st3', label: 'Participants', value: 1000, suffix: '+', icon: 'users' },
  { id: 'st4', label: 'Prize Pool', value: 135000, suffix: '+', icon: 'trophy' },
];

export const timeline: TimelineStep[] = [
  {
    id: 'tl1',
    label: 'Registrations',
    date: '01 Sept – 22 Sept 2026',
    description: 'Registration is open for all technical and non-technical events.',
  },
  {
    id: 'tl2',
    label: 'Shortlisting',
    date: '16 – 20 Sept 2026',
    description: 'Teams and individuals are shortlisted based on preliminary submissions.',
  },
  {
    id: 'tl3',
    label: 'Competitions',
    date: '25 – 26 Sept 2026',
    description: 'Two days of intense technical battles,  and exhibitions.',
  },
  {
    id: 'tl4',
    label: 'Finale',
    date: '26 Sept 2026',
    description: 'Grand finale, closing ceremony, and felicitation of winners.',
  },
];
