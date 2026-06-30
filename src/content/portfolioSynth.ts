// Portfolio rack content — releases shown in the rack "screen". Clicking a cover
// opens the official Spotify embed (the audio streams from Spotify; nothing is
// hosted here). To go live, fill each entry's `image` (real cover art under
// /assets/covers/…) and `spotify` (the track URL or id). `art` is the gradient
// fallback shown until a real cover image is provided.

export interface SynthCover {
  readonly title: string;
  readonly artist: string;
  readonly tag: string;
  /** Gradient fallback (CSS background) shown when no cover image is set. */
  readonly art: string;
  /** Real cover art, e.g. '/assets/covers/nocturne.jpg'. */
  readonly image?: string;
  /** Spotify track URL or id, e.g. 'https://open.spotify.com/track/<id>' or '<id>'. */
  readonly spotify?: string;
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
