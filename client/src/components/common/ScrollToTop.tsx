import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** The browser restores scroll position on back/forward by default, which races with (and
 * often wins over) our own reset below — so it's disabled once here in favor of always
 * landing at the top, matching this site's single-page-per-route navigation model. */
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
