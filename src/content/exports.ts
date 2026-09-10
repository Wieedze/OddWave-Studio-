// "Guide d'export" — the studio's export-preparation guide, reproduced from
// oddwavestudio.com/exports. Published as 6 A4 page images (1055×1491) served
// from /public/assets/exports.
//
// The guide exists in both languages: export-N.png is the French document,
// export-en-N.png the English one (rendered from the studio's EN PDF,
// September 2026). Each locale shows its own set.

import type { Localized } from '@/helpers';

export interface ExportPage {
  readonly src: string;
  readonly alt: string;
}

export interface ExportsCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly pages: readonly ExportPage[];
}

export const EXPORTS: Localized<ExportsCopy> = {
  fr: {
    eyebrow: 'Guide',
    title: "Guide d'export",
    intro: 'Un export bien préparé est la première étape vers un mixage et un mastering de haute qualité.',
    pages: [
      { src: '/assets/exports/export-1.png', alt: "Guide d'export OddWave — couverture" },
      { src: '/assets/exports/export-2.png', alt: "Guide d'export — pourquoi préparer correctement vos exports" },
      { src: '/assets/exports/export-3.png', alt: "Guide d'export — stem mix, organisation des dossiers" },
      { src: '/assets/exports/export-4.png', alt: "Guide d'export — page 4" },
      { src: '/assets/exports/export-5.png', alt: "Guide d'export — page 5" },
      { src: '/assets/exports/export-6.png', alt: "Guide d'export — recommandations techniques (format audio, nommage)" },
    ],
  },
  en: {
    eyebrow: 'Guide',
    title: 'Export guide',
    intro: 'A well prepared export is the first step towards a high quality mix and master.',
    pages: [
      { src: '/assets/exports/export-en-1.png', alt: 'OddWave export guide: cover, prepare your files for mixing and mastering' },
      { src: '/assets/exports/export-en-2.png', alt: 'Export guide: why prepare your exports correctly, the essentials' },
      { src: '/assets/exports/export-en-3.png', alt: 'Export guide: stem mix, 30 tracks maximum, folder organization' },
      { src: '/assets/exports/export-en-4.png', alt: 'Export guide: stem mastering, 7 stems maximum, typical distribution' },
      { src: '/assets/exports/export-en-5.png', alt: 'Export guide: dry and wet versions for more flexibility' },
      { src: '/assets/exports/export-en-6.png', alt: 'Export guide: technical recommendations, audio format, volumes and naming' },
    ],
  },
};
