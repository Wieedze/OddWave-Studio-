// Resets scroll on route change, but honors in-page hash links (e.g. /#contact).

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isBrowser } from '@/helpers';

export function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!isBrowser) return;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
