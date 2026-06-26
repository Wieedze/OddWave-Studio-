// Portfolio Synth content — covers, channel filters, copy. Verbatim from
// design-handoff/Portfolio Synth.dc.html. Covers are placeholder gradient art;
// the audio is fully synthesized (no files), so titles drive the generated track.

export interface SynthCover {
  readonly title: string;
  readonly artist: string;
  readonly tag: string;
  /** Placeholder gradient art (CSS background). */
  readonly art: string;
}

const GRADS = [
  'linear-gradient(145deg,#C24E37,#5E2218)',
  'linear-gradient(145deg,#2A2D34,#14151A)',
  'linear-gradient(145deg,#7C5B3A,#33241A)',
  'linear-gradient(145deg,#1E3A44,#101D22)',
  'linear-gradient(145deg,#3A2E4A,#16121E)',
  'linear-gradient(145deg,#A8443A,#3A1714)',
  'linear-gradient(145deg,#4A4E57,#1C1E24)',
  'linear-gradient(145deg,#6E4A2E,#2A1B11)',
  'linear-gradient(145deg,#244640,#0F1D1A)',
  'linear-gradient(145deg,#52384E,#1E1420)',
  'linear-gradient(145deg,#C2683A,#4A2414)',
  'linear-gradient(145deg,#33363E,#16171C)',
];

const RAW: ReadonlyArray<Omit<SynthCover, 'art'>> = [
  { title: 'Nocturne', artist: 'Halv', tag: 'Master' },
  { title: 'Signal', artist: 'Kaya Renn', tag: 'Mix · Master' },
  { title: 'Braise', artist: 'OddWave', tag: 'Prod' },
  { title: 'Verticale', artist: 'Mire', tag: 'Master' },
  { title: 'Sève', artist: 'Loïc Â.', tag: 'Stem' },
  { title: 'Onde Courte', artist: 'Téo G.', tag: 'Mix · Master' },
  { title: 'Métal Doux', artist: 'Vael', tag: 'Master' },
  { title: 'Coude à Coude', artist: 'Les Frères', tag: 'Prod' },
  { title: 'Plein Sud', artist: 'Anouk', tag: 'Master' },
  { title: 'Cendre', artist: 'Norr', tag: 'Mix · Master' },
  { title: 'Cuivre', artist: 'OddWave', tag: 'EP · Master' },
  { title: 'Dérive', artist: 'Sael', tag: 'Master' },
];

export const SYNTH_COVERS: readonly SynthCover[] = RAW.map((c, i) => ({ ...c, art: GRADS[i % GRADS.length] }));

export interface ChannelFilter {
  readonly key: 'all' | 'Master' | 'Mix' | 'Prod';
  readonly label: string;
}

export const SYNTH_FILTERS: readonly ChannelFilter[] = [
  { key: 'all', label: 'TOUS' },
  { key: 'Master', label: 'MASTER' },
  { key: 'Mix', label: 'MIX' },
  { key: 'Prod', label: 'PROD' },
];

export const SYNTH = {
  brand: 'OddWave Studio',
  subtitle: 'RELEASE ARCHIVE',
  readoutIdle: 'CLIQUEZ UNE POCHETTE POUR ÉCOUTER',
  previewDur: 30,
  defaultGain: 0.9,
} as const;

/** Filter predicate matching the handoff's tag rules. */
export function matchesFilter(tag: string, key: ChannelFilter['key']): boolean {
  if (key === 'all') return true;
  if (key === 'Master') return /master/i.test(tag);
  if (key === 'Mix') return /mix/i.test(tag);
  if (key === 'Prod') return /prod/i.test(tag);
  return true;
}
