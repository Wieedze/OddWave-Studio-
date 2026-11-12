// TurnstileService — Cloudflare Turnstile (bot check) for the contact forms.
// Loads Cloudflare's script once, on demand, and renders a widget into a given
// element. The widget runs in "interaction-only" mode: invisible for nearly
// every visitor, it only shows a checkbox when Cloudflare is unsure.
// The token it yields is verified server-side by worker/contact.ts.
//
// Disabled while TURNSTILE_SITE_KEY is empty: no script, no widget, and the
// Worker skips the check as long as its TURNSTILE_SECRET is not set either.

import { isBrowser } from '@/helpers';

/** Public site key (Cloudflare dashboard → Turnstile → widget for
 * oddwavestudio.com). Public by design, it ships in the client bundle. */
export const TURNSTILE_SITE_KEY = '0x4AAAAAAF9_lw2bBblAsFOx';

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileRenderOptions {
  sitekey: string;
  appearance: 'always' | 'execute' | 'interaction-only';
  theme: 'light' | 'dark' | 'auto';
  language: string;
  callback: (token: string) => void;
  'expired-callback': () => void;
  'error-callback': () => void;
}

interface TurnstileApi {
  render(element: HTMLElement, options: TurnstileRenderOptions): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export interface TurnstileHandlers {
  language: string;
  onToken: (token: string) => void;
  onExpire: () => void;
}

export class TurnstileService {
  private loading: Promise<TurnstileApi> | null = null;

  constructor(private readonly siteKey: string = TURNSTILE_SITE_KEY) {}

  get enabled(): boolean {
    return this.siteKey !== '' && isBrowser;
  }

  private load(): Promise<TurnstileApi> {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (this.loading) return this.loading;
    this.loading = new Promise<TurnstileApi>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile-missing')));
      script.onerror = () => {
        this.loading = null;
        reject(new Error('turnstile-load-failed'));
      };
      document.head.appendChild(script);
    });
    return this.loading;
  }

  /** Renders a widget and resolves to a disposer (removes the widget) plus a
   * reset (asks for a fresh token: each token is single-use). */
  async mount(element: HTMLElement, handlers: TurnstileHandlers): Promise<{ reset: () => void; dispose: () => void }> {
    const api = await this.load();
    const widgetId = api.render(element, {
      sitekey: this.siteKey,
      appearance: 'interaction-only',
      theme: 'dark',
      language: handlers.language,
      callback: handlers.onToken,
      'expired-callback': handlers.onExpire,
      'error-callback': handlers.onExpire,
    });
    return {
      reset: () => api.reset(widgetId),
      dispose: () => api.remove(widgetId),
    };
  }
}

/** Shared singleton instance. */
export const turnstileService = new TurnstileService();
