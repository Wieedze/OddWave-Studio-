// ContactService — submits the Contact + Guidance forms to the pro inbox via
// Web3Forms (no backend). Set the access key (tied to your pro email at
// https://web3forms.com) as VITE_WEB3FORMS_KEY in the environment.

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

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export class ContactService {
  constructor(private readonly accessKey: string | undefined = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) {}

  async submit(data: ContactSubmission): Promise<SubmitResult> {
    const subject = data.formule
      ? `Demande d'accompagnement — ${data.formule}`
      : data.need
        ? `Contact — ${data.need}`
        : 'Nouvelle demande — OddWave Studio';

    // No key configured yet: don't block the UX during setup, but make it loud.
    if (!this.accessKey) {
      // eslint-disable-next-line no-console
      console.warn('[ContactService] VITE_WEB3FORMS_KEY is not set — submission not sent. Payload:', { ...data, subject });
      return { ok: true, error: 'missing-access-key' };
    }

    const payload: Record<string, string> = {
      access_key: this.accessKey,
      subject,
      from_name: 'OddWave Studio — site',
      name: data.name,
      email: data.email,
      message: data.project,
    };
    if (data.need) payload.besoin = data.need;
    if (data.formule) payload.formule = data.formule;

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { success?: boolean; message?: string };
      if (!json.success) return { ok: false, error: json.message ?? 'send-failed' };
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : 'network-error' };
    }
  }
}

/** Shared singleton instance. */
export const contactService = new ContactService();
