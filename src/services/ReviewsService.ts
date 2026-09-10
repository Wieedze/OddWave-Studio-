// ReviewsService — reads the studio's Google listing through the same-origin
// `/api/reviews` route (worker/reviews.ts), which holds the Google API key and
// caches the answer in KV. Nothing sensitive ships in the client bundle.
//
// Every failure path returns null on purpose: plain `vite` dev serves no
// /api route, the key may be missing, the quota may be spent. The UI treats
// null as "show nothing" rather than surfacing an error to a visitor.

import { Review, type ReviewsSnapshot } from '@/models';

/** Shape returned by worker/reviews.ts. */
interface ApiReview {
  id?: string;
  author?: string;
  rating?: number;
  text?: string;
  publishedAt?: string;
  authorPhoto?: string;
  authorUrl?: string;
}
interface ApiResponse {
  rating?: number;
  count?: number;
  reviews?: readonly ApiReview[];
}

const REVIEWS_ENDPOINT = '/api/reviews';

export class ReviewsService {
  constructor(private readonly endpoint: string = REVIEWS_ENDPOINT) {}

  async load(signal?: AbortSignal): Promise<ReviewsSnapshot | null> {
    try {
      const res = await fetch(this.endpoint, { headers: { Accept: 'application/json' }, signal });
      if (!res.ok) return null;
      return ReviewsService.toSnapshot((await res.json()) as ApiResponse);
    } catch {
      return null;
    }
  }

  /** Maps the API payload onto models, dropping anything unusable. */
  static toSnapshot(data: ApiResponse | null): ReviewsSnapshot | null {
    if (!data || typeof data.rating !== 'number' || typeof data.count !== 'number') return null;
    // A listing with no rating yet has nothing to show, and a "0 avis" badge
    // reads worse than no badge at all.
    if (data.count < 1) return null;

    const reviews = (data.reviews ?? [])
      .filter((r): r is ApiReview & { author: string; text: string } => Boolean(r.author && r.text))
      .map(
        (r, i) =>
          new Review(
            r.id ?? `review-${i}`,
            r.author,
            typeof r.rating === 'number' ? r.rating : data.rating ?? 5,
            r.text,
            r.publishedAt ?? '',
            r.authorPhoto,
            r.authorUrl,
          ),
      );

    return { rating: data.rating, count: data.count, reviews };
  }
}

/** Shared singleton instance. */
export const reviewsService = new ReviewsService();
