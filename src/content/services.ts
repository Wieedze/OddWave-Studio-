// Services page content. Six "prestations" panels. The French is verbatim
// client copy (do not edit; bodies split into paragraphs at sentence boundaries
// only, user request 2026-07-11): the first three come from
// design-handoff/Landing OddWave GSAP.dc.html, the last three from the client's
// modif.txt (July 2026, batch 2). The English is a written adaptation, pending
// Théo's proofread (September 2026).
//
// Media (image, side, focus, CTA target) is declared once and shared by both
// languages, so a photo can never drift between the two trees.

import { ServiceItem } from '@/models';
import type { ImageSide } from '@/models';
import type { Localized, Locale } from '@/helpers';
import { ROUTES } from './navigation';

export interface ServicesPageCopy {
  readonly heroTitle: string;
  readonly heroEyebrow: string;
  readonly ctaTitle: string;
  readonly ctaBody: string;
  readonly ctaLabel: string;
  /** Used by every panel that does not override it. */
  readonly defaultPanelCta: string;
}

export const SERVICES_PAGE: Localized<ServicesPageCopy> = {
  fr: {
    heroTitle: 'SERVICES',
    heroEyebrow: 'Mastering · Mixage · Production · Sound design · Accompagnement',
    ctaTitle: 'Donnons une dimension à votre son.',
    ctaBody: 'À distance ou en résidence. Dites-nous où vous en êtes, on vous répond avec une proposition adaptée.',
    ctaLabel: 'Démarrer un projet →',
    defaultPanelCta: 'Demander un devis →',
  },
  en: {
    heroTitle: 'SERVICES',
    heroEyebrow: 'Mastering · Mixing · Production · Sound design · Coaching',
    ctaTitle: "Let's give your sound its dimension.",
    ctaBody: 'Remotely or in residence. Tell us where you are and we will come back with a proposal that fits.',
    ctaLabel: 'Start a project →',
    defaultPanelCta: 'Request a quote →',
  },
};

/** Everything about a panel that does not depend on the language. */
interface PanelMedia {
  readonly id: string;
  readonly image: string;
  readonly imageSide: ImageSide;
  readonly imageFocus: string;
  /** Overrides the /contact default. */
  readonly ctaHref?: string;
}

const PANEL_MEDIA: readonly PanelMedia[] = [
  { id: 'mastering', image: '/assets/ssl-elysia-knobs.jpg', imageSide: 'right', imageFocus: 'center 74%' },
  { id: 'stem-mastering', image: '/assets/console.jpg', imageSide: 'left', imageFocus: '70% 88%' },
  { id: 'mixage', image: '/assets/mastering-bokeh.jpg', imageSide: 'right', imageFocus: 'center 60%' },
  {
    id: 'sound-design-post-production',
    image: '/assets/IMAGE SOUND DESIGN.png',
    imageSide: 'left',
    imageFocus: 'right center',
    ctaHref: ROUTES.soundDesign,
  },
  { id: 'production-composition', image: '/assets/IMAGE COMPOSITION 2.png', imageSide: 'right', imageFocus: 'right center' },
  {
    id: 'guidance-artistic-direction',
    image: '/assets/eleve-close.jpg',
    imageSide: 'left',
    imageFocus: 'center',
    ctaHref: ROUTES.guidance,
  },
];

interface PanelText {
  readonly title: string;
  readonly body: readonly string[];
  /** Overrides `defaultPanelCta`. */
  readonly ctaLabel?: string;
}

const PANEL_TEXT: Localized<readonly PanelText[]> = {
  fr: [
    {
      title: 'Mastering',
      body: [
        "Le mastering est l'étape finale de votre production. Il vise à présenter votre musique sous son meilleur jour, quelle que soit la plateforme : on affine et on donne une finition brillante à votre travail, en mettant en valeur tous les détails auxquels vous avez consacré tant de temps.",
        "Pour cette phase, un simple fichier stéréo de votre mix suffit. Mon rôle premier est d'apporter une oreille neuve, avertie et experte à votre production. Si je peux vous conseiller pour mieux porter votre message, je m'attache à vous guider afin que le travail soit d'une qualité optimale.",
        "Techniquement, je me concentre sur la dynamique, l'équilibre fréquentiel, la profondeur, la largeur, la couleur tonale d'ensemble, ainsi que le contrôle qualité final et l'adaptation aux différents environnements d'écoute.",
      ],
    },
    {
      title: 'Stem Mastering',
      body: [
        "Le stem mastering partage la même ambition que le mastering classique, mais offre cette fois davantage d'espace pour sculpter en détail les différents éléments clés de vos morceaux.",
        "Dans la plupart des cas, j'ai besoin des éléments suivants : kick, basse, caisse claire, percussions, leads, FX, nappes, voix, ou tout autre élément nécessitant un traitement spécifique.",
        "Sans jamais altérer l'intention de votre mix, je travaille la cohésion et la cohérence de tous les éléments importants : les phases, l'équilibre, la dynamique et la couleur de chaque composante, pour poser des fondations rythmiques solides qui soutiennent au mieux leur harmonie.",
        "Le stem mastering permet aussi, lorsque plusieurs titres partagent un même contexte (EP ou album), de travailler la cohérence entre les morceaux et de leur donner une intention commune.",
      ],
    },
    {
      title: 'Mixage',
      body: [
        "Le mixage est l'une des étapes les plus cruciales de votre production. Comme dans une recette, le juste dosage des épices ou des ingrédients peut tout changer. Il n'existe évidemment pas de recette unique : avec les mêmes ingrédients, je peux vous proposer une grande variété de saveurs jusqu'à trouver celle qui vous correspond, tout en garantissant un équilibre parfait.",
        "Deux approches sont possibles. Pour les groupes de musique instrumentale, je travaille l'ensemble des pistes pour mixer vos productions, avec les éditions et arrangements nécessaires, et je peux proposer des suggestions via de courtes vidéos explicatives.",
        "Pour les producteurs de musique électronique, architectes de leur création, je travaille sur des pistes et groupes de pistes précis afin de respecter vos choix de production et rendre le travail plus clair et efficace. Si besoin, un accompagnement en amont peut être réalisé en analysant vos sessions et en préparant vos exports.",
      ],
    },
    {
      title: 'Sound Design & Post Production',
      body: [
        "Le son est un élément essentiel de la narration. Il donne vie aux images, renforce les émotions et participe pleinement à l'immersion du spectateur. Qu'il soit discret ou au premier plan, un univers sonore bien conçu apporte une véritable identité à chaque projet.",
        "J'interviens sur la création de sound design pour le cinéma, les courts-métrages, documentaires, reportages, publicités, jeux vidéo ou tout autre contenu audiovisuel. Bruitages, ambiances, effets spéciaux, textures sonores ou traitements créatifs : chaque élément est pensé pour servir le récit et accompagner l'image avec précision.",
        "En complément du sound design, je peux également assurer l'enregistrement de voix off, le montage son, l'édition, le nettoyage des prises, le mixage et la finalisation des bandes sonores afin de livrer un résultat cohérent, immersif et prêt à la diffusion.",
      ],
      ctaLabel: 'Extrait des travaux réalisés par le studio →',
    },
    {
      title: 'Production & Composition',
      body: [
        "Chaque projet musical est unique. Qu'il s'agisse d'une bande son, d'un morceau destiné à un artiste ou d'une création entièrement originale, mon objectif est de composer une musique qui porte une émotion, raconte une histoire et reflète pleinement votre identité.",
        "J'interviens sur la composition, la production, l'arrangement et le développement musical pour des chanteurs, groupes, producteurs, réalisateurs, agences ou toute personne souhaitant donner vie à une idée. Que vous partiez d'une simple mélodie, d'un texte, d'une maquette ou d'un cahier des charges précis, je vous accompagne dans la création d'une œuvre sur mesure, adaptée à votre projet.",
        "La prestation peut également inclure la production complète, les enregistrements, le mixage et le mastering afin de livrer un résultat professionnel, prêt à être diffusé. Lorsque le projet le nécessite, je travaille en collaboration avec un réseau de musiciens instrumentistes professionnels (guitare, basse, batterie, cordes, cuivres, piano, voix, etc.) afin d'apporter les meilleures compétences à chaque production et d'offrir une grande richesse artistique.",
      ],
    },
    {
      title: 'Accompagnement & Direction Artistique',
      body: [
        "Développer un projet musical demande bien plus que de produire de bons morceaux. Il faut construire une identité forte, prendre les bonnes décisions au bon moment et conserver une vision cohérente sur le long terme.",
        "Mon accompagnement s'adresse aux artistes qui souhaitent bénéficier d'un regard extérieur expérimenté pour faire évoluer leur projet. Ensemble, nous analysons votre musique, vos références, vos objectifs et votre positionnement afin d'identifier les axes de progression les plus pertinents.",
        "Au-delà des sessions de travail, je propose un véritable suivi personnalisé. Chaque étape importante peut être accompagnée de retours détaillés, d'analyses techniques et artistiques, ainsi que de vidéos explicatives permettant de comprendre les choix réalisés. L'objectif n'est pas seulement d'améliorer vos productions actuelles, mais de vous transmettre une méthode de travail durable qui vous permettra de progresser de manière autonome sur vos futurs projets.",
      ],
      ctaLabel: 'Cliquez ici pour le détail des services →',
    },
  ],

  en: [
    {
      title: 'Mastering',
      body: [
        'Mastering is the last stage of your production. It exists to show your music at its best, whatever the platform: the work is refined and given a bright finish, bringing out every detail you spent so long on.',
        'A single stereo file of your mix is enough at this point. My first job is to bring a fresh, trained, expert ear to your production. Wherever I can advise you on carrying your message further, I will, so the work comes out at its best.',
        'Technically, I focus on dynamics, frequency balance, depth, width and overall tonal colour, along with the final quality control and how the record holds up across different listening environments.',
      ],
    },
    {
      title: 'Stem Mastering',
      body: [
        'Stem mastering has the same ambition as classic mastering, but it leaves far more room to shape the key elements of your tracks in detail.',
        'In most cases I need the following: kick, bass, snare, percussion, leads, FX, pads, vocals, or anything else that calls for its own treatment.',
        'Without ever altering the intent of your mix, I work on the cohesion and consistency of everything that matters: the phase, balance, dynamics and colour of each part, laying rhythmic foundations solid enough to carry the harmony.',
        'When several tracks share a context, an EP or an album, stem mastering also lets me work the consistency between them and give them a common intent.',
      ],
    },
    {
      title: 'Mixing',
      body: [
        'Mixing is one of the most decisive stages of your production. As in a recipe, the exact dose of a spice or an ingredient can change everything. There is of course no single recipe: with the same ingredients I can offer you a wide range of flavours until we land on the one that is yours, while keeping the balance perfect.',
        'Two approaches are possible. For instrumental bands, I work across all the tracks to mix your productions, with whatever editing and arrangement is needed, and I can send suggestions as short explanatory videos.',
        'For electronic producers, the architects of their own creation, I work on specific tracks and track groups so your production choices are respected and the work stays clear and efficient. If needed, we can also work upstream, going through your sessions and preparing your exports.',
      ],
    },
    {
      title: 'Sound Design & Post Production',
      body: [
        'Sound is an essential part of storytelling. It brings images to life, sharpens emotion and carries the viewer into the scene. Whether it stays in the background or takes the foreground, a well built sound world gives a project a real identity.',
        'I create sound design for feature films, short films, documentaries, reportage, advertising, video games and any other audiovisual content. Foley, ambiences, special effects, sound textures, creative processing: every element is built to serve the story and follow the picture precisely.',
        'Alongside the sound design, I can also handle voice-over recording, sound editing, cleaning up takes, mixing and finishing the soundtrack, so the result is coherent, immersive and ready to broadcast.',
      ],
      ctaLabel: 'See the work the studio has done →',
    },
    {
      title: 'Production & Composition',
      body: [
        'Every music project is its own thing. Whether it is a soundtrack, a track written for an artist or an entirely original creation, my aim is to compose music that carries emotion, tells a story and fully reflects your identity.',
        'I work on composition, production, arrangement and musical development for singers, bands, producers, directors, agencies and anyone wanting to bring an idea to life. Whether you start from a simple melody, a lyric, a demo or a precise brief, I guide you through building a bespoke piece that fits your project.',
        'The service can also cover full production, recording, mixing and mastering, so you get a professional result ready to release. When a project calls for it, I work with a network of professional session musicians (guitar, bass, drums, strings, brass, piano, voice and more) to bring the right skills to each production and open up its artistic range.',
      ],
    },
    {
      title: 'Coaching & Artistic Direction',
      body: [
        'Growing a music project takes much more than making good tracks. It takes building a strong identity, making the right calls at the right time and holding a coherent vision over the long run.',
        'This coaching is for artists who want an experienced outside perspective to move their project forward. Together we go through your music, your references, your goals and your positioning, and we identify where the real progress is to be made.',
        'Beyond the working sessions, this is genuine one to one follow-up. Every significant step can come with detailed feedback, technical and artistic analysis, and explanatory videos so you can see the reasoning behind each choice. The point is not only to improve the productions you have now, but to hand you a working method that lasts, so you keep progressing on your own on the projects that come next.',
      ],
      ctaLabel: 'See the full detail of the services →',
    },
  ],
};

function buildPanels(locale: Locale): readonly ServiceItem[] {
  const texts = PANEL_TEXT[locale];
  const page = SERVICES_PAGE[locale];
  return PANEL_MEDIA.map((media, i) => {
    const text = texts[i];
    return new ServiceItem(
      media.id,
      text.title,
      text.body,
      media.image,
      media.imageSide,
      media.imageFocus,
      text.ctaLabel ?? page.defaultPanelCta,
      media.ctaHref ?? ROUTES.contact,
    );
  });
}

export const SERVICES: Localized<readonly ServiceItem[]> = {
  fr: buildPanels('fr'),
  en: buildPanels('en'),
};
