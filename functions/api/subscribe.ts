import type { Env } from '../_lib/types';
import { json, isValidEmail, newToken, readBody } from '../_lib/util';
import { sendEmail } from '../_lib/ses';

interface SubscriberRow {
  status: string;
  unsubscribe_token: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = await readBody(request);
  const email = (data.email ?? '').toLowerCase();
  const source = data.source || 'site';

  // Honeypot: bots fill hidden fields; humans don't.
  if (data.company) return json({ ok: true });

  if (!isValidEmail(email)) {
    return json({ ok: false, error: 'Enter a valid email address.' }, 400);
  }

  if (!env.DB) {
    console.error('subscribe: DB binding missing');
    return json({ ok: false, error: 'Server misconfigured (database). Please try again later.' }, 500);
  }

  const existing = await env.DB.prepare(
    'SELECT status, unsubscribe_token FROM subscribers WHERE email = ?'
  )
    .bind(email)
    .first<SubscriberRow>();

  // Already confirmed: succeed quietly, no duplicate email.
  if (existing && existing.status === 'confirmed') {
    return json({ ok: true, message: "You're already on the list." });
  }

  let token: string;
  if (existing) {
    // pending or previously unsubscribed: reset to pending, fresh token, resend.
    token = newToken();
    await env.DB.prepare(
      `UPDATE subscribers
         SET status = 'pending', unsubscribe_token = ?, source = ?,
             unsubscribed_at = NULL
       WHERE email = ?`
    )
      .bind(token, source, email)
      .run();
  } else {
    token = newToken();
    await env.DB.prepare(
      `INSERT INTO subscribers (email, status, source, unsubscribe_token)
       VALUES (?, 'pending', ?, ?)`
    )
      .bind(email, source, token)
      .run();
  }

  const confirmUrl = `${env.SITE_URL}/api/confirm?token=${token}`;

  try {
    await sendEmail(env, {
      to: email,
      subject: 'Confirm your subscription to Freedom with AI',
      text: `Thanks for subscribing to Freedom with AI.

Please confirm your email by opening this link:
${confirmUrl}

If you did not request this, you can ignore this message.`,
      html: `<p>Thanks for subscribing to <strong>Freedom with AI</strong>.</p>
<p>Please confirm your email to start receiving field notes and new videos:</p>
<p><a href="${confirmUrl}">Confirm my subscription</a></p>
<p style="color:#52555a;font-size:14px">If you did not request this, you can ignore this message.</p>`,
    });
  } catch (err) {
    return json(
      { ok: false, error: 'We could not send the confirmation email. Please try again.' },
      502
    );
  }

  return json({ ok: true, message: 'Check your inbox to confirm your subscription.' });
};
