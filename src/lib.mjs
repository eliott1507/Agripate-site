import { existsSync, readFileSync } from 'node:fs';

// Données du site et fonctions partagées par toutes les pages.
// Modifiez ici le domaine, les prix, la livraison, les paires et les tailles :
// pages, données structurées, sitemap et flux Merchant Center se mettent à jour au prochain `node build.mjs`.

export const site = {
  name: 'Agripatte',
  url: 'https://agripatte.fr', // domaine définitif, sans slash final
  email: 'bonjour@agripatte.fr',
  lang: 'fr',
  locale: 'fr_FR',
  updated: '2026-11-03', // dernière mise à jour du site (sitemap)
  description:
    'Agripatte crée des chaussettes antidérapantes pour chat : des picots en silicone sous chaque coussinet pour retrouver de l’adhérence sur le parquet, le carrelage et dans l’escalier.',
  freeShippingFrom: 35,
  returns: { days: 30 },
  // Modes de livraison (France métropolitaine). Délais en jours ouvrés.
  shipping: [
    { code: 'domicile', label: 'À domicile', carrier: 'Colissimo', price: 4.9, handling: [0, 1], transit: [1, 2], delay: 'sous 48 h' },
    { code: 'relais', label: 'Point relais', carrier: 'Point relais', price: 3.9, handling: [0, 1], transit: [3, 4], delay: 'en 3 à 4 jours ouvrés' },
  ],
};

// Réglages de génération (modifiés par build.mjs selon la cible : domaine définitif ou aperçu GitHub Pages)
export const env = { base: '/', preview: false };
export const abs = (path) => site.url + path;
export const u = (path) => (env.base === '/' ? path : env.base + path.replace(/^\//, ''));

export const sizes = [
  { code: 's', label: 'S', who: 'Chaton', weight: '1 à 3 kg' },
  { code: 'm', label: 'M', who: 'Adulte', weight: '3 à 5 kg' },
  { code: 'l', label: 'L', who: 'Gros matou', weight: '5 kg et plus' },
];

// Les 6 paires. tint / deep : couleurs de la paire. focus : zone des picots sur la photo (animation HyperFrames).
export const gammes = [
  {
    slug: 'essentielles',
    path: 'les-essentielles',
    sku: 'AGR-ESS',
    name: 'Les Essentielles',
    price: 9.9,
    tint: '#ebe7e3',
    deep: '#57504b',
    usage: 'Tous les jours',
    tier: 'Le petit prix',
    coloris: 'Gris chiné, pattes blanches',
    color: 'Gris',
    grip: 3,
    gripLabel: 'Bonne',
    matiere: 'Coton 80 %, élasthanne 20 %',
    care: 'Machine 30 °C',
    contenu: '4 chaussettes (une par patte, logique)',
    focus: [0.66, 0.73],
    alt: 'Paire de chaussettes antidérapantes pour chat Les Essentielles, gris chiné à motif pattes blanches, picots en silicone gris sous la semelle',
    seoTitle: 'Les Essentielles, chaussettes antidérapantes chat | Agripatte',
    description: 'Les Essentielles : 4 chaussettes antidérapantes pour chat en coton gris, picots en silicone sous chaque coussinet. Le petit prix pour tous les jours : 9,90 €.',
    pitch: 'La chaussette de base pour que ton chat arrête de faire du patin sur le carrelage. Simple et efficace, sans chichis.',
    forWhom: 'Pour un premier essai, ou pour un chat adulte qui glisse de temps en temps sur un sol lisse : le parquet du salon, le carrelage de la cuisine. Si ton chat n’a jamais porté de chaussettes, c’est la paire la plus simple pour l’habituer.',
    features: [
      ['Picots silicone', 'Des petits points sous chaque coussinet. Ça freine sans bloquer.'],
      ['Lavable en machine', 'À 30 °C, avec tes chaussettes à toi.'],
      ['Gris passe-partout', 'Ce gris va avec tous les pelages et ne montre pas la poussière.'],
    ],
    faq: [['Les Essentielles suffisent-elles pour un parquet très glissant ?', 'Pour un usage quotidien, oui. Si ton chat court beaucoup dans l’escalier ou sur un parquet ciré, la paire Moussaillon a des picots plus larges et un revers plus haut.']],
  },
  {
    slug: 'guimauve',
    path: 'guimauve',
    sku: 'AGR-GUI',
    name: 'Guimauve',
    price: 11.9,
    tint: '#ffdbe7',
    deep: '#b23a6c',
    usage: 'Chatons',
    tier: 'Petits pieds',
    coloris: 'Rose bonbon, pattes blanches',
    color: 'Rose',
    grip: 3,
    gripLabel: 'Bonne',
    matiere: 'Coton extra-doux 85 %, élasthanne 15 %',
    care: 'Machine 30 °C',
    contenu: '4 chaussettes',
    focus: [0.65, 0.72],
    alt: 'Paire de chaussettes antidérapantes pour chaton Guimauve, rose bonbon à motif pattes blanches, picots en silicone roses sous la semelle',
    seoTitle: 'Guimauve, chaussettes antidérapantes pour chaton | Agripatte',
    description: 'Guimauve : 4 chaussettes antidérapantes pour chaton, maille extra-douce rose et picots rapprochés pour les premiers sprints. Taille S renforcée, 11,90 €.',
    pitch: 'Pour les chatons qui découvrent la maison à toute vitesse et freinent avec le nez. Une maille toute douce, toute légère.',
    forWhom: 'Pour les chatons à partir de 4 mois et 1,5 kg, qui foncent partout et ne savent pas encore freiner. Avant cet âge, un chaton a besoin de sentir le sol sous ses coussinets : on attend un peu.',
    features: [
      ['Maille extra-douce', 'Un coton fin qui ne gêne pas les petites pattes.'],
      ['Picots rapprochés', 'Plus de points sur une petite surface, pour les premiers sprints.'],
      ['Taille S renforcée', 'Pour les chatons de 1 à 3 kg, avec un revers qui tient.'],
    ],
    faq: [['À partir de quel âge un chaton peut-il les porter ?', 'À partir de 4 mois, quand il pèse au moins 1,5 kg. Commence par des séances de quelques minutes pendant le jeu, et ne le laisse jamais seul avec ses chaussettes.']],
  },
  {
    slug: 'moussaillon',
    path: 'moussaillon',
    sku: 'AGR-MOU',
    name: 'Moussaillon',
    price: 14.9,
    tint: '#d9e4f7',
    deep: '#22407a',
    usage: 'Parquet & escaliers',
    tier: 'Grip renforcé',
    coloris: 'Bleu marine, ancre et rayures blanches',
    color: 'Bleu marine',
    grip: 4,
    gripLabel: 'Forte',
    matiere: 'Coton peigné 80 %, élasthanne 20 %',
    care: 'Machine 30 °C, à l’envers',
    contenu: '4 chaussettes',
    focus: [0.56, 0.8],
    alt: 'Paire de chaussettes antidérapantes pour chat Moussaillon, bleu marine à ancre et rayures blanches, gros picots blancs en silicone sous la semelle',
    seoTitle: 'Moussaillon, chaussettes chat pour parquet glissant | Agripatte',
    description: 'Moussaillon : chaussettes antidérapantes pour chat à gros picots en silicone, pour le parquet ciré et l’escalier. Marinière bleu marine, lot de 4 à 14,90 €.',
    pitch: 'Marinière et ancre marine pour garder le cap sur le parquet ciré. Les gros picots blancs tiennent bon, même dans les virages serrés.',
    forWhom: 'Pour les maisons à parquet vitrifié ou ciré, et pour les chats qui dévalent l’escalier. Les picots sont plus larges que sur Les Essentielles : ils accrochent mieux sur les surfaces très lisses.',
    features: [
      ['Gros picots', 'Des points plus larges, pour accrocher sur le parquet et le carrelage.'],
      ['Testé dans l’escalier', 'Montées et descentes à fond de train sans aucune glissade.'],
      ['Revers maintien', 'Un poignet rayé un peu plus haut pour que la chaussette reste en place.'],
    ],
    faq: [['Peut-on les utiliser dans un escalier en bois ?', 'Oui, c’est pour ça qu’elles ont été pensées. Ajoute si possible des bandes antidérapantes sur les marches à nez arrondi, les plus traîtres.']],
  },
  {
    slug: 'flocon',
    path: 'flocon',
    sku: 'AGR-FLO',
    name: 'Flocon',
    price: 16.9,
    tint: '#ffdcd6',
    deep: '#b3261e',
    usage: 'Hiver & sols froids',
    tier: 'Édition hiver',
    coloris: 'Rouge, flocons blancs',
    color: 'Rouge',
    grip: 4,
    gripLabel: 'Forte',
    matiere: 'Coton 60 %, laine 25 %, élasthanne 15 %',
    care: 'Machine 30 °C',
    contenu: '4 chaussettes + pochette cadeau',
    focus: [0.64, 0.71],
    alt: 'Paire de chaussettes antidérapantes pour chat Flocon, rouges à flocons de neige blancs, picots blancs en silicone sous la semelle',
    seoTitle: 'Flocon, chaussettes chaudes antidérapantes chat | Agripatte',
    description: 'Flocon : chaussettes antidérapantes pour chat en maille épaisse avec laine, pour le carrelage froid l’hiver. Édition limitée, pochette cadeau, 16,90 €.',
    pitch: 'Pour les chats qui détestent le carrelage froid en hiver. Une maille épaisse avec un peu de laine, et des flocons pour l’ambiance de Noël.',
    forWhom: 'Pour les chats frileux, âgés ou très minces, qui évitent la cuisine ou la salle de bains l’hiver. La laine garde les coussinets au chaud, et les picots restent là, parce qu’un sol froid est souvent aussi un sol glissant.',
    features: [
      ['Maille épaisse', 'Un peu de laine pour garder les coussinets au chaud.'],
      ['Édition limitée', 'Disponible d’octobre à février, tant qu’il en reste.'],
      ['Idée cadeau', 'Livrée dans une pochette prête à glisser sous le sapin.'],
    ],
    faq: [['Mon chat peut-il dormir avec près du radiateur ?', 'Non. Retire-les pour la nuit et avant qu’il ne s’installe près d’un radiateur ou d’une cheminée : il pourrait avoir trop chaud sans s’en rendre compte.']],
  },
  {
    slug: 'neon',
    path: 'neon',
    sku: 'AGR-NEO',
    name: 'Néon',
    price: 14.9,
    tint: '#e6f7bd',
    deep: '#3f5c00',
    usage: 'Chats sportifs',
    tier: 'Grip maximal',
    coloris: 'Noir, pattes et rayures vert fluo',
    color: 'Noir et vert fluo',
    grip: 5,
    gripLabel: 'Maximale',
    matiere: 'Coton technique 75 %, élasthanne 25 %',
    care: 'Machine 30 °C',
    contenu: '4 chaussettes',
    focus: [0.66, 0.76],
    alt: 'Paire de chaussettes antidérapantes pour chat Néon, noires à rayures et pattes vert fluo, picots noirs en silicone sous la semelle',
    seoTitle: 'Néon, chaussettes antidérapantes chat sportif | Agripatte',
    description: 'Néon : chaussettes antidérapantes pour chat sportif, adhérence maximale avec des picots silicone plus durs et des bandes vert fluo. Lot de 4 à 14,90 €.',
    pitch: 'Pour les chats qui piquent un sprint à 3 h du matin. Une adhérence maximale pour les départs canon, et des bandes fluo pour les repérer dans le noir.',
    forWhom: 'Pour les chats jeunes et très actifs, qui démarrent sur les chapeaux de roue dans le couloir et freinent au dernier moment. C’est notre paire la plus accrocheuse.',
    features: [
      ['Adhérence maximale', 'Picots silicone plus durs, pour les départs arrêtés et les freinages d’urgence.'],
      ['Bandes fluo', 'Tu verras ton chat arriver dans le couloir, même la nuit.'],
      ['Maille respirante', 'Plus d’élasthanne pour suivre chaque mouvement.'],
    ],
    faq: [['Ne vont-elles pas trop freiner mon chat ?', 'Non : les picots accrochent quand il pousse ou freine, mais la maille suit chaque mouvement. Comme pour toutes nos paires, commence par de courtes séances pour qu’il s’habitue.']],
  },
  {
    slug: 'sieste',
    path: 'douce-sieste',
    sku: 'AGR-SIE',
    name: 'Douce Sieste',
    price: 19.9,
    tint: '#f5e7d2',
    deep: '#7a4622',
    usage: 'Chats seniors',
    tier: 'Extra-confort',
    coloris: 'Crème, pattes chocolat',
    color: 'Crème',
    grip: 4,
    gripLabel: 'Stable',
    matiere: 'Bambou 70 %, coton 25 %, élasthanne 5 %',
    care: 'Machine 30 °C',
    contenu: '4 chaussettes + guide d’enfilage',
    focus: [0.61, 0.8],
    alt: 'Paire de chaussettes antidérapantes pour chat âgé Douce Sieste, crème à pattes chocolat, picots marron en silicone sous la semelle',
    seoTitle: 'Douce Sieste, chaussettes pour chat âgé | Agripatte',
    description: 'Douce Sieste : chaussettes antidérapantes pour chat âgé, revers tout doux qui ne serre pas et fibre de bambou chaude. Enfilage facile, lot de 4 à 19,90 €.',
    pitch: 'Pour les chats d’un certain âge qui ont les pattes un peu raides. Elles tiennent chaud, ne serrent pas et aident à sauter sur le canapé en confiance.',
    forWhom: 'Pour les chats de plus de dix ans qui hésitent avant de sauter, ou qui ont froid aux pattes. Si ton chat boite ou change brusquement d’habitudes, parles-en d’abord à ton vétérinaire : une raideur se soulage, mais il faut savoir d’où elle vient.',
    features: [
      ['Revers tout doux', 'Rien ne serre : la circulation des pattes âgées n’est pas gênée.'],
      ['Fibre de bambou', 'Tient chaud aux articulations sans faire transpirer les coussinets.'],
      ['Enfilage facile', 'Une ouverture large pour les chats qui n’aiment pas qu’on leur touche les pattes.'],
    ],
    faq: [['Le revers ne va-t-il pas serrer les pattes de mon vieux chat ?', 'Non, c’est tout l’intérêt de cette paire. Tu dois pouvoir glisser un doigt entre la chaussette et la patte ; si ce n’est pas le cas, prends la taille au-dessus.']],
  },
];

export const gammeUrl = (g) => `/chaussettes-antiderapantes-chat/${g.path}/`;
export const bySlug = (slug) => gammes.find((g) => g.slug === slug);
export const minPrice = Math.min(...gammes.map((g) => g.price));

// Photos (préparées par tools/photos.mjs) et vidéos (rendues par tools/motion.mjs)
const file = (p) => existsSync(new URL(`..${p}`, import.meta.url));
export const photo = {
  cutout: (g) => `/assets/img/paires/chaussettes-antiderapantes-chat-${g.slug}.webp`,
  jpg: (g, ratio = '1x1') => `/assets/img/paires/chaussettes-antiderapantes-chat-${g.slug}-${ratio}.jpg`,
  collection: '/assets/img/chaussettes-antiderapantes-chat-6-paires.webp',
};
export const motion = {
  defile: { mp4: '/assets/video/agripatte-defile-6-paires.mp4', webm: '/assets/video/agripatte-defile-6-paires.webm', poster: '/assets/video/agripatte-defile-6-paires.jpg', size: 720 },
  gamme: (g) => ({ mp4: `/assets/video/agripatte-${g.slug}.mp4`, webm: `/assets/video/agripatte-${g.slug}.webm`, poster: `/assets/video/agripatte-${g.slug}.jpg`, size: 720 }),
  film: {
    page: '/video-chaussettes-antiderapantes-chat/',
    mp4: '/assets/video/agripatte-film-chaussettes-antiderapantes-chat.mp4',
    webm: '/assets/video/agripatte-film-chaussettes-antiderapantes-chat.webm',
    poster: '/assets/video/agripatte-film-chaussettes-antiderapantes-chat.jpg',
    seconds: 14,
    title: 'Chaussettes antidérapantes pour chat : Agripatte en 14 secondes',
    description:
      'Sur le parquet, la patte d’un chat dérape. Les chaussettes Agripatte ajoutent des picots en silicone sous chaque coussinet : ça accroche. Découvrez nos 6 paires, de 9,90 € à 19,90 €.',
    uploadDate: '2026-11-03T10:00:00+01:00',
  },
};
export const hasMotion = (m) => [m.mp4, m.webm, m.poster].every(file);

// Articles du coin des conseils (texte dans src/articles.json, repris de la maquette)
const raw = JSON.parse(readFileSync(new URL('./articles.json', import.meta.url), 'utf8'));
const articleMeta = {
  enfiler: { slug: 'enfiler-des-chaussettes-a-son-chat', seoTitle: 'Enfiler des chaussettes à son chat : la méthode douce', description: 'Le bon moment, la bonne prise, la bonne friandise : notre méthode en 4 étapes pour enfiler des chaussettes à un chat, testée sur des chats très têtus.' },
  senior: { slug: 'chat-age-ne-saute-plus-sur-le-canape', seoTitle: 'Chat âgé qui ne saute plus sur le canapé : que faire ?', description: 'Pourquoi un chat âgé hésite avant de sauter, et comment lui redonner un bon appui : tapis, marche intermédiaire, chaussettes à revers souple, griffes.' },
  sols: { slug: 'sols-qui-glissent-parquet-carrelage-escalier', seoTitle: 'Parquet, carrelage, escalier : les sols où ton chat glisse', description: 'Parquet vitrifié, carrelage poli, escaliers en bois, stratifié : on a classé les sols où les pattes de chat dérapent le plus, avec une solution pour chacun.' },
  chaton: { slug: 'chaussettes-chaton-a-quel-age', seoTitle: 'Chaussettes pour chaton : à partir de quel âge ?', description: 'À partir de quel âge un chaton peut porter des chaussettes antidérapantes, quelle taille choisir et combien de temps les lui laisser : le guide des petites pattes.' },
  lavage: { slug: 'laver-chaussettes-antiderapantes-chat', seoTitle: 'Laver les chaussettes antidérapantes sans abîmer les picots', description: 'À l’envers, à 30 °C, sans sèche-linge : les 3 gestes pour laver les chaussettes antidérapantes de ton chat sans abîmer les picots en silicone.' },
  erreurs: { slug: 'erreurs-chaussettes-chat-premieres-fois', seoTitle: 'Chaussettes pour chat : 5 erreurs à éviter au début', description: 'Les mettre toutes d’un coup, insister, prendre trop grand : les 5 erreurs qu’on a faites avec nos premiers testeurs, pour que tu n’aies pas à les faire.' },
  hiver: { slug: 'sols-froids-hiver-pattes-chat', seoTitle: 'Sols froids en hiver : garder les pattes du chat au chaud', description: 'Carrelage froid en hiver : repérer les zones froides, aménager des étapes douillettes et choisir des chaussettes chaudes pour les pattes de ton chat.' },
};
export const articleCats = raw.cats;
export const articles = raw.list.map((a) => ({ ...a, ...articleMeta[a.id] }));
export const articleUrl = (a) => `/conseils/${a.slug}/`;
export const articleCover = (a, ratio = '16x9') => `/assets/img/conseils/${a.slug}-${ratio}.${['card', 'large'].includes(ratio) ? 'webp' : 'jpg'}`;

// ---------- Outils HTML ----------

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const money = (n) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }).replace(/\s/g, ' ');
export const dateFr = (iso) => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export const pawSvg = (cls = 'paw', fill = 'currentColor') =>
  `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g fill="${fill}"><ellipse cx="17" cy="38" rx="9" ry="11.5" transform="rotate(-24 17 38)"/><ellipse cx="37" cy="19" rx="9.5" ry="12.5" transform="rotate(-8 37 19)"/><ellipse cx="63" cy="19" rx="9.5" ry="12.5" transform="rotate(8 63 19)"/><ellipse cx="83" cy="38" rx="9" ry="11.5" transform="rotate(24 83 38)"/><path d="M50 45c-15 0-28 14-28 27 0 10 8 16 17 14 4-1 7-3 11-3s7 2 11 3c9 2 17-4 17-14 0-13-13-27-28-27z"/></g></svg>`;

export const gripMeter = (g) =>
  `<span class="grip" role="img" aria-label="Adhérence ${esc(g.gripLabel.toLowerCase())} : ${g.grip} sur 5" style="--deep:${g.deep}">${[1, 2, 3, 4, 5]
    .map((n) => pawSvg(n <= g.grip ? 'grip-paw is-on' : 'grip-paw'))
    .join('')}</span>`;

// Vidéo HyperFrames en boucle : lue en silence quand elle est visible, image fixe si l'utilisateur limite les animations.
export function loopVideo(m, alt, cls = '') {
  if (!hasMotion(m)) return '';
  return `<video class="loop${cls ? ' ' + cls : ''}" width="${m.size}" height="${m.size}" poster="${m.poster}" muted loop playsinline preload="none" data-autoplay aria-label="${esc(alt)}">
    <source src="${m.webm}" type="video/webm">
    <source src="${m.mp4}" type="video/mp4">
  </video>`;
}

export function gammeCard(g, { headingLevel = 3, vt = true } = {}) {
  const h = `h${headingLevel}`;
  return `<article class="pair-card" style="--tint:${g.tint};--deep:${g.deep}" data-reveal>
  <div class="pair-card-art">
    ${pawSvg('pair-card-paw')}
    <img src="${photo.cutout(g)}" alt="${esc(g.alt)}" width="512" height="512" loading="lazy" decoding="async"${vt ? ` style="view-transition-name:paire-${g.slug}"` : ''}>
  </div>
  <div class="pair-card-body">
    <p class="pair-card-usage">${esc(g.usage)}</p>
    <${h} class="pair-card-name"><a href="${gammeUrl(g)}" data-fun="wiggle">${esc(g.name)}</a></${h}>
    <p class="pair-card-meta">${gripMeter(g)}<span class="pair-card-price">${money(g.price)} <small>les 4</small></span></p>
  </div>
</article>`;
}

export function articleCard(a, headingLevel = 3) {
  const h = `h${headingLevel}`;
  const [tint, deep] = articleCats[a.cat];
  return `<article class="post-card" style="--tint:${tint};--deep:${deep}" data-reveal>
  <img class="post-card-img" src="${articleCover(a, 'card')}" alt="" width="640" height="400" loading="lazy" decoding="async">
  <div class="post-card-body">
    <p class="post-card-cat">${esc(a.cat)} · ${esc(a.read)}</p>
    <${h} class="post-card-title"><a href="${articleUrl(a)}">${esc(a.title)}</a></${h}>
    <p>${esc(a.excerpt)}</p>
  </div>
</article>`;
}

export const faqHtml = (items) =>
  `<div class="faq">${items
    .map(([q, a]) => `<details class="faq-item"><summary><span>${esc(q)}</span><span class="faq-sign" aria-hidden="true"></span></summary><div class="faq-answer"><p>${a}</p></div></details>`)
    .join('\n')}</div>`;

// ---------- Données structurées (schema.org, JSON-LD) ----------

export const organizationId = abs('/#organisation');

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': organizationId,
    name: site.name,
    url: abs('/'),
    logo: { '@type': 'ImageObject', url: abs('/assets/img/logo-agripatte-512.png'), width: 512, height: 512 },
    email: site.email,
    description: site.description,
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: site.email, availableLanguage: 'French' },
    hasMerchantReturnPolicy: returnPolicy(),
  };
}

export function returnPolicy() {
  return {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'FR',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: site.returns.days,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  };
}

const days = ([min, max]) => ({ '@type': 'QuantitativeValue', minValue: min, maxValue: max, unitCode: 'DAY' });
export const shippingDetails = () =>
  site.shipping.map((s) => ({
    '@type': 'OfferShippingDetails',
    shippingLabel: `${s.label} (${s.carrier})`,
    shippingRate: { '@type': 'MonetaryAmount', value: s.price.toFixed(2), currency: 'EUR' },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'FR' },
    deliveryTime: { '@type': 'ShippingDeliveryTime', handlingTime: days(s.handling), transitTime: days(s.transit) },
  }));

// Une paire déclinée en 3 tailles = ProductGroup + une variante Product par taille (URL ?taille=…, canonique sans paramètre)
export function productSchema(g) {
  const url = abs(gammeUrl(g));
  const images = ['1x1', '4x3', '16x9'].map((r) => abs(photo.jpg(g, r)));
  return {
    '@type': 'ProductGroup',
    '@id': `${url}#produit`,
    name: `Chaussettes antidérapantes pour chat ${g.name}`,
    description: `${g.pitch} ${g.contenu}. ${g.matiere}, picots en silicone.`,
    url,
    image: images,
    brand: { '@type': 'Brand', name: site.name },
    productGroupID: g.sku,
    variesBy: ['https://schema.org/size'],
    color: g.color,
    material: g.matiere,
    hasVariant: sizes.map((s) => {
      const vurl = `${url}?taille=${s.code}`;
      return {
        '@type': 'Product',
        sku: `${g.sku}-${s.label}`,
        name: `Chaussettes antidérapantes pour chat ${g.name}, taille ${s.label} (${s.weight})`,
        size: s.label,
        image: images[0],
        url: vurl,
        offers: {
          '@type': 'Offer',
          url: vurl,
          price: g.price.toFixed(2),
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@id': organizationId },
          shippingDetails: shippingDetails(),
          hasMerchantReturnPolicy: returnPolicy(),
        },
      };
    }),
  };
}

export function articleSchema(a) {
  const url = abs(articleUrl(a));
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: a.title,
    description: a.description,
    image: ['16x9', '4x3', '1x1'].map((r) => abs(articleCover(a, r))),
    datePublished: `${a.date}T09:00:00+02:00`,
    inLanguage: 'fr-FR',
    articleSection: a.cat,
    author: { '@type': 'Organization', name: `L’équipe ${site.name}`, url: abs('/a-propos/') },
    publisher: { '@id': organizationId },
    mainEntityOfPage: url,
    about: { '@id': `${abs(gammeUrl(bySlug(a.gamme)))}#produit` },
  };
}

export const faqSchema = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});

export function videoSchema() {
  const f = motion.film;
  return {
    '@type': 'VideoObject',
    '@id': `${abs(f.page)}#video`,
    name: f.title,
    description: f.description,
    thumbnailUrl: [abs(f.poster)],
    uploadDate: f.uploadDate,
    duration: `PT${f.seconds}S`,
    contentUrl: abs(f.mp4),
    inLanguage: 'fr-FR',
    publisher: { '@id': organizationId },
  };
}
