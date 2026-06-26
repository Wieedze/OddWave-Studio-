// Injects the token-derived CSS variables once. Rendered at the top of the app
// shell so the `--ow-*` custom properties are present for SSG and hydration.
// Static reset/keyframes live in ./global.css (imported by the entry).

import { buildCssVariables } from './cssVars';

const cssVariables = buildCssVariables();

export function GlobalStyles() {
  return <style data-ow-tokens dangerouslySetInnerHTML={{ __html: cssVariables }} />;
}
