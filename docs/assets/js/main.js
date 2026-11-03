/* Agripatte : panier (stocké dans le navigateur), effets au clic, animations au défilement, vidéos HyperFrames.
   Tout le contenu est dans le HTML : ce script n'ajoute que de l'interaction. */
(function () {
  'use strict';

  const root = document.documentElement;
  const BASE = root.dataset.base || '/';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const eur = (n) => n.toFixed(2).replace('.', ',') + ' €';
  const PAW = '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor"><ellipse cx="17" cy="38" rx="9" ry="11.5" transform="rotate(-24 17 38)"/><ellipse cx="37" cy="19" rx="9.5" ry="12.5" transform="rotate(-8 37 19)"/><ellipse cx="63" cy="19" rx="9.5" ry="12.5" transform="rotate(8 63 19)"/><ellipse cx="83" cy="38" rx="9" ry="11.5" transform="rotate(24 83 38)"/><path d="M50 45c-15 0-28 14-28 27 0 10 8 16 17 14 4-1 7-3 11-3s7 2 11 3c9 2 17-4 17-14 0-13-13-27-28-27z"/></g></svg>';
  const COLORS = ['#ff7a59', '#22407a', '#b23a6c', '#3f5c00', '#7a4622', '#c7f06a', '#ffb3c7', '#8fb3ec', '#ffcf5c'];
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  // ---------- Panier ----------
  const KEY = 'agripatte-cart';
  const ORDER = 'agripatte-last-order';
  const store = {
    read() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } },
    write(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} updateBadge(true); },
  };
  function addToCart(slug, size, qty) {
    const c = store.read();
    const line = c.find((x) => x.slug === slug && x.size === size);
    if (line) line.qty += qty; else c.push({ slug, size, qty });
    store.write(c);
  }
  const count = () => store.read().reduce((a, x) => a + x.qty, 0);
  function updateBadge(bump) {
    $$('[data-cart-badge]').forEach((b) => {
      b.textContent = count();
      if (bump && !reduce) { b.classList.remove('is-bump'); void b.offsetWidth; b.classList.add('is-bump'); }
    });
  }
  updateBadge(false);
  window.addEventListener('storage', () => updateBadge(false));

  // ---------- Effets au clic (repris de la maquette) ----------
  function paw(size, color) {
    const d = document.createElement('div');
    d.className = 'fun-paw';
    d.style.cssText = `width:${size}px;height:${size}px;color:${color}`;
    d.innerHTML = PAW;
    document.body.appendChild(d);
    return d;
  }
  function burst(x, y, n = 8, colors = COLORS) {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const s = 14 + Math.random() * 16, p = paw(s, pick(colors));
      const a = (i / n) * Math.PI * 2 + Math.random() * 0.6, dist = 50 + Math.random() * 70;
      const dx = Math.cos(a) * dist, dy = Math.sin(a) * dist - 30, r0 = Math.random() * 360, ox = x - s / 2, oy = y - s / 2;
      p.animate([
        { transform: `translate(${ox}px,${oy}px) scale(.2) rotate(${r0}deg)`, opacity: 1 },
        { transform: `translate(${ox + dx}px,${oy + dy}px) scale(1) rotate(${r0 + 90}deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${ox + dx * 1.15}px,${oy + dy + 50}px) scale(.7) rotate(${r0 + 130}deg)`, opacity: 0 },
      ], { duration: 800 + Math.random() * 300, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => p.remove();
    }
  }
  const squish = (el) => !reduce && el.animate([{ transform: 'scale(1)' }, { transform: 'scale(.88, .92)' }, { transform: 'scale(1.06, 1.04)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'ease-out', composite: 'add' });
  const wiggle = (el) => !reduce && el.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(4deg)' }, { transform: 'rotate(0)' }], { duration: 480, easing: 'ease-in-out', composite: 'add' });
  function bubble(x, y, text) {
    if (reduce) return;
    const b = document.createElement('div');
    b.className = 'fun-bubble';
    b.textContent = text || pick(['Miaou !', 'Mrrrp ?', 'Purrr…', 'Miaaaou !', 'Mrraow !', 'Prrrt !']);
    document.body.appendChild(b);
    const w = b.offsetWidth, ox = x - w / 2, oy = y - 64, r = (Math.random() - 0.5) * 16;
    b.animate([
      { transform: `translate(${ox}px,${oy + 30}px) scale(.3) rotate(${r}deg)`, opacity: 0 },
      { transform: `translate(${ox}px,${oy}px) scale(1.12) rotate(${r}deg)`, opacity: 1, offset: 0.25 },
      { transform: `translate(${ox}px,${oy - 6}px) scale(1) rotate(${r}deg)`, opacity: 1, offset: 0.75 },
      { transform: `translate(${ox}px,${oy - 40}px) scale(.9) rotate(${r}deg)`, opacity: 0 },
    ], { duration: 1300, easing: 'ease-out' }).onfinish = () => b.remove();
  }
  function flyToCart(x, y) {
    const badge = $('[data-cart-badge]');
    if (!badge || reduce) return;
    const r = badge.getBoundingClientRect(), tx = r.left + r.width / 2, ty = r.top + r.height / 2;
    for (let i = 0; i < 4; i++) {
      const s = 26, p = paw(s, pick(['#ff7a59', '#ffb3c7', '#ffcf5c']));
      const mx = (x + tx) / 2 + (Math.random() - 0.5) * 140, my = Math.min(y, ty) - 120 - Math.random() * 80;
      p.animate([
        { transform: `translate(${x - s / 2}px,${y - s / 2}px) scale(.4) rotate(0deg)` },
        { transform: `translate(${mx - s / 2}px,${my - s / 2}px) scale(1.2) rotate(180deg)`, offset: 0.5 },
        { transform: `translate(${tx - s / 2}px,${ty - s / 2}px) scale(.4) rotate(360deg)` },
      ], { duration: 700, delay: i * 90, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'backwards' }).onfinish = () => p.remove();
    }
    setTimeout(() => burst(tx, ty, 6), 760);
  }
  function rain(n = 46) {
    if (reduce) return;
    const W = window.innerWidth, H = window.innerHeight;
    for (let i = 0; i < n; i++) {
      const s = 16 + Math.random() * 26, p = paw(s, pick(COLORS)), x = Math.random() * W, drift = (Math.random() - 0.5) * 160, r0 = Math.random() * 360;
      p.style.opacity = '0';
      p.animate([
        { transform: `translate(${x}px,-60px) rotate(${r0}deg)`, opacity: 1 },
        { transform: `translate(${x + drift}px,${H + 60}px) rotate(${r0 + (Math.random() > 0.5 ? 360 : -360)}deg)`, opacity: 1 },
      ], { duration: 1800 + Math.random() * 1400, delay: Math.random() * 1000, easing: 'cubic-bezier(.3,0,.7,1)' }).onfinish = () => p.remove();
    }
  }
  document.addEventListener('click', (e) => {
    const el = e.target.closest && e.target.closest('[data-fun]');
    if (!el || reduce) return;
    const kind = el.dataset.fun, x = e.clientX, y = e.clientY;
    if (kind === 'wiggle') { wiggle(el); burst(x, y, 6); }
    else if (kind === 'miaou') { squish(el); bubble(x, y); }
    else if (kind === 'cart') { squish(el); burst(x, y, 6); }
    else if (kind === 'pop') { squish(el); burst(x, y, 4); }
    else if (kind === 'rain') { squish(el); rain(); }
    else { squish(el); burst(x, y, 10); }
    // Laisse le temps de voir l'effet avant de changer de page
    if (el.tagName === 'A' && x + y > 0) {
      const href = el.getAttribute('href') || '';
      if (!href || href[0] === '#' || href.startsWith('mailto:') || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || el.target) return;
      e.preventDefault();
      setTimeout(() => { window.location.href = el.href; }, kind === 'rain' ? 700 : 280);
    }
  });

  // ---------- En-tête et menu ----------
  const header = $('.site-header');
  const onScrollHeader = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  const toggle = $('.menu-toggle'), nav = $('#menu');
  if (toggle && nav) {
    const close = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
    document.addEventListener('click', (e) => !e.target.closest('.header-inner') && close());
  }

  // ---------- Apparitions au défilement ----------
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    : null;
  const revealables = $$('[data-reveal], .grip, .site-footer');
  revealables.forEach((el, i) => {
    if (el.matches('[data-reveal]')) {
      const siblings = el.parentElement ? $$(':scope > [data-reveal]', el.parentElement) : [];
      el.style.setProperty('--delay', `${Math.min(siblings.indexOf(el), 5) * 0.08}s`);
    }
    if (io) io.observe(el); else el.classList.add('is-in');
  });
  $$('.walk-paw').forEach((p, i) => {
    p.style.left = `${5 + i * 12}%`;
    p.style.rotate = '90deg';
    p.style.animationDelay = `${i * 0.35}s`;
  });

  // ---------- Vidéos HyperFrames : lecture silencieuse quand elles sont visibles ----------
  const videos = $$('video[data-autoplay]');
  if (!reduce && videos.length && 'IntersectionObserver' in window) {
    const play = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    const vio = new IntersectionObserver((entries) => entries.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) { if (v.dataset.autoplay === 'eager' && document.readyState !== 'complete') return; play(v); } else v.pause();
    }), { threshold: 0.3 });
    videos.forEach((v) => {
      v.addEventListener('playing', () => v.classList.add('is-playing'));
      vio.observe(v);
    });
    // La vidéo d'ouverture démarre une fois la page chargée, pour ne pas ralentir l'affichage
    window.addEventListener('load', () => videos.filter((v) => v.dataset.autoplay === 'eager').forEach((v) => {
      const r = v.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) play(v);
    }));
  }

  // ---------- Inclinaison 3D et parallaxe (souris) ----------
  if (!reduce && finePointer) {
    $$('[data-tilt]').forEach((el) => {
      const zone = el.closest('.hero, .product, .page-hero') || el;
      zone.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - (r.left + r.width / 2)) / r.width, py = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.setProperty('--ry', `${(px * 10).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-py * 8).toFixed(2)}deg`);
      });
      zone.addEventListener('pointerleave', () => { el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); });
    });
    const hero = $('.hero');
    const paws = $('[data-parallax]');
    if (hero && paws) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        paws.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        paws.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      // Traînée de pattes qui suit la souris dans l'ouverture
      let last = null, side = 1;
      hero.addEventListener('pointermove', (e) => {
        if (e.target.closest('a, button, video, .hero-frame')) return;
        if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 70) return;
        const angle = last ? Math.atan2(e.clientY - last.y, e.clientX - last.x) * 180 / Math.PI + 90 : 0;
        last = { x: e.clientX, y: e.clientY };
        side = -side;
        const t = document.createElement('div');
        t.className = 'trail-paw';
        t.innerHTML = PAW;
        document.body.appendChild(t);
        const rad = (angle * Math.PI) / 180, off = 10 * side;
        const x = e.clientX - 11 + Math.cos(rad) * off, y = e.clientY - 11 + Math.sin(rad) * off;
        t.animate([
          { transform: `translate(${x}px,${y}px) rotate(${angle}deg) scale(.4)`, opacity: 0.9 },
          { transform: `translate(${x}px,${y}px) rotate(${angle}deg) scale(1)`, opacity: 0.7, offset: 0.15 },
          { transform: `translate(${x}px,${y}px) rotate(${angle}deg) scale(1)`, opacity: 0 },
        ], { duration: 1400, easing: 'ease-out' }).onfinish = () => t.remove();
      });
    }
  }

  // ---------- Vitrine des 6 paires : défilement horizontal piloté par le défilement vertical ----------
  const showcase = $('[data-showcase]');
  if (showcase) {
    const sticky = $('.showcase-sticky', showcase), track = $('[data-showcase-track]', showcase), bar = $('[data-showcase-bar]', showcase);
    const slides = $$('.slide', track);
    const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const tints = slides.map((s) => hex(s.dataset.tint));
    const mq = window.matchMedia('(min-width: 901px)');
    let distance = 0, ticking = false;
    const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    function layout() {
      const pinned = mq.matches && !reduce;
      showcase.classList.toggle('is-pinned', pinned);
      if (!pinned) { showcase.style.height = ''; track.style.transform = ''; sticky.style.removeProperty('--showcase-bg'); return; }
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      showcase.style.height = `${sticky.offsetHeight + distance}px`;
      update();
    }
    function update() {
      ticking = false;
      if (!showcase.classList.contains('is-pinned')) return;
      const top = showcase.getBoundingClientRect().top;
      const p = distance ? Math.min(1, Math.max(0, -top / distance)) : 0;
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px,0,0)`;
      if (bar) bar.parentElement.style.setProperty('--p', p.toFixed(4));
      const f = p * (tints.length - 1), i = Math.min(tints.length - 2, Math.floor(f));
      const c = mix(tints[i], tints[i + 1], f - i);
      sticky.style.setProperty('--showcase-bg', `rgb(${c.join(',')})`);
    }
    // Les photos des paires sont décalées hors écran par la translation : on les charge dès que la vitrine approche
    if ('IntersectionObserver' in window) {
      const near = new IntersectionObserver((en) => { if (en[0].isIntersecting) { $$('img', track).forEach((i) => { i.loading = 'eager'; }); near.disconnect(); } }, { rootMargin: '100% 0px' });
      near.observe(showcase);
    }
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', layout);
    mq.addEventListener('change', layout);
    window.addEventListener('load', layout);
    layout();
  }

  // ---------- Tracé des étapes qui se dessine au défilement ----------
  const trail = $('.steps-trail');
  if (trail && !reduce) {
    const draw = () => {
      const r = trail.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight * 0.7)));
      trail.style.setProperty('--p', p.toFixed(3));
    };
    draw();
    window.addEventListener('scroll', () => requestAnimationFrame(draw), { passive: true });
  }

  // ---------- Filtres (conseils, FAQ) ----------
  $$('[data-filters]').forEach((group) => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      const f = btn.dataset.filter;
      $$('[data-filter]', group).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      $$('main [data-cat]').forEach((el) => {
        const hide = f !== 'tous' && el.dataset.cat !== f;
        el.classList.toggle('is-filtered-out', hide);
        if (!hide) el.classList.add('is-in');
      });
    });
  });

  // ---------- Fiche produit ----------
  const buy = $('[data-buy]');
  if (buy) {
    const product = JSON.parse($('[data-product]', buy).textContent);
    const qtyOut = $('[data-qty-value]', buy), label = $('[data-cart-label]', buy), note = $('[data-buy-note]', buy);
    let qty = 1;
    const wanted = new URLSearchParams(location.search).get('taille');
    if (wanted) { const r = $(`input[name="taille"][value="${wanted.toUpperCase()}"]`, buy); if (r) r.checked = true; }
    const refresh = () => { qtyOut.textContent = qty; label.textContent = `Ajouter au panier · ${eur(product.price * qty)}`; };
    buy.addEventListener('click', (e) => {
      const b = e.target.closest('[data-qty]');
      if (!b) return;
      qty = Math.max(1, Math.min(20, qty + Number(b.dataset.qty)));
      refresh();
    });
    buy.addEventListener('submit', (e) => {
      e.preventDefault();
      const size = $('input[name="taille"]:checked', buy).value;
      addToCart(product.slug, size, qty);
      const btn = $('.btn-cart', buy), r = btn.getBoundingClientRect();
      flyToCart(r.left + r.width / 2, r.top + r.height / 2);
      label.textContent = 'Dans le panier, miaou !';
      note.innerHTML = `${qty} × ${product.name} taille ${size} ajouté${qty > 1 ? 's' : ''}. <a href="${BASE}panier/">Voir le panier</a>`;
      setTimeout(refresh, 2200);
    });
  }

  // ---------- Panier, commande, confirmation ----------
  const cat = $('#catalogue') ? JSON.parse($('#catalogue').textContent) : null;
  const lines = () => (cat ? store.read().filter((x) => cat.items[x.slug]).map((x, i) => ({ ...x, ...cat.items[x.slug], i, total: cat.items[x.slug].price * x.qty })) : []);
  const subtotal = () => lines().reduce((a, l) => a + l.total, 0);
  const miniLine = (l) => `<li><img src="${l.image}" alt="" width="52" height="52" style="background:${l.tint}"><span>${l.name}<small>Taille ${l.size} · × ${l.qty}</small></span><span>${eur(l.total)}</span></li>`;

  const cartPage = $('[data-cart-page]');
  function renderCart() {
    const list = $('[data-cart-lines]'), ls = lines(), sub = subtotal();
    $('[data-cart-empty]').hidden = ls.length > 0;
    $('[data-cart-summary]').hidden = ls.length === 0;
    list.innerHTML = ls.map((l) => `<li class="cart-line" data-i="${l.i}">
      <img src="${l.image}" alt="" width="96" height="96" style="background:${l.tint}">
      <div><h2><a href="${l.url}">${l.name}</a></h2><p class="cart-line-meta">Taille ${l.size} · ${eur(l.price)} les 4</p>
        <div class="qty" role="group" aria-label="Quantité de ${l.name}"><button type="button" data-line-qty="-1" aria-label="Retirer une paire">−</button><output>${l.qty}</output><button type="button" data-line-qty="1" aria-label="Ajouter une paire">+</button></div></div>
      <div><p class="cart-line-price">${eur(l.total)}</p><button type="button" class="cart-remove" data-remove>Retirer</button></div>
    </li>`).join('');
    $('[data-subtotal]').textContent = eur(sub);
    const p = Math.min(1, sub / cat.free), meter = $('[data-free-meter]');
    meter.style.setProperty('--p', p.toFixed(3));
    $('[data-free-text]').textContent = sub >= cat.free ? 'Livraison offerte, bien joué !' : `Plus que ${eur(cat.free - sub)} pour la livraison offerte`;
  }
  if (cartPage && cat) {
    renderCart();
    cartPage.addEventListener('click', (e) => {
      const li = e.target.closest('.cart-line');
      if (!li) return;
      const c = store.read(), i = Number(li.dataset.i);
      const q = e.target.closest('[data-line-qty]');
      if (q) { c[i].qty = Math.max(1, Math.min(20, c[i].qty + Number(q.dataset.lineQty))); store.write(c); renderCart(); }
      if (e.target.closest('[data-remove]')) {
        li.classList.add('is-leaving');
        setTimeout(() => { c.splice(i, 1); store.write(c); renderCart(); }, reduce ? 0 : 320);
      }
    });
  }

  const checkout = $('[data-checkout]');
  const shipCost = (code, sub) => (sub >= cat.free ? 0 : cat.shipping.find((s) => s.code === code).price);
  if (checkout && cat) {
    const render = () => {
      const ls = lines(), sub = subtotal();
      const code = $('input[name="livraison"]:checked', checkout).value, ship = shipCost(code, sub);
      $('[data-mini-lines]').innerHTML = ls.map(miniLine).join('') || '<li>Ton panier est vide.</li>';
      $('[data-subtotal]').textContent = eur(sub);
      $('[data-ship]').textContent = ship ? eur(ship) : 'Offerte';
      $('[data-total]').textContent = eur(sub + ship);
      cat.shipping.forEach((s) => { const el = $(`[data-ship-price="${s.code}"]`, checkout); if (el) el.textContent = sub >= cat.free ? 'Offerte' : eur(s.price); });
    };
    render();
    checkout.addEventListener('change', render);
    checkout.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!lines().length) { window.location.href = `${BASE}panier/`; return; }
      const sub = subtotal(), code = $('input[name="livraison"]:checked', checkout).value, ship = shipCost(code, sub);
      const order = {
        number: 'AGR-' + Math.floor(10000 + Math.random() * 89999),
        cat: (checkout.elements.chat.value || '').trim().slice(0, 30),
        lines: store.read(), sub, ship, total: sub + ship,
        mode: cat.shipping.find((s) => s.code === code).label,
      };
      try { localStorage.setItem(ORDER, JSON.stringify(order)); } catch (err) {}
      store.write([]);
      window.location.href = `${BASE}confirmation/`;
    });
  }

  const confirmPage = $('[data-confirm-page]');
  if (confirmPage && cat) {
    let o = null;
    try { o = JSON.parse(localStorage.getItem(ORDER)); } catch (e) {}
    if (o) {
      $('[data-order-number]').textContent = `Commande n° ${o.number}`;
      if (o.cat) $('[data-order-message]').textContent = `Merci ! ${o.cat} va bientôt pouvoir sprinter dans le couloir sans glisser. Tu vas recevoir un e-mail de confirmation.`;
      $('[data-mini-lines]').innerHTML = o.lines.filter((x) => cat.items[x.slug]).map((x) => miniLine({ ...x, ...cat.items[x.slug], total: cat.items[x.slug].price * x.qty })).join('');
      $('[data-order-mode]').textContent = `Livraison · ${o.mode}`;
      $('[data-ship]').textContent = o.ship ? eur(o.ship) : 'Offerte';
      $('[data-total]').textContent = eur(o.total);
      setTimeout(() => rain(60), 400);
    }
  }
})();
