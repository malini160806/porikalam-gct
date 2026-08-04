import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS, type NavLink as NavLinkType } from '@/constants/site';
import { useSession } from '@/context/SessionContext';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const mobileNavVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

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

function MobileNavRow({ to, end, label, onNavigate }: { to: string; end?: boolean; label: string; onNavigate: () => void }) {
  return (
    <motion.div variants={mobileItemVariants}>
      <NavLink
        to={to}
        end={end}
        onClick={onNavigate}
        className={({ isActive }) =>
          `group flex items-center gap-3 border-b border-gold/10 py-3.5 font-body text-lg font-semibold uppercase tracking-wide transition-colors duration-200 ${
            isActive ? 'text-gold' : 'text-cream/90 hover:text-gold'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`h-1.5 w-1.5 shrink-0 rotate-45 bg-gold transition-opacity duration-200 ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
              }`}
            />
            {label}
          </>
        )}
      </NavLink>
    </motion.div>
  );
}

function MobileNavSection({ link, onNavigate }: { link: NavLinkType; onNavigate: () => void }) {
  if (!link.children?.length) {
    return <MobileNavRow to={link.path} end={link.path === '/'} label={link.label} onNavigate={onNavigate} />;
  }

  return (
    <motion.div variants={mobileItemVariants} className="py-2">
      <p className="flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.25em] text-gold/70">
        {link.label}
        <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
      </p>
      <div className="mt-1 flex flex-col">
        {link.children.map((child) => (
          <NavLink
            key={child.path}
            to={child.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 border-b border-gold/10 py-3 pl-4 font-body text-base font-semibold uppercase tracking-wide transition-colors duration-200 ${
                isActive ? 'text-gold' : 'text-cream/80 hover:text-gold'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`h-1 w-1 shrink-0 rotate-45 bg-gold transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                  }`}
                />
                {child.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useSession();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pin the background page while the menu is open. Plain `overflow: hidden` on body still
  // lets iOS Safari scroll-chain through to the page behind a fixed overlay, so the body is
  // pulled out of flow entirely and its scroll offset is restored on close.
  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.left = '0';
    style.right = '0';
    style.overflow = 'hidden';
    return () => {
      style.position = '';
      style.top = '';
      style.left = '';
      style.right = '';
      style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  // Focus trap + Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;

    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? 'border-gold/20 bg-navy/90 shadow-card backdrop-blur-md'
          : 'border-gold/10 bg-navy-deep/25 backdrop-blur-sm'
      }`}
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
            {user ? 'Dashboard' : 'Register Now'}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="ml-auto flex h-11 w-11 items-center justify-center text-cream md:hidden"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-navy-deep/80 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: 'easeInOut' }}
              className="navy-paper bp-grid-bg fixed right-0 top-0 z-50 flex h-dvh w-full flex-col border-l border-gold/30 shadow-card sm:w-[420px] md:hidden"
            >
              {/* Header */}
              <div
                className="flex shrink-0 items-center justify-between border-b border-gold/15 px-6 py-5"
                style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}
              >
                <Logo compact />
                <motion.button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-11 w-11 items-center justify-center border border-gold/30 text-gold"
                >
                  <X size={22} />
                </motion.button>
              </div>

              {/* Scrollable nav — every link lives here and this region scrolls independently of the header/footer. */}
              <motion.nav
                variants={mobileNavVariants}
                initial="hidden"
                animate="show"
                aria-label="Primary"
                className="mobile-nav-scroll flex-1 overflow-y-auto px-6 py-4"
              >
                {NAV_LINKS.map((link) => (
                  <MobileNavSection key={link.path} link={link} onNavigate={() => setMobileOpen(false)} />
                ))}
              </motion.nav>

              {/* Always-visible footer actions */}
              <div
                className="shrink-0 border-t border-gold/15 bg-gradient-to-t from-navy via-navy/95 to-transparent px-6 pb-6 pt-4"
                style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
              >
                {!user && (
                  <NavLink
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `mb-4 block text-center font-body text-base font-semibold uppercase tracking-wide ${
                        isActive ? 'text-gold' : 'text-cream/90 hover:text-gold'
                      }`
                    }
                  >
                    Login
                  </NavLink>
                )}
                <Button
                  to={user ? '/dashboard' : '/register'}
                  variant="primary"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {user ? 'Dashboard' : 'Register Now'}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
