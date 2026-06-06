import type { Env } from '../_lib/types';
import { html, statusPage } from '../_lib/util';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = new URL(request.url).searchParams.get('token') ?? '';

  if (!token) {
    return html(
      statusPage(env.SITE_URL, 'Invalid link', 'This unsubscribe link is missing its token.'),
      400
    );
  }

  const row = await env.DB.prepare(
    'SELECT id FROM subscribers WHERE unsubscribe_token = ?'
  )
    .bind(token)
    .first<{ id: number }>();

  if (!row) {
    return html(
      statusPage(env.SITE_URL, 'Link not found', 'This unsubscribe link is invalid or has expired.'),
      404
    );
  }

  await env.DB.prepare(
    `UPDATE subscribers
       SET status = 'unsubscribed', unsubscribed_at = datetime('now')
     WHERE id = ?`
  )
    .bind(row.id)
    .run();

  return html(
    statusPage(
      env.SITE_URL,
      'Unsubscribed',
      'You have been removed from the list. You can resubscribe anytime from the site.'
    )
  );
};
