-- Record what the founder is working through on advisory enquiries.
-- The stage column already exists from 0001_init.sql; only focus is new.
-- Apply: npx wrangler d1 execute fai-website-db --remote --command "ALTER TABLE advisory_requests ADD COLUMN focus TEXT;"
-- Local:  npx wrangler d1 execute fai-website-db --local --file=./migrations/0006_advisory_stage_focus.sql

ALTER TABLE advisory_requests ADD COLUMN focus TEXT;
