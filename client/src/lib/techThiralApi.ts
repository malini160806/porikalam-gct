import { apiFetch } from '@/lib/apiClient';

export interface TechThiralApplicationPayload {
  organizationName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  showcaseDescription?: string;
  paymentReference: string;
  /** Optional screenshot proof of the UPI payment. */
  paymentScreenshot?: File;
}

/** Submits a Tech Thiral industry expo booth application — public, no login required. */
export async function applyForTechThiral(payload: TechThiralApplicationPayload): Promise<{ applicationId: string }> {
  const formData = new FormData();
  formData.append('organizationName', payload.organizationName);
  formData.append('contactPerson', payload.contactPerson);
  formData.append('contactEmail', payload.contactEmail);
  formData.append('contactPhone', payload.contactPhone);
  if (payload.showcaseDescription) formData.append('showcaseDescription', payload.showcaseDescription);
  formData.append('paymentReference', payload.paymentReference);
  if (payload.paymentScreenshot) formData.append('paymentScreenshot', payload.paymentScreenshot);

  return apiFetch<{ applicationId: string }>('/tech-thiral/apply', {
    method: 'POST',
    body: formData,
    auth: false,
  });
}
