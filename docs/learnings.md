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

<!-- Add new entries above this line -->
