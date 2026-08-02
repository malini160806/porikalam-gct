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
} as const;

export type NavLink = {
  label: string;
  path: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Events', path: '/events' },
  { label: 'Participate', path: '/participate' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  { label: 'Discord', href: 'https://discord.com', icon: 'discord' },
  { label: 'Email', href: 'mailto:contact@porikkalam.in', icon: 'mail' },
] as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Events', path: '/events' },
    { label: 'Participate', path: '/participate' },
    { label: 'Sponsors', path: '/sponsors' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ],
  participate: [
    { label: 'Register', path: '/register' },
    { label: 'Rules & Guidelines', path: '/events' },
    { label: 'FAQs', path: '/participate#faq' },
    { label: 'Downloads', path: '/participate' },
  ],
  resources: [
    { label: 'Brochure', path: '/participate' },
    { label: 'Schedule', path: '/events' },
    { label: 'Results', path: '/events' },
    { label: 'Contact Us', path: '/contact' },
  ],
};
