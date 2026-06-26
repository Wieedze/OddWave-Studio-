// Sound Design content — verbatim from design-handoff/Sound Design OddWave.dc.html.
// Video `src` values are the swap point for hosting: local /assets paths today,
// replace with IPFS gateway URLs (or a CDN) when the client supplies final media.
// Only entries with a `src` play a real <video>; the rest are placeholder tiles.

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

/** Gallery entries (the handoff's featured index 0 is not rendered in this layout). */
export const SD_VIDEOS: readonly VideoEntry[] = [
  new VideoEntry('irradiation', 'Irradiation', 'Trailer', '0:40', 'Redesign sonore complet : court CG de Sava Zivkovic.', '/assets/sd-irradiation-poster.jpg', '/assets/sd-irradiation.mp4'),
  new VideoEntry('sea-beast', 'The Sea Beast', 'Film', '0:40', "Redesign sonore : séquence du film d'animation.", '/assets/sd-seabeast-poster.jpg', '/assets/sd-seabeast.mp4'),
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
