// GET /api/reviews — the studio's Google listing (average, total, and up to the
// five reviews the API exposes), read from the Places API (New).
//
// Why a Worker route rather than a client fetch: the Google key must never ship
// in the public bundle. It lives in the Worker env.
//
// Two caches, because reviews sit in the Places Enterprise SKU (1000 free calls
// a month) and one upstream call per visitor would burn through that:
//   1. the edge cache (`caches.default`), which needs no setup and holds the
//      answer for 12h per colo via s-maxage;
//   2. KV when bound, which is global and also lets an API outage fall back to
//      the last good answer instead of blanking the section.
// With the edge cache alone the endpoint costs a couple of calls a day.
//
// Google's terms forbid warehousing review content, hence the short freshness
// window. The longer KV expiry only exists to serve the last known answer if
// the API is briefly unreachable, rather than blanking the section.
//
// Compiled by wrangler (esbuild), not the app's tsc, so it deliberately avoids
// @cloudflare/workers-types and declares the shapes it needs.

/** `caches.default` is Workers-only; lib.DOM's CacheStorage has no `default`. */
interface EdgeCache {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
}

interface KVLike {
  get(key: string, type: 'text'): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface ReviewsEnv {
  /** Google Maps Platform key, restricted to Places API (New). */
  GOOGLE_MAPS_API_KEY?: string;
  /** Overrides the studio's listing; defaults to the constant below. */
  GOOGLE_PLACE_ID?: string;
  /** Optional cache. Without it every request hits Google. */
  REVIEWS_KV?: KVLike;
}

/** OddWave Studio's Google listing. Public: it is the id inside the review link. */
const DEFAULT_PLACE_ID = 'ChIJfd3b6jmZyRIRoxDQN8GEMdw';

const CACHE_KEY = 'google-reviews:v1';
/** Answer considered fresh for 12h → about 60 upstream calls a month. */
const FRESH_FOR_MS = 12 * 60 * 60 * 1000;
/** Kept for a week so an API outage falls back to the last good answer. */
const KV_TTL_SECONDS = 7 * 24 * 60 * 60;

const FIELD_MASK = 'rating,userRatingCount,reviews';

interface GoogleReview {
  name?: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
}
interface GooglePlace {
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
}

interface Payload {
  rating: number;
  count: number;
  reviews: {
    id: string;
    author: string;
    rating: number;
    text: string;
    publishedAt: string;
    authorPhoto?: string;
    authorUrl?: string;
  }[];
}
interface CacheEntry {
  fetchedAt: number;
  payload: Payload;
}

/** `maxAge` is what a browser keeps; `sharedMaxAge` is what the edge keeps. */
function json(body: unknown, status: number, maxAge: number, sharedMaxAge = 0): Response {
  const control = sharedMaxAge > 0 ? `public, max-age=${maxAge}, s-maxage=${sharedMaxAge}` : `public, max-age=${maxAge}`;
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': control },
  });
}

function toPayload(place: GooglePlace): Payload {
  const reviews = (place.reviews ?? [])
    .map((review, i) => {
      const author = review.authorAttribution?.displayName?.trim() ?? '';
      const text = (review.text?.text ?? review.originalText?.text ?? '').trim();
      return {
        id: review.name ?? `review-${i}`,
        author,
        rating: typeof review.rating === 'number' ? review.rating : 0,
        text,
        publishedAt: review.relativePublishTimeDescription ?? '',
        authorPhoto: review.authorAttribution?.photoUri,
        authorUrl: review.authorAttribution?.uri,
      };
    })
    // Google's attribution rules mean a review with no author cannot be shown,
    // and a rating with no text has nothing to display in a card.
    .filter((review) => review.author !== '' && review.text !== '');

  return {
    rating: typeof place.rating === 'number' ? place.rating : 0,
    count: typeof place.userRatingCount === 'number' ? place.userRatingCount : 0,
    reviews,
  };
}

async function readCache(kv: KVLike | undefined): Promise<CacheEntry | null> {
  if (!kv) return null;
  try {
    const raw = await kv.get(CACHE_KEY, 'text');
    return raw ? (JSON.parse(raw) as CacheEntry) : null;
  } catch {
    return null;
  }
}

export async function handleReviewsGet({ request, env }: { request: Request; env: ReviewsEnv }): Promise<Response> {
  const key = env.GOOGLE_MAPS_API_KEY;
  if (!key) return json({ error: 'not-configured' }, 503, 0);

  // 1. Edge cache. Keyed on the bare path so query strings cannot multiply it.
  const edge = (caches as unknown as { default: EdgeCache }).default;
  const cacheKey = new Request(new URL('/api/reviews', request.url).toString(), { method: 'GET' });
  const edgeHit = await edge.match(cacheKey);
  if (edgeHit) return edgeHit;

  // 2. KV, when bound.
  const cached = await readCache(env.REVIEWS_KV);
  if (cached && Date.now() - cached.fetchedAt < FRESH_FOR_MS) {
    const fresh = json(cached.payload, 200, 600, FRESH_FOR_MS / 1000);
    await edge.put(cacheKey, fresh.clone());
    return fresh;
  }

  const placeId = env.GOOGLE_PLACE_ID ?? DEFAULT_PLACE_ID;
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=fr&regionCode=FR`;

  try {
    const upstream = await fetch(url, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': FIELD_MASK },
    });
    if (!upstream.ok) throw new Error(`places-${upstream.status}`);

    const payload = toPayload((await upstream.json()) as GooglePlace);
    if (env.REVIEWS_KV) {
      const entry: CacheEntry = { fetchedAt: Date.now(), payload };
      await env.REVIEWS_KV.put(CACHE_KEY, JSON.stringify(entry), { expirationTtl: KV_TTL_SECONDS });
    }
    const response = json(payload, 200, 600, FRESH_FOR_MS / 1000);
    await edge.put(cacheKey, response.clone());
    return response;
  } catch (err) {
    // Serve the last good answer rather than emptying the page.
    if (cached) return json(cached.payload, 200, 120);
    return json({ error: err instanceof Error ? err.message : 'upstream-error' }, 502, 0);
  }
}
