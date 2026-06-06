import type { Env } from '../_lib/types';
import { html, statusPage } from '../_lib/util';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = new URL(request.url).searchParams.get('token') ?? '';

  if (!token) {
    return html(
      statusPage(env.SITE_URL, 'Invalid link', 'This confirmation link is missing its token.'),
      400
    );
  }

  const row = await env.DB.prepare(
    'SELECT id, status FROM subscribers WHERE unsubscribe_token = ?'
  )
    .bind(token)
    .first<{ id: number; status: string }>();

  if (!row) {
    return html(
      statusPage(
        env.SITE_URL,
        'Link not found',
        'This confirmation link is invalid or has expired.'
      ),
      404
    );
  }

  if (row.status !== 'confirmed') {
    await env.DB.prepare(
      `UPDATE subscribers
         SET status = 'confirmed', confirmed_at = datetime('now')
       WHERE id = ?`
    )
      .bind(row.id)
      .run();
  }

  return html(
    statusPage(
      env.SITE_URL,
      "You're in",
      'Your subscription is confirmed. We will send field notes and new videos as they land.'
    )
  );
};
