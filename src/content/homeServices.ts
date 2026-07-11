// Landing "prestations" — verbatim copy from design-handoff/Landing OddWave GSAP.dc.html.
// Do not edit the French copy; it is the client's exact wording. The bodies are
// split into paragraphs at sentence boundaries only (user request, 2026-07-11).

import { ServiceItem } from '@/models';

export const HOME_SERVICES: readonly ServiceItem[] = [
  new ServiceItem(
    'mastering',
    'Mastering',
    [
      "Le mastering est l'étape finale de votre production. Il vise à présenter votre musique sous son meilleur jour, quelle que soit la plateforme : on affine et on donne une finition brillante à votre travail, en mettant en valeur tous les détails auxquels vous avez consacré tant de temps.",
      "Pour cette phase, un simple fichier stéréo de votre mix suffit. Mon rôle premier est d'apporter une oreille neuve, avertie et experte à votre production. Si je peux vous conseiller pour mieux porter votre message, je m'attache à vous guider afin que le travail soit d'une qualité optimale.",
      "Techniquement, je me concentre sur la dynamique, l'équilibre fréquentiel, la profondeur, la largeur, la couleur tonale d'ensemble, ainsi que le contrôle qualité final et l'adaptation aux différents environnements d'écoute.",
    ],
    '/assets/ssl-elysia-knobs.jpg',
    'right',
    'center 74%',
  ),
  new ServiceItem(
    'stem-mastering',
    'Stem Mastering',
    [
      "Le stem mastering partage la même ambition que le mastering classique, mais offre cette fois davantage d'espace pour sculpter en détail les différents éléments clés de vos morceaux. C'est une forme de mixage plus complète, toujours dans une optique de finalisation.",
      "Dans la plupart des cas, j'ai besoin des éléments suivants : kick, basse, caisse claire, percussions, leads, FX, nappes, voix, ou tout autre élément nécessitant un traitement spécifique.",
      "Sans jamais altérer l'intention de votre mix, je travaille la cohésion et la cohérence de tous les éléments importants : les phases, l'équilibre, la dynamique et la couleur de chaque composante, pour poser des fondations rythmiques solides qui soutiennent au mieux leur harmonie.",
      "Le stem mastering permet aussi, lorsque plusieurs titres partagent un même contexte (EP ou album), de travailler la cohérence entre les morceaux et de leur donner une intention commune.",
    ],
    '/assets/console.jpg',
    'left',
    '70% 88%',
  ),
  new ServiceItem(
    'mixage',
    'Mixage',
    [
      "Le mixage est l'une des étapes les plus cruciales de votre production. Comme dans une recette, le juste dosage des épices ou des ingrédients peut tout changer. Il n'existe évidemment pas de recette unique : avec les mêmes ingrédients, je peux vous proposer une grande variété de saveurs jusqu'à trouver celle qui vous correspond, tout en garantissant un équilibre parfait.",
      "Deux approches sont possibles. Pour les groupes de musique instrumentale, je travaille l'ensemble des pistes pour mixer vos productions, avec les éditions et arrangements nécessaires, et je peux proposer des suggestions via de courtes vidéos explicatives.",
      "Pour les producteurs de musique électronique, architectes de leur création, je travaille sur des pistes et groupes de pistes précis afin de respecter vos choix de production et rendre le travail plus clair et efficace. Si besoin, un accompagnement en amont peut être réalisé en analysant vos sessions et en préparant vos exports.",
    ],
    '/assets/mastering-bokeh.jpg',
    'right',
    'center 60%',
  ),
];

/** Final CTA block on the landing (verbatim). */
export const HOME_CTA = {
  title: 'Donnons une dimension à votre son.',
  body: 'À distance ou en résidence. Dites-nous où vous en êtes, on vous répond avec une proposition adaptée.',
  buttonLabel: 'Démarrer un projet →',
  eyebrow: 'Production · Mixage · Mastering · Sound design',
} as const;
