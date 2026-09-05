import { apiFetch } from '@/lib/apiClient';

export interface TechThiralApplicationPayload {
  organizationName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  showcaseDescription?: string;
  paymentReference: string;
}

/** Submits a Tech Thiral industry expo booth application — public, no login required. */
export async function applyForTechThiral(payload: TechThiralApplicationPayload): Promise<{ applicationId: string }> {
  return apiFetch<{ applicationId: string }>('/tech-thiral/apply', {
    method: 'POST',
    body: JSON.stringify(payload),
    auth: false,
  });
}
