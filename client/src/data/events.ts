import type { EventItem } from './types';

const TBA = 'To Be Announced';

/**
 * Single source of truth for every event on the site, transcribed from the
 * official "TENTATIVE FINALIZED EVENT LIST" document. Array order is the
 * source document's order, and doubles as the default "featured" priority
 * (see EVENT_FILTERS / getFeaturedEvents below) so nothing here is
 * hand-picked for display.
 */
export const events: EventItem[] = [
  {
    id: 'the-outliner',
    title: 'The Outliner',
    category: 'non-technical',
    department: 'Open to All Departments',
    description:
      "This is a drawing event in which you will be given a certain sketch, but you should think outside the box and draw what is not intended in the given sketch.",
    format: 'individual',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '2 Hours',
    venue: 'Printed A4 sheets',
    icon: 'pen-tool',
    tags: ['Open to All'],
  },
  {
    id: 'sitesprint',
    title: 'SiteSprint',
    category: 'technical',
    department: 'Civil Engineering',
    description:
      'A real-world construction management challenge where teams act as site engineers and solve practical problems such as budget constraints, material shortages, safety issues, and design changes.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: true,
    duration: TBA,
    venue: 'Classroom',
    icon: 'hard-hat',
    tags: ['Civil Engineering'],
  },
  {
    id: 'structron',
    title: 'Structron',
    category: 'technical',
    department: 'Civil Engineering',
    description:
      'A hands-on structural engineering competition that challenges participants to design and construct a model structure using the materials provided. Teams must apply engineering principles, creativity, and practical building skills to create a stable, efficient structure capable of withstanding the maximum load applied during testing. Structures are evaluated on load-bearing capacity, stability, structural efficiency, innovation, and overall performance.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    venue: 'Building materials, testing load rig',
    icon: 'landmark',
    tags: ['Civil Engineering'],
  },
  {
    id: 'concept-clash',
    title: 'Concept Clash',
    category: 'technical',
    department: 'Open to All Departments',
    description:
      'A technical debate competition where two teams present opposing perspectives on a given engineering or technology topic — one defending the concept, the other opposing it. Teams are judged on logical reasoning, practical examples, technical knowledge, and overall debate performance.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    venue: 'Classroom',
    icon: 'message-square-text',
    tags: ['Open to All'],
  },
  {
    id: 'deep-dive-challenge',
    title: 'Deep Dive Challenge',
    category: 'technical',
    department: 'Open to All Departments',
    description:
      'Participants are given a topic related to a specific subject and must quickly understand it, analyze it in depth, and present their insights within the allotted time — testing technical knowledge, analytical thinking, and presentation skills.',
    format: 'individual',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    venue: 'Classroom',
    icon: 'presentation',
    tags: ['Open to All'],
  },
  {
    id: 'brainstorm-battle',
    title: 'Brainstorm Battle',
    category: 'technical',
    department: 'Open to All Departments',
    description:
      'A three-round assessment of future engineering leaders: Round 1 — Qualifier (Aptitude); Round 2 — Group Discussion on a technical topic to assess communication, teamwork, and analytical skills; Round 3 — Final Interview.',
    format: 'individual',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    venue: 'Classroom',
    icon: 'brain-cog',
    tags: ['Open to All'],
  },
  {
    id: 'civil-cbi',
    title: 'Civil CBI',
    category: 'technical',
    department: 'Civil Engineering',
    description:
      'Participants are shown real civil engineering site pictures and must find the defects in the site activity, write the reason behind them, and explain how to overcome the issue.',
    format: 'individual',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    venue: 'Classroom',
    icon: 'search',
    tags: ['Civil Engineering'],
  },
  {
    id: 'robo-soccer',
    title: 'Robo Soccer',
    category: 'technical',
    department: 'Mechanical, EEE, ECE, IT, Production',
    description:
      'Build a robotic vehicle with the given source materials and compete head-to-head — the winner is decided by number of goals scored.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    venue: 'Arena for soccer',
    icon: 'bot',
    tags: ['Mechanical', 'EEE', 'ECE', 'IT', 'Production'],
  },
  {
    id: 'flightcraft-skyworks',
    title: 'Flightcraft, Skyworks',
    category: 'technical',
    department: 'Open to All Departments',
    description:
      'Round 1: build a paper glider using only the materials provided and launch it on event day. Round 2: maximize and maintain flight time by applying sound aerodynamic principles — wing design, balance, stability, and weight distribution. Fliers are judged on load-bearing capacity and sustained flight time, with distance or stability as tie-breakers.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '2 Hours',
    venue: TBA,
    icon: 'plane',
    tags: ['Open to All'],
  },
  {
    id: 'water-rokletry',
    title: 'Water Rokletry',
    category: 'technical',
    department: 'Open to All Departments',
    description:
      'A safer, more accessible alternative to full rocket launches that still attracts strong participation — evaluated on flight distance and travel mode.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    venue: 'Open ground and launcher',
    icon: 'rocket',
    tags: ['Open to All'],
  },
  {
    id: 'gear-heads',
    title: 'Gear Heads',
    category: 'technical',
    department: 'Mechanical, Production',
    description:
      'A multi-round technical event testing knowledge of automotive engines and modern automotive technologies, culminating in a hands-on mechanical assembly/disassembly task or troubleshooting simulation under a fixed time limit.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: 'Half Day',
    venue: 'Seminar hall, machine shop',
    icon: 'cog',
    tags: ['Mechanical', 'Production'],
  },
  {
    id: 'what-if-reverse-engineering-debugging',
    title: 'What If? (Reverse Engineering & Debugging)',
    category: 'technical',
    department: 'EEE, ECE, EIE',
    description:
      'Explore what happens when electrical circuits are connected incorrectly. Analyze faults, predict circuit behavior, identify the cause, and suggest the correct solution — testing troubleshooting, analytical thinking, and real-world electrical safety knowledge.',
    format: 'individual',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '30 Minutes',
    venue: 'Classrooms',
    icon: 'circuit-board',
    tags: ['EEE', 'ECE', 'EIE'],
  },
  {
    id: 'robo-rally',
    title: 'Robo Rally',
    category: 'technical',
    department: 'Open to All Departments',
    description:
      'Design and build a robotic vehicle to navigate a specially designed obstacle track. If a robot deviates from the track, overturns, or is unable to proceed, it is repositioned at the last successfully crossed checkpoint. Robots violating technical regulations are disqualified.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: 'Half Day',
    venue: 'Ground',
    icon: 'bot',
    tags: ['Open to All'],
  },
  {
    id: 'industry-5-0-challenge',
    title: 'Industry 5.0 Challenge',
    category: 'technical',
    department: 'Open to All Departments',
    description:
      'Real industry problems replace the usual paper presentation format — teams get 2–3 hours to prepare a solution and pitch it, Shark Tank style.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '2 Hours',
    venue: 'Classroom, projector, internet',
    icon: 'factory',
    tags: ['Open to All'],
  },
  {
    id: 'product-presentation',
    title: 'Product Presentation',
    category: 'technical',
    department: 'Open to All Departments',
    description:
      'Participants showcase a fully functional product that solves a real-world problem, explaining the design process, working principle, technical implementation, testing results, and applications while demonstrating it to the judges.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: 'Full Day',
    venue: 'Showcase space with table and chairs',
    icon: 'presentation',
    tags: ['Open to All'],
  },
  {
    id: 'code-detective-speed-relay',
    title: 'Code Detective — Speed Relay',
    category: 'technical',
    department: 'CSE, IT, AI/ML',
    description:
      'A 4-person relay against the clock: Round 1 (5 min) Bug Fix — Member 1 fixes as many bugs as possible before the code is locked and passed on. Round 2 (5 min) Optimize — Member 2 reduces time/memory complexity without starting over. Round 3 (5 min) Test — Member 3 runs hidden test cases and fixes edge cases and runtime errors. Round 4 (5–10 min) Explain — Member 4 explains the fixes, why the solution is faster, and its time complexity, with bonus points for finishing early or tackling a harder twist.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '1 Hour',
    venue: 'Lab and computers',
    icon: 'bug',
    tags: ['CSE', 'IT', 'AI/ML'],
  },
  {
    id: 'requirement-rumble',
    title: 'Requirement Rumble',
    category: 'technical',
    department: 'Open to All Departments',
    description:
      'Round 1: Client Chaos — teams interact with judges acting as clients to gather and clarify incomplete or ambiguous requirements. Round 2: Blueprint Builder — teams convert the gathered requirements into user stories, use cases, and acceptance criteria using simple design artifacts like wireframes or flow diagrams. Round 3: Build Sprint — teams develop a working prototype based on their blueprint and adapt it to a new requirement introduced mid-development.',
    format: 'team',
    formatMode: 'competition',
    prequalifierRequired: false,
    duration: '2 Hours',
    venue: TBA,
    icon: 'clipboard-list',
    tags: ['Open to All'],
  },
  {
    id: 'ai-workshop',
    title: 'AI Workshop',
    category: 'workshop',
    department: 'Open to All Departments',
    description:
      'A hands-on session introducing AI tools and workflows beyond the basics most students already know, helping participants use AI properly and confidently in their engineering work and careers.',
    format: 'team',
    formatMode: 'participation',
    prequalifierRequired: false,
    duration: '2 Hours',
    venue: 'Seminar hall',
    icon: 'brain-circuit',
    tags: ['Open to All'],
  },
];

export const EVENT_CATEGORY_LABELS: Record<EventItem['category'], string> = {
  technical: 'Technical',
  'non-technical': 'Non-Technical',
  workshop: 'Workshops',
};

/** Filter options generated from whichever categories actually exist in `events` — never hardcoded. */
export const EVENT_FILTERS: { label: string; value: 'all' | EventItem['category'] }[] = [
  { label: 'All', value: 'all' },
  ...Array.from(new Set(events.map((event) => event.category))).map((category) => ({
    label: EVENT_CATEGORY_LABELS[category],
    value: category,
  })),
];

/** Distinct departments across all events, for filter UIs — derived, never hand-typed. */
export const EVENT_DEPARTMENTS: string[] = Array.from(
  new Set(events.flatMap((event) => event.tags)),
).sort();

/** First N events in source order — deterministic, not hand-curated. */
export function getFeaturedEvents(count = 6): EventItem[] {
  return events.slice(0, count);
}
