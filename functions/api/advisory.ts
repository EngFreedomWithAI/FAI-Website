import type { Env } from '../_lib/types';
import { json, isValidEmail, isValidWebUrl, normalizeUrl, readBody, escapeHtml } from '../_lib/util';
import { sendEmail } from '../_lib/ses';

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
  const companyName = data.company_name ?? '';
  const message = data.message ?? '';
  // The browser normalizes too, but this endpoint is reachable directly, so it cannot
  // trust that it happened.
  const link = normalizeUrl(data.link ?? '');

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!message) errors.message = 'Please tell us what decision you are facing.';
  if (link && !isValidWebUrl(link)) errors.link = 'That does not look like a web address.';

  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 400);
  }

  if (!env.DB) {
    console.error('advisory: DB binding missing');
    return json({ ok: false, error: 'Server misconfigured (database). Please try again later.' }, 500);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO advisory_requests (name, email, company_name, message, link)
       VALUES (?, ?, ?, ?, ?)`
    )
      .bind(name, email, companyName || null, message, link || null)
      .run();
  } catch (err) {
    // Keep the form available during the deployment window for the new column.
    console.error('advisory: insert with company name failed, retrying without it', err);
    try {
      await env.DB.prepare(
        `INSERT INTO advisory_requests (name, email, message, link)
         VALUES (?, ?, ?, ?)`
      )
        .bind(name, email, message, link || null)
        .run();
    } catch (fallbackErr) {
      console.error('advisory: D1 insert failed', fallbackErr);
      return json({ ok: false, error: 'Could not save your request. Please try again later.' }, 500);
    }
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
      subject: `Advisory enquiry from ${name}`,
      text: `Name: ${name}
Email: ${email}
Company: ${companyName || '(not provided)'}
Link: ${link || '(none)'}

Message:
${message}`,
      html: `<h2>New advisory enquiry</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}<br />
<strong>Email:</strong> ${escapeHtml(email)}<br />
<strong>Company:</strong> ${companyName ? escapeHtml(companyName) : '(not provided)'}<br />
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

Thanks for getting in touch. We read these ourselves and will reply within a few days.

Sonia & Cammie, Freedom with AI`,
      html: `<p>Hi ${escapeHtml(name)},</p>
<p>Thanks for getting in touch. We read these ourselves and will reply within a few days.</p>
<p>Sonia &amp; Cammie, Freedom with AI</p>`,
    });
  } catch {
    // Ignore: acknowledgement is non-critical.
  }

  return json({
    ok: true,
    message: 'Thanks for getting in touch. We will reply within a few days.',
  });
};
