import { getToken } from './tokenStorage';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

export class ApiError extends Error {
  status: number;
  field?: string;

  constructor(status: number, message: string, field?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.field = field;
  }
}

interface ApiFetchOptions extends RequestInit {
  /** Set false to skip attaching the Authorization header (e.g. login/register). */
  auth?: boolean;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { auth = true, headers, ...rest } = options;
  const token = auth ? getToken() : null;
  // FormData sets its own multipart boundary in the Content-Type header —
  // letting fetch generate it automatically instead of forcing JSON.
  const isFormData = typeof FormData !== 'undefined' && rest.body instanceof FormData;

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiError(response.status, body?.message ?? 'Something went wrong. Please try again.', body?.field);
  }

  return body as T;
}
