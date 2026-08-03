export type EraStep = {
  id: string;
  label: string;
  caption: string;
  icon: 'triangle' | 'landmark' | 'factory' | 'monitor-smartphone' | 'sparkles';
  current?: boolean;
};

export const eras: EraStep[] = [
  { id: 'ancient', label: 'Ancient Era', caption: 'Innovation Begins', icon: 'triangle' },
  { id: 'medieval', label: 'Medieval Era', caption: 'Knowledge Expands', icon: 'landmark' },
  { id: 'industrial', label: 'Industrial Era', caption: 'Machines Empower', icon: 'factory' },
  { id: 'modern', label: 'Modern Era', caption: 'Technology Advances', icon: 'monitor-smartphone' },
  { id: 'futuristic', label: 'Futuristic Era', caption: 'Limitless Possibilities', icon: 'sparkles', current: true },
];
