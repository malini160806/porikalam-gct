export type ExpoBenefit = {
  id: string;
  label: string;
};

export const expoBenefits: ExpoBenefit[] = [
  { id: 'eb1', label: 'Showcase Your Innovation' },
  { id: 'eb2', label: 'Get Industry Exposure' },
  { id: 'eb3', label: 'Win Exciting Prizes' },
  { id: 'eb4', label: 'Network & Collaborate' },
  { id: 'eb5', label: 'Take Your Idea Forward' },
];

export type ExpoShowcaseItem = {
  id: string;
  title: string;
  category: string;
  department: string;
  description: string;
};

const TBA = 'To Be Announced';

export const expoShowcase: ExpoShowcaseItem[] = [
  {
    id: 'es1',
    title: 'Startup Showcase',
    category: 'Startups',
    department: TBA,
    description:
      'Student-run startups and early-stage ventures present their products to judges, mentors, and industry visitors.',
  },
  {
    id: 'es2',
    title: 'Prototype Gallery',
    category: 'Prototypes',
    department: TBA,
    description:
      'Working prototypes and proof-of-concept builds from across every engineering department, on display for the full expo floor.',
  },
  {
    id: 'es3',
    title: 'Industry Collaboration Zone',
    category: 'Industry',
    department: TBA,
    description:
      'A dedicated space for industry partners to meet participants, scout talent, and discuss collaboration opportunities.',
  },
];
