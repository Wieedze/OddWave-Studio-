// Site-wide content: brand, footer sitemap, legal caption.

import { ROUTES } from './navigation';

export const SITE = {
  name: 'OddWave Studio',
  tagline: 'Précision & Chaleur',
  copyright: '© 2026 · Mastering · Production · Accompagnement',
} as const;

export interface FooterLink {
  readonly label: string;
  readonly to: string;
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
      { label: 'Studio', to: ROUTES.studio },
      { label: 'Matériel', to: ROUTES.equipment },
    ],
  },
  {
    heading: 'Prestations',
    links: [
      { label: 'Accompagnement', to: ROUTES.guidance },
      { label: 'Sound design', to: ROUTES.soundDesign },
    ],
  },
  {
    heading: 'Travaux',
    links: [{ label: 'Portfolio', to: ROUTES.portfolio }],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Nous contacter', to: ROUTES.contact },
      { label: 'Demander un devis', to: `${ROUTES.home}#contact` },
    ],
  },
] as const;
