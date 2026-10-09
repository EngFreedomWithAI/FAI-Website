-- Record company stage and what the founder is working through on advisory enquiries.
-- Apply: npx wrangler d1 execute fai-website-db --remote --file=./migrations/0006_advisory_stage_focus.sql
-- Local:  npx wrangler d1 execute fai-website-db --local --file=./migrations/0006_advisory_stage_focus.sql

ALTER TABLE advisory_requests ADD COLUMN stage TEXT;
ALTER TABLE advisory_requests ADD COLUMN focus TEXT;
