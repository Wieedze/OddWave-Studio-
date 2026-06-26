# Architecture

## Stack

React 19 + TypeScript (strict), bundled by Vite, run through Bun. Static
pre-rendering via `vite-react-ssg` (each route emits HTML, hydrates on the
client). Motion (GSAP/ScrollTrigger) and 3D (Three.js) are client-only, started
inside `useEffect`/`useLayoutEffect` so they never run during SSG.

## Layers and dependency direction

Imports only flow **downward**. A lower layer never imports an upper one.

```
pages/                uses components, primitives, hooks, content, models
  └─ layout/          page shell (Nav + Outlet + Footer)
components/           uses primitives, hooks, helpers, models
  └─ design-system/primitives/   uses tokens, helpers
hooks/                uses services, helpers, models
services/             uses helpers, models            (no React, no components)
helpers/              pure utilities + constants       (no imports from above)
models/               domain entities (classes)        (no imports from above)
design-system/tokens/ plain data                       (leaf)
content/              data extracted from designs       (uses models)
```

Rule of thumb: if a service imports a component, the design is wrong.

## OOP conventions

The user asked for an OOP-first codebase. We keep React idiomatic (functional
components + hooks) but push **all real logic into classes**:

- **`models/`** — domain entities as classes with typed fields and small methods.
  Example: `ServiceItem`, `Phase`, `Formula`, `VideoEntry`. They validate/derive,
  they never touch the DOM or React.
- **`services/`** — stateful or side-effecting behavior as classes, often with a
  clear lifecycle (`init` / `destroy`). Example: `MotionService` wraps GSAP +
  ScrollTrigger and owns teardown; `ContactService` handles form submission.
- **`helpers/`** — pure, stateless utilities and constants (`cx`, `logoPath`,
  `clamp`). Functions or static-only classes.
- **`hooks/`** — the React bridge: a hook instantiates a service, wires it to a
  ref/lifecycle, and exposes a minimal API to the component. Components stay thin.

A component should read like markup + a couple of hook calls. If it grows logic,
move that logic into a service or model.

## Naming

- Files/dirs: English, `PascalCase` for components/classes, `camelCase` for
  hooks/helpers/services instances, `kebab-case` for routes.
- One component per folder: `Nav/Nav.tsx` + `Nav/Nav.css` + `Nav/index.ts`.
- One page per folder too: `pages/Home/HomePage.tsx` + `Home/HomePage.css` +
  `Home/index.ts`. Routes import from the folder (`@/pages/Home`).
- Hooks start with `use`. Services end with `Service`. Models are nouns.

## Styling

No CSS framework. Tokens in `src/design-system/tokens/` are the single source of
truth and are also emitted as CSS custom properties (`--ow-*`) by the theme layer
for use in `.css` files (nav hover, keyframes, media queries). Inline `style`
objects reference the typed tokens; structural/stateful CSS (`:hover`,
`@keyframes`, `@media`) lives in **co-located** `.css` files — always next to the
`.tsx` that imports it, in the same component/page folder (e.g. `Nav/Nav.css`,
`Home/HomePage.css`). No central `styles/` dump; global reset/keyframes are the
one exception, in `design-system/theme/global.css`.

## Motion integration

`MotionService` lazily ensures GSAP + ScrollTrigger, registers tweens/triggers,
and tears them down. Hooks (`useHeroIntro`, `useScrollReveal`, `useParallax`)
drive it from refs. Everything checks `prefers-reduced-motion` and snaps to the
final state when reduction is requested. The attribute-driven approach of
`design-handoff/ow-motion.js` is the behavioral reference, re-expressed as typed
hooks/services.

## Adding a page

1. Add the route in `src/routes.tsx` (kebab-case path) and a `*Page` component in
   `src/pages/`.
2. Build sections from `components/` + `primitives/`; pull copy/data from
   `content/` (typed via `models/`).
3. Wire motion with hooks. Verify with the design-fidelity reviewer. Log learnings.
