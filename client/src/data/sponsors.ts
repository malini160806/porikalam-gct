import type { Sponsor } from './types';

export const sponsors: Sponsor[] = [
  { id: 's1', name: 'Vishwa Industries', tier: 'title', initials: 'VI' },
  { id: 's2', name: 'Anvil Robotics', tier: 'platinum', initials: 'AR' },
  { id: 's3', name: 'Copperline Electric', tier: 'platinum', initials: 'CE' },
  { id: 's4', name: 'Granite Systems', tier: 'gold', initials: 'GS' },
  { id: 's5', name: 'Forge & Co.', tier: 'gold', initials: 'FC' },
  { id: 's6', name: 'Meridian Tech', tier: 'gold', initials: 'MT' },
  { id: 's7', name: 'Bluekode Ventures', tier: 'silver', initials: 'BV' },
  { id: 's8', name: 'Ironclad Labs', tier: 'silver', initials: 'IL' },
  { id: 's9', name: 'Summit Automation', tier: 'silver', initials: 'SA' },
  { id: 's10', name: 'Northgate Motors', tier: 'partner', initials: 'NM' },
  { id: 's11', name: 'Solstice Energy', tier: 'partner', initials: 'SE' },
  { id: 's12', name: 'Keystone Materials', tier: 'partner', initials: 'KM' },
];

export const SPONSOR_TIER_LABELS: Record<Sponsor['tier'], string> = {
  title: 'Title Sponsor',
  platinum: 'Platinum Sponsors',
  gold: 'Gold Sponsors',
  silver: 'Silver Sponsors',
  partner: 'Associate Partners',
};
