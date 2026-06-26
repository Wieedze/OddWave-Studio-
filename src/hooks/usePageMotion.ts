// Wires the shared MotionService to a page root. Generic engine: hero image,
// hero title/eyebrow, scroll reveals, parallax. Pages opt in via data-* attrs.

import { useRef } from 'react';
import { MotionService, type MotionOptions } from '@/services';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function usePageMotion<T extends HTMLElement = HTMLDivElement>(
  options: MotionOptions = {},
) {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const service = new MotionService(ref.current, options).init();
    return () => service.destroy();
    // options is intentionally read once on mount; pages pass a stable literal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
