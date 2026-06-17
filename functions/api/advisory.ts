import type { Env } from '../_lib/types';
import { json, isValidEmail, isValidUrl, readBody, escapeHtml } from '../_lib/util';
import { sendEmail } from '../_lib/ses';

const STAGES = new Set(['inside', 'just_left', 'building', 'traction']);

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    return await handleAdvisoryPost(context);
  } catch (err) {
    console.error('advisory: unhandled', err);
    return json({ ok: false, error: 'Unexpected server error. Please try again later.' }, 500);
  }
};

const handleAdvisoryPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = await readBody(request);

  // Honeypot.
  if (data.company) return json({ ok: true });

  const name = data.name ?? '';
  const email = (data.email ?? '').toLowerCase();
  const stage = data.stage ?? '';
  const message = data.message ?? '';
  const link = data.link ?? '';

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!stage || !STAGES.has(stage)) errors.stage = 'Please choose what best describes you.';
  if (!message) errors.message = 'Please tell us what you want to be different.';
  if (link && !isValidUrl(link)) errors.link = 'Enter a valid link starting with http:// or https://.';

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 400);
  }

  if (!env.DB) {
    console.error('advisory: DB binding missing');
    return json({ ok: false, error: 'Server misconfigured (database). Please try again later.' }, 500);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO advisory_requests (name, email, stage, message, link)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(name, email, stage, message, link || null)
      .run();
  } catch (err) {
    console.error('advisory: D1 insert failed', err);
    return json({ ok: false, error: 'Could not save your request. Please try again later.' }, 500);
  }

  if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY || !env.AWS_REGION || !env.SES_FROM || !env.CONTACT_TO) {
    console.error('advisory: email env missing');
    return json(
      { ok: false, error: 'We saved your request but email is not configured yet. We will still see it.' },
      502
    );
  }

  // Alert the team (reply-to the requester so we can respond directly).
  try {
    await sendEmail(env, {
      to: env.CONTACT_TO,
      replyTo: email,
      subject: `New advisory request from ${name}`,
      text: `Name: ${name}
Email: ${email}
Stage: ${stage}
Link: ${link || '(none)'}

Message:
${message}`,
      html: `<h2>New advisory request</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}<br />
<strong>Email:</strong> ${escapeHtml(email)}<br />
<strong>Stage:</strong> ${escapeHtml(stage)}<br />
<strong>Link:</strong> ${link ? `<a href="${escapeHtml(link)}">${escapeHtml(link)}</a>` : '(none)'}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`,
    });
  } catch (err) {
    console.error('advisory: SES alert failed', err);
    // The request is safely stored in D1; surface a soft failure.
    return json(
      { ok: false, error: 'We saved your request but the notification failed. We will still see it.' },
      502
    );
  }

  // Auto-acknowledge the requester (best effort; do not fail the request if this bounces).
  try {
    await sendEmail(env, {
      to: email,
      subject: 'Thanks for reaching out to Freedom with AI',
      text: `Hi ${name},

Thanks for reaching out. We read every message and reply if it is a fit.

Sonia & Cammie, Freedom with AI`,
      html: `<p>Hi ${escapeHtml(name)},</p>
<p>Thanks for reaching out. We read every message and reply if it is a fit.</p>
<p>Sonia &amp; Cammie, Freedom with AI</p>`,
    });
  } catch {
    // Ignore: acknowledgement is non-critical.
  }

  return json({ ok: true, message: 'Thanks for reaching out. We read every message and reply if it is a fit.' });
};
