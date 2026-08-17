import { Link } from 'react-router-dom';
import { CalendarDays, ClipboardList, QrCode, Users, Wallet, Clock } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';
import { useAdminStats } from '@/hooks/useAdmin';
import { useAdminSession } from '@/context/AdminSessionContext';

const SECTIONS = [
  { to: '/admin/events', label: 'Event Management', description: 'Create, edit, and manage all events.' },
  { to: '/admin/registrations', label: 'Registration Management', description: 'Review participant registrations.' },
  { to: '/admin/attendance', label: 'Attendance', description: 'Scan QR codes and check participants in.' },
  { to: '/admin/participants', label: 'Participants', description: 'Browse everyone who created an account.', superOnly: true },
  { to: '/admin/payments', label: 'Payments', description: 'Track paid and pending registrations.', superOnly: true },
  { to: '/admin/admins', label: 'Admin Management', description: 'Manage admin accounts and access.', superOnly: true },
];

export default function AdminDashboard() {
  const { stats, loading } = useAdminStats();
  const { admin } = useAdminSession();
  const isSuperAdmin = admin?.role === 'super_admin';

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total Participants" value={loading ? null : stats?.total_participants ?? null} icon={<Users size={16} />} />
        <StatCard label="Total Registrations" value={loading ? null : stats?.total_registrations ?? null} icon={<ClipboardList size={16} />} />
        <StatCard label="Total Events" value={loading ? null : stats?.total_events ?? 0} icon={<CalendarDays size={16} />} />
        <StatCard label="Today's Attendance" value={loading ? null : stats?.today_attendance ?? null} icon={<QrCode size={16} />} />
        <StatCard label="Paid Registrations" value={loading ? null : stats?.paid_registrations ?? null} icon={<Wallet size={16} />} />
        <StatCard label="Pending Registrations" value={loading ? null : stats?.pending_registrations ?? null} icon={<Clock size={16} />} />
      </div>

      <div>
        <h2 className="font-heading text-lg font-semibold uppercase tracking-wide text-gold">Quick Access</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.filter((s) => !s.superOnly || isSuperAdmin).map((section) => (
            <Link
              key={section.to}
              to={section.to}
              className="group flex flex-col gap-2 border border-gold/20 bg-navy p-5 transition-colors duration-200 hover:border-gold/60"
            >
              <span className="font-body text-sm font-semibold uppercase tracking-wide text-cream group-hover:text-gold">
                {section.label}
              </span>
              <span className="font-body text-xs text-beige/60">{section.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
