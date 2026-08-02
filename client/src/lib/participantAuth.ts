import { apiFetch, ApiError } from '@/lib/apiClient';
import { setToken } from '@/lib/tokenStorage';

export type ParticipantAuthField = 'email' | 'phone' | 'username' | 'password' | 'form';

export class ParticipantAuthError extends Error {
  field?: ParticipantAuthField;

  constructor(message: string, field?: ParticipantAuthField) {
    super(message);
    this.name = 'ParticipantAuthError';
    this.field = field;
  }
}

function toParticipantAuthError(error: unknown, fallback: string): ParticipantAuthError {
  if (error instanceof ApiError) {
    const field = (error.field as ParticipantAuthField | undefined) ?? 'form';
    return new ParticipantAuthError(error.message || fallback, field);
  }
  return new ParticipantAuthError(fallback, 'form');
}

export interface ConflictCheckResult {
  emailTaken: boolean;
  phoneTaken: boolean;
}

/** Checks whether an email/phone is already registered, without creating anything. */
export async function checkConflicts(email: string, phone: string): Promise<ConflictCheckResult> {
  try {
    return await apiFetch<ConflictCheckResult>('/auth/check-conflicts', {
      method: 'POST',
      auth: false,
      body: JSON.stringify({ email, phone }),
    });
  } catch (error) {
    throw toParticipantAuthError(error, 'Could not verify your details right now.');
  }
}

export async function reserveUsername(): Promise<string> {
  try {
    const result = await apiFetch<{ username: string }>('/auth/reserve-username', {
      method: 'POST',
      auth: false,
      body: JSON.stringify({}),
    });
    return result.username;
  } catch (error) {
    throw toParticipantAuthError(error, 'Could not reserve a username right now.');
  }
}

export interface RegisterParticipantInput {
  fullName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  degree: string;
  yearOfStudy: string;
  registerNumber?: string;
  city: string;
  state: string;
  guardianName: string;
  emergencyContact: string;
  password: string;
  reservedUsername?: string;
}

export interface RegisterParticipantResult {
  username: string;
  userId: string;
}

export async function registerParticipant(input: RegisterParticipantInput): Promise<RegisterParticipantResult> {
  try {
    const result = await apiFetch<{ token: string; username: string; userId: string }>('/auth/register', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(input),
    });
    setToken(result.token);
    return { username: result.username, userId: result.userId };
  } catch (error) {
    throw toParticipantAuthError(error, 'Could not create your account right now.');
  }
}

export async function uploadProfilePhoto(file: File): Promise<void> {
  const formData = new FormData();
  formData.append('photo', file);
  try {
    await apiFetch('/auth/photo', { method: 'POST', body: formData });
  } catch (error) {
    throw toParticipantAuthError(error, 'Could not upload your photo right now.');
  }
}

export async function loginParticipant(username: string, password: string): Promise<void> {
  try {
    const result = await apiFetch<{ token: string }>('/auth/login', {
      method: 'POST',
      auth: false,
      body: JSON.stringify({ username, password }),
    });
    setToken(result.token);
  } catch (error) {
    throw toParticipantAuthError(error, 'Could not sign you in right now.');
  }
}
