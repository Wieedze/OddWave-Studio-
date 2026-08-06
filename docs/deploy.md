# Deploy — Cloudflare Pages

The site is static (vite-react-ssg pre-renders every route to HTML in `dist/`).
Cloudflare Pages serves that directory on its CDN.

## One-time setup

**Connect the repo** (`Wieedze/OddWave-Studio-`) in Cloudflare Pages
(Workers & Pages → Create → Pages → Connect to Git). The build settings below
deploy the site to a `*.pages.dev` URL on every push to `main`.

## Build settings

| Field | Value |
|---|---|
| Framework preset | None |
| Build command | `bun run build` |
| Build output directory | `dist` |
| Root directory | `/` |

If the build image needs a Bun pin: set `BUN_VERSION` = `1.3.14` (or the version
in use) as a build environment variable.

vite-react-ssg emits a real HTML file per route (`/`, `/services/index.html`, …),
so deep links work without an SPA catch-all. No `_redirects` needed.

## Contact form → Cloudflare Email Service

Both forms (Contact + Accompagnement) POST to the Pages Function
`functions/api/contact.ts`, which sends the demande to the studio inbox through
the **Cloudflare Email Service** REST API. The recipient is always the studio's
own **verified destination address**, so sending is free on every plan and does
not count against any quota (arbitrary recipients would need Workers Paid).

Prerequisites: the domain must use **Cloudflare DNS**, and Email Sending must be
onboarded (dashboard → Email → onboard the domain; this adds SPF/DKIM/DMARC, and
MX if Email Routing is enabled). Add the studio inbox as a **verified
destination address** and confirm it via the verification email.

Set these as project variables (Settings → Variables and Secrets), **not**
`VITE_`-prefixed so they stay server-side, for **Production and Preview**:

| Name | Value |
|---|---|
| `CF_ACCOUNT_ID` | Cloudflare account id |
| `CF_EMAIL_TOKEN` | API token with the *Email Sending* permission (store as a **Secret**) |
| `CONTACT_FROM` | a sender on the onboarded domain, e.g. `noreply@oddwavestudio.com` |
| `CONTACT_TO` | the studio's verified destination address (where demandes land) |

Local dev note: plain `vite` does not run Pages Functions, so the form POST 404s
and `ContactService` treats it as a soft no-op (logs the payload). To exercise
the function locally, build then run `wrangler pages dev ./dist` with the same
variables in a `.dev.vars` file.

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
