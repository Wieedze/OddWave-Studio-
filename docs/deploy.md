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

## Version anglaise (`/en`)

Le site est bilingue depuis septembre 2026. Le français est servi depuis la
racine, l'anglais sous le préfixe `/en` : `vite-react-ssg` pré-génère donc
**16 fichiers HTML** au lieu de 8, chacun avec ses propres `title`,
`description`, `hreflang` et `<html lang>`.

**Piège à ne jamais réintroduire.** [`worker/index.ts`](../worker/index.ts)
redirigeait `/en/*` vers `/` en 301, héritage de l'ancien site bilingue. La
règle est maintenant filtrée par `APP_PATHS` : seules les URL `/en/…` qui ne
correspondent à aucune route réelle sont redirigées. Si quelqu'un remet une
redirection large sur `/en`, **tout le site anglais disparaît**, et un 301 se
met en cache durablement dans les navigateurs.

Nouvelle route ? Il faut la déclarer à **trois** endroits : `src/routes.tsx`
(elle est montée deux fois automatiquement), `APP_PATHS` dans
`worker/index.ts`, et `public/sitemap.xml` (deux entrées, FR et EN).

Le sélecteur FR/EN vit dans la nav flottante, dans le menu burger et dans le
pied de page. Il conserve la page courante : `/services` bascule vers
`/en/services`, jamais vers l'accueil.

## Avis Google (`GET /api/reviews`)

Le site affiche la note et les derniers avis de la fiche Google du studio.
[`worker/reviews.ts`](../worker/reviews.ts) appelle l'API **Places (New)** avec
la clé côté serveur, et le client passe par `ReviewsService` -> `/api/reviews`.
Aucune clé ne part dans le bundle public.

| Réglage | Valeur |
|---|---|
| Place ID | `ChIJfd3b6jmZyRIRoxDQN8GEMdw` (public, c'est l'id du lien d'avis) |
| Variable Worker | `GOOGLE_MAPS_API_KEY` (obligatoire) |
| Variable Worker | `GOOGLE_PLACE_ID` (facultative, écrase la constante) |
| Binding KV | `REVIEWS_KV` (facultatif, voir `wrangler.jsonc`) |

**Créer la clé** : Google Cloud Console -> APIs & Services -> Credentials ->
Create credentials -> API key. Activer **Places API (New)**. Restreindre la clé
à cette seule API (restriction "API restrictions"). Ne PAS mettre de
restriction par référent HTTP : l'appel part du Worker, pas du navigateur.
Poser ensuite la clé sur le Worker de prod (Settings -> Variables and Secrets),
en **secret**, et sur le Worker de dev si tu veux la tester là aussi.

**Quota** : le champ `reviews` relève du palier Enterprise, 1 000 appels
gratuits par mois. La route met la réponse en cache 12 h (cache edge, plus KV
si le binding existe), soit une poignée d'appels par jour. Sans cache ce serait
un appel par visiteur, donc le quota partirait en quelques jours.

**Limites de l'API, à connaître avant de promettre quoi que ce soit au client** :
cinq avis maximum, choisis par Google comme "les plus pertinents". Il n'existe
pas de tri "les plus récents" ni "les meilleurs" côté API. Le nom de l'auteur,
sa photo et le lien vers la fiche doivent rester affichés, et le contenu ne doit
pas être stocké durablement (d'où le cache court).

**Pas de balisage JSON-LD sur ces avis.** Google interdit le `AggregateRating`
auto-déclaré sur son propre `LocalBusiness` : les étoiles ne sortiraient pas
dans les résultats et c'est contraire à ses règles. Les étoiles en SERP viennent
de la fiche Google, pas du site.

**Vérifier** : `curl -s https://oddwavestudio.com/api/reviews | head -c 400`.
Sans clé la route répond `503 {"error":"not-configured"}` et le site masque
simplement le bandeau et la section.

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
