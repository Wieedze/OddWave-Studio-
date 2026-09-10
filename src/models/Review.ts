// A Google review as displayed on the site. Google's terms require showing the
// author's name (and photo when supplied) and linking back to the review, so
// those fields travel with the text rather than being optional decoration.

export class Review {
  constructor(
    /** Stable id from the API, or a slug for a hand-written fallback entry. */
    readonly id: string,
    readonly author: string,
    /** 1 to 5. */
    readonly rating: number,
    readonly text: string,
    /** Relative date, phrased by Google, e.g. "il y a 2 mois". */
    readonly publishedAt: string,
    /** Author avatar served by Google. */
    readonly authorPhoto?: string,
    /** Link to the author's Google profile / the review itself. */
    readonly authorUrl?: string,
  ) {}

  /** First letter of the author's name, for the fallback avatar disc. */
  get initial(): string {
    return this.author.trim().charAt(0).toUpperCase() || '?';
  }
}

/** What the studio's Google listing currently says. */
export interface ReviewsSnapshot {
  /** Average rating, e.g. 4.9. */
  readonly rating: number;
  /** Total number of ratings on the listing. */
  readonly count: number;
  /** Up to five reviews (the maximum the Places API returns). */
  readonly reviews: readonly Review[];
}
