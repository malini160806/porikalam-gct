export type ThuliraObjective = {
  id: string;
  title: string;
  description: string;
};

export const thuliraObjectives: ThuliraObjective[] = [
  {
    id: 'platform',
    title: 'Showcase Platform',
    description: 'Provide a platform for students to showcase innovative startup ideas and solutions.',
  },
  {
    id: 'thinking',
    title: 'Entrepreneurial Thinking',
    description: 'Encourage innovation and entrepreneurial thinking through creative problem-solving.',
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem Connection',
    description:
      'Connect students with the startup ecosystem, fostering learning, collaboration, and industry exposure.',
  },
];

export type ThuliraJourneyStage = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const thuliraJourney: ThuliraJourneyStage[] = [
  {
    id: 'application',
    number: '01',
    title: 'Application & Registration',
    description: 'Teams apply and submit their startup ideas.',
  },
  {
    id: 'review',
    number: '02',
    title: 'Preliminary Review',
    description: 'Applications are reviewed by an expert panel.',
  },
  {
    id: 'shortlisted',
    number: '03',
    title: 'Shortlisted Teams',
    description: 'Selected teams are invited to participate in the startup exhibition.',
  },
  {
    id: 'exhibition',
    number: '04',
    title: 'Startup Exhibition',
    description: 'Shortlisted teams showcase their ideas through dedicated exhibition stalls on both days.',
  },
  {
    id: 'evaluation',
    number: '05',
    title: 'Evaluation',
    description: 'Teams are evaluated based on defined criteria by the jury panel.',
  },
  {
    id: 'awards',
    number: '06',
    title: 'Awards & Recognition',
    description: 'Top teams are recognized for innovation and impact.',
  },
];

export const thuliraApplicationReview = ['Originality', 'Relevance', 'Innovative Potential'];

export type ThuliraDomain = {
  id: string;
  label: string;
  icon: 'brain-circuit' | 'factory' | 'stethoscope' | 'sprout' | 'graduation-cap' | 'truck' | 'leaf' | 'monitor-smartphone' | 'heart-handshake' | 'shapes';
};

export const thuliraDomains: ThuliraDomain[] = [
  { id: 'ai-ds', label: 'Artificial Intelligence & Data Science', icon: 'brain-circuit' },
  { id: 'manufacturing', label: 'Manufacturing & Industry 4.0', icon: 'factory' },
  { id: 'healthcare', label: 'Healthcare & Medical Technologies', icon: 'stethoscope' },
  { id: 'agriculture', label: 'Agriculture & Food Technologies', icon: 'sprout' },
  { id: 'education', label: 'Education & Learning Technologies', icon: 'graduation-cap' },
  { id: 'mobility', label: 'Smart Mobility & Transportation', icon: 'truck' },
  { id: 'sustainability', label: 'Sustainability & Clean Energy', icon: 'leaf' },
  { id: 'digital', label: 'Digital Technologies', icon: 'monitor-smartphone' },
  { id: 'social', label: 'Social Innovation', icon: 'heart-handshake' },
  { id: 'other', label: 'Other Interdisciplinary & Emerging Domains', icon: 'shapes' },
];

export const thuliraExhibitionOpportunities = [
  'Present their startup ideas',
  'Engage with industry experts',
  'Interact with entrepreneurs',
  'Interact with academicians',
  'Connect with visitors',
  'Gain valuable exposure',
];

export type ThuliraEvaluationCriterion = {
  id: string;
  title: string;
  description: string;
};

export const thuliraEvaluationCriteria: ThuliraEvaluationCriterion[] = [
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Originality, uniqueness, and creativity of the startup idea.',
  },
  {
    id: 'relevance',
    title: 'Problem Relevance',
    description: 'Ability to address a real-world problem or need.',
  },
  {
    id: 'feasibility',
    title: 'Feasibility',
    description: 'Practicality and technical viability of the proposed solution.',
  },
  {
    id: 'business',
    title: 'Business Potential',
    description: 'Scalability, sustainability, and market potential of the startup.',
  },
  {
    id: 'presentation',
    title: 'Presentation',
    description: 'Clarity, communication, and overall presentation of the startup idea.',
  },
];

export const thuliraAwardsCriteria = ['Innovation', 'Feasibility', 'Entrepreneurial Potential'];

export const thuliraJourneyStrip = ['Heritage', 'Engineering', 'Innovation', 'Entrepreneurship', 'Future'];
