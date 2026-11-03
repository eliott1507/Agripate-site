// Guide des tailles, À propos, Livraison et retours, Contact, page vidéo.
import {
  site, sizes, gammes, articles, abs, esc, money, gammeUrl, articleUrl, bySlug, photo, motion, hasMotion, pawSvg, gammeCard, videoSchema,
} from '../lib.mjs';

const art = (id) => articleUrl(articles.find((a) => a.id === id));

const tailles = {
  path: '/guide-des-tailles/',
  section: 'tailles',
  title: 'Guide des tailles des chaussettes pour chat (S, M, L) | Agripatte',
  description: 'Quelle taille de chaussettes antidérapantes pour ton chat ? S de 1 à 3 kg, M de 3 à 5 kg, L au-delà. Comment peser ton chat et vérifier que la taille est bonne.',
  breadcrumb: [['Accueil', '/'], ['Guide des tailles', '/guide-des-tailles/']],
  body: `
<section class="page-hero page-hero-green">
  <div class="wrap">
    <h1>Guide des tailles des chaussettes pour chat</h1>
    <p class="lead">Chez Agripatte, la taille se choisit au poids : c’est le plus simple à mesurer, et le plus fiable. Une balance de salle de bains suffit.</p>
  </div>
</section>
<section class="section wrap">
  <div class="size-cards">
${sizes
  .map(
    (s, i) => `    <article class="size-card" style="--r:${[-1.2, 0.6, -0.4][i]}deg;--k:${0.72 + i * 0.14}" data-reveal>
      <p class="size-letter">${s.label}</p>
      <h2>${s.who}</h2>
      <p>${s.weight}</p>
      ${pawSvg('size-paw')}
    </article>`
  )
  .join('\n')}
  </div>
</section>
<section class="section wrap split">
  <div class="prose" data-reveal>
    <h2>Peser son chat en 30 secondes</h2>
    <ol>
      <li>Monte seul sur la balance et note ton poids.</li>
      <li>Remonte avec ton chat dans les bras et note le total.</li>
      <li>La différence, c’est le poids de ton chat.</li>
    </ol>
    <h2>Entre deux tailles&nbsp;?</h2>
    <p>Prends la plus petite. Une chaussette trop grande tourne autour de la patte, et les picots finissent sur le dessus : ils ne servent plus à rien.</p>
    <h2>Vérifier que la taille est bonne</h2>
    <ul>
      <li>Les picots sont bien sous les coussinets, pas sur le côté.</li>
      <li>Le revers est à plat, sans pli.</li>
      <li>Tu peux glisser un doigt entre la chaussette et la patte. Sinon, c’est trop serré.</li>
      <li>Quand tu l’enlèves, la chaussette ne laisse pas de marque sur la patte.</li>
    </ul>
    <p>Si la taille ne va pas, tu peux l’échanger gratuitement sous ${site.returns.days} jours, même si ton chat les a déjà essayées.</p>
  </div>
  <div class="prose" data-reveal>
    <h2>Les chatons</h2>
    <p>Un chaton peut porter des chaussettes à partir de 4 mois, quand il pèse au moins 1,5 kg. Prends une taille S, et revérifie la taille tous les mois : il grandit vite. La paire <a href="${gammeUrl(bySlug('guimauve'))}">Guimauve</a> a une taille S renforcée, pensée pour eux. <a href="${art('chaton')}">Tout savoir sur les chaussettes pour chaton</a>.</p>
    <h2>Les gros matous</h2>
    <p>À partir de 5 kg, prends la taille L. Pour un chat âgé un peu raide, la paire <a href="${gammeUrl(bySlug('sieste'))}">Douce Sieste</a> a une ouverture plus large, plus facile à enfiler.</p>
    <p><a class="btn btn-primary" href="/chaussettes-antiderapantes-chat/" data-fun="paws">Choisir une paire <span aria-hidden="true">→</span></a></p>
  </div>
</section>
`,
};

const team = [
  ['Biscotte', 'Fondatrice, experte en sieste', '#f5e7d2', '#7a4622'],
  ['Moustache', 'Testeur escaliers', '#d9e4f7', '#22407a'],
  ['Pépite', 'Cheffe des chatons', '#ffdbe7', '#b23a6c'],
  ['Gribouille', 'Contrôle qualité (mord tout)', '#e6f7bd', '#3f5c00'],
];
const apropos = {
  path: '/a-propos/',
  section: 'apropos',
  title: 'Notre histoire : tout a commencé avec Biscotte | Agripatte',
  description: 'Agripatte est née d’une chatte de 14 ans qui glissait sur un parquet neuf. Nos chaussettes sont pensées pour les chats et testées à la maison par nos testeurs.',
  breadcrumb: [['Accueil', '/'], ['À propos', '/a-propos/']],
  schema: [{ '@type': 'AboutPage', '@id': `${abs('/a-propos/')}#page`, url: abs('/a-propos/'), name: 'À propos d’Agripatte', about: { '@id': abs('/#organisation') }, inLanguage: 'fr-FR' }],
  body: `
<section class="page-hero page-hero-cream">
  <div class="wrap split split-center">
    <div>
      <p class="kicker">Notre histoire</p>
      <h1>Tout a commencé avec Biscotte.</h1>
      <p class="lead">Biscotte avait 14 ans, un parquet tout neuf et beaucoup de mal à tenir debout dessus. On a cherché des chaussettes pour elle. Celles qu’on a trouvées étaient faites pour les chiens, trop grandes et trop raides. Alors on a fabriqué les nôtres.</p>
    </div>
    <div class="about-visual" data-tilt>
      <img src="${photo.cutout(bySlug('sieste'))}" alt="${esc(bySlug('sieste').alt)}" width="512" height="512">
      <p class="about-sticker">La paire de Biscotte : Douce Sieste</p>
    </div>
  </div>
</section>

<section class="section wrap">
  <h2 class="section-title" data-reveal>Ce qui compte pour nous</h2>
  <div class="features">
    <article class="feature" style="--r:-1deg" data-reveal><span class="feature-num">1</span><h3>Pensé pour les chats</h3><p>Pas des chaussettes pour chien en plus petit. La forme, les picots et le revers sont dessinés pour les pattes de chat.</p></article>
    <article class="feature" style="--r:.8deg" data-reveal><span class="feature-num">2</span><h3>Testé à la maison</h3><p>Chaque modèle passe des semaines aux pattes de nos testeurs, sur de vrais parquets et dans de vrais escaliers.</p></article>
    <article class="feature" style="--r:-.6deg" data-reveal><span class="feature-num">3</span><h3>Doux avant tout</h3><p>Des mailles souples, des revers qui ne serrent pas. Une chaussette qui gêne ton chat ne sert à rien.</p></article>
  </div>
</section>

<section class="section wrap split">
  <div class="prose" data-reveal>
    <h2>Comment on teste nos chaussettes</h2>
    <p>Avant d’arriver sur le site, chaque paire est portée par nos chats testeurs, chez nous, sur les sols qui posent problème : parquet vitrifié, carrelage de cuisine, escalier en bois.</p>
    <ul>
      <li><strong>L’adhérence</strong> : départs, freinages, virages dans le couloir. C’est ce que résume la jauge de 1 à 5 sur chaque fiche.</li>
      <li><strong>Le maintien</strong> : la chaussette reste-t-elle en place, picots bien sous les coussinets ?</li>
      <li><strong>Le confort</strong> : le revers ne doit laisser aucune marque sur la patte.</li>
      <li><strong>Le lavage</strong> : les picots doivent tenir après des passages en machine à 30 °C.</li>
    </ul>
    <p>Ce qu’on a appris en route, on le partage dans <a href="/conseils/">le coin des conseils</a>, erreurs comprises : <a href="${art('erreurs')}">les 5 erreurs qu’on a faites au début</a>.</p>
  </div>
  <div data-reveal>
    <h2 class="section-title">L’équipe de testeurs</h2>
    <p>Des professionnels exigeants, payés en croquettes.</p>
    <ul class="team">
${team
  .map(
    ([n, r, tint, deep], i) => `      <li class="team-card" style="--tint:${tint};--deep:${deep};--r:${[-3, 2, -1, 3][i]}deg"><button type="button" class="team-face" data-fun="miaou" aria-label="Dire bonjour à ${n}">${pawSvg('team-paw')}</button><strong>${n}</strong><span>${r}</span></li>`
  )
  .join('\n')}
    </ul>
  </div>
</section>

<section class="cta-band wrap" data-reveal>
  ${pawSvg('cta-paw')}
  <h2>À ton chat de les essayer.</h2>
  <a class="btn btn-dark" href="/chaussettes-antiderapantes-chat/" data-fun="paws">Voir les 6 paires <span aria-hidden="true">→</span></a>
</section>
`,
};

const [domicile, relais] = site.shipping;
const livraison = {
  path: '/livraison-et-retours/',
  section: 'aide',
  title: 'Livraison et retours | Agripatte',
  description: `Livraison en France ${domicile.delay} à domicile ou ${relais.delay} en point relais, offerte dès ${site.freeShippingFrom} €. Retours et échanges de taille sous ${site.returns.days} jours.`,
  breadcrumb: [['Accueil', '/'], ['Livraison et retours', '/livraison-et-retours/']],
  body: `
<section class="page-hero page-hero-peach">
  <div class="wrap">
    <h1>Livraison et retours</h1>
    <p class="lead">Livraison offerte dès ${site.freeShippingFrom} € d’achat, retours et échanges de taille sous ${site.returns.days} jours.</p>
  </div>
</section>
<section class="section wrap split">
  <div class="prose" data-reveal>
    <h2>Livraison en France métropolitaine</h2>
    <div class="table-wrap"><table class="table">
      <thead><tr><th scope="col">Mode</th><th scope="col">Délai</th><th scope="col">Prix</th></tr></thead>
      <tbody>
${site.shipping.map((s) => `        <tr><th scope="row">${s.label} (${s.carrier})</th><td>${s.delay}</td><td>${money(s.price)}, offerte dès ${site.freeShippingFrom} €</td></tr>`).join('\n')}
      </tbody>
    </table></div>
    <p>Ta commande est préparée sous 1 jour ouvré. Tu reçois un e-mail avec le lien de suivi dès l’expédition.</p>
  </div>
  <div class="prose" data-reveal>
    <h2>Retours et échanges</h2>
    <ol>
      <li>Écris-nous à <a href="mailto:${site.email}">${site.email}</a> dans les ${site.returns.days} jours qui suivent la réception.</li>
      <li>On t’envoie une étiquette de retour.</li>
      <li>On te rembourse dès qu’on reçoit le colis, ou on t’envoie la bonne taille.</li>
    </ol>
    <p>L’échange de taille est gratuit, même si ton chat a déjà essayé ses chaussettes. Les conditions complètes, dont ton droit légal de rétractation, sont dans nos <a href="/cgv/">conditions générales de vente</a>.</p>
  </div>
</section>
`,
};

const contact = {
  path: '/contact/',
  section: 'aide',
  title: 'Contact | Agripatte',
  description: `Une question sur une taille, une commande ou ton chat ? Écris à l’équipe Agripatte à ${site.email} : on répond sous 24 h, sauf pendant la sieste.`,
  breadcrumb: [['Accueil', '/'], ['Contact', '/contact/']],
  schema: [{ '@type': 'ContactPage', '@id': `${abs('/contact/')}#page`, url: abs('/contact/'), name: 'Contacter Agripatte', inLanguage: 'fr-FR', about: { '@id': abs('/#organisation') } }],
  body: `
<section class="page-hero page-hero-blue">
  <div class="wrap">
    <h1>On t’écoute (et ton chat aussi)</h1>
    <p class="lead">Une question sur une taille, une commande, ou sur ton chat qui refuse obstinément ses chaussettes ? Écris-nous, on répond sous 24 h (sauf pendant la sieste).</p>
    <p><a class="btn btn-dark" href="mailto:${site.email}" data-fun="miaou">${site.email}</a></p>
  </div>
</section>
<section class="section wrap">
  <h2 class="section-title" data-reveal>Avant d’écrire, la réponse est peut-être ici</h2>
  <ul class="link-cards">
    <li data-reveal><a href="/guide-des-tailles/"><strong>Guide des tailles</strong><span>S, M ou L : choisir au poids</span></a></li>
    <li data-reveal><a href="/livraison-et-retours/"><strong>Livraison et retours</strong><span>Délais, prix, échanges</span></a></li>
    <li data-reveal><a href="/faq/"><strong>Questions fréquentes</strong><span>Enfilage, durée, lavage</span></a></li>
    <li data-reveal><a href="${art('enfiler')}"><strong>Enfiler des chaussettes à son chat</strong><span>La méthode douce en 4 étapes</span></a></li>
  </ul>
</section>
`,
};

// Page vidéo : Google n'indexe une vidéo que si elle est le contenu principal de sa page.
const f = motion.film;
const video = {
  path: f.page,
  section: 'video',
  title: 'Vidéo : les chaussettes antidérapantes Agripatte en 14 s',
  description: 'En 14 secondes : une patte de chat qui glisse sur le parquet, puis les picots en silicone des chaussettes Agripatte qui accrochent, et nos 6 paires.',
  ogType: 'video.other',
  og: { src: f.poster, width: 1280, height: 720, alt: f.title },
  breadcrumb: [['Accueil', '/'], ['Vidéo', f.page]],
  schema: [videoSchema()],
  video: f,
  body: `
<section class="section wrap video-page">
  <h1>${esc(f.title)}</h1>
  <div class="film-frame film-frame-large">
    <video width="1280" height="720" poster="${f.poster}" controls playsinline preload="metadata">
      <source src="${f.webm}" type="video/webm">
      <source src="${f.mp4}" type="video/mp4">
    </video>
  </div>
  <div class="split">
    <div class="prose">
      <h2>Ce que montre la vidéo</h2>
      <ol class="chapters">
        <li><time>0:00</time> Sur un parquet brillant, une patte de chat arrive en trombe, ne trouve aucune prise et dérape jusqu’au bout de la pièce.</li>
        <li><time>0:04</time> La paire Moussaillon tombe sur le parquet. Gros plan sous la semelle : des picots en silicone sous chaque coussinet. Ça accroche.</li>
        <li><time>0:08</time> Les 6 paires Agripatte, une pour chaque chat : Les Essentielles, Guimauve, Moussaillon, Flocon, Néon et Douce Sieste.</li>
        <li><time>0:11</time> Agripatte, chaussettes antidérapantes pour chat, dès ${money(Math.min(...gammes.map((g) => g.price)))} les 4, livraison offerte dès ${site.freeShippingFrom} €.</li>
      </ol>
      <p>Animation réalisée en motion design avec HyperFrames, à partir des photos de nos paires. Sans son.</p>
    </div>
    <div>
      <h2 class="section-title">La paire de la vidéo</h2>
      ${gammeCard(bySlug('moussaillon'), { vt: false })}
    </div>
  </div>
</section>
`,
};

export default [tailles, apropos, livraison, contact, ...(hasMotion(f) ? [video] : [])];
