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
  upiId: 'anfesh@ptyes',
  upiPayeeName: 'Anfas',
  // Separate collection account for Thulira and Tech Thiral applications.
  flagshipUpiId: '8807612544@nyes',
  flagshipUpiPayeeName: 'Mohanraj',
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
    path: '/accommodation',
    children: [
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
  { label: 'Instagram', href: 'https://www.instagram.com/porikkalam_gct/', icon: 'instagram' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/porikkalam-gct-641401424',
    icon: 'linkedin',
  },
  { label: 'X', href: 'https://x.com/porikkalam_gct', icon: 'x' },
  { label: 'WhatsApp', href: 'https://whatsapp.com/channel/0029VbDTSWEGE56iCcdPgH3D', icon: 'whatsapp' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61588702441087', icon: 'facebook' },
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
