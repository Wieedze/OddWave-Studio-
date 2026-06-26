// Border-radius tokens — see docs/design-system.md.

export const radius = {
  /** Buttons (flat family). */
  button: '3px',
  /** Flat family alt (system page buttons). */
  button4: '4px',
  sm: '6px',
  md: '8px',
  lg: '14px',
  card: '16px',
  media: '18px',
  xl: '22px',
  /** Pills / chips / floating nav. */
  pill: '999px',
} as const;

export type Radius = typeof radius;
