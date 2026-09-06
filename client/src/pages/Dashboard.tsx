import { useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award,
  Bell,
  CalendarCheck,
  CalendarDays,
  CheckSquare,
  LogOut,
  QrCode,
  Receipt,
  Settings as SettingsIcon,
  User as UserIcon,
} from 'lucide-react';
import { PageHero } from '@/components/common/PageHero';
import { FloatingIcon } from '@/components/common/FloatingIcon';
import { CornerOrnament } from '@/components/common/CornerOrnament';
import { CertificateTemplate } from '@/components/dashboard/CertificateTemplate';
import { ParticipantIdCard } from '@/components/dashboard/ParticipantIdCard';
import { Tabs } from '@/components/ui/Tabs';
import aiChipIcon from '@/assets/elements/modern/ai-brain-engraved.webp';
import blueprintGrid from '@/assets/elements/modern/blueprint-grid-engraved.webp';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useSession } from '@/context/SessionContext';
import { apiFetch, ApiError } from '@/lib/apiClient';
import type { AuthUser, RegistrationDto } from '@/types/api';

type DashboardTab =
  | 'profile'
  | 'registrations'
  | 'upcoming'
  | 'schedule'
  | 'payments'
  | 'attendance'
  | 'certificates'
  | 'qr'
  | 'notifications'
  | 'settings';

const TAB_OPTIONS: Array<{ value: DashboardTab; label: string; icon: typeof UserIcon; description: string }> = [
  { value: 'profile', label: 'Profile', icon: UserIcon, description: '' },
  {
    value: 'registrations',
    label: 'My Registrations',
    icon: CalendarCheck,
    description: 'The events you register for will be listed here, with quick links to each event page.',
  },
  {
    value: 'upcoming',
    label: 'Upcoming Events',
    icon: CalendarDays,
    description: "A countdown to your next registered event will appear here once you're signed up for one.",
  },
  {
    value: 'schedule',
    label: 'Event Schedule',
    icon: CalendarDays,
    description: 'A personalized schedule built from your registrations — see the full symposium schedule any time.',
  },
  {
    value: 'payments',
    label: 'Payment History',
    icon: Receipt,
    description: 'Your registration payment receipts and status will be tracked here once payments open.',
  },
  {
    value: 'attendance',
    label: 'Attendance',
    icon: CheckSquare,
    description: 'Your attendance for each event you register for will be marked here after check-in on campus.',
  },
  { value: 'certificates', label: 'Certificates', icon: Award, description: '' },
  { value: 'qr', label: 'QR Pass', icon: QrCode, description: '' },
  {
    value: 'notifications',
    label: 'Notifications',
    icon: Bell,
    description: 'Registration confirmations, schedule changes, and announcements will show up here.',
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: SettingsIcon,
    description: 'Account preferences and notification settings will live here.',
  },
];

function PlaceholderPanel({
  icon: Icon,
  label,
  description,
  action,
}: {
  icon: typeof UserIcon;
  label: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col items-center gap-3 overflow-hidden border border-gold/25 bg-white/50 px-8 py-16 text-center shadow-card"
    >
      <div className="absolute inset-0 bp-grid-bg opacity-[0.1]" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold">
        <Icon size={26} strokeWidth={1.5} />
      </div>
      <p className="relative font-heading text-xl font-semibold tracking-wide text-navy">{label}</p>
      <p className="relative max-w-sm font-body text-sm text-slate">{description}</p>
      {action && <div className="relative mt-2">{action}</div>}
    </motion.div>
  );
}

const STATUS_LABEL: Record<RegistrationDto['status'], string> = {
  submitted: 'Pending Payment',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
};

function RegistrationsPanel({ registrations }: { registrations: RegistrationDto[] }) {
  if (registrations.length === 0) {
    return (
      <PlaceholderPanel
        icon={CalendarCheck}
        label="My Registrations"
        description="The events you register for will be listed here, with quick links to each event page."
        action={
          <Button to="/events/register" variant="primary" size="sm">
            Register for Events
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {registrations.map((registration) => (
        <div key={registration.id} className="flex flex-col gap-3 border border-navy/15 bg-white/40 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-heading text-lg font-semibold tracking-wide text-navy">{registration.event_name}</p>
              <p className="font-body text-xs uppercase tracking-wide text-slate/70">
                {STATUS_LABEL[registration.status]}
                {registration.role === 'member' && ' · Added as Teammate'}
              </p>
            </div>
            <Button to={`/events/${registration.event_key}`} variant="outline" size="sm">
              View Event
            </Button>
          </div>
          {registration.teammates.length > 1 && (
            <div className="border-t border-navy/10 pt-3">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
                Team{registration.team_name ? `: ${registration.team_name}` : ''}
              </p>
              <p className="mt-1 font-body text-xs text-slate">
                {registration.teammates
                  .map((teammate) => `${teammate.name} (${teammate.username})${teammate.role === 'leader' ? ' · Leader' : ''}`)
                  .join(', ')}
              </p>
            </div>
          )}
          {registration.payment_reference && (
            <p className="font-body text-xs text-slate/70">Payment reference: {registration.payment_reference}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function ProfilePanel({ user, onUpdated }: { user: AuthUser; onUpdated: (user: AuthUser) => void }) {
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city ?? '');
  const [state, setState] = useState(user.state ?? '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const READ_ONLY_FIELDS: Array<{ label: string; value: string | null }> = [
    { label: 'Full Name', value: user.display_name },
    { label: 'Username', value: user.username },
    { label: 'Email Address', value: user.email },
    { label: 'Date of Birth', value: user.dob ? new Date(user.dob).toLocaleDateString() : null },
    { label: 'Gender', value: user.gender },
    { label: 'College', value: user.college },
    { label: 'Department', value: user.department },
    { label: 'Degree', value: user.degree },
    { label: 'Year of Study', value: user.year_of_study },
    { label: 'Register Number', value: user.register_number },
  ];

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSuccess(false);
    setIsSaving(true);
    try {
      const result = await apiFetch<{ user: AuthUser }>('/auth/me', {
        method: 'PATCH',
        body: JSON.stringify({ phone, city, state }),
      });
      onUpdated(result.user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not save your changes right now.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-heading text-xl font-semibold tracking-wide text-navy">Profile Details</h3>
        <p className="mt-1 font-body text-xs text-slate/70">
          Your name, email, and academic details were set once during registration and can only be changed by an
          administrator.
        </p>
        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 border border-navy/10 bg-cream/40 p-5 sm:grid-cols-2">
          {READ_ONLY_FIELDS.map((field) => (
            <div key={field.label}>
              <dt className="font-body text-[11px] font-semibold uppercase tracking-wide text-slate/70">
                {field.label}
              </dt>
              <dd className="font-body text-sm text-navy">{field.value || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5 border border-navy/15 bg-white/40 p-6">
        <h3 className="font-heading text-xl font-semibold tracking-wide text-navy">Editable Details</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Input label="Mobile Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))} />
          <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <Input label="State" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        {error && <p className="font-body text-sm text-red-700">{error}</p>}
        {success && <p className="font-body text-sm text-brown">Profile updated.</p>}
        <div>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}

const TAB_VALUES = TAB_OPTIONS.map((option) => option.value);

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, signOut, refresh, registrations } = useSession();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab = TAB_VALUES.includes(tabParam as DashboardTab) ? (tabParam as DashboardTab) : 'profile';
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const [localUser, setLocalUser] = useState<AuthUser | null>(user);

  const currentUser = localUser ?? user;

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  if (!currentUser) return null;

  const activeOption = TAB_OPTIONS.find((option) => option.value === activeTab)!;

  return (
    <>
      <PageHero title="Dashboard" subtitle={`Welcome back, ${currentUser.display_name}.`} />
      <section className="relative overflow-hidden bg-cream py-16">
        <div className="absolute inset-0 bp-grid-bg opacity-30" />
        <img
          src={blueprintGrid}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 hidden w-[32rem] opacity-[0.06] lg:block"
        />
        <FloatingIcon src={aiChipIcon} className="absolute -right-4 top-4 hidden h-28 w-28 sm:block" duration={50} />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden border border-gold/30 bg-white/50 p-5 shadow-card">
            <CornerOrnament corner="top-left" variant="floral" size={24} opacity={0.3} />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-slate/70">
                  Participant Username
                </p>
                <p className="font-heading text-2xl font-bold tracking-wide text-navy">{currentUser.username}</p>
              </div>
              <div className="flex items-center gap-3">
                {isAdmin && <span className="font-body text-xs font-semibold uppercase tracking-wide text-brown">Admin</span>}
                <Button variant="outline" size="sm" icon={<LogOut size={14} />} onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          <Tabs
            options={TAB_OPTIONS.map((option) => ({ label: option.label, value: option.value }))}
            value={activeTab}
            onChange={setActiveTab}
          />

          <div>
            {activeTab === 'profile' ? (
              <ProfilePanel
                user={currentUser}
                onUpdated={(updated) => {
                  setLocalUser(updated);
                  void refresh();
                }}
              />
            ) : activeTab === 'registrations' ? (
              <RegistrationsPanel registrations={registrations} />
            ) : activeTab === 'certificates' ? (
              <div className="flex flex-col items-center gap-4">
                <CertificateTemplate participantName={currentUser.display_name} />
                <p className="max-w-sm text-center font-body text-xs text-slate">
                  Your official certificate will be issued here once the event concludes.
                </p>
              </div>
            ) : activeTab === 'qr' ? (
              <div className="flex flex-col items-center gap-4">
                <ParticipantIdCard
                  name={currentUser.display_name}
                  username={currentUser.username}
                  department={currentUser.department}
                  yearOfStudy={currentUser.year_of_study}
                  photoUrl={currentUser.profile_photo_url}
                />
                <p className="max-w-sm text-center font-body text-xs text-slate">
                  Show this QR pass to an event admin to check in at any event you're registered for.
                </p>
              </div>
            ) : (
              <PlaceholderPanel icon={activeOption.icon} label={activeOption.label} description={activeOption.description} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
