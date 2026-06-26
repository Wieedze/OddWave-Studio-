# Prompt à coller dans Claude Code

Copie le bloc ci‑dessous dans Claude Code (à la racine de ton dépôt, avec ce dossier `design_handoff_oddwave_site/` présent).

---

Tu vas construire le site vitrine **OddWave Studio** (studio audio : mastering, mixage, production, sound design, accompagnement d'artistes).

Les designs de référence sont dans `design_handoff_oddwave_site/`. **Commence par lire `design_handoff_oddwave_site/README.md` en entier**, puis `Design System OddWave.dc.html` (tokens) et `Landing OddWave GSAP.dc.html` (home + nav/footer + motion).

Important :
- Les fichiers `.dc.html` sont des **références de design** (HTML + styles inline + une classe `Component` pour le comportement). **Ne porte pas** leur runtime interne (`support.js`, `<x-dc>`, `{{ … }}`). Lis le markup/les styles pour le rendu, et la classe `Component` pour l'état/les interactions, puis **recrée** tout proprement.
- Reproduis le design en **haute fidélité** (couleurs, typo, espacements, motion, copie exacts — tout est dans le README et dans les `style="…"`).

Stack souhaitée : **Astro + TypeScript** (site de contenu, surtout statique), avec :
- Composants partagés `Nav` (pilule centrale qui se déploie au survol) et `Footer` réutilisés sur toutes les pages.
- Polices : Cabinet Grotesk (display), Manrope (texte), JetBrains Mono (labels) — auto‑hébergées si possible.
- Motion : GSAP + ScrollTrigger pour les reveals au scroll, la parallaxe, l'intro du hero, et l'ouverture « cinéma » (clip‑path) du hero Sound Design. Respecte `prefers-reduced-motion`.
- Three.js pour le champ de lignes ambiant de la home (`FloatingLines`).

Pages à livrer (1 route chacune) : Accueil (home GSAP), Le Studio, Le Matériel, Accompagnement, Sound Design, Portfolio, Contact. Le logo/lien « Accueil » pointe partout vers la home.

Détails à ne pas rater (voir README) :
- **Accompagnement** : 4 cartes « phases » avec gros chiffre fantôme (même taille visuelle sur les 4), liste à tirets, + tableau de formules cliquable qui pré‑remplit le formulaire `#demande`.
- **Sound Design** : hero vidéo muet avec ouverture clip‑path ; grille de vidéos avec lecteur modal `<video>` réel (chaque entrée = `{title,cat,dur,note,posterImg,src}`, lecteur réel si `src`). Le client fournira d'autres vidéos pour remplir toute la grille — prévois ce cas.
- Formulaires (Contact, Accompagnement) : valider et afficher un état de confirmation. Branche l'envoi sur le service de ton choix (ou un placeholder `console.log` clairement marqué « TODO backend »).

Contraintes de copie : **pas de tirets cadratins (—) ni demi‑cadratins (–)** comme séparateurs dans le texte visible (le client n'en veut pas) ; pas de retour à la ligne forcé en milieu de phrase.

Quand tu as un doute sur une mesure/couleur/texte, la valeur exacte est dans le fichier `.dc.html` correspondant. Mets en place la structure du projet, les composants partagés, puis page par page. Demande‑moi avant d'ajouter du contenu qui n'est pas dans les designs.
