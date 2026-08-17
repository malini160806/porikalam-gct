import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Users,
  QrCode,
  Wallet,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { ProtectedAdminRoute } from '@/components/admin/ProtectedAdminRoute';
import { useAdminSession } from '@/context/AdminSessionContext';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, superOnly: false },
  { to: '/admin/events', label: 'Events', icon: CalendarDays, superOnly: false },
  { to: '/admin/registrations', label: 'Registrations', icon: ClipboardList, superOnly: false },
  { to: '/admin/participants', label: 'Participants', icon: Users, superOnly: true },
  { to: '/admin/attendance', label: 'Attendance', icon: QrCode, superOnly: false },
  { to: '/admin/payments', label: 'Payments', icon: Wallet, superOnly: true },
  { to: '/admin/admins', label: 'Admins', icon: ShieldCheck, superOnly: true },
  { to: '/admin/settings', label: 'Settings', icon: Settings, superOnly: false },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { admin, signOut } = useAdminSession();
  const isSuperAdmin = admin?.role === 'super_admin';

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-gold/15 px-5 py-5">
        <Logo compact />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.filter((item) => !item.superOnly || isSuperAdmin).map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 font-body text-sm font-semibold uppercase tracking-wide transition-colors duration-150 ${
                    isActive
                      ? 'border-l-2 border-gold bg-gold/10 text-gold'
                      : 'border-l-2 border-transparent text-beige/70 hover:border-gold/40 hover:bg-white/5 hover:text-gold'
                  }`
                }
              >
                <item.icon size={17} strokeWidth={1.75} className="shrink-0" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gold/15 px-5 py-4">
        <p className="font-body text-xs font-semibold uppercase tracking-wider text-gold">{admin?.name}</p>
        <p className="font-body text-[11px] text-beige/50">
          {admin?.role === 'super_admin' ? 'Super Admin' : 'Event Admin'}
        </p>
        <button
          type="button"
          onClick={signOut}
          className="mt-3 flex w-full items-center gap-2 border border-gold/25 px-3 py-2 font-body text-xs font-semibold uppercase tracking-wide text-beige/80 transition-colors hover:border-gold hover:text-gold"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );
}

function AdminShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { admin } = useAdminSession();

  return (
    <div className="flex min-h-screen bg-navy-deep">
      <div className="pointer-events-none fixed inset-0 bp-grid-bg opacity-[0.08]" />

      {/* Desktop sidebar */}
      <aside className="relative hidden w-64 shrink-0 border-r border-gold/15 bg-navy md:block">
        <div className="fixed h-screen w-64">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-gold/15 bg-navy px-4 py-3 md:hidden">
        <Logo compact />
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center text-gold"
          aria-label="Open admin menu"
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-gold/20 bg-navy md:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-gold"
                aria-label="Close admin menu"
              >
                <X size={20} />
              </button>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="relative flex-1 px-4 py-6 pt-20 sm:px-6 md:pt-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between pb-6">
          <div>
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-gold/70">
              Porikkalam 2026
            </p>
            <h1 className="font-heading text-xl font-bold uppercase tracking-wide text-cream sm:text-2xl">
              Control Panel
            </h1>
          </div>
          <p className="hidden font-body text-xs text-beige/50 sm:block">
            Signed in as <span className="text-gold">{admin?.username}</span>
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function AdminLayout() {
  return (
    <ProtectedAdminRoute>
      <AdminShell />
    </ProtectedAdminRoute>
  );
}
