/// <reference types="vite-react-ssg" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { cloudflare } from "@cloudflare/vite-plugin";

// Vite is run/compiled through Bun. SSG (static pre-render) is provided by
// vite-react-ssg via the `vite-react-ssg build` script; client motion
// (GSAP / Three.js) stays client-only through effects.
// `@` → /src (URL is a global; avoids needing @types/node for node:url).
export default defineConfig({
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
});