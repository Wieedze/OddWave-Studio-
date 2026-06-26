// Spacing tokens — base-4 grid (see docs/design-system.md).

/** Base-4 spacing scale, in px. Key = px value. */
export const space = {
  0: '0px',
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  24: '24px',
  32: '32px',
  48: '48px',
  64: '64px',
  96: '96px',
  128: '128px',
} as const;

/** Layout constants. */
export const layout = {
  /** Default content max-width. */
  contentMax: '1180px',
  /** Wider content blocks. */
  wideMax: '1280px',
  /** Guidance phase stack. */
  phasesMax: '1360px',
  /** Landing service cards. */
  cardMax: '1500px',
  /** Horizontal section padding. */
  gutter: '30px',
  /** Responsive vertical section padding. */
  sectionY: 'clamp(60px, 11vh, 150px)',
  /** Responsive horizontal section padding (landing service rows). */
  sectionXFluid: 'clamp(20px, 4vw, 64px)',
} as const;

/** Mobile breakpoint where the nav side-groups collapse to a hamburger. */
export const breakpoint = {
  nav: '860px',
  mobile: '720px',
  tablet: '1024px',
} as const;

export const spacing = { space, layout, breakpoint } as const;
export type Spacing = typeof spacing;
