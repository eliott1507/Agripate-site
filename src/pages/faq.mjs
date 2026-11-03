import { site, esc, money, faqSchema, pawSvg, articles, articleUrl } from '../lib.mjs';

const art = (id) => articleUrl(articles.find((a) => a.id === id));
const [domicile, relais] = site.shipping;

// [catégorie, question, réponse (HTML autorisé)]
const QS = [
  ['Tailles', 'Comment choisir la bonne taille ?', 'Pèse ton chat : S jusqu’à 3 kg, M de 3 à 5 kg, L au-delà de 5 kg. Si tu hésites entre deux tailles, prends la plus petite : une chaussette trop grande tourne autour de la patte. Le <a href="/guide-des-tailles/">guide des tailles</a> explique comment vérifier.'],
  ['Tailles', 'Et si la taille ne va pas ?', `Tu peux l’échanger gratuitement sous ${site.returns.days} jours, même si ton chat les a déjà essayées.`],
  ['Utilisation', 'Quelle paire choisir pour mon chat ?', 'Guimauve pour un chaton, Moussaillon pour le parquet ciré et l’escalier, Douce Sieste pour un chat âgé, Néon pour un chat très sportif, Flocon pour le carrelage froid en hiver, Les Essentielles pour tous les jours. Le <a href="/chaussettes-antiderapantes-chat/">comparatif des 6 paires</a> t’aide à trancher.'],
  ['Utilisation', 'Mon chat va-t-il les supporter ?', `La plupart des chats secouent les pattes pendant quelques minutes, puis oublient qu’ils les portent. Commence par de courtes séances, avec une friandise à la clé. <a href="${art('enfiler')}">Notre méthode d’enfilage</a>.`],
  ['Utilisation', 'Combien de temps peut-il les garder ?', 'Quelques heures par jour, à l’intérieur. Retire-les la nuit pour que les coussinets respirent.'],
  ['Utilisation', 'Peut-il sortir dehors avec ?', 'Elles sont faites pour l’intérieur. Dehors, les picots s’usent vite et les chaussettes se salissent.'],
  ['Utilisation', 'À partir de quel âge un chaton peut-il en porter ?', `À partir de 4 mois, quand il pèse au moins 1,5 kg. Avant, il a besoin de sentir le sol. <a href="${art('chaton')}">Le guide des petites pattes</a>.`],
  ['Livraison', 'En combien de temps je les reçois ?', `${domicile.delay.replace(/^./, (c) => c.toUpperCase())} à domicile avec ${domicile.carrier} (${money(domicile.price)}), ou ${relais.delay} en point relais (${money(relais.price)}). La livraison est offerte dès ${site.freeShippingFrom} €.`],
  ['Retours', 'Comment faire un retour ?', `Écris-nous dans les ${site.returns.days} jours après réception. On t’envoie une étiquette de retour et on te rembourse dès qu’on reçoit le colis. Tout est détaillé sur la page <a href="/livraison-et-retours/">livraison et retours</a>.`],
  ['Entretien', 'Comment les laver ?', `En machine à 30 °C, à l’envers pour protéger les picots. Pas de sèche-linge : laisse-les sécher à plat. <a href="${art('lavage')}">Les 3 gestes pour qu’elles durent</a>.`],
];
const cats = [...new Set(QS.map((q) => q[0]))];

export default {
  path: '/faq/',
  section: 'faq',
  title: 'Questions fréquentes sur les chaussettes pour chat | Agripatte',
  description: 'Taille, enfilage, durée de port, chaton, livraison, retours, lavage : nos réponses aux questions les plus fréquentes sur les chaussettes antidérapantes pour chat.',
  breadcrumb: [['Accueil', '/'], ['Questions fréquentes', '/faq/']],
  schema: [faqSchema(QS.map(([, q, a]) => [q, a]))],
  body: `
<section class="page-hero page-hero-peach">
  <div class="wrap">
    <h1>Les questions qu’on nous pose</h1>
    <div class="filters" role="group" aria-label="Filtrer par thème" data-filters="faq">
      <button type="button" aria-pressed="true" data-filter="tous" data-fun="pop">Toutes</button>
${cats.map((c) => `      <button type="button" aria-pressed="false" data-filter="${c}" data-fun="pop">${c}</button>`).join('\n')}
    </div>
  </div>
</section>

<section class="section wrap faq-layout">
  <div data-filter-list>
${cats
  .map(
    (c) => `    <div class="faq-group" data-cat="${c}">
      <h2 class="faq-cat">${c}</h2>
      <div class="faq">
${QS.filter((q) => q[0] === c)
  .map(([, q, a]) => `        <details class="faq-item" data-reveal><summary><span>${esc(q)}</span><span class="faq-sign" aria-hidden="true"></span></summary><div class="faq-answer"><p>${a}</p></div></details>`)
  .join('\n')}
      </div>
    </div>`
  )
  .join('\n')}
  </div>
  <aside class="help-card" data-reveal>
    ${pawSvg('help-paw')}
    <h2>Pas trouvé ta réponse&nbsp;?</h2>
    <p>Écris-nous, on répond sous 24 h (sauf pendant la sieste).</p>
    <p><a class="btn btn-dark" href="mailto:${site.email}">${site.email}</a></p>
    <p><a class="link-arrow" href="/conseils/">Ou lis nos conseils <span aria-hidden="true">→</span></a></p>
  </aside>
</section>
`,
};
