# Rules

Hard rules for this codebase. The reviewer agent and every change must comply.

## Language & naming

1. **All code, identifiers, files, folders, comments in English.**
2. **UI copy stays in French** — it is content, copied verbatim from the handoff.
3. Routes are kebab-case; components/classes PascalCase; hooks `useX`; services
   `XService`; constants `UPPER_SNAKE` only for true constants.

## TypeScript

4. `strict` is on. No `any` unless justified by an inline comment.
5. Prefer `type`/`interface` over loose objects. Public functions are typed.
6. No unused locals/params (compiler enforces). No `// @ts-ignore` without reason.

## OOP & architecture

7. Logic lives in `models/` (entities), `services/` (behavior), `helpers/`
   (pure). Components are thin functional + hooks.
8. Imports flow downward only (see `architecture.md`). No service imports a
   component; no helper imports a service.
9. One responsibility per file. Co-locate a component's `.css` next to it.

## Design fidelity (the contract)

10. Reproduce the handoff **to the letter**: colors, type, spacing, radius,
    shadow, motion, and copy. Exact values come from `docs/design-system.md`,
    then the original `.dc.html`.
11. **Never hardcode a hex/size that exists as a token.** Use the token.
12. Do not invent content, sections, or imagery absent from the designs. If
    something is missing, ask before adding.
13. **No em/en dashes (—, –) as separators** in visible text. No forced
    mid-sentence line breaks.
14. Keep the exact French copy, including accents, from the source files.

## Motion & accessibility

15. Every animation honors `prefers-reduced-motion: reduce` (snap to final
    state; disable the Sound Design cinema open).
16. Provide a no-JS / no-GSAP fallback: content is visible even if motion fails
    (mirror the handoff's safety nets).
17. Keyboard focus and `:focus-within` must work (nav deploys on focus too).

## Process

18. Build in this order: structure → shared components → page by page.
19. After each visual unit, run the **design-fidelity reviewer** (or
    `/verify-design`) against the matching `design-handoff/*.dc.html`.
20. Record decisions, deviations, and gotchas in `docs/learnings.md`.
21. The assistant never runs `git` or `bun install` / other `bun` commands — the
    user does (rights). Write code and tell the user what to run.
