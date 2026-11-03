// Pages légales obligatoires pour un site marchand en France.
// Ce sont des MODÈLES : complétez les champs [À COMPLÉTER] et faites-les relire par un professionnel.
import { site, money, dateFr } from '../lib.mjs';

const todo = (t) => `<span class="todo">[À COMPLÉTER : ${t}]</span>`;
const legalPage = (path, title, h1, description, body) => ({
  path,
  section: 'legal',
  title: `${title} | ${site.name}`,
  description,
  breadcrumb: [['Accueil', '/'], [h1, path]],
  body: `
<section class="page-hero page-hero-cream">
  <div class="wrap"><h1>${h1}</h1><p class="muted">Dernière mise à jour : ${dateFr(site.updated)}</p></div>
</section>
<section class="section"><div class="wrap prose prose-legal">${body}</div></section>`,
});

const mentions = legalPage(
  '/mentions-legales/',
  'Mentions légales',
  'Mentions légales',
  'Mentions légales du site agripatte.fr : éditeur, directeur de la publication, hébergeur et propriété intellectuelle.',
  `
<h2>Éditeur du site</h2>
<p>Le site ${site.url.replace('https://', '')} est édité par :</p>
<ul>
  <li>Raison sociale : ${todo('nom de la société ou de l’entrepreneur individuel')}</li>
  <li>Forme juridique et capital : ${todo('SAS, SARL, micro-entreprise…, capital social')}</li>
  <li>Adresse du siège : ${todo('adresse postale complète')}</li>
  <li>SIRET : ${todo('numéro SIRET')} ; RCS : ${todo('ville et numéro, si applicable')}</li>
  <li>Numéro de TVA intracommunautaire : ${todo('numéro, ou mention « TVA non applicable, art. 293 B du CGI »')}</li>
  <li>E-mail : <a href="mailto:${site.email}">${site.email}</a> ; téléphone : ${todo('numéro')}</li>
  <li>Directeur ou directrice de la publication : ${todo('nom et prénom')}</li>
</ul>
<h2>Hébergeur</h2>
<p>${todo('nom de l’hébergeur, adresse, téléphone (par exemple OVHcloud, 2 rue Kellermann, 59100 Roubaix)')}</p>
<h2>Propriété intellectuelle</h2>
<p>L’ensemble des contenus de ce site (textes, illustrations, logo, marque ${site.name}) est protégé par le droit de la propriété intellectuelle. Toute reproduction sans autorisation écrite préalable est interdite.</p>
<h2>Données personnelles</h2>
<p>Le traitement de vos données est décrit dans notre <a href="/confidentialite/">politique de confidentialité</a>.</p>`
);

const cgv = legalPage(
  '/cgv/',
  'Conditions générales de vente',
  'Conditions générales de vente',
  'Conditions générales de vente Agripatte : commande, prix, paiement, livraison, droit de rétractation, retours et garanties légales.',
  `
<div class="callout callout-warm"><p>${todo('modèle de CGV à adapter à votre activité et à faire valider par un juriste avant la mise en ligne')}</p></div>
<h2>1. Objet</h2>
<p>Les présentes conditions régissent les ventes de produits conclues sur le site ${site.url.replace('https://', '')} entre ${todo('raison sociale')} (« le vendeur ») et toute personne physique agissant à des fins non professionnelles (« le client »).</p>
<h2>2. Produits</h2>
<p>Les caractéristiques essentielles des produits (composition, tailles, conseils d’utilisation) sont présentées sur chaque fiche produit. Les illustrations ne sont pas contractuelles.</p>
<h2>3. Prix</h2>
<p>Les prix sont indiqués en euros, toutes taxes comprises, hors frais de livraison. Les frais de livraison (${site.shipping.map((s) => `${s.label.toLowerCase()} : ${money(s.price)}`).join(' ; ')}, offerts dès ${money(site.freeShippingFrom)} d’achat) sont indiqués avant la validation de la commande.</p>
<h2>4. Commande</h2>
<p>Le client sélectionne les produits, vérifie le contenu de son panier puis valide sa commande. La vente est conclue à la confirmation du paiement. Un e-mail récapitulatif est envoyé au client.</p>
<h2>5. Paiement</h2>
<p>Le paiement s’effectue en ligne par ${todo('carte bancaire, PayPal…')} via ${todo('prestataire de paiement')}. Le vendeur n’a jamais accès aux données bancaires du client.</p>
<h2>6. Livraison</h2>
<p>Les produits sont livrés en France métropolitaine, à l’adresse indiquée lors de la commande, dans les délais indiqués pour chaque mode de livraison (${site.shipping.map((s) => `${s.label.toLowerCase()} ${s.delay}`).join(', ')}). En cas de retard important, le client peut contacter le vendeur à ${site.email}.</p>
<h2>7. Droit de rétractation</h2>
<p>Conformément à l’article L221-18 du Code de la consommation, le client dispose d’un délai de 14 jours à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à se justifier. Le vendeur étend volontairement ce délai à ${site.returns.days} jours.</p>
<p>Pour l’exercer, le client adresse une déclaration dénuée d’ambiguïté à ${site.email}, ou utilise le formulaire type de rétractation ci-dessous. Le vendeur lui fournit une étiquette de retour ${todo('préciser si les frais de retour sont offerts, comme indiqué sur la page Livraison et retours')}. Le remboursement, frais de livraison initiaux compris, intervient dans les 14 jours suivant la réception de la demande ; il peut être différé jusqu’à la récupération des produits ou la réception d’une preuve d’expédition. La responsabilité du client peut être engagée en cas de dépréciation des produits résultant de manipulations autres que celles nécessaires pour établir leur nature et leurs caractéristiques.</p>
<p><strong>Formulaire type de rétractation</strong> : « À l’attention de ${todo('raison sociale et adresse')}, ${site.email}. Je vous notifie par la présente ma rétractation du contrat portant sur la vente du bien ci-dessous : [produit], commandé le [date], reçu le [date]. Nom du client, adresse, date, signature (en cas d’envoi papier). »</p>
<h2>8. Garanties légales</h2>
<p>Les produits bénéficient de la garantie légale de conformité (articles L217-3 et suivants du Code de la consommation), qui permet au client d’obtenir la réparation ou le remplacement d’un produit non conforme pendant deux ans à compter de la livraison, et de la garantie des vices cachés (articles 1641 et suivants du Code civil).</p>
<h2>9. Données personnelles</h2>
<p>Les données collectées lors de la commande sont traitées conformément à notre <a href="/confidentialite/">politique de confidentialité</a>.</p>
<h2>10. Médiation</h2>
<p>En cas de litige, le client s’adresse d’abord au vendeur. À défaut de solution amiable, il peut recourir gratuitement au médiateur de la consommation : ${todo('nom, site internet et adresse du médiateur auquel vous adhérez (adhésion obligatoire)')}.</p>
<h2>11. Droit applicable</h2>
<p>Les présentes conditions sont soumises au droit français.</p>`
);

const confidentialite = legalPage(
  '/confidentialite/',
  'Politique de confidentialité',
  'Politique de confidentialité',
  'Comment Agripatte collecte et protège vos données personnelles : finalités, durées de conservation, destinataires, cookies et exercice de vos droits (RGPD).',
  `
<h2>Responsable du traitement</h2>
<p>${todo('raison sociale, adresse')}. Contact : <a href="mailto:${site.email}">${site.email}</a>.</p>
<h2>Données collectées et finalités</h2>
<div class="table-wrap">
  <table class="table">
    <thead><tr><th scope="col">Finalité</th><th scope="col">Données</th><th scope="col">Base légale</th><th scope="col">Durée de conservation</th></tr></thead>
    <tbody>
      <tr><th scope="row">Traitement des commandes et livraison</th><td>Nom, adresse, e-mail, téléphone, contenu de la commande</td><td>Exécution du contrat</td><td>Durée de la relation commerciale, puis 10 ans pour les pièces comptables</td></tr>
      <tr><th scope="row">Réponse à vos messages</th><td>Nom, e-mail, contenu du message</td><td>Intérêt légitime</td><td>3 ans après le dernier échange</td></tr>
      <tr><th scope="row">Newsletter (si vous y êtes inscrit)</th><td>E-mail</td><td>Consentement</td><td>Jusqu’à votre désinscription</td></tr>
    </tbody>
  </table>
</div>
<h2>Destinataires</h2>
<p>Vos données sont destinées au vendeur et à ses prestataires, dans la limite nécessaire : hébergeur du site, prestataire de paiement, transporteur, outil d’envoi d’e-mails ${todo('liste et pays de vos prestataires')}. Elles ne sont jamais vendues.</p>
<h2>Cookies et stockage local</h2>
<p>Ce site n’utilise aucun cookie publicitaire ni outil de mesure d’audience à ce jour. Votre panier est enregistré uniquement dans votre navigateur (stockage local), ce qui est strictement nécessaire au fonctionnement du site et ne requiert pas votre consentement.</p>
<p>${todo('si vous ajoutez un outil de mesure d’audience ou des pixels publicitaires, mettez à jour cette section et ajoutez un bandeau de consentement conforme aux recommandations de la CNIL')}</p>
<h2>Vos droits</h2>
<p>Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données, ainsi que du droit de définir des directives sur leur sort après votre décès. Pour les exercer, écrivez à <a href="mailto:${site.email}">${site.email}</a>. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).</p>`
);

export default [mentions, cgv, confidentialite];
