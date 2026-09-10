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

- [x] `bun run build` : vérifié dans `dist/` (2026-08-07), chaque page a son propre
      `<title>` et le bloc `application/ld+json`
- [x] Commit + deploy sur le Worker de prod
- [x] Domaine canonique : CNAME `www` + Redirect Rule 301 vers l'apex posés et
      vérifiés (chemin conservé, testé racine + pages)
- [x] "Always Use HTTPS" activé et vérifié (2026-08-07) : http apex, http www,
      https www redirigent tous en 301 vers https://oddwavestudio.com, chemin
      conservé, 2 sauts maximum
- [x] Vérifié en prod (2026-08-07) : `robots.txt`, `sitemap.xml`, `llms.txt`
      et `og.jpg` répondent en 200, titres par page servis correctement
- [x] Rebuild + redeploy après le nettoyage des doublons title/description :
      vérifié en prod le 2026-08-07 (1 seul title et 1 seule description par
      page, sameAs JSON-LD avec Instagram + label)
- [x] JSON-LD validé au test de résultats enrichis Google (2026-08-07).
      Piège : tester avec l'URL complète, .com inclus
- [x] Partage social vérifié sur opengraph.xyz (2026-08-07)

## 3. Indexation (semaine 1 après mise en ligne)

- [x] Google Search Console : propriété domaine validée via Cloudflare (2026-08-07)
- [x] Sitemap soumis dans Search Console (2026-08-07)
- [x] Bing Webmaster Tools connecté (2026-08-07)
- [x] Indexation de la page d'accueil demandée (2026-08-07)
- [ ] Contrôle dans quelques jours : `site:oddwavestudio.com` dans Google doit
      lister les pages, et Search Console > Pages doit passer en vert

## 4. Fiches locales (le levier n°1 pour Google ET les IA)

Partout : mêmes nom "OddWave Studio", même email contact@oddwave.studio, même
lien site, mêmes photos. Adresse masquée à chaque fois, zone desservie à la place.

Vérification web du 2026-09-10 (le client dit avoir tout fait) :
- Aucune trace indexée de fiches Foursquare, Yelp ou StarOfService. GBP est
  invisible depuis mes outils (le pack local ne sort pas en recherche
  organique) : demander au client un lien ou une capture de chaque fiche,
  ou re-vérifier dans une semaine (délai d'indexation normal).
- Trouvé en revanche : PagesJaunes et Hoodspot (fiches auto-générées depuis
  le registre SIRENE) qui AFFICHENT l'adresse complète, comme les registres
  officiels (pappers.fr, annuaire-entreprises). Le siège social d'une
  société est public par la loi ; revendiquer la fiche PagesJaunes
  permettrait au moins d'y masquer la rue.
- L'ANCIEN SITE ODOO EST ENCORE EN LIGNE sur oddwavestudio.odoo.com et
  ressort dans les recherches : à dépublier ou rediriger (client, dans son
  compte Odoo), sinon il concurrence le nouveau site.
- Profils existants découverts et ajoutés au sameAs du JSON-LD :
  Facebook (2 126 likes), YouTube, Twitch, Discogs (label + artiste).
- Incohérence Instagram : le site pointe @oddwave.studio (point, copie du
  handoff), le web ne connaît que @oddwave_studio (underscore, compte de
  Théo). À trancher par Max, puis corriger contact.ts + seo.ts + llms.txt.

- [ ] Client : dépublier ou rediriger l'ancien site oddwavestudio.odoo.com
- [x] Fiche Google RETROUVÉE (2026-09-10) : nom "OddWave Studio Auriol",
      description reprise de la checklist client, adresse masquée (point ville
      seulement). Place ID `ChIJfd3b6jmZyRIRoxDQN8GEMdw`, reliée au site via
      `hasMap` dans le JSON-LD. Lien avis à donner aux clients :
      https://search.google.com/local/writereview?placeid=ChIJfd3b6jmZyRIRoxDQN8GEMdw
      NOTE : "Auriol" dans le nom de la fiche = hors guidelines Google (risque
      de suspension) ; conseiller de renommer en "OddWave Studio" simple.
- [ ] Client : fournir lien ou capture des fiches restantes (Bing, Foursquare, Yelp)
- [x] Handle Instagram tranché par Max (2026-09-10) : @oddwave_studio
      (underscore) appliqué dans contact.ts, seo.ts et llms.txt
- [ ] Revendiquer la fiche PagesJaunes et masquer la rue si possible

- [ ] Dans la fiche Google (elle existe, voir plus haut) : vérifier le mode
      "entreprise de zone" pour garder l'adresse privée, les zones déclarées
      (Marseille, Aubagne, Aix-en-Provence, La Ciotat, Toulon), la catégorie
      "Studio d'enregistrement", les photos et la description des services
- [ ] Bing Places : https://www.bingplaces.com
      (option de synchro depuis Google Business Profile). Nourrit ChatGPT et Copilot
- [ ] Foursquare : https://location.foursquare.com
      Première source des recommandations locales de ChatGPT
- [ ] Yelp : https://biz.yelp.fr — deuxième source de ChatGPT
- [ ] Mettre le lien du site dans la bio Instagram @oddwave.studio

## 5. Avis clients (en continu, dès la première fiche)

- [x] La fiche compte déjà 28 avis Google (constaté par Max le 2026-09-10) :
      l'objectif des 10 premiers avis est largement dépassé
- [x] Avis affichés sur le site (2026-09-10) : bandeau note + nombre au-dessus
      des CTA (Services, Matériel, Sound Design, Portfolio) et section
      "Ils en parlent" sur l'accueil et sur Contact. Source : API Places (New)
      via `/api/reviews`, mise en place détaillée dans `docs/deploy.md`
- [ ] **Poser `GOOGLE_MAPS_API_KEY` sur le Worker de prod** : sans la clé, la
      route répond 503 et le site masque simplement le bandeau et la section
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
