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
  /** Release type (EP / Album / Single / Compilation). */
  readonly type?: string;
  /** Real cover art, e.g. '/assets/cover/<slug>.jpg'. */
  readonly image?: string;
  /** Spotify track URL or id, e.g. 'https://open.spotify.com/track/<id>' or '<id>'. */
  readonly spotify?: string;
}

// The real OddWave releases (generated from the cover images).
export { RELEASES as SYNTH_COVERS } from './portfolioReleases';

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
