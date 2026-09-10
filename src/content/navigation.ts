// Site navigation — the floating pill groups and the mobile menu.
// Routes are the canonical French paths; LocaleLink adds the /en prefix when
// the visitor is in the English tree, so nothing here needs a locale variant.

import { NavLink } from '@/models';
import type { Localized } from '@/helpers';

export const ROUTES = {
  home: '/',
  services: '/services',
  equipment: '/equipment',
  guidance: '/guidance',
  soundDesign: '/sound-design',
  portfolio: '/portfolio',
  exports: '/exports',
  contact: '/contact',
} as const;

/** Sleeping Tracks Records — the label's external site. */
export const LABEL_URL = 'https://www.sleepingtracksrecords.com/';

export interface NavGroups {
  /** Left group of the floating nav. */
  readonly left: readonly NavLink[];
  /** Right group of the floating nav. */
  readonly right: readonly NavLink[];
}

export interface NavCopy {
  readonly groups: NavGroups;
  /** Accessible names, never rendered on screen. */
  readonly mainLabel: string;
  readonly homeLabel: string;
  readonly menuLabel: string;
}

/** The two side groups are kept close in character count so the pill stays
 *  visually balanced around the logo disc (learnings, July 2026). */
export const NAV: Localized<NavCopy> = {
  fr: {
    groups: {
      left: [
        new NavLink('Services', ROUTES.services, 'left'),
        new NavLink('Matériel', ROUTES.equipment, 'left'),
        new NavLink('Sound design', ROUTES.soundDesign, 'left'),
        new NavLink('Label', LABEL_URL, 'left', true),
      ],
      right: [
        new NavLink('Coaching', ROUTES.guidance, 'right'),
        new NavLink('Portfolio', ROUTES.portfolio, 'right'),
        new NavLink('Export', ROUTES.exports, 'right'),
        new NavLink('Contact', ROUTES.contact, 'right'),
      ],
    },
    mainLabel: 'Navigation principale',
    homeLabel: 'Accueil',
    menuLabel: 'Menu',
  },
  en: {
    groups: {
      left: [
        new NavLink('Services', ROUTES.services, 'left'),
        new NavLink('Equipment', ROUTES.equipment, 'left'),
        new NavLink('Sound design', ROUTES.soundDesign, 'left'),
        new NavLink('Label', LABEL_URL, 'left', true),
      ],
      right: [
        new NavLink('Coaching', ROUTES.guidance, 'right'),
        new NavLink('Portfolio', ROUTES.portfolio, 'right'),
        new NavLink('Export', ROUTES.exports, 'right'),
        new NavLink('Contact', ROUTES.contact, 'right'),
      ],
    },
    mainLabel: 'Main navigation',
    homeLabel: 'Home',
    menuLabel: 'Menu',
  },
};

/** Flat list for the mobile menu. */
export function menuLinks(nav: NavCopy): readonly NavLink[] {
  return [...nav.groups.left, ...nav.groups.right];
}
