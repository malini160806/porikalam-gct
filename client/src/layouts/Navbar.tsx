import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
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

const navLabelClass =
  'font-body text-[10px] xl:text-[11px] 2xl:text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300';
const navUnderlineClass =
  'absolute inset-x-0 -bottom-2 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-light to-gold transition-transform duration-300 ease-out group-hover:scale-x-100';

function SimpleNavItem({ to, label, end }: { to: string; label: string; end?: boolean }) {
  return (
    <NavLink to={to} end={end} className="group relative">
      {({ isActive }) => (
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="relative inline-flex items-center whitespace-nowrap px-1 py-2"
        >
          <span
            className={`${navLabelClass} ${
              isActive
                ? 'text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.55)]'
                : 'text-cream/80 group-hover:text-gold group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]'
            }`}
          >
            {label}
          </span>
          <span className={`${navUnderlineClass} ${isActive ? 'scale-x-100' : ''}`} />
        </motion.div>
      )}
    </NavLink>
  );
}

/** Highlighted nav entry for Thulira — shimmering gold label with a small pulsing accent dot. */
function ThuliraNavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink to={to} className="group relative">
      {({ isActive }) => (
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="relative inline-flex items-center gap-1.5 whitespace-nowrap px-1 py-2"
        >
          <span
            className={`text-shimmer-gold ${navLabelClass} ${
              isActive ? 'drop-shadow-[0_0_10px_rgba(212,175,55,0.55)]' : 'group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]'
            }`}
          >
            {label}
          </span>
          <motion.span
            animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(212,175,55,0.6)]"
          />
          <span className={`${navUnderlineClass} ${isActive ? 'scale-x-100' : ''}`} />
        </motion.div>
      )}
    </NavLink>
  );
}

function DropdownNavItem({ link }: { link: NavLinkType }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = link.children!.some((child) => pathname === child.path);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group relative flex items-center gap-1.5 whitespace-nowrap px-1 py-2"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className={`${navLabelClass} ${
            isActive || open
              ? 'text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.55)]'
              : 'text-cream/80 group-hover:text-gold group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]'
          }`}
        >
          {link.label}
        </span>
        <ChevronDown
          size={13}
          className={`text-cream/60 transition-transform duration-200 group-hover:text-gold ${open ? 'rotate-180 text-gold' : ''}`}
        />
        <span className={`${navUnderlineClass} ${isActive || open ? 'scale-x-100' : ''}`} />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="navy-paper bp-grid-bg absolute left-1/2 top-full z-50 mt-4 w-56 -translate-x-1/2 border border-gold/25 py-2 shadow-card"
          >
            {link.children!.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                onClick={() => setOpen(false)}
                className={({ isActive: childActive }) =>
                  `block px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-150 ${
                    childActive ? 'text-gold bg-navy-deep/50' : 'text-cream/80 hover:text-gold hover:bg-navy-deep/50'
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

function MobileNavRow({
  to,
  end,
  label,
  onNavigate,
  highlight,
}: {
  to: string;
  end?: boolean;
  label: string;
  onNavigate: () => void;
  highlight?: boolean;
}) {
  return (
    <motion.div variants={mobileItemVariants}>
      <NavLink
        to={to}
        end={end}
        onClick={onNavigate}
        className={({ isActive }) =>
          `group flex items-center gap-3 border-b border-gold/10 py-3.5 font-body text-lg font-semibold uppercase tracking-wide transition-colors duration-200 ${
            isActive ? 'text-gold' : highlight ? 'text-cream/90' : 'text-cream/90 hover:text-gold'
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
            {highlight ? (
              <span className="inline-flex items-center gap-2">
                <span className="text-shimmer-gold">{label}</span>
                <motion.span
                  animate={{ opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(212,175,55,0.6)]"
                />
              </span>
            ) : (
              label
            )}
          </>
        )}
      </NavLink>
    </motion.div>
  );
}

function MobileNavSection({ link, onNavigate }: { link: NavLinkType; onNavigate: () => void }) {
  if (!link.children?.length) {
    return (
      <MobileNavRow
        to={link.path}
        end={link.path === '/'}
        label={link.label}
        onNavigate={onNavigate}
        highlight={link.path === '/thulira' || link.path === '/tech-thiral'}
      />
    );
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
  const { user, signOut } = useSession();
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
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-40 border-b border-gold/30 bg-navy-deep transition-all duration-300 ${
        scrolled ? 'shadow-[0_8px_28px_-10px_rgba(0,0,0,0.6)] backdrop-blur-lg' : 'backdrop-blur-md'
      }`}
    >
      {/* Blueprint grid texture, always present so the bar never reads as flat/plain */}
      <div className="bp-grid-bg pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/95 via-navy-deep/90 to-navy-deep/95" />

      <div
        className={`relative mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-5 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        {/* Left: brand — Porikkalam logo */}
        <div className="flex shrink-0 items-center gap-3">
          <motion.div
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex shrink-0 items-center origin-left"
          >
            <Logo compact />
          </motion.div>
        </div>

        {/* Center: primary navigation links */}
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 md:flex xl:gap-4 2xl:gap-6">
          {NAV_LINKS.map((link) =>
            link.children?.length ? (
              <DropdownNavItem key={link.path} link={link} />
            ) : link.path === '/thulira' || link.path === '/tech-thiral' ? (
              <ThuliraNavItem key={link.path} to={link.path} label={link.label} />
            ) : (
              <SimpleNavItem key={link.path} to={link.path} label={link.label} end={link.path === '/'} />
            ),
          )}
        </nav>

        {/* Right: auth + primary action */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <div className="hidden lg:block">
            {!user && <SimpleNavItem to="/login" label="Login" />}
          </div>
          {user && (
            <button
              type="button"
              onClick={signOut}
              className="group relative hidden items-center gap-1.5 whitespace-nowrap px-1 py-2 lg:inline-flex"
            >
              <span className={`${navLabelClass} text-cream/80 group-hover:text-gold`}>Logout</span>
              <LogOut size={14} className="text-cream/70 group-hover:text-gold" />
            </button>
          )}
          <Button to={user ? '/dashboard' : '/register'} variant="primary" size="sm" className="shrink-0 whitespace-nowrap rounded-[10px]">
            {user ? 'Dashboard' : 'Register Now'}
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center text-gold md:hidden"
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
                  className="flex h-12 w-12 items-center justify-center border border-gold/30 text-gold"
                >
                  <X size={26} />
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
                {user && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      signOut();
                    }}
                    className="mb-4 flex w-full items-center justify-center gap-2 text-center font-body text-base font-semibold uppercase tracking-wide text-cream/90 hover:text-gold"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                )}
                <Button
                  to={user ? '/dashboard' : '/register'}
                  variant="primary"
                  className="w-full rounded-[10px]"
                  onClick={() => setMobileOpen(false)}
                >
                  {user ? 'Dashboard' : 'Register Now'}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
