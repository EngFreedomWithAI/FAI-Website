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
export async function sendEmail(env: Env, msg: EmailMessage): Promise<void> {
  const client = new AwsClient({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: env.AWS_REGION,
    service: 'ses',
  });

  const endpoint = `https://email.${env.AWS_REGION}.amazonaws.com/v2/email/outbound-emails`;

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

  const res = await client.fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`SES send failed (${res.status}): ${detail}`);
  }
}
