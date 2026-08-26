# Test Report — Sprint 24 Final Validation Gate (TASK-559)

_Validation phase output. Filled by generated validation roles._

## Current State

Sprint 24 Story C (Brand-Alignment Updates) final full-suite validation
(e2e-signup-validation, TASK-559, on merged master `e86d40a` + Story C PRs #1–#6):
**web unit 108 suites / 1339 tests ALL PASS; monorepo unit 5/5 packages PASS;
e2e vs prod `next start` 321/321 PASS; SEO live sweep 49/49 PASS (8 exhaustive
chunks — every advertised /sitemap.xml URL resolves 200, zero orphans);
typecheck 5/5 PASS; lint 5/5 PASS; lint-fix.sh clean (0 non-fixable).
E2ECoverageComplete: yes.** Recorded 2026-08-26.

### What was validated (Story C: signup page + CTA routing + count-up SSR + SEO brand)

**Signup page — SSR clean copy → hydration swap (TASK-555):**

- NEW e2e suite `signup.spec.ts`:
  - No-JS served HTML of `/en/signup` is a clean, indexable signup/login screen —
    heading "Create your account", Get Started submit, semantic name/email form
    (`autocomplete=name/email`); visible copy contains NO "Join the waitlist",
    NO "in development", NO "it's your turn"; no disclosure element. PASS.
  - After hydration the heading/subcopy swap to the waitlist variants and the
    in-development disclosure appears (the ONLY development-status surface). PASS.
  - Form validation (empty submit → inline field errors, no network) + submit →
    success state + CSV row (passive capture incl. referrer `/en/signup`). PASS.
- Locale parity (locale-routing.spec.ts Goal 8, rewritten): `/es/signup`,
  `/vi/signup`, `/en/signup` render localized copy after hydration (heading +
  submit + disclosure) with the URL-only no-cookie contract intact. PASS.

**CTA routing → `/<locale>/signup` with "Get Started" (TASK-556):**

- `signup.spec.ts` asserts every join CTA is a real anchor to `/en/signup` with
  the unified label: header `get-started-button`, hero `start-project-button`,
  footer `footer-waitlist-button` (label now Get Started), hero-join variant +
  CTA-band `cta-band-join-button` on menu pages, mobile `mobile-get-started-button`,
  location `location-cta-join-button`, guide `guide-join-button`. Legal pages keep
  the contact variant → `/en/contact`. PASS.
- Waitlist modal retired: no `role=dialog`, no waitlist modal testIDs on the home
  page, and `data-open-waitlist` triggers nothing (listener removed). PASS.
- Stale modal assertions updated across `home.spec.ts`, `responsive.spec.ts`,
  `hero.spec.ts` (Start Project → Get Started), `a11y-focus-return.spec.ts`
  (now signup-form keyboard a11y: label association + Tab order
  name → email → submit), `leads-api.spec.ts` (referer `/signup`),
  `location-pages.spec.ts` (signup CTA href). `waitlist.spec.ts` removed.

**Count-up SSR statics (TASK-558):**

- `signup.spec.ts` no-JS contexts: home renders "2,400+" (never "0+ Members")
  and `/en/location` renders "484 Places and Communities" (never a 0 prefix)
  in the static HTML. PASS.

**SEO brand alignment (TASK-557) + live sweep:**

- `seo.spec.ts` additions (Sprint 24 structured-data + llms block):
  - Organization JSON-LD never emits an empty `sameAs` (G-7). PASS.
  - BreadcrumbList items use canonical locale-prefixed URLs (G-8). PASS.
  - FAQPage on `/en/location` + `/en/guides` hubs (G-12). PASS.
  - City/Place + GeoCoordinates on city pages (G-13). PASS.
  - `<link rel="llms.txt">` + llms-full.txt alternate in `<head>` on every
    indexable page; `/llms-full.txt` returns 200 text/plain with the expanded
    full-text corpus (G-16). PASS.
  - `/en/signup` emits the full 21-locale hreflang cluster + canonical
    (G-10); all 21 `/<locale>/signup` URLs resolve 200. PASS.
- `/en/signup` added to the EN canonical PATHS set (title/description/OG/Twitter/
  canonical/robots + 160-char description + single-H1 semantic checks) and to the
  sitemap indexable set + per-locale surface check. PASS.
- Hreflang "phase A" stale assertions updated (EN pages now carry the full cluster):
  `location-pages.spec.ts` EN_ONLY pages + the sitemap Berlin/NYC cluster block. PASS.
- `SEO_LIVE_SWEEP=1 seo.spec.ts` against the prod `next start` server: 49/49 PASS —
  41 default seo tests + 8 deterministic sweep chunks; every advertised sitemap
  URL (incl. all 21 `/signup` surfaces) resolves 200. PASS.

### Counts

| Gate                                                         | Result                                                    |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| Web unit suite (`pnpm --filter @joinorigin/web exec jest`)   | 108 suites / 1339 tests PASS                              |
| Monorepo unit (`pnpm test`, turbo 5 tasks)                   | 5/5 packages PASS                                         |
| Monorepo typecheck (`pnpm typecheck`)                        | 5/5 packages PASS                                         |
| Monorepo lint (`pnpm lint`) + `lint-fix.sh` on claimed files | 5/5 packages PASS, 0 non-fixable                          |
| E2E full suite (`test:e2e`, prod `next start`)               | 321/321 tests PASS (0 flakes, 0 retries needed)           |
| SEO live sweep (`SEO_LIVE_SWEEP=1` seo.spec.ts)              | 49/49 PASS (8 chunks, every advertised sitemap URL → 200) |

### Files changed (test-only, zero production source edits)

- `app/apps/web/app/guides/[slug]/page.test.tsx` — disambiguate the two
  "Get Started" links (hero-join + guide-join) in the cross-link assertion
  (regression from the unified label; TASK-559 fix).
- `tests/e2e/tests/signup.spec.ts` — NEW: SSR clean copy, hydration swap, form
  validation/submit, CTA routing, modal-retired, count-up SSR statics.
- `tests/e2e/tests/waitlist.spec.ts` — removed (modal retired; replaced by signup.spec.ts).
- `tests/e2e/tests/home.spec.ts` — modal tests → signup navigation + form + CSV.
- `tests/e2e/tests/hero.spec.ts` — hero CTA label Get Started + href.
- `tests/e2e/tests/responsive.spec.ts` — mobile/header CTA → /en/signup nav.
- `tests/e2e/tests/a11y-focus-return.spec.ts` — modal focus-trap → signup-form keyboard a11y.
- `tests/e2e/tests/locale-routing.spec.ts` — Goal 8 → signup page language parity (es/vi/en).
- `tests/e2e/tests/location-pages.spec.ts` — signup CTA href + full hreflang cluster (G-10).
- `tests/e2e/tests/leads-api.spec.ts` — referer `/signup` + comment.
- `tests/e2e/tests/seo.spec.ts` — signup in PATHS/indexable set, Sprint 24
  structured-data + llms checks, signup hreflang/200 checks, hreflang cluster updates.

### Verdict

**PASS — Sprint 24 Story C fully validated. E2ECoverageComplete: yes.**

Prior validation history: `./agent-core/memory/archive/test-report-sprint-23-full.md`.
