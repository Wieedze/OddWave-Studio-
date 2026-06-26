// Motion tokens — see docs/design-system.md.

/** Easing curves. */
export const ease = {
  /** UI (nav deploy, links). */
  ui: 'cubic-bezier(.19, 1, .22, 1)',
  /** Reveals / cinema open. */
  reveal: 'cubic-bezier(.16, 1, .3, 1)',
  /** System-page UI. */
  system: 'cubic-bezier(.22, .61, .36, 1)',
} as const;

/** Durations, in ms. */
export const duration = {
  fast: 240,
  entrance: 420,
  navDeploy: 800,
  heroBlur: 2000,
  cinema: 1600,
} as const;

/** GSAP-specific tuning (the landing intro timeline). */
export const gsap = {
  /** Eases used through the GSAP timeline. */
  ease: {
    out2: 'power2.out',
    out3: 'power3.out',
    inOut1: 'power1.inOut',
    inOut: 'sine.inOut',
  },
  /** Cadence multipliers (lent / moyen / rapide). */
  cadence: {
    lent: 0.92,
    moyen: 0.8,
    rapide: 0.62,
  },
} as const;

export const motion = { ease, duration, gsap } as const;
export type Motion = typeof motion;
