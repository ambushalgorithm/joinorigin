# Test Report — Sprint 24 Wave-3 Validation Gate (TASK-574)

_Validation phase output. Filled by the e2e-origin-location role._

## Current State

Sprint 24 Wave-3 (guides "Origin Building" + location "Origins" reframe) final validation gate
(e2e-origin-location, TASK-574, branch `feat/e2e-origin-location` — test-only changes):
**web unit 110 suites / 1355 tests ALL PASS; monorepo unit 5/5 packages PASS; typecheck 5/5 PASS;
lint 5/5 PASS; lint-fix.sh clean (0 non-fixable); e2e vs prod `next start` 352/352 PASS; SEO live
sweep 49/49 PASS (8 exhaustive chunks — every advertised /sitemap.xml URL resolves 200, zero
orphans, full 21-locale hreflang, sitemap/llms carry ONLY the new Origin guide slugs).**
E2ECoverageComplete: yes. Recorded 2026-08-27.

**Validation target state:** the Wave-3 reframe as PM-approved — /guides → "Origin Building Guides"
(universalCopy Option C, cityCardBody), /location → Origins chrome + content (56 city + 38 country

- 54 region EN), 6 guide retitles + 3 slug renames with permanent redirects. All Wave-3 G0/G1
  branches are recorded merged by the orchestrator (TASK-569 `17d8a13`, TASK-570 `6c148f2`, TASK-573
  `ed984a8`, TASK-571 `0c194c7`, TASK-572 PR #5 status=merged per orchestrator status files). The e2e
  suite was executed against that final state (master + TASK-572 country/region/hubEntry content);
  the git-level master auto-merge commit for PR #5 is recorded as lagging the offline-origin sync at
  the time of this report (status files are the authoritative signal in this orchestration).

### Test changes (this gate — tests only)

- **NEW `tests/e2e/tests/origin-location.spec.ts`** — the Wave-3 gate spec (10 tests):
  - /guides hub renders "Origin Building Guides" + eyebrow "Origin building" + metadata title
    "Origin Building Guides | JoinOrigin" + universalCopy
    ("Origins are online by nature, and they can also have a local space. Find or start an Origin
    near you:") + Start-local city cards with cityCardBody
    ("Explore the local spaces and people behind Origins in {city}.").
  - Renamed guide slugs (start-a-community → start-an-origin, keep-a-community-active →
    keep-an-origin-active, hybrid-communities → hybrid-origins) permanently redirect on EN + de and
    the new slugs resolve 200 with the renamed Origin headings ("How to Start an Origin", "How to
    Keep an Origin Active & Engaged", "Hybrid Origins: …").
  - /location hub renders "Origins by City" + eyebrow "Origins by city" + presence claim
    "Find or start an Origin in your city" + hub intro (Origin type) + metadata title
    "Origins by City — Find or Start an Origin Near You | JoinOrigin" + description
    "Explore Origins by city around the world…" + directory section "Origin types" with the Origin
    group-type cards ("Startup Origins in Berlin" …) + "Places and Origins" inventory banner.
  - Berlin city page renders the "Origins in Berlin" framing.
  - No "Communities by City" / "Find or start a community" leftovers in the visible chrome of
    /en/location, /en/guides, and /en/location/germany/berlin/berlin.
- **10 existing e2e specs updated to the Wave-3 framing** (visible-chrome + URL assertions only):
  `location-pages.spec.ts`, `hub-filter.spec.ts`, `language-switcher.spec.ts`,
  `locale-routing.spec.ts` (new guide slugs + de guide canonical), `navigation.spec.ts`,
  `nav-progress.spec.ts`, `seo.spec.ts` (new slugs in sitemap/llms sets), `translate-page.spec.ts`,
  `signup.spec.ts` ("Places and Origins"), `home.spec.ts` (test title). Non-EN content trees
  (de/es/ar content files, e.g. "Finde oder gründe Communities in Berlin") intentionally untouched
  — Wave-3 reframes EN content only (TASK-571/572) + chrome (TASK-569/570).

## Gates

| Gate           | Command                                              | Result                                                  |
| -------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| Web unit       | `jest` (@joinorigin/web)                             | **110 suites / 1355 tests PASS**                        |
| Monorepo unit  | `pnpm test --force`                                  | **5/5 packages PASS** (i18n 61/61 incl.)                |
| Typecheck      | `pnpm typecheck --force`                             | **5/5 packages PASS**                                   |
| Lint           | `pnpm lint --force` + `lint-fix.sh`                  | **5/5 packages PASS; lint-fix 10 fixed, 0 non-fixable** |
| E2E (prod)     | `playwright test` vs `next start` (:3100)            | **352/352 PASS**                                        |
| SEO live sweep | `SEO_LIVE_SWEEP=1 playwright test tests/seo.spec.ts` | **49/49 PASS** (8 exhaustive chunks)                    |

## What was validated (Wave-3 guides + location Origin reframe)

**/guides hub — "Origin Building Guides":**

- H1 "Origin Building Guides", hero eyebrow "Origin building", metadata title
  "Origin Building Guides | JoinOrigin" (TASK-573 guides.ts). PASS.
- universalCopy (TASK-569 Option C verbatim): "Origins are online by nature, and they can also
  have a local space. Find or start an Origin near you:" visible on the Start-local section. PASS.
- Start-local city cards render cityCardBody "Explore the local spaces and people behind Origins
  in {city}." (Austin, Chicago…; EN-area-first 6). PASS.
- Renamed guide headings render on the hub grid AND the detail pages: "How to Start an Origin",
  "How to Keep an Origin Active & Engaged", "Hybrid Origins: How to Run In-Person + Online
  Together". PASS.

**Guide slug redirects (3 renamed slugs):**

- `/en/guides/start-a-community` → `/en/guides/start-an-origin`; `/en/guides/keep-a-community-active`
  → `/en/guides/keep-an-origin-active`; `/en/guides/hybrid-communities` → `/en/guides/hybrid-origins`
  — each permanent-redirects (status 308; Next 16 emits 308 for `permanent: true`, the
  method-preserving permanent redirect that is 301-equivalent for SEO) with the destination in the
  Location header, on the EN surface AND the non-EN `/de/**` surface. PASS.
- The new slugs resolve 200 server-side with the renamed Origin headings; a browser navigation
  from the old URL lands seamlessly on the new slug. PASS.
- All 66 redirect rules (3 slugs × 22 surfaces: unprefixed + 21 locales) live in
  `next.config.mjs redirects()` (TASK-573). PASS.

**/location hub — Origins chrome:**

- H1 + breadcrumb hub crumb "Origins by City"; hero eyebrow "Origins by city"; presence claim
  "Find or start an Origin in your city"; hub intro "Every country, region, city, Origin type, and
  event idea on the network". PASS.
- Group types → Origins: directory section "Origin types" (280) with cards "Startup Origins in
  Berlin", "Creative & design Origins in Berlin", "Political & civic Origins in Berlin", "Origin
  meetups & events in Berlin", "Small business Origins in Berlin". PASS.
- Inventory banner "Places and Origins" (label + copy "Browse every place and Origin on the
  network.") + total 484. PASS (EN + de "Orte und Origins").
- Metadata title "Origins by City — Find or Start an Origin Near You | JoinOrigin" + description
  "Explore Origins by city around the world — …" (TASK-572 locationPages.ts hubEntry). PASS.
- de/es/ar chrome (TASK-570): "Origins nach Stadt", "Ein Origin in deiner Stadt finden oder
  gründen", "Explora tipos de Origin", "Origins en ciudades cercanas", "استكشف أنواع Origin",
  "Origins في المدن القريبة". PASS.

**City + country + region pages — "Origins in …" framing:**

- Berlin city page: H1 "Origins in Berlin", title "Origins in Berlin | JoinOrigin", variant H1
  "Startup Origins in Berlin" + "Where Startup Origins gather". PASS.
- City pages (TASK-571): Austin/Jakarta/Lima/Singapore "Origins in …". PASS.
- Country/region pages (TASK-572): Colombia, Australia, United States, Italy, Mexico, Norway,
  Osaka region — "Origins in …" + Origin FAQ ("How do I find Origins in Italy?", "Can I start an
  Origin in an Italian city?", "Which Osaka districts have the most active Origins?"). PASS.
- Presence claims: "Find or start an Origin in Ho Chi Minh City" / "in Osaka Prefecture". PASS.

**No leftover community-centric chrome:**

- "Communities by City" and "Find or start a community" are absent from the visible body of
  /en/location, /en/guides, and /en/location/germany/berlin/berlin (asserted count 0). PASS.
- Metadata spot-checks: /en/location, /en/guides, Berlin city, Colombia, United States, guide
  detail — all carry the new Origin titles. PASS.

**SEO sweep (SEO_LIVE_SWEEP=1):**

- Sitemap parity: /en/guides/start-an-origin, /en/guides/keep-an-origin-active,
  /en/guides/hybrid-origins are the advertised guide URLs (old community slugs absent — 103
  sitemap entries each across the 21-locale tree for the 3 renamed slugs; zero old-slug entries).
  PASS.
- llms.txt + llms-full.txt reference the new Origin slugs. PASS.
- Exhaustive live sweep: every advertised sitemap URL (897) resolves 200 across 8 deterministic
  chunks — zero orphans, zero 500s. PASS.
- Full 21-locale hreflang on guides + location + signup surfaces. PASS.

## Environment / dependency notes

- The full e2e + SEO sweep were executed against the FINAL Wave-3 state (master + TASK-572
  country/region/hubEntry content). The orchestrator's status files record PR #5
  (feat/content-origin-geo) as merged; the git-level master auto-merge commit may lag the
  offline-origin sync (recorded by the TASK-572 executor itself). This gate's PR
  (feat/e2e-origin-location) contains test-only changes; the country/region/location-hub
  assertions it pins assume the merged TASK-572 state, which the status files confirm.
- The 3 renamed slugs redirect with HTTP 308 (Next.js 16 `permanent: true` behavior), not 301.
  308 is the method-preserving permanent redirect and is 301-equivalent for SEO equity transfer;
  the gate asserts permanent status (301 or 308) + the exact Location destination.
- Pre-existing non-EN content trees (de/es/ar country/city/region content, e.g. "Finde oder
  gründe Communities in Berlin") intentionally keep "Community" — Wave-3 reframes EN content
  (TASK-571/572) and the shared chrome (TASK-569/570); the de/es/ar guide content trees were
  renamed to the new slugs with their existing translated titles (TASK-573).

## Claims

- `app/tests/e2e/tests/origin-location.spec.ts` (new), `location-pages.spec.ts`,
  `hub-filter.spec.ts`, `language-switcher.spec.ts`, `locale-routing.spec.ts`,
  `navigation.spec.ts`, `nav-progress.spec.ts`, `seo.spec.ts`, `translate-page.spec.ts`,
  `signup.spec.ts`, `home.spec.ts`.
