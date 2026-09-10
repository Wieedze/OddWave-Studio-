// Cloudflare Worker entry — the Git-connected Workers (prod `oddwave-studio`,
// dev `oddwavestudio`) serve the static build in dist/ through the ASSETS
// binding (see wrangler.jsonc) and run this script for every request that does
// not match a static file. Two routes live here: POST /api/contact and
// GET /api/reviews.
//
// Compiled by wrangler (esbuild), not the app's tsc (tsconfig only includes
// src/), so it deliberately avoids @cloudflare/workers-types.

import { handleContactPost } from './contact';
import type { ContactEnv } from './contact';
import { handleReviewsGet } from './reviews';
import type { ReviewsEnv } from './reviews';

interface Env extends ContactEnv, ReviewsEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

/** Odoo-era paths (the old site, indexed for 15 years): send old backlinks
 *  and stale search entries to their closest new page instead of a 404. */
const LEGACY_REDIRECTS: Record<string, string> = {
  '/contactus': '/contact',
  '/fr/contactus': '/contact',
  '/en/contactus': '/en/contact',
  '/lestudio': '/equipment',
  '/fr/lestudio': '/equipment',
  '/en/lestudio': '/en/equipment',
};

/** The site's own routes, without their locale prefix. Since the English
 *  version shipped (September 2026) "/en" is a real tree with pre-rendered
 *  files, NOT a stale path from the old site: these must never be redirected.
 *  Forgetting this makes the whole English site 301 to the French home, and
 *  browsers cache that permanently. */
const APP_PATHS: ReadonlySet<string> = new Set([
  '/',
  '/services',
  '/equipment',
  '/guidance',
  '/sound-design',
  '/portfolio',
  '/exports',
  '/contact',
]);

function legacyTarget(pathname: string): string | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const mapped = LEGACY_REDIRECTS[clean];
  if (mapped) return mapped;

  // The old French tree was never rebuilt: everything under it is stale.
  if (clean === '/fr' || clean.startsWith('/fr/')) return '/';

  // Under /en, anything that is not a real route is a stale old-site URL. Send
  // it to the English home rather than dropping the visitor into French.
  if (clean.startsWith('/en/') && !APP_PATHS.has(clean.slice(3) || '/')) return '/en';

  return null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      if (request.method === 'POST') return handleContactPost({ request, env });
      return new Response(JSON.stringify({ success: false, error: 'method-not-allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', Allow: 'POST' },
      });
    }

    if (url.pathname === '/api/reviews') {
      if (request.method === 'GET') return handleReviewsGet({ request, env });
      return new Response(JSON.stringify({ error: 'method-not-allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', Allow: 'GET' },
      });
    }

    const legacy = legacyTarget(url.pathname);
    if (legacy) return Response.redirect(`${url.origin}${legacy}`, 301);

    // Everything else falls through to the pre-rendered site (HTML, css, js,
    // media). Unknown paths get the asset layer's 404.
    return env.ASSETS.fetch(request);
  },
};
