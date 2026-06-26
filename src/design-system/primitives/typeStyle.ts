// Converts a typography token into a React style object, so components never
// hand-write font shorthands.

import type { CSSProperties } from 'react';

export interface TypeToken {
  family: string;
  weight: number;
  size: string;
  lineHeight: number | string;
  tracking?: string;
  transform?: string;
}

export function typeStyle(token: TypeToken): CSSProperties {
  return {
    fontFamily: token.family,
    fontWeight: token.weight,
    fontSize: token.size,
    lineHeight: token.lineHeight,
    letterSpacing: token.tracking,
    textTransform: token.transform as CSSProperties['textTransform'],
  };
}
