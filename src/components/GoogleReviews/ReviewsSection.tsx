// "Ils en parlent" — the full reviews block: rating line plus up to three
// review cards, each crediting its author as Google's terms require (name,
// avatar when supplied, link back to the listing).
//
// Renders nothing when the listing has no rating and no manual fallback is
// configured, so the page simply closes up rather than showing an empty shell.
//
// No [data-reveal] here: MotionService queries that attribute once, when the
// page mounts, and this block only appears after the fetch resolves. The
// entrance is a CSS mount fade instead (see GoogleReviews.css).

import { MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { formatRating } from '@/helpers';
import { useGoogleReviews, useText } from '@/hooks';
import type { Review } from '@/models';
import { FALLBACK_REVIEWS, GOOGLE_PLACE_URL, REVIEWS } from '@/content/reviews';
import { Stars } from './Stars';
import './GoogleReviews.css';

/** Three cards read as a row and keep the section short; Google returns five. */
const MAX_CARDS = 3;

function Avatar({ review }: { review: Review }) {
  if (review.authorPhoto) {
    return <img className="ow-review-avatar" src={review.authorPhoto} alt="" loading="lazy" decoding="async" />;
  }
  return (
    <span
      className="ow-review-avatar ow-review-avatar--initial"
      aria-hidden="true"
      style={{ fontFamily: typography.font.display, fontWeight: typography.weight.bold }}
    >
      {review.initial}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const reviews = useText(REVIEWS);

  return (
    <article
      className="ow-review-card"
      style={{ background: colors.ink[700], border: `1px solid ${colors.border.hair}` }}
    >
      <header className="ow-review-head">
        <Avatar review={review} />
        <div style={{ minWidth: 0 }}>
          <div
            className="ow-review-author"
            style={{
              fontFamily: typography.font.body,
              fontWeight: typography.weight.semibold,
              color: colors.text.primaryWarm,
            }}
          >
            {review.author}
          </div>
          {review.publishedAt && (
            <MonoLabel as="div" size="11px" tracking="0.1em" color={colors.text.faint} style={{ marginTop: '5px', textTransform: 'none' }}>
              {review.publishedAt}
            </MonoLabel>
          )}
        </div>
      </header>

      <Stars rating={review.rating} size={13} label={reviews.ratingLabel(review.rating)} />

      <p
        className="ow-review-text"
        style={{
          fontFamily: typography.font.body,
          fontWeight: typography.weight.regular,
          color: colors.text.secondary,
        }}
      >
        {review.text}
      </p>
    </article>
  );
}

interface ReviewsSectionProps {
  /** Section background; pass the surface that alternates with its neighbour. */
  background?: string;
}

export function ReviewsSection({ background = colors.ink[900] }: ReviewsSectionProps) {
  const reviews = useText(REVIEWS);
  const snapshot = useGoogleReviews();
  const cards = (snapshot && snapshot.reviews.length > 0 ? snapshot.reviews : FALLBACK_REVIEWS).slice(0, MAX_CARDS);

  if (!snapshot && cards.length === 0) return null;

  return (
    <section className="ow-reviews" style={{ background, padding: 'clamp(56px,8vh,100px) 30px clamp(60px,9vh,110px)' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <MonoLabel as="div" size="12px" tracking="0.26em" color={colors.copper.warm}>
            {reviews.sectionEyebrow}
          </MonoLabel>
          <h2
            style={{
              margin: '14px 0 0',
              fontFamily: typography.font.display,
              fontWeight: typography.weight.bold,
              fontSize: 'clamp(28px,4vw,48px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: colors.text.primaryWarm,
              textWrap: 'balance',
            }}
          >
            {reviews.sectionTitle}
          </h2>

          {snapshot && (
            <div className="ow-review-summary">
              <Stars rating={snapshot.rating} size={17} label={reviews.ratingLabel(snapshot.rating)} />
              <span
                style={{
                  fontFamily: typography.font.mono,
                  fontWeight: typography.weight.semibold,
                  fontSize: '13px',
                  lineHeight: 1,
                  letterSpacing: '0.1em',
                  color: colors.text.muted,
                }}
              >
                <span style={{ color: colors.text.primaryWarm }}>{formatRating(snapshot.rating)}</span>
                <span aria-hidden="true" style={{ opacity: 0.45 }}> · </span>
                {snapshot.count} {reviews.badgeSuffix}
              </span>
            </div>
          )}
        </div>

        {cards.length > 0 && (
          <div className="ow-review-grid">
            {cards.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        <div style={{ marginTop: 'clamp(26px,3.4vh,38px)', textAlign: 'center' }}>
          <a className="ow-review-all" href={GOOGLE_PLACE_URL} target="_blank" rel="noopener noreferrer">
            {reviews.seeAllLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
