// Génère le site statique, puis lance un audit SEO.
//   node build.mjs           → ./site : version définitive pour https://agripatte.fr (indexable)
//   node build.mjs --github  → ./docs : aperçu GitHub Pages (https://<compte>.github.io/Agripate-site/), en noindex
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

process.chdir(dirname(fileURLToPath(import.meta.url)));
const lib = await import('./src/lib.mjs');
const { site, env, abs, u, gammes, sizes, gammeUrl, articles, articleUrl, photo } = lib;

const github = process.argv.includes('--github');
if (github) {
  env.base = '/Agripate-site/';
  env.preview = true;
}
const OUT = github ? 'docs' : 'site';

const { renderPage } = await import('./src/layout.mjs');
const pages = [
  (await import('./src/pages/accueil.mjs')).default,
  ...(await import('./src/pages/produits.mjs')).default,
  ...(await import('./src/pages/conseils.mjs')).default,
  (await import('./src/pages/faq.mjs')).default,
  ...(await import('./src/pages/infos.mjs')).default,
  ...(await import('./src/pages/legal.mjs')).default,
  ...(await import('./src/pages/systeme.mjs')).default,
];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('assets', join(OUT, 'assets'), { recursive: true });
cpSync('public', OUT, { recursive: true });
writeFileSync(join(OUT, '.nojekyll'), '');

// Empreinte des fichiers CSS/JS : cache navigateur long sans risque de version périmée
const hash = (file) => createHash('md5').update(readFileSync(file)).digest('hex').slice(0, 8);
const version = { css: hash('assets/css/style.css'), js: hash('assets/js/main.js') };

const outFile = (path) => join(OUT, path.endsWith('/') ? `${path}index.html` : path);
for (const page of pages) {
  const file = outFile(page.path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, renderPage(page, version));
}

// Manifeste : adresses relatives au sous-dossier éventuel
const manifest = JSON.parse(readFileSync('public/site.webmanifest', 'utf8'));
manifest.start_url = env.base;
manifest.icons = manifest.icons.map((i) => ({ ...i, src: u(i.src) }));
writeFileSync(join(OUT, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');

// ---------- sitemap.xml (pages indexables, même URL que la canonical ; Google ignore priority et changefreq) ----------
const indexable = pages.filter((p) => !p.noindex);
const xml = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const lastmod = (p) => (p.path.startsWith('/conseils/') && p.schema?.[0]?.datePublished ? p.schema[0].datePublished.slice(0, 10) : site.updated);
const videoEntry = (v) => `
    <video:video>
      <video:thumbnail_loc>${abs(v.poster)}</video:thumbnail_loc>
      <video:title>${xml(v.title)}</video:title>
      <video:description>${xml(v.description)}</video:description>
      <video:content_loc>${abs(v.mp4)}</video:content_loc>
      <video:duration>${v.seconds}</video:duration>
      <video:publication_date>${v.uploadDate}</video:publication_date>
    </video:video>
  `;
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${indexable.map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${lastmod(p)}</lastmod>${p.video ? videoEntry(p.video) : ''}</url>`).join('\n')}
</urlset>
`
);

writeFileSync(
  join(OUT, 'robots.txt'),
  `# Tout le site est ouvert à l'exploration, CSS et JavaScript compris (Google en a besoin pour afficher les pages).
# Le panier, la commande et la page 404 portent une balise noindex : ils ne doivent pas être bloqués ici,
# sinon Google ne verrait pas cette balise.
User-agent: *
Allow: /

Sitemap: ${abs('/sitemap.xml')}
`
);

// ---------- Flux produits Google Merchant Center (onglet Shopping, fiches gratuites, réponses IA de Google) ----------
const gPrice = (n) => `${n.toFixed(2)} EUR`;
writeFileSync(
  join(OUT, 'merchant-center.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>${site.name}</title>
  <link>${abs('/')}</link>
  <description>${xml(site.description)}</description>
${gammes
  .flatMap((g) =>
    sizes.map(
      (s) => `  <item>
    <g:id>${g.sku}-${s.label}</g:id>
    <g:item_group_id>${g.sku}</g:item_group_id>
    <g:title>${xml(`Chaussettes antidérapantes pour chat ${g.name}, taille ${s.label} (${s.weight}), lot de 4`)}</g:title>
    <g:description>${xml(`${g.pitch} ${g.contenu}. ${g.matiere}, picots en silicone. ${g.care}.`)}</g:description>
    <g:link>${abs(gammeUrl(g))}?taille=${s.code}</g:link>
    <g:image_link>${abs(photo.jpg(g, '1x1'))}</g:image_link>
    <g:additional_image_link>${abs(photo.jpg(g, '4x3'))}</g:additional_image_link>
    <g:availability>in_stock</g:availability>
    <g:price>${gPrice(g.price)}</g:price>
    <g:brand>${site.name}</g:brand>
    <g:condition>new</g:condition>
    <g:identifier_exists>no</g:identifier_exists>
    <g:size>${s.label}</g:size>
    <g:color>${xml(g.color)}</g:color>
    <g:material>${xml(g.matiere)}</g:material>
    <g:product_type>Animaux &gt; Chats &gt; Chaussettes antidérapantes</g:product_type>
${site.shipping.map((sh) => `    <g:shipping><g:country>FR</g:country><g:service>${xml(sh.label)}</g:service><g:price>${gPrice(g.price >= site.freeShippingFrom ? 0 : sh.price)}</g:price></g:shipping>`).join('\n')}
  </item>`
    )
  )
  .join('\n')}
</channel>
</rss>
`
);

// ---------- Anciennes adresses de la maquette → nouvelles pages (redirection immédiate, comprise comme permanente) ----------
const redirects = {
  'Accueil.dc.html': ['/', null],
  'Agripatte Fiches Produit v2.dc.html': ['/chaussettes-antiderapantes-chat/', ['gamme', Object.fromEntries(gammes.map((g) => [g.slug, u(gammeUrl(g))]))]],
  'Conseils.dc.html': ['/conseils/', null],
  'Article.dc.html': ['/conseils/', ['id', Object.fromEntries(articles.map((a) => [a.id, u(articleUrl(a))]))]],
  'FAQ.dc.html': ['/faq/', null],
  'A-propos.dc.html': ['/a-propos/', null],
  'Panier.dc.html': ['/panier/', null],
  'Commande.dc.html': ['/commande/', null],
  'Confirmation.dc.html': ['/confirmation/', null],
};
for (const [file, [to, map]] of Object.entries(redirects)) {
  const target = u(to);
  const js = map ? `var m=${JSON.stringify(map[1])},k=new URLSearchParams(location.search).get(${JSON.stringify(map[0])});location.replace(m[k]||${JSON.stringify(target)});` : `location.replace(${JSON.stringify(target)});`;
  writeFileSync(
    join(OUT, file),
    `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${site.name}</title><meta name="robots" content="noindex"><link rel="canonical" href="${abs(to)}"><script>${js}</script><meta http-equiv="refresh" content="0; url=${target}"></head><body><p><a href="${target}">Continuer vers ${site.name}</a></p></body></html>\n`
  );
}

// ---------- Audit SEO ----------
const problems = [];
const warnings = [];
const exists = (urlPath) => {
  let clean = decodeURI(urlPath.split(/[?#]/)[0]);
  if (env.base !== '/' && clean.startsWith(env.base)) clean = '/' + clean.slice(env.base.length);
  if (!clean) return true;
  return existsSync(outFile(clean)) || existsSync(join(OUT, clean));
};
const seenTitles = new Map();
const seenDescriptions = new Map();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
for (const page of pages) {
  const html = readFileSync(outFile(page.path), 'utf8');
  const where = page.path;
  const title = decode(html.match(/<title>(.*?)<\/title>/)[1]);
  const description = decode(html.match(/<meta name="description" content="(.*?)">/)[1]);

  if (!page.noindex) {
    if (seenTitles.has(title)) problems.push(`${where} : titre identique à ${seenTitles.get(title)}`);
    if (seenDescriptions.has(description)) problems.push(`${where} : description identique à ${seenDescriptions.get(description)}`);
    seenTitles.set(title, where);
    seenDescriptions.set(description, where);
    if (title.length > 65) warnings.push(`${where} : titre de ${title.length} caractères (risque de troncature)`);
    if (description.length < 70 || description.length > 165) warnings.push(`${where} : description de ${description.length} caractères`);
    if (!html.includes(`<link rel="canonical" href="${abs(page.path)}">`)) problems.push(`${where} : canonical manquante`);
    if (!env.preview && html.includes('noindex')) problems.push(`${where} : noindex sur une page à indexer`);
  }
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${where} : ${h1} balise(s) h1`);
  for (const [, tag] of html.matchAll(/(<(?:img|video)\b[^>]*>)/g)) {
    if (tag.startsWith('<img') && !/\salt="/.test(tag)) problems.push(`${where} : image sans attribut alt ${tag.slice(0, 80)}`);
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag)) problems.push(`${where} : média sans dimensions ${tag.slice(0, 80)}`);
  }
  for (const [, url] of html.matchAll(/(?:href|src|poster|action)="(\/[^"]*)"/g)) {
    if (!exists(url)) problems.push(`${where} : lien interne cassé ${url}`);
  }
  for (const [, json] of html.matchAll(/<script type="application\/(?:ld\+)?json"[^>]*>(.*?)<\/script>/gs)) {
    try {
      JSON.parse(json);
    } catch (e) {
      problems.push(`${where} : JSON invalide (${e.message})`);
    }
  }
  // Fichiers référencés dans les données structurées et Open Graph
  for (const [, url] of html.matchAll(new RegExp(`"(${site.url.replace(/\./g, '\\.')}/assets/[^"?]+)"`, 'g'))) {
    if (!exists(url.replace(site.url, ''))) problems.push(`${where} : fichier référencé introuvable ${url}`);
  }
}

console.log(`✔ ${pages.length} pages générées dans ./${OUT} (${indexable.length} dans le sitemap)${github ? `, servies sous ${env.base} en noindex` : ''}`);
warnings.forEach((w) => console.log(`  ⚠ ${w}`));
problems.forEach((p) => console.log(`  ✘ ${p}`));
if (problems.length) process.exit(1);
console.log('✔ Audit SEO : aucun problème bloquant');
