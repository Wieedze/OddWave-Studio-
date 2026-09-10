// Studio content — sections of the landing (the /studio page is gone since the
// July 2026 feedback). The French interview and environment paragraphs are the
// client's own copy from modif.txt (July 2026, batch 2), verbatim, do not
// rephrase. The English keeps his first person voice and is pending his
// proofread (September 2026).

import type { Localized } from '@/helpers';

export interface StudioCopy {
  readonly engineerName: string;
  readonly engineerRole: string;
  /** First-person presentation, written by the client as an interview answer. */
  readonly interview: readonly string[];
  readonly envTitle: string;
  readonly envParagraphs: readonly string[];
  readonly pedagogyTitle: string;
  readonly pedagogyBody: string;
  readonly ctaTitle: string;
  readonly ctaBody: string;
  readonly ctaLabel: string;
}

export const STUDIO: Localized<StudioCopy> = {
  fr: {
    engineerName: 'Théo Grozdanic',
    engineerRole: 'Ingénieur du son · Producteur · Formateur',

    interview: [
      "Passionné de musique depuis toujours, j'ai commencé très tôt à enregistrer et mixer des groupes locaux dans mon propre studio. Cette passion est rapidement devenue un métier, me conduisant à travailler aussi bien en studio que sur scène en tant que technicien du son, avant de développer plusieurs projets de musique électronique.",
      "Au fil des années, ces projets m'ont permis de collaborer avec des labels reconnus, de me produire dans de nombreux clubs et festivals, et de tourner pendant plus de dix ans en France comme à l'international. Cette expérience m'a offert une vision complète du parcours d'un artiste, de la création en studio jusqu'à la scène.",
      "Aujourd'hui, à travers OddWave Studio, je mets cette expertise au service des artistes, producteurs, groupes, labels et créateurs de contenus. Mon approche ne se limite pas à la technique : je considère chaque projet dans sa globalité afin de trouver les solutions les plus adaptées à son identité artistique et à ses objectifs.",
      "Mixage, mastering, production musicale, composition, sound design, post-production audio ou direction artistique : chaque prestation est pensée comme une véritable collaboration. Au-delà du résultat sonore, j'accorde une grande importance au dialogue, à la transmission de connaissances et au partage d'expérience, afin que chaque projet permette également à son créateur de progresser.",
      "Mon objectif est simple : transformer une vision artistique en une production aboutie, cohérente et capable de transmettre toute son émotion.",
    ],

    envTitle: 'Créatif et apaisant.',
    envParagraphs: [
      "Situé au cœur de la campagne provençale, OddWave Studio offre un environnement calme et inspirant, pensé pour favoriser la créativité et la concentration. Loin de l'agitation, chaque projet bénéficie d'un cadre propice à un travail exigeant, dans une atmosphère à la fois chaleureuse et professionnelle.",
      "Pour les artistes venant de plus loin, des résidences avec hébergement sont proposées grâce à un appartement indépendant situé à quelques mètres des espaces de travail, permettant de vivre pleinement le projet et de travailler dans les meilleures conditions.",
      "Fort de plus de quinze ans d'expérience, le studio accompagne des artistes, producteurs, groupes et créateurs venus de France comme de l'international, couvrant un large éventail d'esthétiques musicales et de projets audiovisuels.",
    ],

    pedagogyTitle: 'Au-delà des prestations : vous donner les clés.',
    pedagogyBody:
      'Formations, workshops, coaching. Des formats hybrides pour finaliser vos productions et rendre votre mix/master plus efficace, tout en progressant techniquement.',

    ctaTitle: 'Venez voir le studio.',
    ctaBody: 'En résidence ou à distance : parlons de votre projet.',
    ctaLabel: 'Nous contacter →',
  },

  en: {
    engineerName: 'Théo Grozdanic',
    engineerRole: 'Sound engineer · Producer · Teacher',

    interview: [
      'Music has been my thing for as long as I can remember. I started early, recording and mixing local bands in my own studio. The passion turned into a trade soon enough, and I worked as a sound engineer both in the studio and on stage before developing several electronic music projects of my own.',
      "Over the years those projects took me to established labels, onto club and festival stages, and on the road for more than ten years in France and abroad. That gave me the full picture of an artist's path, from writing in the studio to playing live.",
      'Today, through OddWave Studio, I put that experience to work for artists, producers, bands, labels and content creators. My approach is not only technical: I look at a project as a whole, so the answers fit its artistic identity and what it is trying to achieve.',
      'Mixing, mastering, music production, composition, sound design, audio post-production, artistic direction: every service is built as a real collaboration. Beyond the sound itself, I care about the conversation, about passing on what I know and sharing what I have learned, so that each project also moves the person behind it forward.',
      'My aim is simple: turn an artistic vision into a finished, coherent production that carries all of its emotion.',
    ],

    envTitle: 'Creative and calm.',
    envParagraphs: [
      'Set in the heart of the Provençal countryside, OddWave Studio is a quiet, inspiring place, built for creativity and concentration. Far from the noise, every project gets the setting that demanding work needs, in an atmosphere that is warm and professional at once.',
      'Artists coming from further afield can stay in residence: a self-contained flat sits a few steps from the working rooms, so you can live the project fully and work in the best possible conditions.',
      'With more than fifteen years behind it, the studio works with artists, producers, bands and creators from France and abroad, across a wide range of musical styles and audiovisual projects.',
    ],

    pedagogyTitle: 'Beyond the services: handing you the keys.',
    pedagogyBody:
      'Training, workshops, coaching. Hybrid formats to finish your productions and make your mix and master hit harder, while you build up your own technique.',

    ctaTitle: 'Come and see the studio.',
    ctaBody: 'In residence or remotely: tell us about your project.',
    ctaLabel: 'Get in touch →',
  },
};
