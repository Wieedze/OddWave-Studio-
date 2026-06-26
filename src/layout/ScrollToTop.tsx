// Resets scroll on route change. The jump must be INSTANT — the global
// `html { scroll-behavior: smooth }` (used for in-page anchors) would otherwise
// animate the whole next page up from the previous scroll position. In-page hash
// links (e.g. /#contact) keep their smooth scroll.

import { useLocation } from 'react-router-dom';
import { isBrowser } from '@/helpers';
import { useIsomorphicLayoutEffect } from '@/hooks';

export function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) return;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
