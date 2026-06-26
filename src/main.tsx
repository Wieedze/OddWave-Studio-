// Entry — vite-react-ssg pre-renders each route to static HTML and hydrates on
// the client. Motion (GSAP/Three) starts in effects, so it never runs at build.

import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';

export const createRoot = ViteReactSSG({ routes });
