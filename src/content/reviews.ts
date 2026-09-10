// Google reviews — the studio's listing, the copy around it, and the manual
// fallback shown when the API is unreachable.
//
// The Place ID is public (it is the id inside the review link the studio sends
// to its clients), so it belongs here rather than in an env var. The API key
// never reaches the client: the Worker holds it and answers /api/reviews.

import type { Localized } from '@/helpers';
import { Review } from '@/models';

export const GOOGLE_PLACE_ID = 'ChIJfd3b6jmZyRIRoxDQN8GEMdw';

/** The listing on Google Maps. */
export const GOOGLE_PLACE_URL = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`;

/** Deep link that opens the "write a review" dialog, to send to clients. */
export const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

export interface ReviewsCopy {
  /** Compact badge sitting above the CTA buttons. */
  readonly badgeSuffix: string;
  readonly sectionEyebrow: string;
  readonly sectionTitle: string;
  readonly seeAllLabel: string;
  readonly leaveLabel: string;
  /** Read by screen readers in place of the star row. */
  readonly ratingLabel: (rating: number) => string;
}

export const REVIEWS: Localized<ReviewsCopy> = {
  fr: {
    badgeSuffix: 'avis Google',
    sectionEyebrow: 'Ils en parlent',
    sectionTitle: 'Ce que disent les artistes.',
    seeAllLabel: 'Voir les avis sur Google →',
    leaveLabel: 'Laisser un avis →',
    ratingLabel: (rating) => `Note de ${rating.toFixed(1).replace('.', ',')} sur 5`,
  },
  en: {
    badgeSuffix: 'Google reviews',
    sectionEyebrow: 'What they say',
    sectionTitle: "In the artists' own words.",
    seeAllLabel: 'Read the reviews on Google →',
    leaveLabel: 'Leave a review →',
    ratingLabel: (rating) => `Rated ${rating.toFixed(1)} out of 5`,
  },
};

/** Shown only if /api/reviews cannot answer (no API key, network error, quota).
 *  Keep these verbatim from the real listing, or leave the array empty so the
 *  badge and the section simply do not render. */
export const FALLBACK_REVIEWS: readonly Review[] = [];
