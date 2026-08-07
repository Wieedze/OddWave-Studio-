// Cloudflare Worker entry — the Git-connected Workers (prod `oddwave-studio`,
// dev `oddwavestudio`) serve the static build in dist/ through the ASSETS
// binding (see wrangler.jsonc) and run this script for every request that does
// not match a static file. Today that is a single route: POST /api/contact.
//
// Compiled by wrangler (esbuild), not the app's tsc (tsconfig only includes
// src/), so it deliberately avoids @cloudflare/workers-types.

import { handleContactPost } from './contact';
import type { ContactEnv } from './contact';

interface Env extends ContactEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
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

    // Everything else falls through to the pre-rendered site (HTML, css, js,
    // media). Unknown paths get the asset layer's 404.
    return env.ASSETS.fetch(request);
  },
};
