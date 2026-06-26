# Design System — Source of Truth

Distilled from `design-handoff/Design System OddWave.dc.html` and the handoff
README. When a value here disagrees with intuition, **this file wins**; when this
file is silent, the original `.dc.html` `style="…"` wins. Tokens are implemented
in `src/design-system/tokens/`.

Theme line: **"Précision & Chaleur"** — a cold, precise charcoal structure
punctuated by human copper warmth.

## Color

### Charcoal — base & surfaces

| Token | Hex | Use |
|---|---|---|
| `ink900` | `#0E0F12` | Page background |
| `ink850` | `#16171C` | Dark section |
| `ink800` | `#1C1D22` | Raised surface |
| `ink700` | `#26272D` | Card / field |
| `ink600` | `#34353C` | Strong border |

Other surfaces seen in pages: `#0B0C0F` (section), `#15161A`. Paper (light
surfaces, system page): `#F4F0E8`, `#FFFFFF`, `#ECE7DD`, `#FBF8F2`.

### Copper — primary accent ("cuivre brûlé")

| Token | Hex | Use |
|---|---|---|
| `copper700` | `#7A2E16` | Pressed / active |
| `copper600` | `#94371B` | Accent on light |
| `copper500` | `#AC3F20` | **Brand copper** |
| `copper400` | `#C85733` | Accent on dark |
| `copper300` | `#E18A5E` | Hover / glow |

Note: pages also use `#C24E37` (landing accent / selection), `#C9885F` and
`#E0A38E` (warm secondary), `#DC8068`, `#E7C9AF` (highlight), `#A53A2C`.
Treat `#C24E37` as the landing-era copper; `#AC3F20` is the system brand copper.

### Wood — secondary accent ("bois noyer")

| Token | Hex |
|---|---|
| `wood700` | `#2E2117` |
| `wood600` | `#4A3324` |
| `wood500` | `#6B4A33` |
| `wood400` | `#976C46` |
| `wood300` | `#C09365` |

### Teal — logo support

`teal700 #0E4B50`, `teal500 #1C7A75`, `teal300 #3FA39A`.

### Signals — functional

`red #D8473A` (REC), `amber #E8A23D` (LED).

### Text

primary `#F1EEE8` / `#F6EEE6`; secondary `#B7B3AB`; muted `#9C9890` / `#8C887F` /
`#A5A5A5`; faint mono labels `#7E7A72` / `#6B675F` / `#5E5A52`.

### Hairlines / borders

dark: `rgba(255,255,255,.06 → .18)`. light: `rgba(20,18,14,.08 → .14)`.

### Selection

landing: `background:#C24E37; color:#fff`. system page: `#AC3F20`.

## Typography

- **Display:** **Cabinet Grotesk** — 700 / 800 / 900. Headings letter-spacing
  `-.02 → -.03em`.
- **Body / UI:** **Manrope** — 400 / 500 / 600 / 700 / 800.
- **Technical labels:** **JetBrains Mono** — 500 / 600, uppercase,
  letter-spacing `.08 → .42em`.
- **Wordmark sub-label:** Clash Display 300 ("studio"); Hatton referenced too.

### Scale

| Role | Size | Line | Weight | Tracking |
|---|---|---|---|---|
| Display | `72` (hero `clamp(64px,15vw,236px)`) | 1.0 / .92 | 700 / 900 | -2.5% / -.03em |
| H1 | `40` | 1.08 | 600 / 700 | -2% |
| H2 | `30` (section `clamp(28px,4–6vw,72px)`) | 1.15 | 600 / 700 | -1% |
| H3 | `22` | 1.25 | 600 | |
| Body large | `18` | 1.62 | 400 | |
| Body | `16` (`15–17`) | 1.6 (`1.6–1.85`) | 400 | |
| Label / mono | `11–13` | 1 | 600 | +.16–.32em, caps |

## Spacing — base-4 grid

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

Section padding: vertical `clamp(60px,9–13vh,150px)`, horizontal `30px`.
Content max-width `1180px`; wide blocks `1280–1500px` (landing cards `1500`,
guidance `1360`).

## Radius

buttons `3px` (system shows `4px` flat family); cards / media `8–18px`
(system uses `8/14/16`); pills / chips `999px`. Scale: `4, 8, 14, 22, pill`.

## Elevation / shadow

- card (light) `0 8px 24px -10px rgba(20,18,14,.25)`; strong `0 22px 50px -18px rgba(20,18,14,.4)`.
- card (dark) `0 1px 3px rgba(0,0,0,.2)`.
- media `0 34px 80px rgba(0,0,0,.55)`; landing cards `0 50px 130px rgba(0,0,0,.55)`.
- button copper `0 14px 40px rgba(194,78,55,.3)`.
- teal glow `0 0 0 1px rgba(255,255,255,.08), 0 18px 44px -18px rgba(63,163,154,.5)`.

## Motion

- **Easings:** UI `cubic-bezier(.19,1,.22,1)`; reveals / cinema `cubic-bezier(.16,1,.3,1)`;
  system page UI `cubic-bezier(.22,.61,.36,1)`; GSAP `power2/power3.out`.
- **Durations:** fast `240ms`; entrance `420ms`; nav deploy `.8s`; hero blur `2s`.
- **Patterns:** hero image blur(18px→0) + fade; title then eyebrow rise + de-blur;
  `[data-reveal]` fade + rise on scroll (`top 92%`, once); `[data-parallax]`
  translate on scroll; Sound Design hero `clip-path` letterbox open
  (`inset(50% 0 50% 0)` → `inset(0)`, 1.6s `cubic-bezier(.16,1,.3,1)`).
- Honor `prefers-reduced-motion`: snap to final state; disable the cinema open.

## Shared components

- **Floating nav** (`.ow-nav`): centred pill, `position:fixed; top:22px`,
  `background:rgba(20,21,26,.46)`, `backdrop-filter:blur(13px) saturate(1.3)`,
  `border:1px solid rgba(255,255,255,.1)`, `border-radius:999px`,
  `box-shadow:0 8px 30px rgba(0,0,0,.34)`. At rest: monogram only. On hover/focus
  the side link groups slide out symmetrically (width `0→350px`, translate
  `±22px→0`, `transition .8s cubic-bezier(.19,1,.22,1)`). Links: Le studio ·
  Le matériel · Accompagnement · (logo) · Sound design · Portfolio · Contact.
  Below `860px`: side groups hide, a hamburger `.ow-menu` is used.
- **Link underline** (`.ow-link`): copper underline wipes in left-to-right on hover.
- **Footer:** sitemap grid + monogram + "OddWave Studio" (Cabinet Grotesk 700),
  "© 2026 · …" mono caption, top hairline `rgba(255,255,255,.06)`. FR/EN switch.
- **Primary button:** `background:#C24E37; color:#F6EEE6; padding:16px 32px;
  border-radius:3px; font:600 15px Manrope; box-shadow:0 14px 40px rgba(194,78,55,.3)`;
  hover lifts `translateY(-2px)`. (System "flat" family uses `#AC3F20` / radius 4.)
- **Mono eyebrow/label:** JetBrains Mono 600, 11–13px, letter-spacing `.16–.32em`,
  uppercase, color `#C24E37` or `#C9885F`.
- **Logo:** single stroked SVG path `OW_LOGO_PATH` (viewBox `0 0 3000 3000`),
  `stroke-width 16–20`, round caps/joins. Light `#F1EEE8`, dark `#17150F`,
  copper `#C85733/#C24E37`.
