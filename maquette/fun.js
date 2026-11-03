(function () {
  if (window.AGRI_FUN) return;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COLORS = ['#ff7a59', '#22407a', '#b23a6c', '#3f5c00', '#7a4622', '#c7f06a', '#ffb3c7', '#8fb3ec', '#ffcf5c'];
  const MIAOU = ['Miaou !', 'Mrrrp ?', 'Purrr…', 'Miaaaou !', 'Mrraow !', 'Prrrt !'];
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const PARTS = [[20, 44, 60, 48, '50% 50% 44% 44%'], [2, 26, 21, 24, '50%'], [23, 4, 21, 26, '50%'], [56, 4, 21, 26, '50%'], [77, 26, 21, 24, '50%']];

  function paw(size, color) {
    const d = document.createElement('div');
    d.style.cssText = `position:fixed;left:0;top:0;width:${size}px;height:${size}px;pointer-events:none;z-index:9999;will-change:transform`;
    PARTS.forEach(([l, t, w, h, r]) => {
      const s = document.createElement('span');
      s.style.cssText = `position:absolute;left:${l}%;top:${t}%;width:${w}%;height:${h}%;border-radius:${r};background:${color}`;
      d.appendChild(s);
    });
    document.body.appendChild(d);
    return d;
  }

  function burst(x, y, n = 8, colors = COLORS) {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const s = 14 + Math.random() * 16, p = paw(s, pick(colors));
      const a = (i / n) * Math.PI * 2 + Math.random() * 0.6, dist = 50 + Math.random() * 70;
      const dx = Math.cos(a) * dist, dy = Math.sin(a) * dist - 30, r0 = Math.random() * 360;
      const ox = x - s / 2, oy = y - s / 2;
      p.animate([
        { transform: `translate(${ox}px,${oy}px) scale(.2) rotate(${r0}deg)`, opacity: 1 },
        { transform: `translate(${ox + dx}px,${oy + dy}px) scale(1) rotate(${r0 + 90}deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${ox + dx * 1.15}px,${oy + dy + 50}px) scale(.7) rotate(${r0 + 130}deg)`, opacity: 0 }
      ], { duration: 800 + Math.random() * 300, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => p.remove();
    }
  }

  function squish(el) {
    el.animate([{ transform: 'scale(1)' }, { transform: 'scale(.86, .9)' }, { transform: 'scale(1.08, 1.05)' }, { transform: 'scale(1)' }],
      { duration: 380, easing: 'ease-out', composite: 'add' });
  }
  function wiggle(el) {
    el.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(0)' }],
      { duration: 520, easing: 'ease-in-out', composite: 'add' });
  }

  function bubble(x, y, text) {
    const b = document.createElement('div');
    b.textContent = text || pick(MIAOU);
    b.style.cssText = "position:fixed;left:0;top:0;z-index:9999;pointer-events:none;padding:8px 16px;border-radius:999px;background:#3b2a26;color:#fff6ea;font-family:'Fredoka',sans-serif;font-weight:600;font-size:20px;white-space:nowrap;box-shadow:0 4px 0 #ff7a59";
    document.body.appendChild(b);
    const w = b.offsetWidth, ox = x - w / 2, oy = y - 60, r = (Math.random() - 0.5) * 16;
    b.animate([
      { transform: `translate(${ox}px,${oy + 30}px) scale(.3) rotate(${r}deg)`, opacity: 0 },
      { transform: `translate(${ox}px,${oy}px) scale(1.12) rotate(${r}deg)`, opacity: 1, offset: 0.25 },
      { transform: `translate(${ox}px,${oy - 6}px) scale(1) rotate(${r}deg)`, opacity: 1, offset: 0.75 },
      { transform: `translate(${ox}px,${oy - 40}px) scale(.9) rotate(${r}deg)`, opacity: 0 }
    ], { duration: 1300, easing: 'ease-out' }).onfinish = () => b.remove();
  }

  function flyToCart(x, y) {
    const badge = document.querySelector('[data-cart-badge]');
    if (!badge || reduce) return;
    const r = badge.getBoundingClientRect(), tx = r.left + r.width / 2, ty = r.top + r.height / 2;
    for (let i = 0; i < 4; i++) {
      const s = 26, p = paw(s, pick(['#ff7a59', '#ffb3c7', '#ffcf5c']));
      const mx = (x + tx) / 2 + (Math.random() - 0.5) * 140, my = Math.min(y, ty) - 120 - Math.random() * 80;
      p.animate([
        { transform: `translate(${x - s / 2}px,${y - s / 2}px) scale(.4) rotate(0deg)` },
        { transform: `translate(${mx - s / 2}px,${my - s / 2}px) scale(1.2) rotate(180deg)`, offset: 0.5 },
        { transform: `translate(${tx - s / 2}px,${ty - s / 2}px) scale(.4) rotate(360deg)` }
      ], { duration: 700, delay: i * 90, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'backwards' }).onfinish = () => p.remove();
    }
    setTimeout(() => {
      badge.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.7) rotate(-12deg)' }, { transform: 'scale(.9)' }, { transform: 'scale(1)' }], { duration: 500, easing: 'ease-out' });
      burst(tx, ty, 6);
    }, 760);
  }

  function rain(n = 46) {
    if (reduce) return;
    const W = window.innerWidth, H = window.innerHeight;
    for (let i = 0; i < n; i++) {
      const s = 16 + Math.random() * 26, p = paw(s, pick(COLORS)), x = Math.random() * W, drift = (Math.random() - 0.5) * 160, r0 = Math.random() * 360;
      p.style.opacity = '0';
      p.animate([
        { transform: `translate(${x}px,${-60}px) rotate(${r0}deg)`, opacity: 1 },
        { transform: `translate(${x + drift}px,${H + 60}px) rotate(${r0 + 360 * (Math.random() > .5 ? 1 : -1)}deg)`, opacity: 1 }
      ], { duration: 1800 + Math.random() * 1400, delay: Math.random() * 1200, easing: 'cubic-bezier(.3,0,.7,1)' }).onfinish = () => p.remove();
    }
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest && e.target.closest('[data-fun]');
    if (!el) return;
    const kind = el.getAttribute('data-fun'), x = e.clientX, y = e.clientY;
    if (!reduce) {
      if (kind === 'wiggle') { wiggle(el); burst(x, y, 6); }
      else if (kind === 'miaou') { squish(el); bubble(x, y); }
      else if (kind === 'cart') { squish(el); burst(x, y, 6); flyToCart(x, y); }
      else if (kind === 'poof') { burst(x, y, 7, ['#d8cfc8', '#bfb3ab', '#f0dccb']); }
      else if (kind === 'pop') { squish(el); burst(x, y, 4); }
      else { squish(el); burst(x, y, 10); }
    }
    if (el.tagName === 'A') {
      const href = el.getAttribute('href') || '';
      if (!href || href[0] === '#' || href.startsWith('mailto:') || e.metaKey || e.ctrlKey || e.shiftKey || e.defaultPrevented) return;
      e.preventDefault();
      setTimeout(() => { window.location.href = el.href; }, reduce ? 0 : 420);
    }
  });

  window.AGRI_FUN = { burst, rain, bubble, squish, wiggle, flyToCart };
})();
