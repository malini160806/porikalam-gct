export type EventCategory = 'technical' | 'non-technical' | 'workshop';

export type EventFormat = 'team' | 'individual';

export type EventFormatMode = 'competition' | 'participation';

export type EventItem = {
  id: string;
  title: string;
  category: EventCategory;
  /** 'Open to All Departments' or a comma-separated list of specific departments. */
  department: string;
  description: string;
  format: EventFormat;
  formatMode: EventFormatMode;
  prequalifierRequired: boolean;
  duration: string;
  venue: string;
  icon: string;
  tags: string[];
  prerequisites?: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  category: string;
  span: 'tall' | 'wide' | 'normal';
  color: string;
  type?: 'photo' | 'video';
  edition?: string;
};

export type Sponsor = {
  id: string;
  name: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';
  initials: string;
  description?: string;
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

export type DepartmentInfo = {
  id: string;
  name: string;
  fullName: string;
  icon: string;
  description: string;
  tagMatches: string[];
};

export type AnnouncementItem = {
  id: string;
  title: string;
  date: string;
  category: 'registration' | 'schedule' | 'workshop' | 'general';
  content: string;
  pinned?: boolean;
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

export type PartnerOrg = {
  id: string;
  name: string;
  category: 'industry' | 'institutional' | 'community';
  description: string;
  initials: string;
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
  role: string;
  department: string;
  photo?: string;
  linkedin?: string;
  email?: string;
  order: number;
};
