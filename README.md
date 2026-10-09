# Freedom with AI website

The current Freedom with AI site is an Astro static site with Cloudflare Pages Functions. Mission: Accelerate Entrepreneurs. Build. Advise. Invest. Space is the focus for advising and investing. Sonia leads advisory, Cammie leads investing, and faibuddy sits under Build.

## Public site

- `/`: positioning, proof strip, thesis arc, the advise and invest paths, decision points and selected work
- `/advisory`: Sonia's advisory: work areas, profile, engagement model and advisory intake
- `/investing`: Cammie's investing: focus, criteria, profile and a contact link
- `/thesis`: the thesis (bits to atoms to space) and the list of long-form pieces
- `/thesis/state-of-ai-investing`: Cammie's State of AI: Investing talk, rebuilt as a page
- `/contact`: investing, introductions, speaking, partnerships and general inquiries (`?topic=investing` preselects)
- `/privacy` and `/terms`: legal pages
- `/llms.txt`: concise AI-readable site index
- `/llms-full.txt`: complete canonical firm and site content for AI agents
- `/robots.txt` and `/sitemap.xml`: crawler discovery

Retired public URLs are handled in `public/_redirects`. The old pages and assets are not kept in the source tree.

## Hidden Office Hours

`/office-hours` remains available by direct link but is intentionally absent from navigation, the sitemap and both AI-readable files. It carries `noindex, nofollow`. The `/devx` short link redirects to it. Do not remove the Office Hours page, data, API, subscriber API or `FollowBand` component unless the program itself is retired.

## Source of truth

- `src/config/site.ts`: brand, navigation, profiles and global links
- `src/data/advisors.ts`: partner positioning and credentials
- `src/data/engagements.ts`: advisory capabilities, proof strip, decision points and examples
- `src/data/thesis.ts`: arc, stack-in-space mapping, participation, investing criteria and pieces
- `src/data/state-of-ai.ts`: figures and sources from Cammie's talk
- `src/data/contact-form.ts`: advisory and contact form options
- `src/data/office-hours.ts`: hidden Office Hours sessions
- `src/styles/tokens.css`: colors, typography, spacing and layout tokens

Do not use em dashes or en dashes in site copy. Do not claim industry experience that is not supported by completed work, and do not claim aerospace engineering expertise. Do not name portfolio or client companies without permission.

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

Database migrations live in `migrations/`. The current advisory form requires `0005_advisory_company_name.sql` and `0006_advisory_stage_focus.sql` in addition to the original schema. Until 0006 runs, the API folds stage and focus into the stored message. Migration `0004_advisory_advisor.sql` is retained only for databases where that historical field was already added.
