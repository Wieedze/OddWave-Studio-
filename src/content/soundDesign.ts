// Sound Design content — from design-handoff/Sound Design OddWave.dc.html, plus
// the client's real re-sound-design reels.
//
// VIDEO_SRC is the single swap point for hosting. Today the real reels point to
// the LOCAL files (work in dev; .mov only plays in Safari). After pinning with
// scripts/pin-to-pinata.sh, replace each value with its IPFS gateway URL, e.g.
//   showreel: 'https://<your-gateway>.mypinata.cloud/ipfs/<CID>'
// Only entries with a `src` play a real <video>; the rest are placeholder tiles.
//
// NOTE: the 4 .mov reels should be re-exported to .mp4 (H.264/AAC) for
// cross-browser playback (Chrome/Firefox do not reliably play .mov).

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

/** Single swap point for video hosting (local paths → IPFS gateway URLs). */
export const VIDEO_SRC = {
  showreel: '/assets/SHOWREEL%20SD%201m.mov',
  unreal: '/assets/UNREAL%20-%20Re-Sound%20Design%20D%C3%A9mo%20(720P).mov',
  loveDeathRobots: '/assets/LOVE%2C%20DEATH%20%26%20ROBOTS%20-%20Re-Sound%20Design%20D%C3%A9mo%20(720P).mov',
  witcher: '/assets/THE%20WITCHER%20S3%20E6%20-%20RESOUND%20(Short).mov',
  irradiation: '/assets/sd-irradiation.mp4',
  seaBeast: '/assets/sd-seabeast.mp4',
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
  new VideoEntry('atelier', "L'Atelier", 'Film', '3:12', 'Design sonore et mixage 5.1, long-métrage indépendant.', '/assets/cabin-large.jpg'),
  new VideoEntry('neon-drift', 'Neon Drift', 'Jeu vidéo', '1:54', 'Sound design interactif et boucles adaptatives.', '/assets/stem-bokeh.jpg'),
  new VideoEntry('aurea', 'Auréa Parfums', 'Publicité', '0:42', 'Habillage sonore et signature de marque.', '/assets/rack-ssl.jpg'),
  new VideoEntry('until-dawn', 'Until Dawn', 'Trailer', '1:28', 'Sonorisation et impacts pour bande-annonce AAA.', '/assets/genelec.jpg'),
  new VideoEntry('earthworm', 'EARTHWORM · Live AV', 'Habillage', '2:36', "Habillage sonore d'un set audiovisuel.", '/assets/cabin-mic.jpg'),
  new VideoEntry('petit-renard', 'Petit Renard', 'Autres', '4:05', "Bruitage et création sonore, court d'animation.", '/assets/elysia-row.jpg'),
  new VideoEntry('hors-saison', 'Hors-Saison', 'Film', '2:18', 'Ambiances et textures, court-métrage primé.', '/assets/converter-blue.jpg'),
  new VideoEntry('profondeurs', 'Profondeurs', 'Autres', '5:40', 'Création sonore, documentaire océanique.', '/assets/mastering-bokeh.jpg'),
  new VideoEntry('resonance', 'Résonance', 'Autres', '8:00', 'Installation sonore immersive multicanal.', '/assets/machine-tubetech.jpg'),
];
