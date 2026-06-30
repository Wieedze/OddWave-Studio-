// Find the Spotify link for each release in src/content/portfolioReleases.ts via
// the Spotify Web API (Client Credentials — no user login), and fill `spotify: ''`.
// Prints a confidence report so low matches can be checked by hand.
//
// Credentials (Spotify Developer dashboard → your app) go in .env.local (gitignored):
//   SPOTIFY_CLIENT_ID=...
//   SPOTIFY_CLIENT_SECRET=...
//
// Run:  bun scripts/find-spotify.mjs        (writes the links + a report)
//       bun scripts/find-spotify.mjs --dry  (report only, no file change)

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const FILE = 'src/content/portfolioReleases.ts';
const DRY = process.argv.includes('--dry');

// load .env.local
if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] ??= m[2];
  }
}
const ID = process.env.SPOTIFY_CLIENT_ID;
const SECRET = process.env.SPOTIFY_CLIENT_SECRET;
if (!ID || !SECRET) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local');
  process.exit(1);
}

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

async function token() {
  const basic = Buffer.from(`${ID}:${SECRET}`).toString('base64');
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  const j = await r.json();
  if (!j.access_token) throw new Error('auth failed: ' + JSON.stringify(j));
  return j.access_token;
}

async function search(tok, artist, title, type) {
  const q = `${artist} ${title}`;
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=album,track&limit=6&market=FR`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } });
  const d = await r.json();
  const albums = (d.albums?.items ?? []).map((x) => ({ ...x, _kind: 'album' }));
  const tracks = (d.tracks?.items ?? []).map((x) => ({ ...x, _kind: 'track' }));
  const single = /single/i.test(type);
  const cands = single ? [...tracks, ...albums] : [...albums, ...tracks];

  const aWords = norm(artist).split(' ').filter((w) => w.length > 2);
  const tNorm = norm(title);
  const score = (c) => {
    const artistMatch = c.artists.some((a) => {
      const an = norm(a.name);
      return aWords.some((w) => an.includes(w)) || an.includes(norm(artist));
    });
    const cn = norm(c.name);
    const nameMatch = cn === tNorm || cn.includes(tNorm) || tNorm.includes(cn);
    return (artistMatch ? 2 : 0) + (nameMatch ? 1 : 0);
  };
  let best = null;
  let bestScore = -1;
  for (const c of cands) {
    const s = score(c);
    if (s > bestScore) {
      bestScore = s;
      best = c;
    }
  }
  return best ? { url: best.external_urls.spotify, kind: best._kind, name: best.name, by: best.artists.map((a) => a.name).join(', '), score: bestScore } : null;
}

const tok = await token();
const lines = readFileSync(FILE, 'utf8').split('\n');
const report = [];
let filled = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!/spotify:\s*''/.test(line)) continue;
  const title = line.match(/title:\s*"([^"]*)"/)?.[1];
  const artist = line.match(/artist:\s*"([^"]*)"/)?.[1];
  const type = line.match(/type:\s*"([^"]*)"/)?.[1] ?? '';
  if (!title || !artist) continue;
  let res = null;
  try {
    res = await search(tok, artist, title, type);
  } catch (e) {
    report.push(`! ${artist} — ${title}: ERROR ${String(e).slice(0, 80)}`);
    continue;
  }
  await new Promise((r) => setTimeout(r, 120)); // be gentle on the API
  if (res && res.score >= 2) {
    if (!DRY) lines[i] = line.replace(/spotify:\s*''/, `spotify: '${res.url}'`);
    filled++;
    const flag = res.score >= 3 ? 'ok ' : '~  ';
    report.push(`${flag} ${artist} — ${title}  ->  [${res.kind}] ${res.by} — ${res.name}  ${res.url}`);
  } else {
    report.push(`?? ${artist} — ${title}: no confident match${res ? ` (best: ${res.by} — ${res.name} ${res.url})` : ''}`);
  }
}

if (!DRY) writeFileSync(FILE, lines.join('\n'));
console.log(report.join('\n'));
console.log(`\n${filled} filled${DRY ? ' (dry run, file unchanged)' : ''}. Lines flagged "??" or "~" need a human check.`);
