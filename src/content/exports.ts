// "Guide d'export" — the studio's export-preparation guide, reproduced from
// oddwavestudio.com/exports. The source publishes it as 6 A4 page images
// (1055×1491), served here from /public/assets/exports.

export interface ExportPage {
  readonly src: string;
  readonly alt: string;
}

export const EXPORTS = {
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
  ] satisfies ExportPage[],
} as const;
