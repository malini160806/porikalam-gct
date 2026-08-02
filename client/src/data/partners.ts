import type { PartnerOrg } from './types';

export const partners: PartnerOrg[] = [
  { id: 'p1', name: 'Vishwa Industries', category: 'industry', description: 'Manufacturing & automation partner.', initials: 'VI' },
  { id: 'p2', name: 'Anvil Robotics', category: 'industry', description: 'Robotics and automation technology partner.', initials: 'AR' },
  { id: 'p3', name: 'Coimbatore Institute of Technology', category: 'institutional', description: 'Academic collaboration partner.', initials: 'CI' },
  { id: 'p4', name: 'IEEE GCT Student Branch', category: 'institutional', description: 'Technical co-organizing body.', initials: 'IE' },
  { id: 'p5', name: 'Rotaract Club of GCT', category: 'community', description: 'Community outreach and volunteering partner.', initials: 'RC' },
  { id: 'p6', name: 'Coimbatore Makers Collective', category: 'community', description: 'Local maker community partner.', initials: 'CM' },
];

export const PARTNER_CATEGORY_LABELS: Record<PartnerOrg['category'], string> = {
  industry: 'Industry Partners',
  institutional: 'Institutional Partners',
  community: 'Community Partners',
};
