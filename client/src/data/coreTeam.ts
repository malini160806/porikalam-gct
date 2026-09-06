import type { CoreTeamDomain, CoreTeamMember } from './types';

import karthikPhoto from '@/assets/coreTeam/Karthick K.jpg';
import kaviyaPhoto from '@/assets/coreTeam/KAVIYA RAJKUMAR.jpg';
import sivaaPhoto from '@/assets/coreTeam/siva.png';
import jeevanaganPhoto from '@/assets/coreTeam/JEEVANAGAN T.jpg';
import anithaPhoto from '@/assets/coreTeam/Anitha R .jpg';
import yuvanPhoto from '@/assets/coreTeam/Yuvan Shankar N K.jpeg';
import aravindhanPhoto from '@/assets/coreTeam/Aravindhan SM.jpg';
import naveenaPhoto from '@/assets/coreTeam/Naveena.png';
import dharaniPhoto from '@/assets/coreTeam/Dharani S.jpg';
import maliniPhoto from '@/assets/coreTeam/Malini R.jpeg';
import anfasPhoto from '@/assets/coreTeam/ANFAS ALI.jpg';
import mohanrajPhoto from '@/assets/coreTeam/Mohanraj M.jpg';
import jothiLakshmiPhoto from '@/assets/coreTeam/Jothi Lakshmi S .jpg';
import monishVikramPhoto from '@/assets/coreTeam/Monish Vikram SB .png';
import sorimuthuPhoto from '@/assets/coreTeam/Sorimuthu B.png';
import vidhyapathiPhoto from '@/assets/coreTeam/Vidhyapathi D .jpg';
import dharanPrasathPhoto from '@/assets/coreTeam/Dharan Prasath R.png';

/**
 * Single source of truth for the Porikkalam 2026 Core Team Domain
 * Segregation list — the Team page renders this data dynamically, so future
 * additions or edits only require updating this file.
 */

export const coreTeamDomains: CoreTeamDomain[] = [
  { id: 'staff-coordinator', name: 'Staff Coordinator', icon: 'user-check', order: 1 },
  { id: 'technical-ops', name: 'Technical & Event Operations', icon: 'settings', order: 2 },
  { id: 'hospitality', name: 'Hospitality & Guest Relations', icon: 'users', order: 3 },
  { id: 'web-tech', name: 'Web & Tech Support', icon: 'terminal-square', order: 4 },
  { id: 'sponsorship-finance', name: 'Sponsorship & Finance', icon: 'landmark', order: 5 },
  { id: 'marketing-branding', name: 'Marketing & Branding, Syscom, Decom', icon: 'pen-tool', order: 6 },
];

export const coreTeamMembers: CoreTeamMember[] = [
  // Staff Coordinator
  { id: 'ctm0', name: 'Dr. P. Ilamathi', domain: 'staff-coordinator', order: 1 },

  // Technical & Event Operations
  { id: 'ctm1', name: 'Karthik K', domain: 'technical-ops', role: 'Director of Technical Events', photo: karthikPhoto, order: 1 },
  { id: 'ctm2', name: 'Kaviya R', domain: 'technical-ops', role: 'Director of Technical Events', photo: kaviyaPhoto, order: 2 },
  { id: 'ctm4', name: 'Sivaa V', domain: 'technical-ops', role: 'Director of Technical Events', photo: sivaaPhoto, order: 3 },
  { id: 'ctm5', name: 'Jeevanagan T', domain: 'technical-ops', role: 'Director of Technical Events', photo: jeevanaganPhoto, order: 4 },
  { id: 'ctm17', name: 'Anitha R', domain: 'technical-ops', role: 'Director of Non-Technical Events', photo: anithaPhoto, order: 5 },
  { id: 'ctm18', name: 'Yuvan Shankar N K', domain: 'technical-ops', role: 'Director of Flagship Events', photo: yuvanPhoto, order: 6 },

  // Hospitality & Guest Relations
  { id: 'ctm7', name: 'Naveena S', domain: 'hospitality', role: 'Director of Hospitality & Guest Relations', photo: naveenaPhoto, order: 1 },
  { id: 'ctm19', name: 'Aravindhan S M', domain: 'hospitality', role: 'Director of Hospitality & Guest Relations', photo: aravindhanPhoto, order: 2 },
  { id: 'ctm8', name: 'Kaviya R', domain: 'hospitality', role: 'Director of Alumni & Guest Relations', photo: kaviyaPhoto, order: 3 },

  // Web & Tech Support
  { id: 'ctm9', name: 'Dharani S', domain: 'web-tech', role: 'Director of Web Operations', photo: dharaniPhoto, order: 1 },
  { id: 'ctm10', name: 'Malini R', domain: 'web-tech', role: 'Director of Web Operations', photo: maliniPhoto, order: 2 },

  // Sponsorship & Finance
  { id: 'ctm6', name: 'Anfas Ali A', domain: 'sponsorship-finance', role: 'Director of Financial Operations', photo: anfasPhoto, order: 1 },
  { id: 'ctm12', name: 'Mohanraj M', domain: 'sponsorship-finance', role: 'Director of Sponsorship', photo: mohanrajPhoto, order: 2 },
  { id: 'ctm11', name: 'Jothi Lakshmi S', domain: 'sponsorship-finance', role: 'Director of Sponsorship & Financial Operations', photo: jothiLakshmiPhoto, order: 3 },

  // Marketing & Branding, Syscom, Decom
  { id: 'ctm13', name: 'Monish Vikram SB', domain: 'marketing-branding', role: 'Director of Social Media & Communication', photo: monishVikramPhoto, order: 1 },
  { id: 'ctm14', name: 'Sorimuthu B', domain: 'marketing-branding', role: 'Director of Marketing & Outreach', photo: sorimuthuPhoto, order: 2 },
  { id: 'ctm15', name: 'Vidhyapathi D', domain: 'marketing-branding', role: 'Director of Creative Design', photo: vidhyapathiPhoto, order: 3 },
  { id: 'ctm16', name: 'Dharan Prasath R', domain: 'marketing-branding', role: 'Director of Media & Production', photo: dharanPrasathPhoto, order: 4 },
];

export function getMembersForDomain(domainId: string): CoreTeamMember[] {
  return coreTeamMembers.filter((m) => m.domain === domainId).sort((a, b) => a.order - b.order);
}
