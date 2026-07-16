# Deploy — Cloudflare Pages

The site is static (vite-react-ssg pre-renders every route to HTML in `dist/`).
Cloudflare Pages serves that directory on its CDN.

## One-time setup

1. **Web3Forms key** (contact + guidance forms → pro inbox):
   - Create a key at <https://web3forms.com> tied to the pro email.
   - Put it in `.env.local` for dev: `VITE_WEB3FORMS_KEY=...`
   - Add it in Cloudflare Pages → project → Settings → Environment variables
     (for **Production** and **Preview**), same name `VITE_WEB3FORMS_KEY`.

2. **Connect the repo** (`Wieedze/OddWave-Studio-`) in Cloudflare Pages
   (Workers & Pages → Create → Pages → Connect to Git).

## Build settings

| Field | Value |
|---|---|
| Framework preset | None |
| Build command | `bun run build` |
| Build output directory | `dist` |
| Root directory | `/` |

Environment variables for the build:

- `VITE_WEB3FORMS_KEY` = the Web3Forms key.
- If the build image needs a Bun pin: `BUN_VERSION` = `1.3.14` (or the version in use).

vite-react-ssg emits a real HTML file per route (`/`, `/services/index.html`, …),
so deep links work without an SPA catch-all. No `_redirects` needed.

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
