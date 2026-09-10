// Accompagnement (Guidance) content. The French is verbatim from
// design-handoff/Accompagnement OddWave.dc.html plus the client's own feedback
// copy; do not edit it. Apostrophes match the source exactly (curly ’ in the
// phases, straight ' in the formules). The English is a written adaptation,
// pending Théo's proofread (September 2026).

import { Phase, Formula } from '@/models';
import type { Localized, Locale } from '@/helpers';

// Feedback video (muted, sped-up OBS capture) hosted on IPFS. Gateway is
// configurable via VITE_IPFS_GATEWAY (+ token). Same clip in both languages.
const IPFS_GATEWAY = ((import.meta.env.VITE_IPFS_GATEWAY as string | undefined) ?? 'https://gateway.pinata.cloud').replace(/\/+$/, '');
const IPFS_GATEWAY_TOKEN = import.meta.env.VITE_IPFS_GATEWAY_TOKEN as string | undefined;
const ipfs = (cid: string): string => `${IPFS_GATEWAY}/ipfs/${cid}${IPFS_GATEWAY_TOKEN ? `?pinataGatewayToken=${IPFS_GATEWAY_TOKEN}` : ''}`;

export const GUIDANCE_MEDIA = {
  video: ipfs('bafybeieoydeohvwajref3kp6ringrgpqkeh5glbocpeftzpdxv3ho2msmu'),
  poster: '/assets/feedback-poster.jpg',
} as const;

export interface GuidanceCopy {
  readonly heroTitle: string;
  readonly heroEyebrow: string;

  readonly introEyebrow: string;
  readonly introTitle: string;
  readonly introBody: string;

  readonly feedbackEyebrow: string;
  readonly feedbackParagraphs: readonly string[];

  readonly formulesEyebrow: string;
  readonly formulesTitle: string;
  readonly formulesBody: string;
  readonly chooseLabel: string;

  readonly requestEyebrow: string;
  readonly requestTitle: string;
  readonly requestBody: string;
  readonly confirmTitle: string;
  /** Split around the chosen formule, which is rendered in copper between them. */
  readonly confirmBefore: string;
  readonly confirmAfter: string;

  readonly formulaLabel: string;
  readonly submitLabel: string;
  readonly sending: string;
  readonly error: string;
}

export const GUIDANCE: Localized<GuidanceCopy> = {
  fr: {
    heroTitle: 'ACCOMPAGNEMENT',
    heroEyebrow: 'Suivi personnalisé & pédagogique',

    introEyebrow: 'La méthode · en quatre phases',
    introTitle: 'Un parcours clair, de la première écoute à la sortie.',
    introBody:
      "Quatre phases, des livrables concrets à chaque étape. La démarche s'adapte à vos besoins, votre budget et vos délais, en résidence sur place, à distance, ou en hybride.",

    feedbackEyebrow: 'Le retour vidéo',
    feedbackParagraphs: [
      "Travailler avec notre studio, c'est bénéficier d'un regard extérieur à chaque étape du processus.",
      "En amont, nous réalisons une analyse complète de votre projet afin d'identifier les points forts, les axes d'amélioration et de partir des meilleures bases possibles.",
      "Une fois le travail terminé, vous recevez un retour vidéo personnalisé expliquant les interventions réalisées, les choix artistiques et techniques effectués, ainsi que les problématiques rencontrées durant le mixage ou le mastering.",
      "Cette approche vous permet non seulement de comprendre ce qui a été fait sur vos morceaux, mais aussi de développer vos compétences de production pour faire évoluer durablement vos futures compositions.",
    ],

    formulesEyebrow: 'Les formules',
    formulesTitle: 'Une formule par ambition.',
    formulesBody:
      'Pas de tarif figé : chaque accompagnement se construit autour de votre projet. On en parle ensemble.',
    chooseLabel: 'Choisir →',

    requestEyebrow: "Demande d'accompagnement",
    requestTitle: 'Parlons de votre projet.',
    requestBody:
      'Choisissez une formule, dites-nous où vous en êtes : on définit ensemble ce qui vous fera avancer. Réponse sous 48h.',
    confirmTitle: 'Demande envoyée.',
    confirmBefore: 'Merci ! On a bien reçu votre demande pour ',
    confirmAfter: '. On revient vers vous très vite.',

    formulaLabel: 'Formule souhaitée',
    submitLabel: 'Envoyer la demande →',
    sending: 'Envoi en cours…',
    error: "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous à contact@oddwave.studio.",
  },

  en: {
    heroTitle: 'COACHING',
    heroEyebrow: 'One to one',

    introEyebrow: 'The method · in four phases',
    introTitle: 'A clear path, from the first listen to the release.',
    introBody:
      'Four phases, with something concrete delivered at every step. The approach bends to your needs, your budget and your deadlines, in residence on site, remotely, or a mix of both.',

    feedbackEyebrow: 'The video feedback',
    feedbackParagraphs: [
      'Working with the studio means having an outside perspective at every step of the process.',
      'Before anything starts, we run a full analysis of your project to find its strengths, the places it can improve, and the best possible foundations to build on.',
      'Once the work is done, you get a personal video walkthrough explaining what was done, the artistic and technical choices behind it, and the problems that came up during the mix or the master.',
      'That way you not only understand what happened to your tracks, you also build up your own production skills for everything you write next.',
    ],

    formulesEyebrow: 'The formats',
    formulesTitle: 'One format per ambition.',
    formulesBody:
      "No fixed price list: every programme is built around your project. Let's talk it through.",
    chooseLabel: 'Choose →',

    requestEyebrow: 'Coaching request',
    requestTitle: 'Tell us about your project.',
    requestBody:
      'Pick a format, tell us where you are, and we will work out together what will actually move you forward. We answer within 48 hours.',
    confirmTitle: 'Request sent.',
    confirmBefore: 'Thank you. We have your request for ',
    confirmAfter: '. We will come back to you very soon.',

    formulaLabel: 'Format you want',
    submitLabel: 'Send the request →',
    sending: 'Sending…',
    error: 'The message did not go through. Try again, or write to contact@oddwave.studio.',
  },
};

interface PhaseText {
  readonly eyebrow: string;
  readonly title: string;
  readonly bullets: readonly string[];
}

const PHASE_TEXT: Localized<readonly PhaseText[]> = {
  fr: [
    {
      eyebrow: 'Comprendre l’artiste avant de produire quoi que ce soit.',
      title: 'Diagnostic & Vision',
      bullets: [
        'Écoute approfondie du projet',
        'Analyse du niveau technique & artistique',
        'Identification des forces / faiblesses',
        'Clarification de l’identité artistique',
        'Positionnement (style, références, scène, labels)',
      ],
    },
    {
      eyebrow: 'Transformer une idée en plan concret.',
      title: 'Stratégie & Objectifs',
      bullets: [
        'Définition d’objectifs réalistes (release, EP, live…)',
        'Plan de progression adapté au temps et aux moyens',
        'Ciblage des labels / DA / direction sonore',
        'Mise en place de deadlines',
      ],
    },
    {
      eyebrow: 'Faire évoluer concrètement la musique.',
      title: 'Développement & Production',
      bullets: [
        'Remise à niveau technique ciblée',
        'Optimisation des méthodes de production',
        'Travail sur la structure, la tension, l’identité sonore',
        'Feedback régulier et précis',
        'Mise en place d’un workflow efficace',
      ],
    },
    {
      eyebrow: 'Transformer le travail en projet solide.',
      title: 'Finalisation & Projection',
      bullets: [
        'Préparation des morceaux pour mix / mastering',
        'Organisation des sessions & exports propres',
        'Accompagnement au live (option)',
        'Vision long terme (suite du projet)',
      ],
    },
  ],

  en: [
    {
      eyebrow: 'Understanding the artist before producing anything at all.',
      title: 'Diagnosis & Vision',
      bullets: [
        'A deep listen through the project',
        'Technical and artistic level assessed',
        'Strengths and weaknesses identified',
        'Artistic identity clarified',
        'Positioning: style, references, scene, labels',
      ],
    },
    {
      eyebrow: 'Turning an idea into a concrete plan.',
      title: 'Strategy & Goals',
      bullets: [
        'Realistic goals set: release, EP, live show',
        'A progression plan matched to your time and means',
        'Target labels, artistic and sonic direction',
        'Deadlines put in place',
      ],
    },
    {
      eyebrow: 'Moving the music forward for real.',
      title: 'Development & Production',
      bullets: [
        'Targeted technical catch-up',
        'Production methods sharpened',
        'Work on structure, tension and sonic identity',
        'Regular, precise feedback',
        'An efficient workflow put in place',
      ],
    },
    {
      eyebrow: 'Turning the work into a solid project.',
      title: 'Finalisation & Outlook',
      bullets: [
        'Tracks prepared for mixing and mastering',
        'Sessions organised and exports done cleanly',
        'Live support, as an option',
        'Long term view: what comes after',
      ],
    },
  ],
};

function buildPhases(locale: Locale): readonly Phase[] {
  return PHASE_TEXT[locale].map((text, i) => new Phase(String(i + 1), text.eyebrow, text.title, text.bullets));
}

export const GUIDANCE_PHASES: Localized<readonly Phase[]> = {
  fr: buildPhases('fr'),
  en: buildPhases('en'),
};

interface FormulaText {
  readonly name: string;
  readonly tag: string;
  readonly bullets: readonly string[];
}

/** Ids are shared: they identify the formule in the submitted form. */
const FORMULA_IDS = ['diagnostic', 'accompagnement', 'developpement', 'live-setup'] as const;

const FORMULA_TEXT: Localized<readonly FormulaText[]> = {
  fr: [
    {
      name: 'Diagnostic Artistique',
      tag: 'Entrée',
      bullets: ['1 session approfondie', 'Analyse complète + feedback', "Plan d'action personnalisé"],
    },
    {
      name: 'Accompagnement',
      tag: 'EP 2 à 4 titres ou Album',
      bullets: ['Suivi régulier', 'Objectifs + deadlines', 'Feedback + coaching technique', 'Mixage & Mastering'],
    },
    {
      name: 'Développement Projet',
      tag: 'Premium',
      bullets: [
        'Accompagnement à la production',
        'Direction artistique',
        'Feedback + coaching technique',
        'Mixage & Mastering',
      ],
    },
    {
      name: 'Live Setup',
      tag: 'Option',
      bullets: ['Construction du live', 'Routing / exports', 'Logique de performance'],
    },
  ],

  en: [
    {
      name: 'Artistic Diagnosis',
      tag: 'Entry',
      bullets: ['One in-depth session', 'Full analysis and feedback', 'A personal action plan'],
    },
    {
      name: 'Coaching',
      tag: 'EP of 2 to 4 tracks, or album',
      bullets: ['Regular follow-up', 'Goals and deadlines', 'Feedback and technical coaching', 'Mixing & Mastering'],
    },
    {
      name: 'Project Development',
      tag: 'Premium',
      bullets: [
        'Production support',
        'Artistic direction',
        'Feedback and technical coaching',
        'Mixing & Mastering',
      ],
    },
    {
      name: 'Live Setup',
      tag: 'Option',
      bullets: ['Building the live set', 'Routing and exports', 'Performance logic'],
    },
  ],
};

function buildFormulas(locale: Locale): readonly Formula[] {
  return FORMULA_TEXT[locale].map((text, i) => new Formula(FORMULA_IDS[i], text.name, text.tag, text.bullets));
}

export const GUIDANCE_FORMULAS: Localized<readonly Formula[]> = {
  fr: buildFormulas('fr'),
  en: buildFormulas('en'),
};
