import type { Env } from '../_lib/types';
import { json } from '../_lib/util';

/** Runtime binding check — no secrets exposed. Remove or protect once forms are stable. */
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  let d1Ok = false;
  if (env.DB) {
    try {
      await env.DB.prepare('SELECT 1 AS ok').first();
      d1Ok = true;
    } catch (err) {
      console.error('health: D1 query failed', err);
    }
  }

  return json({
    db: Boolean(env.DB),
    d1Ok,
    awsKey: Boolean(env.AWS_ACCESS_KEY_ID),
    awsSecret: Boolean(env.AWS_SECRET_ACCESS_KEY),
    region: env.AWS_REGION ?? null,
    from: env.SES_FROM ?? null,
    to: env.CONTACT_TO ?? null,
    siteUrl: env.SITE_URL ?? null,
  });
};
