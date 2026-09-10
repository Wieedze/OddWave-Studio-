// Le Matériel content — from design-handoff/Materiel OddWave.dc.html, minus the
// captions and the detail close-ups (client feedback, July 2026), and with the
// featured pieces replaced by an atmosphere mosaic (September 2026).
//
// The inventory itself is declared once: product names and manufacturer links
// are the same in every language, so only the category labels and the short
// tags are translated, through the two maps below. Duplicating the whole list
// per language would be six kilobytes of guaranteed drift.

import { Photo } from '@/models';
import type { Localized, Locale } from '@/helpers';

export interface EquipmentCopy {
  readonly heroTitle: string;
  readonly heroEyebrow: string;
  readonly inventoryTitle: string;
  readonly ctaTitle: string;
  readonly ctaBody: string;
  readonly ctaLabel: string;
  /** Accessible name of a mosaic tile, around the photo description. */
  readonly enlargeLabel: (alt: string) => string;
}

export const EQUIPMENT: Localized<EquipmentCopy> = {
  fr: {
    heroTitle: 'MATÉRIEL',
    heroEyebrow: 'La liste complète',
    inventoryTitle: "L'inventaire complet",
    ctaTitle: 'Un projet en tête ?',
    ctaBody: 'Dites-nous ce que vous cherchez à faire : on définit ensemble la meilleure chaîne pour votre son.',
    ctaLabel: 'Nous contacter →',
    enlargeLabel: (alt) => `Agrandir : ${alt}`,
  },
  en: {
    heroTitle: 'EQUIPMENT',
    heroEyebrow: 'The full list',
    inventoryTitle: 'The complete inventory',
    ctaTitle: 'Got a project in mind?',
    ctaBody: 'Tell us what you are trying to do and we will work out the best chain for your sound together.',
    ctaLabel: 'Get in touch →',
    enlargeLabel: (alt) => `Enlarge: ${alt}`,
  },
};

export interface GearItem {
  readonly name: string;
  readonly tag: string;
  /** External product link; absent for items rendered as plain text. */
  readonly href?: string;
}

export interface GearCategory {
  readonly label: string;
  readonly items: readonly GearItem[];
}

/** Studio atmosphere mosaic, shown before the inventory (client feedback,
 *  September 2026): five uncaptioned photos so a visitor feels the room before
 *  reading the gear list. The first one is the large tile. Clicking any of them
 *  opens the PhotoLightbox, which steps through this same order. */
const GALLERY_ALT: Localized<readonly string[]> = {
  fr: [
    "Vue d'ensemble de la régie, plafond traité et écoute centrale.",
    'Session de travail à deux devant la console.',
    'Micro statique et filtre anti-pop dans la cabine de prise.',
    'La cabine de prise et sa fenêtre ouverte sur la régie.',
    'Le poste de mixage vu de derrière pendant une session.',
  ],
  en: [
    'A wide view of the control room, treated ceiling and central listening position.',
    'Two people working together at the desk.',
    'Condenser microphone and pop filter in the recording booth.',
    'The recording booth and its window onto the control room.',
    'The mixing position seen from behind during a session.',
  ],
};

const GALLERY_FILES = [
  'studio-room-wide',
  'studio-session-duo',
  'studio-mic-closeup',
  'studio-booth',
  'studio-desk',
] as const;

function buildGallery(locale: Locale): readonly Photo[] {
  return GALLERY_FILES.map(
    (file, i) =>
      new Photo(`/assets/studio/${file}.jpg`, GALLERY_ALT[locale][i], `/assets/studio/${file}-full.jpg`),
  );
}

export const STUDIO_GALLERY: Localized<readonly Photo[]> = {
  fr: buildGallery('fr'),
  en: buildGallery('en'),
};

/** Category headings, French to English. */
const CATEGORY_EN: Record<string, string> = {
  'Conversion & préamplis': 'Conversion & preamps',
  Monitoring: 'Monitoring',
  'Traitement (outboard)': 'Outboard processing',
  Micros: 'Microphones',
  'Instruments & hardware': 'Instruments & hardware',
  Logiciels: 'Software',
  'Contrôle': 'Control',
};

/** Short qualifiers next to each item, French to English. Anything missing
 *  falls through unchanged, which is right for the ones already in English. */
const TAG_EN: Record<string, string> = {
  Convertisseur: 'Converter',
  Interface: 'Interface',
  'Préampli': 'Preamp',
  'Préampli ×8': 'Preamp ×8',
  'Monitor 3 voies': '3-way monitor',
  Monitor: 'Monitor',
  Compresseur: 'Compressor',
  'Multiband comp': 'Multiband comp',
  Transient: 'Transient',
  'De-esser': 'De-esser',
  Dynamique: 'Dynamics',
  EQ: 'EQ',
  'Reverb 500': 'Reverb 500',
  'Bus processor': 'Bus processor',
  Mastering: 'Mastering',
  'Condensateur': 'Condenser',
  Shotgun: 'Shotgun',
  'Synthé': 'Synth',
  'Synthé ×2': 'Synth ×2',
  'Synthé analogique': 'Analogue synth',
  'Boîte à rythmes': 'Drum machine',
  Guitare: 'Guitar',
  Ampli: 'Amp',
  Instruments: 'Instruments',
  'Contrôleur': 'Controller',
  Remote: 'Remote',
  DAW: 'DAW',
  Plugins: 'Plugins',
  Suites: 'Suites',
};

const GEAR_FR: readonly GearCategory[] = [
  {
    label: 'Conversion & préamplis',
    items: [
      { name: 'Mac Studio M4 Max', tag: 'CPU16 · GPU40 · 128 GB', href: 'https://www.apple.com/mac-studio/' },
      { name: 'Prism Audio Lyra 2', tag: 'Convertisseur', href: 'https://www.prismsound.com/products/lyra-2/' },
      { name: 'Apogee Duet 2', tag: 'Interface', href: 'https://apogeedigital.com/products/duet-2' },
      { name: 'Focusrite ISA One', tag: 'Préampli', href: 'https://focusrite.com/products/isa-one' },
      { name: 'Focusrite Octopre', tag: 'Préampli ×8', href: 'https://focusrite.com/products/scarlett-octopre' },
    ],
  },
  {
    label: 'Monitoring',
    items: [
      { name: 'Genelec 8351B', tag: 'Monitor 3 voies', href: 'https://www.genelec.com/8351b' },
      {
        name: 'Yamaha HS80M',
        tag: 'Monitor',
        href: 'https://usa.yamaha.com/products/proaudio/speakers/hs_series/index.html',
      },
    ],
  },
  {
    label: 'Traitement (outboard)',
    items: [
      { name: 'SSL Fusion', tag: 'Bus processor', href: 'https://solidstatelogic.com/products/fusion' },
      { name: 'Tube-Tech SMC2B', tag: 'Multiband comp', href: 'https://www.tube-tech.com/smc-2b' },
      { name: 'Elysia Xpressor 500', tag: 'Compresseur', href: 'https://elysia.com/products/xpressor-500' },
      { name: 'Elysia Mpressor 500', tag: 'Compresseur', href: 'https://elysia.com/products/mpressor-500' },
      { name: 'Elysia Nvelope 500', tag: 'Transient', href: 'https://elysia.com/products/nvelope-500' },
      { name: 'Elysia Xfilter 500', tag: 'EQ', href: 'https://elysia.com/products/xfilter-500' },
      { name: 'SPL De-Esser 500', tag: 'De-esser', href: 'https://spl.audio/en/spl-produkt/de-esser-mk2' },
      { name: 'Meris Mercury 7', tag: 'Reverb 500', href: 'https://www.meris.us/product/mercury7-reverb' },
    ],
  },
  {
    label: 'Micros',
    items: [
      { name: 'Neumann U87 Ai', tag: 'Condensateur', href: 'https://www.neumann.com/en-en/products/microphones/u-87-ai/' },
      { name: 'Shure SM7B', tag: 'Dynamique', href: 'https://www.shure.com/en-US/products/microphones/sm7b' },
      { name: 'Shure SM57', tag: 'Dynamique', href: 'https://www.shure.com/en-US/products/microphones/sm57' },
      { name: 'AKG C214', tag: 'Condensateur', href: 'https://www.akg.com/Microphones/Condenser%20Microphones/C214.html' },
      { name: 'Rode NTG5', tag: 'Shotgun', href: 'https://rode.com/en/microphones/location-sound/ntg5' },
    ],
  },
  {
    label: 'Contrôle',
    items: [
      { name: 'Icon V1-M & V1-X', tag: 'Contrôleur', href: 'https://iconproaudio.com/product/v1-m/' },
      { name: 'PreSonus FaderPort', tag: 'Contrôleur', href: 'https://www.presonus.com/products/FaderPort' },
      { name: 'Softube Console 1', tag: 'Contrôleur', href: 'https://www.softube.com/console-1' },
      { name: 'iPad (cabine)', tag: 'Remote' },
    ],
  },
  {
    label: 'Logiciels',
    items: [
      { name: 'Ableton Live', tag: 'DAW', href: 'https://www.ableton.com/live/' },
      { name: 'WaveLab Pro 10', tag: 'Mastering', href: 'https://www.steinberg.net/wavelab/' },
      { name: 'FabFilter · Soundtoys', tag: 'Plugins', href: 'https://www.fabfilter.com' },
      {
        name: 'NI Komplete 14 Ultimate',
        tag: 'Instruments',
        href: 'https://www.native-instruments.com/en/products/komplete/bundles/komplete-14-ultimate/',
      },
      { name: 'Arturia · Pulsar · Waves', tag: 'Suites', href: 'https://www.arturia.com' },
    ],
  },
  {
    label: 'Instruments & hardware',
    items: [
      { name: 'Sequential Prophet 6', tag: 'Synthé analogique' },
      { name: 'Access Virus TI2', tag: 'Synthé' },
      { name: 'Clavia Nord Rack 2x', tag: 'Synthé ×2' },
      { name: 'Behringer RD-9', tag: 'Boîte à rythmes' },
      { name: 'LTD EC1000 Deluxe', tag: 'Guitare' },
      { name: 'Chapman ML3 Baritone', tag: 'Guitare' },
      { name: 'Gitane Cigano', tag: 'Guitare' },
      { name: 'Peavey XXX Combo', tag: 'Ampli' },
    ],
  },
];

/** English inventory, derived from the French one: same products, same links,
 *  translated headings and tags. */
const GEAR_EN: readonly GearCategory[] = GEAR_FR.map((category) => ({
  label: CATEGORY_EN[category.label] ?? category.label,
  items: category.items.map((item) => ({ ...item, tag: TAG_EN[item.tag] ?? item.tag })),
}));

export const GEAR_CATEGORIES: Localized<readonly GearCategory[]> = { fr: GEAR_FR, en: GEAR_EN };
