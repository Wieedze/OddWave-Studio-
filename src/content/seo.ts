// SEO metadata per route: titles, descriptions and social tags consumed by
// the <Seo> component and SeoService. Machine-facing copy, not UI content.
// Location policy: the town (Auriol) lives in metadata only, never in the
// visible UI, and no street address is published anywhere.

import { LABEL_URL } from './navigation';

export const SITE_URL = 'https://oddwavestudio.com';
export const SITE_NAME = 'OddWave Studio';
export const SITE_EMAIL = 'contact@oddwave.studio';
export const SITE_INSTAGRAM = 'https://instagram.com/oddwave_studio';
export const OG_IMAGE_PATH = '/og.jpg';
/** The Google Business Profile place (found 2026-09-10, place ID ChIJfd3b6jmZyRIRoxDQN8GEMdw). */
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/?q=place_id:ChIJfd3b6jmZyRIRoxDQN8GEMdw';
export const OG_IMAGE_ALT =
  "La console du studio OddWave, avec le logo et l'invitation Démarrons votre projet.";

/** Public profiles tied to the studio entity (JSON-LD sameAs). Verified live
 *  on 2026-09-10; Instagram is @oddwave_studio (underscore), Max confirmed. */
export const SITE_SAME_AS: readonly string[] = [
  SITE_INSTAGRAM,
  LABEL_URL,
  'https://www.facebook.com/oddwavestudio',
  'https://www.youtube.com/@OddWaveStudio',
  'https://www.twitch.tv/oddwave_studio',
  'https://www.discogs.com/label/1536595-OddWave-Studio',
];

/** Where the studio sits and the area it serves (metadata + JSON-LD only). */
export const SERVICE_AREA = {
  locality: 'Auriol',
  postalCode: '13390',
  region: "Provence-Alpes-Côte d'Azur",
  country: 'FR',
  cities: ['Marseille', 'Aubagne', 'Aix-en-Provence', 'La Ciotat', 'Toulon'],
  departments: ['Bouches-du-Rhône', 'Var'],
} as const;

export interface PageSeo {
  /** Route path as declared in routes.tsx. */
  readonly path: string;
  /** Document title (target: under 60 to 65 characters). */
  readonly title: string;
  /** Meta description (target: under 160 characters). */
  readonly description: string;
}

export const PAGE_SEO = {
  home: {
    path: '/',
    title: 'Studio de mixage et mastering près de Marseille | OddWave Studio',
    description:
      "Studio d'enregistrement à Auriol, entre Marseille, Aubagne et Aix-en-Provence : mixage, mastering, production, sound design et accompagnement d'artistes.",
  },
  services: {
    path: '/services',
    title: 'Mixage, mastering et production musicale | OddWave Studio',
    description:
      'Enregistrement, mixage, stem mastering, mastering et production musicale pour tous les genres, au studio près de Marseille et Aubagne ou à distance.',
  },
  equipment: {
    path: '/equipment',
    title: 'Le studio et le matériel | OddWave Studio',
    description:
      "Le studio OddWave près d'Aubagne et Marseille : acoustique traitée, écoute de précision et chaîne analogique et numérique pour le mixage et le mastering.",
  },
  guidance: {
    path: '/guidance',
    title: "Accompagnement d'artistes et coaching musical | OddWave Studio",
    description:
      'Progressez en production musicale, en mixage et en sound design : un accompagnement personnalisé pour artistes, au studio près de Marseille ou à distance.',
  },
  soundDesign: {
    path: '/sound-design',
    title: 'Sound design et création sonore | OddWave Studio',
    description:
      "Sound design et création sonore pour la musique, l'image et les univers interactifs : textures, ambiances et identités sonores sur mesure.",
  },
  portfolio: {
    path: '/portfolio',
    title: 'Portfolio, artistes et réalisations | OddWave Studio',
    description:
      'Productions, mixages et masterings réalisés au studio : écoutez les artistes et les projets passés par OddWave.',
  },
  exports: {
    path: '/exports',
    title: "Guide d'export audio | OddWave Studio",
    description:
      "Bien préparer ses fichiers pour le mixage et le mastering : formats, résolution et bonnes pratiques d'export recommandées par le studio.",
  },
  contact: {
    path: '/contact',
    title: 'Contact | OddWave Studio',
    description:
      'Contactez OddWave Studio pour un mastering, un mixage, une production ou un accompagnement. Sessions au studio près de Marseille ou à distance. Réponse sous 48h.',
  },
} as const satisfies Record<string, PageSeo>;

export type PageSeoKey = keyof typeof PAGE_SEO;
