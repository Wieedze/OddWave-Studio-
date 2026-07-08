// Accompagnement (Guidance) content — verbatim from
// design-handoff/Accompagnement OddWave.dc.html. Do not edit the French copy.
// Note: apostrophes match the source exactly (curly ’ in the phases, straight '
// in the formules), to stay verbatim.

import { Phase, Formula } from '@/models';

export const GUIDANCE_INTRO = {
  eyebrow: 'La méthode · en quatre phases',
  title: 'Un parcours clair, de la première écoute à la sortie.',
  body: "Quatre phases, des livrables concrets à chaque étape. La démarche s'adapte à vos besoins, votre budget et vos délais, en résidence sur place, à distance, ou en hybride.",
} as const;

// Feedback video (muted, sped-up OBS capture) hosted on IPFS, with the text that
// reveals over it. Gateway is configurable via VITE_IPFS_GATEWAY (+ token).
const IPFS_GATEWAY = ((import.meta.env.VITE_IPFS_GATEWAY as string | undefined) ?? 'https://gateway.pinata.cloud').replace(/\/+$/, '');
const IPFS_GATEWAY_TOKEN = import.meta.env.VITE_IPFS_GATEWAY_TOKEN as string | undefined;
const ipfs = (cid: string): string => `${IPFS_GATEWAY}/ipfs/${cid}${IPFS_GATEWAY_TOKEN ? `?pinataGatewayToken=${IPFS_GATEWAY_TOKEN}` : ''}`;

export const GUIDANCE_FEEDBACK = {
  eyebrow: 'Le retour vidéo',
  video: ipfs('bafybeieoydeohvwajref3kp6ringrgpqkeh5glbocpeftzpdxv3ho2msmu'),
  poster: '/assets/feedback-poster.jpg',
  paragraphs: [
    "Travailler avec notre studio, c'est bénéficier d'un regard extérieur à chaque étape du processus.",
    "En amont, nous réalisons une analyse complète de votre projet afin d'identifier les points forts, les axes d'amélioration et de partir des meilleures bases possibles.",
    "Une fois le travail terminé, vous recevez un retour vidéo personnalisé expliquant les interventions réalisées, les choix artistiques et techniques effectués, ainsi que les problématiques rencontrées durant le mixage ou le mastering.",
    "Cette approche vous permet non seulement de comprendre ce qui a été fait sur vos morceaux, mais aussi de développer vos compétences de production pour faire évoluer durablement vos futures compositions.",
  ],
} as const;

export const GUIDANCE_PHASES: readonly Phase[] = [
  new Phase('1', 'Comprendre l’artiste avant de produire quoi que ce soit.', 'Diagnostic & Vision', [
    'Écoute approfondie du projet',
    'Analyse du niveau technique & artistique',
    'Identification des forces / faiblesses',
    'Clarification de l’identité artistique',
    'Positionnement (style, références, scène, labels)',
  ]),
  new Phase('2', 'Transformer une idée en plan concret.', 'Stratégie & Objectifs', [
    'Définition d’objectifs réalistes (release, EP, live…)',
    'Plan de progression adapté au temps et aux moyens',
    'Ciblage des labels / DA / direction sonore',
    'Mise en place de deadlines',
  ]),
  new Phase('3', 'Faire évoluer concrètement la musique.', 'Développement & Production', [
    'Remise à niveau technique ciblée',
    'Optimisation des méthodes de production',
    'Travail sur la structure, la tension, l’identité sonore',
    'Feedback régulier et précis',
    'Mise en place d’un workflow efficace',
  ]),
  new Phase('4', 'Transformer le travail en projet solide.', 'Finalisation & Projection', [
    'Préparation des morceaux pour mix / mastering',
    'Organisation des sessions & exports propres',
    'Accompagnement au live (option)',
    'Vision long terme (suite du projet)',
  ]),
];

export const GUIDANCE_FORMULAS: readonly Formula[] = [
  new Formula('diagnostic', 'Diagnostic Artistique', 'Entrée', [
    '1 session approfondie',
    'Analyse complète + feedback',
    "Plan d'action personnalisé",
  ]),
  new Formula('accompagnement', 'Accompagnement', 'EP 2 à 4 titres ou Album', [
    'Suivi régulier',
    'Objectifs + deadlines',
    'Feedback + coaching technique',
    'Mixage & Mastering',
  ]),
  new Formula('developpement', 'Développement Projet', 'Premium', [
    'Accompagnement à la production',
    'Direction artistique',
    'Feedback + coaching technique',
    'Mixage & Mastering',
  ]),
  new Formula('live-setup', 'Live Setup', 'Option', [
    'Construction du live',
    'Routing / exports',
    'Logique de performance',
  ]),
];
