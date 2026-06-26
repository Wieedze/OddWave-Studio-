# Handoff — Site OddWave Studio

## Overview
OddWave Studio is a French audio studio (mastering, mixing, production, sound design, artist accompaniment). This package contains the full multi‑page marketing site as **high‑fidelity HTML design references**: home (animated GSAP landing), Studio, Matériel, Accompagnement, Sound Design, Portfolio, Contact, plus the Design System reference page. The look is dark, cinematic, editorial — charcoal backgrounds, a single copper accent, large display type.

## About the Design Files
The `.dc.html` files in this bundle are **design references created in HTML** — prototypes that show the intended look, motion, and behavior. They are **not** production code to ship as‑is. The task is to **recreate these designs in the target codebase's environment** (e.g. Next.js/React, Astro, Vue, etc.) using its established patterns, component library, and conventions. If no environment exists yet, pick the most appropriate stack (a static‑first framework like Astro or Next.js suits this content site well) and implement the designs there.

> Note on the file format: these prototypes use an internal "Design Component" runtime (`support.js`, the `<x-dc>` wrapper, `{{ … }}` template holes, and a `class Component extends DCLogic`). **Do not port that runtime.** Read the markup + inline styles for structure/styling, and the `class Component` block for behavior/state, then rebuild with normal components in the target stack.

## Fidelity
**High‑fidelity.** Final colors, typography, spacing, motion, and copy are all here and should be reproduced faithfully. Exact values are documented below and visible inline in each file's `style="…"` attributes.

## Tech / Dependencies used in the prototypes
- **Fonts:** Cabinet Grotesk (display) + Hatton + Clash Display via Fontshare; Manrope + JetBrains Mono via Google Fonts. In production, self‑host or use the equivalents.
- **Motion:** GSAP + ScrollTrigger (loaded lazily by `ow-motion.js`). Also a lightweight attribute‑driven motion helper `ow-motion.js` (`data-hero-img`, `data-hero-title`, `data-reveal`, `data-parallax`).
- **3D/ambient:** Three.js (r128, CDN) drives `FloatingLines.jsx`, an ambient animated line field behind the GSAP landing's mid‑section.
- **Logo:** `logo-path.js` exposes `window.OW_LOGO_PATH`, a single SVG path drawn as a stroked monogram (the "OW" wave‑in‑circle).
- **No CSS framework.** All styling is inline styles + a small per‑file `<style>` block for `@keyframes`, nav hover, and `@media` breakpoints.

## Pages / Views

### 1. Home — `Landing OddWave GSAP.dc.html`  (canonical home; all logos/links point here)
- **Purpose:** Brand entry point; introduces the studio and routes to services.
- **Hero:** Full‑viewport blurred photo (`assets/hero.jpg`) that sharpens on load; giant `ODDWAVE` wordmark (Cabinet Grotesk **900**, `clamp(64px,15vw,236px)`, letter‑spacing `-.03em`) revealed letter‑by‑letter (blur→sharp, rise), with `studio` beneath (Clash Display 300) and an eyebrow line (JetBrains Mono, copper). Intro sequence: photo sharp → nav appears & expands → title + eyebrow → "studio".
- **Mid section:** sticky `100vh` canvas with `FloatingLines` (Three.js) ambient lines + radial vignette.
- **Prestations:** three alternating image/text panels (Mastering, Stem Mastering, Mixage) — image pinned, text card de‑blurs (`blur→0`) on scroll (ScrollTrigger scrub).
- **Contact/CTA:** `id="contact"` section + footer sitemap.

### 2. Le Studio — `Studio OddWave.dc.html`
- **Purpose:** Present the studio space and the engineer.
- **Sections:** hero (SSL console photo); bio split (portrait `assets/theo-portrait.jpg` + "Théo Grozdanic / Ingénieur du son · Producteur · Formateur" + 2 paragraphs); residence split; pedagogy parallax band; CTA "Venez voir le studio." → home `#contact`.
- **Layout:** `[data-split]` grid `.92fr 1.08fr`, gap `clamp(40px,5vw,72px)`, media block `height:min(72vh,640px)`, radius 18px, shadow `0 34px 80px rgba(0,0,0,.55)`.

### 3. Le Matériel — `Materiel OddWave.dc.html`
- **Purpose:** Showcase gear. Hero + close‑up detail sections + CTA "Un projet en tête ?".

### 4. Accompagnement — `Accompagnement OddWave.dc.html`
- **Purpose:** Artist accompaniment offer. Most recently reworked — read this one carefully.
- **Hero:** full‑bleed photo, `ACCOMPAGNEMENT` (Cabinet Grotesk 900) + eyebrow.
- **Méthode — 4 phases** (`#phases`): four stacked cards (`.ow-phase`), max‑width 1360px, gap `clamp(18px,2.6vh,30px)`. Each card:
  - `position:relative; overflow:hidden; background:#0B0C0F; border:1px solid rgba(255,255,255,.08); border-radius:16px; padding:clamp(36px,3.6vw,52px) clamp(30px,3.4vw,52px)`.
  - A **giant ghost number** (`.ow-phase-num`): Cabinet Grotesk **900**, `font-size:clamp(340px,40vw,440px)`, `line-height:1`, color `rgba(194,78,55,.12)`, absolutely positioned `top:50%; right:clamp(-24px,0.5vw,16px); transform:translateY(-50%)` — sized to stay the **same visual size across all four cards** and never clip differently (its empty ascender/descender overflow is hidden, the digits never are).
  - Content (`max-width:640px`, above the number): eyebrow sentence (Manrope 500, 15px, copper `#C9885F`), title on **one line** (`.ow-phase-title` Cabinet Grotesk 800, `clamp(34px,4.4vw,56px)`, white‑space:nowrap), a copper gradient rule, then a dash‑bulleted list (Manrope 500, ~17px, dash marker = 15×1.5px `#C24E37` bar).
  - Phases: **01 Diagnostic & Vision**, **02 Stratégie & Objectifs**, **03 Développement & Production**, **04 Finalisation & Projection** (full copy in the file).
- **Formules** (`#formules`): clickable table — clicking a row pre‑fills the request form below and smooth‑scrolls to it.
- **Demande** (`#demande`): real working request form — formule chips (pre‑selected from the clicked row), Nom, Email, Projet textarea, submit → "Demande envoyée." confirmation state naming the chosen formule.

### 5. Sound Design — `Sound Design OddWave.dc.html`
- **Purpose:** Sound‑design / re‑sound‑design reel.
- **Hero:** background **video** (`assets/sd-irradiation.mp4`, muted/loop) that reveals with a **cinematic letterbox open** — `@keyframes ow-cinema` animates `clip-path` from `inset(50% 0 50% 0)` (a centred, full‑width horizontal slit) to `inset(0 0 0 0)`, 1.6s `cubic-bezier(.16,1,.3,1)`, full‑width throughout; object‑position `center 28%`. Title `SOUND DESIGN` reveals as on the other heroes. A "Son" pill toggles audio (video starts **muted** — set `video.muted=true` imperatively on mount to beat the React muted‑attribute quirk).
- **À la une / Showreel:** featured 21:9 card.
- **Réalisations grid** (`#reel`): 3‑col responsive grid of video cards. The first two are **real, playable** videos (`assets/sd-irradiation.mp4`, `assets/sd-seabeast.mp4` with posters `*-poster.jpg`); the rest are still placeholder tiles awaiting real videos. Clicking a card opens a **modal player** that plays the real `<video controls autoplay>` when the entry has a `src`, otherwise falls back to a simulated poster+progress UI.
- **NOTE for the dev:** the client intends the whole grid + featured to be their own supplied videos. Treat each gallery entry as `{ title, cat, dur, note, posterImg, src }`; render a real player when `src` is present.

### 6. Portfolio — `Portfolio OddWave.dc.html`
- **Purpose:** Discography / cover wall. (`Portfolio Synth.dc.html` is a separate standalone interactive synth experiment — no nav/footer, intentionally.)

### 7. Contact — `Contact OddWave.dc.html`
- **Purpose:** Contact form + direct channels (email, Instagram, studio). Form has Nom/Email, "besoin" chips (Mastering / Stem Mastering / Mixage / Accompagnement / Sound design), Projet textarea, submit → "Message envoyé." state.

### Reference — `Design System OddWave.dc.html`
Full design‑system reference page (palette, monogram, type scale, spacing, components, motion, photo direction). Use it as the source of truth for tokens.

## Shared components (appear on every site page)
- **Floating nav** (`.ow-nav`): centred pill, fixed `top:22px`, `background:rgba(20,21,26,.46)`, `backdrop-filter:blur(13px) saturate(1.3)`, `border:1px solid rgba(255,255,255,.1)`, `border-radius:999px`, `box-shadow:0 8px 30px rgba(0,0,0,.34)`. At rest it shows only the centred monogram; on hover/focus the link groups slide out symmetrically (width `0→350px`, translate `±22px→0`, opacity, `transition .8s cubic-bezier(.19,1,.22,1)`). Links: Le studio · Le matériel · Accompagnement · (logo) · Sound design · Portfolio · Contact. Below ~860px the side groups hide and a tappable hamburger menu (`.ow-menu`) is used instead.
- **Link underline** (`.ow-link`): copper underline wipes in left‑to‑right on hover.
- **Footer:** monogram + "OddWave Studio" (Cabinet Grotesk 700) on the left, "© 2026 · …" mono caption on the right, top hairline `rgba(255,255,255,.06)`.
- **Primary button:** `background:#C24E37; color:#F6EEE6; padding:16px 32px; border-radius:3px; font:600 15px Manrope; box-shadow:0 14px 40px rgba(194,78,55,.3)`; hover lifts `translateY(-2px)`.
- **Mono eyebrow/label:** JetBrains Mono 600, ~11–13px, letter‑spacing `.16–.32em`, uppercase, color `#C24E37` or `#C9885F`.

## Interactions & Behavior
- **Hero intros** (`ow-motion.js`): hero image blur(18px)→0 + fade (2s); title then eyebrow rise+de‑blur (delays ~0.7s / 1.25s, 1.5s each). GSAP landing has a richer letter‑by‑letter timeline.
- **Scroll reveals:** `[data-reveal]` fade+rise (`autoAlpha 0→1, y 20→0`) when entering viewport (ScrollTrigger `start:'top 92%'`, once).
- **Parallax:** `[data-parallax="0.18"]` translate on scroll (background photos/video).
- **Sound Design hero:** `clip-path` letterbox open on load (see page 5).
- **Video modal:** opens on card click; real `<video controls autoplay playsinline>` when `src` present; closes on backdrop click / × ; unmounts (stops) on close.
- **Accompagnement:** formule row click → set selected formule + smooth‑scroll to `#demande`; chips reflect selection; submit flips to confirmation state.
- **Reduced motion:** helpers honor `prefers-reduced-motion` (snap to final state); the cinema open is disabled under it.

## State Management
- **Sound Design:** `{ filter, openId, playing, progress, soundOn }` — gallery filter, open modal video index, play state, fake‑progress (placeholder entries only), hero audio toggle.
- **Accompagnement:** `{ formule, sent }` — selected formule + form submitted.
- **Contact:** `{ need, sent }`.
- Nav menu open/close is a class toggle on `.ow-menu`.

## Design Tokens

### Color
- **Backgrounds:** page `#0E0F12`; sections `#0B0C0F`; raised surfaces `#15161A` / `#16171C` / `#1C1D22` / `#26272D`.
- **Text:** primary `#F6EEE6` / `#F1EEE8`; secondary `#B7B3AB`; muted `#9C9890` / `#8C887F`; faint mono labels `#7E7A72` / `#6B675F`.
- **Accent (copper / "cuivre"):** primary `#C24E37` (also seen as `#C85733` / `#A53A2C` in the system page); warm secondaries `#C9885F` / `#E0A38E` / `#DC8068`; highlight `#E7C9AF`.
- **Wood (support accent):** `#976C46`.
- **Teal (logo support):** `#3FA39A`.
- **Paper (light surfaces, system page):** `#F4F0E8`.
- **Selection:** background `#C24E37`, text `#fff`.
- **Hairlines/borders:** `rgba(255,255,255,.06 → .18)` on dark; `rgba(20,18,14,.1)` on light.

### Typography
- **Display:** **Cabinet Grotesk** — weights 700/800/900. Headings letter‑spacing `-.02 → -.03em`.
- **Body/UI:** **Manrope** — 400/500/600/700.
- **Technical labels:** **JetBrains Mono** — 500/600, uppercase, letter‑spacing `.08–.32em`.
- (GSAP landing also references Hatton / Clash Display for the wordmark sub‑label.)
- Common sizes: hero `clamp(44px,9–15vw,150–236px)`; section H2 `clamp(28px,4–6vw,72px)`; card title 18–22px; body 15–17px/1.6–1.85; labels 10–13px.

### Spacing / radius / shadow / motion
- **Section padding:** vertical `clamp(60px,9–13vh,150px)`, horizontal 30px (content max‑width 1180px, wider blocks 1280–1360px).
- **Radius:** buttons 3px; cards/media 12–18px; pills/chips 999px.
- **Shadows:** card `0 1px 3px rgba(0,0,0,.2)`; media `0 34px 80px rgba(0,0,0,.55)`; button `0 14px 40px rgba(194,78,55,.3)`.
- **Easing:** `cubic-bezier(.19,1,.22,1)` (UI), `cubic-bezier(.16,1,.3,1)` (reveals/cinema), GSAP `power2/power3.out`.

## Assets (in `assets/`)
Photography: studio gear, console, cabins, sessions, the engineer portrait (`theo-portrait.jpg`), hero images. Video: `sd-irradiation.mp4`, `sd-seabeast.mp4` (+ `*-poster.jpg` first‑frame posters). The client will supply the remaining real videos to replace the Sound Design placeholder tiles. All photos are the client's own studio imagery.

## Files in this bundle
- Pages: `Landing OddWave GSAP.dc.html` (home), `Studio OddWave.dc.html`, `Materiel OddWave.dc.html`, `Accompagnement OddWave.dc.html`, `Sound Design OddWave.dc.html`, `Portfolio OddWave.dc.html`, `Portfolio Synth.dc.html`, `Contact OddWave.dc.html`.
- Reference: `Design System OddWave.dc.html`.
- Helpers: `ow-motion.js` (attribute motion + GSAP loader), `logo-path.js` (`window.OW_LOGO_PATH`), `FloatingLines.jsx` (Three.js ambient lines), `support.js` (prototype runtime — for reference only, do not port).
- `assets/` — all images and videos referenced above.

### Reading order for the dev
1. This README. 2. `Design System OddWave.dc.html` for tokens. 3. `Landing OddWave GSAP.dc.html` (home + shared nav/footer + motion patterns). 4. Each section page. For every page, the `<style>` block + inline styles = look; the `class Component` block = behavior/state.
