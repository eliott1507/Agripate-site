# Agripatte — maquette du site

Maquette interactive du site Agripatte (chaussettes antidérapantes pour chats).

## Pages
- `Accueil.dc.html` — accueil
- `Agripatte Fiches Produit v2.dc.html` — fiches produit des 6 paires (`?gamme=neon` pour ouvrir une paire précise)
- `Panier.dc.html` → `Commande.dc.html` → `Confirmation.dc.html` — tunnel d’achat
- `Conseils.dc.html`, `A-propos.dc.html`, `FAQ.dc.html`

## Fichiers partagés
- `SiteHeader.dc.html`, `SiteFooter.dc.html`, `Paw.dc.html` — en-tête, pied de page, patte décorative
- `catalogue.js` — les 6 paires (noms, prix, couleurs) et le panier (stocké dans le navigateur)
- `fun.js` — animations au clic
- `support.js`, `image-slot.js` — moteur d’affichage des pages
- `assets/` — photos produit

## Voir le site en ligne (GitHub Pages)
1. Sur github.com : **New repository** → nom `agripatte-site` → Public → **Create**.
2. **Add file → Upload files** → glisser tout le contenu de ce dossier → **Commit changes**.
3. **Settings → Pages** → Source : *Deploy from a branch*, branche `main`, dossier `/ (root)` → **Save**.
4. Après 1 à 2 minutes, le site est visible sur `https://<ton-pseudo>.github.io/agripatte-site/`.

Les pages doivent être servies par un serveur (GitHub Pages, ou `npx serve` en local) : un double-clic sur le fichier ne suffit pas.

## À savoir
Maquette de design : pas de vrai paiement ni de back-office. Les textes, prix et l’adresse e-mail sont des exemples à remplacer.
