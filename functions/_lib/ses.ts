import { AwsClient } from 'aws4fetch';
import type { Env } from './types';

export interface EmailMessage {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string | string[];
}

const asArray = (v: string | string[]): string[] => (Array.isArray(v) ? v : [v]);

/**
 * Send a transactional email through the AWS SES v2 HTTPS API (SigV4 signed).
 * No SMTP: the Workers runtime cannot open raw TCP, so we POST to the REST API.
 */
// AWS access key IDs and secrets never contain whitespace, so strip ALL of it.
// This guards against a stray space/newline pasted into the dashboard, which
// corrupts the SigV4 Authorization header ("Invalid key=value pair...").
const clean = (v: string): string => (v ?? '').replace(/\s+/g, '');

export async function sendEmail(env: Env, msg: EmailMessage): Promise<void> {
  const region = clean(env.AWS_REGION);
  // The SES host is email.{region}.amazonaws.com but the SigV4 service name is "ses",
  // so set both explicitly — otherwise aws4fetch infers service "email" and SES rejects (403).
  // retries: 0 so a rejected request fails fast instead of backing off ~10x and timing out.
  const client = new AwsClient({
    accessKeyId: clean(env.AWS_ACCESS_KEY_ID),
    secretAccessKey: clean(env.AWS_SECRET_ACCESS_KEY),
    service: 'ses',
    region,
    retries: 0,
  });

  const endpoint = `https://email.${region}.amazonaws.com/v2/email/outbound-emails`;

  const body = {
    FromEmailAddress: env.SES_FROM,
    Destination: { ToAddresses: asArray(msg.to) },
    ...(msg.replyTo ? { ReplyToAddresses: asArray(msg.replyTo) } : {}),
    Content: {
      Simple: {
        Subject: { Data: msg.subject, Charset: 'UTF-8' },
        Body: {
          Text: { Data: msg.text, Charset: 'UTF-8' },
          ...(msg.html ? { Html: { Data: msg.html, Charset: 'UTF-8' } } : {}),
        },
      },
    },
  };

  // Hard timeout so a slow/hanging SES call can never block the Pages Function.
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

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`SES send failed (${res.status}): ${detail}`);
  }
}
