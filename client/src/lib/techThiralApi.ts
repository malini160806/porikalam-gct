import { apiFetch } from '@/lib/apiClient';

export interface TechThiralApplicationPayload {
  paymentReference: string;
  /** Optional screenshot proof of the UPI payment. */
  paymentScreenshot?: File;
}

/**
 * Records a Tech Thiral industry expo booth payment — public, no login required.
 * Organization/contact details are collected separately via the booth application
 * Google Form; this only records the UPI payment reference (and optional screenshot).
 */
export async function applyForTechThiral(payload: TechThiralApplicationPayload): Promise<{ applicationId: string }> {
  const formData = new FormData();
  formData.append('paymentReference', payload.paymentReference);
  if (payload.paymentScreenshot) formData.append('paymentScreenshot', payload.paymentScreenshot);

  return apiFetch<{ applicationId: string }>('/tech-thiral/apply', {
    method: 'POST',
    body: formData,
    auth: false,
  });
}
