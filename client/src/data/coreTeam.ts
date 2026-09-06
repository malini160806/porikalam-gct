import type { CoreTeamDomain, CoreTeamMember } from './types';

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
  { id: 'ctm0', name: 'Illamathi',  domain: 'staff-coordinator', order: 1 },

  // Technical & Event Operations
  { id: 'ctm1', name: 'Karthik K', domain: 'technical-ops', role: 'Director of Technical Events', order: 1 },
  { id: 'ctm2', name: 'Kaviya R', domain: 'technical-ops', role: 'Director of Technical Events', order: 2 },
  { id: 'ctm4', name: 'Sivaa V', domain: 'technical-ops', role: 'Director of Technical Events', order: 3 },
  { id: 'ctm5', name: 'Jeevanagan T', domain: 'technical-ops', role: 'Director of Technical Events', order: 4 },
  { id: 'ctm17', name: 'Anitha R', domain: 'technical-ops', role: 'Director of Non-Technical Events', order: 5 },
  { id: 'ctm18', name: 'Yuvan Shankar N K', domain: 'technical-ops', role: 'Director of Flagship Events', order: 6 },

  // Hospitality & Guest Relations
  { id: 'ctm7', name: 'Naveena S', domain: 'hospitality', role: 'Director of Hospitality & Guest Relations', order: 1 },
  { id: 'ctm19', name: 'Aravindhan S M', domain: 'hospitality', role: 'Director of Hospitality & Guest Relations', order: 2 },
  { id: 'ctm8', name: 'Kaviya R', domain: 'hospitality', role: 'Director of Alumni & Guest Relations', order: 3 },

  // Web & Tech Support
  { id: 'ctm9', name: 'Dharani S', domain: 'web-tech', role: 'Director of Web Operations', order: 1 },
  { id: 'ctm10', name: 'Malini R', domain: 'web-tech', role: 'Director of Web Operations', order: 2 },

  // Sponsorship & Finance
  { id: 'ctm6', name: 'Anfas Ali A', domain: 'sponsorship-finance', role: 'Director of Financial Operations', order: 1 },
  { id: 'ctm12', name: 'Mohanraj M', domain: 'sponsorship-finance', role: 'Director of Sponsorship', order: 2 },
  { id: 'ctm11', name: 'Jothi Lakshmi S', domain: 'sponsorship-finance', role: 'Director of Sponsorship & Financial Operations', order: 3 },

  // Marketing & Branding, Syscom, Decom
  { id: 'ctm13', name: 'Monish Vikram SB', domain: 'marketing-branding', role: 'Director of Social Media & Communication', order: 1 },
  { id: 'ctm14', name: 'Sorimuthu B', domain: 'marketing-branding', role: 'Director of Marketing & Outreach', order: 2 },
  { id: 'ctm15', name: 'Vidhyapathi D', domain: 'marketing-branding', role: 'Director of Creative Design', order: 3 },
  { id: 'ctm16', name: 'Dharan Prasath R', domain: 'marketing-branding', role: 'Director of Media & Production', order: 4 },
];

export function getMembersForDomain(domainId: string): CoreTeamMember[] {
  return coreTeamMembers.filter((m) => m.domain === domainId).sort((a, b) => a.order - b.order);
}
