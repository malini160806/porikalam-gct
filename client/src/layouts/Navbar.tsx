import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS, type NavLink as NavLinkType } from '@/constants/site';
import { useSession } from '@/context/SessionContext';

function SimpleNavItem({ to, label, end }: { to: string; label: string; end?: boolean }) {
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

function DropdownNavItem({ link }: { link: NavLinkType }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="group flex items-center gap-1 py-1"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-body text-sm font-semibold uppercase tracking-wide text-cream/85 transition-colors duration-200 group-hover:text-gold">
          {link.label}
        </span>
        <ChevronDown
          size={14}
          className={`text-cream/70 transition-transform duration-200 group-hover:text-gold ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 border border-gold/30 bg-navy py-2 shadow-card"
          >
            {link.children!.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-150 ${
                    isActive ? 'text-gold bg-navy-deep/40' : 'text-cream/80 hover:text-gold hover:bg-navy-deep/40'
                  }`
                }
              >
                {child.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({ link, onNavigate }: { link: NavLinkType; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);

  if (!link.children?.length) {
    return (
      <NavLink
        to={link.path}
        end={link.path === '/'}
        onClick={onNavigate}
        className={({ isActive }) =>
          `font-body text-lg font-semibold uppercase tracking-wide ${isActive ? 'text-gold' : 'text-cream/90'}`
        }
      >
        {link.label}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between font-body text-lg font-semibold uppercase tracking-wide text-cream/90"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {link.label}
        <ChevronDown size={18} className={`transition-transform duration-200 ${expanded ? 'rotate-180 text-gold' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-4 pl-4">
              {link.children.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `font-body text-base font-semibold uppercase tracking-wide ${isActive ? 'text-gold' : 'text-cream/75'}`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      <div
        className={`mx-auto flex max-w-7xl items-center gap-4 px-6 transition-all duration-300 sm:px-8 lg:px-10 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        <motion.div animate={{ scale: scrolled ? 0.92 : 1 }} transition={{ duration: 0.3 }} className="origin-left">
          <Logo />
        </motion.div>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((link) =>
            link.children?.length ? (
              <DropdownNavItem key={link.path} link={link} />
            ) : (
              <SimpleNavItem key={link.path} to={link.path} label={link.label} end={link.path === '/'} />
            ),
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <div className="hidden lg:block">
            {!user && (
              <SimpleNavItem to="/login" label="Login" />
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
              className="fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col gap-8 overflow-y-auto border-l border-gold/30 bg-navy px-6 py-6 md:hidden"
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
                  <MobileNavItem key={link.path} link={link} onNavigate={() => setMobileOpen(false)} />
                ))}
              </nav>
              {!user && (
                <NavLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `font-body text-lg font-semibold uppercase tracking-wide ${isActive ? 'text-gold' : 'text-cream/90'}`
                  }
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
