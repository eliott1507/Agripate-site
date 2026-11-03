// Page collection (les 6 paires) et une fiche produit par paire.
import {
  site, sizes, gammes, articles, abs, esc, money, minPrice, gammeUrl, articleUrl, photo, motion, hasMotion,
  gripMeter, pawSvg, gammeCard, articleCard, faqHtml, productSchema, loopVideo, u,
} from '../lib.mjs';

const collectionPath = '/chaussettes-antiderapantes-chat/';
const sizeTable = (caption) => `<div class="table-wrap"><table class="table">
  <caption>${caption}</caption>
  <thead><tr><th scope="col">Taille</th><th scope="col">Pour</th><th scope="col">Poids du chat</th></tr></thead>
  <tbody>
${sizes.map((s) => `    <tr><th scope="row">${s.label}</th><td>${s.who}</td><td>${s.weight}</td></tr>`).join('\n')}
  </tbody>
</table></div>`;

// ---------- Collection ----------
const collection = {
  path: collectionPath,
  section: 'produits',
  title: 'Chaussettes antidérapantes pour chat : nos 6 paires | Agripatte',
  description: `Les 6 paires de chaussettes antidérapantes Agripatte : chaton, chat âgé, parquet, escalier, hiver. Picots en silicone, tailles S à L, de ${money(minPrice)} à 19,90 € les 4.`,
  breadcrumb: [['Accueil', '/'], ['Chaussettes antidérapantes pour chat', collectionPath]],
  schema: [
    {
      '@type': 'CollectionPage',
      '@id': `${abs(collectionPath)}#page`,
      name: 'Chaussettes antidérapantes pour chat',
      url: abs(collectionPath),
      inLanguage: 'fr-FR',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: gammes.length,
        itemListElement: gammes.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(gammeUrl(g)), name: g.name })),
      },
    },
  ],
  body: `
<section class="page-hero page-hero-peach">
  <div class="wrap page-hero-inner">
    <div>
      <p class="kicker">Miaou garanti</p>
      <h1>Chaussettes antidérapantes pour chat : nos 6 paires</h1>
      <p class="lead">Fini le patinage sur le parquet. Six paires, une pour chaque genre de chat : le chaton tout fou, le sprinteur de 3 h du matin ou le vieux sage qui aime ses siestes.</p>
    </div>
    <p class="page-hero-sticker" aria-hidden="true">${pawSvg('mini-paw')} 4 chaussettes par paire</p>
  </div>
</section>

<section class="section wrap" aria-labelledby="paires-title">
  <h2 id="paires-title" class="visually-hidden">Les 6 paires</h2>
  <div class="pair-grid">
${gammes.map((g) => gammeCard(g)).join('\n')}
  </div>
</section>

<section class="section wrap" aria-labelledby="compare-title">
  <h2 id="compare-title" class="section-title" data-reveal>Laquelle pour mon chat&nbsp;?</h2>
  <div class="table-wrap" data-reveal>
    <table class="table compare">
      <caption class="visually-hidden">Comparatif des 6 paires de chaussettes antidérapantes Agripatte</caption>
      <thead><tr><th scope="col">Paire</th><th scope="col">Idéale pour</th><th scope="col">Adhérence</th><th scope="col">Matière</th><th scope="col">Prix (les 4)</th></tr></thead>
      <tbody>
${gammes
  .map(
    (g) => `        <tr style="--tint:${g.tint};--deep:${g.deep}"><th scope="row"><a href="${gammeUrl(g)}"><img src="${photo.cutout(g)}" alt="" width="512" height="512" loading="lazy" decoding="async">${esc(g.name)}</a></th><td>${esc(g.usage)}</td><td>${gripMeter(g)} ${esc(g.gripLabel)}</td><td>${esc(g.matiere)}</td><td class="nowrap">${money(g.price)}</td></tr>`
  )
  .join('\n')}
      </tbody>
    </table>
  </div>
</section>

<section class="section wrap split" aria-labelledby="picots-title">
  <div data-reveal>
    <h2 id="picots-title" class="section-title">Comment marchent les picots&nbsp;?</h2>
    <p>Les coussinets d’un chat sont faits pour accrocher sur la terre, l’herbe ou l’écorce. Sur un parquet vitrifié ou un carrelage poli, ils n’ont presque plus de prise. Nos chaussettes ajoutent sous chaque coussinet des picots en silicone, souples, qui freinent sans bloquer.</p>
    <p>Plus les picots sont larges et durs, plus ils accrochent : c’est ce que mesure la jauge d’adhérence de chaque paire. Les Essentielles et Guimauve ont une bonne adhérence, Moussaillon et Flocon une adhérence forte, Néon l’adhérence maximale. Douce Sieste privilégie la stabilité et le confort.</p>
    <p>Pour les garder en forme, lave-les à l’envers à 30 °C et laisse-les sécher à plat : <a href="${articleUrl(articles.find((a) => a.id === 'lavage'))}">nos conseils d’entretien</a>.</p>
  </div>
  <div data-reveal>
    <h2 class="section-title">Quelle taille&nbsp;?</h2>
    ${sizeTable('Choisir la taille selon le poids du chat')}
    <p>Entre deux tailles, prends la plus petite. <a href="/guide-des-tailles/">Le guide des tailles complet</a>.</p>
  </div>
</section>
`,
};

// ---------- Fiches produit ----------
const generalFaq = [
  ['Quelle taille choisir ?', `Pèse ton chat : S de 1 à 3 kg, M de 3 à 5 kg, L à partir de 5 kg. Si tu hésites entre deux tailles, prends la plus petite : une chaussette trop grande tourne autour de la patte. Tu peux l’échanger gratuitement sous ${site.returns.days} jours.`],
  ['Combien de temps peut-il les porter ?', 'Quelques heures par jour, à l’intérieur. Retire-les la nuit pour que les coussinets respirent, et ne le laisse pas les porter quand tu n’es pas là.'],
  ['Comment les laver ?', 'En machine à 30 °C, à l’envers pour protéger les picots. Pas de sèche-linge : laisse-les sécher à plat.'],
];

function productPage(g) {
  const url = gammeUrl(g);
  const related = articles.filter((a) => a.gamme === g.slug);
  const others = gammes.filter((x) => x !== g);
  const m = motion.gamme(g);
  const catalogue = { slug: g.slug, name: g.name, price: g.price, image: u(photo.cutout(g)), url: u(url), tint: g.tint };

  return {
    path: url,
    section: 'produits',
    tint: g.tint,
    deep: g.deep,
    bodyClass: 'is-product',
    title: g.seoTitle,
    description: g.description,
    ogType: 'product',
    og: { src: photo.jpg(g, '16x9'), width: 910, height: 512, alt: g.alt },
    preload: `<link rel="preload" href="${photo.cutout(g)}" as="image" fetchpriority="high">\n`,
    breadcrumb: [['Accueil', '/'], ['Chaussettes antidérapantes pour chat', collectionPath], [g.name, url]],
    schema: [productSchema(g)],
    body: `
<section class="product wrap" aria-labelledby="product-title">
  <div class="product-media" data-tilt>
    <div class="product-stage">
      ${pawSvg('stage-paw stage-paw-1')}${pawSvg('stage-paw stage-paw-2')}
      <img class="product-photo" src="${photo.cutout(g)}" alt="${esc(g.alt)}" width="512" height="512" fetchpriority="high" style="view-transition-name:paire-${g.slug}">
      ${loopVideo(m, `Gros plan animé sur les picots en silicone de la paire ${g.name}`, 'product-video')}
    </div>
    <p class="product-price-tag"><strong>${money(g.price)}</strong> les 4</p>
  </div>

  <div class="product-info">
    <p class="product-chips"><span>${esc(g.usage)}</span><span>${esc(g.tier)}</span></p>
    <h1 id="product-title"><span class="h1-kicker">Chaussettes antidérapantes pour chat</span> ${esc(g.name)}</h1>
    <p class="product-pitch">${esc(g.pitch)}</p>
    <p class="product-grip">${gripMeter(g)} Adhérence ${esc(g.gripLabel.toLowerCase())}</p>

    <form class="buy" data-buy>
      <script type="application/json" data-product>${JSON.stringify(catalogue).replace(/</g, '\\u003c')}</script>
      <fieldset class="sizes">
        <legend>Taille de ton chat <a href="/guide-des-tailles/">Guide des tailles</a></legend>
${sizes.map((s, i) => `        <label class="size"><input type="radio" name="taille" value="${s.label}"${i === 1 ? ' checked' : ''} data-fun="pop"><span><strong>${s.label}</strong>${s.who} · ${s.weight}</span></label>`).join('\n')}
      </fieldset>
      <div class="buy-row">
        <div class="qty" role="group" aria-label="Quantité">
          <button type="button" data-qty="-1" aria-label="Retirer une paire" data-fun="pop">−</button>
          <output data-qty-value aria-live="polite">1</output>
          <button type="button" data-qty="1" aria-label="Ajouter une paire" data-fun="pop">+</button>
        </div>
        <button class="btn btn-primary btn-cart" type="submit" data-fun="cart">${pawSvg('btn-paw')}<span data-cart-label>Ajouter au panier · ${money(g.price)}</span></button>
      </div>
      <p class="buy-note" data-buy-note role="status"></p>
    </form>

    <ul class="reassure">
      <li>Livraison offerte dès ${site.freeShippingFrom} €, sinon dès ${money(Math.min(...site.shipping.map((s) => s.price)))}</li>
      <li>Retours et échanges de taille sous ${site.returns.days} jours</li>
      <li>Préparée sous 1 jour ouvré</li>
    </ul>

    <dl class="specs">
      <div><dt>Coloris</dt><dd>${esc(g.coloris)}</dd></div>
      <div><dt>Matière</dt><dd>${esc(g.matiere)}, picots en silicone</dd></div>
      <div><dt>Entretien</dt><dd>${esc(g.care)}</dd></div>
      <div><dt>Dans la boîte</dt><dd>${esc(g.contenu)}</dd></div>
      <div><dt>Référence</dt><dd>${g.sku}</dd></div>
    </dl>
  </div>
</section>

<section class="section wrap" aria-labelledby="features-title">
  <h2 id="features-title" class="section-title" data-reveal>Ce qui change tout</h2>
  <div class="features">
${g.features.map(([t, d], i) => `    <article class="feature" style="--r:${[-1, 0.8, -0.6][i]}deg" data-reveal><span class="feature-num">${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('\n')}
  </div>
</section>

<section class="section wrap split" aria-labelledby="pourqui-title">
  <div data-reveal>
    <h2 id="pourqui-title" class="section-title">Pour quel chat&nbsp;?</h2>
    <p>${esc(g.forWhom)}</p>
    <h3>Les enfiler sans drame</h3>
    <ol class="mini-steps">
      <li>Attends un moment calme, après le repas ou une sieste.</li>
      <li>Une patte à la fois, picots vers le sol, revers bien à plat.</li>
      <li>Une friandise, et quelques minutes seulement la première fois.</li>
    </ol>
    <p><a href="${articleUrl(articles.find((a) => a.id === 'enfiler'))}">La méthode complète pour enfiler des chaussettes à son chat</a></p>
  </div>
  <div data-reveal>
    <h2 class="section-title">Les tailles</h2>
    ${sizeTable(`Tailles de la paire ${esc(g.name)}`)}
    <p>Tu dois pouvoir glisser un doigt entre la chaussette et la patte. <a href="/guide-des-tailles/">Comment mesurer ton chat</a>.</p>
  </div>
</section>

<section class="section wrap split" aria-labelledby="questions-title">
  <div data-reveal>
    <h2 id="questions-title" class="section-title">Questions sur ${esc(g.name)}</h2>
    ${faqHtml([...g.faq, ...generalFaq])}
  </div>
  <aside class="related" data-reveal aria-labelledby="related-title">
    <h2 id="related-title" class="section-title">À lire</h2>
    ${related.map((a) => articleCard(a)).join('\n')}
  </aside>
</section>

<section class="section wrap" aria-labelledby="others-title">
  <h2 id="others-title" class="section-title" data-reveal>Les autres paires</h2>
  <div class="pair-grid pair-grid-5">
${others.map((x) => gammeCard(x)).join('\n')}
  </div>
</section>
`,
  };
}

export default [collection, ...gammes.map(productPage)];
