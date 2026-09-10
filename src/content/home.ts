// Home content — client feedback (July 2026): the landing presents the studio
// (introduction + history) before anything else. The French is the client's own
// copy, verbatim. The English is a written adaptation, not a literal
// translation, and is pending Théo's proofread (September 2026).

import type { Localized } from '@/helpers';

export interface HomeCopy {
  /** Bottom eyebrow line of the hero (kept from the landing handoff). */
  readonly heroEyebrow: string;
  /** Studio presentation + history, shown right under the hero as a split. */
  readonly introEyebrow: string;
  readonly intro: readonly string[];
}

/** Shared across both languages: the SSL console photo of the intro split. */
export const HOME_INTRO_IMAGE = '/assets/studio-hero-ssl.jpg';

export const HOME: Localized<HomeCopy> = {
  fr: {
    heroEyebrow: 'Production · Mixage · Mastering · Sound design',
    introEyebrow: 'Le studio · Depuis plus de 15 ans',
    intro: [
      "OddWave Studio est un studio de production musicale fort de plus de 15 ans d'expérience dans le domaine de l'audio.",
      "De la direction de production à la finalisation, en passant par l'enregistrement, le sound design, l'arrangement, le mixage et le mastering, le studio offre une gamme complète de services.",
      "Dirigé par l'ingénieur du son et musicien expérimenté Théo Grozdanic, vous serez accompagné de manière pédagogique et personnalisée dans vos projets.",
      "Conscient que chaque projet est unique, avec ses propres besoins, contraintes budgétaires et échéances, le studio s'adapte à chacune de ces réalités, à distance comme en présentiel.",
    ],
  },
  en: {
    heroEyebrow: 'Production · Mixing · Mastering · Sound design',
    introEyebrow: 'The studio · More than 15 years',
    intro: [
      'OddWave Studio is a music production studio built on more than fifteen years of experience in audio.',
      'From production direction through to the finished master, by way of recording, sound design, arrangement, mixing and mastering, the studio covers the whole range.',
      'It is run by Théo Grozdanic, an experienced sound engineer and musician, and every project is guided personally, with the reasoning explained along the way.',
      'Every project is different, with its own needs, budget and deadlines. The studio works around all three, remotely or on site.',
    ],
  },
};
