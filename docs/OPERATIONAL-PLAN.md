# Freedom with AI: Site and Operational Plan

Single source of truth for the freedomwith.ai site, content, advisory offer, and the operational and automation setup behind it. Site design is being produced in parallel; this document covers strategy, copy, architecture, and operations.

Style rule for all copy in this project: no em dashes.

---

## 1. Mission and positioning

- **Mission:** Helping corporate professionals succeed as AI entrepreneurs.
- **Tagline and arc:** Corporate to AI Entrepreneur (shown as "Corporate -> AI Entrepreneur", with the arrow treated as a leap).
- **Umbrella brand:** Freedom with AI, with four pillars: faibuddy (product), advisory, content (YouTube and writing), and events (talks, showcases, and gatherings, the live human layer).
- **Big goal:** 100M by 2032, with the four pillars feeding each other as discovery and distribution.
- **Near term engine:** content first. Content drives discovery and distribution, feeds product customer discovery, seeds events, and surfaces advisory clients.

**Content vs events.** Content is the always-on, async engine (YouTube and writing) that draws people in at scale. Events are the live, synchronous, human layer (gatherings, talks, showcases, AMAs, and later workshops as one event type) that deepens relationships and converts the right few into advisory. Workshops are no longer a separate pillar; they are one possible kind of event if and when we run them.

### Audience (ICP)
Corporate professionals on the arc from corporate to AI entrepreneur, at three stages:
1. Still inside, planning the move.
2. Just left, finding their footing.
3. Building, but stuck.
Kept sharp on corporate professionals for now. People who are not ready are routed to faibuddy and the content.

---

## 2. Brand and voice

- Independent minded, curious, early adopters, top tier on tech.
- Quality over status. Wealth as a means to freedom, not status.
- Deep connection over surface. Intention over obligation, but reliable on commitments.
- Warm, confident, a little against the current, empowering without being sappy or motivational.
- Voice is "we" for the brand (Sonia and Cammie). Advisory is delivered by Sonia, so the advisory voice is "I".

### What will not change (worldview that anchors the brand)
The premium stays on being human: connecting deeply, breaking bread together, playing together, storytelling. AI changes the work, not that. Work shifts to humans doing meta work while AI handles tactics, with small teams steering.

---

## 3. Site structure and copy (locked)

Page flow, all light themed except the footer.

```
Nav
Hero
Is this you (qualifier)
How we help (faibuddy and advisory)
Watch (YouTube, auto fed)
Why Freedom with AI
Follow along (email capture)
Work with us (contact form)
Footer (dark)
```

Cut for now: empty content placeholders, any "book a discovery call" language, and any listed prices.

### Nav
Freedom with AI · Advisory · Watch · Events · About · Contact · [Try faibuddy]

### Events (`/events`)
> Where we show up in the room. The premium stays on being human. Alongside the videos and writing, we host, speak at, and join gatherings for corporate professionals becoming AI entrepreneurs. Recaps land here as we go.

Data-driven, just like the YouTube feed: each event is an entry in `src/data/events.ts` with name, ISO date, optional time and location, role (Hosted, Co-hosted, Spoke, Attended), a short summary or recap, and an optional link. The page renders them newest first with no layout changes, and shows a graceful subscribe-first empty state when there are none. Join-the-list capture sits at the bottom of the page.

### Hero
- Display: Corporate -> AI Entrepreneur (arrow as a big leap, arc rising from Corporate to AI Entrepreneur)
- Subheading: Helping corporate professionals succeed as AI entrepreneurs.
- Support line: Stay ahead of the curve and make the leap, with AI as your leverage. Start with faibuddy today, and work with us when you want a guide.
- Primary CTA: Try faibuddy free (links to faibuddy.com)
- Secondary CTA: Work with us (links to contact)

### Is this you
> This is not for everyone. It might be for you.

> Still inside, planning your move.
> You are in a corporate role and you can feel where tech is going. You want to use AI to build something of your own before you leave.

> Just left, finding your footing.
> You made the leap. Now you want it to become a business that actually pays you, without guessing your way through it.

> Building, but stuck.
> You started, and you have hit the wall every founder hits. You want a sharper path and an honest second brain in your corner.

> Not sure yet? Start with faibuddy and our videos, and come back when you want a guide.

### How we help
> One mission, a few ways in. A product to start today, advisory when you want a guide, and content that keeps you ahead of the curve.

**Product. Use faibuddy.**
> An AI advisor that keeps you on the shortest path to paying customers. Honest feedback, in your corner, without the flattery.
> CTA: Try it free (faibuddy.com)

**Advisory. Work with me.**
> Senior advisory for corporate professionals becoming AI entrepreneurs, whether you are planning your exit, finding your footing, or pushing through the early stage of building. A small number of engagements, each shaped around you.
> CTA: Request an engagement

### Watch (auto fed)
> We share what we are learning about AI, tech, and building, as we learn it. Long form where it matters, quick where it counts.
> CTA: Subscribe on YouTube
> Below: latest videos, pulled in automatically.

### Why Freedom with AI
> We are Sonia and Cammie, two independent minded builders who love to learn, work with the latest tools, and share what we find. We believe the premium will always be on being human. Connecting deeply, breaking bread together, telling good stories. AI changes the work, not that.
> Our edge is simple. We stay ahead of the curve, we build and use this ourselves, and we love helping others do the same. We are early and intentionally small, which means direct access and a real point of view, not templated playbooks.

### Advisory section (full, on its own block or expanded from the door)
Voice is "I" (Sonia). Two paragraphs: credibility first, then who she works with and the invitation. Lead with the real track record, no testimonials needed.

> I am Sonia Sarao. I spent a decade as a product executive scaling venture-backed startups. Most recently I was VP of Product at Groove, where I helped drive the growth that led to its acquisition by Clari. Before that I built a 50-person product and engineering organization and helped grow an earlier startup 10x. In mid-2023 I delivered the exit and walked away to build on my own terms. Today I build faibuddy, an AI-native product for early founders, entirely myself. You get someone who has operated at scale, made the leap you are making, and is still in the arena building today, not someone narrating from the sidelines.

> I work with a small number of corporate professionals becoming AI entrepreneurs, whether you are planning your exit, finding your footing after leaving, or pushing through the messy early stage of building. This is high-touch, bespoke, and by invitation. Tell me where you are and what you are building, and I will reply if it is a fit.
> CTA: Request an engagement

How I work (the shape of the one partnership, no packages):
> We work weekly. Direct access between sessions. The full arc, idea to first customers. faibuddy as your co-pilot. Engagements are paid and kept deliberately few, and we work in seasons, not one-off calls.

### Follow along (email capture)
> Get our field notes and new videos as they land. No noise, just what is worth your time.
> Field: your email
> CTA: Keep me posted

### Work with us (contact)
> Tell me where you are and what you are building. I read every message and reply if it is a fit.
> Fields:
> - Name (required)
> - Email (required)
> - Which best describes you: Still inside, planning my move / Just left, finding my footing / Building, but stuck / Just exploring
> - What do you want to be different in 90 days, and why now (a few sentences). This is the real qualifier: high-agency people answer it crisply.
> - LinkedIn or what you are building (optional link)

### Final CTA
> Ready to stop commuting to someone else's dream?
> Primary: Try faibuddy free (faibuddy.com)
> Secondary: Request an engagement

### Footer (dark)
> Freedom with AI. Helping corporate professionals succeed as AI entrepreneurs.
> Explore: How we help · Advisory · Watch · Contact
> Product: faibuddy
> Connect: YouTube @FreedomWith-AI · X @FreedomWithAI · Contact
> © Freedom with AI 2026

---

## 4. Design direction

- **Style:** calm editorial with a centered spine, warmed by light indexed accents (section numbers and a slim meta rail). Not a busy two column layout.
- **Theme:** all light, warm off-white base. Footer dark as the single anchored close. No jarring dark mid page sections; use subtle tonal panels for separation instead.
- **Hero:** the arrow is the hero graphic, an arc that reads as a leap from Corporate to AI Entrepreneur. Optional subtle draw in on load.
- **Palette:** warm off-white background, near-black text, one confident accent (brand blue). Restraint signals quality.
- **Type:** one clean sans (Inter or similar), large confident headings, comfortable reading width, generous whitespace.
- **Imagery:** real and human over stock and corporate. Space for Sonia and Cammie, and for video.
- **Motion:** minimal, subtle reveal at most. Quality over flash.
- **Feeling:** sharp, clean, inviting, quality over status.

---

## 5. Advisory offer and pricing

One high-touch, bespoke advisory partnership. No packages and no fixed deliverables, because no two journeys are the same. The offer is shaped on the outside (a clear, confident container) and bespoke on the inside (the work is built around each client). Prices are never listed on the site. Price is revealed in conversation after a request, then sent as a private Stripe link or invoice.

The shape (what every partnership includes):
- **We work weekly.** A standing weekly session to set direction, make the real decisions, and keep moving.
- **Direct access between sessions** for the questions and calls that matter.
- **The full arc, idea to first customers:** validation, positioning, the build, and the path to revenue, adapted to where the client actually is.
- **faibuddy as a co-pilot** in the work, so progress continues between sessions.

Positioning:
- Invitation based and deliberately few. High touch, premium, by fit.
- We work in seasons, not one-off calls. Orient around a 3 month minimum, then continue month to month or in renewed seasons.
- Delivered by Sonia, in the "I" voice. Credibility is carried by track record, not testimonials: VP of Product at Groove (acquired by Clari), built a 50 person product and engineering org, grew an earlier startup 10x, still building faibuddy today.

Internal pricing guidance (never shown on the site):
- Premium monthly engagement, roughly 5,000 to 10,000 per month per client depending on intensity and stage.
- Target is about 20,000 to 30,000 per month at roughly 50 percent focus, which is 3 to 6 high fit clients, not a high volume practice.
- A selective founding rate may be offered to the first few clients in exchange for a candid case study, framed as a founding cohort, not a discount. Rate rises after.
- Equity, or cash plus equity, is possible for very early, high potential founders (precedent: a Rippleworks startup offered equity to retain her advice).
- Always priced as an engagement, never sold by the hour.
- One honest line on the site signals this is a paid, selective engagement, to filter out free advice seekers, without listing a number.

---

## 6. Operational architecture (managed, serverless)

Chosen path: managed and serverless to avoid server overhead now, with a documented upgrade to an owned VPS later if volume earns it.

| Concern | Home | Notes |
|---------|------|-------|
| Registrar | Namecheap | Keep as is |
| DNS | Cloudflare | Free, nameservers point here |
| Public site | Cloudflare Pages | Astro static build |
| Code and written content | GitHub repo | Markdown content collections |
| Dynamic functions | Cloudflare Pages Functions (Workers runtime) | Forms and email in v1; Stripe webhook, YouTube feed, newsletter send later. Standalone Workers only if a job outgrows Pages Functions |
| Scheduled jobs | Cloudflare Cron Triggers | Feed refresh, later rollups and social |
| App data | Cloudflare D1 | Subscribers, requests, payments, sends |
| Caching and short state | Cloudflare KV | YouTube feed cache |
| Email | AWS SES | Transactional and newsletter (existing) |
| Payments | Stripe | Private links or invoices (existing) |
| Baseline analytics | Google Analytics 4 | Standard web metrics |
| Product analytics | PostHog cloud | Funnels and events, scales easily for our volume |
| Social posting (distribution) | [Zernio](https://zernio.com/) | Unified API for X, LinkedIn, and later Instagram. We own the queue and approval; Zernio is the transport layer behind a thin Worker adapter. Account OAuth is done in Zernio, not in our repo. |
| Social and Google auth | Existing OAuth | Reuse faibuddy apps where possible |

Deferred upgrade: Hetzner VPS with local Postgres for owned, deep analytics (Umami or a first party pipeline) once traffic justifies the overhead. Not the faibuddy box, a separate small instance.

**Email sending mechanism (SES on Cloudflare).** Cloudflare Pages serves the static Astro build; it cannot run server code directly. Form handling and email send run in a serverless function: either a Cloudflare Pages Function (`/functions/api/*`) bundled with the Pages deploy, or a standalone Worker. Important constraint: the Workers runtime cannot open raw SMTP/TCP connections, so we do **not** use SES SMTP. We call the **SES v2 HTTPS API** (`SendEmail`) with AWS SigV4 signing (lightweight `aws4fetch`, or AWS SDK v3). AWS access key, secret, and region are stored as Pages/Worker secrets, never in the repo. SES domain identity (DKIM/SPF/DMARC) for freedomwith.ai must be verified and the account moved out of the SES sandbox before production sends. This works the same on the `*.pages.dev` preview and on the prod domain.

---

## 7. Data model (Cloudflare D1)

- **subscribers:** id, email, status (pending, confirmed, unsubscribed), source, created_at, unsubscribe_token
- **advisory_requests:** id, name, email, stage (inside, just_left, building, exploring), message, link, status (new, replied, engaged, declined), stripe_customer_id, stripe_subscription_id, created_at
- **payments:** id, request_id, stripe_id, cadence (monthly, milestone, one_time), amount, status, created_at. The offer is a single bespoke partnership, so there is no package enum; cadence and amount capture how each engagement is billed.
- **broadcasts_sent:** id, content_slug, sent_at, recipient_count
- **social_posts:** id, source_type (video, post, event), source_ref, platform (x, linkedin, instagram), draft_text, media_url, status (draft, approved, scheduled, posted, failed), scheduled_for, zernio_post_id, error, created_at

Analytics events live in PostHog and GA4. D1 holds only what must be owned: the list, requests, payments, send records, and the social approval queue.

---

## 8. Operational flows

### A. Visitor and analytics
1. Visitor loads a Pages route.
2. GA4 and PostHog fire, page and event data recorded.
3. Clicks to faibuddy, YouTube, and CTAs tracked as events for discovery data.

### B. Email capture
1. Visitor submits the follow along form.
2. A Worker validates and writes a pending subscriber with an unsubscribe token.
3. Worker sends a confirm email through SES.
4. On confirm click, Worker sets status to confirmed.

### C. Advisory request to engagement to payment
1. Visitor submits the request form (name, email, stage, what they are building, optional link).
2. Worker writes an advisory_requests row, alerts Sonia through SES, and auto acknowledges the requester.
3. Sonia qualifies manually and has the conversation. Stays human on purpose.
4. If a fit, Sonia agrees scope and sends a private Stripe link or invoice for the bespoke partnership, at a founding or standard rate and the agreed cadence (usually monthly).
5. Stripe processes payment and fires a webhook to a Worker.
6. Worker records a payment, sends a confirmation through SES, and Sonia sends the calendar invite manually.

No custom admin portal (Level 0). The Stripe Dashboard and hosted Customer Portal are the admin surface for everything money related: creating customers and subscriptions, sending links and invoices, dunning, refunds, and letting clients update their own card. Requests arrive by SES alert and live in D1. At this client volume, linking a checkout to a request is a one time manual paste of the request id into Stripe metadata, so no portal is built or planned for now.

Linking a payment to its request: the link is set when the checkout is created, not guessed later. Create the Stripe Customer first with metadata.request_id and the client email, then create the Checkout Session for that customer with client_reference_id and metadata.request_id both set to the advisory_requests id. On checkout.session.completed the Worker reads metadata.request_id, finds the row, and stores stripe_customer_id and stripe_subscription_id on it. Recurring invoice.paid events do not carry the request id, so the Worker looks the request up by the stored stripe_customer_id or stripe_subscription_id. Email is only a sanity check, never the key. Store processed Stripe event ids (or dedupe payments on the Stripe invoice id) for idempotency.

### D. YouTube inbound content
1. New upload on the channel.
2. A cron Worker or upload webhook refreshes the latest videos and caches them in KV.
3. The site reads the cache, so the Watch section updates with no hand editing.

### E. Written content publish
1. Sonia or Cammie writes an essay or note as a markdown file using the template, in the repo.
2. Push to GitHub, Cloudflare Pages rebuilds, the piece is live and appears in the RSS feed.

### F. Newsletter delivery (manual send)
1. After a piece is live, trigger a manual send from a private admin action.
2. A Worker wraps the piece in the HTML template and sends to confirmed subscribers through SES.
3. Worker records a broadcasts_sent row so nothing double sends.
4. Every email carries a one click unsubscribe that hits a Worker and updates D1.

### G. Social repurposing, approve then post (Phase 2, via Zernio)
Principle: create once, distribute everywhere. Ingest and drafting are automated; judgment and voice stay human.

1. A trigger fires when new content lands: a YouTube upload (flow D), a published essay or note (flow E), or a new event in `src/data/events.ts`.
2. An AI draft Worker generates per-platform variants (X, LinkedIn, later Instagram) from the source, using our brand voice prompt. Drafts are written to `social_posts` with status `draft`.
3. Sonia or Cammie reviews and approves (email-approve links to start; no custom admin portal). Status moves to `approved`, with an optional `scheduled_for`.
4. A cron Worker picks up approved posts that are due and calls Zernio through a thin distribution adapter (`POST` to Zernio with per-platform text and media URLs). We do not build or maintain native X, LinkedIn, or Instagram integrations.
5. Zernio webhooks (or polling on failure) update `social_posts` to `posted` or `failed`, storing `zernio_post_id` for traceability.

Zernio accounts (X, LinkedIn) are connected once in the Zernio dashboard. Start with a 2-week pilot on the free tier before wiring the full queue.

### H. Cross channel analytics rollup (later)
1. Scheduled Workers pull YouTube, X, LinkedIn, Stripe, and SES numbers.
2. Normalized metrics land in D1.
3. A dashboard shows the unified view. Added once there is traffic worth analyzing.

---

## 9. Domains, DNS, and email identity

- Namecheap stays the registrar, nameservers point to Cloudflare.
- freedomwith.ai resolves to Cloudflare Pages. The old GitHub redirect is retired.
- SES domain identity verified for freedomwith.ai with DKIM, SPF, and DMARC so mail lands in inboxes.
- Sends come from an address on the domain, for example hello@freedomwith.ai or soniasarao@freedomwith.ai.

---

## 10. Secrets and configuration

Stored as Cloudflare Worker secrets and environment, never in the repo:
- Stripe secret key and webhook signing secret
- SES sending credentials
- PostHog project key and GA4 measurement id
- Zernio API key (social distribution adapter)
- YouTube API key (feed ingest only)
- An admin token to protect the manual send and request views

---

## 10b. Forms and email — v1 implementation (locked)

Decided: **own the audience in our own database; email providers are swappable transports.** The subscriber list lives in Cloudflare D1 (our system of record), never inside a third-party list tool. This keeps the data portable and avoids lock-in, so the broadcast tool can be chosen later with zero migration.

- **Entry points: Cloudflare Pages Functions** (`/functions/api/*`), deployed with the Pages site. No standalone Worker in v1. Where flows B/C/F say "a Worker," v1 means a Pages Function (same Workers runtime).
  - `POST /api/subscribe` — newsletter signup. Writes a `pending` subscriber to D1 and sends a confirm email (double opt-in).
  - `GET /api/confirm?token=…` — marks the subscriber `confirmed`.
  - `GET /api/unsubscribe?token=…` — marks the subscriber `unsubscribed` (one-click, no login).
  - `POST /api/contact` — advisory request. Writes an `advisory_requests` row, emails Sonia (reply-to = requester), and auto-acknowledges the requester.
- **Data: Cloudflare D1**, binding name `DB`. Tables per section 7. Schema lives in `/migrations` and is applied with wrangler.
- **Email: AWS SES v2 HTTPS API** via `aws4fetch` (SigV4). v1 sends transactional only: subscriber confirm, advisory alert, advisory auto-ack. No SMTP (Workers cannot open SMTP/TCP).
- **Broadcast/newsletter (flow F) is deferred.** When added, it reads the `confirmed` list from D1. The broadcast sender (own-it on SES, or a managed broadcaster like Resend/Loops) is a later, reversible choice precisely because D1 is the source of truth.
- **Secrets/env** (Cloudflare Pages → Settings → Variables, set for both Production and Preview; never in repo):
  - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
  - `SES_FROM` (verified sender, e.g. `hello@freedomwith.ai`)
  - `CONTACT_TO` (where advisory alerts go, e.g. `soniasarao@freedomwith.ai`)
  - `SITE_URL` (origin used to build confirm/unsubscribe links)
  - `DB` is a D1 **binding**, not a secret.
- **Local dev:** static pages run under `astro dev` as today; the Functions + D1 run under `wrangler pages dev` with a local D1. Form endpoints only exist when served via wrangler or on a Pages deploy.

---

## 10c. Cloudflare and AWS SES setup checklist (manual, one-time)

What Sonia does in the consoles. The code is in the repo; these steps wire it to real infrastructure.

**AWS SES**
1. Pick a region (e.g. `us-east-1`) and **verify the domain identity** `freedomwith.ai`. SES gives DKIM CNAME records — add them in Cloudflare DNS, plus an SPF TXT and a DMARC TXT record.
2. **Verify the From address** (`SES_FROM`, e.g. `hello@freedomwith.ai`) and your own email for testing.
3. Create an **IAM user** (or role) with a least-privilege policy allowing `ses:SendEmail` only. Generate an **access key + secret** — these become `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`. (Not SMTP credentials; we use the API.)
4. **Request production access** to leave the SES sandbox. Until then, SES only delivers to verified recipient addresses (fine for testing).
5. Note the region for `AWS_REGION`.

**Cloudflare — done (June 6, 2026)**
1. ~~Connect domain~~ — `freedomwith.ai` on Cloudflare DNS (nameservers: `mike` + `monika.ns.cloudflare.com`). Gmail MX preserved.
2. ~~Pages custom domain~~ — `freedomwith.ai` + `www` → `fai-website.pages.dev`. Old GitHub redirect removed.
3. ~~Production env~~ — `SITE` + `SITE_URL` = `https://freedomwith.ai`, `NODE_VERSION` = `20`.
4. ~~D1 database~~ — `fai-website-db` created; `database_id` in `wrangler.toml`; migration `0001_init.sql` applied remotely.
5. ~~Deploy~~ — Pages build + Functions publish green (June 6, 2026). Live: privacy/terms, robots, sitemap, canonicals on prod domain.
6. **Confirm** — D1 binding `DB` → `fai-website-db` in Pages dashboard (Production + Preview) if not already visible under Bindings.

**AWS SES — done (June 6, 2026)**
1. ~~Verify domain identity~~ — `freedomwith.ai` verified in **us-east-2 (Ohio)** with Easy DKIM; `soniasarao@freedomwith.ai` verified for alerts/testing.
2. ~~DNS~~ — DKIM CNAMEs + SPF + DMARC in Cloudflare (Gmail MX preserved).
3. ~~IAM~~ — `fai-website-ses` user; inline policy `ses:SendEmail`/`SendRawEmail` on `arn:aws:ses:*:604443115104:identity/*`.
4. ~~Secrets~~ — `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` in Pages (Production + Preview); `AWS_REGION`/`SES_FROM`/`CONTACT_TO` in `wrangler.toml`.
5. ~~Tested~~ — `hello@freedomwith.ai` send confirmed (200 / MessageId); contact alert + auto-ack working on prod.
6. **Sandbox vs production:** confirm whether the account is out of the SES sandbox in us-east-2. If still sandboxed, only verified recipients receive mail — request production access before launch to email arbitrary subscribers.

---

## 10d. AWS SES setup walkthrough (step-by-step)

**Goal:** transactional mail from `hello@freedomwith.ai` — subscriber confirm, advisory alert to Sonia, advisory auto-ack. Region: **`us-east-2` (Ohio)** — the identities are verified in Ohio, so `AWS_REGION`, the SES endpoint, and the IAM policy ARN must all be `us-east-2`. A region mismatch causes a misleading "Email address is not verified" error.

**faibuddy already uses SES.** Do not touch the faibuddy.com identity, DNS, or IAM keys. Add freedomwith.ai as a **second** identity in the same AWS account. See **section 10e** for what stays separate vs what is shared.

### A. Open SES and verify the domain

1. Sign in to [AWS Console](https://console.aws.amazon.com/) → **Amazon SES** → switch region to **US East (Ohio) / us-east-2** (top-right) — the region the identities live in.
2. Left nav: **Configuration** → **Identities** → **Create identity**.
3. Identity type: **Domain**. Domain: `freedomwith.ai`.
4. Enable **Easy DKIM** (signing key length 2048-bit is fine).
5. Leave custom MAIL FROM off for v1 (optional later).
6. Create identity. SES shows **3 DKIM CNAME records** — keep this tab open.

### B. DNS in Cloudflare (keep Gmail receiving)

In **Cloudflare** → `freedomwith.ai` → **DNS** → **Records**:

**DKIM (from SES)** — add each CNAME SES gives you (names look like `xxxx._domainkey.freedomwith.ai` → `xxxx.dkim.amazonses.com`). Proxy status: **DNS only** (grey cloud).

**SPF** — one TXT on `@` (merge with Google if you already have Gmail MX):

```
v=spf1 include:_spf.google.com include:amazonses.com ~all
```

If no SPF record exists yet, use the line above. If you already have Google-only SPF, add `include:amazonses.com` before `~all`.

**DMARC** — TXT on `_dmarc`:

```
v=DMARC1; p=none; rua=mailto:soniasarao@freedomwith.ai; pct=100; adkim=r; aspf=r
```

Start with `p=none` (monitor only). Tighten to `quarantine`/`reject` after a few weeks of clean sending.

**Do not change** existing **MX** records (Gmail stays as-is).

Back in SES → Identities → `freedomwith.ai` — wait until **Verification status** and **DKIM** show **Verified** (often 5–30 minutes).

### C. Verify test recipients (sandbox only)

While SES is in **sandbox**, you can only send **to** verified addresses.

1. SES → Identities → **Create identity** → **Email address**.
2. Verify `soniasarao@freedomwith.ai` (and any personal inbox you will test with). Click the link in each verification email.

`hello@freedomwith.ai` does **not** need a separate email identity once the **domain** is verified — that is your `SES_FROM`.

### D. IAM user for Pages Functions (API keys, not SMTP)

**New user only** — do **not** reuse faibuddy's access keys in Cloudflare Pages. faibuddy keeps its existing IAM user and secrets wherever that app stores them.

1. IAM → **Users** → **Create user** → name e.g. `fai-website-ses` (leave faibuddy's IAM user unchanged).
2. **Do not** attach admin policies. **Create inline policy** scoped to the freedomwith.ai identity (replace `ACCOUNT_ID`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SendFromFreedomWithAiOnly",
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": "arn:aws:ses:*:604443115104:identity/*"
    }
  ]
}
```

If the scoped ARN is awkward to copy, a broader `Resource: "*"` on a **dedicated** `fai-website-ses` user is still fine — the important part is **separate keys**, not shared with faibuddy.

3. **Security credentials** → **Create access key** → use case **Application running outside AWS**.
4. Copy **Access key ID** and **Secret access key** once — these go into **Cloudflare Pages only**. Do not commit them. Do not paste them into faibuddy config.

### E. Production access (sandbox)

SES sandbox and production status are **per AWS account**, not per domain. If faibuddy already has **production access**, skip the request — just verify the `freedomwith.ai` identity and you can send (once DKIM is live).

If the account is **still in sandbox**, SES → **Account dashboard** → **Request production access**:

Suggested answers:

| Field | Value |
|-------|-------|
| Mail type | Transactional |
| Website URL | `https://freedomwith.ai` |
| Use case | Double opt-in newsletter confirmations; contact-form alerts and auto-replies for advisory inquiries |
| List hygiene | Own D1 database; no purchased lists; one-click unsubscribe on every mail |
| Bounce/complaint | Unsubscribe links; manual review via inbox |

Approval is often same-day to a few business days. Until approved, test only with verified recipient addresses.

### F. Cloudflare Pages secrets

**Workers & Pages** → **fai-website** → **Settings** → **Environment variables** — set for **Production** and **Preview**:

| Name | Type | Value |
|------|------|-------|
| `AWS_ACCESS_KEY_ID` | Secret (encrypt) | from IAM |
| `AWS_SECRET_ACCESS_KEY` | Secret (encrypt) | from IAM |
| `AWS_REGION` | Plain text | `us-east-2` |
| `SES_FROM` | Plain text | `hello@freedomwith.ai` |
| `CONTACT_TO` | Plain text | `soniasarao@freedomwith.ai` |

`SITE_URL` is already `https://freedomwith.ai`. Redeploy after adding secrets (Deployments → **Retry deployment** or push a commit).

### G. Test on production

1. **Contact** — https://freedomwith.ai/contact — submit a real request. Expect: row in D1 `advisory_requests`, alert to `CONTACT_TO`, auto-ack to requester (sandbox: requester must be a verified SES email).
2. **Subscribe** — footer or /follow band — enter email, click confirm link from inbox. Expect: `pending` → `confirmed` in D1 `subscribers`.
3. **Unsubscribe** — use link from a mail; expect `unsubscribed` in D1.

If mail fails, check **Pages** → **Functions** → real-time logs, or SES → **Suppression list** / **Account dashboard** for bounces.

### H. Checklist (tick as you go)

- [ ] SES domain `freedomwith.ai` verified (us-east-2 / Ohio)
- [ ] DKIM CNAMEs in Cloudflare (DNS only)
- [ ] SPF includes `amazonses.com` + Google
- [ ] DMARC TXT on `_dmarc`
- [ ] IAM user + access key created
- [ ] Production access requested (or sandbox test emails verified)
- [ ] Five env vars/secrets in Pages (Production + Preview)
- [ ] Redeploy + contact + subscribe tested

---

## 10e. SES separation: freedomwith.ai vs faibuddy

Two products, one AWS account is fine. Keep these **separate** so a change on the marketing site never breaks product mail (and vice versa).

| Layer | faibuddy | freedomwith.ai (this site) |
|-------|----------|----------------------------|
| **SES identity** | `faibuddy.com` (existing) | `freedomwith.ai` (add new) |
| **From address** | faibuddy's sender (e.g. `hello@faibuddy.com`) | `hello@freedomwith.ai` (`SES_FROM`) |
| **DNS / DKIM** | faibuddy.com DNS zone — **do not edit** for FAI | Cloudflare `freedomwith.ai` only |
| **IAM access keys** | faibuddy app's existing user/keys | **New** user `fai-website-ses` → Cloudflare Pages secrets |
| **Subscriber / request data** | faibuddy's database | Cloudflare D1 (`fai-website-db`) |
| **Code / deploy** | faibuddy repo / infra | this repo + Cloudflare Pages |

**Shared at the AWS account level (unavoidable):** sending quota, account sandbox/production flag, and the account suppression list. Bad bounces or complaints on either domain affect the whole account — so both products keep unsubscribe links and list hygiene.

**What to do now**

1. In SES (same region faibuddy uses, likely `us-east-1`), confirm `faibuddy.com` is listed under Identities — leave it alone.
2. **Create identity** for `freedomwith.ai` (section 10d-A).
3. Add DKIM/SPF/DMARC only in **Cloudflare** for `freedomwith.ai` — not in faibuddy DNS.
4. Create **`fai-website-ses`** IAM user + new access key; put keys in **Pages secrets only**.
5. Set `SES_FROM=hello@freedomwith.ai` — never faibuddy's from address on this site.

**Do not:** reuse faibuddy IAM keys in Cloudflare, change faibuddy SPF/DKIM, or send freedomwith.ai mail with a `@faibuddy.com` From.

---

## 11. Build and deploy

- GitHub is the source of truth for code and content.
- Push to main triggers a Cloudflare Pages build and deploy.
- Workers deploy through their own config, with secrets set in Cloudflare.
- Publishing content is a markdown push, no separate system.

---

## 12. Manual versus automated

| Task | Automated | Sonia or Cammie does |
|------|-----------|----------------------|
| Site build and deploy | Yes | Push content and code |
| Analytics capture | Yes | Read insights |
| Email capture and confirm | Yes | Nothing |
| Advisory request intake and ack | Yes | Qualify, converse, decide |
| Sending Stripe link | No | Send privately after yes |
| Payment confirmation | Yes | Send calendar invite |
| YouTube feed on site | Yes | Nothing |
| Publishing essays and notes | Push to deploy | Write the piece |
| Newsletter send | Engine automated | Trigger the send |
| Social posting | Engine automated, later | Approve each post |
| Cross channel dashboard | Yes, later | Read it |

Pattern: distribution and capture are automated, judgment and relationships stay human.

---

## 13. Compliance and trust

- One click unsubscribe on every email, handled in D1. Required, and protects SES sending reputation.
- A simple privacy policy and terms, since emails are collected and payments are processed.
- List and request data live in D1, owned and exportable any time.

---

## 13b. SEO, AIEO, and discoverability

Goal: rank in classic search **and** be the answer AI tools (ChatGPT, Claude, Perplexity, Google AI Overviews) give about going corporate-to-AI-entrepreneur. Optimize for two audiences: search crawlers and the models that summarize us.

**Done (foundations, in repo):**
- Per-page `<title>`, meta description, canonical URL, Open Graph + Twitter cards (in `Base.astro`).
- `robots.txt` (dynamic) that allows all crawlers and **explicitly welcomes AI agents** (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, CCBot) and links the sitemap.
- `sitemap.xml` (dynamic) listing all public pages, domain-aware via `Astro.site`.
- JSON-LD structured data on every page: `Organization` + `WebSite` with founders (Sonia Sarao, Cammie Clay) and socials. `Base.astro` accepts a `schema` prop for per-page additions.
- `llms.txt` (public/) — the emerging AIEO standard: a clean markdown brief of the business, the two ways in, key pages, and founders, written for AI tools to read.

**Backlog (come back to this):**
- Per-page schema via the `schema` prop: `Person` on About (Sonia, Cammie), `Event` on Events, `Article` on writing pieces, `BreadcrumbList` sitewide, `VideoObject` on Watch.
- Wire GA4 + PostHog (M5) so SEO/AIEO results are measurable; add Search Console + Bing Webmaster, submit sitemap.
- Question-led content in the Watch/writing pillar (titles as real questions the audience asks) — primary engine for both SEO and AI citations.
- Entity consistency across site, LinkedIn, YouTube, X so models confidently link the brand and founders.
- Consider `llms-full.txt` (expanded) and keep `llms.txt` in sync as pages change.
- Image `alt` text audit and the real OG image per page once the hero/brand art lands.
- Distribution (videos, posts, citations) is what actually moves rankings and AI mentions; the site is the hub the pillars feed.

---

## 13c. Build status (as of June 6, 2026, evening)

A running snapshot of what is in the repo versus what still needs doing. Keep this current.

### Done — live on https://freedomwith.ai

**Infrastructure**
- Cloudflare DNS active; domain cutover complete (no faibuddy redirect).
- Cloudflare Pages **fai-website** deployed with Functions; production build green.
- `SITE` + `SITE_URL` = `https://freedomwith.ai` in Pages env.
- D1 **fai-website-db** created, migrated (`subscribers`, `advisory_requests`), `database_id` in `wrangler.toml`.

**Site / design (in repo + on prod)**
- Homepage: two matched How we help cards, Is this you icons + routing bar, hero placeholder illustration.
- Section numbers removed site-wide (card badges 01–03 kept on audience cards).
- Responsive footer tiers; legal pages (privacy, terms); SEO (robots, sitemap, JSON-LD, llms.txt).

**Forms + email (live, tested end-to-end)**
- Pages Functions: `/api/subscribe`, `/api/confirm`, `/api/unsubscribe`, `/api/contact`; `DB` bound (Production + Preview).
- Contact + follow forms wired with loading/success/error states; writes land in D1.
- AWS SES verified in **us-east-2 (Ohio)**; `fai-website-ses` IAM user (region-agnostic `identity/*` send policy); `hello@freedomwith.ai` sending confirmed (200 / MessageId).
- Contact alert (reply-to requester) + auto-ack tested on prod.

### AWS SES — resolved gotchas (for future reference)
The 502s during setup traced to four stacked issues, fixed in order:
1. `aws4fetch` default 10 retries on a failing call → ~60s hang → generic edge 502. Fixed: `retries: 0` + 8s AbortController timeout.
2. Whitespace pasted into a credential corrupted the SigV4 Authorization header. Fixed: strip all whitespace from creds in code.
3. Access key value was wrong/missing (secret only shows once). Fixed: recreated key, re-entered both values.
4. **Region mismatch** — identities are verified in **us-east-2**, config used us-east-1 ("Email address is not verified in US-EAST-1"). Fixed: `AWS_REGION = us-east-2`, IAM policy ARN region wildcard.

### Pending (not blocking site)

- Hero image commission (~1600×800, 2:1).
- Legal review of Privacy/Terms; confirm governing-law state.
- GA4 + PostHog; per-page schema; YouTube feed; Stripe; newsletter broadcast; remaining mockup/events items.

---

## 14. Phasing

**Phase 1, the core (v1)**
- Site on Cloudflare Pages, all light, design in parallel
- YouTube feed auto fed onto the Watch section
- Email capture with confirm
- Advisory request to inbox and D1, with auto acknowledgement
- SES confirmations
- Private Stripe flow for advisory (links or invoices, sent manually)
- GA4 plus PostHog
- Markdown content with template, newsletter manual send, unsubscribe handling
- Privacy and terms pages — **done** (real content; confirm governing-law state + legal review before launch)
- SEO/AIEO foundations — **done** (robots.txt, sitemap.xml, JSON-LD, llms.txt); see section 13b for backlog

**Phase 2**
- Zernio pilot: connect X and LinkedIn, post manually via API to validate personal LinkedIn and reliability
- Social repurposing pipeline: AI draft Worker, `social_posts` queue, email-approve, Zernio distribution adapter, webhooks
- Double opt in polish and a richer private admin (only if email-approve becomes painful)

**Phase 3**
- Cross channel analytics dashboard
- Hetzner VPS migration for owned analytics if and when volume earns it

---

## 15. Locked decisions

- Stop the redirect, build the real hub on freedomwith.ai.
- Managed serverless stack, VPS deferred.
- No booking SaaS. Advisory is request, qualify, then private payment.
- Advisory billing is a monthly Stripe subscription at a bespoke per-client rate, created privately after a fit, with a 3 month minimum held contractually (not enforced in Stripe). Quarter upfront offered to those who prefer it. One-offs and equity are exceptions handled outside the subscription.
- No custom admin portal (Level 0). Stripe Dashboard and the hosted Customer Portal are the admin surface. Not revisiting other phases for this now.
- No prices on the site.
- One bespoke advisory partnership, no packages or fixed deliverables, with an optional founding cohort rate. The shape (weekly momentum, direct access, full arc, faibuddy as co-pilot) is fixed, the work inside is tailored.
- Advisory bio leads with real track record (VP of Product at Groove, acquired by Clari, 50 person org, grew an earlier startup 10x, still building faibuddy). No testimonials needed.
- Full names (Sonia Sarao, Cammie Clay) on the About founder cards and the advisory bio's first mention. First names elsewhere for warmth.
- Contact form qualifier is "What do you want to be different in 90 days, and why now". No budget question on the form.
- All light theme, dark footer only.
- Hero is the arrow as a leap, no separate emotional headline.
- Voice is "we" for the brand, "I" for advisory (Sonia).
- Plain markdown content with a template. Manual newsletter send.
- Email capture: Cloudflare D1 is the system of record for subscribers and advisory requests (we own the list, providers are swappable). Form endpoints are Cloudflare Pages Functions; transactional email is AWS SES via its HTTPS API (no SMTP). Subscribers use double opt-in. Newsletter broadcast tool is deferred and reads the D1 list when added. See sections 10b and 10c.
- Social distribution via Zernio (https://zernio.com/). We own the AI draft + approval queue in D1; Zernio is the transport layer behind a thin Worker adapter, swappable later if needed. Platforms: X and LinkedIn first, Instagram when relevant. No native platform API integrations.
- Approve first, then automate social. Email-approve for v1 of the queue; no custom admin portal unless volume demands it.
- No em dashes in any copy.

---

## 16. Open items

- Confirm SES from address and verify domain identity for freedomwith.ai.
- Confirm DNS move to Cloudflare (registrar stays Namecheap).
- Final founding cohort size (suggest 3 to 5).
- Email HTML template design.
- Privacy and terms content.
- Create Zernio account, connect X and LinkedIn, run the 2-week pilot before building the full queue.
- Confirm Zernio supports LinkedIn personal profile posting for Sonia's advisory voice (verify in pilot).
