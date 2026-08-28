import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** The browser restores scroll position on back/forward by default, which races with (and
 * often wins over) our own reset below — so it's disabled once here in favor of always
 * landing at the top, matching this site's single-page-per-route navigation model. */
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    // The target page is lazy-loaded, so its element may not exist on the first
    // frame after navigation — poll briefly instead of racing the chunk load.
    const id = hash.slice(1);
    let attempts = 0;
    let frameId: number;

    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
        return;
      }
      attempts += 1;
      if (attempts < 50) {
        frameId = requestAnimationFrame(tryScroll);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    tryScroll();

    return () => cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
}
