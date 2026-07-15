# Pages — Specs distilled from the handoff

Each page has one route. Exact copy, colors, and measures live in the matching
`design-handoff/*.dc.html`; read it before building the page. Shared Nav + Footer
appear on every page (except `Portfolio Synth`, a standalone experiment with no
nav/footer, intentionally out of scope for now).

## `/` Home — `Landing OddWave GSAP.dc.html` (hero) + `Studio OddWave.dc.html` (sections)

Brand entry point; all logos/links point here. Restructured per client feedback
(July 2026): the landing now presents the studio (presentation + history +
engineer); the three prestation panels moved to `/services`.

- **Hero** (`#top`, `100vh`, `min-height:680px`): full-viewport blurred photo
  (`hero.jpg`, `center 40%`) that sharpens on load; giant `ODDWAVE` wordmark
  (Cabinet Grotesk **900**, `clamp(64px,15vw,236px)`, `-webkit-text-stroke:1.4px
  rgba(194,78,55,.85)`) revealed **letter by letter** (blur→sharp, rise);
  `studio` beneath (Clash Display 300, `letter-spacing:.16em`); eyebrow at bottom
  (JetBrains Mono 600, `.42em`, copper `#C9885F`): "Production · Mixage ·
  Mastering · Sound design". Intro timeline: photo sharp → nav appears & expands
  → title + eyebrow → "studio". Hero parallax on scroll. Nav auto-closes on first
  scroll down.
- **Présentation + historique:** the client's own copy (`content/home.ts`,
  draft pending his final wording): a display-type lead paragraph + 3 body
  paragraphs, max-width 1180 container.
- **Studio sections** (from `Studio OddWave.dc.html`): bio split (portrait
  `theo-portrait.jpg` + "Théo Grozdanic / Ingénieur du son · Producteur ·
  Formateur" + 2 paragraphs); residence split; pedagogy parallax band.
  `[data-split]` grid `.92fr 1.08fr`, gap `clamp(40px,5vw,72px)`, media
  `height:min(72vh,640px)`, radius 18px.
- **Contact/CTA** (`#contact`): centred monogram, H2 "Venez voir le studio.",
  paragraph, copper button "Nous contacter →".
- **Footer:** sitemap (Studio / Prestations / Travaux / Contact), monogram +
  "OddWave Studio", FR/EN, "© 2026 · Mastering · Production · Accompagnement".

## `/services` Services — panels from `Landing OddWave GSAP.dc.html`

The three prestation panels, moved from the landing (client feedback, July 2026).

- **Backdrop + title:** FIXED full-viewport `FloatingLines` (Three.js) ambient
  field (same behavior as Portfolio, client request): it stays put while the
  title, panels and CTA scroll over it (`position:fixed` zIndex 0 + relative
  zIndex 1 content wrapper). Title section (`SERVICES`, hero outline treatment,
  top padding `clamp(140px,22vh,220px)` like Portfolio, not full-height so the
  first panel sits close) + mono eyebrow "Mastering · Stem mastering · Mixage".
- **Prestations:** three image/text glass cards (Mastering, Stem Mastering,
  Mixage), all centered (client request; only the image side alternates inside
  the card). The panels stay mounted but hidden until the hero intro completes
  (same `onHeroIntroComplete` + CSS reveal mechanism as the Portfolio synth),
  then each card de-blurs (`blur 18px→0`, rise) on scroll (ScrollTrigger scrub
  `top 80% → top 34%`). Full copy in `content/services.ts` (verbatim from the
  landing handoff). Each has a "Demander un devis →" link to `/#contact`.
- **CTA:** centred monogram, H2 "Donnons une dimension à votre son.",
  paragraph, copper button "Démarrer un projet →".

FloatingLines props (from the landing file): gradient
`['#C24E37','#D98E5A','#8A5A3C']`, waves top/middle/bottom, lineCount `[3,4,3]`,
lineDistance `[9,7,5]`, animationSpeed `0.7`, interactive, parallax, bendRadius
`16`, bendStrength `-1.6`, mouseDamping `0.08`, mixBlendMode `screen`.

## `/equipment` Le Matériel — `Materiel OddWave.dc.html`

Showcase gear. Hero + close-up detail sections + CTA "Un projet en tête ?".

## `/guidance` Accompagnement — `Accompagnement OddWave.dc.html`

Most recently reworked — read carefully.

- **Hero:** full-bleed photo, `ACCOMPAGNEMENT` (Cabinet Grotesk 900) + eyebrow.
- **Méthode — 4 phases** (`#phases`): four stacked cards (`.ow-phase`), max-width
  `1360px`, gap `clamp(18px,2.6vh,30px)`. Each: `background:#0B0C0F; border:1px
  solid rgba(255,255,255,.08); border-radius:16px; padding:clamp(36px,3.6vw,52px)
  clamp(30px,3.4vw,52px)`. **Giant ghost number** (`.ow-phase-num`): Cabinet
  Grotesk 900, `font-size:clamp(340px,40vw,440px)`, color `rgba(194,78,55,.12)`,
  absolutely positioned `top:50%; right:clamp(-24px,0.5vw,16px);
  translateY(-50%)` — must read the **same visual size on all four cards** (ascender
  overflow hidden, digits never clipped). Content `max-width:640px`: eyebrow
  (Manrope 500, 15px, copper `#C9885F`), title on one line (Cabinet Grotesk 800,
  `clamp(34px,4.4vw,56px)`, `white-space:nowrap`), copper gradient rule, dash list
  (Manrope 500, ~17px, dash marker = 15×1.5px `#C24E37` bar). Phases: **01
  Diagnostic & Vision**, **02 Stratégie & Objectifs**, **03 Développement &
  Production**, **04 Finalisation & Projection**.
- **Formules** (`#formules`): clickable table; clicking a row pre-fills the form
  and smooth-scrolls to it.
- **Demande** (`#demande`): real form — formule chips (pre-selected from the
  clicked row), Nom, Email, Projet textarea, submit → "Demande envoyée."
  confirmation naming the chosen formule. State `{ formule, sent }`.

## `/sound-design` Sound Design — `Sound Design OddWave.dc.html`

- **Hero:** background **video** (`sd-irradiation.mp4`, muted/loop) revealing with
  a **cinematic letterbox open** — `@keyframes` animates `clip-path`
  `inset(50% 0 50% 0)` → `inset(0)`, 1.6s `cubic-bezier(.16,1,.3,1)`,
  `object-position:center 28%`. Title `SOUND DESIGN` reveals like other heroes. A
  "Son" pill toggles audio (start muted; set `video.muted=true` imperatively on
  mount). Disable cinema open under reduced motion.
- **À la une / Showreel:** featured 21:9 card.
- **Réalisations grid** (`#reel`): responsive 3-col video cards. Each entry =
  `{ title, cat, dur, note, posterImg, src }`. First two are real playable videos
  (`sd-irradiation.mp4`, `sd-seabeast.mp4` + `*-poster.jpg`); rest are placeholder
  tiles. Card click → **modal player**: real `<video controls autoplay playsinline>`
  when `src` present, otherwise simulated poster + progress. Closes on backdrop /
  ×, unmounts (stops) on close. The client will supply more videos — handle empty
  `src` gracefully. State `{ filter, openId, playing, progress, soundOn }`.

## `/portfolio` Portfolio — `Portfolio OddWave.dc.html`

Discography / cover wall. (`Portfolio Synth.dc.html` is a separate standalone
synth experiment, no nav/footer — not part of the site nav.)

## `/contact` Contact — `Contact OddWave.dc.html`

Contact form + direct channels (email, Instagram, studio). Form: Nom / Email,
"besoin" chips (Mastering / Stem Mastering / Mixage / Accompagnement / Sound
design), Projet textarea, submit → "Message envoyé." state `{ need, sent }`.

## Forms

Validate and show a confirmation state. Wire submission through `ContactService`;
until a backend exists, log clearly marked `TODO backend` and resolve success.
