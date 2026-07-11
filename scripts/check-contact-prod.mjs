// Checks whether the deployed site can actually send the Contact + Guidance
// forms: fetches the prod JS bundles and verifies the Web3Forms access key was
// baked in at build time (Vite inlines VITE_WEB3FORMS_KEY as a string literal).
// Without it, ContactService shows the confirmation but silently sends nothing.
//
// Run: bun scripts/check-contact-prod.mjs [prod-url]

const BASE = (process.argv[2] ?? 'https://oddwavestudio.maxime-moodz.workers.dev').replace(/\/$/, '');
const UUID_RE = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/;

async function text(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  return res.text();
}

const html = await text(`${BASE}/contact`);
const entryChunks = [...html.matchAll(/\/assets\/[\w-]+\.js/g)].map((m) => m[0]);
if (entryChunks.length === 0) throw new Error('No JS chunks found in the prod HTML.');

// Walk entry chunks + the chunks they import, looking for the ContactService code.
const seen = new Set();
const queue = [...new Set(entryChunks)];
let serviceChunk = null;
while (queue.length > 0 && !serviceChunk) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const js = await text(`${BASE}${path}`);
  if (js.includes('api.web3forms.com')) {
    serviceChunk = { path, js };
    break;
  }
  for (const m of js.matchAll(/assets\/[\w-]+\.js/g)) queue.push(`/${m[0]}`);
}

if (!serviceChunk) {
  console.error(`FAIL  ContactService (api.web3forms.com) not found in any bundle of ${BASE}. Is this the right URL / a current deploy?`);
  process.exit(1);
}

const hasKey = UUID_RE.test(serviceChunk.js);
if (hasKey) {
  console.log(`PASS  ${BASE}${serviceChunk.path} contains a Web3Forms access key. Forms will really send.`);
  console.log('      Final check: submit the form once on the live site and confirm the email arrives in the pro inbox.');
  process.exit(0);
} else {
  console.error(`FAIL  ${BASE}${serviceChunk.path} has NO access key (VITE_WEB3FORMS_KEY was empty at build time).`);
  console.error('      Prod behavior: the form shows the confirmation but nothing is sent.');
  console.error('      Fix: set VITE_WEB3FORMS_KEY in the build environment (see docs/deploy.md), rebuild, redeploy, rerun this script.');
  process.exit(1);
}
