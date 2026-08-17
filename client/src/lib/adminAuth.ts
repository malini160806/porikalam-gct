import { adminApiFetch, AdminApiError } from '@/lib/adminApiClient';
import { setAdminToken } from '@/lib/adminTokenStorage';
import type { AdminLoginResponse } from '@/types/adminApi';

export class AdminAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdminAuthError';
  }
}

export async function loginAdmin(identifier: string, password: string): Promise<void> {
  try {
    const result = await adminApiFetch<AdminLoginResponse>('/auth/login', {
      method: 'POST',
      auth: false,
      body: JSON.stringify({ identifier, password }),
    });
    setAdminToken(result.token);
  } catch (error) {
    if (error instanceof AdminApiError) {
      throw new AdminAuthError(error.message);
    }
    throw new AdminAuthError('Could not sign you in right now.');
  }
}
