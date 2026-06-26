// Elevation / shadow tokens — see docs/design-system.md.

export const shadow = {
  /** Light surfaces. */
  cardLight: '0 8px 24px -10px rgba(20,18,14,.25)',
  cardLightStrong: '0 22px 50px -18px rgba(20,18,14,.4)',
  /** Dark surfaces. */
  cardDark: '0 1px 3px rgba(0,0,0,.2)',
  /** Media blocks. */
  media: '0 34px 80px rgba(0,0,0,.55)',
  /** Landing glass service cards. */
  cardFloat: '0 50px 130px rgba(0,0,0,.55)',
  /** Floating nav pill. */
  nav: '0 8px 30px rgba(0,0,0,.34)',
  /** Mobile menu sheet. */
  menu: '0 14px 44px rgba(0,0,0,.45)',
  /** Primary copper button. */
  button: '0 14px 40px rgba(194,78,55,.3)',
  /** Teal glow accent. */
  glow: '0 0 0 1px rgba(255,255,255,.08), 0 18px 44px -18px rgba(63,163,154,.5)',
} as const;

export type Shadow = typeof shadow;
