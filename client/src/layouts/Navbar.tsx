import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS } from '@/constants/site';
import { useSession } from '@/context/SessionContext';

function NavItem({ to, label, end }: { to: string; label: string; end?: boolean }) {
  return (
    <NavLink to={to} end={end} className="group relative py-1">
      {({ isActive }) => (
        <>
          <span
            className={`font-body text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
              isActive ? 'text-gold' : 'text-cream/85 group-hover:text-gold'
            }`}
          >
            {label}
          </span>
          <span
            className={`absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100 ${
              isActive ? 'scale-x-100' : ''
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-navy/90 backdrop-blur-md shadow-card' : 'bg-navy'
      } border-b border-gold/20`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3 sm:px-8 lg:px-10">
        <Logo />

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.path} to={link.path} label={link.label} end={link.path === '/'} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div className="hidden lg:block">
            {!user && (
              <NavItem to="/login" label="Login" />
            )}
          </div>
          <Button to={user ? '/dashboard' : '/register'} variant="primary" size="sm">
            {user ? 'Dashboard' : 'Register'}
          </Button>
        </div>

        <button
          type="button"
          className="ml-auto text-cream md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-navy-deep/70 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col gap-8 border-l border-gold/30 bg-navy px-6 py-6 md:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo compact />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="text-cream"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `font-heading text-xl tracking-wide ${isActive ? 'text-gold' : 'text-cream/90'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              {!user && (
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `font-heading text-xl tracking-wide ${isActive ? 'text-gold' : 'text-cream/90'}`}
                >
                  Login
                </NavLink>
              )}
              <Button to={user ? '/dashboard' : '/register'} variant="primary" onClick={() => setMobileOpen(false)}>
                {user ? 'Dashboard' : 'Register'}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
