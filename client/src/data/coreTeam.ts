import type { CoreTeamDomain, CoreTeamMember } from './types';

/**
 * Single source of truth for the Porikkalam 2026 Core Team Domain
 * Segregation list — the Team page renders this data dynamically, so future
 * additions or edits only require updating this file.
 */

export const coreTeamDomains: CoreTeamDomain[] = [
  { id: 'technical-ops', name: 'Technical & Event Operations', icon: 'settings', order: 1 },
  { id: 'hospitality', name: 'Hospitality & Guest Relations', icon: 'users', order: 2 },
  { id: 'web-tech', name: 'Web & Tech Support', icon: 'terminal-square', order: 3 },
  { id: 'sponsorship-finance', name: 'Sponsorship & Finance', icon: 'landmark', order: 4 },
  { id: 'marketing-branding', name: 'Marketing & Branding, Syscom, Decom', icon: 'pen-tool', order: 5 },
];

export const coreTeamMembers: CoreTeamMember[] = [
  // Technical & Event Operations
  { id: 'ctm0', name: 'Illamathi', role: 'Staff Coordinator', domain: 'technical-ops', order: 1 },
  { id: 'ctm1', name: 'Karthik K', domain: 'technical-ops', order: 2 },
  { id: 'ctm2', name: 'Kaviya R', domain: 'technical-ops', order: 3 },
  { id: 'ctm4', name: 'Sivaa V', domain: 'technical-ops', order: 4 },
  { id: 'ctm5', name: 'Jeevanagan T', domain: 'technical-ops', order: 5 },

  // Hospitality & Guest Relations
  { id: 'ctm6', name: 'Anfas Ali A', domain: 'hospitality', order: 1 },
  { id: 'ctm7', name: 'Naveena S', domain: 'hospitality', order: 2 },
  { id: 'ctm8', name: 'Kaviya R', domain: 'hospitality', order: 3 },

  // Web & Tech Support
  { id: 'ctm9', name: 'Dharani S', domain: 'web-tech', order: 1 },
  { id: 'ctm10', name: 'Malini R', domain: 'web-tech', order: 2 },

  // Sponsorship & Finance
  { id: 'ctm11', name: 'Jothi Lakshmi S', domain: 'sponsorship-finance', order: 1 },
  { id: 'ctm12', name: 'Mohanraj M', domain: 'sponsorship-finance', order: 2 },

  // Marketing & Branding, Syscom, Decom
  { id: 'ctm13', name: 'Monish Vikram SB', domain: 'marketing-branding', order: 1 },
  { id: 'ctm14', name: 'Sorimuthu B', domain: 'marketing-branding', order: 2 },
  { id: 'ctm15', name: 'Vidhyapathi D', domain: 'marketing-branding', order: 3 },
  { id: 'ctm16', name: 'Dharan Prasath R', domain: 'marketing-branding', order: 4 },
];

export function getMembersForDomain(domainId: string): CoreTeamMember[] {
  return coreTeamMembers.filter((m) => m.domain === domainId).sort((a, b) => a.order - b.order);
}
