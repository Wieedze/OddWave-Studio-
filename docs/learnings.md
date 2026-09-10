# Learnings

Running log of decisions, deviations, and gotchas. Append newest at the top.
Each entry: date · topic · what we learned / decided · why.

---

## 2026-06-26 · Initial decisions

- **Stack diverges from the original handoff (Astro).** The user wants Vite + Bun
  + hooks + components, so we use **React 18 + Vite + Bun**, static pre-render via
  **vite-react-ssg**, single app with an internal `design-system/` module
  (extractable to a package later). Motion (GSAP) + 3D (Three.js) stay client-only.
- **Permissions:** the assistant cannot run `git` or `bun` (no rights). The user
  runs `bun install`, `bun run dev`, and all git. Code is written; commands are
  handed off.
- **Handoff reorganized:** original references moved to `design-handoff/`
  (read-only, not shipped). The big logo SVG path was extracted from
  `logo-path.js` into `src/helpers/logoPath.ts` (`OW_LOGO_PATH`, ~58k chars).
- **Two copper values exist** in the source: `#C24E37` (landing accent +
  selection) and `#AC3F20` (design-system brand copper). Kept both as tokens;
  use the landing value on landing-era surfaces, the system value where the
  system page specifies it. Flagged for a future consolidation decision.
- **Page names anglicized:** Accueil→Home, Le Studio→Studio, Le Matériel→
  Equipment, Accompagnement→Guidance, Sound Design→SoundDesign, Portfolio,
  Contact. Routes kebab-case (`/equipment`, `/sound-design`, `/guidance`).
- **Governance added:** `CLAUDE.md`, `docs/` knowledge base, `docs/rules.md`, a
  design-fidelity reviewer agent (`.claude/agents/`), and a `/verify-design`
  skill. Run the reviewer after each visual unit.

## 2026-06-26 · Design-fidelity review round 1 (Nav + Home)

Ran the design-fidelity-reviewer on the Nav and HomePage. Decisions taken:

- **Nav center is logo-only.** The `.ow-word` "ODDWAVE" reveal exists in the
  design-system reference nav, but the **canonical landing markup centers the
  monogram alone**. We follow the landing (logo only). Not a defect.
- **Removed the invented Contact "primary" chip** in the nav. The landing nav
  renders every link as a plain `.ow-link`; the copper pill was only in the
  design-system page. Dropped `primary` on the Contact link and the
  `.ow-link--primary` CSS.
- **Added the slow `is-open` intro transition** (`1.15s`) to `.ow-nav.is-open
  .ow-nav-side`, distinct from the `0.8s` hover transition, per the landing CSS.
- **New tokens:** `text.surfaceBright = #F8F6F2` (prestation card `h3`) and
  `border.hairMid = rgba(255,255,255,.07)` (contact section top rule). Replaced
  the matching raw literals.
- **Logo default `strokeWidth` 16 → 20** to match the site pages (the landing
  `logoSvg()` uses 20; 16 was the design-system page value).
- **Landing CTA button padding `17px 34px`** applied via style override (the
  base primary button keeps the `14px 26px` flat-family default).
- **CTA target:** the landing anchors to `#contact-form`, which does not exist on
  the home page (the form lives on `/contact`). We route to `/contact` instead.
- **Added `data-svc-img` / `data-svc-text`** to the prestation grid children and
  a `HomePage.css` with the `@media(max-width:860px)` overrides (single column,
  image first, hero `clamp(56px,19vw,340px)`) ported from the landing.

## 2026-06-26 · Accompagnement (Guidance) page built

- Recreated `/guidance` to the letter from the handoff: full-bleed parallax hero,
  intro méthode, **4 phase cards** with the giant ghost number
  (`clamp(340px,40vw,440px)`, `rgba(194,78,55,.12)`, same visual size on all four),
  dash-bulleted lists, the **clickable formules table** (row click pre-fills the
  form + smooth-scrolls to `#demande`), and the **request form** with chips, fields
  and the `sent` confirmation naming the chosen formule.
- State lifted to the page (`formule`, `sent`); `GuidanceForm` owns the inputs and
  submits through `ContactService` (TODO backend). `Formula` model reshaped to
  `(id, name, description, format)` to match the handoff columns.
- CSS co-located in `Guidance/GuidancePage.css` (classes + the `@media 860`
  overrides: phase titles wrap, ghost number shrinks, `.c-go` hidden, form grid
  to one column).
- Raw hexes kept where no token matches: intro paragraph `#D6D2CA`, phase list
  `#E2DED6` (the latter lives in the `.css` structural layer, which is allowed).
- The automated design-fidelity review was interrupted by a session limit; a
  manual pass confirmed verbatim copy (no em/en dashes in visible text; curly ’
  vs straight ' preserved), tokens over literals, and reduced-motion via
  `usePageMotion`. Re-run the reviewer agent on `/guidance` when convenient.

## 2026-06-26 · Contact page + shared form CSS

- Built `/contact` from the handoff: hero with **bottom-left** title ("Parlons de
  votre son.", `session.jpg`, parallax), a `1.25fr .75fr` grid — left the request
  form (Nom/Email, "besoin" chips defaulting to Mastering, Projet) wired to
  `ContactService` with the "Message envoyé." confirmation; right the **direct
  channels** (email mailto, Instagram external, studio non-clickable) with the
  hover arrow/border treatment, divider, and the 48h note.
- **Shared form controls extracted** to `design-system/primitives/forms.css`
  (`.ow-field`, `.ow-chip-radio`, `.ow-submit`), imported once in `RootLayout`.
  Removed the duplicated blocks from `GuidancePage.css`. Form fields/chips are a
  design-system concern, so a single shared stylesheet (not a per-page copy).
- Assets are in `public/assets/` now (client dropped them). Real Sound Design
  videos `sd-irradiation.mp4` / `sd-seabeast.mp4` are present; the rest of the
  showreel videos are still pending.

## 2026-06-26 · Video hosting decision — IPFS

- Videos are too large for git (one is 151MB > GitHub's 100MB limit; ~395MB
  total). Decision: **host videos on IPFS** (pin via Pinata / web3.storage /
  Filebase / Fleek) and reference gateway URLs. Caveat: public gateways can be
  slow/unreliable for video streaming — use a **dedicated gateway** for playback.
- Implementation plan: when building Sound Design, put the video sources in a
  configurable content map (CID / gateway URL per entry) so switching IPFS ↔ CDN
  is a one-value change. Videos stay gitignored; images are committed.

## 2026-06-26 · Le Studio page built

- Built `/studio` from the handoff: centered hero (`studio-hero-ssl.jpg`), the
  Théo Grozdanic bio split (`.92fr 1.08fr`, portrait + role + 2 paragraphs with
  the `#E7C9AF` highlights on "OddWave"/"Earthworm"), the residence split
  (`1.08fr .92fr`, reversed), a **parallax pedagogy band** (`session.jpg`,
  `data-parallax="0.14"` with a horizontal mask gradient), and the CTA to
  `/#contact`.
- Split layout uses `data-split` / `data-split-media` / `data-split-text`; the
  `@media 860` overrides (stack, media first) live in `Studio/StudioPage.css`.
- Bio paragraph 1 is rendered in-page (inline `<span>` highlights); the rest of
  the copy is in `content/studio.ts`.

## 2026-06-26 · Le Matériel page built

- Built `/equipment`: hero (`rack-elysia.jpg`), **featured pieces** grid
  (`1.3fr .7fr`, one tall image + two stacked, captioned), the **full inventory**
  (`data-cats` two columns) driven by `content/equipment.ts` — 7 categories of
  `GearItem { name, tag, href? }` rendered as `.ow-gear` rows (external product
  links open in a new tab; link-less items render as plain text), the detail
  close-ups (`ssl-elysia-knobs.jpg` uses `contain`), and the CTA to `/#contact`.
- `.ow-gear` styles + the `@media 860` grid collapses (`data-phares`, `data-cats`)
  live in `Equipment/EquipmentPage.css`.

## 2026-06-26 · Sound Design page + VideoModal

- Built `/sound-design`: **cinematic hero video** (`sd-irradiation.mp4`, muted
  autoplay loop, `.ow-hero-vid` clip-path open via the global `owCinema`
  keyframe, `data-parallax="0.18"`), a **sound toggle** (imperative `video.muted`),
  and the title revealed once playback passes `HERO_REVEAL_AT` (9s) with a
  fallback timeout — reduced motion reveals immediately and disables the open.
- **Réalisations grid** (`data-grid`, 3 cols) of `VideoEntry` cards. The handoff's
  filter chips and featured index 0 are not in the shipped layout, so they were
  omitted (fidelity to the actual page).
- **VideoModal** (reusable, `components/VideoModal/`): real `<video controls
  autoplay playsinline>` when the entry has a `src`, otherwise poster + simulated
  play/progress; closes on backdrop / × / Escape. Equalizer bars keyframe co-located.
- Video sources live in `content/soundDesign.ts` (the swap point): only
  `sd-irradiation.mp4` / `sd-seabeast.mp4` have a `src` (real, local, gitignored);
  the rest are placeholder tiles. Replace `src` with IPFS gateway URLs later.

## 2026-06-26 · Portfolio page — cover wall (synth out of scope)

- The shipped `Portfolio OddWave.dc.html` markup embedded the standalone
  **Portfolio Synth** experiment, but the file also carries the **cover data**
  (12 albums) and the `.ow-cover` CSS of a discography wall. Per the documented
  intent (a cover wall) and the data present, built `/portfolio` as the **cover
  wall**: a **fixed FloatingLines** backdrop, a full-height title, the 12-cover
  grid scrolling over it (hover reveals meta + tag), and the CTA to `/contact`.
- The Portfolio Synth remains **out of scope** (a separate interactive experiment,
  no nav/footer by design). Offer to port it as an isolated component later.
- Covers are placeholder gradient art; replace with the real cover images when
  the client supplies them. Click-to-listen is noted but not wired (no audio yet).
- **All 7 pages are now built.** The scaffolding components `PageHero` /
  `PagePlaceholder` are no longer used and were removed.

## 2026-06-26 · Portfolio Synth — the interactive rack player (now in scope)

- The user wanted the **Portfolio Synth** (the skeuomorphic rack "lecteur stylé"),
  so it is now built and embedded in `/portfolio` (replacing the static cover wall,
  matching the original markup: fixed FloatingLines → title → rack → CTA).
- Ported from `design-handoff/Portfolio Synth.dc.html`:
  - **`AudioSynthService`** (service): a live **Web Audio** engine — clicking a
    cover synthesizes a looping track (sustained 3-voice pad + a seeded step
    sequencer of kick/hat/snare/pluck), routed through a master gain and stereo
    analysers. No audio files; titles seed the music. Exposes `toggle`, `setGain`,
    `readLevels`, `getElapsed`, `dispose`.
  - **`PortfolioSynth`** (component): the rack faceplate (wood ears, GAIN/TONE
    knobs, PWR LED, channel filters, readout, screen cover grid, **VU meters**,
    timeline, jacks). A `requestAnimationFrame` loop drives the VU needle
    ballistics (idle motion when stopped) and the timeline via refs; the draggable
    GAIN knob updates the engine.
  - Covers + filters in `content/portfolioSynth.ts`; the old static `COVERS` /
    `Cover` and `PortfolioPage.css` were removed.
- AudioContext is created on first play (user gesture), so SSG/no-JS render the
  rack statically without audio.

## 2026-06-26 · Page transitions + form backend + deploy target

- **Slow page transitions**: navigation felt too abrupt. Added a `PageTransition`
  (layout) that keys the routed page on pathname and fades it in over 1s with the
  brand reveal easing (`cubic-bezier(.16,1,.3,1)`), honoring reduced motion.
  **Opacity only** — a transform/filter on the wrapper would break the Portfolio's
  `position:fixed` FloatingLines backdrop. The fade passes through the charcoal
  body (a cinematic "dip").
- **Contact + Guidance forms → pro inbox via Web3Forms** (no backend). `ContactService`
  POSTs to `api.web3forms.com/submit` with `access_key` from `VITE_WEB3FORMS_KEY`
  (env, not hardcoded). Returns `{ ok, error }`; forms show an inline error and
  re-enable on failure. Without the key, the form still confirms but logs a warning
  (dev-friendly). `.env.example` documents the var.
- **Hosting = Cloudflare Pages**. `docs/deploy.md` has the build settings
  (`bun run build` → `dist/`), env vars, and the IPFS note for videos. SSG emits a
  real HTML file per route, so no SPA catch-all is needed.

## 2026-06-26 · Real reels added + IPFS pinning

- Added the client's 4 real re-sound-design reels to the Sound Design grid (now
  lead the gallery): **Showreel**, **Unreal**, **Love, Death & Robots**,
  **The Witcher S3 E6** — plus the existing Irradiation / Sea Beast. Titles are
  from the filenames; **cat / dur / note are derived and editable**.
- **`VIDEO_SRC`** in `content/soundDesign.ts` is the single hosting swap point.
  Today the reels point to **local** `/assets` paths (dev/Safari only). After
  pinning, replace each value with the IPFS gateway URL.
- **`scripts/pin-to-pinata.sh`** pins the 6 videos to Pinata (JWT or API key+secret
  from env — the user runs it so the secret stays out of the repo) and prints a
  `filename → CID` map. Then we wire the gateway URLs into `VIDEO_SRC`.
- **Format caveat (still open):** the 4 reels are `.mov` — Chrome/Firefox don't
  play `.mov` reliably in `<video>`. They should be re-exported to `.mp4`
  (H.264/AAC) before pinning, otherwise playback is Safari-only. No ffmpeg in this
  env, so conversion is on the user.

## 2026-06-26 · Videos pinned to IPFS + mocks removed

- All 6 reels **pinned to Pinata** (CIDv1). The Sound Design grid now contains
  **only real, playable videos** — the 9 mock/placeholder tiles were removed.
- `VIDEO_SRC` builds gateway URLs from CIDs via `ipfs(cid)`:
  `${VITE_IPFS_GATEWAY ?? https://gateway.pinata.cloud}/ipfs/${cid}` plus
  `?pinataGatewayToken=${VITE_IPFS_GATEWAY_TOKEN}` when a dedicated-gateway token
  is set. Verified the public gateway serves with **HTTP 206 / range requests**
  (video seeking works).
- **Secret handling:** the pinning **JWT lives in `.env.local` (gitignored)**, the
  pin script reads it from env (no secret in the tracked file). `VITE_*` vars are
  public — only a *gateway* token may go there, never the pinning JWT. The pin
  script's `-F file=@"…"` quoting fixes filenames with commas (Love, Death & Robots).
- **Still open:** the 4 `.mov` reels only decode in Safari; re-export to `.mp4`
  (H.264/AAC) and re-pin for Chrome/Firefox. CID map is in git history / Pinata.

## 2026-06-26 · .mov reels transcoded to .mp4 + real video thumbnails

- The 4 `.mov` reels never loaded in Chrome/Firefox (QuickTime container). Fixed:
  installed ffmpeg and **transcoded them to web `.mp4`** (H.264 high/yuv420p, AAC,
  `-movflags +faststart`). Much smaller too (385MB → ~107MB). Re-pinned the 4
  `.mp4` to Pinata; `VIDEO_SRC` now points at the new CIDs.
- **Real thumbnails:** extracted a representative frame per reel with ffmpeg's
  `thumbnail` filter → `public/assets/<id>-poster.jpg` (committed, small). The grid
  no longer uses substitute studio photos as posters. Irradiation / Sea Beast keep
  their existing real-frame posters.
- Corrected durations from ffprobe: showreel 1:01, witcher 0:46, unreal 2:04,
  love-death-robots 1:11.
- The old `.mov` files + their old CIDs are superseded; the originals stay local
  (gitignored) and the old pins can be removed from the Pinata dashboard to free
  quota. ffmpeg recipe (transcode + `thumbnail`) is the repeatable path for future
  reels.

## 2026-06-26 · Portfolio rack → Spotify embeds (rights-clean)

- Hosting masters/tracks ourselves = copyright issue (the studio mixes/masters but
  doesn't own the recordings). Decision: **official Spotify embeds**. Public track +
  embed iframe = sanctioned, free, nothing hosted. Audio always streams from Spotify.
- Kept the **rack chassis** as the frame: real release covers on the "screen",
  **click → `SpotifyEmbedModal`** (open.spotify.com/embed/track/<id>). VU meters keep
  ambient idle motion; GAIN knob is decorative; timeline is static. The generative
  audio engine (`AudioSynthService`) was **removed** (no longer needed).
- `SynthCover` gains `image?` (real cover art under /assets/covers/) and `spotify?`
  (track URL or id). To go live: drop the cover images + paste the Spotify links per
  release. Covers without a `spotify` simply don't open.

## 2026-07-11 · Portfolio hero glued to the synth (handoff deviation)

- User-requested deviation from the handoff: the Portfolio title section is no
  longer `height:100vh` with centered text (that left ~half a viewport of dead
  space above the rack). It is now content-height with
  `padding: clamp(140px,22vh,220px) 24px 0`; the synth section keeps its
  `clamp(20px,4vh,40px)` top padding as the only gap, so the player sits right
  under the hero text.

## 2026-07-11 · Portfolio synth revealed after the hero intro

- `MotionService` gained an opt-in `onHeroIntroComplete` callback (fires once,
  ~0.65s after the eyebrow tween starts, when its ease-out has visually
  settled the text at roughly 45% progress; waiting for the tween's
  mathematical end felt laggy. Immediate under reduced motion or when the
  page has no hero text). Only Portfolio passes it; other pages untouched.
- The synth stays **mounted from the start so its space is reserved** (no
  layout shift, ScrollTrigger positions stay valid, no refresh needed). It is
  hidden in CSS (`.portfolio-player-enter`) and revealed with the handoff's
  hero-reveal motion (1.1s, `ease.ui` cubic-bezier(.19,1,.22,1), 26px rise)
  when the callback flips `heroDone`.
- Gotchas learned: pages must **not** import a service class directly (the
  hook layer is the sole page-service boundary); custom easings are forbidden,
  reuse one of the three canonical curves from `tokens/motion.ts`; and
  conditionally *mounting* below-hero content causes a visible layout jump —
  prefer mount-always + CSS reveal.

## 2026-07-11 · Article "Le" dropped from section names (handoff deviation)

- User request: "Le Studio" / "Le Matériel" / "Le Portfolio" become "Studio" /
  "Matériel" / "Portfolio" in the hero titles (`content/studio.ts`,
  `content/equipment.ts`, `content/portfolio.ts`), the nav labels
  (`content/navigation.ts`) and the footer sitemap (`content/site.ts`).
- Left as-is: the Contact page's non-clickable "Le studio" info row (it reads
  as a sentence, not a section name) and the hero eyebrows.
- Nav balance: "Accompagnement" (14 chars) became "Coaching" (8) in the navbar
  only, so both sides of the logo disc weigh almost the same (left 31 chars vs
  right 30). The Guidance page hero and the footer keep "Accompagnement".

## 2026-07-15 · Client feedback batch (handoff deviations, requested by Théo)

- **Hero outline everywhere:** the landing `h1` treatment (near-white fill +
  `-webkit-text-stroke` copper) became a token, `colors.heroTitle`, applied to
  the `h1` of all 8 pages. The handoff only had it on the landing; client
  feedback overrides.
- **Sound Design heroIntro:** new paragraph under the hero title
  (`content/soundDesign.ts`), same style/reveal as the Portfolio heroIntro.
- **Portfolio rack enlarged:** stage `96vh/min 820px` (was `90vh/760px`),
  rack max-width `1800px` (was `1640px`), cover grid `minmax(200px,1fr)`
  (was `240px`) so more covers show at once. Mobile media queries unchanged.
- **Matériel lightened:** removed the "Le cœur de la chaîne" caption, the
  inventory intro paragraph (`inventoryBody`) and the whole DÉTAILS close-ups
  section (+ its `DETAILS` content export).
- **Export intro:** replaced by the client's sentence ("Un export bien préparé
  est la première étape…"), rendered as a body paragraph (too long for the
  0.32em-tracked MonoLabel).
- Pending (not done): `/` to become the studio presentation (history + Théo
  portrait) and the current home service panels to move to a `/services` page;
  waiting for the client's final copy and validation of the route change.

## 2026-07-15 · Home/Services restructure (client feedback)

- The landing now presents the studio: hero (unchanged) → presentation +
  history copy (`content/home.ts`, client's draft with grammar corrections;
  he will send final wording) → the former Studio page sections (bio,
  environment, pedagogy band from `content/studio.ts`) → CTA "Venez voir le
  studio." (`#contact` id kept for the footer's "Demander un devis" link).
- The three prestation panels + "Donnons une dimension à votre son." CTA moved
  to a new `/services` page (`content/services.ts`, copy verbatim); the
  `/studio` route and `pages/Studio` are gone; nav "Studio" became "Services";
  footer: "Studio" links to `/`, "Services" added under Prestations.
- Rationale (validated with Max): the client said "naviguer vers les différents
  services", i.e. a separate services destination; stacking the 3 long panels
  under the studio sections would make the landing endless.
- Motion plumbing: the `[data-svc]` card de-blur moved from `useHomeIntro` into
  `MotionService` (static `applyServicePanels`, also run by `init()`), and
  parallax became `MotionService.applyParallax`, reused by `useHomeIntro` for
  the pedagogy band. The mobile CSS blocks moved with their markup
  (`[data-svc]` → ServicesPage.css, `[data-split]` → HomePage.css).

## 2026-07-15 · Home intro split, senseless line breaks, mobile split-order bug

- Home presentation section became a text + photo split (client feedback:
  "il faudrait une photo"): eyebrow "Le studio · Depuis plus de 15 ans",
  lead + body paragraphs left, the orphaned `/assets/studio-hero-ssl.jpg`
  (ex-Studio hero) right. Photo alternation on the page stays
  right → left → right.
- "Retours à la ligne inutiles" (client screenshot on Guidance formules):
  the culprit is over-narrow paragraph `maxWidth` in wide sections, not
  `<br>` (there are none). Widened: Guidance formules intro 520→900px (one
  line), Guidance demande intro maxWidth dropped (fills the 760px column),
  Sound Design heroIntro 540→640px (one line). Kept narrow on purpose:
  split columns, centered CTA paragraphs, text over the pedagogy gradient.
- **Gotcha (mobile split stacking):** CSS `order` only applies to direct
  grid/flex items. Sections that wrapped `SplitMedia` in a
  `<div style={{order:2}}>` never re-stacked image-first on mobile because
  `[data-split-media]{order:1}` hit the nested element. Fix: `SplitMedia`
  takes an `order` prop on its root and is always a direct grid child.

## 2026-07-20 · Client feedback batch 2 (modif.txt)

- **Services:** three new panels appended (Sound Design & Post Production →
  CTA "Extrait des travaux réalisés par le studio →" to /sound-design;
  Production & Composition; Accompagnement & Direction Artistique → CTA
  "Cliquez ici pour le détail des services →" to /guidance). Photos provided
  by Max: cabin-mic (voix off fits sound design), machine-tubetech,
  eleve-close (coaching). Stem Mastering lost the sentence "C'est une forme
  de mixage plus complète…". Eyebrow widened to cover the five domains.
- **Home:** Théo's bio replaced by his first-person "interview" copy
  (5 paragraphs, `STUDIO.interview`), rendered with a large copper « before
  and » closing the last paragraph; the split is top-aligned since the text
  outruns the portrait. "Créatif et apaisant" got the client's 3-paragraph
  copy (`STUDIO.envParagraphs`, now an array). The old handoff bio (with
  OddWave/Earthworm highlights) is gone.
- **Sound Design gallery:** reordered per the client (Showreel/Démo →
  Alice 2049/Court métrage → Hadra/Film reportage → all re-sound pieces) and
  every re-sound entry normalized to "Re Sound Design / NAME / Sound Design,
  Sfx, Background, Foley, Mixage". NOTE: the client wrote "The Witcher S2-E8"
  where the site said "S3 E6" — client's version used; flag if he corrects.
- **Portfolio:** "Cliquez **sur** une pochette pour écouter."
- Copy normalization applied to the client's PDF text: straight apostrophes,
  sentence case in the CTA ("travaux réalisés", not "Réalisés"), "detail" →
  "détail". Everything else verbatim.
- **Gotcha (recurring): media-query rules that target inline React styles are
  dead without `!important`.** Second occurrence this month (after the
  split-order bug): the synth rack's ≤720px rules (`.ow-synth-stage` height,
  `.ow-synth-rack` ear columns) silently never fired, costing the whole
  mobile overflow margin. When a stylesheet rule must override a `style={}`
  prop, it needs `!important` — audit the pair whenever adding either side.
- Long mono eyebrows need the Home hero pattern (clamp() on size AND
  tracking + lineHeight 1.7 + maxWidth 100%); fixed 13px/0.32em only works
  under ~30 characters.
- **SEO layer (2026-08-07):** per-page head tags live in `src/components/Seo`
  (fed by `src/content/seo.ts`, JSON-LD built by `SeoService`); every page
  renders `<Seo page="..." />` inside its root div. Location policy decided
  by Max: the town (Auriol) appears in metadata, JSON-LD and llms.txt ONLY,
  never in visible UI, and no street address anywhere (privacy). Global
  OG/Twitter tags were removed from index.html on purpose: static head tags
  would duplicate the per-page ones on every prerendered route (react-helmet
  appends, it does not replace them). The canonical social image is
  `public/og.jpg` (1200x630). robots.txt allowlists AI crawlers; sitemap.xml
  is hand-maintained: add a `<url>` entry when adding a route.

## 2026-09-10 · Client feedback batch 3 (Witcher + mosaïque Matériel)

- **Sound Design / Witcher:** the short piece is back to its real name,
  `THE WITCHER S3 E6 - RESOUND (Short)` (it matches the source filename). This
  closes the July flag: modif.txt said "S2-E8", the client now confirms S3 E6.
  The full 1:59 démo joins the gallery right after it as `witcher-demo`.
  The client's drop `THE WITCHER - Re-Sound Design Démo (720P)  (2).mov` was
  byte-identical (same md5) to the `(1).mov` sitting unused since 21 July, so
  the duplicate was deleted and the original kept. Transcoded with the usual
  recipe (H.264 high / yuv420p / AAC 160k / `-movflags +faststart`, CRF 22):
  151 MB `.mov` → 32 MB `.mp4`.
- **Gotcha (poster frames):** ffmpeg's `thumbnail` filter picked the OddWave
  logo intro card mid-animation ("ODDWAVE STUDI" with the O still flying in).
  For a reel that opens on a logo sting, `thumbnail` is the wrong tool: seek to
  a real frame instead (`-ss 45`). Worth checking every generated poster by eye.
- **`scripts/pin-to-pinata.sh` now accepts filenames as arguments**, so a single
  new reel can be pinned without re-uploading the whole gallery:
  `bash scripts/pin-to-pinata.sh witcher-demo.mp4`.
- **Matériel:** the three captioned "pièces phares" were replaced by a
  **five-photo atmosphere mosaic**, uncaptioned (client request: feel the room
  before reading the gear list). `FEATURED` → `STUDIO_GALLERY` (`StudioPhoto`
  with a French `alt` that is never rendered). Photos moved from background
  divs to real `<img loading="lazy">` so they lazy-load and carry alt text.
- **Mosaic geometry:** with a lead tile spanning 2 rows, the lead and the small
  tiles share almost the same aspect ratio (the lead is ~2× wide and ~2× tall),
  so you cannot make one landscape and the others square. The lever is the
  **container `aspect-ratio`**: `1.9fr 1fr 1fr` + `aspect-ratio: 2.81` puts the
  lead at 4:3 (its source ratio) and the four others at ~3:2 (theirs). Rows are
  then definite, so no track-sizing surprises.
- Raw client drops (`public/assets/grid/`) are gitignored; only the resized
  copies in `public/assets/studio/` ship (6.0 MB → 428 KB for the five).
- **Still open:** `witcher-demo.mp4` is NOT pinned. `VIDEO_SRC.witcherDemo`
  points at the local `/assets/…` path, which is gitignored: it plays in dev and
  404s in production. Pin it and swap in `ipfs('<CID>')` before the next deploy.

## 2026-09-10 · PhotoLightbox + ordre de la galerie

- **New shared component `components/PhotoLightbox/`**: fullscreen photo viewer
  opened from a gallery tile. Steps with the side arrows, the ← / → keys or a
  horizontal swipe (44px threshold), wraps at both ends, closes on backdrop / ×
  / Escape, and preloads both neighbours so a step never shows an empty frame.
  It reuses VideoModal's modal language (overlay `rgba(8,9,11,.92)` +
  `blur(10px)`, 46px round controls) so the two readers feel like one object.
- **New model `Photo`** (`src/models/Photo.ts`) with `src` / `alt` / optional
  `full` and a `large` getter. Needed because a shared component may not import
  from `content/`: the gallery type had to move down into `models/`.
- **Two image sizes.** The tiles load ~1100–1600px copies; the lightbox loads
  `*-full.jpg` (capped at the source width, max 2200px) only when opened.
  Five tiles = 428 KB, five full copies = 776 KB loaded on demand. Serving one
  size would have meant either a soft fullscreen view or a phone downloading
  megapixels for a 360px grid.
- **Gotcha (lightbox image sizing):** an `<img>` used directly as a flex item
  with `flex: 1 1 auto` grows its *box* to the free space; `object-fit: contain`
  then letterboxes inside it, so the border-radius and drop shadow sit around an
  invisible box, detached from the photo. Fix: a stage `<div>` takes the flex
  space and the image sizes itself inside it (`width/height: auto` +
  `max-width/max-height: 100%`).
- The side arrows carry an inline `translateY(-50%)`, so their hover state may
  only touch colours: any hover `transform` in CSS knocks them off centre.
- **Mosaic tiles are `<button>`s** (keyboard reachable, `cursor: zoom-in`,
  copper `:focus-visible` ring). Only the inner `<img>` scales on hover, so the
  reveal transform MotionService puts on `[data-reveal]` is never fought over.
- **First use of the emitted token custom properties in a `.css` file**
  (`var(--ow-ease-ui)`, `var(--ow-color-copper-landing)`). `cssVars.ts` has
  emitted them since day one but every stylesheet still hardcoded hexes. Prefer
  the vars from now on; translucent values with no matching token stay raw.
- **Sound Design order:** the Witcher démo now opens the gallery, ahead of the
  showreel (Max, September 2026, overriding modif.txt's showreel-first order).

## 2026-09-10 · Avis Google affichés sur le site

- **Where, decided from the page structure:** every page ends with the same CTA
  block, and that is where hesitation peaks, so a compact **`ReviewBadge`**
  (stars + average + count, linking to the listing) sits just above the button
  on Services, Matériel, Sound Design and Portfolio. The full **`ReviewsSection`**
  ("Ils en parlent", three cards) goes on two pages only, Home and Contact;
  putting it on all eight would read as filler. Home gets the section and **no**
  badge: the section already sits immediately above its CTA.
- **Placement guards against layout shift.** Both blocks mount only once the
  fetch resolves. On Home the section sits right before the CTA, so a late
  insert moves only the CTA and the footer. On Contact it sits **after** the
  form, never above it: a block appearing above a form someone is filling in is
  the one shift that actually hurts.
- **Gotcha (`[data-reveal]` on late-mounting content is inert).** MotionService
  queries `[data-reveal]` once, when the page mounts, and applies
  `gsap.set(autoAlpha: 0)` then animates. Anything mounted afterwards is never
  collected: it is not hidden (so nothing breaks) but it never animates either.
  These blocks carry their own CSS mount fade instead. Same trap awaits any
  future async section.
- **Architecture:** `worker/reviews.ts` (`GET /api/reviews`) → `ReviewsService`
  → `useGoogleReviews` → components. The Google key stays in the Worker env.
  The hook shares one module-level promise, so a badge and a section on the same
  page cost one request, and route changes reuse it for the session.
- **Two caches, and why.** The `reviews` field is a Places **Enterprise** SKU:
  1000 free calls a month, so one call per visitor would burn the quota in days.
  The edge cache (`caches.default` + `s-maxage=43200`) needs no setup and covers
  the common case; KV is optional and adds a global cache plus stale-serving
  when Google is unreachable. `wrangler.jsonc` carries the KV binding commented
  out, with the create command, so a deploy never breaks on a placeholder id.
- **API limits worth repeating to the client:** five reviews maximum, chosen by
  Google as "most relevant" — there is no "latest" or "best" ordering. Author
  name, photo and a link back must stay visible, and the content may not be
  warehoused (hence the short freshness window).
- **No JSON-LD for these reviews.** Google treats `AggregateRating` about your
  own business, on your own site, under `LocalBusiness` as self-serving: the
  stars never show and it breaks the guidelines. The SERP stars come from the
  Google listing itself. Deliberate omission, do not "fix" it later.
- Stars are drawn as **SVG**, not the ★ glyph: none of the three site families
  ships one, so text stars would fall back to a system font or a colour emoji.
- `formatRating` (French decimal comma) lives in `helpers/`, not next to the
  component that first needed it.

## 2026-09-10 · Site bilingue FR / EN

- **The locale lives in the URL, not in state.** French is served from the root,
  English from an `/en` prefix, and `useLocale()` derives the language from
  `useLocation().pathname`. No context, no provider, no hydration mismatch: a
  pre-rendered page knows its language before the first effect runs. The whole
  i18n layer is `helpers/locale.ts` (pure path arithmetic) plus three hooks.
- **`routes.tsx` mounts the same page list twice**, so the build emits 16 HTML
  files instead of 8. That is the point: a client-side toggle would leave one
  URL per page and Google would only ever index French.
- **THE trap, and it was already armed.** `worker/index.ts` 301-redirected
  `/en/*` to `/`, left over from the old bilingual site. Shipping the English
  tree over that would have made every English URL redirect to the French home,
  cached permanently by browsers. The rule now filters through `APP_PATHS`:
  only `/en/…` paths that match no real route are treated as stale. A new route
  must be added in three places: `routes.tsx`, `APP_PATHS`, `sitemap.xml`.
- **`LocaleLink`** (a primitive wrapping react-router's `Link`) takes the
  canonical French path and prefixes it for the current locale. `Button` uses
  it, so every CTA on the site followed the language without a single page
  edit. The switcher itself uses a plain `Link`: its target is already
  locale-resolved, and `LocaleLink` would undo the switch.
- **Content shape:** each module exports `Localized<T>` (`{ fr, en }`) and pages
  read it through `useText()`. Data that does not translate is declared ONCE and
  shared: release list, gear names and manufacturer links, images, video CIDs,
  panel media. Only labels and prose are duplicated. The English gear inventory
  is derived from the French one through a category/tag map, so a product link
  can never drift between the two trees.
- **Switcher UX:** two languages means a toggle, not a dropdown, and text
  labels, never flags (a flag names a country, not a language). It is placed in
  the floating nav, the burger menu and the footer, and it keeps the current
  page rather than dumping the visitor on the home page.
- **`vite-react-ssg` supports `<html lang>`** through react-helmet-async's
  `htmlAttributes`: `<Head><html lang="en" /></Head>` really does land in the
  pre-rendered file. Checked in the dist output of the shipped version.
- **Translation status:** the English is a written adaptation, not a literal
  translation, and Théo still has to proofread the parts written in his own
  voice (the five interview paragraphs in `content/studio.ts` and the six
  Services panels). Every affected file says so in its header comment.

<!-- Add new entries above this line -->
