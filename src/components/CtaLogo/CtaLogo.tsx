// Shared CTA monogram — the copper OddWave mark that sits above every
// end-of-page call to action (and the contact confirmation cards). One size,
// one color, one place to change them all.

import { Logo } from '@/components/Logo';
import { colors } from '@/design-system/tokens';

/** The single source of truth for the CTA mark size (px). */
export const CTA_LOGO_SIZE = 322;

interface CtaLogoProps {
  /** Mark size in px. Defaults to the shared CTA size. */
  size?: number;
  /** Space below the mark. */
  marginBottom?: number | string;
  /** Centered inline-block (page-bottom CTA) vs left-aligned block (in a card). */
  centered?: boolean;
  /** Tag with `data-reveal` so the page motion reveals it. Off when a parent already reveals. */
  reveal?: boolean;
}

export function CtaLogo({ size = CTA_LOGO_SIZE, marginBottom = 16, centered = true, reveal = true }: CtaLogoProps) {
  return (
    <div
      data-reveal={reveal ? '' : undefined}
      style={{
        display: centered ? 'inline-block' : 'block',
        width: `${size}px`,
        height: `${size}px`,
        marginBottom: typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,
      }}
    >
      <Logo size={size} stroke={colors.copper.landing} />
    </div>
  );
}
