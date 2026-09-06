import { apiFetch } from '@/lib/apiClient';

export interface ThuliraApplicationPayload {
  teamName: string;
  startupTitle: string;
  domain: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  college: string;
  teammateNames: string[];
  paymentReference: string;
  /** Optional screenshot proof of the UPI payment. */
  paymentScreenshot?: File;
}

/** Submits a Thulira startup exhibition application — public, no login required. */
export async function applyForThulira(payload: ThuliraApplicationPayload): Promise<{ applicationId: string }> {
  const formData = new FormData();
  formData.append('teamName', payload.teamName);
  formData.append('startupTitle', payload.startupTitle);
  formData.append('domain', payload.domain);
  formData.append('leaderName', payload.leaderName);
  formData.append('leaderEmail', payload.leaderEmail);
  formData.append('leaderPhone', payload.leaderPhone);
  formData.append('college', payload.college);
  formData.append('teammateNames', JSON.stringify(payload.teammateNames));
  formData.append('paymentReference', payload.paymentReference);
  if (payload.paymentScreenshot) formData.append('paymentScreenshot', payload.paymentScreenshot);

  return apiFetch<{ applicationId: string }>('/thulira/apply', {
    method: 'POST',
    body: formData,
    auth: false,
  });
}

export interface ThuliraPrequalifierPayload {
  teamName: string;
  startupTitle: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  teammateNames: string[];
  problemStatement?: string;
  ppt: File;
}

/** Submits a Thulira prequalifier round entry — team details plus the PPT file, public, no login required. */
export async function submitThuliraPrequalifier(
  payload: ThuliraPrequalifierPayload,
): Promise<{ submissionId: string }> {
  const formData = new FormData();
  formData.append('teamName', payload.teamName);
  formData.append('startupTitle', payload.startupTitle);
  formData.append('leaderName', payload.leaderName);
  formData.append('leaderEmail', payload.leaderEmail);
  formData.append('leaderPhone', payload.leaderPhone);
  formData.append('teammateNames', JSON.stringify(payload.teammateNames));
  if (payload.problemStatement) formData.append('problemStatement', payload.problemStatement);
  formData.append('ppt', payload.ppt);

  return apiFetch<{ submissionId: string }>('/thulira/prequalifier', {
    method: 'POST',
    body: formData,
    auth: false,
  });
}
