# Freedom with AI: Build Spec

Implementation spec for the freedomwith.ai site. An implementing agent should be able to build from this plus the two source of truth files. Strategy, copy, architecture, and operations live in `docs/OPERATIONAL-PLAN.md`. Visual reference lives in `Websitedesign.html` and `DesignTokens.html` at the repo root (offline design exports).

Standing rules: no em dashes in any copy. Copy is provisional and not final; treat `OPERATIONAL-PLAN.md` as canonical text and flag, do not invent, copy changes.

---

## 0. How to use this spec, and build order

Build in milestones. Do not mass produce all pages before the foundation is confirmed.

1. **M1 Foundation.** Astro project scaffold, shared design token system (section 3), base layout, global styles, icon system, fonts. No page content yet.
2. **M2 Reference page.** Build Home only, fully, using only semantic tokens. Stop for review. This proves the foundation and the color swap requirement.
3. **M3 Remaining pages.** Advisory, Watch, About, Contact, plus Privacy and Terms stubs.
4. **M4 Content system.** Markdown collections for essays and notes, RSS.
5. **M5 Integrations.** Forms, capture, YouTube feed, Stripe webhook, analytics. See section 9 and the operational plan.

Acceptance gate after M1 and M2: changing the color scheme must be possible by editing one tokens file only (section 3.7).

---

## 1. Tech stack and repo structure

- **Framework:** Astro, static output.
- **Hosting:** Cloudflare Pages. DNS on Cloudflare, registrar stays Namecheap.
- **Dynamic:** Cloudflare Workers (forms, Stripe webhook, YouTube feed, newsletter send), D1 (data), KV (cache). See operational plan.
- **Email:** AWS SES. **Payments:** Stripe. **Analytics:** GA4 plus PostHog.
- **Node:** use the current LTS. Package manager: npm unless the repo already uses another.

Suggested structure:

```
src/
  styles/
    tokens.css        # single source of truth for all design tokens
    global.css        # resets, base element styles, references tokens only
  layouts/
    Base.astro        # html head, meta, fonts, analytics, header, footer slot
  components/
    Button.astro
    SectionHeader.astro   # indexed accent header (NN + title)
    Card.astro            # doors, chips
    VideoCard.astro
    CtaStrip.astro
    Form fields (Input, Select, Textarea)
    Nav.astro
    Footer.astro
  pages/
    index.astro        # Home
    advisory.astro
    watch.astro
    about.astro
    contact.astro
    privacy.astro
    terms.astro
  config/
    site.ts            # global config: brand, nav, links, socials, profiles, analytics ids
  data/
    is-this-you.ts     # the three audience cards (structured)
    how-we-help.ts     # the doors (structured)
  content/
    essays/            # markdown collection
    notes/             # markdown collection
  assets/
    images, logo, video posters (see section 5)
public/
  favicon, og images, robots, etc.
```

URLs: clean paths (`/advisory`, `/watch`, `/about`, `/contact`). The design exports use file names like `Freedom with AI - Advisory.html`; map those to clean routes.

---

## 2. Design source of truth

- `DesignTokens.html` documents: brand and logo, typography, color, surfaces and ink, accent, dark punctuation, spacing and layout, radii and shadows, motion, buttons, indexed section header, cards and doors and chips, forms, video card and steps and CTA strip, request form, icons.
- `Websitedesign.html` is the Home page realized in that system (light theme, indexed accents 01 to 04, dark footer).
- Reproduce the look from these, but implement tokens per section 3 (do not copy the per page `:root` or any hardcoded hex).

---

## 3. Design system and tokens

Two layers. Components reference only semantic tokens, never primitives or raw values. All tokens live in `src/styles/tokens.css`, imported once in `Base.astro`. Nothing hardcoded in pages or components.

### 3.1 Color primitives (raw palette, from the design)

```
--paper:        #f7f4ed;
--paper-2:      #f0ece1;
--card:         #fffdf8;
--ink:          #15181b;
--ink-2:        #52555a;
--ink-3:        #8c8f93;
--line:         rgba(21,24,27,.12);
--line-2:       rgba(21,24,27,.07);
--dark:         #0f1419;
--dark-2:       #161b22;
--dark-3:       #232a33;   /* was hardcoded in page, promote to token */
--on-dark:      #f4f6f8;
--on-dark-2:    rgba(244,246,248,.62);
--on-dark-line: rgba(255,255,255,.12);
--blue:         #1a73e8;
--blue-2:       #1557b0;
--blue-soft:    rgba(26,115,232,.10);
--blue-on-dark: #7fb0ff;   /* was hardcoded in page, promote to token */
```

### 3.2 Semantic color tokens (role based, what components use)

```
--color-bg:               var(--paper);
--color-bg-alt:           var(--paper-2);
--color-surface:          var(--card);
--color-text:             var(--ink);
--color-text-muted:       var(--ink-2);
--color-text-subtle:      var(--ink-3);
--color-border:           var(--line);
--color-border-subtle:    var(--line-2);
--color-accent:           var(--blue);
--color-accent-strong:    var(--blue-2);
--color-accent-soft:      var(--blue-soft);
--color-inverse-bg:       var(--dark);
--color-inverse-surface:  var(--dark-2);
--color-inverse-surface-2:var(--dark-3);
--color-on-inverse:       var(--on-dark);
--color-on-inverse-muted: var(--on-dark-2);
--color-on-inverse-border:var(--on-dark-line);
--color-accent-on-inverse:var(--blue-on-dark);
```

### 3.3 Typography

- Font: Inter, with system fallback `system-ui,-apple-system,sans-serif`. Mono fallback for code only.
- Self host Inter or use a single Google Fonts link with `font-display: swap`. Weights in use: 400, 500, 600, 700, 800, 900.
- Replace the ad hoc font sizes with a scale. Headings stay fluid via clamp, matching the design.

```
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--text-xs:   .75rem;
--text-sm:   .85rem;
--text-base: 1rem;
--text-md:   1.15rem;
--text-lg:   1.4rem;
--text-xl:   clamp(1.5rem, 2.4vw, 2rem);
--text-2xl:  clamp(2rem, 5vw, 3.4rem);
--text-hero: clamp(2.5rem, 7.2vw, 5.1rem);
--leading-tight: 1.1;
--leading-normal: 1.5;
--leading-relaxed: 1.65;
```

Map the design's existing clamp headings to these tokens. Body text uses `--text-base` to `--text-md` at `--leading-relaxed` within `--readw`.

### 3.4 Spacing scale

Replace loose px values with an 4px based scale. Map existing values to the nearest step.

```
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 72px;
--space-9: 96px;
```

### 3.5 Radii, shadows, motion, layout

```
--r-sm: 9px;
--r:    14px;
--r-lg: 20px;

--shadow-sm:     0 16px 32px rgba(21,24,27,.08);
--shadow-md:     0 16px 34px rgba(21,24,27,.12);
--shadow-accent: 0 6px 18px rgba(26,115,232,.22);
--ring-accent:   0 0 0 3px var(--color-accent-soft);

--dur-fast: .15s;
--dur:      .2s;
--ease:     ease;

--maxw:  1080px;
--readw: 680px;
```

### 3.6 Theme application

- Light is the default everywhere. Dark is punctuation only, applied to the footer and any CTA strip via a `.on-dark` context class that flips text and surface to the inverse and on-inverse tokens, and accents to `--color-accent-on-inverse`.
- Do not introduce jarring mid page dark sections. Use `--color-bg-alt` panels for separation.

### 3.7 How to change the color scheme (acceptance requirement)

A scheme change must be possible by editing only `tokens.css`:
- To recolor the accent, change `--blue`, `--blue-2`, `--blue-soft`, `--blue-on-dark`, or remap `--color-accent*` to a different primitive set.
- To shift the paper or ink families, change those primitives.
- Because components use only semantic tokens, no component or page edits are needed. The implementing agent must verify this by swapping the accent to a test color and confirming the whole site updates.

### 3.8 Icons

- Use a single consistent icon system. Recommended: `astro-icon` with the Lucide set (clean, MIT), or a local SVG sprite if offline control is preferred.
- Icons inherit `currentColor` so they follow text and theme tokens. No inline one off SVGs scattered in pages.
- Inventory needed at least: arrow right, arrow up right (external), play, mail, menu, chevron, social marks for YouTube and X.

### 3.9 Components to build

From the tokens page, build these as Astro components driven by tokens:
- **Button:** primary (accent fill) and secondary (outline). Hover uses `--shadow-accent` and small transform, focus uses `--ring-accent`.
- **SectionHeader:** indexed accent, a two digit number (01, 02, ...) plus label plus heading.
- **Card / Door / Chip:** surface card with border, used for the "Is this you" cards and the "How we help" doors, plus small chips like "Product, start today".
- **VideoCard:** thumbnail, title, channel line, for the Watch grid.
- **CtaStrip:** dark punctuation strip with heading and buttons.
- **Form fields:** Input, Select, Textarea, with label, focus ring, and error state.

---

## 4. Global head, SEO, analytics

- Per page title and meta description. Add Open Graph and Twitter card tags and a canonical URL (all missing in the design exports).
- Default OG image in `public/`.
- GA4 via gtag, and PostHog snippet, both in `Base.astro`, loaded with the measurement id and project key from environment, not hardcoded.
- `lang="en"`, viewport, favicon, sensible robots.

---

## 5. Asset manifest

Provide and reference:
- Logo: wordmark and standalone mark, SVG preferred, light and on dark variants.
- Favicon set and an OG share image.
- **Photos:** Sonia and Cammie together for the Home human teaser (section 6), Sonia alone for Advisory. Provide optimized web sizes.
- **Profile links (canonical):** Sonia LinkedIn https://www.linkedin.com/in/sonia-sarao/ and Cammie LinkedIn https://www.linkedin.com/in/cammieclay/ . These are personal profiles, used on About, the Home human teaser, and Sonia's on Advisory. They are distinct from the brand socials (YouTube @FreedomWith-AI, X @FreedomWithAI) shown in the footer.
- Video poster fallback for the Watch grid empty state.
All images optimized and served responsively. Use Astro image handling where possible.

---

## 6. Page specs

Canonical copy is in `OPERATIONAL-PLAN.md` section 3. Apply the review fixes below. The design exports realize Home; match that look across pages.

### Home (`/`)
Sections in order:
1. **Nav.** Logo to home, links: Advisory, Watch, About, Contact, plus a Try faibuddy button to https://faibuddy.com. Mobile menu.
2. **Hero.** The arrow as a leap, Corporate to AI Entrepreneur. Subheading is the mission line. Two CTAs: Try faibuddy free (faibuddy.com) and Request an engagement (/advisory or /contact). FIX: do not render the headline text twice. The arrow treatment is the H1 (styled, still a real `h1` for SEO). Remove the duplicate plain text "Corporate to AI Entrepreneur" line beneath it.
3. **01 Is this you.** Three cards (still inside, just left, building but stuck) plus the routing line to faibuddy.
4. **02 How we help.** Three lanes: faibuddy (Try it free), Advisory (Request an engagement, to /advisory), Content (Watch and read, to /watch).
5. **03 Watch.** Subscribe to YouTube plus latest videos. FIX: graceful empty state. If there are no videos yet, lead with the subscribe invite and do not show placeholder tiles that read as coming soon.
6. **NEW human teaser.** A short "who we are" block with Sonia and Cammie, two or three lines, linking to About. Names may link to their LinkedIn profiles (Sonia https://www.linkedin.com/in/sonia-sarao/ , Cammie https://www.linkedin.com/in/cammieclay/). This restores the human and trust beat the design lost by moving Why to About. Keep it brief, warm, not sappy.
7. **04 Follow along.** Email capture.
8. **Closing CTA (optional but recommended).** A short dark CtaStrip: Try faibuddy free, or Request an engagement.
9. **Footer.** Dark. Brand line, Explore links, Product faibuddy, Connect YouTube @FreedomWith-AI and X @FreedomWithAI and Contact. FIX: Privacy and Terms must be real links to `/privacy` and `/terms`, not plain text.

### Advisory (`/advisory`)
- Full advisory copy from the plan, in Sonia's voice: advising has been part of my work throughout my career, engagements are paid and kept deliberately few, each shaped around you, reply if it is a fit.
- Must carry the paid engagement signal so free advice seekers self filter. No prices.
- Sonia photo, with a LinkedIn link (https://www.linkedin.com/in/sonia-sarao/) as a credibility signal. Primary CTA Request an engagement to the contact form (or an embedded request form here).
- Optionally describe the shaped engagements at a high level without prices.

### Watch (`/watch`)
- Subscribe to YouTube, the auto fed video grid (latest from @FreedomWith-AI), and a reading area for essays and notes from the content collections.
- Graceful empty states for both video and writing until content exists.

### About (`/about`)
- The Why Freedom with AI content from the plan, in "we" voice, Sonia and Cammie. The human and worldview beat: premium on being human, breaking bread, storytelling, AI changes the work not that, early and intentionally small.
- Sonia and Cammie photos, each with a short bio and a LinkedIn link: Sonia https://www.linkedin.com/in/sonia-sarao/ , Cammie https://www.linkedin.com/in/cammieclay/ .

### Contact (`/contact`)
- Request form. Fields: Name (required), Email (required), Which best describes you (Still inside planning my move, Just left finding my footing, Building but stuck, Just exploring), What are you working toward (textarea), Anything to share (optional link).
- Posts to the Worker endpoint (section 9). Success and error states.

### Privacy (`/privacy`) and Terms (`/terms`)
- Simple stub pages with real content placeholders. Required because the site collects emails and will process payments.

---

## 7. Review fixes to apply (from the design review)

1. Home: add the human teaser block (Sonia and Cammie) linking to About.
2. Watch: graceful empty state, no coming soon placeholder tiles at launch.
3. Hero: remove the duplicated headline text, keep one real `h1`.
4. Footer: Privacy and Terms as real links to real pages.
5. Home: add a short closing CTA strip (recommended).

---

## 8. Content system and configuration

### Content collections
- Astro content collections: `essays` and `notes`, markdown with frontmatter (title, description, date, tags, draft, notify). Use a shared article template.
- Generate an RSS feed.
- Publishing is a markdown push that triggers a Pages rebuild. No CMS for now.

### Configuration: what is configurable, and what is not
Make the volatile and repeated things editable in one place, without over abstracting prose. This keeps copy editable later (it is not final) without turning every sentence into data.

Configure (single source, no markup edits needed to change):
- `src/config/site.ts`: brand name, tagline, nav items, all outbound links (faibuddy URL, brand socials, the LinkedIn profiles), SES from address, analytics ids, footer links. Anything referenced in more than one place lives here.
- `src/data/*`: structured repeating sections as typed arrays, the three "Is this you" cards and the "How we help" doors, so copy and order change without touching layout. The Watch video list is data fed from KV.

Keep inline (do not force into config):
- One off long form prose: the hero lines, the advisory paragraph, the About narrative. These read and edit better as markdown or directly in the component. Putting prose in JSON makes editing worse, not better.

Principle: configure what repeats, what is referenced in multiple places, or what changes often. Keep single use prose inline. That is the right amount, not too much.

---

## 9. Integrations (M5, see operational plan for full flows)

- **Email capture:** form posts to a Worker, writes a pending subscriber to D1 with an unsubscribe token, sends a confirm email via SES, confirms on click.
- **Advisory request:** form posts to a Worker, writes to D1, alerts Sonia via SES, auto acknowledges the requester.
- **YouTube feed:** scheduled Worker or upload webhook refreshes latest videos into KV, the Watch page reads the cache.
- **Stripe:** payment links or invoices are sent privately and manually. A Worker verifies the Stripe webhook, records the payment, and sends a confirmation via SES. No public pricing, no checkout button on the site.
- **Unsubscribe:** one click link to a Worker that updates D1. Required.
- Secrets via environment, never in the repo.

---

## 10. Acceptance criteria (definition of done)

- All design values come from `tokens.css`. No hardcoded hex or raw font and spacing values in pages or components.
- Color scheme can be changed by editing only `tokens.css`, verified by an accent swap.
- Components are token driven and reused across pages.
- Light theme throughout, dark only on footer and optional CTA strip, no jarring mid page dark.
- Responsive from small mobile to desktop, layout capped at `--maxw`, reading measure at `--readw`.
- Accessibility: semantic landmarks, one `h1` per page, labelled form fields, visible focus states, color contrast meets WCAG AA, keyboard navigable, mobile menu accessible.
- Performance: static output, optimized images, fonts with swap, good Lighthouse scores.
- SEO: per page title and meta, Open Graph and Twitter tags, canonical, sitemap, robots.
- Analytics: GA4 and PostHog firing, key CTA clicks tracked.
- No em dashes in any rendered copy.

---

## 11. Out of scope for v1

- Social posting and the approve then post engine (X, LinkedIn, Instagram).
- Cross channel analytics dashboard.
- Hetzner VPS and owned analytics migration.
- Workshops.
- Any booking or payment to calendar automation.

These are documented in `OPERATIONAL-PLAN.md` phases 2 and 3.

---

## 12. Open items to confirm with Sonia

- Final founding cohort size.
- SES from address and verified domain identity.
- DNS move to Cloudflare timing, and the cutover from the legacy redirect (preserved at tag `legacy-redirect-site` and branch `archive/legacy-site`).
- Photos for Home and Advisory.
- Privacy and Terms content.
- Whether the advisory request form is embedded on `/advisory` or only on `/contact`.
