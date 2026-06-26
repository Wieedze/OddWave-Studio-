// Environment helpers. Pure, SSR-safe guards used by hooks/services.

/** True when running in a browser (false during SSG pre-render). */
export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/** Whether the user asked the OS to reduce motion. Safe during SSG (returns false). */
export function prefersReducedMotion(): boolean {
  if (!isBrowser || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Clamp a number to a range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
