import type { EventItem } from './types';

/**
 * Event-specific visual identity system.
 *
 * EventDetail never hardcodes per-event visuals — it calls `getEventTheme(event)`
 * and renders the same layout with the returned theme's colors, icon motion and
 * background motif (see `EventThemeArt.tsx`). Adding a new event's identity means
 * adding one entry here, never touching the page component.
 */
export type EventThemeId =
  | 'civil-engineering'
  | 'structural-engineering'
  | 'deep-sea'
  | 'reverse-engineering'
  | 'code-investigation'
  | 'academic-research'
  | 'sketch-design'
  | 'human-matrix'
  | 'cricket-auction'
  | 'visual-design'
  | 'aviation'
  | 'rocketry'
  | 'robotics'
  | 'robotics-football'
  | 'hackathon-cyber'
  | 'default';

export type IconMotion = 'still' | 'pulse' | 'bob' | 'glow' | 'spin';

export type EventTheme = {
  id: EventThemeId;
  /** Short identity line rendered nowhere by default — kept for future use / debugging. */
  label: string;
  keywords: string[];
  /** Primary accent — drives borders, labels, dividers via the --accent CSS variable. */
  accent: string;
  /** Secondary tint — used for the second ambient glow and a handful of two-tone details. */
  accentSoft: string;
  /** Small lucide icon name shown as a corner badge on the event icon. */
  badge: string;
  iconMotion: IconMotion;
};

const THEME_DEFS: Record<Exclude<EventThemeId, 'default'>, EventTheme> = {
  'civil-engineering': {
    id: 'civil-engineering',
    label: 'Civil Engineering',
    keywords: ['civil', 'construction', 'blueprint', 'structure', 'site', 'building', 'survey'],
    accent: '#3b6ea5',
    accentSoft: '#8b7333',
    badge: 'Ruler',
    iconMotion: 'pulse',
  },
  'structural-engineering': {
    id: 'structural-engineering',
    label: 'Structural Engineering',
    keywords: ['structron', 'structural', 'beam', 'truss', 'load', 'frame'],
    accent: '#4a6478',
    accentSoft: '#8b7333',
    badge: 'Layers',
    iconMotion: 'still',
  },
  'deep-sea': {
    id: 'deep-sea',
    label: 'Deep Sea Exploration',
    keywords: ['deep dive', 'deep-dive', 'ocean', 'underwater', 'exploration', 'discovery'],
    accent: '#1f7a8c',
    accentSoft: '#3891ff',
    badge: 'Anchor',
    iconMotion: 'bob',
  },
  'reverse-engineering': {
    id: 'reverse-engineering',
    label: 'Reverse Engineering & Debugging',
    keywords: ['what if', 'reverse engineering', 'debugging', 'circuit', 'fault', 'troubleshoot'],
    accent: '#c0622b',
    accentSoft: '#3d5a75',
    badge: 'Bug',
    iconMotion: 'glow',
  },
  'code-investigation': {
    id: 'code-investigation',
    label: 'Code Investigation',
    keywords: ['code detective', 'detective', 'investigation', 'clue', 'terminal', 'relay'],
    accent: '#2f7a52',
    accentSoft: '#8b7333',
    badge: 'Terminal',
    iconMotion: 'glow',
  },
  'academic-research': {
    id: 'academic-research',
    label: 'Academic Research',
    keywords: ['paper presentation', 'research', 'academic', 'citation', 'thesis', 'scholarly'],
    accent: '#8b7333',
    accentSoft: '#3b6ea5',
    badge: 'GraduationCap',
    iconMotion: 'still',
  },
  'sketch-design': {
    id: 'sketch-design',
    label: 'Sketch & Creative Design',
    keywords: ['sketchshift', 'sketch', 'drawing', 'creative', 'draft', 'art'],
    accent: '#5a5248',
    accentSoft: '#d4af37',
    badge: 'PenTool',
    iconMotion: 'pulse',
  },
  'human-matrix': {
    id: 'human-matrix',
    label: 'Human Matrix',
    keywords: ['human matrix', 'matrix', 'puzzle', 'logic', 'network', 'clue', 'treasure'],
    accent: '#6b4fc4',
    accentSoft: '#3891ff',
    badge: 'Share2',
    iconMotion: 'pulse',
  },
  'cricket-auction': {
    id: 'cricket-auction',
    label: 'Cricket Auction',
    keywords: ['ipl', 'auction', 'cricket', 'bid', 'squad', 'team strategy'],
    accent: '#2f8f4e',
    accentSoft: '#d4af37',
    badge: 'Gavel',
    iconMotion: 'pulse',
  },
  'visual-design': {
    id: 'visual-design',
    label: 'Visual Design',
    keywords: ['visual vanguard', 'poster', 'design', 'visual', 'composition', 'artistic'],
    accent: '#b5446e',
    accentSoft: '#6b4fc4',
    badge: 'Shapes',
    iconMotion: 'spin',
  },
  aviation: {
    id: 'aviation',
    label: 'Aviation & Aerospace',
    keywords: ['flightcraft', 'flight', 'glider', 'aviation', 'aerodynamic', 'aerospace'],
    accent: '#3f7fb3',
    accentSoft: '#e9c766',
    badge: 'Navigation2',
    iconMotion: 'bob',
  },
  rocketry: {
    id: 'rocketry',
    label: 'Rocketry & Propulsion',
    keywords: ['water rocketry', 'rocket', 'launch', 'propulsion', 'trajectory', 'pressure'],
    accent: '#1c8a99',
    accentSoft: '#d9702e',
    badge: 'Droplet',
    iconMotion: 'bob',
  },
  robotics: {
    id: 'robotics',
    label: 'Robotics & Automation',
    keywords: ['robo rally', 'robotics', 'automation', 'sensor', 'checkpoint', 'obstacle'],
    accent: '#1f6fd6',
    accentSoft: '#3891ff',
    badge: 'Cpu',
    iconMotion: 'glow',
  },
  'robotics-football': {
    id: 'robotics-football',
    label: 'Robotics + Football',
    keywords: ['robo soccer', 'soccer', 'football', 'goal', 'field', 'match'],
    accent: '#3a9d6e',
    accentSoft: '#1f6fd6',
    badge: 'Target',
    iconMotion: 'pulse',
  },
  'hackathon-cyber': {
    id: 'hackathon-cyber',
    label: 'Hackathon & Cybersecurity',
    keywords: ['hackonex', 'hackathon', 'cybersecurity', 'encryption', 'network', 'hack'],
    accent: '#1f8a7a',
    accentSoft: '#001b2a',
    badge: 'Lock',
    iconMotion: 'glow',
  },
};

export const EVENT_THEMES: Record<EventThemeId, EventTheme> = {
  ...THEME_DEFS,
  default: {
    id: 'default',
    label: 'Porikkalam',
    keywords: [],
    accent: '#8b7333',
    accentSoft: '#d4af37',
    badge: 'Sparkle',
    iconMotion: 'still',
  },
};

/** Explicit id → theme mapping. Checked before keyword matching. */
const THEME_BY_EVENT_ID: Record<string, EventThemeId> = {
  'civil-cbi': 'civil-engineering',
  structron: 'structural-engineering',
  'deep-dive-challenge': 'deep-sea',
  'what-if-reverse-engineering-debugging': 'reverse-engineering',
  'code-detective-speed-relay': 'code-investigation',
  'paper-presentation': 'academic-research',
  sketchshift: 'sketch-design',
  'human-matrix': 'human-matrix',
  'ipl-auction': 'cricket-auction',
  'poster-designing': 'visual-design',
  Flightcraft: 'aviation',
  'water-rocketry': 'rocketry',
  'robo-rally': 'robotics',
  'robo-soccer': 'robotics-football',
  hackathon: 'hackathon-cyber',
};

/** Category fallback for any event with neither an explicit id mapping nor a keyword match. */
const CATEGORY_FALLBACK: Record<EventItem['category'], string> = {
  premium: '#d4af37',
  technical: '#3891ff',
  'non-technical': '#a46621',
};

function scoreTheme(theme: EventTheme, haystack: string): number {
  return theme.keywords.reduce((score, keyword) => (haystack.includes(keyword) ? score + 1 : score), 0);
}

/**
 * Resolves the visual theme for an event: explicit id mapping first, then keyword
 * matching against title/description/category/icon, then a category-tinted default.
 */
export function getEventTheme(event: EventItem): EventTheme {
  const byId = THEME_BY_EVENT_ID[event.id];
  if (byId) return EVENT_THEMES[byId];

  const haystack = `${event.title} ${event.description} ${event.category} ${event.icon}`.toLowerCase();

  let best: EventTheme | null = null;
  let bestScore = 0;
  for (const theme of Object.values(THEME_DEFS)) {
    const score = scoreTheme(theme, haystack);
    if (score > bestScore) {
      bestScore = score;
      best = theme;
    }
  }
  if (best) return best;

  return {
    ...EVENT_THEMES.default,
    accent: CATEGORY_FALLBACK[event.category],
  };
}
