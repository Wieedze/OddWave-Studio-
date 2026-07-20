// Services page content. Six "prestations" panels, verbatim client copy (do
// not edit the French; bodies split into paragraphs at sentence boundaries
// only, user request 2026-07-11). The first three come from
// design-handoff/Landing OddWave GSAP.dc.html (moved off the landing, July
// 2026 feedback); the last three were added from the client's modif.txt
// (July 2026, batch 2) with per-panel CTA links to /sound-design and
// /guidance.

import { ServiceItem } from '@/models';

export const SERVICES_PAGE = {
  heroTitle: 'SERVICES',
  heroEyebrow: 'Mastering · Mixage · Production · Sound design · Accompagnement',
  /** Final CTA block (verbatim, formerly the landing CTA). */
  ctaTitle: 'Donnons une dimension à votre son.',
  ctaBody: 'À distance ou en résidence. Dites-nous où vous en êtes, on vous répond avec une proposition adaptée.',
  ctaLabel: 'Démarrer un projet →',
} as const;

export const SERVICES: readonly ServiceItem[] = [
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
      "Le stem mastering partage la même ambition que le mastering classique, mais offre cette fois davantage d'espace pour sculpter en détail les différents éléments clés de vos morceaux.",
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
  new ServiceItem(
    'sound-design-post-production',
    'Sound Design & Post Production',
    [
      "Le son est un élément essentiel de la narration. Il donne vie aux images, renforce les émotions et participe pleinement à l'immersion du spectateur. Qu'il soit discret ou au premier plan, un univers sonore bien conçu apporte une véritable identité à chaque projet.",
      "J'interviens sur la création de sound design pour le cinéma, les courts-métrages, documentaires, reportages, publicités, jeux vidéo ou tout autre contenu audiovisuel. Bruitages, ambiances, effets spéciaux, textures sonores ou traitements créatifs : chaque élément est pensé pour servir le récit et accompagner l'image avec précision.",
      "En complément du sound design, je peux également assurer l'enregistrement de voix off, le montage son, l'édition, le nettoyage des prises, le mixage et la finalisation des bandes sonores afin de livrer un résultat cohérent, immersif et prêt à la diffusion.",
    ],
    '/assets/materiel-console.jpg',
    'left',
    'center',
    'Extrait des travaux réalisés par le studio →',
    '/sound-design',
  ),
  new ServiceItem(
    'production-composition',
    'Production & Composition',
    [
      "Chaque projet musical est unique. Qu'il s'agisse d'une bande son, d'un morceau destiné à un artiste ou d'une création entièrement originale, mon objectif est de composer une musique qui porte une émotion, raconte une histoire et reflète pleinement votre identité.",
      "J'interviens sur la composition, la production, l'arrangement et le développement musical pour des chanteurs, groupes, producteurs, réalisateurs, agences ou toute personne souhaitant donner vie à une idée. Que vous partiez d'une simple mélodie, d'un texte, d'une maquette ou d'un cahier des charges précis, je vous accompagne dans la création d'une œuvre sur mesure, adaptée à votre projet.",
      "La prestation peut également inclure la production complète, les enregistrements, le mixage et le mastering afin de livrer un résultat professionnel, prêt à être diffusé. Lorsque le projet le nécessite, je travaille en collaboration avec un réseau de musiciens instrumentistes professionnels (guitare, basse, batterie, cordes, cuivres, piano, voix, etc.) afin d'apporter les meilleures compétences à chaque production et d'offrir une grande richesse artistique.",
    ],
    '/assets/machine-tubetech.jpg',
    'right',
    'center',
  ),
  new ServiceItem(
    'guidance-artistic-direction',
    'Accompagnement & Direction Artistique',
    [
      "Développer un projet musical demande bien plus que de produire de bons morceaux. Il faut construire une identité forte, prendre les bonnes décisions au bon moment et conserver une vision cohérente sur le long terme.",
      "Mon accompagnement s'adresse aux artistes qui souhaitent bénéficier d'un regard extérieur expérimenté pour faire évoluer leur projet. Ensemble, nous analysons votre musique, vos références, vos objectifs et votre positionnement afin d'identifier les axes de progression les plus pertinents.",
      "Au-delà des sessions de travail, je propose un véritable suivi personnalisé. Chaque étape importante peut être accompagnée de retours détaillés, d'analyses techniques et artistiques, ainsi que de vidéos explicatives permettant de comprendre les choix réalisés. L'objectif n'est pas seulement d'améliorer vos productions actuelles, mais de vous transmettre une méthode de travail durable qui vous permettra de progresser de manière autonome sur vos futurs projets.",
    ],
    '/assets/eleve-close.jpg',
    'left',
    'center',
    'Cliquez ici pour le détail des services →',
    '/guidance',
  ),
];
