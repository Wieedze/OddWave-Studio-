// Compact trust line placed just above a CTA button: stars, the average, and
// the number of Google reviews, linking to the listing. It renders nothing
// until the live snapshot arrives (and nothing at all if the listing has no
// rating), so a page never shows an empty or "0 avis" state.

import { colors, typography } from '@/design-system/tokens';
import { formatRating } from '@/helpers';
import { useGoogleReviews, useText } from '@/hooks';
import { GOOGLE_PLACE_URL, REVIEWS } from '@/content/reviews';
import { Stars } from './Stars';
import './GoogleReviews.css';

export function ReviewBadge() {
  const reviews = useText(REVIEWS);
  const snapshot = useGoogleReviews();
  if (!snapshot) return null;

  return (
    <a
      className="ow-review-badge"
      href={GOOGLE_PLACE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: typography.font.mono,
        fontWeight: typography.weight.semibold,
        fontSize: '12px',
        lineHeight: 1,
        letterSpacing: '0.1em',
        color: colors.text.muted,
      }}
    >
      <Stars rating={snapshot.rating} label={reviews.ratingLabel(snapshot.rating)} />
      <span style={{ color: colors.text.primaryWarm }}>{formatRating(snapshot.rating)}</span>
      <span aria-hidden="true" style={{ opacity: 0.45 }}>·</span>
      <span>
        {snapshot.count} {reviews.badgeSuffix}
      </span>
    </a>
  );
}
