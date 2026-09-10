// Five-star rating row. Drawn as SVG rather than the ★ glyph: the site's three
// families (Cabinet Grotesk, Manrope, JetBrains Mono) have no star, so a text
// version would fall back to a system font or a colour emoji and break the
// palette. Partial ratings clip the copper layer over the muted track.

import { colors } from '@/design-system/tokens';
import './GoogleReviews.css';

const STAR_PATH = 'M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9z';

function StarRow({ color, size }: { color: string; size: number }) {
  return (
    <span className="ow-stars-row" style={{ gap: `${Math.round(size * 0.12)}px` }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={STAR_PATH} fill={color} />
        </svg>
      ))}
    </span>
  );
}

interface StarsProps {
  /** 0 to 5. */
  rating: number;
  /** Glyph size in px. */
  size?: number;
  /** Read instead of the glyphs; the row itself is hidden from assistive tech. */
  label: string;
}

export function Stars({ rating, size = 15, label }: StarsProps) {
  const filled = Math.max(0, Math.min(1, rating / 5));

  return (
    <span className="ow-stars" role="img" aria-label={label}>
      <StarRow color={colors.border.strong} size={size} />
      <span className="ow-stars-fill" style={{ width: `${(filled * 100).toFixed(2)}%` }}>
        <StarRow color={colors.copper.landing} size={size} />
      </span>
    </span>
  );
}
