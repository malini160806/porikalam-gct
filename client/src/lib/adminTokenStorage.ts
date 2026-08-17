// Deliberately separate storage key and event name from the participant
// tokenStorage — an admin session and a participant session in the same
// browser must never read or clear each other's token.
const ADMIN_TOKEN_KEY = 'porikkalam_admin_token';
export const ADMIN_AUTH_CHANGED_EVENT = 'porikkalam:admin-auth-changed';

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  window.dispatchEvent(new Event(ADMIN_AUTH_CHANGED_EVENT));
}

export function clearAdminToken(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  window.dispatchEvent(new Event(ADMIN_AUTH_CHANGED_EVENT));
}
