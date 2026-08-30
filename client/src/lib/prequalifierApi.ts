import { apiFetch } from '@/lib/apiClient';

export interface PrequalifierPayload {
  username: string;
  email: string;
  teammateUsernames: string[];
  problemStatement?: string;
  ppt: File;
}

/** Submits a prequalifier round entry — form fields plus the PPT file, as multipart form data. */
export async function submitPrequalifier(slug: string, payload: PrequalifierPayload): Promise<{ submissionId: string }> {
  const formData = new FormData();
  formData.append('username', payload.username);
  formData.append('email', payload.email);
  formData.append('teammateUsernames', JSON.stringify(payload.teammateUsernames));
  if (payload.problemStatement) formData.append('problemStatement', payload.problemStatement);
  formData.append('ppt', payload.ppt);

  return apiFetch<{ submissionId: string }>(`/events/${slug}/prequalifier`, {
    method: 'POST',
    body: formData,
    auth: false,
  });
}
