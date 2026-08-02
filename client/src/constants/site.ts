export const SITE = {
  name: 'Porikkalam',
  year: '2026',
  tagline: 'Engineering Through The Ages',
  description:
    'A mega inter-collegiate engineering symposium blending heritage craftsmanship with modern innovation.',
  college: 'Government College of Technology',
  location: 'Coimbatore — 641 013, Tamil Nadu, India',
  email: 'contact@porikkalam.in',
  phone: '+91 12345 67890',
  eventDateRange: '25 – 26 September 2026',
  eventStart: '2026-09-25T00:00:00+05:30',
  eventEnd: '2026-09-26T23:59:59+05:30',
  prequalifierWindow: 'Mid-August 2026',
} as const;

export type NavLink = {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    path: '/about',
    children: [
      { label: 'About Porikkalam', path: '/about' },
      { label: 'Legacy', path: '/legacy' },
    ],
  },
  {
    label: 'Events',
    path: '/events',
    children: [
      { label: 'All Events', path: '/events' },
      { label: 'Schedule', path: '/schedule' },
      { label: 'Departments', path: '/departments' },
      { label: 'Workshops', path: '/workshops' },
    ],
  },
  { label: 'Participate', path: '/participate' },
  {
    label: 'Explore',
    path: '/gallery',
    children: [
      { label: 'Gallery', path: '/gallery' },
      { label: 'Sponsors', path: '/sponsors' },
      { label: 'Partners', path: '/partners' },
      { label: 'Accommodation', path: '/accommodation' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Announcements', path: '/announcements' },
      { label: 'Media', path: '/media' },
      { label: 'Resources', path: '/resources' },
      { label: 'Leaderboard', path: '/leaderboard' },
    ],
  },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/p/DbTCMIjPlCh/?igsh=aHRkNnVmdmJpZzlw', icon: 'instagram' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/posts/porikkalam-gct-641401424_porikkalam2026-bfqbfrbfdbfvbgfbfbbffbfrbfvbgfbfqbfrbflbfebgf-share-7487505915043131392-68uG/',
    icon: 'linkedin',
  },
  { label: 'X', href: 'https://x.com/porikkalam_gct/status/2081736396147240975?s=48', icon: 'x' },
  { label: 'WhatsApp', href: 'https://whatsapp.com/channel/0029VbDTSWEGE56iCcdPgH3D', icon: 'whatsapp' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/p/1EwErXR158/', icon: 'facebook' },
  { label: 'Email', href: 'mailto:contact@porikkalam.in', icon: 'mail' },
] as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Legacy', path: '/legacy' },
    { label: 'Team', path: '/team' },
    { label: 'Contact', path: '/contact' },
  ],
  events: [
    { label: 'All Events', path: '/events' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Departments', path: '/departments' },
    { label: 'Workshops', path: '/workshops' },
    { label: 'Leaderboard', path: '/leaderboard' },
  ],
  community: [
    { label: 'Gallery', path: '/gallery' },
    { label: 'Sponsors', path: '/sponsors' },
    { label: 'Partners', path: '/partners' },
    { label: 'Media', path: '/media' },
    { label: 'Volunteer Portal', path: '/volunteer' },
  ],
  support: [
    { label: 'FAQ', path: '/faq' },
    { label: 'Announcements', path: '/announcements' },
    { label: 'Resources', path: '/resources' },
    { label: 'Accommodation', path: '/accommodation' },
    { label: 'Certificates', path: '/certificates' },
  ],
};
