// Floating nav used on every page. Hover/focus deploys the side groups (CSS).
// The home intro can add `.is-open` to `.ow-nav` imperatively (motion layer).

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { colors } from '@/design-system/tokens';
import { NAV_LEFT, NAV_RIGHT, MENU_LINKS, ROUTES } from '@/content/navigation';
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
    <Link to={link.to} className="ow-link">
      {link.label}
    </Link>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="ow-nav-shell">
      <nav className="ow-nav" aria-label="Navigation principale">
        <div className="ow-nav-side ow-nav-left">
          {NAV_LEFT.map((link) => (
            <NavLinkItem key={link.to} link={link} />
          ))}
        </div>

        <Link to={ROUTES.home} className="ow-nav-logo" aria-label="Accueil">
          <Logo size={60} stroke={colors.text.primary} />
        </Link>

        <div className="ow-nav-side ow-nav-right">
          {NAV_RIGHT.map((link) => (
            <NavLinkItem key={link.to} link={link} />
          ))}
        </div>
      </nav>

      <button
        type="button"
        className="ow-burger"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
          <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      <div className={menuOpen ? 'ow-menu open' : 'ow-menu'}>
        {MENU_LINKS.map((link) =>
          link.external ? (
            <a key={link.to} href={link.to} className="ow-mlink" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ) : (
            <Link key={link.to} to={link.to} className="ow-mlink" onClick={() => setMenuOpen(false)}>
              {link.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
