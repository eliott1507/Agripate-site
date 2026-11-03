import {
  site, gammes, articles, abs, esc, money, minPrice, gammeUrl, articleUrl, bySlug, photo, motion, hasMotion,
  loopVideo, gripMeter, pawSvg, articleCard,
} from '../lib.mjs';

const words = (text, cls = '') =>
  text.split(' ').map((w, i) => `<span class="word${cls}" style="--i:${i}">${w}</span>`).join(' ');

const marquee = [
  'Picots en silicone sous chaque coussinet',
  `Livraison offerte dès ${site.freeShippingFrom} €`,
  `Retours sous ${site.returns.days} jours`,
  'Testé par de vrais chats',
  'Lavables en machine à 30 °C',
  'Tailles S, M et L',
];
const marqueeRow = (hidden) =>
  `<p class="marquee-row"${hidden ? ' aria-hidden="true"' : ''}>${marquee.map((m) => `<span>${m}</span>${pawSvg('marquee-paw')}`).join('')}</p>`;

const why = [
  ['#d9e4f7', '#22407a', 'Les sols glissent', 'Sur le parquet ciré, le carrelage ou dans l’escalier, les coussinets n’accrochent pas. Les picots remettent de l’adhérence là où il en manque.', 'sols'],
  ['#f5e7d2', '#7a4622', 'Les pattes fatiguent', 'Un chat âgé hésite avant de sauter. Avec un bon appui, il remonte sur le canapé sans y réfléchir à deux fois.', 'senior'],
  ['#ffdbe7', '#b23a6c', 'Les chatons foncent', 'Ils courent partout et freinent avec le nez. Une paire bien adaptée leur évite les dérapages et les bosses.', 'chaton'],
];

const choose = [
  ['Un chaton de plus de 4 mois', 'guimauve'],
  ['Du parquet ciré ou un escalier', 'moussaillon'],
  ['Un chat de plus de 10 ans', 'sieste'],
  ['Un sprinteur de 3 h du matin', 'neon'],
  ['Un carrelage froid l’hiver', 'flocon'],
  ['Un premier essai, tout simplement', 'essentielles'],
];

const steps = [
  ['Un moment calme', 'Après le repas, quand il somnole sur tes genoux.'],
  ['Une patte à la fois', 'Les picots dessous, le revers bien à plat.'],
  ['Une friandise', 'Et quelques minutes pour qu’il s’habitue. C’est gagné.'],
];

const faq = [
  ['Comment choisir la bonne taille ?', `Pèse ton chat : S jusqu’à 3 kg, M de 3 à 5 kg, L au-delà de 5 kg. Si tu hésites, prends la plus petite. Tout est détaillé dans le <a href="/guide-des-tailles/">guide des tailles</a>.`],
  ['Mon chat va-t-il les supporter ?', 'La plupart des chats secouent les pattes pendant quelques minutes, puis oublient qu’ils les portent. Commence par de courtes séances, avec une friandise à la clé.'],
  ['Combien de temps peut-il les garder ?', 'Quelques heures par jour, à l’intérieur. Retire-les la nuit pour que les coussinets respirent.'],
];

const film = motion.film;
const heroMedia = hasMotion(motion.defile)
  ? `<video class="hero-video" width="720" height="720" poster="${motion.defile.poster}" muted loop playsinline preload="none" data-autoplay="eager" aria-label="Les 6 paires Agripatte défilent l’une après l’autre : Les Essentielles, Guimauve, Moussaillon, Flocon, Néon et Douce Sieste">
          <source src="${motion.defile.webm}" type="video/webm">
          <source src="${motion.defile.mp4}" type="video/mp4">
        </video>`
  : `<img src="${photo.collection}" alt="Les six paires de chaussettes antidérapantes Agripatte" width="1200" height="800" fetchpriority="high">`;

const body = `
<section class="hero">
  <div class="hero-paws" aria-hidden="true" data-parallax>${pawSvg('hp hp-1')}${pawSvg('hp hp-2')}${pawSvg('hp hp-3')}${pawSvg('hp hp-4')}</div>
  <div class="hero-inner wrap">
    <div class="hero-copy">
      <a class="hero-badge" href="${gammeUrl(bySlug('flocon'))}">Nouveau : la paire Flocon pour l’hiver</a>
      <h1 class="hero-title">${words('Des chaussettes pour les chats qui')} <em>${words('glissent un peu trop.', ' accent')}</em></h1>
      <p class="hero-lead">Des picots en silicone sous chaque coussinet : ton chat retrouve de l’adhérence sur le parquet, le carrelage et dans l’escalier.</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="/chaussettes-antiderapantes-chat/" data-fun="paws">Voir les 6 paires <span aria-hidden="true">→</span></a>
        <a class="btn btn-ghost" href="${articleUrl(articles.find((a) => a.id === 'enfiler'))}">Comment les enfiler ?</a>
      </div>
      <ul class="hero-proof">
        <li>${pawSvg('mini-paw')}6 paires, de ${money(minPrice)} à ${money(Math.max(...gammes.map((g) => g.price)))}</li>
        <li>${pawSvg('mini-paw')}Tailles S, M et L</li>
        <li>${pawSvg('mini-paw')}Lavables à 30 °C</li>
      </ul>
    </div>
    <div class="hero-visual">
      <div class="hero-frame" data-tilt>
        ${heroMedia}
      </div>
      <p class="hero-sticker" aria-hidden="true"><span>dès</span> ${money(minPrice)}</p>
    </div>
  </div>
  <div class="marquee" aria-label="Nos engagements">
    <div class="marquee-track">${marqueeRow(false)}${marqueeRow(true)}</div>
  </div>
</section>

<section class="section why wrap" aria-labelledby="why-title">
  <h2 id="why-title" class="section-title" data-reveal>Pourquoi des chaussettes&nbsp;?</h2>
  <div class="why-grid">
${why
  .map(
    ([tint, deep, t, d, id], i) => `    <article class="why-card" style="--tint:${tint};--deep:${deep};--r:${[-1.5, 1, -0.8][i]}deg" data-reveal>
      ${pawSvg('why-paw')}
      <h3>${t}</h3>
      <p>${d}</p>
      <a href="${articleUrl(articles.find((a) => a.id === id))}">${esc(articles.find((a) => a.id === id).title)}</a>
    </article>`
  )
  .join('\n')}
  </div>
</section>

<section class="showcase" aria-labelledby="showcase-title" data-showcase>
  <div class="showcase-sticky">
    <div class="showcase-head wrap">
      <h2 id="showcase-title" class="section-title">Nos 6 paires</h2>
      <p class="showcase-hint" aria-hidden="true">Fais défiler ${pawSvg('mini-paw')}</p>
      <a class="link-arrow" href="/chaussettes-antiderapantes-chat/">Tout comparer <span aria-hidden="true">→</span></a>
    </div>
    <ol class="showcase-track" data-showcase-track>
${gammes
  .map(
    (g, i) => `      <li class="slide" style="--tint:${g.tint};--deep:${g.deep}" data-tint="${g.tint}">
        <div class="slide-art">
          <span class="slide-num" aria-hidden="true">0${i + 1}</span>
          <img src="${photo.cutout(g)}" alt="${esc(g.alt)}" width="512" height="512" loading="lazy" decoding="async">
        </div>
        <div class="slide-body">
          <p class="slide-usage">${esc(g.usage)} · ${esc(g.tier)}</p>
          <h3 class="slide-name"><a href="${gammeUrl(g)}">${esc(g.name)}</a></h3>
          <p class="slide-pitch">${esc(g.pitch)}</p>
          <p class="slide-meta">${gripMeter(g)} <span>Adhérence ${esc(g.gripLabel.toLowerCase())}</span></p>
          <p class="slide-buy"><span class="slide-price">${money(g.price)} <small>les 4</small></span><a class="btn btn-small" href="${gammeUrl(g)}" data-fun="wiggle">Voir la paire ${esc(g.name)}</a></p>
        </div>
      </li>`
  )
  .join('\n')}
    </ol>
    <div class="showcase-progress" aria-hidden="true"><span data-showcase-bar></span></div>
  </div>
</section>

${hasMotion(film) ? `<section class="section film wrap" aria-labelledby="film-title">
  <div class="film-frame" data-reveal>
    <video width="1280" height="720" poster="${film.poster}" muted loop playsinline preload="none" data-autoplay aria-label="${esc(film.title)}">
      <source src="${film.webm}" type="video/webm">
      <source src="${film.mp4}" type="video/mp4">
    </video>
  </div>
  <div class="film-copy" data-reveal>
    <p class="kicker">Le film</p>
    <h2 id="film-title" class="section-title">Ça glisse. Et puis ça accroche.</h2>
    <p>${esc(film.description)}</p>
    <a class="link-arrow" href="${film.page}">Voir la vidéo et son détail <span aria-hidden="true">→</span></a>
  </div>
</section>` : ''}

<section class="section steps-section wrap" aria-labelledby="steps-title">
  <h2 id="steps-title" class="section-title" data-reveal>Les enfiler en 3 étapes</h2>
  <div class="steps-wrap">
    <svg class="steps-trail" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path d="M20 90 C 200 10, 320 10, 500 60 S 800 120, 980 30" data-draw/></svg>
    <ol class="steps">
${steps.map(([t, d], i) => `      <li class="step" style="--i:${i}" data-reveal><span class="step-num">${i + 1}</span><span><strong>${t}</strong>${d}</span></li>`).join('\n')}
    </ol>
  </div>
  <p class="center" data-reveal><a class="link-arrow" href="${articleUrl(articles.find((a) => a.id === 'enfiler'))}">La méthode complète, testée sur des chats très têtus <span aria-hidden="true">→</span></a></p>
</section>

<section class="section chooser wrap" aria-labelledby="chooser-title">
  <div class="chooser-card" data-reveal>
    <h2 id="chooser-title" class="section-title">Laquelle pour mon chat&nbsp;?</h2>
    <p>Dis-nous qui il est, on te dit quelle paire lui va.</p>
    <ul class="chooser-list">
${choose
  .map(([q, slug]) => {
    const g = bySlug(slug);
    return `      <li><a href="${gammeUrl(g)}" style="--tint:${g.tint};--deep:${g.deep}" data-fun="pop"><span>${q}</span><strong>${esc(g.name)} <span aria-hidden="true">→</span></strong></a></li>`;
  })
  .join('\n')}
    </ul>
  </div>
</section>

<section class="section wrap" aria-labelledby="conseils-title">
  <div class="section-head" data-reveal>
    <h2 id="conseils-title" class="section-title">Le coin des conseils</h2>
    <a class="link-arrow" href="/conseils/">Tous les conseils <span aria-hidden="true">→</span></a>
  </div>
  <div class="post-grid">
${articles.slice(0, 3).map((a) => articleCard(a)).join('\n')}
  </div>
</section>

<section class="section faq-teaser wrap" aria-labelledby="faq-title">
  <div data-reveal>
    <h2 id="faq-title" class="section-title">Les questions qu’on nous pose</h2>
    <p>Et les réponses, honnêtes, de gens qui enfilent des chaussettes à des chats toute la journée.</p>
    <a class="link-arrow" href="/faq/">Toutes les questions <span aria-hidden="true">→</span></a>
  </div>
  <div class="faq" data-reveal>
${faq.map(([q, a]) => `    <details class="faq-item"><summary><span>${q}</span><span class="faq-sign" aria-hidden="true"></span></summary><div class="faq-answer"><p>${a}</p></div></details>`).join('\n')}
  </div>
</section>

<section class="cta-band wrap" data-reveal>
  ${pawSvg('cta-paw')}
  <h2>Livraison offerte dès ${site.freeShippingFrom}&nbsp;€.</h2>
  <a class="btn btn-dark" href="/chaussettes-antiderapantes-chat/" data-fun="rain">Choisir une paire <span aria-hidden="true">→</span></a>
</section>
`;

export default {
  path: '/',
  section: 'accueil',
  bodyClass: 'is-home',
  title: 'Chaussettes antidérapantes pour chat | Agripatte',
  description: `Chaussettes antidérapantes pour chat avec picots en silicone : ton chat ne glisse plus sur le parquet, le carrelage ou dans l’escalier. 6 paires dès ${money(minPrice)}.`,
  preload: hasMotion(motion.defile) ? `<link rel="preload" href="${motion.defile.poster}" as="image" fetchpriority="high">\n` : '',
  schema: [
    {
      '@type': 'WebSite',
      '@id': abs('/#site'),
      name: site.name,
      alternateName: 'Agripatte, chaussettes antidérapantes pour chat',
      url: abs('/'),
      inLanguage: 'fr-FR',
      publisher: { '@id': abs('/#organisation') },
    },
  ],
  body,
};
