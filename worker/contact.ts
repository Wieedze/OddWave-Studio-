// POST /api/contact — receives the Contact + Guidance form submissions and
// sends two emails through the Cloudflare Email Service Workers binding
// (env.EMAIL, declared as `send_email` in wrangler.jsonc — no API token):
//   1. the demande, to the studio inbox (CONTACT_TO)
//   2. a branded confirmation, back to the visitor (arbitrary recipients need
//      the Workers Paid plan — active since 2026-08-07)
// Mounted by worker/index.ts. The only configuration is two variables on the
// Worker (Settings → Variables and Secrets):
//   CONTACT_FROM — sender address on the onboarded domain (e.g. noreply@oddwavestudio.com)
//   CONTACT_TO   — the studio inbox (where demandes land)
//
// This file is compiled by wrangler (esbuild), not by the app's tsc (tsconfig
// only includes src/), so it deliberately avoids @cloudflare/workers-types.

interface OutgoingEmail {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export interface EmailBinding {
  send(message: OutgoingEmail): Promise<unknown>;
}

export interface ContactEnv {
  EMAIL: EmailBinding;
  CONTACT_FROM: string;
  CONTACT_TO: string;
}

interface ContactBody {
  name?: string;
  email?: string;
  project?: string;
  need?: string;
  formule?: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Brand palette, hardcoded because mail clients only honor inline styles and
// the worker bundle stays independent from src/ (values = design-system
// tokens: ink.900/.800/.600, copper.400/.300, paper.base/.warm).
const BG = '#0E0F12';
const CARD = '#1C1D22';
const BORDER = '#34353C';
const COPPER = '#C85733';
const COPPER_SOFT = '#E18A5E';
const PAPER = '#F4F0E8';
const PAPER_WARM = '#ECE7DD';
const MUTED = '#6F6A61';
const FONT = 'Arial,Helvetica,sans-serif';

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Per-service hero banners: email-sized derivatives of the Services page
// panel images, generated into public/assets/mail/ (1200x420). Keys match the
// Contact "besoin" chips; any formule (Guidance) maps to accompagnement.
const MAIL_ASSETS = 'https://oddwavestudio.com/assets/mail';
const NEED_HEROES: Record<string, string> = {
  Mastering: 'mastering',
  'Stem Mastering': 'stem-mastering',
  Mixage: 'mixage',
  Accompagnement: 'accompagnement',
  'Sound design': 'sound-design',
};

function heroFor(need?: string, formule?: string): { src: string; alt: string } {
  const key = formule ? 'accompagnement' : need ? (NEED_HEROES[need] ?? 'default') : 'default';
  const label = formule ? 'Accompagnement' : (need ?? 'OddWave Studio');
  return { src: `${MAIL_ASSETS}/${key}.jpg`, alt: label };
}

/** Branded shell shared by both emails: wordmark, copper rule, service hero
 * photo, card with the logo watermark, footer. The watermark background is
 * ignored by Outlook desktop, which simply keeps the flat card color. */
function emailShell(
  hero: { src: string; alt: string },
  cardHtml: string,
  footerHtml: string,
): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
        <tr><td style="padding:0 8px 16px;font-family:${FONT};font-size:13px;font-weight:bold;letter-spacing:4px;color:${PAPER}">ODDWAVE STUDIO</td></tr>
        <tr><td style="height:2px;background:${COPPER};font-size:0;line-height:0">&nbsp;</td></tr>
        <tr><td style="background:${CARD};border:1px solid ${BORDER};padding:0">
          <img src="${hero.src}" alt="${escapeHtml(hero.alt)}" width="600" style="display:block;width:100%;height:auto;border:0"/>
          <div style="padding:28px;background:${CARD} url('https://oddwavestudio.com/mail-watermark.png') no-repeat right bottom">${cardHtml}</div>
        </td></tr>
        <tr><td style="padding:16px 8px;font-family:${FONT};font-size:12px;color:${MUTED}">${footerHtml}</td></tr>
      </table>
    </td></tr>
  </table>`;
}

function messageBlock(content: string): string {
  return `<div style="padding:16px 18px;background:${BG};border-left:3px solid ${COPPER};font-family:${FONT};font-size:15px;line-height:1.6;color:${PAPER_WARM};white-space:pre-wrap">${escapeHtml(
    content,
  )}</div>`;
}

const SITE_LINK = `<a href="https://oddwavestudio.com" style="color:${COPPER_SOFT};text-decoration:none">oddwavestudio.com</a>`;

export async function handleContactPost(context: {
  request: Request;
  env: ContactEnv;
}): Promise<Response> {
  const { request, env } = context;

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return json({ success: false, error: 'invalid-json' }, 400);
  }

  // Single-line fields are flattened so crafted input can never smuggle CRLF
  // into the mail subject or headers.
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();
  const name = oneLine(body.name ?? '');
  const email = (body.email ?? '').trim();
  const project = (body.project ?? '').trim();
  const need = body.need ? oneLine(body.need) : undefined;
  const formule = body.formule ? oneLine(body.formule) : undefined;

  if (!name || !email || !project) return json({ success: false, error: 'missing-fields' }, 400);
  if (!EMAIL_RE.test(email)) return json({ success: false, error: 'invalid-email' }, 400);

  if (!env.EMAIL || !env.CONTACT_FROM || !env.CONTACT_TO) {
    return json({ success: false, error: 'mailer-not-configured' }, 500);
  }

  const subject = formule
    ? `Demande d'accompagnement — ${formule}`
    : need
      ? `Contact — ${need}`
      : 'Nouvelle demande — OddWave Studio';

  const rows = [
    ['Nom', name],
    ['Email', email],
    need ? ['Besoin', need] : null,
    formule ? ['Formule', formule] : null,
  ].filter(Boolean) as [string, string][];

  const demandeText = [
    ...rows.map(([k, v]) => `${k} : ${v}`),
    '',
    'Message :',
    project,
    '',
    'Répondre directement à ' + email,
  ].join('\n');

  const hero = heroFor(need, formule);

  const demandeHtml = emailShell(
    hero,
    `<p style="margin:0 0 6px;font-family:${FONT};font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:${COPPER_SOFT}">Nouvelle demande</p>
      <p style="margin:0 0 20px;font-family:${FONT};font-size:24px;font-weight:bold;line-height:1.2;letter-spacing:1px;text-transform:uppercase;color:${PAPER}">${escapeHtml(subject)}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:3px 16px 3px 0;font-family:${FONT};font-size:14px;color:${COPPER_SOFT}">${escapeHtml(
                k,
              )}</td><td style="padding:3px 0;font-family:${FONT};font-size:14px;color:${PAPER}">${escapeHtml(v)}</td></tr>`,
          )
          .join('')}
      </table>
      ${messageBlock(project)}
      <p style="margin:24px 0 0"><a href="mailto:${escapeHtml(
        email,
      )}" style="display:inline-block;padding:12px 24px;background:${COPPER};color:${BG};font-family:${FONT};font-size:14px;font-weight:bold;text-decoration:none;border-radius:999px">R&eacute;pondre &agrave; ${escapeHtml(
        name,
      )}</a></p>`,
    `Re&ccedil;u via le formulaire de ${SITE_LINK}`,
  );

  // Display name so inboxes show "OddWave Studio" instead of "noreply".
  const from = `OddWave Studio <${env.CONTACT_FROM}>`;

  try {
    await env.EMAIL.send({
      to: env.CONTACT_TO,
      from,
      subject,
      text: demandeText,
      html: demandeHtml,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return json({ success: false, error: 'send-failed', detail }, 502);
  }

  // Confirmation back to the visitor, in the site's own voice (Contact page
  // copy: "Réponse sous 48h", "on revient vers vous très vite", "À bientôt sur
  // OddWave"). Best effort: the demande is already in the studio inbox, a
  // bounced confirmation must not fail the submission.
  const confirmationText = [
    `Bonjour ${name},`,
    '',
    "Merci ! J'ai bien reçu votre demande et je reviens vers vous très vite.",
    '',
    'Votre message :',
    project,
    '',
    'À bientôt.',
    'OddWave Studio',
    'https://oddwavestudio.com · Instagram : @oddwave.studio',
  ].join('\n');

  const confirmationHtml = emailShell(
    hero,
    `<p style="margin:0 0 6px;font-family:${FONT};font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:${COPPER_SOFT}">OddWave Studio</p>
      <p style="margin:0 0 20px;font-family:${FONT};font-size:24px;font-weight:bold;line-height:1.2;letter-spacing:1px;text-transform:uppercase;color:${PAPER}">Message bien re&ccedil;u.</p>
      <p style="margin:0 0 20px;font-family:${FONT};font-size:15px;line-height:1.6;color:${PAPER_WARM}">Bonjour ${escapeHtml(
        name,
      )},<br/>Merci ! J'ai bien re&ccedil;u votre demande et je reviens vers vous tr&egrave;s vite.</p>
      ${messageBlock(project)}
      <p style="margin:24px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:${PAPER}">&Agrave; bient&ocirc;t.<br/><span style="font-weight:bold">OddWave Studio</span></p>`,
    `${SITE_LINK} &middot; <a href="https://instagram.com/oddwave.studio" style="color:${COPPER_SOFT};text-decoration:none">@oddwave.studio</a><br/>Vous recevez ce message car cette adresse a &eacute;t&eacute; utilis&eacute;e sur notre formulaire de contact.`,
  );

  try {
    await env.EMAIL.send({
      to: email,
      from,
      subject: 'Votre demande est bien reçue',
      text: confirmationText,
      html: confirmationHtml,
    });
  } catch {
    // Best effort only.
  }

  return json({ success: true });
}
