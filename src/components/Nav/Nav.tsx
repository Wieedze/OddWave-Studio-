// Nav flottante « disque + barre ». Le déploiement des groupes est en CSS
// (hover/focus-within). La couche motion (intro home) peut ajouter `.is-open`.

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { LocaleSwitch } from '@/components/LocaleSwitch';
import { LocaleLink } from '@/design-system/primitives';
import { colors } from '@/design-system/tokens';
import { useText } from '@/hooks';
import { prefersReducedMotion } from '@/helpers';
import { NAV, menuLinks, ROUTES } from '@/content/navigation';
import { SITE } from '@/content/site';
import type { NavLink as NavLinkModel } from '@/models';
import './Nav.css';

function NavLinkItem({ link }: { link: NavLinkModel }) {
  if (link.external) {
    return (
      <a href={link.to} className="ow-link" target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }
  return (
    <LocaleLink to={link.to} className="ow-link">
      {link.label}
    </LocaleLink>
  );
}

export function Nav() {
  const nav = useText(NAV);
  const site = useText(SITE);
  const [menuOpen, setMenuOpen] = useState(false);
  // Auto-deployed on page arrival, collapsed to the logo once scrolled down
  // (hover / keyboard focus still re-open it via CSS).
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) {
      setOpen(false);
      return;
    }
    // Scroll position → open near the top, collapsed once scrolled. Pages wrap
    // content in a root with `overflow-x: hidden`, making THAT element the scroll
    // container — and scroll events don't bubble, so we listen in the CAPTURE
    // phase and read the position off whatever actually scrolled. Unifies pages.
    const nearTop = (target: EventTarget | null): boolean => {
      if (target instanceof HTMLElement && target !== document.documentElement && target !== document.body) {
        return target.scrollTop <= 12;
      }
      return window.scrollY <= 12;
    };

    // On the home landing the nav arrives CLOSED and deploys ~1s later, in step
    // with the intro timeline. Everywhere else it's deployed on arrival.
    let openTimer = 0;
    if (pathname === ROUTES.home) {
      setOpen(false);
      openTimer = window.setTimeout(() => setOpen(true), 1050);
    } else {
      setOpen(true);
    }

    const onScroll = (e: Event) => {
      window.clearTimeout(openTimer);
      setOpen(nearTop(e.target));
    };
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      window.clearTimeout(openTimer);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [pathname]);

  return (
    <div className="ow-nav-shell">
      {/* .ow-nav-fx carries the contour drop-shadow (unclipped); .ow-nav is a
          FIXED-width bar revealed via clip-path — no width animation, so nothing
          shifts in layout and the centred elements never jitter. */}
      <div className="ow-nav-fx">
        <nav className={open ? 'ow-nav is-open' : 'ow-nav'} aria-label={nav.mainLabel}>
          {/* fond en un seul bloc : union barre + disque */}
          <div className="ow-nav-bg">
            <div className="bar" />
            <div className="disc" />
          </div>

          <div className="ow-nav-content">
            <div className="ow-nav-side ow-nav-left">
              {nav.groups.left.map((link) => (
                <NavLinkItem key={link.to} link={link} />
              ))}
            </div>
            <div className="ow-nav-side ow-nav-right">
              {nav.groups.right.map((link) => (
                <NavLinkItem key={link.to} link={link} />
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Logo OUT of the clipped/filtered bar: always sharp, pinned to a stable
          centre → zero jitter while the bar deploys / retracts. */}
      <LocaleLink to={ROUTES.home} className="ow-nav-logo" aria-label={nav.homeLabel}>
        {/* le <span> porte la taille + la correction optique (voir Nav.css) */}
        <span>
          <Logo size={108} stroke={colors.text.primary} />
        </span>
      </LocaleLink>

      <LocaleSwitch label={site.languageLabel} place="nav" />

      <button
        type="button"
        className="ow-burger"
        aria-label={nav.menuLabel}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
          <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      <div className={menuOpen ? 'ow-menu open' : 'ow-menu'}>
        {menuLinks(nav).map((link) =>
          link.external ? (
            <a key={link.to} href={link.to} className="ow-mlink" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ) : (
            <LocaleLink key={link.to} to={link.to} className="ow-mlink" onClick={() => setMenuOpen(false)}>
              {link.label}
            </LocaleLink>
          ),
        )}
        <LocaleSwitch label={site.languageLabel} place="menu" />
      </div>
    </div>
  );
}
