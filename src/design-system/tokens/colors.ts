// Color tokens — source of truth distilled in docs/design-system.md.
// Theme line: "Précision & Chaleur" (cold charcoal structure, copper warmth).

/** Charcoal — base & surfaces. */
export const ink = {
  900: '#0E0F12', // page background
  850: '#16171C', // dark section
  800: '#1C1D22', // raised surface
  700: '#26272D', // card / field
  600: '#34353C', // strong border
} as const;

/** Extra section surfaces seen across the pages. */
export const surface = {
  section: '#0B0C0F',
  raised: '#15161A',
  field: '#0E0F12',
} as const;

/** Copper — primary accent ("cuivre brûlé"). */
export const copper = {
  700: '#7A2E16', // pressed / active
  600: '#94371B', // accent on light
  500: '#AC3F20', // design-system brand copper
  400: '#C85733', // accent on dark
  300: '#E18A5E', // hover / glow
  /** Landing-era copper (also the selection color on the landing). */
  landing: '#C24E37',
  /** Warm secondary used in eyebrows / rules. */
  warm: '#C9885F',
  warmSoft: '#E0A38E',
  warmDeep: '#DC8068',
  highlight: '#E7C9AF',
  deep: '#A53A2C',
} as const;

/** Wood — secondary accent ("bois noyer"). */
export const wood = {
  700: '#2E2117',
  600: '#4A3324',
  500: '#6B4A33',
  400: '#976C46',
  300: '#C09365',
} as const;

/** Teal — logo support. */
export const teal = {
  700: '#0E4B50',
  500: '#1C7A75',
  300: '#3FA39A',
} as const;

/** Functional signals. */
export const signal = {
  red: '#D8473A', // REC
  amber: '#E8A23D', // LED
} as const;

/** Paper — light surfaces (design-system / content pages). */
export const paper = {
  base: '#F4F0E8',
  white: '#FFFFFF',
  warm: '#ECE7DD',
  bright: '#FBF8F2',
} as const;

/** Text colors. */
export const text = {
  primary: '#F1EEE8',
  primaryWarm: '#F6EEE6',
  secondary: '#B7B3AB',
  muted: '#9C9890',
  mutedSoft: '#8C887F',
  mutedCool: '#A5A5A5',
  faint: '#7E7A72',
  fainter: '#6B675F',
  faintest: '#5E5A52',
  /** Bright surface text on the landing prestation cards. */
  surfaceBright: '#F8F6F2',
  onLight: '#17150F',
  onLightSoft: '#57534A',
  onLightFaint: '#8A847A',
} as const;

/** Hairlines / borders. */
export const border = {
  hair: 'rgba(255,255,255,.06)',
  hairMid: 'rgba(255,255,255,.07)',
  soft: 'rgba(255,255,255,.08)',
  base: 'rgba(255,255,255,.10)',
  strong: 'rgba(255,255,255,.14)',
  bold: 'rgba(255,255,255,.18)',
  onLightSoft: 'rgba(20,18,14,.08)',
  onLightBase: 'rgba(20,18,14,.10)',
  onLightStrong: 'rgba(20,18,14,.14)',
} as const;

/** Selection (landing surfaces). */
export const selection = {
  background: '#C24E37',
  text: '#FFFFFF',
} as const;

export const colors = {
  ink,
  surface,
  copper,
  wood,
  teal,
  signal,
  paper,
  text,
  border,
  selection,
} as const;

export type Colors = typeof colors;
