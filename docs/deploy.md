# Deploy — Cloudflare Workers (Git-connected)

The site is static (vite-react-ssg pre-renders every route to HTML in `dist/`).
Two Git-connected Workers build the repo `Wieedze/OddWave-Studio-` on every
push to `main`:

| Worker | Role | Serves | Deploy command (Settings → Build) |
|---|---|---|---|
| `oddwave-studio` | prod | `oddwavestudio.com` | `npx wrangler deploy` |
| `oddwavestudio` | dev | `oddwavestudio.maxime-moodz.workers.dev` | `npx wrangler deploy --env dev` |

Build command for both: `bun run build`, root `/`. If the build image needs a
Bun pin: set `BUN_VERSION` as a build environment variable.

[`wrangler.jsonc`](../wrangler.jsonc) drives the deploy: static assets from
`./dist` (binding `ASSETS`) plus [`worker/index.ts`](../worker/index.ts), which
handles `POST /api/contact` and lets every other request fall through to the
pre-rendered files. The dashboard deploy commands must stay plain (no
`--assets` / `--name` flags) or the config file is bypassed.

History note: the site first shipped as assets-only Workers while the mailer
was written as a Pages Function (`functions/api/contact.ts`). Workers ignore
`functions/`, so `/api/contact` answered 405 in prod. The handler moved to
`worker/contact.ts`, mounted by `worker/index.ts` (2026-08-07).

vite-react-ssg emits a real HTML file per route (`/`, `/services/index.html`, …),
so deep links work without an SPA catch-all.

## Custom domains

`oddwavestudio.com` is attached to the prod Worker (Settings → Domains &
Routes). Add `www.oddwavestudio.com` there too — it currently resolves to
nothing.

## Contact form → Cloudflare Email Service

Both forms (Contact + Accompagnement) POST to `/api/contact`
([`worker/contact.ts`](../worker/contact.ts)), which sends **two** emails
through the Email Service **Workers binding** (`env.EMAIL`, declared as
`send_email` in `wrangler.jsonc` — no API token involved):

1. the demande, to the studio inbox (`CONTACT_TO`);
2. a branded confirmation, back to the visitor. Arbitrary recipients require
   the **Workers Paid** plan (active since 2026-08-07; the free tier only
   writes to verified destination addresses).

Prerequisites: the domain must use **Cloudflare DNS** (done 2026-08-07), and
Email Sending must be onboarded: Compute → Email Service → **Email Sending** →
onboard `oddwavestudio.com` and approve the MX/SPF/DKIM/DMARC records.

Set these on the prod Worker (Settings → Variables and Secrets) — and on the
dev Worker too if the form should really send from dev:

| Name | Value |
|---|---|
| `CONTACT_FROM` | a sender on the onboarded domain, e.g. `noreply@oddwavestudio.com` (no mailbox needed) |
| `CONTACT_TO` | the studio inbox (where demandes land) |

`keep_vars` is set in `wrangler.jsonc` so dashboard variables survive wrangler
deploys.

**Verify a deploy:** `bun scripts/check-contact-prod.mjs` probes `/api/contact`
without sending anything. `bun scripts/check-contact-prod.mjs --send` does a
real end-to-end run (demande + confirmation); pass a URL and/or a visitor
address to vary the target, e.g.
`bun scripts/check-contact-prod.mjs https://oddwavestudio.maxime-moodz.workers.dev you@example.com --send`.

Local dev note: plain `vite` does not serve `/api/contact`, so the form POST
404s and `ContactService` treats it as a soft no-op (logs the payload). To
exercise the route locally: `bun run build`, then `npx wrangler dev` — the
binding is `remote: true`, so local dev sends REAL emails through the service
(set `CONTACT_FROM`/`CONTACT_TO` in a `.dev.vars` file).

## Videos (IPFS)

The Sound Design videos are **not** in git (too large for GitHub). Host them on
IPFS (pin via Pinata / web3.storage / Filebase) and replace the `src` paths in
`src/content/soundDesign.ts` with the gateway URLs (prefer a dedicated gateway
for smooth playback). `sd-irradiation` / `sd-seabeast` are the two real clips;
the rest are placeholder tiles.

## Local commands (run by the user — assistant has no bun/git rights)

```bash
bun install
bun run dev         # local dev
bun run typecheck   # tsc --noEmit
bun run build       # produces dist/ (what Cloudflare builds)
bun run preview     # serve the built dist/ locally
```
