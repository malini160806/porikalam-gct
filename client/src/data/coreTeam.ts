import type { CoreTeamDomain, CoreTeamMember } from './types';

/**
 * Single source of truth for the Porikkalam 2026 Core Team Domain
 * Segregation list. Role/Department are placeholders until the team
 * supplies them — the Team page renders this data dynamically, so future
 * additions or edits only require updating this file.
 */
export const coreTeamDomains: CoreTeamDomain[] = [
  { id: 'technical-ops', name: 'Technical & Event Operations', icon: 'settings', order: 1 },
  { id: 'hospitality', name: 'Hospitality & Guest Relations', icon: 'users', order: 2 },
  { id: 'web-tech', name: 'Web & Tech Support', icon: 'terminal-square', order: 3 },
  { id: 'sponsorship-finance', name: 'Sponsorship & Finance', icon: 'landmark', order: 4 },
  { id: 'marketing-branding', name: 'Marketing & Branding, Syscom, Decom', icon: 'pen-tool', order: 5 },
];

const TBA = 'To Be Announced';

export const coreTeamMembers: CoreTeamMember[] = [
  // Technical & Event Operations
  { id: 'ctm1', name: 'Karthik K', domain: 'technical-ops', role: 'Team Member', department: TBA, order: 1 },
  { id: 'ctm2', name: 'Kaviya R', domain: 'technical-ops', role: 'Team Member', department: TBA, order: 2 },
  { id: 'ctm4', name: 'Sivaa V', domain: 'technical-ops', role: 'Team Member', department: TBA, order: 3 },
  { id: 'ctm5', name: 'Jeevanagan T', domain: 'technical-ops', role: 'Team Member', department: TBA, order: 4 },

  // Hospitality & Guest Relations
  { id: 'ctm6', name: 'Anfas Ali A', domain: 'hospitality', role: 'Team Member', department: TBA, order: 1 },
  { id: 'ctm7', name: 'Naveena S', domain: 'hospitality', role: 'Team Member', department: TBA, order: 2 },
  { id: 'ctm8', name: 'Kaviya R', domain: 'hospitality', role: 'Team Member', department: TBA, order: 3 },

  // Web & Tech Support
  { id: 'ctm9', name: 'Dharani S', domain: 'web-tech', role: 'Team Member', department: TBA, order: 1 },
  { id: 'ctm10', name: 'Malini R', domain: 'web-tech', role: 'Team Member', department: TBA, order: 2 },

  // Sponsorship & Finance
  { id: 'ctm11', name: 'Jothi Lakshmi S', domain: 'sponsorship-finance', role: 'Team Member', department: TBA, order: 1 },
  { id: 'ctm12', name: 'Mohanraj M', domain: 'sponsorship-finance', role: 'Team Member', department: TBA, order: 2 },

  // Marketing & Branding, Syscom, Decom
  { id: 'ctm13', name: 'Monish Vikram SB', domain: 'marketing-branding', role: 'Team Member', department: TBA, order: 1 },
  { id: 'ctm14', name: 'Sorimuthu B', domain: 'marketing-branding', role: 'Team Member', department: TBA, order: 2 },
  { id: 'ctm15', name: 'Vidhyapathi D', domain: 'marketing-branding', role: 'Team Member', department: TBA, order: 3 },
  { id: 'ctm16', name: 'Dharan Prasath R', domain: 'marketing-branding', role: 'Team Member', department: TBA, order: 4 },
];

export function getMembersForDomain(domainId: string): CoreTeamMember[] {
  return coreTeamMembers.filter((m) => m.domain === domainId).sort((a, b) => a.order - b.order);
}
