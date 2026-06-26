/// <reference types="vite-react-ssg" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Vite is run/compiled through Bun. SSG (static pre-render) is provided by
// vite-react-ssg via the `vite-react-ssg build` script; client motion
// (GSAP / Three.js) stays client-only through effects.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
