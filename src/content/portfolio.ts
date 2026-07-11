// Portfolio copy — from design-handoff/Portfolio OddWave.dc.html. The cover data
// + the interactive rack player live in content/portfolioSynth.ts (the embedded
// "Portfolio Synth" object).

export const PORTFOLIO = {
  heroTitle: 'PORTFOLIO',
  heroIntro: 'Une sélection de masters, mixes et productions signés OddWaveStudio. Cliquez une pochette pour écouter.',
  ctaTitle: "Le prochain, c'est le vôtre.",
  ctaLabel: 'Nous contacter →',
} as const;

/** YouTube réalisations embedded under the synth rack. */
export interface PortfolioVideo {
  /** YouTube video id (the `v=` parameter). */
  readonly id: string;
  readonly title: string;
  readonly note: string;
}

export const PORTFOLIO_VIDEOS: readonly PortfolioVideo[] = [
  { id: '8bXkfoIFBXc', title: 'Alice 2049', note: 'Timagin Production' },
  { id: 'v98TYYpbjXo', title: 'Hadra : Utopies Ephémères', note: 'Film réalisé par Timothé Fournol' },
];
