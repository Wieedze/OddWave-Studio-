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
  contact: '/contact',
} as const;

/** Left group of the floating nav. */
export const NAV_LEFT: readonly NavLink[] = [
  new NavLink('Le studio', ROUTES.studio, 'left'),
  new NavLink('Le matériel', ROUTES.equipment, 'left'),
  new NavLink('Accompagnement', ROUTES.guidance, 'left'),
];

/** Sleeping Tracks Records — the label's external site. */
export const LABEL_URL = 'https://www.sleepingtracksrecords.com/';

/** Right group of the floating nav. */
export const NAV_RIGHT: readonly NavLink[] = [
  new NavLink('Sound design', ROUTES.soundDesign, 'right'),
  new NavLink('Portfolio', ROUTES.portfolio, 'right'),
  new NavLink('Label', LABEL_URL, 'right', true),
  new NavLink('Contact', ROUTES.contact, 'right'),
];

/** Flat list for the mobile menu. */
export const MENU_LINKS: readonly NavLink[] = [...NAV_LEFT, ...NAV_RIGHT];
