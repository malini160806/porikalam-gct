import type { Sponsor } from './types';
import dckapLogo from '@/assets/partners/dckap-logo.png';

export const sponsors: Sponsor[] = [
  { id: 'organizer-dckap', name: 'DCKAP Incubation Centre', tier: 'organizer', initials: 'DC', logo: dckapLogo, description: 'Porikkalam 2026 is organized by the DCKAP Incubation Centre.' },
  { id: 's1', name: 'Vishwa Industries', tier: 'title', initials: 'VI', description: 'Powering Porikkalam 2026 as our Title Sponsor, championing engineering excellence across every event.' },
  { id: 's2', name: 'Anvil Robotics', tier: 'platinum', initials: 'AR', description: 'Robotics and automation technology partner.' },
  { id: 's3', name: 'Copperline Electric', tier: 'platinum', initials: 'CE', description: 'Electrical systems and power infrastructure partner.' },
  { id: 's4', name: 'Granite Systems', tier: 'gold', initials: 'GS', description: 'Enterprise systems and engineering solutions.' },
  { id: 's5', name: 'Forge & Co.', tier: 'gold', initials: 'FC', description: 'Manufacturing and fabrication partner.' },
  { id: 's6', name: 'Meridian Tech', tier: 'gold', initials: 'MT', description: 'Technology and product design partner.' },
  { id: 's7', name: 'Bluekode Ventures', tier: 'silver', initials: 'BV', description: 'Software and venture technology partner.' },
  { id: 's8', name: 'Ironclad Labs', tier: 'silver', initials: 'IL', description: 'R&D and prototyping partner.' },
  { id: 's9', name: 'Summit Automation', tier: 'silver', initials: 'SA', description: 'Industrial automation partner.' },
  { id: 's10', name: 'Ridgeline Components', tier: 'bronze', initials: 'RC', description: 'Component supply and hardware partner.' },
  { id: 's11', name: 'Falconwood Systems', tier: 'bronze', initials: 'FS', description: 'Systems integration partner.' },
  { id: 's12', name: 'Northgate Motors', tier: 'partner', initials: 'NM', description: 'Automotive engineering associate partner.' },
  { id: 's13', name: 'Solstice Energy', tier: 'partner', initials: 'SE', description: 'Renewable energy associate partner.' },
  { id: 's14', name: 'Keystone Materials', tier: 'partner', initials: 'KM', description: 'Building materials associate partner.' },
];

export const SPONSOR_TIER_LABELS: Record<Sponsor['tier'], string> = {
  organizer: 'Organized By',
  title: 'Title Sponsor',
  platinum: 'Platinum Sponsors',
  gold: 'Gold Sponsors',
  silver: 'Silver Sponsors',
  bronze: 'Bronze Sponsors',
  partner: 'Associate Partners',
};
