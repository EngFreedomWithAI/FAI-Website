import { AwsClient } from 'aws4fetch';
import type { Env } from '../_lib/types';
import { json } from '../_lib/util';

/** Runtime binding check — no secrets exposed. Remove or protect once forms are stable. */
export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  let d1Ok = false;
  if (env.DB) {
    try {
      await env.DB.prepare('SELECT 1 AS ok').first();
      d1Ok = true;
    } catch (err) {
      console.error('health: D1 query failed', err);
    }
  }

  const base = {
    db: Boolean(env.DB),
    d1Ok,
    awsKey: Boolean(env.AWS_ACCESS_KEY_ID),
    awsSecret: Boolean(env.AWS_SECRET_ACCESS_KEY),
    region: env.AWS_REGION ?? null,
    from: env.SES_FROM ?? null,
    to: env.CONTACT_TO ?? null,
    siteUrl: env.SITE_URL ?? null,
  };

  // ?send=1 performs a real SES send to CONTACT_TO and returns the raw result.
  // This isolates SES from the form flow so we can see the exact AWS response.
  const url = new URL(request.url);
  if (url.searchParams.get('send') === '1') {
    const sesResult = await trySesSend(env);
    return json({ ...base, ses: sesResult });
  }

  return json(base);
};

async function trySesSend(env: Env): Promise<Record<string, unknown>> {
  try {
    const region = (env.AWS_REGION ?? '').trim();
    const client = new AwsClient({
      accessKeyId: (env.AWS_ACCESS_KEY_ID ?? '').trim(),
      secretAccessKey: (env.AWS_SECRET_ACCESS_KEY ?? '').trim(),
      service: 'ses',
      region,
      retries: 0,
    });
    const endpoint = `https://email.${region}.amazonaws.com/v2/email/outbound-emails`;
    const body = {
      FromEmailAddress: env.SES_FROM,
      Destination: { ToAddresses: [env.CONTACT_TO] },
      Content: {
        Simple: {
          Subject: { Data: 'SES health check', Charset: 'UTF-8' },
          Body: { Text: { Data: 'SES health check from /api/health', Charset: 'UTF-8' } },
        },
      },
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    let res: Response;
    try {
      res = await client.fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
    const text = await res.text();
    return { ok: res.ok, status: res.status, body: text.slice(0, 1000) };
  } catch (err) {
    return {
      ok: false,
      thrown: true,
      name: err instanceof Error ? err.name : 'unknown',
      message: err instanceof Error ? err.message : String(err),
    };
  }
}
