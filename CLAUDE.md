# OddWave Studio — Project Memory

Marketing site for **OddWave Studio**, a French audio studio (mastering, mixing,
production, sound design, artist guidance). Dark, cinematic, editorial look:
charcoal backgrounds, a single copper accent, large display type.

This file is the always-loaded source of truth. Read the linked docs before any
substantial change.

## Stack (decided)

- **Runtime / package manager:** Bun (the user runs all `bun` + `git` commands; the
  assistant does **not** have rights for them — never run `git` or `bun install`).
- **Build:** Vite, compiled and served through Bun.
- **UI:** React 19 + TypeScript (strict).
- **Routing / rendering:** `vite-react-ssg` (static pre-render of every route,
  client hydration). Client-only motion (GSAP, Three.js) runs inside effects.
- **Motion:** GSAP + ScrollTrigger. **3D:** Three.js (FloatingLines field).
- **No CSS framework.** Tokens drive everything (see `docs/design-system.md`).

## Non-negotiable rules

Full list in [`docs/rules.md`](docs/rules.md). The essentials:

1. **All code and folders in English.** UI copy stays in French (it is content).
2. **TypeScript everywhere**, `strict`. No `any` without a written reason.
3. **OOP mindset:** domain logic lives in classes — `models/` (entities),
   `services/` (behavior), `helpers/` (pure utilities). React components are
   functional + hooks; they consume services/models, they don't embed logic.
4. **Layered architecture:** `page → component → primitive`; `hook → service → helper`.
   No upward imports (a service never imports a component).
5. **Design fidelity is the contract.** Reproduce the handoff to the letter
   (colors, type, spacing, motion, copy). Exact values live in `docs/design-system.md`
   and the originals in `design-handoff/`.
6. **Copy constraint:** no em/en dashes (—, –) as separators in visible text; no
   forced mid-sentence line breaks. Do not invent content absent from the designs.
7. **Honor `prefers-reduced-motion`** in every animation.

## Folder map

```
src/
  design-system/   tokens (source of truth), theme (global css/vars), primitives
  components/       shared UI: Logo, Nav, Footer, FloatingLines, VideoModal, ...
  layout/           page shell (Nav + <Outlet/> + Footer)
  pages/            one folder per route: Xxx/XxxPage.tsx + XxxPage.css + index.ts
  hooks/            React hooks (motion, reduced-motion, ...)
  services/         OOP behavior (MotionService, ContactService, ...)
  helpers/          pure utilities + constants (logoPath, cx, ...)
  models/           domain entities as classes (ServiceItem, Phase, Formula, VideoEntry)
  content/          data extracted from the designs (text, navigation, lists)
docs/               project knowledge base (read these)
design-handoff/     original .dc.html references + helper JS (read-only, do not ship)
.claude/            agents, skills, rules, learnings (governance)
```

## Pages / routes (English names)

| Route | Page component | Handoff file |
|---|---|---|
| `/` | `HomePage` | Landing OddWave GSAP.dc.html |
| `/studio` | `StudioPage` | Studio OddWave.dc.html |
| `/equipment` | `EquipmentPage` | Materiel OddWave.dc.html |
| `/guidance` | `GuidancePage` | Accompagnement OddWave.dc.html |
| `/sound-design` | `SoundDesignPage` | Sound Design OddWave.dc.html |
| `/portfolio` | `PortfolioPage` | Portfolio OddWave.dc.html |
| `/contact` | `ContactPage` | Contact OddWave.dc.html |

The logo / "Accueil" link points to `/` everywhere.

## Workflow — verify design at every step

After building or changing any visual unit (a component, a section, a page),
**run the design-fidelity reviewer** to check it against the handoff before moving
on. See [`.claude/agents/design-fidelity-reviewer.md`](.claude/agents/design-fidelity-reviewer.md)
or invoke the skill `/verify-design`. Record anything learned in
[`docs/learnings.md`](docs/learnings.md).

## Knowledge base

- [`docs/architecture.md`](docs/architecture.md) — layers, OOP conventions, imports.
- [`docs/design-system.md`](docs/design-system.md) — all tokens (the source of truth).
- [`docs/pages.md`](docs/pages.md) — per-page specs distilled from the handoff.
- [`docs/rules.md`](docs/rules.md) — full coding + design rules.
- [`docs/learnings.md`](docs/learnings.md) — running log of decisions and gotchas.
