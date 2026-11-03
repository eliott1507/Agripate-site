// Tunnel d'achat (panier → commande → confirmation) et page 404 : pages utiles aux visiteurs, mais exclues de l'index (noindex).
import { site, gammes, money, gammeUrl, photo, pawSvg, gammeCard, u } from '../lib.mjs';

// Catalogue lu par le script du panier (prix, photos, liens)
const catalogue = `<script type="application/json" id="catalogue">${JSON.stringify({
  free: site.freeShippingFrom,
  shipping: site.shipping.map(({ code, label, carrier, price, delay }) => ({ code, label, carrier, price, delay })),
  items: Object.fromEntries(gammes.map((g) => [g.slug, { name: g.name, price: g.price, image: u(photo.cutout(g)), url: u(gammeUrl(g)), tint: g.tint }])),
}).replace(/</g, '\\u003c')}</script>`;

const demo = `<p class="demo-note" role="note">${pawSvg('mini-paw')} Maquette : le paiement n’est pas encore branché, aucune commande n’est enregistrée ni débitée.</p>`;

const panier = {
  path: '/panier/',
  section: 'panier',
  noindex: true,
  title: `Ton panier | ${site.name}`,
  description: 'Le panier de ta commande Agripatte.',
  body: `
${catalogue}
<section class="section wrap cart-page" data-cart-page>
  <p class="checkout-steps"><span class="is-on">1. Panier</span><span>2. Livraison et paiement</span><span>3. C’est parti</span></p>
  <h1>Ton panier</h1>
  <div class="cart-layout">
    <div>
      <ul class="cart-lines" data-cart-lines></ul>
      <div class="cart-empty" data-cart-empty hidden>
        ${pawSvg('empty-paw')}
        <p>Ton panier est vide. Même pas une petite paire&nbsp;?</p>
        <a class="btn btn-primary" href="/chaussettes-antiderapantes-chat/" data-fun="paws">Voir les 6 paires <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <aside class="summary" data-cart-summary>
      <h2>Récapitulatif</h2>
      <div class="free-meter" data-free-meter><p data-free-text></p><div class="free-bar"><span data-free-bar></span>${pawSvg('free-paw')}</div></div>
      <dl class="summary-lines"><div><dt>Sous-total</dt><dd data-subtotal>0,00 €</dd></div><div><dt>Livraison</dt><dd data-ship>calculée à l’étape suivante</dd></div></dl>
      <a class="btn btn-primary btn-block" href="/commande/" data-fun="paws" data-to-checkout>Passer commande <span aria-hidden="true">→</span></a>
      <p class="summary-note">Retours et échanges sous ${site.returns.days} jours.</p>
    </aside>
  </div>
</section>
<section class="section wrap" aria-labelledby="ideas-title">
  <h2 id="ideas-title" class="section-title">Une autre paire pour la route&nbsp;?</h2>
  <div class="pair-grid pair-grid-3">${gammes.slice(0, 3).map((g) => gammeCard(g, { vt: false })).join('\n')}</div>
</section>
`,
};

const field = (name, label, attrs = '') => `<label class="field"><span>${label}</span><input name="${name}" ${attrs}></label>`;
const commande = {
  path: '/commande/',
  section: 'panier',
  noindex: true,
  title: `Livraison et paiement | ${site.name}`,
  description: 'Coordonnées, livraison et paiement de ta commande Agripatte.',
  body: `
${catalogue}
<section class="section wrap checkout" data-checkout-page>
  <p class="checkout-steps"><span class="is-done">1. Panier</span><span class="is-on">2. Livraison et paiement</span><span>3. C’est parti</span></p>
  <h1>Presque fini&nbsp;!</h1>
  ${demo}
  <form class="checkout-layout" action="/confirmation/" method="post" data-checkout>
    <div class="checkout-main">
      <fieldset class="card-block">
        <legend>Tes coordonnées</legend>
        <div class="field-grid">
          ${field('prenom', 'Prénom', 'autocomplete="given-name" required')}
          ${field('nom', 'Nom', 'autocomplete="family-name" required')}
          ${field('email', 'E-mail', 'type="email" autocomplete="email" required')}
          ${field('tel', 'Téléphone', 'type="tel" autocomplete="tel"')}
        </div>
        ${field('chat', 'Le prénom de ton chat (facultatif) <small>On l’écrira sur le colis.</small>', 'autocomplete="off" maxlength="30"')}
      </fieldset>
      <fieldset class="card-block">
        <legend>Livraison</legend>
        ${field('adresse', 'Adresse', 'autocomplete="street-address" required')}
        <div class="field-grid">
          ${field('cp', 'Code postal', 'autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{5}" required')}
          ${field('ville', 'Ville', 'autocomplete="address-level2" required')}
        </div>
        <div class="ship-options">
${site.shipping.map((s, i) => `          <label class="ship"><input type="radio" name="livraison" value="${s.code}"${i === 0 ? ' checked' : ''} data-fun="pop"><span><strong>${s.label}</strong>${s.carrier} · ${s.delay}</span><b data-ship-price="${s.code}">${money(s.price)}</b></label>`).join('\n')}
        </div>
      </fieldset>
      <fieldset class="card-block">
        <legend>Paiement</legend>
        <div class="pay-options">
          <label class="pay"><input type="radio" name="paiement" value="carte" checked data-fun="pop"><span>Carte bancaire</span></label>
          <label class="pay"><input type="radio" name="paiement" value="paypal" data-fun="pop"><span>PayPal</span></label>
        </div>
        <p class="summary-note">Le paiement se fera sur la page sécurisée du prestataire de paiement : tes données bancaires ne passent jamais par Agripatte.</p>
      </fieldset>
    </div>
    <aside class="summary">
      <h2>Ta commande</h2>
      <ul class="mini-lines" data-mini-lines></ul>
      <dl class="summary-lines">
        <div><dt>Sous-total</dt><dd data-subtotal>0,00 €</dd></div>
        <div><dt>Livraison</dt><dd data-ship>—</dd></div>
        <div class="summary-total"><dt>Total</dt><dd data-total>0,00 €</dd></div>
      </dl>
      <button class="btn btn-primary btn-block" type="submit" data-fun="cart">Valider la commande</button>
      <p class="summary-note">En validant, tu acceptes nos <a href="/cgv/">conditions générales de vente</a>.</p>
    </aside>
  </form>
</section>
`,
};

const confirmation = {
  path: '/confirmation/',
  section: 'panier',
  noindex: true,
  title: `Commande reçue | ${site.name}`,
  description: 'Merci pour ta commande Agripatte.',
  body: `
${catalogue}
<section class="section wrap confirm" data-confirm-page>
  <div class="confirm-hero">
    ${['#ff7a59', '#22407a', '#b23a6c', '#8fbf2a'].map((c, i) => pawSvg(`confirm-paw confirm-paw-${i + 1}`, c)).join('')}
    <p class="kicker" data-order-number>Commande</p>
    <h1>Commande reçue, miaou&nbsp;!</h1>
    <p class="lead" data-order-message>Merci ! Tu vas recevoir un e-mail de confirmation.</p>
    ${demo}
  </div>
  <div class="split">
    <div class="card-block">
      <h2>Et maintenant&nbsp;?</h2>
      <ol class="mini-steps">
        <li><strong>On prépare ton colis</strong> sous 1 jour ouvré.</li>
        <li><strong>Tu reçois le suivi</strong> par e-mail dès l’expédition.</li>
        <li><strong>Ton chat essaie ses chaussettes</strong>, une patte à la fois, avec une friandise.</li>
      </ol>
    </div>
    <div class="card-block">
      <h2>Récapitulatif</h2>
      <ul class="mini-lines" data-mini-lines></ul>
      <dl class="summary-lines"><div><dt data-order-mode>Livraison</dt><dd data-ship>—</dd></div><div class="summary-total"><dt>Total</dt><dd data-total>—</dd></div></dl>
    </div>
  </div>
  <p class="center"><a class="btn btn-primary" href="/conseils/enfiler-des-chaussettes-a-son-chat/" data-fun="paws">Lire nos conseils d’enfilage <span aria-hidden="true">→</span></a> <a class="btn btn-ghost" href="/">Retour à l’accueil</a></p>
</section>
`,
};

const notFound = {
  path: '/404.html',
  section: 'autre',
  noindex: true,
  title: `Page introuvable | ${site.name}`,
  description: 'Cette page n’existe pas ou plus.',
  body: `
<section class="section wrap not-found">
  <p class="big-404" aria-hidden="true">4${pawSvg('paw-404')}4</p>
  <h1>Cette page a glissé sous le canapé.</h1>
  <p class="lead">Elle n’existe pas ou plus. Mais les chaussettes, elles, sont toujours là.</p>
  <p><a class="btn btn-primary" href="/chaussettes-antiderapantes-chat/" data-fun="paws">Voir les 6 paires</a> <a class="btn btn-ghost" href="/">Retour à l’accueil</a></p>
</section>
`,
};

export default [panier, commande, confirmation, notFound];
