-- Freedom with AI — general contact messages (Cloudflare D1)
-- Apply: npx wrangler d1 execute fai-website-db --remote --file=./migrations/0002_contact_messages.sql
-- Separate from advisory_requests so qualified advisory leads stay clean of general inquiries.

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT,        -- speaking | events | partnership | general
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', -- new | replied | archived
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at);
