# Test Report — Sprint 24 Wave-4 Validation Gate (TASK-578)

_Validation phase output. Filled by the e2e-network-validation role._

## Current State

Sprint 24 Wave-4 ( /community → /network route rename + /location Origin residual) final
validation gate (e2e-network-validation, TASK-578, branch `feat/e2e-network-validation` —
test-only changes):
**web unit 110 suites / 1355 tests ALL PASS; monorepo unit 5/5 packages PASS; typecheck 5/5 PASS;
lint 5/5 PASS; lint-fix.sh clean (0 non-fixable); e2e vs prod `next start` (:3100) 346/346 PASS
for all Wave-4-attributable tests (1 pre-existing failure + its serial-file tail skipped are the
documented TASK-572 git-level merge-lag items, verified green against the claimed-merged state);
SEO live sweep 49/49 PASS (8 exhaustive chunks — every advertised /sitemap.xml URL resolves 200,
zero orphans, zero /community URLs, full 21-locale hreflang, sitemap/llms carry ONLY the new
/network surfaces).** E2ECoverageComplete: yes. Recorded 2026-08-28.

**Validation target state:** the Wave-4 rename as PM-approved — `/community` → `/network` (full
i18n namespace `community.*` → `network.*`, nav label "Network", SEO, permanent redirects all 21
locales) + /location residual "Communities" → "Origins" (hub entry, 59 content titles,
per-locale city/ideas titles, FAQ questions + entity closings + small-business answers). All
Wave-4 G0/G1 branches are merged on master (TASK-575 `b90642b`, TASK-576 `11efbf8`, TASK-577
`664b2f2`/`444a875`). TASK-572 (`feat/content-origin-geo`, PR #5 per orchestrator status files)
remains unmerged at the git level — the same documented "git-level master auto-merge may lag
offline-origin sync" condition the Wave-3 gate recorded. This gate was executed against the PR
state (plain master + Wave-4) AND verified against the claimed-merged state (master + TASK-572
content, clean merge) per the sprint convention.

### Test changes (this gate — tests only)

- **NEW `tests/e2e/tests/network.spec.ts`** — the Wave-4 gate spec (18 tests):
  - /network route: `/en/network` + `/de/network` + `/es/network` + `/fr/network` each resolve
    200 with the metadata title "Network — Find Your People & Build Together | JoinOrigin", the
    localized nav label (header Explore submenu + footer Product group: Network / Netzwerk / Red /
    Réseau), the "Where people find each other" hero (localized), the Origin examples section
    (localized), and the join-the-network stat (2,400+ localized).
  - Redirects: `/en/community` + `/de/community` permanent-redirect (301/308; Next 16 emits 308
    for `permanent: true`) with the Location destination `/en/network` / `/de/network`; the
    unprefixed `/community` permanently redirects to `/network`, whose proxy 307 then lands a
    browser on `/en/network`.
  - No "Community" nav label or "/community" links remain in the header/footer/explore rows/
    not-found across /en/network, /en/location, /en/features, /en/guides, and the 404 boundary.
  - /location residual: hub "Origins by City" + presence claim "Find or start an Origin in your
    city" + "Places and Origins" banner + group types ("Startup Origins in Berlin" …) + "30
    Origin event ideas" label; country page /en/location/germany "Origins in Germany"; city page
    /en/location/germany/berlin/berlin "Origins in Berlin"; de city /de/location/germany/berlin/
    berlin "Origins in Berlin" (H1 + title); zero "Communities by City" / "Find or start a
    community" / "How do I find communities in" visible leftovers on the scanned location
    surfaces.
- **10 existing e2e specs updated to the /network rename** (visible-chrome + URL assertions
  only): `community.spec.ts` (marquee → /en/network + "example Origins"), `locale-routing.spec.ts`
  (STATIC_PATHS /network), `scene-orbit.spec.ts` (ORBIT_PAGES /network), `origin-copy.spec.ts`
  (CTA + /network describe), `pages.spec.ts` (MENU_PAGES + EXPLORE_NAV + FOOTER_NAV + explore-menu
  "Network" → /en/network), `responsive.spec.ts` (mobile menu "Network"), `location-pages.spec.ts`
  (inventory explore rows "Network" → /en/network ×2 + de germany H1 "Origins in Deutschland"
  stale Wave-3 assertion fixed), `seo.spec.ts` (PATHS + EXPECTED_TITLES + APPROVED_OVERLENGTH +
  FAQPage JSON-LD path → /network), `home.spec.ts` (comment).
- The `location-pages.spec.ts` italy/osaka FAQ expectations (Wave-3-written, Origin-phrased) were
  intentionally NOT downgraded to the residual text — they pin the claimed-merged TASK-572 state.

## Gates

| Gate           | Command                                              | Result                                                                                      |
| -------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Web unit       | `jest` (@joinorigin/web)                             | **110 suites / 1355 tests PASS**                                                            |
| Monorepo unit  | `pnpm test`                                          | **5/5 packages PASS**                                                                       |
| Typecheck      | `pnpm typecheck`                                     | **5/5 packages PASS**                                                                       |
| Lint           | `pnpm lint` + `lint-fix.sh`                          | **5/5 packages PASS; lint-fix 10 fixed, 0 non-fixable**                                     |
| E2E (prod)     | `playwright test` vs `next start` (:3100)            | **346/346 Wave-4-attributable PASS** (1 pre-existing TASK-572-lag failure documented below) |
| SEO live sweep | `SEO_LIVE_SWEEP=1 playwright test tests/seo.spec.ts` | **49/49 PASS** (8 exhaustive chunks)                                                        |

## What was validated (Wave-4 /network route + /location residual)

**/network route — 200 + content (en/de/es/fr):**

- `/en/network`, `/de/network`, `/es/network`, `/fr/network` resolve 200 server-side. PASS.
- Metadata title "Network — Find Your People & Build Together | JoinOrigin" on every locale
  surface (SEO metadata is hardcoded EN per arch-i18n §1.2). PASS.
- Nav label localized "Network" (en), "Netzwerk" (de), "Red" (es), "Réseau" (fr) in the header
  Explore submenu (hover dropdown) AND the footer Product group, each linking to the
  locale-prefixed `/network` surface. PASS.
- Hero "Where people find each other" (localized) renders as the single H1. PASS.
- Origin examples section (localized "Example Origins" / "Beispiel-Origins" / "Ejemplos de
  Origins" / "Exemples d'Origins") renders. PASS.
- Join-the-network stat 2,400+ (localized: "2,400+" / "2.400+" / "2 400+") renders in the
  count-up stat (`community-members-stat` testid). PASS.

**Redirects — /community → /network (TASK-576):**

- `/en/community` permanent-redirects with Location `/en/network` (Next 16 emits 308 for
  `permanent: true` — method-preserving permanent redirect, 301-equivalent for SEO; the gate
  asserts permanent status [301, 308] + the exact Location, mirroring the Wave-3 guide redirect
  assertions). PASS.
- `/de/community` permanent-redirects with Location `/de/network`. PASS.
- Unprefixed `/community` permanently redirects to `/network` (next.config redirects run before
  the proxy), whose all-routes-prefixed proxy 307 then lands a browser on `/en/network` (200).
  PASS.
- All 21 locale `/<locale>/community` sources are declared in `next.config.mjs redirects()`
  (COMMUNITY_TO_NETWORK). The sitemap advertises ZERO /community URLs and 103 /network URLs
  (21 locale surfaces). PASS.

**No "Community" label / "/community" links remain:**

- Header/footer/explore rows/not-found carry zero `a[href*="/community"]` and zero "Community"
  nav label on /en/network, /en/location, /en/features, /en/guides, and the 404 boundary (the
  404's Explore link is "Explore Origins →" → /network). PASS.

**/location residual — Origins chrome (TASK-577/578):**

- Hub: H1 "Origins by City", presence claim "Find or start an Origin in your city", "Places and
  Origins" inventory banner, directory group-type cards "Startup Origins in Berlin" / "Creative &
  design Origins in Berlin" / "Political & civic Origins in Berlin" / "Origin meetups & events in
  Berlin" / "Small business Origins in Berlin", and the "30 Origin event ideas" label (hub ideas
  cards "… in Austin" etc. + exact label on the Berlin city group-type links). PASS.
- Country page /en/location/germany: title + H1 "Origins in Germany". PASS.
- City page /en/location/germany/berlin/berlin: title + H1 "Origins in Berlin". PASS.
- de city /de/location/germany/berlin/berlin: title + H1 "Origins in Berlin" (TASK-577
  pageTitles.city). PASS.
- Zero visible "Communities by City" / "Find or start a community" / "How do I find communities
  in" leftovers on /en/location, /en/location/germany, /en/location/germany/berlin/berlin, and
  /de/location/germany/berlin/berlin. PASS.

**SEO live sweep (SEO_LIVE_SWEEP=1):**

- Sitemap parity: /en/network is the advertised static surface (PATHS now `/en/network`);
  zero /community URLs in the 891-entry sitemap. PASS.
- Exhaustive live sweep: every advertised sitemap URL (891) resolves 200 across 8 deterministic
  chunks — zero orphans, zero 500s, no 404 regressions. PASS.
- /en/network (and all locale surfaces) emit the full 21-locale hreflang cluster + x-default →
  EN canonical (`rel="alternate" hrefLang=…` ×23 links incl. llms-full), new title + description,
  canonical /en/network, OG/Twitter, robots index,follow. PASS.
- Guide URLs still 200 with the new Origin slugs (start-an-origin, keep-an-origin-active,
  hybrid-origins); location URLs resolve Origins-correct metadata. PASS.

## Environment / dependency notes

- **TASK-572 git-level merge lag (pre-existing, NOT a Wave-4 regression):** the orchestrator's
  status files record PR #5 (feat/content-origin-geo — 38 EN country + 54 EN region content
  reframes) as merged, but the git-level master lacks its commits (same condition documented in
  sprint-24-origin-location-validation.md). Two Wave-3-written e2e assertions depend on that
  content: `location-pages.spec.ts` italy FAQ ("Can I start an Origin in an Italian city?") and
  osaka region FAQ ("Which Osaka districts have the most active Origins?"). On plain master the
  italy assertion fails (serial file → the osaka + following tests are skipped). Verified: with
  TASK-572 merged (clean merge, 6 trivial conflicts), the full `location-pages.spec.ts` passes
  (including italy + osaka + the de-germany H1 fix). The EN country/region DESCRIPTION fields
  ("Find or start communities in X") also still show on plain master for the same reason. These
  assertions were intentionally NOT downgraded to the residual text — they pin the
  claimed-merged state. Recommend the orchestrator sync master with TASK-572.
- **Non-EN description/variant-title prose** (e.g. de "Finde oder gründe Communities in Berlin",
  "Startup-Communities in Berlin") keeps the Wave-3 documented deferral (non-EN content trees
  retain "Community" in descriptions/variant titles; Wave-4 fixed the non-EN TITLE/H1 layer —
  pageTitles.city/ideas + title fields, which this gate asserts). de country/region FAQ questions
  (e.g. "Wie finde ich Communities in Deutschland?") remain for the same reason.
- **308 vs 301:** Next.js 16 emits 308 for `permanent: true` redirects; 308 is the
  method-preserving permanent redirect and is 301-equivalent for SEO equity transfer. The gate
  asserts permanent status (301 or 308) + the exact Location destination (repo convention from
  Wave-3).
- The full e2e run reports 346 passed / 1 failed (the pre-existing italy TASK-572-lag item) /
  1 flaky (the documented scene-orbit /about GSAP-hydration flake family, which passes on retry —
  repo convention: retries: 1 backstop, tests are NOT disabled).

## Claims

- `app/tests/e2e/tests/network.spec.ts` (new), `community.spec.ts`, `locale-routing.spec.ts`,
  `scene-orbit.spec.ts`, `origin-copy.spec.ts`, `pages.spec.ts`, `responsive.spec.ts`,
  `location-pages.spec.ts`, `seo.spec.ts`, `home.spec.ts`.
