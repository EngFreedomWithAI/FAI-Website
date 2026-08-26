# Freedom with AI website

The current Freedom with AI site is an Astro static site with Cloudflare Pages Functions. Advisory is the primary business. faibuddy and investing are secondary activities.

## Public site

- `/`: firm positioning, advisors, decision points, selected work and other activities
- `/advisory`: capabilities, advisor fit, selected work, engagement model and advisory intake
- `/contact`: investing, deal flow, speaking, partnerships and general inquiries
- `/privacy` and `/terms`: legal pages
- `/llms.txt`: concise AI-readable site index
- `/llms-full.txt`: complete canonical firm and site content for AI agents
- `/robots.txt` and `/sitemap.xml`: crawler discovery

Retired public URLs are handled in `public/_redirects`. The old pages and assets are not kept in the source tree.

## Hidden Office Hours

`/office-hours` remains available by direct link but is intentionally absent from navigation, the sitemap and both AI-readable files. It carries `noindex, nofollow`. The `/devx` short link redirects to it. Do not remove the Office Hours page, data, API, subscriber API or `FollowBand` component unless the program itself is retired.

## Source of truth

- `src/config/site.ts`: brand, navigation, profiles and global links
- `src/data/advisors.ts`: advisor positioning and credentials
- `src/data/engagements.ts`: advisory capabilities, decision points and examples
- `src/data/contact-form.ts`: advisory and contact form options
- `src/data/office-hours.ts`: hidden Office Hours sessions
- `src/styles/tokens.css`: colors, typography, spacing and layout tokens

Do not use em dashes or en dashes in site copy. Do not claim industry experience that is not supported by completed work. The firm serves founders across industries and geographies.

## Local development

Requires Node 20 or newer.

```sh
npm install
npm run dev
```

Build verification:

```sh
npm run build
git diff --check
```

## Hosting and forms

The site deploys to Cloudflare Pages. `wrangler.toml` contains the build output, D1 binding and non-secret environment values. Pages Functions live in `functions/`.

AWS SES sends form notifications and acknowledgements from the `us-east-2` region. `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` must be configured as Cloudflare Pages secrets for Production and Preview.

Database migrations live in `migrations/`. The current advisory form requires `0005_advisory_company_name.sql` in addition to the original schema. Migration `0004_advisory_advisor.sql` is retained only for databases where that historical field was already added.
