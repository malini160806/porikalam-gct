export type EventCategory = 'premium' | 'technical' | 'non-technical';

export type EventFormat = 'team' | 'individual';

export type EventFormatMode = 'competition' | 'participation';

export type EventRegistrationStatus = 'open' | 'closed' | 'coming-soon';

export type EventItem = {
  /** URL slug — also the Mongo document's unique key. */
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  format: EventFormat;
  /** Explicit team size as given by the organizers: 'Individual', 'Team', or a headcount like '4'. */
  teamSize: string;
  formatMode: EventFormatMode;
  prequalifierRequired: boolean;
  duration: string;
  expectedParticipants: number;
  venue: string;
  resources?: string;
  /** Always 'Open to All Departments' — shown as the eligibility badge on every event. */
  eligibility: string;
  /** Informational "primary domain" tags (e.g. 'Civil', 'CSE') — never used to gate registration. */
  primaryDomains?: string[];
  whyIncluded?: string;
  budget?: string;
  prizePool?: string;
  registrationFee?: string;
  icon: string;
  /** Official event poster/artwork. Falls back to a heritage-themed placeholder when absent. */
  poster?: string;
  /** Defaults to 'open' when omitted — registration is live sitewide. */
  registrationStatus?: EventRegistrationStatus;
};

export type Sponsor = {
  id: string;
  name: string;
  tier: 'organizer' | 'title' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
  initials: string;
  description?: string;
  /** Actual brand logo image — when present, cards render this instead of the initials badge. */
  logo?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  team: 'faculty' | 'core' | 'organizing' | 'volunteer' | 'technical' | 'media' | 'design';
  initials: string;
  department?: string;
  photo?: string;
  email?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: 'registration' | 'payments' | 'certificates' | 'accommodation' | 'rules' | 'general';
};

export type StatItem = {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
};

export type TimelineStep = {
  id: string;
  label: string;
  date: string;
  description: string;
};

export type ScheduleItem = {
  id: string;
  day: 1 | 2;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  type: 'session' | 'workshop' | 'ceremony' | 'break';
  venue: string;
  relatedEventId?: string;
};

export type AnnouncementItem = {
  id: string;
  title: string;
  date: string;
  category: 'registration' | 'schedule' | 'workshop' | 'general' | 'social';
  content: string;
  pinned?: boolean;
  source?: 'manual' | 'instagram' | 'facebook';
  sourceUrl?: string;
  mediaUrl?: string;
};

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  category: 'rulebook' | 'brochure' | 'map' | 'handbook';
  icon: string;
  fileUrl: string | null;
};

export type MediaItem = {
  id: string;
  title: string;
  date: string;
  type: 'press' | 'news';
  summary: string;
};

export type LeaderboardEntry = {
  id: string;
  rank: number;
  name: string;
  points: number;
};

export type CoreTeamDomain = {
  id: string;
  name: string;
  icon: string;
  order: number;
};

export type CoreTeamMember = {
  id: string;
  name: string;
  domain: string;
  role?: string;
  photo?: string;
  linkedin?: string;
  email?: string;
  order: number;
};
