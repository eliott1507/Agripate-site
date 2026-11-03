// Génère, avec Google Chrome headless (macOS) : le logo PNG, les icônes, l'image de partage (Open Graph)
// et les visuels des articles (16:9, 4:3, 1:1 pour Google, et une vignette WebP pour les cartes).
// À lancer après tools/photos.mjs. Usage : node tools/images.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles, articleCats, articleCover, bySlug, pawSvg } from '../src/lib.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const p = (rel) => join(root, rel);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const tmp = mkdtempSync(join(tmpdir(), 'agripatte-img-'));
const fileUrl = (rel) => 'file://' + p(rel);
mkdirSync(p('assets/img/conseils'), { recursive: true });
mkdirSync(p('assets/img/og'), { recursive: true });

const head = `<!doctype html><meta charset="utf-8"><style>
@font-face { font-family: Fredoka; src: url("${fileUrl('assets/fonts/fredoka.woff2')}"); font-weight: 300 700; }
@font-face { font-family: Nunito; src: url("${fileUrl('assets/fonts/nunito.woff2')}"); font-weight: 200 1000; }
html, body { margin: 0; overflow: hidden; }
body { font-family: Nunito; color: #3b2a26; }
.paw { position: absolute; }
</style>`;

function shoot(html, width, height, out) {
  const page = join(tmp, 'page.html');
  const png = out.endsWith('.png') ? p(out) : join(tmp, 'shot.png');
  writeFileSync(page, `${head}<style>html,body{width:${width}px;height:${height}px}</style>${html}`);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--default-background-color=00000000', `--window-size=${width},${height}`, '--virtual-time-budget=1500', `--screenshot=${png}`, 'file://' + page], { stdio: 'ignore' });
  if (out.endsWith('.jpg')) execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '84', png, '--out', p(out)], { stdio: 'ignore' });
  if (out.endsWith('.webp')) execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', png, '-c:v', 'libwebp', '-quality', '78', p(out)], { stdio: 'ignore' });
  console.log(`✔ ${out}`);
}

// Logo carré (Organization), icône Apple, favicon PNG 48 px (multiple de 48, recommandé par Google)
const icon = (bg) => `<body style="margin:0;background:${bg};display:grid;place-items:center"><img src="${fileUrl('public/favicon.svg')}" style="width:84%;height:84%"></body>`;
shoot(icon('#fff6ea'), 512, 512, 'assets/img/logo-agripatte-512.png');
shoot(icon('#fff6ea'), 180, 180, 'public/apple-touch-icon.png');
shoot(icon('transparent'), 48, 48, 'public/favicon-48.png');

// Pattes décoratives dispersées
const paws = (color, list) =>
  list.map(([x, y, s, r]) => pawSvg('paw', color).replace('<svg', `<svg style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;transform:rotate(${r}deg)"`)).join('');

// Image de partage du site : 1200 × 630
shoot(
  `<body style="position:relative;background:#ffe3d6;width:1200px;height:630px">
  ${paws('#ffcbb6', [[-30, 470, 190, 24], [520, 30, 90, -14], [1080, 500, 140, 18]])}
  <div style="position:absolute;left:64px;top:70px;width:470px">
    <p style="display:inline-block;margin:0 0 30px;padding:12px 28px 14px;border-radius:999px;background:#3b2a26;color:#fff6ea;font:700 40px Fredoka;position:relative">Agripatte</p>
    <p style="margin:0;font:700 60px/1.02 Fredoka;letter-spacing:-.01em">Des chaussettes pour les chats qui glissent un peu trop.</p>
    <p style="margin:26px 0 0;font:800 26px Nunito;color:#a23a1c">6 paires · picots en silicone · dès 9,90 €</p>
  </div>
  <div style="position:absolute;right:50px;top:78px;width:530px;padding:14px;border-radius:30px;background:#fff;transform:rotate(2deg);box-shadow:0 10px 0 #f2c2ad">
    <img src="${fileUrl('photos/collection.png')}" style="display:block;width:100%;border-radius:20px">
  </div>
</body>`,
  1200,
  630,
  'assets/img/og/agripatte-og.jpg'
);

// Visuels d'articles : fond de la catégorie, la paire conseillée détourée, pattes
const cover = (a, w, h, withText) => {
  const [tint, deep] = articleCats[a.cat];
  const g = bySlug(a.gamme);
  const s = Math.min(w, h) * (withText ? 0.78 : 0.86);
  return `<body style="position:relative;width:${w}px;height:${h}px;background:${tint}">
  ${paws('rgba(255,255,255,.55)', [[w * 0.06, h * 0.62, h * 0.3, -18], [w * 0.42, h * 0.06, h * 0.16, 14], [w * 0.88, h * 0.7, h * 0.22, 22]])}
  <div style="position:absolute;right:${w * 0.05}px;bottom:${h * 0.04}px;width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.75),rgba(255,255,255,0))"></div>
  <img src="${fileUrl(`photos/detoure/${g.slug}.png`)}" style="position:absolute;right:${w * 0.05}px;bottom:${h * 0.04}px;width:${s}px;height:${s}px;filter:drop-shadow(0 ${h * 0.02}px ${h * 0.02}px rgba(59,42,38,.25))">
  ${withText ? `<div style="position:absolute;left:${w * 0.06}px;top:${h * 0.1}px;width:${w * 0.48}px">
    <p style="display:inline-block;margin:0 0 ${h * 0.04}px;padding:10px 24px 12px;border-radius:999px;background:#fff;color:${deep};font:700 ${Math.round(h * 0.05)}px Fredoka">${a.cat}</p>
    <p style="margin:0;font:700 ${Math.round(Math.min(w * 0.05, h * 0.075))}px/1.04 Fredoka;color:#3b2a26;letter-spacing:-.01em">${a.title}</p>
  </div>` : ''}
</body>`;
};
for (const a of articles) {
  shoot(cover(a, 1200, 675, true), 1200, 675, articleCover(a, '16x9'));
  shoot(cover(a, 1200, 900, true), 1200, 900, articleCover(a, '4x3'));
  shoot(cover(a, 1080, 1080, true), 1080, 1080, articleCover(a, '1x1'));
  shoot(cover(a, 640, 400, false), 640, 400, articleCover(a, 'card'));
  shoot(cover(a, 1200, 560, false), 1200, 560, articleCover(a, 'large'));
}

rmSync(tmp, { recursive: true, force: true });
