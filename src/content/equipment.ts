// Le Matériel content — verbatim from design-handoff/Materiel OddWave.dc.html.

export const EQUIPMENT = {
  heroTitle: 'LE MATÉRIEL',
  heroEyebrow: 'La liste complète',
  inventoryTitle: "L'inventaire complet",
  inventoryBody:
    "Tout l'équipement du studio, classé par catégorie. Chaque référence est sélectionnée pour sa transparence et son caractère.",
  ctaTitle: 'Un projet en tête ?',
  ctaBody: 'Dites-nous ce que vous cherchez à faire : on définit ensemble la meilleure chaîne pour votre son.',
  ctaLabel: 'Nous contacter →',
} as const;

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

/** Featured pieces ("pièces phares") and detail close-ups carry captions. */
export const FEATURED = {
  main: { image: '/assets/materiel-console.jpg', title: 'SSL & Elysia channel strip', sub: 'Le cœur de la chaîne' },
  topRight: { image: '/assets/machine-tubetech.jpg', title: 'Tube-Tech' },
  bottomRight: { image: '/assets/machine-channelstrip.jpg', title: 'Elysia & SSL Fusion' },
} as const;

export const DETAILS = [
  { image: '/assets/ssl-elysia-knobs.jpg', fit: 'contain', title: 'SSL Fusion & Elysia', sub: 'Couleur & largeur stéréo' },
  { image: '/assets/converter-blue.jpg', fit: 'cover', title: 'Conversion & monitoring', sub: "Le point d'entrée du signal" },
] as const;

export const GEAR_CATEGORIES: readonly GearCategory[] = [
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
