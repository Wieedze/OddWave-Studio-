// Cloudflare Pages Function — POST /api/contact
//
// Receives the Contact + Guidance form submissions and forwards them to the
// studio inbox via the Cloudflare Email Service REST API. The recipient is
// always the studio's OWN verified destination address, so sending is free on
// every plan (no Workers Paid needed) and does not count against any quota.
//
// Secrets live in the Pages project environment (Settings → Variables), never
// in the client bundle:
//   CF_ACCOUNT_ID  — Cloudflare account id
//   CF_EMAIL_TOKEN — API token with the "Email Sending" permission (encrypted)
//   CONTACT_FROM   — a sender address on the onboarded domain (e.g. noreply@oddwavestudio.com)
//   CONTACT_TO     — the studio's verified destination address (where demandes land)
//
// This file is compiled by Cloudflare, not by the app's tsc (tsconfig only
// includes src/), so it deliberately avoids @cloudflare/workers-types.

interface Env {
  CF_ACCOUNT_ID: string;
  CF_EMAIL_TOKEN: string;
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

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return json({ success: false, error: 'invalid-json' }, 400);
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const project = (body.project ?? '').trim();
  const need = body.need?.trim();
  const formule = body.formule?.trim();

  if (!name || !email || !project) return json({ success: false, error: 'missing-fields' }, 400);
  if (!EMAIL_RE.test(email)) return json({ success: false, error: 'invalid-email' }, 400);

  if (!env.CF_ACCOUNT_ID || !env.CF_EMAIL_TOKEN || !env.CONTACT_FROM || !env.CONTACT_TO) {
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

  const text = [
    ...rows.map(([k, v]) => `${k} : ${v}`),
    '',
    'Message :',
    project,
    '',
    'Répondre directement à ' + email,
  ].join('\n');

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a130d">
    <table style="border-collapse:collapse;margin-bottom:16px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:2px 14px 2px 0;color:#a0481f;font-weight:600">${escapeHtml(
              k,
            )}</td><td style="padding:2px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join('')}
    </table>
    <div style="white-space:pre-wrap;padding:14px 16px;background:#f6f0e8;border-radius:8px">${escapeHtml(
      project,
    )}</div>
    <p style="margin:16px 0 0;color:#6b6257;font-size:13px">Répondre directement à <a href="mailto:${escapeHtml(
      email,
    )}">${escapeHtml(email)}</a>.</p>
  </div>`;

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.CF_EMAIL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: env.CONTACT_TO,
        from: env.CONTACT_FROM,
        subject,
        text,
        html,
      }),
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    return json({ success: false, error: 'send-failed', status: res.status, detail }, 502);
  }

  return json({ success: true });
}
