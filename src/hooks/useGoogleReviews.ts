// useGoogleReviews — client-side bridge to ReviewsService.
//
// The request is shared at module level, so the badge above a CTA and the
// reviews section on the same page cost one network call, not two, and moving
// between routes reuses the answer for the rest of the session.
//
// Nothing is fetched during pre-rendering: the snapshot starts null, so the
// static HTML ships without reviews. That is also what Google's terms want,
// since review content may not be warehoused.

import { useEffect, useState } from 'react';
import type { ReviewsSnapshot } from '@/models';
import { reviewsService } from '@/services';

/** In-flight or settled request, shared by every consumer. */
let shared: Promise<ReviewsSnapshot | null> | null = null;

export function useGoogleReviews(): ReviewsSnapshot | null {
  const [snapshot, setSnapshot] = useState<ReviewsSnapshot | null>(null);

  useEffect(() => {
    let alive = true;
    shared ??= reviewsService.load();
    void shared.then((result) => {
      if (alive) setSnapshot(result);
    });
    return () => {
      alive = false;
    };
  }, []);

  return snapshot;
}
