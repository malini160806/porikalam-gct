import { apiFetch } from '@/lib/apiClient';
import type { RegistrationDto } from '@/types/api';

export interface RegisterForEventPayload {
  teamName?: string;
  /** Existing Porikkalam usernames only — teammates must already hold an account. */
  teammateUsernames?: string[];
  /** Required when the event has a registration fee. */
  paymentReference?: string;
}

/** Registers the signed-in participant for an event, reusing their existing profile server-side. */
export async function registerForEvent(slug: string, payload: RegisterForEventPayload = {}): Promise<RegistrationDto> {
  const { registration } = await apiFetch<{ registration: RegistrationDto }>(`/events/${slug}/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return registration;
}
