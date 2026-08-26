-- Freedom with AI office hours signups (Cloudflare D1)
-- Apply: npx wrangler d1 execute fai-website-db --remote --file=./migrations/0003_office_hours.sql
-- Free 15-20 min 1:1s we run at events. Separate from advisory_requests so the paid
-- pipeline stays clean.
--
-- event_slug is the series (e.g. 'devx'), session_date is which occurrence of it.
-- These are recurring: DEVx is monthly, so the same person signs up again in October
-- after coming in September, and both rows have to survive.

CREATE TABLE IF NOT EXISTS office_hours_signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  event_slug TEXT NOT NULL,            -- which series, e.g. 'devx'
  session_date TEXT NOT NULL DEFAULT '', -- ISO date of the occurrence. '' when we have not published one yet.
  goal TEXT NOT NULL,                  -- what they want to walk out with
  link TEXT,
  source TEXT,                         -- utm_source, or 'direct'. Tells us whether the QR in the room worked.
  status TEXT NOT NULL DEFAULT 'new',  -- new | confirmed | met | no_show
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_office_hours_event ON office_hours_signups(event_slug);
CREATE INDEX IF NOT EXISTS idx_office_hours_date ON office_hours_signups(event_slug, session_date);
CREATE INDEX IF NOT EXISTS idx_office_hours_email ON office_hours_signups(email);
CREATE INDEX IF NOT EXISTS idx_office_hours_created ON office_hours_signups(created_at);

-- One row per person per occurrence. A second submit for the same date updates their
-- answers instead of duplicating, so the room list you read on the day stays accurate.
-- Note session_date is NOT NULL DEFAULT '' rather than nullable: SQLite treats NULLs as
-- distinct in a unique index, which would silently let duplicates through.
CREATE UNIQUE INDEX IF NOT EXISTS idx_office_hours_person
  ON office_hours_signups(event_slug, session_date, email);
