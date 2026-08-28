export const SITE = {
  name: 'Porikkalam',
  year: '2026',
  tagline: 'Engineering Through The Ages',
  description: 'A National Level Flagship Event',
  college: 'Government College of Technology',
  location: 'Coimbatore — 641 013, Tamil Nadu, India',
  email: 'porikkalam.gct@gmail.com',
  phone: '+91 824 888 7118',
  eventDateRange: '25 – 26 September 2026',
  eventStart: '2026-09-25T00:00:00+05:30',
  eventEnd: '2026-09-26T23:59:59+05:30',
  prequalifierWindow: 'Mid-August 2026',
  // TODO: placeholder until the organizers share the real collection UPI ID —
  // swap these two before payments go live.
  upiId: 'To be announced',
  upiPayeeName: 'Porikkalam 2026 Organizing Committee',
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
  },
  {
    label: 'Events',
    path: '/events',
    children: [
      { label: 'All Events', path: '/events' },
      { label: 'Schedule', path: '/schedule' },
    ],
  },
  { label: 'Thulira', path: '/thulira' },
  { label: 'Tech Thiral', path: '/tech-thiral' },
  {
    label: 'Explore',
    path: '/sponsors',
    children: [
      { label: 'Sponsors', path: '/sponsors' },
      { label: 'Accommodation', path: '/accommodation' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Announcements', path: '/announcements' },
      { label: 'Media', path: '/media' },
      { label: 'Resources', path: '/resources' },
      { label: 'Leaderboard', path: '/leaderboard' },
    ],
  },
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
  { label: 'Email', href: 'mailto:porikkalam.gct@gmail.com', icon: 'mail' },
] as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', path: '/' },
    { label: 'About Porikkalam', path: '/about' },
    { label: 'About the Team', path: '/about#team' },
    { label: 'Contact', path: '/contact' },
  ],
  events: [
    { label: 'All Events', path: '/events' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Thulira', path: '/thulira' },
    { label: 'Tech Thiral', path: '/tech-thiral' },
    { label: 'Leaderboard', path: '/leaderboard' },
  ],
  community: [
    { label: 'Sponsors', path: '/sponsors' },
    { label: 'Media', path: '/media' },
  ],
  support: [
    { label: 'FAQ', path: '/faq' },
    { label: 'Announcements', path: '/announcements' },
    { label: 'Resources', path: '/resources' },
    { label: 'Accommodation', path: '/accommodation' },
    { label: 'Certificates', path: '/certificates' },
  ],
};
