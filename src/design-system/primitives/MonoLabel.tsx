// Mono eyebrow / technical label. JetBrains Mono, uppercase, wide tracking.

import type { CSSProperties, ReactNode } from 'react';
import { colors, typography } from '@/design-system/tokens';

interface MonoLabelProps {
  children: ReactNode;
  /** Text color. Defaults to the warm copper used for eyebrows. */
  color?: string;
  size?: string;
  /** Letter-spacing override (handoff ranges from .16em to .42em). */
  tracking?: string;
  as?: 'span' | 'div';
  style?: CSSProperties;
}

export function MonoLabel({
  children,
  color = colors.copper.warm,
  size = '12px',
  tracking = '0.2em',
  as: Tag = 'span',
  style,
}: MonoLabelProps) {
  return (
    <Tag
      style={{
        fontFamily: typography.font.mono,
        fontWeight: typography.weight.semibold,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: tracking,
        textTransform: 'uppercase',
        color,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
