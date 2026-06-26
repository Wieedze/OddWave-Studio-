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
  new Formula(
    'starter',
    'Starter',
    "Un diagnostic d'1h30 en visio pour faire le point sur votre projet, votre workflow et les premières pistes d'amélioration.",
    'Visio · 1h30',
  ),
  new Formula(
    'pack-2-4',
    'Pack 2 à 4 titres',
    'Suivi complet sur plusieurs morceaux : coaching technique, mix et master, échanges réguliers tout au long de la production.',
    'Suivi · 2 à 4 titres',
  ),
  new Formula(
    'premium',
    'Premium',
    "Développement de projets ou d'albums dans la durée : direction artistique, finalisation, stratégie de sortie.",
    'Projet · album',
  ),
  new Formula(
    'live-setup',
    'Live setup',
    'Construction et optimisation de vos performances scéniques : du routing au rendu sonore en conditions réelles.',
    'Scène · live',
  ),
];
