// Design tokens — single import surface.
// These are the source of truth for the OddWave visual language. Components and
// primitives reference these; raw hex/size literals are not allowed elsewhere.

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadows';
export * from './motion';

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadow } from './shadows';
import { motion } from './motion';

/** Aggregate token object. */
export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadow,
  motion,
} as const;

export type Tokens = typeof tokens;
