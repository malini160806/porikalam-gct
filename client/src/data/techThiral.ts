import type { ThuliraJourneyStage } from './thulira';

export type TechThiralHighlight = {
  id: string;
  title: string;
  description: string;
};

export const techThiralHighlights: TechThiralHighlight[] = [
  {
    id: 'discover',
    title: 'Discover Innovations',
    description: 'Explore emerging technologies, products, and entrepreneurial ventures on display across the expo.',
  },
  {
    id: 'engage',
    title: 'Engage With Founders',
    description: 'Interact directly with founders, industry experts, and researchers behind the innovations on show.',
  },
  {
    id: 'explore',
    title: 'Explore Emerging Tech',
    description: 'Get hands-on with the technologies shaping the next wave of industry and enterprise.',
  },
  {
    id: 'connect',
    title: 'Build Connections',
    description: 'Build meaningful connections with the startup and industrial ecosystem beyond the expo floor.',
  },
];

export const techThiralJourney: ThuliraJourneyStage[] = [
  {
    id: 'registration',
    number: '01',
    title: 'Booth Registration',
    description: 'Startups, industry teams, and innovators apply for a showcase booth at the Industry Expo.',
  },
  {
    id: 'confirmation',
    number: '02',
    title: 'Confirmation & Allotment',
    description: 'Confirmed exhibitors are allotted booth space in the expo area.',
  },
  {
    id: 'setup',
    number: '03',
    title: 'Expo Setup',
    description: 'Exhibitors set up demos, prototypes, and displays ahead of the opening ceremony.',
  },
  {
    id: 'showcase',
    number: '04',
    title: 'Industry Expo — Two Full Days',
    description: 'A continuous two-day showcase running alongside Thulira, open to students, faculty, and visitors.',
  },
  {
    id: 'connect',
    number: '05',
    title: 'Networking & Connect',
    description: 'Structured interactions with students, faculty, and the GCT alumni community throughout the expo.',
  },
  {
    id: 'closing',
    number: '06',
    title: 'Porikkalam Connect',
    description: 'The expo closes into Porikkalam Connect — a dedicated networking session on Day 1 evening.',
  },
];

export const techThiralExhibitionOpportunities = [
  'Showcase emerging technologies and products',
  'Engage directly with students and faculty',
  'Interact with fellow founders and industry experts',
  'Connect with the GCT alumni community',
  'Explore collaboration and hiring opportunities',
  'Gain visibility across a national engineering symposium',
];

export const techThiralAudience = ['Startups', 'Industry Professionals', 'Entrepreneurs', 'Researchers', 'Innovators'];

export const techThiralJourneyStrip = ['Technology', 'Innovation', 'Enterprise', 'Industry', 'Impact'];
