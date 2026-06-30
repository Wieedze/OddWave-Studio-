// Build the Portfolio releases from the cover images dropped in
// public/assets/cover/. Filenames follow "ARTIST - TITLE - TYPE - WORK.ext".
// Resizes/compresses each cover to a web-friendly slug.jpg, removes the heavy
// originals, and generates src/content/portfolioReleases.ts (spotify left empty).
//
// Run:  bun scripts/build-covers.mjs

import { readdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const COVER_DIR = 'public/assets/cover';
const OUT = 'src/content/portfolioReleases.ts';
const IMG_EXT = /\.(jpe?g|png|avif|webp)$/i;
const MAX = 760; // longest side, px

const GRADS = [
  'linear-gradient(145deg,#C24E37,#5E2218)', 'linear-gradient(145deg,#2A2D34,#14151A)',
  'linear-gradient(145deg,#7C5B3A,#33241A)', 'linear-gradient(145deg,#1E3A44,#101D22)',
  'linear-gradient(145deg,#3A2E4A,#16121E)', 'linear-gradient(145deg,#A8443A,#3A1714)',
  'linear-gradient(145deg,#4A4E57,#1C1E24)', 'linear-gradient(145deg,#6E4A2E,#2A1B11)',
  'linear-gradient(145deg,#244640,#0F1D1A)', 'linear-gradient(145deg,#52384E,#1E1420)',
  'linear-gradient(145deg,#C2683A,#4A2414)', 'linear-gradient(145deg,#33363E,#16171C)',
];

function titleCase(s) {
  return s.toLowerCase().replace(/\b([a-zà-ÿ])/g, (m) => m.toUpperCase());
}
function slugify(s) {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/['’&]/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const files = readdirSync(COVER_DIR).filter((f) => IMG_EXT.test(f));
const releases = [];
const used = new Set();
let i = 0;

for (const file of files) {
  const base = file.replace(IMG_EXT, '');
  const parts = base.split(' - ').map((p) => p.trim());
  if (parts.length < 2) {
    console.warn('SKIP (cannot parse):', file);
    continue;
  }
  const artist = parts[0];
  const title = parts[1];
  const type = parts[2] ?? '';
  const work = parts.slice(3).join(' - ') || type;
  const tag = titleCase(work || type).replace(/\bAnd\b/g, '&');

  let slug = slugify(`${artist}-${title}`);
  while (used.has(slug)) slug = `${slug}-${++i}`;
  used.add(slug);
  const outName = `${slug}.jpg`;
  const inPath = join(COVER_DIR, file);
  const outPath = join(COVER_DIR, outName);

  try {
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', inPath,
      '-vf', `scale='min(${MAX},iw)':-2`, '-q:v', '3', outPath], { stdio: 'pipe' });
  } catch (e) {
    console.warn('RESIZE FAILED, keeping skip:', file, String(e).slice(0, 120));
    continue;
  }

  releases.push({
    title, artist, tag,
    type: titleCase(type),
    art: GRADS[releases.length % GRADS.length],
    image: `/assets/cover/${outName}`,
  });
}

// remove the heavy originals + any non-slug leftovers + the zip
for (const f of readdirSync(COVER_DIR)) {
  if (f.endsWith('.zip') || (IMG_EXT.test(f) && !/^[a-z0-9-]+\.jpg$/.test(f))) {
    rmSync(join(COVER_DIR, f));
  }
}

releases.sort((a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title));

const body = releases
  .map((r) => `  { title: ${JSON.stringify(r.title)}, artist: ${JSON.stringify(r.artist)}, tag: ${JSON.stringify(r.tag)}, type: ${JSON.stringify(r.type)}, art: ${JSON.stringify(r.art)}, image: ${JSON.stringify(r.image)}, spotify: '' },`)
  .join('\n');

const ts = `// Portfolio releases — generated from the cover images by scripts/build-covers.mjs.
// Each entry: a real OddWave release. Fill \`spotify\` with the track/album URL
// (or run the Spotify search step). \`art\` is the gradient fallback.
import type { SynthCover } from './portfolioSynth';

export const RELEASES: readonly SynthCover[] = [
${body}
];
`;

writeFileSync(OUT, ts);
console.log(`Wrote ${OUT} with ${releases.length} releases.`);
console.log(`Optimized covers in ${COVER_DIR}, removed originals + zip.`);
