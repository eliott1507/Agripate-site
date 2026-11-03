window.AGRI = (function () {
  const PRODUIT = 'Agripatte%20Fiches%20Produit%20v2.dc.html';
  const GAMMES = [
    { slug: 'essentielles', name: 'Les Essentielles', price: 9.9, tint: '#ebe7e3', deep: '#57504b', usage: 'Tous les jours' },
    { slug: 'guimauve', name: 'Guimauve', price: 11.9, tint: '#ffdbe7', deep: '#b23a6c', usage: 'Chatons' },
    { slug: 'moussaillon', name: 'Moussaillon', price: 14.9, tint: '#d9e4f7', deep: '#22407a', usage: 'Parquet & escaliers' },
    { slug: 'flocon', name: 'Flocon', price: 16.9, tint: '#ffdcd6', deep: '#b3261e', usage: 'Hiver & sols froids' },
    { slug: 'neon', name: 'Néon', price: 14.9, tint: '#e6f7bd', deep: '#3f5c00', usage: 'Chats sportifs' },
    { slug: 'sieste', name: 'Douce Sieste', price: 19.9, tint: '#f5e7d2', deep: '#7a4622', usage: 'Chats seniors' }
  ];
  const KEY = 'agripatte-cart', ORDER = 'agripatte-last-order';
  const SEED = [{ slug: 'moussaillon', size: 'M', qty: 1 }, { slug: 'sieste', size: 'L', qty: 2 }];
  function read() {
    try {
      const v = localStorage.getItem(KEY);
      if (v === null) { localStorage.setItem(KEY, JSON.stringify(SEED)); return SEED.slice(); }
      return JSON.parse(v) || [];
    } catch (e) { return []; }
  }
  function write(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} window.dispatchEvent(new Event('agri-cart')); }
  function add(slug, size, qty) {
    const c = read(); const f = c.find(x => x.slug === slug && x.size === size);
    if (f) f.qty += qty; else c.push({ slug, size, qty });
    write(c);
  }
  const count = () => read().reduce((a, x) => a + x.qty, 0);
  const eur = n => n.toFixed(2).replace('.', ',') + ' €';
  const bySlug = s => GAMMES.find(g => g.slug === s) || GAMMES[0];
  function lines() { return read().map((x, i) => { const g = bySlug(x.slug); return { ...x, ...g, i, line: g.price * x.qty }; }); }
  const subtotal = () => lines().reduce((a, l) => a + l.line, 0);
  function saveOrder(o) { try { localStorage.setItem(ORDER, JSON.stringify(o)); } catch (e) {} }
  function lastOrder() { try { return JSON.parse(localStorage.getItem(ORDER)); } catch (e) { return null; } }
  return { PRODUIT, GAMMES, read, write, add, count, eur, bySlug, lines, subtotal, saveOrder, lastOrder, FREE: 35 };
})();
