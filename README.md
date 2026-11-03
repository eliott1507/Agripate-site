# Agripatte : le site

Site e-commerce d’**Agripatte, chaussettes antidérapantes pour chat**. Il reprend la maquette d’origine (rangée dans `maquette/`) :
- les 6 paires, les textes, les conseils et l’identité visuelle ;
- reconstruits en site statique pensé pour le référencement Google ;

## Ce qu’il y a dans le dossier

| Dossier / fichier | Rôle |
| --- | --- |
| `src/lib.mjs` | **Les réglages** : domaine, e-mail, prix, livraison, retours, les 6 paires, les tailles. |
| `src/articles.json` | Les 7 articles du coin des conseils. |
| `src/pages/` | Le texte de chaque page. |
| `assets/` | Style, script, polices, images et vidéos publiées. |
| `photos/` | Les photos produits d’origine et leurs détourages (`photos/detoure/`). Non publiées. |
| `motion/` | Les 3 projets HyperFrames : `hero` (défilé des 6 paires), `gamme` (zoom sur les picots, un rendu par paire), `film` (film de marque de 14 s). |
| `tools/` | `photos.mjs` (photos web), `images.mjs` (logo, icônes, image de partage, visuels d’articles), `motion.mjs` (rendu des vidéos). |
| `build.mjs` | Génère le site et lance un audit SEO automatique. |
| `site/` | Le site prêt pour **agripatte.fr** (non versionné, à régénérer). |
| `docs/` | L’aperçu publié sur **GitHub Pages**. |
| `maquette/` | La maquette d’origine, conservée telle quelle. |

## Modifier et régénérer

```bash
node build.mjs            # site/ : version définitive pour https://agripatte.fr
node build.mjs --github   # docs/ : aperçu GitHub Pages
```

Pour prévisualiser : `python3 -m http.server 8090 --directory site`, puis ouvrez http://localhost:8090.

À chaque génération, l’audit vérifie :
- titres et descriptions : uniques et de bonne longueur ;
- balises canonical et `h1` unique ;
- texte `alt` et dimensions des images et vidéos ;
- liens internes cassés ;
- JSON des données structurées.

Si une photo ou un texte change :

```bash
node tools/photos.mjs   # après avoir remplacé une photo dans photos/
node tools/images.mjs   # logo, icônes, image de partage, visuels d’articles (Google Chrome requis)
node tools/motion.mjs   # rend à nouveau les vidéos HyperFrames (FFmpeg requis)
```

Pour retoucher une animation dans le studio HyperFrames : `cd motion/hero && npx hyperframes preview`. C’est la même commande pour `motion/gamme` et `motion/film`.

## Voir le site sur GitHub Pages

Dans **Settings → Pages**, choisissez *Deploy from a branch*, la branche `main` et le dossier **`/docs`**, puis enregistrez. Le site apparaît sur `https://eliott1507.github.io/Agripate-site/`.

Cet aperçu est en `noindex` : Google ne l’indexera pas, pour ne pas faire concurrence au futur domaine. Les anciennes adresses de la maquette (`Accueil.dc.html`, `FAQ.dc.html`…) redirigent vers les nouvelles pages.

Pour la mise en ligne sur **agripatte.fr**, vous avez deux possibilités :
- **Chez un hébergeur** (OVHcloud, o2switch…) : envoyez le contenu de `site/`. Le fichier `.htaccess` gère HTTPS, la version sans www et le cache.
- **Avec GitHub Pages et votre domaine** :
  1. Dans `build.mjs`, retirez `env.base` et `env.preview` du mode `--github`.
  2. Ajoutez un fichier `public/CNAME` contenant `agripatte.fr`.
  3. Relancez `node build.mjs --github`.
  4. Reliez le domaine dans **Settings → Pages**.

## Le motion design

Toutes les vidéos sont muettes. Elles ne se lancent que quand elles sont visibles et restent figées si le visiteur a demandé à limiter les animations.

| Vidéo | Où | Contenu |
| --- | --- | --- |
| Défilé des 6 paires (14,4 s, en boucle) | Ouverture de l’accueil | Chaque paire tombe, rebondit et prend sa couleur. Le nom, l’usage et le prix apparaissent. |
| Zoom picots (6 s, en boucle, × 6) | Chaque fiche produit | Petit saut de la paire, plongée sur les picots, jauge d’adhérence propre à chaque paire. |
| Film de marque (14 s) | Accueil + page vidéo | Une patte glisse sur le parquet, la paire Moussaillon accroche, puis les 6 paires et le logo. |

Sur le site lui-même :
- titre qui rebondit mot à mot ;
- bandeau défilant ;
- inclinaison 3D du visuel à la souris ;
- traînée de pattes qui suit le curseur ;
- vitrine des 6 paires qui défile à l’horizontale pendant qu’on fait défiler la page, le fond prenant la couleur de chaque paire ;
- tracé des étapes qui se dessine au défilement ;
- transitions animées entre les pages (la paire « vole » de la liste vers sa fiche) ;
- effets au clic de la maquette : pattes, « Miaou ! », pattes qui volent vers le panier, pluie de pattes.

## Ce qui est fait pour le référencement

Mis en place d’après les guides de Google Search Central : démarrage SEO, fonctionnement de la recherche, contenu utile, optimisation pour l’IA générative, contenu généré par IA, guides développeurs et SEO tiers.

**Exploration et indexation**
- **Tout le texte est dans le HTML.** La maquette construisait ses pages en JavaScript : Google devait exécuter le script pour voir le contenu.
- Liens en vrais `<a href>`, avec des ancres descriptives.
- `sitemap.xml` avec les dates de mise à jour et le sitemap vidéo. `robots.txt` ouvert, CSS et JS compris.
- Panier, commande, confirmation et 404 en `noindex`, et absents du sitemap.
- Une vraie page 404.

**Une page par contenu**
- Une URL par paire : `/chaussettes-antiderapantes-chat/moussaillon/`. La maquette mettait les 6 paires sur une seule page, avec `?gamme=`.
- Une URL par article.
- Balise `canonical` partout, et URL de variantes `?taille=s|m|l` qui pointent vers la fiche.

**Contenu utile et fiable (« Qui, comment, pourquoi »)**
- Les articles sont signés « l’équipe Agripatte », avec un lien vers la page À propos, et datés.
- Une section « Comment on teste nos chaussettes » sur la page À propos.
- Un rappel vétérinaire sur les sujets de santé. Aucun faux avis, aucune note inventée.
- Des fiches enrichies : pour quel chat, tailles, enfilage, entretien, questions, articles liés.
- Une page vidéo avec la description texte de chaque passage, car Google ne lit pas le texte dans une vidéo.

**Données structurées (JSON-LD)**
- `Organization`, avec le logo, le contact et la politique de retour.
- `WebSite`.
- `ProductGroup`, avec 3 variantes de taille par paire : prix, stock, 2 modes de livraison avec délais, retours. Ce sont les fiches marchandes.
- `CollectionPage` + `ItemList`.
- `Blog` + `BlogPosting`, avec des images en 16:9, 4:3 et 1:1.
- `FAQPage`, `AboutPage`, `ContactPage`, `VideoObject`, `BreadcrumbList`.

**Recherche par IA (AI Overviews, AI Mode)**
- Google l’écrit : ce sont les mêmes bases que le SEO classique.
- Donc **pas de fichier `llms.txt`**, pas de balisage « IA » spécial, pas de contenu découpé en morceaux.
- Le site fournit un **flux produits Merchant Center**, `merchant-center.xml`, conseillé par Google pour apparaître dans les réponses IA et l’onglet Shopping.

**Images, vidéos, vitesse**
- Photos détourées en WebP avec texte `alt` descriptif et dimensions.
- JPG fond blanc 1:1, 4:3 et 16:9 pour Google et Merchant Center.
- Vidéos légères, de 280 à 760 Ko, avec image d’aperçu, chargées seulement quand elles deviennent visibles.
- Le titre d’ouverture est visible dès le premier affichage, ce qui est bon pour le LCP.
- Polices hébergées sur le site, sans Google Fonts : plus rapide et conforme au RGPD.
- Un seul CSS et un seul JS. Site adapté au mobile.

## À faire avant la mise en ligne

1. **Mentions légales, CGV, confidentialité** : cherchez `À COMPLÉTER` dans `src/pages/legal.mjs`, puis faites relire.
2. **Vérifier les informations** dans `src/lib.mjs`. Elles viennent de la maquette ou sont déduites, et doivent correspondre à la réalité, car Google les compare au site et au flux :
   - prix et matières ;
   - délai de préparation (1 jour ouvré) ;
   - retours offerts (`FreeReturn`) ;
   - tarifs de livraison.
3. **Paiement** : le tunnel affiche « Maquette : le paiement n’est pas encore branché ». Branchez Stripe Checkout ou PayPal dans `assets/js/main.js` (repère `data-checkout`), ou reprenez le catalogue dans Shopify.
4. **Les photos** : si les visuels produits ont été **générés par IA**, Google Merchant Center exige la métadonnée IPTC `DigitalSourceType = TrainedAlgorithmicMedia`. Vous pouvez l’ajouter avec exiftool :
   `exiftool -XMP-iptcExt:DigitalSourceType="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia" photos/*.png`
   Le mieux reste de vraies photos des produits, et de vrais chats testeurs sur la page À propos.

## Checklist de lancement

- [ ] Créer une propriété **Domaine** dans [Google Search Console](https://search.google.com/search-console) et la valider.
- [ ] Envoyer `https://agripatte.fr/sitemap.xml` dans Search Console.
- [ ] Tester l’accueil et une fiche avec l’**outil d’inspection d’URL**, puis le [test des résultats enrichis](https://search.google.com/test/rich-results).
- [ ] Vérifier que les **fonctionnalités d’IA générative** de la recherche sont autorisées pour le site dans les paramètres de Search Console.
- [ ] Ouvrir [Google Merchant Center](https://merchants.google.com/) et y déclarer le flux `https://agripatte.fr/merchant-center.xml`.
- [ ] Mesurer la vitesse sur mobile avec [PageSpeed Insights](https://pagespeed.web.dev/).
- [ ] Faire connaître le site, car c’est surtout par les liens que Google découvre un site :
  - Instagram et TikTok, avec les vidéos du dossier `assets/video/` ;
  - groupes de propriétaires de chats ;
  - vétérinaires, refuges, toiletteurs ;
  - l’adresse du site sur les emballages.
- [ ] Publier un conseil utile par mois, et collecter de vrais avis clients.
- [ ] Suivre Search Console, dont le rapport sur les fonctionnalités d’IA générative. Attendre quelques semaines avant de juger un changement.

**Si vous faites appel à un prestataire SEO** : méfiez-vous des garanties de classement, des promesses de « relation privilégiée avec Google » et des offres « AEO/GEO » miracle. Demandez-lui de citer la documentation officielle de Google. Pour un audit, donnez-lui un accès Search Console **en lecture seule**.
