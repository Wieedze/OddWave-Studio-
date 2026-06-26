// Portfolio content — covers + copy from design-handoff/Portfolio OddWave.dc.html.
// NOTE: the shipped .dc.html markup embedded the standalone "Portfolio Synth"
// experiment; per the documented intent (a discography cover wall) and the cover
// data present in that file, we build the cover wall. The covers are placeholder
// gradient art — to be replaced by the real cover images (Dropbox) later.

export const PORTFOLIO = {
  heroTitle: 'LE PORTFOLIO',
  heroIntro: 'Une sélection de masters, mixes et productions signés OddWaveStudio. Cliquez une pochette pour écouter.',
  ctaTitle: "Le prochain, c'est le vôtre.",
  ctaLabel: 'Nous contacter →',
} as const;

export interface Cover {
  readonly title: string;
  readonly artist: string;
  readonly tag: string;
  /** Placeholder gradient art (CSS background). */
  readonly art: string;
}

export const COVERS: readonly Cover[] = [
  { title: 'Nocturne', artist: 'Halv', tag: 'Master', art: 'linear-gradient(145deg,#C24E37,#5E2218)' },
  { title: 'Signal', artist: 'Kaya Renn', tag: 'Mix · Master', art: 'linear-gradient(145deg,#2A2D34,#14151A)' },
  { title: 'Braise', artist: 'OddWave', tag: 'Production', art: 'linear-gradient(145deg,#7C5B3A,#33241A)' },
  { title: 'Verticale', artist: 'Mire', tag: 'Master', art: 'linear-gradient(145deg,#1E3A44,#101D22)' },
  { title: 'Sève', artist: 'Loïc Â.', tag: 'Stem Master', art: 'linear-gradient(145deg,#3A2E4A,#16121E)' },
  { title: 'Onde Courte', artist: 'Téo G.', tag: 'Mix · Master', art: 'linear-gradient(145deg,#A8443A,#3A1714)' },
  { title: 'Métal Doux', artist: 'Vael', tag: 'Master', art: 'linear-gradient(145deg,#4A4E57,#1C1E24)' },
  { title: 'Coude à Coude', artist: 'Les Frères', tag: 'Production', art: 'linear-gradient(145deg,#6E4A2E,#2A1B11)' },
  { title: 'Plein Sud', artist: 'Anouk', tag: 'Master', art: 'linear-gradient(145deg,#244640,#0F1D1A)' },
  { title: 'Cendre', artist: 'Norr', tag: 'Mix · Master', art: 'linear-gradient(145deg,#52384E,#1E1420)' },
  { title: 'Cuivre', artist: 'OddWave', tag: 'EP · Master', art: 'linear-gradient(145deg,#C2683A,#4A2414)' },
  { title: 'Dérive', artist: 'Sael', tag: 'Master', art: 'linear-gradient(145deg,#33363E,#16171C)' },
];
