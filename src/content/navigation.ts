// Site navigation — the floating pill groups and the mobile menu.
// Labels are French (content); routes are kebab-case English.

import { NavLink } from '@/models';

export const ROUTES = {
  home: '/',
  studio: '/studio',
  equipment: '/equipment',
  guidance: '/guidance',
  soundDesign: '/sound-design',
  portfolio: '/portfolio',
  exports: '/exports',
  contact: '/contact',
} as const;

/** Sleeping Tracks Records — the label's external site. */
export const LABEL_URL = 'https://www.sleepingtracksrecords.com/';

/** Left group of the floating nav. */
export const NAV_LEFT: readonly NavLink[] = [
  new NavLink('Studio', ROUTES.studio, 'left'),
  new NavLink('Matériel', ROUTES.equipment, 'left'),
  new NavLink('Sound design', ROUTES.soundDesign, 'left'),
  new NavLink('Label', LABEL_URL, 'left', true),
];

/** Right group of the floating nav. */
export const NAV_RIGHT: readonly NavLink[] = [
  new NavLink('Coaching', ROUTES.guidance, 'right'),
  new NavLink('Portfolio', ROUTES.portfolio, 'right'),
  new NavLink('Export', ROUTES.exports, 'right'),
  new NavLink('Contact', ROUTES.contact, 'right'),
];

/** Flat list for the mobile menu. */
export const MENU_LINKS: readonly NavLink[] = [...NAV_LEFT, ...NAV_RIGHT];
