export type AdminRole = 'super_admin' | 'event_admin';

export interface AdminDto {
  id: string;
  username: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: string[];
  assigned_events: string[];
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminEventDto {
  id: string;
  event_name: string;
  slug: string;
  category: 'technical' | 'non-technical' | 'workshop';
  description: string;
  eligibility: string;
  target_participants: number;
  target_sub_category: string[];
  why_included: string | null;
  team_type: 'individual' | 'team';
  team_size: string;
  event_type: 'competition' | 'participation';
  prequalifier_required: boolean;
  duration: string;
  expected_participants: number;
  venue: string;
  resources: string | null;
  reference_link: string | null;
  budget: string | null;
  prize_pool: string | null;
  registration_fee: string | null;
  poster: string | null;
  icon: string;
  registration_open: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminParticipantDto {
  id: string;
  username: string;
  email: string;
  phone: string;
  display_name: string;
  college: string | null;
  department: string | null;
  year_of_study: string | null;
  profile_photo_url: string | null;
  created_at: string;
}

export interface AdminStatsDto {
  total_events: number;
  total_participants: number | null;
  total_registrations: number | null;
  today_attendance: number | null;
  paid_registrations: number | null;
  pending_registrations: number | null;
}

export interface AdminMeResponse {
  admin: AdminDto;
}

export interface AdminLoginResponse {
  token: string;
  admin: AdminDto;
}

export interface AdminParticipantsResponse {
  participants: AdminParticipantDto[];
  total: number;
  page: number;
  limit: number;
}

export type AdminPaymentStatus = 'paid' | 'pending' | 'free';

export interface AdminRegistrationDto {
  id: string;
  username: string;
  participant_name: string;
  contact_email: string;
  phone: string;
  college: string | null;
  department: string | null;
  year_of_study: string | null;
  event_key: string;
  event_name: string;
  team_name: string | null;
  role: 'leader' | 'member';
  payment_reference: string | null;
  payment_screenshot_url: string | null;
  payment_status: AdminPaymentStatus;
  status: 'submitted' | 'confirmed' | 'cancelled';
  checked_in_at: string | null;
  created_at: string;
}

export interface AdminRegistrationsResponse {
  registrations: AdminRegistrationDto[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminPaymentDto {
  id: string;
  username: string;
  participant_name: string;
  contact_email: string;
  phone: string;
  event_key: string;
  event_name: string;
  team_name: string | null;
  payment_reference: string | null;
  payment_screenshot_url: string | null;
  status: 'submitted' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface AdminPaymentsResponse {
  payments: AdminPaymentDto[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminAttendanceRegistrationDto {
  id: string;
  event_key: string;
  event_name: string;
  team_name: string | null;
  checked_in_at: string | null;
}

export interface AdminAttendanceLookupResponse {
  participant: AdminParticipantDto;
  registrations: AdminAttendanceRegistrationDto[];
}
