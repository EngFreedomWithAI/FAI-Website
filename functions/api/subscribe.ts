import type { Env } from '../_lib/types';
import { json, isValidEmail, newToken, readBody } from '../_lib/util';

interface SubscriberRow {
  status: string;
}

const DONE = { ok: true, message: "You're on the list. Thanks for subscribing!" };

/**
 * Single opt-in: add the subscriber as confirmed immediately, no confirmation email.
 * Every newsletter we send carries a one-click unsubscribe link (/api/unsubscribe),
 * which is why we still store an unsubscribe_token per subscriber.
 */
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

  try {
    const existing = await env.DB.prepare('SELECT status FROM subscribers WHERE email = ?')
      .bind(email)
      .first<SubscriberRow>();

    if (existing && existing.status === 'confirmed') {
      return json({ ok: true, message: "You're already on the list." });
    }

    if (existing) {
      // Previously unsubscribed (or stale pending): re-confirm, fresh token.
      await env.DB.prepare(
        `UPDATE subscribers
           SET status = 'confirmed', confirmed_at = datetime('now'),
               unsubscribe_token = ?, source = ?, unsubscribed_at = NULL
         WHERE email = ?`
      )
        .bind(newToken(), source, email)
        .run();
    } else {
      await env.DB.prepare(
        `INSERT INTO subscribers (email, status, source, unsubscribe_token, confirmed_at)
         VALUES (?, 'confirmed', ?, ?, datetime('now'))`
      )
        .bind(email, source, newToken())
        .run();
    }
  } catch (err) {
    console.error('subscribe: D1 write failed', err);
    return json({ ok: false, error: 'Could not add you right now. Please try again later.' }, 500);
  }

  return json(DONE);
};
