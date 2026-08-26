# Sprint 24 — Requirements Gap Analysis (Fresh-Eyes vs Intended Positioning)

- **Role**: research-gap-analysis (TASK-553)
- **Date**: 2026-08-26
- **Consumed**: `sprint-24-first-impression-review.md` (human lens, TASK-551) and
  `sprint-24-machine-review.md` (machine/robot/LLM lens, TASK-552)
- **Compared against**: `ORIGIN-WHITEPAPER.md` (vision + phases + Matrix mapping),
  `sprint-13-product-flow.md` (clarified product model, core loop, locked decisions D1–D4,
  product sign-off Q1–Q10), `sprint-8-origin-copy.md` (approved copy: Origin-as-product /
  JoinOrigin-as-brand), `sprint-11-seo-content-engine.md` (SEO taxonomy + content model),
  and the current source of the live site (validated at `apps/web/**`, `packages/i18n/**`)
- **Consumer**: Sprint 25, Story C — Brand-Alignment Updates (this report is written so
  Story C can be scoped **directly into tasks**)
- **Status**: Design/research report only — zero implementation files edited by this role

---

## 1. Executive Summary

**Verdict: The live site is broadly faithful to the intended positioning — the
"social collaboration network / community OS / Origin-as-product / JoinOrigin-as-brand /
Matrix room" model is present and mostly correct — but there is a cluster of
**brand-alignment divergences** between what the site *communicates* and what the product
*is today*, plus a set of **structured-data / metadata hygiene gaps** that degrade machine
perception of that same positioning.**

Both fresh-eyes reviews independently converged on the same core friction:

1. **The marketing surface overstates what is live.** Homepage and `/features` sell all
   eight core objects; `/docs` reveals only Phase 1 (Community Foundation) is live. A
   first-time visitor is left unsure what they can do *today*. (Human §8.1; confirmed in
   source: `features-view.tsx` lists all 8 objects, `docs` FAQ states Phase 1 live.)
2. **The CTA system is inconsistent.** Hero says "Start Project" (a Phase-2 object that is
   not live), header says "Get Started", section/footer says "Get Discovered". Three
   different asks, one of which is arguably wrong for the current product. (Human §8.3;
   confirmed: `en.json` `home.hero.startProject`, `common.getStarted`, `common.joinWaitlist`.)
3. **The join promise and the join mechanism disagree.** FAQ: "Enter your name and email,
   and your profile is ready." Actual: the CTAs are JavaScript buttons that POST to
   `/api/leads` (waitlist lead capture). No demo, no screenshots, no room preview exists on
   the marketing pages. (Human §8.4, §10.1–4; confirmed: `apps/web/app/api/leads/route.ts`.)
4. **The hero headline drifted from the approved copy.** Sprint-8 approved headline was
   `Origin brings your ideas, projects and communities into an organized collaboration space —
   so the best projects finally have a home`. The live EN headline is
   `Ideas, projects and community collaboration space — where new and existing teams find
   their Origin.` — a later user change (`2db1723`) that reads as a noun pile-up and is not
   the approved positioning statement. (Human §8.10; confirmed in `en.json` + git log.)
5. **Machine-facing brand signals have correctness gaps.** `Organization.sameAs` is an empty
   array on every page, breadcrumb JSON-LD mixes non-canonical and canonical URLs, head-level
   hreflang is inconsistent across templates, guide H1s duplicate the full `<title>`
   including the `| JoinOrigin` suffix, and the home H1 carries a trailing `|` caret
   artifact. (Machine §3–§11; all confirmed in source below.)
6. **The network's life is invisible and its numbers are unverifiable.** "2,400+ builders",
   unnamed "trusted teams" logos, stock-looking avatars, no member pages, no room/feed
   screenshots; and in no-JS contexts the count-up starts at 0, so a static snapshot reads
   "0+ Members". (Human §8.6–8.8, §9; confirmed: `useCountUp` initializes at `0`.)

The site's *intended* positioning is strong and mostly lands. The work needed is not a
redesign — it is **brand-alignment**: reconcile marketing copy with live behavior, unify the
naming/CTA system, and clean the structured-data layer so machines describe the product the
same way humans are meant to understand it.

---

## 2. Method

1. Read both fresh-eyes reviews (human lens TASK-551; machine lens TASK-552).
2. Read the requirements: `ORIGIN-WHITEPAPER.md`, `sprint-13-product-flow.md`,
   `sprint-8-origin-copy.md`, `sprint-11-seo-content-engine.md` (referenced by Sprint-13 D3),
   plus current source for live-state validation.
3. For every material finding in both reviews, validated it against the current source:
   `packages/i18n/locales/en.json`, `apps/web/app/**`, `apps/web/components/**`,
   `apps/web/lib/seo/**`. Confirmed findings are marked **✓ verified**; items that are
   partial or already fixed are marked **Δ partial / done**; infra-only items are marked
   **⟳ deferred** (out of Story C scope).
4. Classified each divergence: **copy / metadata / structured data / navigation / page
   inventory / trust & live-status**.
5. Prioritized P0 (blocking brand-alignment), P1 (high-value, cheap), P2 (hygiene/polish).
6. Wrote Sprint-25 Story C scoping tasks (§9) that map 1:1 to concrete fixes.

---

## 3. Alignment Scorecard (what already matches intent)

| Intended requirement | Live site | Status |
|---|---|---|
| Origin-as-product / JoinOrigin-as-brand naming (Sprint-8 §1) | Explained on home definition, /docs lead, /about FAQ | ✓ aligned (needs prominence, see G-3) |
| "Social collaboration network / community OS" category anchors (Sprint-8 §1 rule 3) | In home definition, /features lead, /community lead, docs | ✓ aligned |
| Eight core objects incl. Ideas (Sprint-8 §2.6, Sprint-13 §3) | /features + /docs list all 8 | ✓ aligned |
| Core loop Discover → Public page → Join → Room (Sprint-13 §2) | Guides re-centered on publish→room→join-link model; "room" terminology pinned | ✓ aligned (guide content) |
| Comparison table vs Slack/Discord/WhatsApp/etc. (Sprint-4, /features) | Present on /features | ✓ aligned |
| Honest framing: no local offices, no local events (Sprint-13 §1.2, Q4) | City pages + guides state honestly | ✓ aligned (best surprise) |
| Remove self-host/hosting messaging from public copy (Sprint-13 §6.2, Q9) | No self-host claims in public copy (only privacy analytics "self-hosted Plausible" — an internal ops fact, acceptable) | ✓ done |
| No money language (Sprint 5 rule, Sprint-8 §3) | No pricing/business model anywhere | ✓ aligned (by design) |
| AGPL-3.0 / Matrix / E2EE / portability narrative (whitepaper) | Home, /features FAQ, /docs, /community | ✓ aligned |
| FAQ coverage with direct answers ≤60 words (Sprint-8 §3) | Home/features/community/docs/city/guide FAQs | ✓ aligned |
| llms.txt present + well-formed (Sprint-4 §8) | `/llms.txt` 2.7 KB, grouped, linked to 30+ pages | ✓ aligned (self-discovery gap, G-16) |
| sitemap.xml complete, canonical, full hreflang alternates | 897 URLs, 2,770 hreflang links | ✓ aligned (head hreflang gap, G-12) |

---

## 4. Prioritized Divergence Register

Priority = impact on brand alignment × cost to fix. **P0** must be scoped into Story C.
**P1** should be scoped into Story C (or a near sibling). **P2** is hygiene for a follow-up
polish pass. **⟳** is infrastructure/deployment — out of Story C's copy/metadata scope,
flagged for the owning track.

| ID | Area | Priority | Finding | Source lens | Verified? |
|----|------|----------|---------|-------------|-----------|
| G-1 | Trust & live-status | **P0** | Marketing sells all 8 core objects but only Phase 1 is live; nothing on home//features says Projects/Companies are later | Human §8.1 | ✓ |
| G-2 | Copy / CTA | **P0** | CTA system inconsistent: "Start Project" / "Get Started" / "Get Discovered"; hero CTA points at non-live Phase-2 object | Human §8.3 | ✓ |
| G-3 | Copy / naming | **P0** | Two-name system (Origin vs JoinOrigin) costs comprehension; explanation is buried mid-page | Human §8.2 | ✓ |
| G-4 | Copy / trust | **P0** | Join promise vs mechanism mismatch: FAQ says "profile is ready"; reality is waitlist lead capture | Human §8.4, §10.1 | ✓ |
| G-5 | Trust / UX | **P0** | Count-up renders "0+ Members" / "0 Places and Communities 484" in no-JS/SSR — worst trust signal | Human §8.8, §9 | ✓ |
| G-6 | Copy / headline | **P0** | Hero headline drifted from approved Sprint-8 copy; noun pile-up; trailing `|` artifact in H1 | Human §8.10; Machine §3 | ✓ |
| G-7 | Structured data | **P0** | `Organization.sameAs` empty array on every page (weak entity signal, unfinished-template look) | Machine §4.1 | ✓ |
| G-8 | Structured data | **P1** | Breadcrumb JSON-LD mixes non-canonical (`/`, `/location`) and canonical (`/en/...`) URLs | Machine §4.2 | ✓ |
| G-9 | Copy / metadata | **P1** | Guide H1 duplicates full `<title>` including `| JoinOrigin` suffix; hub cards show the suffix as clutter | Machine §3; Human §6.3 | ✓ |
| G-10 | Metadata | **P1** | Head-level hreflang inconsistent across templates: 2–3 locales (home/location/features/community), 22 (guides), 0 (city pages) | Machine §11 | ✓ |
| G-11 | Navigation / page inventory | **P1** | All homepage/community "Example communities" chips resolve to Copenhagen deep URLs for a default visitor; no visible label of what the chip means or why that city | Human §6.1, §8.9 | Δ partial (geo resolver exists — see G-11 notes) |
| G-12 | Structured data | **P2** | FAQPage JSON-LD missing on /location and /guides hubs (inconsistent rich-result eligibility) | Machine §4.3 | ✓ |
| G-13 | Structured data | **P2** | No `City`/`Place` + `GeoCoordinates` schema on city pages | Machine §4.4 | ✓ |
| G-14 | Metadata | **P2** | `lastmod` stale/coarse (2026-08-10/14 across whole groups); flat 897-URL sitemap growing | Machine §5 | ✓ |
| G-15 | Accessibility / crawl | **P2** | CTAs are `<button>` with no `href` — conversion path invisible to crawlers | Machine §7 | ✓ |
| G-16 | LLM-readability | **P2** | `llms.txt` not linked from any HTML page (discovery relies on convention); no `llms-full.txt` | Machine §8 | ✓ |
| G-17 | Copy / polish | **P2** | Stray `&#x27;` HTML entities in meta descriptions; trailing `|` on home H1 (also G-6) | Machine §3 | ✓ |
| G-18 | Trust | **P2** | Trust data unverifiable: unnamed logo marquee, stock avatars, "2,400+" without context | Human §8.6 | ✓ |
| G-19 | Navigation / i18n | **P2** | 23-language switcher with no signal whether all content is genuinely translated | Human §8.12 | ✓ |
| G-20 | Copy / polish | **P2** | "Pee-wee Leagues" as a recurring example reads as an inside joke (approved copy, but worth a tone check) | Human §8.11 | ✓ (approved — decision needed) |
| G-21 | Copy / live-status | **P2** | FAQ answer "They develop naturally…" reads as evasive about timeline; needs companion roadmap labeling | Human §6.4, §8.1 | ✓ |
| G-22 | Infra | ⟳ | Security headers missing (HSTS/CSP/XCTO/XFO), `x-powered-by: Next.js` exposed | Machine §12 | ⟳ infra |
| G-23 | Infra | ⟳ | HTML never edge-cached (`private, no-cache, no-store`), JS payload ~700 KB gzipped (largest chunk 819 KB) | Machine §9 | ⟳ infra |
| G-24 | Infra | ⟳ | Root + non-locale URLs 307; `www` NXDOMAIN; no social profile URLs anywhere | Machine §10, §6 | ⟳ infra/DNS + G-7 |

---

## 5. Detailed Findings — Copy & Brand Alignment (P0)

### G-1 — Marketing overstates what is live

**Reviews:** Human §8.1 (top pain point), §10.3: *"A visitor who skips /docs will over-estimate
how much of the product exists."* Homepage and /features present all 8 core objects with equal
weight; only /docs reveals the phased reality (Phase 1 live; Projects Phase 2; Companies
Phase 3).

**Intent:** The whitepaper's phases (P1 Community Foundation → P2 Collaboration → P3
Organization) and Sprint-13 §3.1 are explicit that Companies and Opportunities are "brand
promises" on /features today and their screens arrive later. The intent is **not** to hide
the roadmap — Sprint-8 §2.6 Q4 approved the honest "develop naturally" answer. The divergence
is that **the "what's live now" signal lives only on /docs**, which the core marketing pages
never link to with that framing.

**Fix (Story C):**
- Add a **"Live now" vs "On the roadmap"** badge/label to the core-object cards on
  `/features` (Profiles, Ideas, Communities, Communication, Feed = live; Projects = Phase 2;
  Companies/Opportunities = later phases). Reuses the roadmap data already rendered below.
- Add one line to the homepage definition area or trust section: *"Phase 1 is live today:
  profiles, communities, chat, and the social graph. Projects and companies grow out of the
  network over time."* (concrete copy in §8.1).
- Keep the approved FAQ answer ("develop naturally") but pair it with the visible badges so
  it stops reading as evasive (G-21).

### G-2 — CTA system inconsistency

**Reviews:** Human §8.3: hero "Start Project" vs header "Get Started" vs sections/footer
"Get Discovered"; "Start Project is arguably wrong for a Phase-1 product."
Machine §7: CTAs are buttons with no `href`, so crawlers cannot follow the funnel (G-15).

**Intent:** The product is in early access with a waitlist join flow (Sprint-8 §2.4 Q3:
"the waitlist reserves your spot"; `en.json` `waitlist.*`). "Start Project" contradicts
Phase 1 (projects are Phase 2, whitepaper). The approved convention uses one clear join CTA.

**Fix (Story C):**
- Rename hero CTA from `Start Project` to `Get Started` (the header label) — **one primary
  CTA label across hero/header/sections**. Keep "Get Discovered" only as the section/footer
  waitlist band label, or unify it too (recommendation: unify on `Get Started`; keep
  `Get Discovered` in the CtaBand as the band's own headline, not a competing primary ask).
- All three CTAs should open the same waitlist flow (they already do — same
  WaitlistModalProvider). The divergence is purely label semantics.
- File targets: `en.json` `home.hero.startProject` → `common.getStarted`; `HeroLeft.tsx`
  label source; `CtaBand.tsx`; `HomeView` trust/section CTAs.

### G-3 — Origin vs JoinOrigin naming prominence

**Reviews:** Human §8.2: two-name system costs comprehension on first contact; explanation is
buried mid-page. The site does explain it (docs lead, home definition) — the issue is
**prominence**, not presence.

**Intent:** Sprint-8 §1 convention is explicit and correct: Origin = product,
JoinOrigin = brand/network. The positioning convention is intended to be instantly legible.

**Fix (Story C):**
- Surface the naming rule in the **hero supporting line** (already partly does) or as a
  one-line eyebrow above the definition: *"Origin is the product. JoinOrigin is the brand and
  network behind it."*
- Ensure **every** marketing page's first product reference uses "Origin" with the brand
  introduced once; audit `en.json` for stray "JoinOrigin is a…" product claims (the SEO
  titles intentionally keep "JoinOrigin — Social Collaboration Network & Community OS" per
  Sprint-8 §2.13 — keep titles, fix visible body copy).
- Add the convention to the footer tagline area (`Where teams find their origin.`) as a
  subtle secondary line so it is discoverable on every page.

### G-4 — Join promise vs mechanism mismatch

**Reviews:** Human §8.4, §10.1: FAQ promises "Enter your name and email, and your profile is
ready"; actual CTAs are JS waitlist buttons POSTing to `/api/leads`. No demo/screenshots of
the app anywhere; unclear whether the visitor gets an account today or a waitlist spot.

**Intent:** The product is in **early access**; joining is waitlist lead capture
(`apps/web/app/api/leads/route.ts` — "waitlist capture (spec §9.3)"). The FAQ copy overpromises
an immediate profile that the live flow does not deliver.

**Fix (Story C):**
- Rewrite the "How do I join?" / "Is Origin live?" FAQ answers to be honest about the
  waitlist: *"Enter your name and email to reserve your spot. You'll get early access as it
  opens — your community is ready the moment you're in."* (concrete copy in §8.2).
- Optionally add a **"What you get when early access opens"** section or a small product
  preview (screenshots of profile/room/feed) on the homepage or /features to close the
  "network's life is invisible" gap (G-18 companion). If screenshots are not available yet,
  ship the honest copy now and add previews in a later sprint.

### G-5 — Count-up static render "0+ Members"

**Reviews:** Human §8.8, §9: homepage and /community show "0+ Members"; /location shows
"0 Places and Communities 484" in no-JS/static contexts because count-up animations start at 0.

**Intent:** The network stat is "2,400+ builders" (approved copy, `trustCopy`). A social
network page rendering **zero** members is the worst possible trust signal.

**Fix (Story C / code):**
- SSR-render the **final value** (2,400+) and animate from it on client mount, or render the
  target with the animation applied only client-side (e.g., `useCountUp` initialized with
  `target` instead of `0`, or a `<noscript>`/static fallback with the final value). Files:
  `components/useCountUp.ts`, `components/CountUpStat.tsx`, `components/OrbitViz.tsx`,
  `components/menuPagePrimitives.ts` stat host.

### G-6 — Hero headline drift + H1 artifacts

**Reviews:** Human §8.10: "the hero sentence is grammatically serviceable but not memorable;
'Ideas, projects and community collaboration space' is a noun pile-up." Machine §3: home H1
carries a trailing `|` (the typewriter caret) and the `/es` home has the same artifact.

**Intent:** Sprint-8 §2.1 **approved verbatim** headline:
`Origin brings your ideas, projects and communities into an organized collaboration space —
so the best projects finally have a home` (131 chars, two-tone split at 127, accent `home`).
The live EN headline (`Ideas, projects and community collaboration space — where new and
existing teams find their Origin.`) was introduced by commit `2db1723` after Sprint-8 and was
**not** re-approved against the positioning convention (it omits the "Origin brings…"
subject-verb structure that makes the approved copy a promise).

**Fix (Story C):**
- **Restore the approved Sprint-8 headline** (or formally re-approve a variant that follows
  the same "Origin brings … so … finally have a home" promise structure). Update
  `en.json` `home.hero.headline` + `headlineAccent` and all 21 locales' key parity.
- Remove the trailing `|` from the H1 text node: the caret is decorative — keep it visually
  but exclude it from crawler-visible text (wrap in `aria-hidden` is already done, but it is
  still in the DOM text; move the caret outside the `<h1>` or render it via CSS
  `::after`/pseudo so the H1 text is clean). Files: `components/TypewriterHeading.tsx`.

---

## 6. Detailed Findings — Structured Data & Metadata (P0/P1)

### G-7 — `Organization.sameAs` empty (P0)

**Reviews:** Machine §4.1: `"sameAs": []` on every page signals no linked social profiles.

**Verified:** `apps/web/lib/seo/jsonLd.ts` `organization()` hardcodes `sameAs: []` with a
comment that profiles are "not provisioned yet."

**Fix (Story C):** Populate with the real social profile URLs (X/GitHub/LinkedIn/YouTube if
they exist) — **or** omit the empty property until profiles exist. Populating is strictly
better (knowledge-graph entity enrichment, `rel="me"` discovery). Owner must confirm actual
profile URLs; if none exist, change to omit.

### G-8 — Breadcrumb JSON-LD mixed URLs (P1)

**Reviews:** Machine §4.2: city page breadcrumbs use non-canonical `/`, `/location`,
`/location/united-states` for items 1–4 and canonical `/en/...` for item 5.

**Verified:** `breadcrumbList()` in `jsonLd.ts` builds items from `absoluteUrl(item.path)`;
`locationView.ts` `breadcrumbsFor()` passes `'/'` for home and `localePathForEn(...) ?? ...`
for ancestors, which yields non-locale URLs for ancestors on most pages.

**Fix (Story C):** Normalize every breadcrumb item to the canonical `/en/...` URL for the
active locale (or use the same locale-prefixed path the canonical tag uses). Single helper:
`breadcrumbList` should accept canonicalized paths. Files: `jsonLd.ts`, `locationView.ts`.

### G-9 — Guide H1 duplicates `<title>` with `| JoinOrigin` (P1)

**Reviews:** Machine §3: sample guide H1 is the full title including `| JoinOrigin`; Human
§6.3: guide hub card titles carry the SEO suffix as UI clutter.

**Verified:** Guide content `title` includes `| JoinOrigin`
(`apps/web/lib/seo/content/en/guide/start-a-community.ts`), and `guide-view.tsx` renders
`content.title ?? entry.title` as the visible H1; hub cards render `entry.title`.

**Fix (Story C):** Separate **document title** (keeps `| JoinOrigin`) from **visible H1**
(drops the suffix). Add a `heading`/`h1` field to guide content (or strip the suffix at
render). Files: `lib/seo/content/**/guide/*.ts` (21 locales × 12 guides — generator or
content-model change), `apps/web/app/guides/[slug]/guide-view.tsx`, `guides-hub-view.tsx`.

### G-10 — Head-level hreflang inconsistency (P1)

**Reviews:** Machine §11: sitemap declares 22 hreflang alternates per URL; HTML `<head>`
varies (2–3 on home/location/features/community, 22 on guides, 0 on city pages).

**Verified:** `locationView.ts` `languagesFor()` only emits a cluster when committed
translations exist (EN-only pages carry no cluster); `guides.ts` emits full clusters. The
sitemap is complete, so this is not fatal — but it is internally inconsistent.

**Fix (Story C):** Emit the full hreflang cluster in `<head>` for every indexable template
(city pages included), matching the sitemap's `xhtml:link` set. Files: metadata builders in
`lib/seo/locationView.ts`, `lib/seo/metadata.ts`, guides metadata.

---

## 7. Detailed Findings — Navigation, Page Inventory & Trust (P1/P2)

### G-11 — Example-community chips → Copenhagen deep URLs (P1)

**Reviews:** Human §6.1, §8.9: all seven homepage/community chips link to Copenhagen deep
URLs (`/en/location/denmark/capital-region/copenhagen/...`), which feels like placeholder
scaffolding to a visitor outside Copenhagen.

**Verified (partial):** A geo-aware resolver exists (`lib/seo/exampleCommunities.ts`,
Story B/E work): per-chip group-type variant pages of the **closest-largest content-rich
city**. The reviewer observed Copenhagen because their locale/geo resolution landed on
Copenhagen (Denmark is a content-rich set) — for other geos it may resolve to a local city.
So this is **working as designed**, but:
- The chips give the visitor **no label** about what was resolved (e.g., "Startup Founders"
with no "in Copenhagen" hint), so a visitor in another country sees a Denmark URL and reads
it as scaffolding.
- The only content-rich city outside the approved Tier-2 slice is Copenhagen
(`EXTRA_CONTENT_RICH_CITY_SLUGS = ['copenhagen']`), so many visitors resolve to Copenhagen.

**Fix (Story C):**
- Add a visible label/caption to the chips row: *"Example communities — showing the largest
  active community near you"* and include the resolved city in the chip text or a tooltip.
- Consider promoting more content-rich cities or a neutral fallback ("or start your own")
  so the default experience does not read as Copenhagen-specific.
- Files: `components/ChipMarquee*.tsx`, `lib/seo/exampleCommunities.ts`, locale keys.

### G-12 — FAQPage JSON-LD missing on /location + /guides hubs (P2)

**Verified:** `faqPage()` is mounted on pages with visible FAQ blocks; /location and /guides
hubs have no FAQPage even though the homepage FAQ is relevant there.

**Fix (Story C):** Add FAQPage JSON-LD to /location and /guides hubs (or move the hub FAQ into
the visible page and mirror it). Files: `lib/seo/locationView.ts` (hub metadata),
`guides/page.tsx` metadata.

### G-13 — No `City`/`Place` + `GeoCoordinates` schema on city pages (P2)

**Verified:** City pages carry BreadcrumbList + FAQPage only; no geo schema despite unique
"City facts" content.

**Fix (Story C):** Add `City`/`Place` + `GeoCoordinates` + `sameAs`(optional) JSON-LD to city
pages. Data already exists in the location snapshot (lat/lng in `locationData.ts`).
Files: `lib/seo/jsonLd.ts` (new builder), `lib/seo/locationView.ts`.

### G-14 — `lastmod` stale + sitemap scale (P2)

**Verified:** `sitemap.ts` uses deterministic `SITE_RELEASE_DATE`/`GUIDES_RELEASE_DATE`
constants — coarse and stale by design; 897 URLs flat.

**Fix (Story C):** Per-URL lastmod from content change data (guides/cities have authored
dates) or remove `lastmod` where it cannot be maintained; split a sitemap index as the
directory grows. Files: `sitemap.ts`, `lib/seo/**` date sources.

### G-15 — CTAs not crawlable (P2)

**Verified:** `login-button`, `get-started-button`, `start-project-button`,
`footer-waitlist-button` are `<button>` without `href`.

**Fix (Story C):** Give the CTAs real `href`s — at minimum a `#waitlist`/`#join` anchor on the
same page, ideally a `/signup` or `/en/signup` route (even if it currently renders the
waitlist modal) so crawlers can follow the funnel. Files: `Header.tsx`, `HeroLeft.tsx`,
`CtaBand.tsx`, new route if needed.

### G-16 — `llms.txt` not self-discoverable from HTML (P2)

**Verified:** No `<link rel="llms.txt">` and no footer link; `llms-full.txt` 404.

**Fix (Story C):** Add `<link rel="llms.txt" href="/llms.txt">` in the root layout or a
footer link; generate `llms-full.txt` (full-text variant) as a companion. Files: `layout.tsx`,
`lib/seo/llms.ts`, `app/llms-full.txt/route.ts`.

### G-17 — H1/description artifacts (P2)

**Verified:** `TypewriterHeading` trailing `|` (also G-6); `&#x27;` in `/en/features` meta
description (source stores pre-encoded apostrophes).

**Fix (Story C):** Clean H1 text node (G-6); use standard entities (`'`/`&#39;`) in metadata
strings. Files: `TypewriterHeading.tsx`, `lib/seo/routes.ts` + page.tsx metadata wrappers.

### G-18 — Trust data unverifiable (P2)

**Reviews:** Human §8.6: "2,400+ builders", unnamed "trusted teams" logos, stock avatars.

**Fix (Story C):** Either name the logo-marquee partners or remove the marquee; add a
credibility qualifier ("2,400+ builders on the waitlist" or "2,400+ builders collaborating"
already says collaborating — pick one and make it checkable); add real member/community
profiles when the product has them. Minimal Story C fix: label the marquee as illustrative
or remove it; keep the count with an honest qualifier.

### G-19 — Language switcher breadth without coverage signal (P2)

**Reviews:** Human §8.12: 23 languages raises translation-completeness questions.

**Fix (Story C):** Add a small "translated / partial / EN fallback" indicator in the switcher
or a one-line note, and ensure the switcher only lists locales with committed content (or
clearly marks fallback). Files: `components/LanguageSwitcher*`, locale metadata.

### G-20 — "Pee-wee Leagues" tone (P2, decision)

**Reviews:** Human §8.11: recurring quirky example reads as an inside joke.

**Intent:** This is **approved copy** (Sprint-8 §2.5/§2.6 example list includes Pee-wee
Leagues deliberately to signal "any idea"). Recommendation: keep the list but consider
rotating the ordering or adding a more universally-recognized example ("a parent group, a
fantasy league, a neighborhood initiative") in the same spirit. PM decision needed — flagged
not mandated.

### G-21 — "They develop naturally" FAQ reads evasive (P2)

**Reviews:** Human §6.4: combined with the roadmap, the FAQ answer reads as dodging the
timeline.

**Fix (Story C):** Pair the approved answer with a concrete roadmap reference (link to
`/docs#roadmap` and the "Live now" badges from G-1). No need to change the approved wording —
just anchor it to visible live/roadmap signals.

---

## 8. Concrete Copy Drafts (for Story C to apply verbatim)

### 8.1 Homepage — live-status line (G-1)

Add under the definition paragraph (or in the trust section):

> **Live today:** profiles, communities, chat rooms, and the social graph — the Phase 1
> foundation, already used by 2,400+ builders. Projects and companies grow out of the network
> over time.

### 8.2 Home FAQ — honest join mechanism (G-4)

Replace `home.faq.q5.answer` ("Click Get Started and get discovered. Enter your name and
email, and your profile is ready…") with:

> Enter your name and email to reserve your spot. Early access opens in waves — we'll email
> you the moment it's your turn, and your profile and community are ready when you're in.

And adjust `home.faq.q4.answer` ("Is Origin live?") to lead with the phased truth:

> Yes — Origin is live and growing. Phase 1 (profiles, communities, chat, and the social
> graph) is live today; projects and companies grow out of the network over time. Click Get
> Started to reserve your spot.

### 8.3 CTA label unification (G-2)

- Hero + header + sections: **Get Started** (single primary label).
- CtaBand headline stays **Get Discovered** as the band's own promise line, with the button
  reading **Get Started**.
- Files: `en.json` (`home.hero.startProject`, `common.getStarted`, `common.joinWaitlist`),
  `HeroLeft.tsx`, `Header.tsx`, `CtaBand.tsx`.

### 8.4 Naming eyebrow (G-3)

Add above the homepage definition:

> **Origin** is the product — the community OS. **JoinOrigin** is the brand and network
> behind it.

---

## 9. Sprint 25 (Story C — Brand-Alignment Updates) Task Scoping

Each row is a scoped task. Labels: `copy` / `metadata` / `structured-data` / `navigation` /
`page-inventory` / `code` (UI mechanics).

| Task | Gap | Type | Concrete change | Files |
|------|-----|------|-----------------|-------|
| C-1 | G-6 | copy | Restore approved hero headline + accent; clean caret from H1 text node (move caret out of `<h1>` or CSS `::after`) | `en.json` + 21 locales, `TypewriterHeading.tsx` |
| C-2 | G-2 | copy | Unify primary CTA labels on **Get Started**; keep CtaBand headline "Get Discovered" | `en.json`, `HeroLeft.tsx`, `Header.tsx`, `CtaBand.tsx` |
| C-3 | G-1, G-21 | copy | Add "Live today" line + roadmap badges/labels on /features core objects and homepage | `home-view.tsx`, `features-view.tsx`, `en.json` |
| C-4 | G-4 | copy | Rewrite "Is Origin live?" + "How do I join?" FAQ answers to honest waitlist framing (8.2) | `en.json` + 21 locales |
| C-5 | G-3 | copy | Add naming eyebrow (8.4) + footer secondary line; audit stray "JoinOrigin is a…" product claims in visible copy | `home-view.tsx`, `Footer.tsx`, `en.json` |
| C-6 | G-9 | copy/metadata | Split guide document title vs visible H1 (drop `\| JoinOrigin` from H1); clean hub card titles | `lib/seo/content/**/guide/*.ts`, `guides/[slug]/guide-view.tsx`, `guides-hub-view.tsx` |
| C-7 | G-7 | structured-data | Populate `Organization.sameAs` with real social URLs, or omit the empty property | `lib/seo/jsonLd.ts` + site config |
| C-8 | G-8 | structured-data | Normalize breadcrumb JSON-LD items to canonical locale-prefixed URLs | `lib/seo/jsonLd.ts`, `lib/seo/locationView.ts` |
| C-9 | G-10 | metadata | Emit full hreflang cluster in `<head>` for all indexable templates (incl. city pages) | `lib/seo/metadata.ts`, `lib/seo/locationView.ts`, `lib/seo/guides.ts` |
| C-10 | G-12, G-13 | structured-data | Add FAQPage to /location + /guides hubs; add `City`/`Place` + `GeoCoordinates` to city pages | `lib/seo/jsonLd.ts`, `lib/seo/locationView.ts`, `guides/page.tsx` |
| C-11 | G-11 | navigation/copy | Label example-community chips with resolved city + caption; review content-rich city set | `ChipMarquee*.tsx`, `lib/seo/exampleCommunities.ts`, `en.json` |
| C-12 | G-15 | navigation/code | Give waitlist CTAs real `href`s (anchor or `/signup` route) so the funnel is crawlable | `Header.tsx`, `HeroLeft.tsx`, `CtaBand.tsx`, new `/signup` route |
| C-13 | G-16 | metadata | Link `llms.txt` from HTML (`<link rel="llms.txt">` + footer); add `llms-full.txt` | `layout.tsx`, `lib/seo/llms.ts`, `app/llms-full.txt/route.ts` |
| C-14 | G-5 | code | SSR-render final count-up values; animate client-side only (no-JS shows 2,400+) | `useCountUp.ts`, `CountUpStat.tsx`, `OrbitViz.tsx`, `menuPagePrimitives.ts` |
| C-15 | G-14 | metadata | Per-URL `lastmod` from content-change data (or drop stale `lastmod`); prep sitemap index | `sitemap.ts`, `lib/seo/**` |
| C-16 | G-17 | metadata/copy | Clean trailing `|` (C-1 covers), replace `&#x27;` with standard entities in metadata | `lib/seo/routes.ts`, page.tsx wrappers |
| C-17 | G-18 | copy/navigation | Name or remove logo-marquee partners; add honest count qualifier; add product preview placeholder | `LogoMarquee` data, `home-view.tsx`, `en.json` |
| C-18 | G-19 | navigation/copy | Show translation-coverage signal in language switcher (translated vs EN-fallback) | `LanguageSwitcher*`, locale metadata |
| C-19 | G-20 | copy (decision) | PM decision on "Pee-wee Leagues" example list; adjust ordering or examples if approved | `en.json`, example lists |
| C-20 | ⟳ G-22..24 | infra (NOT Story C) | Security headers, HTML edge caching, JS payload reduction, www DNS, 301 redirect strategy — flag to infra/ops sprint | deployment/config |

---

## 10. What Is NOT a Gap (avoid churn in Story C)

- **Comparison table on /features** — aligned, keep.
- **8 core objects incl. Ideas** — aligned, keep.
- **Guide content re-centered on digital connect→join→room** — already done (Sprint 13 §6.1
  direction implemented in guide content).
- **Self-host messaging removal (Q9)** — done; do not reintroduce.
- **"Room" terminology pinning** — done in guide content; keep consistent in any new copy.
- **No money language** — by design; do not add pricing.
- **Honest no-local-offices / no-local-events framing** — aligned; keep.
- **llms.txt content quality** — aligned; only the discovery link (C-13) is missing.

---

## 11. Residual Risks / Open Decisions for PM

1. **Headline**: restore Sprint-8 approved copy vs formally re-approve the current headline?
   (G-6 — copy change is 2 files + 21 locales; the decision is PM/brand.)
2. **Social profiles**: do real `sameAs` URLs exist yet? If yes, C-7 populates; if no, C-7
   omits the empty property. (G-7)
3. **Logo marquee**: name the partners or remove the marquee? (G-18)
4. **"Pee-wee Leagues"**: keep or rotate the example list? (G-20)
5. **Infra items (G-22..24)**: confirm owning track — they are explicitly out of Story C's
   copy/metadata scope but are the machine review's lowest grades (security D, page weight C).

---

## 12. Validation Notes (evidence from source)

All source references are from the repo at `master` + `feat/research-gap-analysis` base,
2026-08-26:

- Hero headline drift: `packages/i18n/locales/en.json` `home.hero.headline`; git log
  `2db1723` ("adjust typewriter heading content on homescreen").
- CTA labels: `en.json` `home.hero.startProject` ("Start Project"), `common.getStarted`
  ("Get Started"), `common.joinWaitlist` ("Get Discovered").
- Join flow: `apps/web/app/api/leads/route.ts` ("waitlist capture (spec §9.3)");
  `WaitlistModalProvider.tsx` comments.
- Count-up SSR: `apps/web/components/useCountUp.ts` `useState(0)`.
- Guide H1 suffix: `apps/web/lib/seo/content/en/guide/start-a-community.ts` title;
  `guides/[slug]/guide-view.tsx` hero title uses `content.title`.
- `sameAs: []`: `apps/web/lib/seo/jsonLd.ts` `organization()`.
- Breadcrumb URLs: `apps/web/lib/seo/jsonLd.ts` `breadcrumbList()` +
  `apps/web/lib/seo/locationView.ts` `breadcrumbsFor()`.
- hreflang: `apps/web/lib/seo/locationView.ts` `languagesFor()` (EN-only pages no cluster),
  `apps/web/lib/seo/guides.ts` `guideLanguagesFor()` (full cluster).
- Example chips: `apps/web/lib/seo/exampleCommunities.ts` (geo resolver);
  `locationData.ts` `EXTRA_CONTENT_RICH_CITY_SLUGS = ['copenhagen']`.
- `llms.txt`: `apps/web/app/llms.txt/route.ts`; no `<link rel="llms.txt">` in layout.
- Sitemap: `apps/web/app/sitemap.ts` deterministic `lastModified` from
  `SITE_RELEASE_DATE`/`GUIDES_RELEASE_DATE`.

---

## 13. Closure

This report is the **single combined gap analysis** for Sprint 24 (TASK-553). It consumes the
human and machine fresh-eyes reviews, validates them against source, and produces a
task-ready backlog (§9) that Sprint 25 Story C can scope directly. Items marked ⟳ are
deferred to infra/ops — they are tracked here for continuity but are outside Story C's
copy/metadata/navigation scope.

**Status:** research/report only — zero implementation files edited by this role.
