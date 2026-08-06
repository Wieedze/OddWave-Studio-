// ContactService — submits the Contact + Guidance forms to the studio inbox.
// The browser POSTs the form data to the same-origin Pages Function
// `/api/contact`, which sends the email through the Cloudflare Email Service
// REST API. All credentials stay server-side in the Pages project env — nothing
// sensitive ships in the client bundle. See functions/api/contact.ts.

export interface ContactSubmission {
  name: string;
  email: string;
  project: string;
  /** Contact page: chosen "besoin" chip. */
  need?: string;
  /** Guidance page: chosen "formule". */
  formule?: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

const CONTACT_ENDPOINT = '/api/contact';

export class ContactService {
  constructor(private readonly endpoint: string = CONTACT_ENDPOINT) {}

  async submit(data: ContactSubmission): Promise<SubmitResult> {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });

      // Plain `vite` dev serves no Pages Functions: don't block the UX while
      // testing the form locally without `wrangler pages dev`.
      if (res.status === 404) {
        // eslint-disable-next-line no-console
        console.warn('[ContactService] /api/contact not found — run `wrangler pages dev` to exercise it. Payload:', data);
        return { ok: true, error: 'endpoint-missing' };
      }

      const json = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
      if (!res.ok || !json.success) return { ok: false, error: json.error ?? `http-${res.status}` };
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'network-error' };
    }
  }
}

/** Shared singleton instance. */
export const contactService = new ContactService();
