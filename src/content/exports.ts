// "Guide d'export" — the studio's export-preparation guide, reproduced from
// oddwavestudio.com/exports. The source publishes it as 6 A4 page images
// (1055×1491), served here from /public/assets/exports.
//
// The guide itself is a French document: the page images are the same in both
// languages, only the surrounding copy and the alt text are translated.

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
      { src: '/assets/exports/export-1.png', alt: 'OddWave export guide: cover' },
      { src: '/assets/exports/export-2.png', alt: 'Export guide: why your exports need preparing properly' },
      { src: '/assets/exports/export-3.png', alt: 'Export guide: stem mix and folder structure' },
      { src: '/assets/exports/export-4.png', alt: 'Export guide: page 4' },
      { src: '/assets/exports/export-5.png', alt: 'Export guide: page 5' },
      { src: '/assets/exports/export-6.png', alt: 'Export guide: technical recommendations, audio format and file naming' },
    ],
  },
};
