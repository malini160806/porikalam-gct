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
};

export type GalleryImage = {
  id: string;
  title: string;
  category: string;
  span: 'tall' | 'wide' | 'normal';
  color: string;
};

export type Sponsor = {
  id: string;
  name: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'partner';
  initials: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  team: 'faculty' | 'core' | 'organizing';
  initials: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
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
