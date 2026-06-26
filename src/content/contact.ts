// Contact content — verbatim from design-handoff/Contact OddWave.dc.html.

export const CONTACT = {
  heroEyebrow: 'Contact · OddWave Studio',
  heroTitle: 'Parlons de votre son.',
  channelsLabel: 'En direct',
  note: 'Réponse sous 48h. Sessions à distance dans le monde entier, ou en résidence sur place pour les projets au long cours.',
  confirmTitle: 'Message envoyé.',
  confirmBody: 'Merci ! On a bien reçu votre demande et on revient vers vous très vite. À bientôt sur OddWave.',
  submitLabel: 'Envoyer la demande →',
} as const;

/** "Votre besoin" chips. Default selection is the first one. */
export const CONTACT_NEEDS: readonly string[] = [
  'Mastering',
  'Stem Mastering',
  'Mixage',
  'Accompagnement',
  'Sound design',
];

export interface ContactChannel {
  readonly label: string;
  readonly value: string;
  /** Link target; absent for the non-clickable "Le studio" row. */
  readonly href?: string;
  /** Opens in a new tab (Instagram). */
  readonly external?: boolean;
}

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  { label: 'Email', value: 'contact@oddwave.studio', href: 'mailto:contact@oddwave.studio' },
  { label: 'Instagram', value: '@oddwave.studio', href: 'https://instagram.com/oddwave.studio', external: true },
  { label: 'Le studio', value: 'France · sur rendez-vous' },
];
