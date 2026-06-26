---
name: verify-design
description: Check that a built OddWave UI unit (component, section, or page) matches the design handoff to the letter — tokens, type, spacing, motion, exact French copy — and that project rules hold. Use after building or changing any visual unit before moving on.
---

# Verify Design

Run a design-fidelity check on a freshly built or changed UI unit against the
OddWave handoff.

## Steps

1. **Identify the unit and its files.** From the argument (e.g. "Nav",
   "home hero", "guidance phases") locate the implementing files under `src/`.
   Map the page to its reference with `docs/pages.md`.

2. **Load the sources of truth:**
   - `docs/design-system.md` (tokens), `docs/rules.md` (rules),
   - the matching `design-handoff/*.dc.html` (pixel reference),
   - `src/design-system/tokens/` (implemented values).

3. **Delegate the review** to the `design-fidelity-reviewer` agent (preferred:
   it has the full checklist and output format), passing the unit name and file
   paths. If running inline instead, apply that agent's checklist:
   color, typography, spacing/layout, radius/shadow, motion (+ reduced-motion),
   copy (no em/en dashes, verbatim French), and rules (English code, tokens not
   literals, OOP layering, focus/keyboard).

4. **Report** using the agent's format (VERDICT + BLOCKERS + NITS + CHECKED OK +
   NOTES). Cite `file:line` with expected vs actual.

5. **Log** any ambiguity or deviation decision in `docs/learnings.md`.

## Quick greps

- Dash separators in copy: `grep -rn "—\|–" src/`
- Raw hexes that should be tokens: `grep -rn "#[0-9A-Fa-f]\{6\}" src/`
- Stray `any`: `grep -rn ": any\b" src/`

Do not edit code in this skill — report only. Fixes are a separate step.
