import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Tabs } from '@/components/ui/Tabs';
import aiChipIcon from '@/assets/motifs/ai-chip.png';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useSession } from '@/context/SessionContext';
import { apiFetch, ApiError } from '@/lib/apiClient';
import type { AuthUser } from '@/types/api';

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

const TAB_OPTIONS: Array<{ value: DashboardTab; label: string; icon: typeof UserIcon }> = [
  { value: 'profile', label: 'Profile', icon: UserIcon },
  { value: 'registrations', label: 'My Registrations', icon: CalendarCheck },
  { value: 'upcoming', label: 'Upcoming Events', icon: CalendarDays },
  { value: 'schedule', label: 'Event Schedule', icon: CalendarDays },
  { value: 'payments', label: 'Payment History', icon: Receipt },
  { value: 'attendance', label: 'Attendance', icon: CheckSquare },
  { value: 'certificates', label: 'Certificates', icon: Award },
  { value: 'qr', label: 'QR Pass', icon: QrCode },
  { value: 'notifications', label: 'Notifications', icon: Bell },
  { value: 'settings', label: 'Settings', icon: SettingsIcon },
];

function PlaceholderPanel({ icon: Icon, label }: { icon: typeof UserIcon; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-3 border border-navy/15 bg-white/40 px-8 py-16 text-center"
    >
      <Icon size={28} className="text-gold" />
      <p className="font-heading text-xl font-semibold tracking-wide text-navy">{label}</p>
      <p className="max-w-sm font-body text-sm text-slate">
        Available once event registration opens. Check back soon.
      </p>
    </motion.div>
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
    { label: 'Parent / Guardian Name', value: user.guardian_name },
    { label: 'Emergency Contact', value: user.emergency_contact },
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

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAdmin, signOut, refresh } = useSession();
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');
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
        <FloatingIcon src={aiChipIcon} className="absolute -right-4 top-4 h-28 w-28" duration={50} />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-wrap items-center justify-between gap-4 overflow-hidden border border-navy/10 bg-white/40 p-5">
            <CornerOrnament corner="top-left" variant="floral" className="opacity-30" />
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
            ) : (
              <PlaceholderPanel icon={activeOption.icon} label={activeOption.label} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
