// Rend les animations HyperFrames du dossier ./motion et les prépare pour le web (assets/video) :
//   - motion/hero  : défilé en boucle des 6 paires (accueil)
//   - motion/gamme : zoom sur les picots, rendu une fois par paire (fiches produit)
//   - motion/film  : film de marque de 14 s (accueil + page vidéo, balisée VideoObject)
// Chaque rendu donne un MP4 (H.264, lu partout), un WebM (VP9, plus léger) et une image fixe (poster).
// Prérequis : FFmpeg et FFprobe (commande `ffmpeg -version`).
// Usage : node tools/motion.mjs            (tout)
//         node tools/motion.mjs hero film  (seulement certains projets)
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gammes, motion } from '../src/lib.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => join(root, p);
const tmp = mkdtempSync(join(tmpdir(), 'agripatte-motion-'));
const only = process.argv.slice(2);
const want = (name) => !only.length || only.includes(name);
mkdirSync(out('assets/video'), { recursive: true });

const hf = (project, args) =>
  execFileSync('npx', ['--yes', 'hyperframes@0.9.8', 'render', ...args, '--skill', 'hyperframes', '--quiet'], { cwd: join(root, 'motion', project), stdio: 'inherit' });
const ffmpeg = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });

// Version web : taille réduite, sans piste audio, lecture progressive (faststart)
function webVersions(master, m, width, posterAt) {
  const scale = `scale=${width}:-2:flags=lanczos`;
  ffmpeg(['-i', master, '-an', '-vf', scale, '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out(m.mp4)]);
  ffmpeg(['-i', master, '-an', '-vf', scale, '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1', '-pix_fmt', 'yuv420p', out(m.webm)]);
  ffmpeg(['-ss', String(posterAt), '-i', master, '-frames:v', '1', '-vf', scale, '-q:v', '3', out(m.poster)]);
  console.log(`✔ ${m.mp4}`);
}

if (want('hero')) {
  const master = join(tmp, 'hero.mp4');
  hf('hero', ['--output', master]);
  webVersions(master, motion.defile, motion.defile.size, 0);
}

if (want('gamme')) {
  for (const g of gammes) {
    const master = join(tmp, `${g.slug}.mp4`);
    const variables = {
      slug: g.slug,
      photo: `assets/${g.slug}.png`,
      name: g.name,
      usage: g.usage,
      tint: g.tint,
      deep: g.deep,
      grip: g.grip,
      gripLabel: g.gripLabel,
      fx: g.focus[0],
      fy: g.focus[1],
    };
    hf('gamme', ['--output', master, '--variables', JSON.stringify(variables)]);
    webVersions(master, motion.gamme(g), motion.gamme(g).size, 0);
  }
}

if (want('film')) {
  const master = join(tmp, 'film.mp4');
  hf('film', ['--output', master]);
  // Poster : le gros plan sur les picots avec « ça accroche ! »
  webVersions(master, motion.film, 1280, 7.4);
}

rmSync(tmp, { recursive: true, force: true });
console.log('Terminé. Lancez `node build.mjs` pour intégrer les vidéos au site.');
