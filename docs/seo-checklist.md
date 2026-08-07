# Checklist SEO / GEO — OddWave Studio

Objectif : sortir sur "studio mastering / mixage / enregistrement / sound design"
autour de Marseille, Aubagne, Aix-en-Provence, La Ciotat, Toulon, et être
recommandé par les IA (ChatGPT, Gemini, Perplexity, Copilot).

Rappel de la règle du projet : Auriol et la zone n'apparaissent que dans les
métadonnées (title, description, JSON-LD, llms.txt), jamais dans l'interface
visible, et aucune adresse postale n'est publiée nulle part.

## 1. Socle technique on-site (fait le 2026-08-07)

- [x] Titre + meta description uniques par page (`src/content/seo.ts` + composant `Seo`)
- [x] Canonical + Open Graph + Twitter card par page
- [x] JSON-LD LocalBusiness en mode zone desservie, sans adresse (`SeoService`)
- [x] `public/robots.txt` : robots IA autorisés (GPTBot, ClaudeBot, PerplexityBot...)
- [x] `public/sitemap.xml` : les 8 routes (à mettre à jour à la main si nouvelle page)
- [x] `public/llms.txt` : le studio décrit pour les assistants IA
- [x] favicon.png compressé (1,6 Mo -> 25 Ko), og.jpg 1200x630 comme image de partage

## 2. Au déploiement (une fois)

- [ ] `bun run build` : vérifier dans `dist/` que chaque page a son propre `<title>`
      et le bloc `application/ld+json`
- [ ] Commit + deploy sur le Worker de prod
- [ ] Choisir le domaine canonique et rediriger l'autre en 301 :
      `www.oddwavestudio.com` -> `oddwavestudio.com` (règle Cloudflare).
      Un seul domaine doit répondre, sinon Google divise le score entre les deux
- [ ] Vérifier en prod : `oddwavestudio.com/robots.txt`, `/sitemap.xml`, `/llms.txt`
      et `/og.jpg` répondent bien
- [ ] Tester le JSON-LD : https://search.google.com/test/rich-results
- [ ] Tester le partage social : https://www.opengraph.xyz (l'image et le titre
      de chaque page doivent s'afficher)

## 3. Indexation (semaine 1 après mise en ligne)

- [ ] Google Search Console : https://search.google.com/search-console
      (propriété "Domaine", validation par DNS, facile depuis Cloudflare)
- [ ] Soumettre le sitemap dans Search Console
- [ ] Bing Webmaster Tools : https://www.bing.com/webmasters
      (bouton "importer depuis Search Console", 2 minutes). Indispensable :
      ChatGPT s'appuie sur l'index Bing
- [ ] Demander l'indexation de la page d'accueil dans les deux outils

## 4. Fiches locales (le levier n°1 pour Google ET les IA)

Partout : mêmes nom "OddWave Studio", même email contact@oddwave.studio, même
lien site, mêmes photos. Adresse masquée à chaque fois, zone desservie à la place.

- [ ] Google Business Profile : https://business.google.com
      Catégorie "Studio d'enregistrement". Mode "entreprise de zone" :
      l'adresse reste privée, tu déclares Marseille, Aubagne, Aix-en-Provence,
      La Ciotat, Toulon (jusqu'à 20 zones). Photos du studio, description avec
      les services. Nourrit Google Maps, le pack local, Gemini et les AI Overviews
- [ ] Bing Places : https://www.bingplaces.com
      (option de synchro depuis Google Business Profile). Nourrit ChatGPT et Copilot
- [ ] Foursquare : https://location.foursquare.com
      Première source des recommandations locales de ChatGPT
- [ ] Yelp : https://biz.yelp.fr — deuxième source de ChatGPT
- [ ] Mettre le lien du site dans la bio Instagram @oddwave.studio

## 5. Avis clients (en continu, dès la première fiche)

- [ ] Mettre en place le réflexe : après chaque projet livré, envoyer le lien
      d'avis Google au client
- [ ] Suggérer aux clients de mentionner le service et la ville dans l'avis
      ("mastering de mon EP", "studio près de Marseille")
- [ ] Répondre à chaque avis (signal d'activité pour Google et les IA)
- [ ] Quelques avis aussi sur Yelp et Foursquare si possible

## 6. Mentions extérieures (ce que les IA recoupent)

- [ ] S'inscrire sur StarOfService (les concurrents y sont : Sud Sono, Voila
      Records, Evertone... pas OddWave)
- [ ] Annuaires musique / studios français (Trouver Un Studio, Audiofanzine,
      pages locales type Pôle Info Musique)
- [ ] Page ou mention sur le site du label + liens croisés
- [ ] Viser 1 ou 2 articles / interviews (presse locale, blogs MAO, podcasts) :
      chaque mention indépendante augmente la probabilité d'être cité par une IA

## 7. Contenu (lot suivant, quand tu veux)

- [ ] Horaires décidés -> les ajouter au JSON-LD (une ligne dans `SeoService`)
- [ ] Bloc FAQ par page de service ("Proposez-vous le mastering à distance ?",
      "Comment envoyer mes stems ?") : le format le plus cité par les IA
- [ ] Contenu pour le public "je veux progresser" (conseils sound design,
      préparation de mix...) : personne ne le fait dans la région
- [ ] La page Guide d'export est déjà un bon atout : la garder à jour

## 8. Entretien (une fois par mois)

- [ ] Un post Google Business Profile par semaine (sortie d'un projet, photo studio)
- [ ] Regarder les requêtes dans Search Console : quelles recherches amènent du
      trafic, quelles pages sortent
- [ ] Tester soi-même dans ChatGPT et Perplexity : "meilleur studio de mastering
      près de Marseille", "studio sound design Aubagne" et noter si OddWave sort
- [ ] Nouvelle page sur le site -> l'ajouter dans `sitemap.xml` et `src/content/seo.ts`
