// Le coin des conseils : page d'accueil des articles et une page par article (texte dans src/articles.json).
import { site, articles, articleCats, abs, esc, dateFr, articleUrl, articleCover, articleSchema, articleCard, bySlug, gammeCard, pawSvg } from '../lib.mjs';

const indexPath = '/conseils/';
const featured = articles[0];

const index = {
  path: indexPath,
  section: 'conseils',
  title: 'Conseils : chat qui glisse, chatons, chats âgés | Agripatte',
  description: 'Enfiler des chaussettes à un chat, aider un chat âgé, choisir pour un chaton, laver les picots : tout ce qu’on a appris en chaussant des chats pas toujours d’accord.',
  breadcrumb: [['Accueil', '/'], ['Conseils', indexPath]],
  schema: [
    {
      '@type': 'Blog',
      '@id': `${abs(indexPath)}#blog`,
      name: `Le coin des conseils ${site.name}`,
      url: abs(indexPath),
      inLanguage: 'fr-FR',
      publisher: { '@id': abs('/#organisation') },
      blogPost: articles.map((a) => ({ '@id': `${abs(articleUrl(a))}#article` })),
    },
  ],
  body: `
<section class="page-hero page-hero-blue">
  <div class="wrap">
    <h1>Le coin des conseils</h1>
    <p class="lead">Enfilage, chatons, chats âgés, entretien : tout ce qu’on a appris en mettant des chaussettes à des chats qui n’étaient pas toujours d’accord.</p>
    <div class="filters" role="group" aria-label="Filtrer par thème" data-filters="conseils">
      <button type="button" aria-pressed="true" data-filter="tous" data-fun="pop">Tous</button>
${Object.keys(articleCats).map((c) => `      <button type="button" aria-pressed="false" data-filter="${esc(c)}" data-fun="pop">${esc(c)}</button>`).join('\n')}
    </div>
  </div>
</section>

<section class="section wrap" aria-label="À la une">
  <article class="featured" style="--tint:${articleCats[featured.cat][0]};--deep:${articleCats[featured.cat][1]}" data-cat="${esc(featured.cat)}" data-reveal>
    <img src="${articleCover(featured, '16x9')}" alt="" width="1200" height="675" loading="lazy" decoding="async">
    <div class="featured-body">
      <p class="post-card-cat">À la une · ${esc(featured.cat)} · ${esc(featured.read)} de lecture</p>
      <h2><a href="${articleUrl(featured)}">${esc(featured.title)}</a></h2>
      <p>${esc(featured.excerpt)}</p>
      <a class="btn btn-primary" href="${articleUrl(featured)}" data-fun="paws">Lire l’article <span aria-hidden="true">→</span></a>
    </div>
  </article>
  <div class="post-grid" data-filter-list>
${articles.slice(1).map((a) => articleCard(a, 2).replace('<article class="post-card"', `<article class="post-card" data-cat="${esc(a.cat)}"`)).join('\n')}
  </div>
</section>

<section class="cta-band cta-band-blue wrap" data-reveal>
  ${pawSvg('cta-paw')}
  <div><h2>Une question sur ton chat&nbsp;?</h2><p>On a rassemblé les réponses aux questions qu’on nous pose le plus souvent.</p></div>
  <a class="btn btn-dark" href="/faq/" data-fun="paws">Voir la FAQ <span aria-hidden="true">→</span></a>
</section>
`,
};

const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function renderBlocks(blocks) {
  return blocks
    .map((b) => {
      if (b.t === 'p') return `<p>${esc(b.x)}</p>`;
      if (b.t === 'h') return `<h2 id="${slugify(b.x)}">${esc(b.x)}</h2>`;
      if (b.t === 'ul') return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
      if (b.t === 'tip') return `<aside class="tip">${pawSvg('tip-paw')}<p><strong>L’astuce Agripatte</strong> ${esc(b.x)}</p></aside>`;
      if (b.t === 'steps') return `<ol class="article-steps">${b.items.map(([t, d]) => `<li><strong>${esc(t)}</strong> ${esc(d)}</li>`).join('')}</ol>`;
      return '';
    })
    .join('\n');
}

function articlePage(a) {
  const url = articleUrl(a);
  const [tint, deep] = articleCats[a.cat];
  const toc = a.blocks.filter((b) => b.t === 'h');
  const gamme = bySlug(a.gamme);
  const related = articles.filter((x) => x !== a && (x.cat === a.cat || x.gamme === a.gamme)).concat(articles.filter((x) => x !== a)).filter((x, i, arr) => arr.indexOf(x) === i).slice(0, 2);
  return {
    path: url,
    section: 'conseils',
    title: a.seoTitle,
    ogTitle: a.title,
    description: a.description,
    ogType: 'article',
    og: { src: articleCover(a, '16x9'), width: 1200, height: 675, alt: a.title },
    breadcrumb: [['Accueil', '/'], ['Conseils', indexPath], [a.title, url]],
    schema: [articleSchema(a)],
    body: `
<article class="article" style="--tint:${tint};--deep:${deep}">
  <header class="article-head wrap">
    <p class="article-cat">${esc(a.cat)}</p>
    <h1>${esc(a.title)}</h1>
    <p class="article-meta">Par <a href="/a-propos/" rel="author">l’équipe ${site.name}</a> · publié le <time datetime="${a.date}">${dateFr(a.date)}</time> · ${esc(a.read)} de lecture</p>
    <img class="article-cover" src="${articleCover(a, 'large')}" alt="La paire ${esc(gamme.name)}, conseillée pour cet article, vue de dessous avec ses picots en silicone" width="1200" height="560" fetchpriority="high">
  </header>
  <div class="article-layout wrap">
    <aside class="article-aside">
      ${toc.length > 1 ? `<nav class="toc" aria-label="Sommaire"><p class="toc-title">Au sommaire</p><ol>${toc.map((h) => `<li><a href="#${slugify(h.x)}">${esc(h.x)}</a></li>`).join('')}</ol></nav>` : ''}
      <div class="article-pair">
        <p class="toc-title">La paire conseillée</p>
        ${gammeCard(gamme, { headingLevel: 2, vt: false })}
      </div>
    </aside>
    <div class="prose article-body">
      <p class="article-lead">${esc(a.excerpt)}</p>
      ${renderBlocks(a.blocks)}
      <p class="article-note">Ces conseils viennent de notre expérience avec nos chats testeurs. Ils ne remplacent pas l’avis d’un vétérinaire : si ton chat boite, se lèche une patte ou change brusquement d’habitudes, consulte-le.</p>
    </div>
  </div>
</article>

<section class="section wrap" aria-labelledby="more-title">
  <h2 id="more-title" class="section-title" data-reveal>À lire aussi</h2>
  <div class="post-grid post-grid-2">
${related.map((x) => articleCard(x)).join('\n')}
  </div>
</section>
`,
  };
}

export default [index, ...articles.map(articlePage)];
