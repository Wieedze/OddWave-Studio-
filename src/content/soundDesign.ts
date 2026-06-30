// Sound Design content — the client's real re-sound-design reels, served from
// IPFS (pinned via scripts/pin-to-pinata.sh). No mock/placeholder entries: every
// gallery item is a real, playable video.
//
// NOTE: the 4 .mov reels should be re-exported to .mp4 (H.264/AAC) for
// cross-browser playback (Chrome/Firefox do not reliably play .mov; Safari does).

import { VideoEntry } from '@/models';

export const SOUND_DESIGN = {
  heroEyebrow: "Donner une voix à l'image",
  heroTitle: 'SOUND DESIGN',
  soundLabel: 'Son',
  galleryTitle: 'Réalisations',
  ctaTitle: 'Un projet à sonoriser ?',
  ctaBody: "Jeu, film, pub ou scène : parlons de l'univers sonore que vous imaginez.",
  ctaLabel: 'Nous contacter →',
} as const;

// IPFS gateway for the pinned reels. Defaults to Pinata's public gateway; set
// VITE_IPFS_GATEWAY to your dedicated gateway (e.g. https://your-name.mypinata.cloud).
// VITE_IPFS_GATEWAY_TOKEN, if set, is appended as ?pinataGatewayToken=… so a
// restricted dedicated gateway can serve the videos.
//
// SECURITY: VITE_* vars are embedded in the public client bundle. Only ever put a
// *gateway access token* here (Pinata → Gateways, ideally domain-restricted) —
// NEVER the pinning JWT (it controls the whole Pinata account).
const IPFS_GATEWAY = ((import.meta.env.VITE_IPFS_GATEWAY as string | undefined) ?? 'https://gateway.pinata.cloud').replace(/\/+$/, '');
const IPFS_GATEWAY_TOKEN = import.meta.env.VITE_IPFS_GATEWAY_TOKEN as string | undefined;
const ipfs = (cid: string): string =>
  `${IPFS_GATEWAY}/ipfs/${cid}${IPFS_GATEWAY_TOKEN ? `?pinataGatewayToken=${IPFS_GATEWAY_TOKEN}` : ''}`;

/** Single swap point for video hosting — IPFS CIDs (pinned via scripts/pin-to-pinata.sh). */
export const VIDEO_SRC = {
  showreel: ipfs('bafybeihjkq2fnhoqlb2lztmzxrh7mcr6ty5jsee665xg5fcb4fxtmftiri'),
  unreal: ipfs('bafybeic3lnovl55fahuj6mildm4o2numqvx63jlnj7llb3jf6erbtdhy5i'),
  loveDeathRobots: ipfs('bafybeidw6nfcxd3ks7js2ot5ur5ns7pxwnm4kaxhgjvdpcv6cvqxq5ny5a'),
  witcher: ipfs('bafybeidomlwort3orhancygd2mvlw6d5ieqxlwwu7sui5gzlkdkj2qv7da'),
  irradiation: ipfs('bafybeiet2azf5ebvwb2ffzd3xxdzgfk3dgq6o7v6j4vxfmyywyh4grhude'),
  seaBeast: ipfs('bafybeidsa35nqhev7fchhqcb56l7cuuw3w6uywys6serj5zzlwuhzuj2ty'),
} as const;

/** Gallery entries. The client's real reels lead; durations on the real ones are
 *  approximate badges (the player shows the true length) — adjust if needed. */
export const SD_VIDEOS: readonly VideoEntry[] = [
  new VideoEntry('showreel', 'Showreel', 'Showreel', '1:00', 'Le condensé de nos réalisations en sound design.', '/assets/hero-large.jpg', VIDEO_SRC.showreel),
  new VideoEntry('unreal', 'Unreal', 'Re-sound design', '1:12', 'Re-sound design complet, démo (720p).', '/assets/stem-bokeh.jpg', VIDEO_SRC.unreal),
  new VideoEntry('love-death-robots', 'Love, Death & Robots', 'Série', '1:24', "Re-sound design d'une séquence, démo (720p).", '/assets/mastering-bokeh.jpg', VIDEO_SRC.loveDeathRobots),
  new VideoEntry('witcher', 'The Witcher · S3 E6', 'Série', '0:48', 'Re-sound design, extrait court.', '/assets/converter-blue.jpg', VIDEO_SRC.witcher),
  new VideoEntry('irradiation', 'Irradiation', 'Trailer', '0:40', 'Redesign sonore complet : court CG de Sava Zivkovic.', '/assets/sd-irradiation-poster.jpg', VIDEO_SRC.irradiation),
  new VideoEntry('sea-beast', 'The Sea Beast', 'Film', '0:40', "Redesign sonore : séquence du film d'animation.", '/assets/sd-seabeast-poster.jpg', VIDEO_SRC.seaBeast),
];
