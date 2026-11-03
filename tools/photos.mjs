// Prépare les photos produit à partir de ./photos (sources, non publiées) :
//   - photos/detoure/<paire>.png → WebP transparent (le visuel du site, qui flotte sur les fonds colorés)
//   - photos/<paire>.png         → JPG fond blanc 1:1, 4:3 et 16:9 (données structurées, Merchant Center, partages)
//   - photos/collection.png      → WebP de la collection complète
// Les détourages se refont avec : npx hyperframes remove-background photos/<paire>.png -o photos/detoure/<paire>.png
// Prérequis : FFmpeg. Usage : node tools/photos.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gammes, photo } from '../src/lib.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const p = (rel) => join(root, rel);
const ffmpeg = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
mkdirSync(p('assets/img/paires'), { recursive: true });

for (const g of gammes) {
  ffmpeg(['-i', p(`photos/detoure/${g.slug}.png`), '-c:v', 'libwebp', '-quality', '84', '-pix_fmt', 'yuva420p', p(photo.cutout(g))]);
  // Fond blanc : la photo d'origine, centrée dans chaque format
  const pads = { '1x1': [512, 512], '4x3': [683, 512], '16x9': [910, 512] };
  for (const [ratio, [w, h]] of Object.entries(pads)) {
    ffmpeg(['-i', p(`photos/${g.slug}.png`), '-vf', `pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:white,format=yuvj420p`, '-q:v', '2', p(photo.jpg(g, ratio))]);
  }
  console.log(`✔ ${g.name}`);
}
ffmpeg(['-i', p('photos/collection.png'), '-vf', 'scale=1200:-2:flags=lanczos', '-c:v', 'libwebp', '-quality', '80', p(photo.collection)]);
console.log(`✔ ${photo.collection}`);
