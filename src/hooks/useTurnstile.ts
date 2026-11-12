// useTurnstile — mounts the Turnstile widget (TurnstileService) into a form and
// hands back its token. `getToken()` waits for the token if the visitor submits
// before Cloudflare has finished its check (usually under a second), so a fast
// human is never rejected. Inactive (getToken resolves undefined) while the
// site key is empty.

import { useEffect, useRef, type RefObject } from 'react';
import { turnstileService } from '@/services';
import { useLocale } from './useLocale';

const TOKEN_WAIT_MS = 15000;

export interface TurnstileHandle {
  containerRef: RefObject<HTMLDivElement | null>;
  getToken: () => Promise<string | undefined>;
  /** Call after each submit attempt: a token is valid once only. */
  reset: () => void;
}

export function useTurnstile(): TurnstileHandle {
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const token = useRef<string | null>(null);
  const waiters = useRef<((value: string | undefined) => void)[]>([]);
  const widget = useRef<{ reset: () => void; dispose: () => void } | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!turnstileService.enabled || !element) return;
    let cancelled = false;

    turnstileService
      .mount(element, {
        language: locale,
        onToken: (value) => {
          token.current = value;
          waiters.current.splice(0).forEach((resolve) => resolve(value));
        },
        onExpire: () => {
          token.current = null;
        },
      })
      .then((handle) => {
        if (cancelled) handle.dispose();
        else widget.current = handle;
      })
      // Script blocked or offline: the Worker will refuse the submit and the
      // form shows its usual error message.
      .catch(() => undefined);

    return () => {
      cancelled = true;
      widget.current?.dispose();
      widget.current = null;
    };
  }, [locale]);

  return {
    containerRef,
    getToken: () => {
      if (!turnstileService.enabled) return Promise.resolve(undefined);
      if (token.current) return Promise.resolve(token.current);
      return new Promise((resolve) => {
        waiters.current.push(resolve);
        setTimeout(() => resolve(undefined), TOKEN_WAIT_MS);
      });
    },
    reset: () => {
      token.current = null;
      widget.current?.reset();
    },
  };
}
