// Typography tokens — see docs/design-system.md.

/** Font families (with fallbacks). */
export const font = {
  display: "'Cabinet Grotesk', system-ui, sans-serif",
  body: "'Manrope', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
  /** Landing wordmark sub-label. */
  clash: "'Clash Display', 'Cabinet Grotesk', sans-serif",
  hatton: "'Hatton', 'Cabinet Grotesk', serif",
} as const;

export const weight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

/**
 * Type scale. Sizes are px unless they are responsive `clamp()` strings.
 * Each entry pairs a family + weight + size + line-height + tracking.
 */
export const type = {
  hero: {
    family: font.display,
    weight: weight.black,
    size: 'clamp(64px, 15vw, 236px)',
    lineHeight: 0.92,
    tracking: '0.01em',
  },
  display: {
    family: font.display,
    weight: weight.bold,
    size: '72px',
    lineHeight: 1.0,
    tracking: '-0.025em',
  },
  h1: {
    family: font.display,
    weight: weight.bold,
    size: '40px',
    lineHeight: 1.08,
    tracking: '-0.02em',
  },
  h2: {
    family: font.display,
    weight: weight.bold,
    size: 'clamp(28px, 5vw, 72px)',
    lineHeight: 1.15,
    tracking: '-0.015em',
  },
  h3: {
    family: font.body,
    weight: weight.semibold,
    size: '22px',
    lineHeight: 1.25,
    tracking: '-0.01em',
  },
  bodyLarge: {
    family: font.body,
    weight: weight.regular,
    size: '18px',
    lineHeight: 1.62,
    tracking: '0',
  },
  body: {
    family: font.body,
    weight: weight.regular,
    size: '16px',
    lineHeight: 1.6,
    tracking: '0',
  },
  label: {
    family: font.mono,
    weight: weight.semibold,
    size: '12px',
    lineHeight: 1,
    tracking: '0.2em',
    transform: 'uppercase',
  },
} as const;

export const typography = { font, weight, type } as const;
export type Typography = typeof typography;
