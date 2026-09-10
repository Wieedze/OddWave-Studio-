// Sound Design content — the client's real re-sound-design reels, served from
// IPFS (pinned via scripts/pin-to-pinata.sh). No mock/placeholder entries: every
// gallery item is a real, playable video.
//
// Client feedback (September 2026): the Witcher démo opens the gallery, and the
// short piece carries its real name.
//
// Titles, posters and sources are the same in both languages (they are proper
// nouns and media paths); only the category and the credit line are translated.

import { VideoEntry } from '@/models';
import type { Localized, Locale } from '@/helpers';

export interface SoundDesignCopy {
  readonly heroEyebrow: string;
  readonly heroTitle: string;
  readonly heroIntro: string;
  readonly soundLabel: string;
  readonly galleryTitle: string;
  readonly ctaTitle: string;
  readonly ctaBody: string;
  readonly ctaLabel: string;
}

export const SOUND_DESIGN: Localized<SoundDesignCopy> = {
  fr: {
    heroEyebrow: "Donner une voix à l'image",
    heroTitle: 'SOUND DESIGN',
    heroIntro: "Un extrait des différents travaux de son à l'image réalisés au studio.",
    soundLabel: 'Son',
    galleryTitle: 'Réalisations',
    ctaTitle: 'Un projet à sonoriser ?',
    ctaBody: "Jeu, film, pub ou scène : parlons de l'univers sonore que vous imaginez.",
    ctaLabel: 'Nous contacter →',
  },
  en: {
    heroEyebrow: 'Giving the picture a voice',
    heroTitle: 'SOUND DESIGN',
    heroIntro: 'A sample of the sound to picture work done at the studio.',
    soundLabel: 'Sound',
    galleryTitle: 'Selected work',
    ctaTitle: 'Something that needs sound?',
    ctaBody: 'Game, film, advert or stage: tell us about the sound world you have in mind.',
    ctaLabel: 'Get in touch →',
  },
};

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
  showreel: ipfs('bafybeifxvfydidqclvoan5fxbepmxk6is7olxxibihq6y3hgmj5ibb27ze'),
  unreal: ipfs('bafybeibsicarnfv5bamzrhuq5qomn7m6bzkv6b64e7fbrpx53lthnon6oa'),
  loveDeathRobots: ipfs('bafybeickbaopymtoz4ubc7jdeukn3npwxnsbsfzy3bmuupgh7taghmmgya'),
  witcher: ipfs('bafybeiebw5mwnq577w2dr2im6t2xf2wnxgdafpdqx6x4lapfjtet334wy4'),
  // NOT PINNED YET. The file lives at public/assets/witcher-demo.mp4 (gitignored),
  // so this plays in dev but 404s in production. Run
  //   bash scripts/pin-to-pinata.sh witcher-demo.mp4
  // then replace this line with ipfs('<CID>') BEFORE the next deploy.
  witcherDemo: '/assets/witcher-demo.mp4',
  irradiation: ipfs('bafybeiet2azf5ebvwb2ffzd3xxdzgfk3dgq6o7v6j4vxfmyywyh4grhude'),
  seaBeast: ipfs('bafybeidsa35nqhev7fchhqcb56l7cuuw3w6uywys6serj5zzlwuhzuj2ty'),
} as const;

/** Category and credit line, keyed so both languages stay in step. */
type CatKey = 'demo' | 'short' | 'documentary' | 'reSound';
type NoteKey = 'showreel' | 'aliceCredits' | 'hadraCredits' | 'reSoundCredits';

const CAT: Localized<Record<CatKey, string>> = {
  fr: { demo: 'Démo', short: 'Court métrage', documentary: 'Film reportage', reSound: 'Re Sound Design' },
  en: { demo: 'Demo', short: 'Short film', documentary: 'Documentary', reSound: 'Re Sound Design' },
};

const NOTE: Localized<Record<NoteKey, string>> = {
  fr: {
    showreel: 'Le condensé de nos réalisations en sound design.',
    aliceCredits: 'Sound Design, Mixing, Mastering',
    hadraCredits: 'Sound Design, Bande originale, Voix Off',
    reSoundCredits: 'Sound Design, Sfx, Background, Foley, Mixage',
  },
  en: {
    showreel: 'A condensed reel of the studio sound design work.',
    aliceCredits: 'Sound Design, Mixing, Mastering',
    hadraCredits: 'Sound Design, Original score, Voice-over',
    reSoundCredits: 'Sound Design, Sfx, Background, Foley, Mixing',
  },
};

interface VideoMedia {
  readonly id: string;
  readonly title: string;
  readonly cat: CatKey;
  readonly dur: string;
  readonly note: NoteKey;
  readonly posterImg: string;
  readonly src?: string;
  readonly youtubeId?: string;
}

/** Order comes from the client: the Witcher démo opens the gallery (September
 *  2026), then the showreel, the real productions, then the re-sound pieces. */
const VIDEO_MEDIA: readonly VideoMedia[] = [
  { id: 'witcher-demo', title: 'THE WITCHER - Re-Sound Design Démo', cat: 'reSound', dur: '1:59', note: 'reSoundCredits', posterImg: '/assets/witcher-demo-poster.jpg', src: VIDEO_SRC.witcherDemo },
  { id: 'showreel', title: 'Showreel', cat: 'demo', dur: '1:01', note: 'showreel', posterImg: '/assets/showreel-poster.jpg', src: VIDEO_SRC.showreel },
  { id: 'alice-2049', title: 'Alice 2049', cat: 'short', dur: '2:20', note: 'aliceCredits', posterImg: 'https://i.ytimg.com/vi/8bXkfoIFBXc/maxresdefault.jpg', youtubeId: '8bXkfoIFBXc' },
  { id: 'hadra-utopies', title: 'Hadra : Utopies Ephémères', cat: 'documentary', dur: '1:06:00', note: 'hadraCredits', posterImg: 'https://i.ytimg.com/vi/v98TYYpbjXo/maxresdefault.jpg', youtubeId: 'v98TYYpbjXo' },
  { id: 'witcher', title: 'THE WITCHER S3 E6 - RESOUND (Short)', cat: 'reSound', dur: '0:46', note: 'reSoundCredits', posterImg: '/assets/witcher-poster.jpg', src: VIDEO_SRC.witcher },
  { id: 'unreal', title: 'Unreal', cat: 'reSound', dur: '2:04', note: 'reSoundCredits', posterImg: '/assets/unreal-poster.jpg', src: VIDEO_SRC.unreal },
  { id: 'love-death-robots', title: 'Love, Death & Robots', cat: 'reSound', dur: '1:11', note: 'reSoundCredits', posterImg: '/assets/love-death-robots-poster.jpg', src: VIDEO_SRC.loveDeathRobots },
  { id: 'irradiation', title: 'Irradiation', cat: 'reSound', dur: '0:40', note: 'reSoundCredits', posterImg: '/assets/sd-irradiation-poster.jpg', src: VIDEO_SRC.irradiation },
  { id: 'sea-beast', title: 'The Sea Beast', cat: 'reSound', dur: '0:40', note: 'reSoundCredits', posterImg: '/assets/sd-seabeast-poster.jpg', src: VIDEO_SRC.seaBeast },
];

function buildVideos(locale: Locale): readonly VideoEntry[] {
  return VIDEO_MEDIA.map(
    (media) =>
      new VideoEntry(
        media.id,
        media.title,
        CAT[locale][media.cat],
        media.dur,
        NOTE[locale][media.note],
        media.posterImg,
        media.src,
        media.youtubeId,
      ),
  );
}

export const SD_VIDEOS: Localized<readonly VideoEntry[]> = {
  fr: buildVideos('fr'),
  en: buildVideos('en'),
};
