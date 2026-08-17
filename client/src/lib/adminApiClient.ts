import { getAdminToken } from '@/lib/adminTokenStorage';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

export class AdminApiError extends Error {
  status: number;
  field?: string;

  constructor(status: number, message: string, field?: string) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
    this.field = field;
  }
}

interface AdminApiFetchOptions extends RequestInit {
  /** Set false to skip attaching the admin Authorization header (login only). */
  auth?: boolean;
}

/**
 * Separate fetch helper from the participant apiClient — always sends the
 * admin token, never the participant token, so the two sessions can never
 * be cross-wired even if both are logged in in the same browser.
 */
export async function adminApiFetch<T>(path: string, options: AdminApiFetchOptions = {}): Promise<T> {
  const { auth = true, headers, ...rest } = options;
  const token = auth ? getAdminToken() : null;

  const response = await fetch(`${API_BASE}/admin${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new AdminApiError(response.status, body?.message ?? 'Something went wrong. Please try again.', body?.field);
  }

  return body as T;
}
