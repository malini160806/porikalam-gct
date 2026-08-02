import type { ScheduleItem } from './types';

/** Structural 2-day event schedule. Session slots reference real events from events.ts by id via relatedEventId. */
export const schedule: ScheduleItem[] = [
  // Day 1 — 25 September 2026
  { id: 'sch-d1-1', day: 1, date: '25 Sept 2026', startTime: '08:30', endTime: '09:30', title: 'Registration & Kit Collection', type: 'session', venue: 'Main Entrance' },
  { id: 'sch-d1-2', day: 1, date: '25 Sept 2026', startTime: '09:30', endTime: '10:30', title: 'Inaugural Ceremony', type: 'ceremony', venue: 'Main Auditorium' },
  { id: 'sch-d1-3', day: 1, date: '25 Sept 2026', startTime: '10:45', endTime: '12:45', title: 'The Outliner', type: 'session', venue: 'Printed A4 sheets', relatedEventId: 'the-outliner' },
  { id: 'sch-d1-4', day: 1, date: '25 Sept 2026', startTime: '10:45', endTime: '11:45', title: 'Civil CBI', type: 'session', venue: 'Classroom', relatedEventId: 'civil-cbi' },
  { id: 'sch-d1-5', day: 1, date: '25 Sept 2026', startTime: '11:00', endTime: '13:00', title: 'AI Workshop', type: 'workshop', venue: 'Seminar Hall', relatedEventId: 'ai-workshop' },
  { id: 'sch-d1-6', day: 1, date: '25 Sept 2026', startTime: '13:00', endTime: '14:00', title: 'Lunch Break', type: 'break', venue: 'Campus Dining' },
  { id: 'sch-d1-7', day: 1, date: '25 Sept 2026', startTime: '14:00', endTime: '15:00', title: 'Concept Clash', type: 'session', venue: 'Classroom', relatedEventId: 'concept-clash' },
  { id: 'sch-d1-8', day: 1, date: '25 Sept 2026', startTime: '14:00', endTime: '15:00', title: "What If? (Reverse Engineering & Debugging)", type: 'session', venue: 'Classrooms', relatedEventId: 'what-if-reverse-engineering-debugging' },
  { id: 'sch-d1-9', day: 1, date: '25 Sept 2026', startTime: '15:00', endTime: '16:00', title: 'Deep Dive Challenge', type: 'session', venue: 'Classroom', relatedEventId: 'deep-dive-challenge' },
  { id: 'sch-d1-10', day: 1, date: '25 Sept 2026', startTime: '15:00', endTime: '17:00', title: 'Structron', type: 'session', venue: 'Building materials, testing load rig', relatedEventId: 'structron' },
  { id: 'sch-d1-11', day: 1, date: '25 Sept 2026', startTime: '16:00', endTime: '17:00', title: 'Code Detective — Speed Relay', type: 'session', venue: 'Lab and computers', relatedEventId: 'code-detective-speed-relay' },

  // Day 2 — 26 September 2026
  { id: 'sch-d2-1', day: 2, date: '26 Sept 2026', startTime: '09:00', endTime: '10:00', title: 'Brainstorm Battle', type: 'session', venue: 'Classroom', relatedEventId: 'brainstorm-battle' },
  { id: 'sch-d2-2', day: 2, date: '26 Sept 2026', startTime: '09:00', endTime: '11:00', title: 'Robo Soccer', type: 'session', venue: 'Arena for soccer', relatedEventId: 'robo-soccer' },
  { id: 'sch-d2-3', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '12:00', title: 'Flightcraft, Skyworks', type: 'session', venue: 'Open ground', relatedEventId: 'flightcraft-skyworks' },
  { id: 'sch-d2-4', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '11:00', title: 'Water Rokletry', type: 'session', venue: 'Open ground and launcher', relatedEventId: 'water-rokletry' },
  { id: 'sch-d2-5', day: 2, date: '26 Sept 2026', startTime: '12:00', endTime: '13:00', title: 'Lunch Break', type: 'break', venue: 'Campus Dining' },
  { id: 'sch-d2-6', day: 2, date: '26 Sept 2026', startTime: '13:00', endTime: '18:00', title: 'Gear Heads', type: 'session', venue: 'Seminar hall, machine shop', relatedEventId: 'gear-heads' },
  { id: 'sch-d2-7', day: 2, date: '26 Sept 2026', startTime: '13:00', endTime: '18:00', title: 'Robo Rally', type: 'session', venue: 'Ground', relatedEventId: 'robo-rally' },
  { id: 'sch-d2-8', day: 2, date: '26 Sept 2026', startTime: '14:00', endTime: '16:00', title: 'Industry 5.0 Challenge', type: 'session', venue: 'Classroom', relatedEventId: 'industry-5-0-challenge' },
  { id: 'sch-d2-9', day: 2, date: '26 Sept 2026', startTime: '14:00', endTime: '16:00', title: 'Requirement Rumble', type: 'session', venue: 'TBA', relatedEventId: 'requirement-rumble' },
  { id: 'sch-d2-10', day: 2, date: '26 Sept 2026', startTime: '09:00', endTime: '18:00', title: 'Product Presentation', type: 'session', venue: 'Showcase space', relatedEventId: 'product-presentation' },
  { id: 'sch-d2-11', day: 2, date: '26 Sept 2026', startTime: '18:30', endTime: '19:30', title: 'Valedictory Ceremony & Prize Distribution', type: 'ceremony', venue: 'Main Auditorium' },
];
