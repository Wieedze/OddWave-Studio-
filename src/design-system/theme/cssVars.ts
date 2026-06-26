// Emits the design tokens as CSS custom properties (`--ow-*`) so that co-located
// `.css` files (nav hover, media queries, keyframe-driven bits) can reference the
// same source of truth as the typed inline styles. Generated from tokens — never
// hand-maintain these values.

import { tokens } from '@/design-system/tokens';

/** Flatten a nested token object into `--ow-<path>` entries. */
function flatten(prefix: string, obj: Record<string, unknown>, out: string[]): void {
  for (const [key, value] of Object.entries(obj)) {
    const name = `${prefix}-${key}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    if (value && typeof value === 'object') {
      flatten(name, value as Record<string, unknown>, out);
    } else if (typeof value === 'string' || typeof value === 'number') {
      out.push(`  ${name}: ${value};`);
    }
  }
}

/** Build the `:root { … }` block of CSS variables from the tokens. */
export function buildCssVariables(): string {
  const lines: string[] = [];
  flatten('--ow-color', tokens.colors as unknown as Record<string, unknown>, lines);
  flatten('--ow-font', tokens.typography.font as unknown as Record<string, unknown>, lines);
  flatten('--ow-weight', tokens.typography.weight as unknown as Record<string, unknown>, lines);
  flatten('--ow-space', tokens.spacing.space as unknown as Record<string, unknown>, lines);
  flatten('--ow-layout', tokens.spacing.layout as unknown as Record<string, unknown>, lines);
  flatten('--ow-radius', tokens.radius as unknown as Record<string, unknown>, lines);
  flatten('--ow-shadow', tokens.shadow as unknown as Record<string, unknown>, lines);
  flatten('--ow-ease', tokens.motion.ease as unknown as Record<string, unknown>, lines);
  return `:root {\n${lines.join('\n')}\n}`;
}
