// Portfolio copy — from design-handoff/Portfolio OddWave.dc.html. The cover data
// + the interactive rack player live in content/portfolioSynth.ts (the embedded
// "Portfolio Synth" object).

import type { Localized } from '@/helpers';

export interface PortfolioCopy {
  readonly heroTitle: string;
  readonly heroIntro: string;
  readonly ctaTitle: string;
  readonly ctaLabel: string;
}

export const PORTFOLIO: Localized<PortfolioCopy> = {
  fr: {
    heroTitle: 'PORTFOLIO',
    heroIntro: 'Une sélection de masters, mixes et productions signés OddWaveStudio. Cliquez sur une pochette pour écouter.',
    ctaTitle: "Le prochain, c'est le vôtre.",
    ctaLabel: 'Nous contacter →',
  },
  en: {
    heroTitle: 'PORTFOLIO',
    heroIntro: 'A selection of masters, mixes and productions signed OddWave Studio. Click a sleeve to listen.',
    ctaTitle: 'The next one is yours.',
    ctaLabel: 'Get in touch →',
  },
};
