export interface AuthUser {
  id: string;
  username: string;
  email: string;
  phone: string;
  display_name: string;
  dob: string | null;
  gender: string | null;
  college: string | null;
  department: string | null;
  degree: string | null;
  year_of_study: string | null;
  register_number: string | null;
  city: string | null;
  state: string | null;
  guardian_name: string | null;
  emergency_contact: string | null;
  profile_photo_url: string | null;
  managed_event: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegistrationDto {
  id: string;
  user_id: string;
  event_key: string;
  event_name: string;
  event_category: string;
  participant_name: string;
  contact_email: string;
  phone: string;
  college: string | null;
  department: string | null;
  year_of_study: string | null;
  team_name: string | null;
  teammate_names: string | null;
  notes: string | null;
  status: 'submitted' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface MeResponse {
  user: AuthUser;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  registrations: RegistrationDto[];
}
