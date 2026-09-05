import { apiFetch } from '@/lib/apiClient';
import type { RegistrationDto } from '@/types/api';

export interface RegisterForEventPayload {
  teamName?: string;
  /** Existing Porikkalam usernames only — teammates must already hold an account. */
  teammateUsernames?: string[];
  /** Required when the event has a registration fee. */
  paymentReference?: string;
  /** Optional screenshot proof of the UPI payment. */
  paymentScreenshot?: File;
}

/** Registers the signed-in participant for an event, reusing their existing profile server-side. */
export async function registerForEvent(slug: string, payload: RegisterForEventPayload = {}): Promise<RegistrationDto> {
  const formData = new FormData();
  if (payload.teamName) formData.append('teamName', payload.teamName);
  if (payload.teammateUsernames) formData.append('teammateUsernames', JSON.stringify(payload.teammateUsernames));
  if (payload.paymentReference) formData.append('paymentReference', payload.paymentReference);
  if (payload.paymentScreenshot) formData.append('paymentScreenshot', payload.paymentScreenshot);

  const { registration } = await apiFetch<{ registration: RegistrationDto }>(`/events/${slug}/register`, {
    method: 'POST',
    body: formData,
  });
  return registration;
}
