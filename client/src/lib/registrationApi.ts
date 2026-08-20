import { apiFetch } from '@/lib/apiClient';
import type { RegistrationDto } from '@/types/api';

/** Registers the signed-in participant for an event, reusing their existing profile server-side. */
export async function registerForEvent(slug: string): Promise<RegistrationDto> {
  const { registration } = await apiFetch<{ registration: RegistrationDto }>(`/events/${slug}/register`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
  return registration;
}
