-- Freedom with AI record of which advisor an enquiry is for (Cloudflare D1)
-- Apply: npx wrangler d1 execute fai-website-db --remote --file=./migrations/0004_advisory_advisor.sql
-- Local:  npx wrangler d1 execute fai-website-db --local  --file=./migrations/0004_advisory_advisor.sql
--
-- Historical field. The current intake no longer asks visitors to select an
-- advisor, but deployed databases may already contain this nullable column.
--
-- SQLite has no ADD COLUMN IF NOT EXISTS. Running this twice is harmless: the
-- second run errors with "duplicate column name" and changes nothing.

ALTER TABLE advisory_requests ADD COLUMN advisor TEXT;
