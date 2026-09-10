// Contact content — French verbatim from design-handoff/Contact OddWave.dc.html,
// English written alongside it. Form labels live here too, so no visible string
// is stranded inside a component.

import type { Localized } from '@/helpers';

export interface ContactChannel {
  readonly label: string;
  readonly value: string;
  /** Link target; absent for the non-clickable "studio" row. */
  readonly href?: string;
  /** Opens in a new tab (Instagram). */
  readonly external?: boolean;
}

export interface ContactFormCopy {
  readonly nameLabel: string;
  readonly namePlaceholder: string;
  readonly emailLabel: string;
  readonly emailPlaceholder: string;
  readonly needLabel: string;
  readonly projectLabel: string;
  readonly projectPlaceholder: string;
  readonly error: string;
  readonly sending: string;
}

export interface ContactCopy {
  readonly heroEyebrow: string;
  readonly heroTitle: string;
  readonly channelsLabel: string;
  readonly note: string;
  readonly confirmTitle: string;
  readonly confirmBody: string;
  readonly submitLabel: string;
  /** "Votre besoin" chips. The first one is selected by default. */
  readonly needs: readonly string[];
  readonly channels: readonly ContactChannel[];
  readonly form: ContactFormCopy;
}

const EMAIL = 'contact@oddwave.studio';
const INSTAGRAM = 'https://instagram.com/oddwave_studio';

export const CONTACT: Localized<ContactCopy> = {
  fr: {
    heroEyebrow: 'Contact · OddWave Studio',
    heroTitle: 'Parlons de votre son.',
    channelsLabel: 'En direct',
    note: 'Réponse sous 48h. Sessions à distance dans le monde entier, ou en résidence sur place pour les projets au long cours.',
    confirmTitle: 'Message envoyé.',
    confirmBody: 'Merci ! On a bien reçu votre demande et on revient vers vous très vite. À bientôt.',
    submitLabel: 'Envoyer la demande →',
    needs: ['Mastering', 'Stem Mastering', 'Mixage', 'Accompagnement', 'Sound design'],
    channels: [
      { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
      { label: 'Instagram', value: '@oddwave_studio', href: INSTAGRAM, external: true },
      { label: 'Le studio', value: 'France · sur rendez-vous' },
    ],
    form: {
      nameLabel: 'Nom',
      namePlaceholder: 'Votre nom',
      emailLabel: 'Email',
      emailPlaceholder: 'vous@email.com',
      needLabel: 'Votre besoin',
      projectLabel: 'Votre projet',
      projectPlaceholder: 'Parlez-nous du morceau, du nombre de titres, de vos délais, de vos références…',
      error: "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous à contact@oddwave.studio.",
      sending: 'Envoi…',
    },
  },

  en: {
    heroEyebrow: 'Contact · OddWave Studio',
    heroTitle: "Let's talk about your sound.",
    channelsLabel: 'Direct',
    note: 'We answer within 48 hours. Remote sessions anywhere in the world, or in residence on site for longer projects.',
    confirmTitle: 'Message sent.',
    confirmBody: 'Thank you. Your request has reached us and we will come back to you very soon. Talk soon.',
    submitLabel: 'Send the request →',
    needs: ['Mastering', 'Stem Mastering', 'Mixing', 'Coaching', 'Sound design'],
    channels: [
      { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
      { label: 'Instagram', value: '@oddwave_studio', href: INSTAGRAM, external: true },
      { label: 'The studio', value: 'France · by appointment' },
    ],
    form: {
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@email.com',
      needLabel: 'What you need',
      projectLabel: 'Your project',
      projectPlaceholder: 'Tell us about the track, how many titles, your deadlines, your references…',
      error: 'The message did not go through. Try again, or write to contact@oddwave.studio.',
      sending: 'Sending…',
    },
  },
};
