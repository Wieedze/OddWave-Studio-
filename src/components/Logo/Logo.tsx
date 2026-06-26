// OddWave monogram — single stroked SVG path (the "OW" wave-in-circle).
// Line-art usage only here (rich render is a raster asset, out of scope).

import type { CSSProperties } from 'react';
import { OW_LOGO_PATH } from '@/helpers';
import { colors } from '@/design-system/tokens';

interface LogoProps {
  /** Stroke color. Light on charcoal, dark on paper, copper for hero moments. */
  stroke?: string;
  /** Optional fill (default none = pure line-art). */
  fill?: string;
  strokeWidth?: number;
  /** CSS size applied to width & height. */
  size?: number | string;
  title?: string;
  style?: CSSProperties;
}

export function Logo({
  stroke = colors.text.primary,
  fill = 'none',
  strokeWidth = 20,
  size = 34,
  title = 'OddWave',
  style,
}: LogoProps) {
  const dim = typeof size === 'number' ? `${size}px` : size;
  return (
    <svg
      viewBox="0 0 3000 3000"
      role="img"
      aria-label={title}
      style={{ width: dim, height: dim, display: 'block', overflow: 'visible', ...style }}
    >
      <title>{title}</title>
      <path
        d={OW_LOGO_PATH}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
