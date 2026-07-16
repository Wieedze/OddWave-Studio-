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
  heroIntro: "Un extrait des différents travaux de son à l'image réalisés au studio.",
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

/** Single swap point for video hosting — IPFS CIDs (pinned via scripts/pin-to-pinata.sh).
 *  The 4 reels are the web-optimized .mp4 (H.264/AAC) versions. */
export const VIDEO_SRC = {
  showreel: ipfs('bafybeifxvfydidqclvoan5fxbepmxk6is7olxxibihq6y3hgmj5ibb27ze'),
  unreal: ipfs('bafybeibsicarnfv5bamzrhuq5qomn7m6bzkv6b64e7fbrpx53lthnon6oa'),
  loveDeathRobots: ipfs('bafybeickbaopymtoz4ubc7jdeukn3npwxnsbsfzy3bmuupgh7taghmmgya'),
  witcher: ipfs('bafybeiebw5mwnq577w2dr2im6t2xf2wnxgdafpdqx6x4lapfjtet334wy4'),
  irradiation: ipfs('bafybeiet2azf5ebvwb2ffzd3xxdzgfk3dgq6o7v6j4vxfmyywyh4grhude'),
  seaBeast: ipfs('bafybeidsa35nqhev7fchhqcb56l7cuuw3w6uywys6serj5zzlwuhzuj2ty'),
} as const;

/** Gallery entries. The client's real reels lead; durations on the real ones are
 *  approximate badges (the player shows the true length) — adjust if needed. */
export const SD_VIDEOS: readonly VideoEntry[] = [
  new VideoEntry('showreel', 'Showreel', 'Showreel', '1:01', 'Le condensé de nos réalisations en sound design.', '/assets/showreel-poster.jpg', VIDEO_SRC.showreel),
  new VideoEntry('unreal', 'Unreal', 'Re-sound design', '2:04', 'Re-sound design complet, démo.', '/assets/unreal-poster.jpg', VIDEO_SRC.unreal),
  new VideoEntry('love-death-robots', 'Love, Death & Robots', 'Série', '1:11', "Re-sound design d'une séquence, démo.", '/assets/love-death-robots-poster.jpg', VIDEO_SRC.loveDeathRobots),
  new VideoEntry('witcher', 'The Witcher · S3 E6', 'Série', '0:46', 'Re-sound design, extrait court.', '/assets/witcher-poster.jpg', VIDEO_SRC.witcher),
  new VideoEntry('irradiation', 'Irradiation', 'Trailer', '0:40', 'Redesign sonore complet : court CG de Sava Zivkovic.', '/assets/sd-irradiation-poster.jpg', VIDEO_SRC.irradiation),
  new VideoEntry('sea-beast', 'The Sea Beast', 'Film', '0:40', "Redesign sonore : séquence du film d'animation.", '/assets/sd-seabeast-poster.jpg', VIDEO_SRC.seaBeast),
  new VideoEntry('alice-2049', 'Alice 2049', 'Court métrage', '2:20', 'Réalisation Timagin Production.', 'https://i.ytimg.com/vi/8bXkfoIFBXc/maxresdefault.jpg', undefined, '8bXkfoIFBXc'),
  new VideoEntry('hadra-utopies', 'Hadra : Utopies Ephémères', 'Film', '1:06:00', 'Film réalisé par Timothé Fournol.', 'https://i.ytimg.com/vi/v98TYYpbjXo/maxresdefault.jpg', undefined, 'v98TYYpbjXo'),
];
