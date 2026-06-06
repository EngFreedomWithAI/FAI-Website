-- Freedom with AI — initial schema (Cloudflare D1)
-- Apply: npx wrangler d1 execute fai-website-db --remote --file=./migrations/0001_init.sql

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | confirmed | unsubscribed
  source TEXT,
  unsubscribe_token TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  confirmed_at TEXT,
  unsubscribed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_subscribers_token ON subscribers(unsubscribe_token);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

CREATE TABLE IF NOT EXISTS advisory_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  stage TEXT,        -- inside | just_left | building | exploring
  message TEXT NOT NULL,
  link TEXT,
  status TEXT NOT NULL DEFAULT 'new', -- new | replied | engaged | declined
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_requests_created ON advisory_requests(created_at);
