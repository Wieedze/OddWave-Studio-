// Section — vertical rhythm + centered content column. Background variants map
// to the charcoal surface tokens.

import type { CSSProperties, ReactNode } from 'react';
import { colors, spacing } from '@/design-system/tokens';

type SectionBackground = 'page' | 'section' | 'raised' | 'transparent';

interface SectionProps {
  children: ReactNode;
  id?: string;
  background?: SectionBackground;
  /** Content max-width. Defaults to the standard 1180px column. */
  maxWidth?: string;
  /** Vertical padding override. */
  paddingY?: string;
  /** Add a top hairline like several handoff sections. */
  topRule?: boolean;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
}

const BACKGROUNDS: Record<SectionBackground, string> = {
  page: colors.ink[900],
  section: colors.surface.section,
  raised: colors.ink[850],
  transparent: 'transparent',
};

export function Section({
  children,
  id,
  background = 'page',
  maxWidth = spacing.layout.contentMax,
  paddingY = spacing.layout.sectionY,
  topRule = false,
  style,
  innerStyle,
}: SectionProps) {
  return (
    <section
      id={id}
      style={{
        background: BACKGROUNDS[background],
        padding: `${paddingY} ${spacing.layout.gutter}`,
        borderTop: topRule ? `1px solid ${colors.border.hair}` : undefined,
        ...style,
      }}
    >
      <div style={{ maxWidth, margin: '0 auto', ...innerStyle }}>{children}</div>
    </section>
  );
}
