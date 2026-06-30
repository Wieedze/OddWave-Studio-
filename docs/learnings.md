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

<!-- Add new entries above this line -->
