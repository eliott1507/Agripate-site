// Gabarit commun : <head> SEO, en-tête, fil d'Ariane, pied de page.
import { site, env, gammes, abs, esc, gammeUrl, money, organizationSchema, pawSvg } from './lib.mjs';

const nav = [
  ['produits', '/chaussettes-antiderapantes-chat/', 'Chaussettes'],
  ['tailles', '/guide-des-tailles/', 'Tailles'],
  ['conseils', '/conseils/', 'Conseils'],
  ['apropos', '/a-propos/', 'À propos'],
  ['faq', '/faq/', 'FAQ'],
];

export const logo = (tag = 'a', extra = '') =>
  `<${tag} class="logo"${tag === 'a' ? ' href="/"' : ''} ${extra}><span class="logo-ear" aria-hidden="true"></span><span class="logo-ear" aria-hidden="true"></span>${site.name}</${tag}>`;

function breadcrumbHtml(crumbs) {
  const items = crumbs
    .map(([label, path], i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(label)}</li>` : `<li><a href="${path}">${esc(label)}</a></li>`))
    .join('');
  return `<nav class="breadcrumb wrap" aria-label="Fil d’Ariane"><ol>${items}</ol></nav>`;
}

const breadcrumbSchema = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

const defaultOg = { src: '/assets/img/og/agripatte-og.jpg', width: 1200, height: 630, alt: 'Agripatte, des chaussettes antidérapantes pour les chats qui glissent un peu trop' };

// Liens internes écrits depuis la racine (/…) : préfixés automatiquement quand le site est servi dans un sous-dossier (GitHub Pages).
const withBase = (html) =>
  env.base === '/' ? html : html.replace(/\b(href|src|poster|action|data-src)="\/(?!\/)/g, `$1="${env.base}`).replace(/\bsrcset="([^"]*)"/g, (m, set) => `srcset="${set.replace(/(^|,\s*)\//g, `$1${env.base}`)}"`);

export function renderPage(page, version) {
  const url = abs(page.path);
  const og = { ...defaultOg, ...(page.og || {}) };
  const graph = [organizationSchema(), ...(page.schema || [])];
  if (page.breadcrumb) graph.push(breadcrumbSchema(page.breadcrumb));
  const jsonLd = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;
  const current = (key) => (page.section === key ? ' aria-current="page"' : '');
  const noindex = page.noindex || env.preview;

  return withBase(`<!doctype html>
<html lang="${site.lang}" data-base="${env.base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : ''}${page.noindex ? '' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="#fff6ea">
<link rel="preload" href="/assets/fonts/fredoka.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/nunito.woff2" as="font" type="font/woff2" crossorigin>
${page.preload || ''}<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/style.css?v=${version.css}">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs(og.src)}">
<meta property="og:image:width" content="${og.width}">
<meta property="og:image:height" content="${og.height}">
<meta property="og:image:alt" content="${esc(og.alt)}">
<meta name="twitter:card" content="summary_large_image">
${jsonLd}
<script src="/assets/js/main.js?v=${version.js}" defer></script>
</head>
<body class="${['page-' + (page.section || 'autre'), page.bodyClass].filter(Boolean).join(' ')}"${page.tint ? ` style="--tint:${page.tint};--deep:${page.deep}"` : ''}>
<a class="skip" href="#contenu">Aller au contenu</a>
<header class="site-header">
  <div class="header-inner wrap">
    ${logo('a', `data-fun="miaou" aria-label="${site.name}, retour à l’accueil"`)}
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu"><span class="menu-bars" aria-hidden="true"></span>Menu</button>
    <nav class="nav" id="menu" aria-label="Navigation principale">
      <ul>
${nav.map(([key, href, label]) => `        <li><a href="${href}"${current(key)}>${label}</a></li>`).join('\n')}
      </ul>
    </nav>
    <a class="cart-link" href="/panier/" data-cart-link>Panier <span class="cart-badge" data-cart-badge>0</span></a>
  </div>
</header>
<main id="contenu">
${page.breadcrumb ? breadcrumbHtml(page.breadcrumb) : ''}
${page.body}
</main>
<footer class="site-footer">
  <div class="footer-walk" aria-hidden="true">${Array.from({ length: 8 }, (_, i) => pawSvg(`walk-paw walk-${i % 2 ? 'r' : 'l'}`)).join('')}</div>
  <div class="wrap footer-grid">
    <div class="footer-brand">
      ${logo('p')}
      <p>Des chaussettes antidérapantes pour les chats qui glissent un peu trop.</p>
      <p><a href="mailto:${site.email}">${site.email}</a></p>
    </div>
    <nav aria-label="Nos chaussettes">
      <p class="footer-title">Nos chaussettes</p>
      <ul>
        <li><a href="/chaussettes-antiderapantes-chat/">Les 6 paires</a></li>
${gammes.map((g) => `        <li><a href="${gammeUrl(g)}">${esc(g.name)}</a> <span class="footer-price">${money(g.price)}</span></li>`).join('\n')}
      </ul>
    </nav>
    <nav aria-label="Aide">
      <p class="footer-title">Aide</p>
      <ul>
        <li><a href="/guide-des-tailles/">Guide des tailles</a></li>
        <li><a href="/livraison-et-retours/">Livraison et retours</a></li>
        <li><a href="/faq/">Questions fréquentes</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </nav>
    <nav aria-label="Agripatte">
      <p class="footer-title">Agripatte</p>
      <ul>
        <li><a href="/a-propos/">Notre histoire</a></li>
        <li><a href="/conseils/">Le coin des conseils</a></li>
        <li><a href="/video-chaussettes-antiderapantes-chat/">La vidéo</a></li>
      </ul>
    </nav>
    <div>
      <p class="footer-title">Promis</p>
      <ul class="footer-promise">
        <li>Livraison offerte dès ${site.freeShippingFrom} €</li>
        <li>Retours sous ${site.returns.days} jours</li>
        <li>Testé par de vrais chats</li>
      </ul>
    </div>
  </div>
  <p class="footer-word" aria-hidden="true">${site.name}</p>
  <div class="wrap footer-bottom">
    <p>© ${site.updated.slice(0, 4)} ${site.name}</p>
    <ul>
      <li><a href="/mentions-legales/">Mentions légales</a></li>
      <li><a href="/cgv/">CGV</a></li>
      <li><a href="/confidentialite/">Confidentialité</a></li>
    </ul>
  </div>
</footer>
</body>
</html>
`);
}
