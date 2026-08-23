import type { ScheduleItem } from './types';

/** Finalized 2-day event agenda. Session slots reference real events from events.ts by id via
 * relatedEventId. THULIRA and TECH THIRAL run as continuous full-day flagship tracks on both days,
 * with every other programme scheduled around them. */
export const schedule: ScheduleItem[] = [
  // Day 1 — 25 September 2026 — Discover · Compete · Connect
  { id: 'sch-d1-1', day: 1, date: '25 Sept 2026', startTime: '09:00', endTime: '09:45', title: 'Inauguration', type: 'ceremony', venue: 'Main Auditorium' },
  { id: 'sch-d1-2', day: 1, date: '25 Sept 2026', startTime: '09:45', endTime: '10:00', title: 'Opening Ceremony — Thulira & Tech Thiral', type: 'ceremony', venue: 'Main Auditorium' },
  { id: 'sch-d1-3', day: 1, date: '25 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Thulira — Student Startup Challenge', type: 'session', venue: 'Open Auditorium' },
  { id: 'sch-d1-4', day: 1, date: '25 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Tech Thiral — Industry Expo', type: 'session', venue: 'Parking Space' },
  { id: 'sch-d1-5', day: 1, date: '25 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Tech Talks', type: 'session', venue: 'Main Auditorium' },
  { id: 'sch-d1-6', day: 1, date: '25 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Workshop', type: 'workshop', venue: 'TBA' },
  { id: 'sch-d1-7', day: 1, date: '25 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Paper Presentation', type: 'session', venue: 'DCKAP Room', relatedEventId: 'paper-presentation' },
  { id: 'sch-d1-8', day: 1, date: '25 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Hackonex', type: 'session', venue: 'Classrooms', relatedEventId: 'hackathon' },
  { id: 'sch-d1-9', day: 1, date: '25 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Deep Dive Challenge — Round 1', type: 'session', venue: 'Main Building Classrooms', relatedEventId: 'deep-dive-challenge' },
  { id: 'sch-d1-10', day: 1, date: '25 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Civil CBI', type: 'session', venue: 'Main Building Classrooms', relatedEventId: 'civil-cbi' },
  { id: 'sch-d1-11', day: 1, date: '25 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'SketchShift', type: 'session', venue: 'Drawing Hall – 112', relatedEventId: 'sketchshift' },
  { id: 'sch-d1-12', day: 1, date: '25 Sept 2026', startTime: '12:30', endTime: '13:30', title: 'Lunch Break', type: 'break', venue: 'Campus Dining' },
  { id: 'sch-d1-13', day: 1, date: '25 Sept 2026', startTime: '14:00', endTime: '16:00', title: 'Thulira — Student Startup Challenge', type: 'session', venue: 'Open Auditorium' },
  { id: 'sch-d1-14', day: 1, date: '25 Sept 2026', startTime: '14:00', endTime: '16:00', title: 'Tech Thiral — Industry Expo', type: 'session', venue: 'Parking Space' },
  { id: 'sch-d1-15', day: 1, date: '25 Sept 2026', startTime: '14:00', endTime: '15:00', title: 'Human Matrix', type: 'session', venue: 'Drawing Hall', relatedEventId: 'human-matrix' },
  { id: 'sch-d1-16', day: 1, date: '25 Sept 2026', startTime: '14:00', endTime: '16:00', title: 'Robo Soccer', type: 'session', venue: 'PJ Building Ground Floor Open Space', relatedEventId: 'robo-soccer' },
  { id: 'sch-d1-17', day: 1, date: '25 Sept 2026', startTime: '14:00', endTime: '15:00', title: 'What If? (Reverse Engineering & Debugging)', type: 'session', venue: 'Circuit Debugging Classroom', relatedEventId: 'what-if-reverse-engineering-debugging' },
  { id: 'sch-d1-18', day: 1, date: '25 Sept 2026', startTime: '14:00', endTime: '16:00', title: 'Flightcraft, Skyworks', type: 'session', venue: 'Alumni Auditorium', relatedEventId: 'flightcraft-skyworks' },
  { id: 'sch-d1-19', day: 1, date: '25 Sept 2026', startTime: '17:00', endTime: '17:30', title: 'Porikkalam Connect', type: 'ceremony', venue: 'Main Auditorium' },

  // Day 2 — 26 September 2026 — Compete · Experience · Celebrate
  { id: 'sch-d2-1', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Thulira — Student Startup Challenge', type: 'session', venue: 'Open Auditorium' },
  { id: 'sch-d2-2', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Tech Thiral — Industry Expo', type: 'session', venue: 'Parking Space' },
  { id: 'sch-d2-3', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '11:00', title: 'Tech Talks', type: 'session', venue: 'Main Auditorium' },
  { id: 'sch-d2-4', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '11:00', title: 'Workshop', type: 'workshop', venue: 'TBA' },
  { id: 'sch-d2-5', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Deep Dive Challenge — Round 2', type: 'session', venue: 'Main Building Classroom', relatedEventId: 'deep-dive-challenge' },
  { id: 'sch-d2-6', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Structron', type: 'session', venue: 'Main Building Classrooms', relatedEventId: 'structron' },
  { id: 'sch-d2-7', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Code Detective — Speed Relay', type: 'session', venue: 'DCKAP Room', relatedEventId: 'code-detective-speed-relay' },
  { id: 'sch-d2-8', day: 2, date: '26 Sept 2026', startTime: '10:00', endTime: '12:30', title: 'Poster Designing', type: 'session', venue: 'Main Building Classroom', relatedEventId: 'poster-designing' },
  { id: 'sch-d2-9', day: 2, date: '26 Sept 2026', startTime: '12:30', endTime: '13:30', title: 'Lunch Break', type: 'break', venue: 'Campus Dining' },
  { id: 'sch-d2-10', day: 2, date: '26 Sept 2026', startTime: '13:45', endTime: '16:00', title: 'Thulira — Student Startup Challenge', type: 'session', venue: 'Open Auditorium' },
  { id: 'sch-d2-11', day: 2, date: '26 Sept 2026', startTime: '13:45', endTime: '16:00', title: 'Tech Thiral — Industry Expo', type: 'session', venue: 'Parking Space' },
  { id: 'sch-d2-12', day: 2, date: '26 Sept 2026', startTime: '13:45', endTime: '16:00', title: 'Robo Rally', type: 'session', venue: 'PJ Building Ground Floor Open Space', relatedEventId: 'robo-rally' },
  { id: 'sch-d2-13', day: 2, date: '26 Sept 2026', startTime: '13:45', endTime: '16:00', title: 'Water Rocketry', type: 'session', venue: 'Sports Ground', relatedEventId: 'water-rocketry' },
  { id: 'sch-d2-14', day: 2, date: '26 Sept 2026', startTime: '13:45', endTime: '16:00', title: 'IPL Auction', type: 'session', venue: 'Main Building Classrooms', relatedEventId: 'ipl-auction' },
  { id: 'sch-d2-15', day: 2, date: '26 Sept 2026', startTime: '16:00', endTime: '16:30', title: 'Culturals', type: 'ceremony', venue: 'Main Auditorium' },
  { id: 'sch-d2-16', day: 2, date: '26 Sept 2026', startTime: '16:30', endTime: '18:00', title: 'Valedictory & Prize Distribution', type: 'ceremony', venue: 'Main Auditorium' },
];
