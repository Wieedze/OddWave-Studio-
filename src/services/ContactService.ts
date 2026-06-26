// ContactService — handles Contact + Guidance form submissions.
// TODO backend: wire `submit` to a real endpoint or email service. For now it
// resolves successfully after a short delay and logs the payload.

export interface ContactSubmission {
  name: string;
  email: string;
  project: string;
  /** Contact page: chosen "besoin" chip. */
  need?: string;
  /** Guidance page: chosen "formule". */
  formule?: string;
}

export class ContactService {
  async submit(data: ContactSubmission): Promise<void> {
    // TODO backend: replace this stub with a real network call.
    // eslint-disable-next-line no-console
    console.log('[ContactService] TODO backend — submission received:', data);
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
}

/** Shared singleton instance. */
export const contactService = new ContactService();
