/// <reference types="@cloudflare/workers-types" />

export interface Env {
  DB: D1Database;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  SES_FROM: string;
  CONTACT_TO: string;
  SITE_URL: string;
}
