// Checks that the deployed Contact + Guidance mailer works: worker/index.ts
// must be live behind POST /api/contact (an assets-only Worker deploy answers
// 405 there).
//
// Default run is non-destructive: it sends an invalid JSON body, which a live
// function rejects with 400 `invalid-json` without emailing anyone.
// Pass --send to go end to end: it submits a clearly labeled test demande and
// the studio inbox should receive it.
//
// Run: bun scripts/check-contact-prod.mjs [prod-url] [visitor-email] [--send]
// With --send, the worker also mails a confirmation to visitor-email — pass
// your own inbox to check both emails at once.

const args = process.argv.slice(2);
const SEND = args.includes('--send');
const positional = args.filter((a) => !a.startsWith('--'));
const BASE = (positional[0] ?? 'https://oddwavestudio.com').replace(/\/$/, '');
const VISITOR = positional[1] ?? 'noreply@oddwavestudio.com';
const ENDPOINT = `${BASE}/api/contact`;

async function post(body) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  const json = await res.json().catch(() => null);
  return { status: res.status, json };
}

// Step 1 — is the function deployed at all? An invalid body proves it without
// sending anything: only the function answers 400 `invalid-json`.
const probe = await post('not-json');

if (probe.status === 405 || probe.status === 404) {
  console.error(`FAIL  POST ${ENDPOINT} → ${probe.status}: nothing behind /api/contact.`);
  console.error('      The Worker is still assets-only — worker/index.ts is not deployed.');
  console.error('      Fix: check the deploy command + wrangler.jsonc (docs/deploy.md), push, rerun.');
  process.exit(1);
}
if (probe.status !== 400 || probe.json?.error !== 'invalid-json') {
  console.error(`FAIL  POST ${ENDPOINT} → ${probe.status} ${JSON.stringify(probe.json)}: unexpected answer.`);
  process.exit(1);
}
console.log(`PASS  ${ENDPOINT} is live (function answered as expected).`);

if (!SEND) {
  console.log('      Env vars and Email Service are NOT exercised by this probe.');
  console.log('      Full end-to-end test (sends a real email to the studio inbox): add --send');
  process.exit(0);
}

// Step 2 — real send, clearly labeled so it is obvious in the inbox.
const test = await post(
  JSON.stringify({
    name: 'Test technique',
    email: VISITOR,
    project: 'Envoi de test automatique (scripts/check-contact-prod.mjs). Rien a traiter.',
    need: 'Test mailer',
  }),
);

if (test.status === 200 && test.json?.success) {
  console.log('PASS  End-to-end send accepted. Check the studio inbox for "Contact — Test mailer"');
  console.log(`      and ${VISITOR} for the visitor confirmation.`);
  process.exit(0);
}
if (test.json?.error === 'mailer-not-configured') {
  console.error('FAIL  Function live but the mailer is not wired on this Worker.');
  console.error('      Set CONTACT_FROM / CONTACT_TO (Settings → Variables) — the EMAIL binding');
  console.error('      comes from wrangler.jsonc (send_email). See docs/deploy.md.');
  process.exit(1);
}
console.error(`FAIL  Send refused: HTTP ${test.status} ${JSON.stringify(test.json)}`);
console.error('      Likely Email Service side: domain not onboarded (Compute → Email Service →');
console.error('      Email Sending) or sender address not on the onboarded domain.');
process.exit(1);
