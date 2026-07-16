// Site-wide content: brand, footer sitemap, legal caption.

import { LABEL_URL, ROUTES } from './navigation';

export const SITE = {
  name: 'OddWave Studio',
  tagline: 'Précision & Chaleur',
  copyright: '© 2026 · Mastering · Production · Accompagnement',
} as const;

export interface FooterLink {
  readonly label: string;
  /** Internal route ("/services") or, when `external`, an absolute URL. */
  readonly to: string;
  readonly external?: boolean;
}

export interface FooterColumn {
  readonly heading: string;
  readonly links: readonly FooterLink[];
}

/** Footer sitemap, mirroring the landing footer. */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
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
] as const;
