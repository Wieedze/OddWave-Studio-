// SEO metadata per route: titles, descriptions and social tags consumed by
// the <Seo> component and SeoService. Machine-facing copy, not UI content.
// Location policy: the town (Auriol) lives in metadata only, never in the
// visible UI, and no street address is published anywhere.

import { LABEL_URL } from './navigation';
import type { Localized } from '@/helpers';

export const SITE_URL = 'https://oddwavestudio.com';
export const SITE_NAME = 'OddWave Studio';
export const SITE_EMAIL = 'contact@oddwave.studio';
export const SITE_INSTAGRAM = 'https://instagram.com/oddwave_studio';
export const OG_IMAGE_PATH = '/og.jpg';
/** The Google Business Profile place (found 2026-09-10, place ID ChIJfd3b6jmZyRIRoxDQN8GEMdw). */
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/?q=place_id:ChIJfd3b6jmZyRIRoxDQN8GEMdw';
export const OG_IMAGE_ALT: Localized<string> = {
  fr: "La console du studio OddWave, avec le logo et l'invitation Démarrons votre projet.",
  en: 'The OddWave studio desk, with the logo and the invitation to start your project.',
};

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

export type PageSeoKey =
  | 'home'
  | 'services'
  | 'equipment'
  | 'guidance'
  | 'soundDesign'
  | 'portfolio'
  | 'exports'
  | 'contact';

export const PAGE_SEO: Localized<Record<PageSeoKey, PageSeo>> = {
  fr: {
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
  },

  en: {
    home: {
      path: '/',
      title: 'Mixing and mastering studio near Marseille | OddWave Studio',
      description:
        'Recording studio in Auriol, between Marseille, Aubagne and Aix-en-Provence: mixing, mastering, production, sound design and artist coaching.',
    },
    services: {
      path: '/services',
      title: 'Mixing, mastering and music production | OddWave Studio',
      description:
        'Recording, mixing, stem mastering, mastering and music production across every genre, at the studio near Marseille and Aubagne or remotely.',
    },
    equipment: {
      path: '/equipment',
      title: 'The studio and its equipment | OddWave Studio',
      description:
        'OddWave Studio near Aubagne and Marseille: treated acoustics, precision monitoring and an analogue and digital chain for mixing and mastering.',
    },
    guidance: {
      path: '/guidance',
      title: 'Artist coaching and music mentoring | OddWave Studio',
      description:
        'Get better at music production, mixing and sound design: one to one coaching for artists, at the studio near Marseille or remotely.',
    },
    soundDesign: {
      path: '/sound-design',
      title: 'Sound design and sound creation | OddWave Studio',
      description:
        'Sound design for music, picture and interactive worlds: bespoke textures, ambiences and sonic identities.',
    },
    portfolio: {
      path: '/portfolio',
      title: 'Portfolio, artists and released work | OddWave Studio',
      description:
        'Productions, mixes and masters made at the studio: listen to the artists and projects that came through OddWave.',
    },
    exports: {
      path: '/exports',
      title: 'Audio export guide | OddWave Studio',
      description:
        'Preparing your files properly for mixing and mastering: formats, resolution and the export practices the studio recommends.',
    },
    contact: {
      path: '/contact',
      title: 'Contact | OddWave Studio',
      description:
        'Get in touch with OddWave Studio for mastering, mixing, production or coaching. Sessions at the studio near Marseille or remotely. We answer within 48 hours.',
    },
  },
};
