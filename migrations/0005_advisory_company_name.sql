-- Record the company name on advisory enquiries.
-- Apply: npx wrangler d1 execute fai-website-db --remote --file=./migrations/0005_advisory_company_name.sql
-- Local:  npx wrangler d1 execute fai-website-db --local --file=./migrations/0005_advisory_company_name.sql

ALTER TABLE advisory_requests ADD COLUMN company_name TEXT;
