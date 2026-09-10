// Site-wide content: brand, footer sitemap, legal caption.

import { LABEL_URL, ROUTES } from './navigation';
import type { Localized } from '@/helpers';

/** The brand name never translates. */
export const SITE_NAME = 'OddWave Studio';

export interface FooterLink {
  readonly label: string;
  /** Canonical French route ("/services") or, when `external`, an absolute URL. */
  readonly to: string;
  readonly external?: boolean;
}

export interface FooterColumn {
  readonly heading: string;
  readonly links: readonly FooterLink[];
}

export interface SiteCopy {
  readonly tagline: string;
  readonly copyright: string;
  /** Accessible name of the footer sitemap nav. */
  readonly sitemapLabel: string;
  /** Accessible name of the language switch. */
  readonly languageLabel: string;
  readonly columns: readonly FooterColumn[];
}

export const SITE: Localized<SiteCopy> = {
  fr: {
    tagline: 'Précision & Chaleur',
    copyright: '© 2026 · Mastering · Production · Accompagnement',
    sitemapLabel: 'Plan du site',
    languageLabel: 'Choix de la langue',
    columns: [
      {
        heading: 'Studio',
        links: [
          { label: 'Studio', to: ROUTES.home },
          { label: 'Matériel', to: ROUTES.equipment },
        ],
      },
      {
        heading: 'Prestations',
        links: [
          { label: 'Services', to: ROUTES.services },
          { label: 'Accompagnement', to: ROUTES.guidance },
          { label: 'Sound design', to: ROUTES.soundDesign },
          { label: "Guide d'export", to: ROUTES.exports },
        ],
      },
      {
        heading: 'Travaux',
        links: [
          { label: 'Portfolio', to: ROUTES.portfolio },
          { label: 'Label', to: LABEL_URL, external: true },
        ],
      },
      {
        heading: 'Contact',
        links: [
          { label: 'Nous contacter', to: ROUTES.contact },
          { label: 'Demander un devis', to: `${ROUTES.home}#contact` },
        ],
      },
    ],
  },

  en: {
    tagline: 'Precision & Warmth',
    copyright: '© 2026 · Mastering · Production · Coaching',
    sitemapLabel: 'Site map',
    languageLabel: 'Choose a language',
    columns: [
      {
        heading: 'Studio',
        links: [
          { label: 'Studio', to: ROUTES.home },
          { label: 'Equipment', to: ROUTES.equipment },
        ],
      },
      {
        heading: 'Services',
        links: [
          { label: 'Services', to: ROUTES.services },
          { label: 'Coaching', to: ROUTES.guidance },
          { label: 'Sound design', to: ROUTES.soundDesign },
          { label: 'Export guide', to: ROUTES.exports },
        ],
      },
      {
        heading: 'Work',
        links: [
          { label: 'Portfolio', to: ROUTES.portfolio },
          { label: 'Label', to: LABEL_URL, external: true },
        ],
      },
      {
        heading: 'Contact',
        links: [
          { label: 'Get in touch', to: ROUTES.contact },
          { label: 'Request a quote', to: `${ROUTES.home}#contact` },
        ],
      },
    ],
  },
};
