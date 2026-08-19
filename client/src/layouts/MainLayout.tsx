import { useState, type MouseEvent as ReactMouseEvent } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { MouseGlow } from '@/components/common/MouseGlow';
import { ScrollTint } from '@/components/common/ScrollTint';
import { PageTransition } from '@/components/common/PageTransition';
import { AuthRequiredModal } from '@/components/auth/AuthRequiredModal';
import { useSession } from '@/context/SessionContext';

/** Destinations a signed-out visitor may still reach — every other in-app link (nav, footer,
 * or any in-page button) opens the account gate instead of navigating. */
const PUBLIC_PATHS = ['/', '/login', '/register', '/forgot-password', '/certificates'];

function isPublicHref(href: string): boolean {
  if (!href.startsWith('/') || href.startsWith('/admin')) return true; // external/mailto/tel + the separate admin portal are never gated here
  const path = href.split('?')[0].split('#')[0];
  return PUBLIC_PATHS.includes(path);
}

export function MainLayout() {
  const { user } = useSession();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  function handleLinkCapture(event: ReactMouseEvent<HTMLDivElement>) {
    if (user) return;
    const anchor = (event.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;
    const href = anchor.getAttribute('href') ?? '';
    if (isPublicHref(href)) return;
    event.preventDefault();
    setAuthModalOpen(true);
  }

  return (
    <div className="flex min-h-screen flex-col" onClickCapture={handleLinkCapture}>
      <ScrollToTop />
      <ScrollProgress />
      <MouseGlow />
      <ScrollTint />
      <Navbar />
      <main className="flex-1 pt-[73px]">
        <PageTransition />
      </main>
      <Footer />
      <AuthRequiredModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}
