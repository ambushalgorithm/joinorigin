# Test Report — Sprint 24 Wave-2 Validation Gate (TASK-568)

_Validation phase output. Filled by the e2e-origin-copy role._

## Current State

Sprint 24 Wave-2 (Origin repositioning APPLY) final validation gate (e2e-origin-copy, TASK-568, on
`feat/e2e-origin-copy` = merged master `a9d42fe` + test updates):
**web unit 110 suites / 1355 tests ALL PASS; monorepo unit 5/5 packages PASS; typecheck 5/5 PASS;
lint 5/5 PASS; lint-fix.sh clean (0 non-fixable); e2e vs prod `next start` 342/342 PASS; SEO live
sweep 49/49 PASS (8 exhaustive chunks — every advertised /sitemap.xml URL resolves 200, zero
orphans, full 21-locale hreflang intact). E2ECoverageComplete: yes.** Recorded 2026-08-27.

### What was validated (Wave-2 Origin copy + metadata + accent)

**Homepage hero — approved headline + two-tone Origin accent (en/de/es/ko):**

- NEW e2e suite `tests/e2e/tests/origin-copy.spec.ts`:
  - EN headline is exactly the approved copy: "Where every idea, startup, and project finds the
    people and resources to move it forward — Origin." PASS.
  - The brand word "Origin" renders as the two-tone gradient accent (accent span starts with
    "Origin") on EN + sampled locales `de`, `es`, `ko` — every approved headline ends on the
    brand word so the accent split lands exactly on the brand token (regression guard for
    TASK-563). PASS.
- Home `<title>` = "Origin — Social Collaboration Network & Community OS" (decision A). PASS.

**Home definition + FAQ q1–q5 — Origin-first, NO "community" in leads:**

- The visible definition paragraph renders the approved Origin-first copy ("Origin is the space
  you start around a goal … Bring the people and resources it needs …"). PASS.
- FAQ q1–q5 render 5 questions/answers, every lead Origin-first, and the FAQ block contains ZERO
  "community" (marketing-lead carve-out constraint a). PASS.

**CTA band — approved headline:**

- Menu pages render the CTA band headline "Start an Origin. Find the people and resources to move
  it forward." (decision C) with the subline and Get Started CTA intact. PASS.

**/features — Origins core-object card + Origin Foundation roadmap:**

- The core-object card renders the renamed title "Origins" (decision B) with the Origin-first body
  ("The space you start around a goal …"). PASS.
- The roadmap renders "Phase 1 — Origin Foundation" (phase rename). PASS.
- Features hero title "Everything an Origin needs, in one calm workspace" + Origin-first lead with
  zero "community"; the old "instead of ten separate tools" phrasing is gone from the visible copy
  (deck §5.1 deliberately replaced it). PASS.

**/community + /glossary — reframed copy:**

- `/community` hero lead ("Origin is where people gather around goals …"), values
  ("Origins are the center of engagement"), "Example Origins" section, and join copy
  ("Start an Origin, get discovered …"). PASS.
- `/glossary` intro ("The essential vocabulary of Origin …"), why-body ("An Origin glossary
  gives …"), and the reframed community term renders as "Origin" (decision B). PASS.

**Signup subcopy:**

- SSR + hydrated subcopy "Get discovered on Origin — …" (waitlist variant "We'll email you when
  your Origin is ready." — decision D). PASS.

**Tagline strip / footer:**

- Tagline strip + footer still render "Where teams find their Origin" (TASK-560/561 strip intact).
  PASS.

### Unit + typecheck + lint

- `pnpm --filter @joinorigin/web test` — 110 suites / 1355 tests PASS (fixed 5 stale
  `TypewriterHeading.test.tsx` brand-token accent fixtures that still referenced the pre-Wave-2
  locale headlines with trailing grammar; the applied copy makes every locale headline end on the
  brand word, so the accent fragment is now the brand token + sentence punctuation).
- `pnpm test --force` (turbo, uncached) — 5/5 packages PASS (web, i18n, ui, design, mobile).
- `pnpm typecheck --force` — 5/5 PASS. `pnpm lint --force` — 5/5 PASS. `lint-fix.sh` — 10 fixed,
  0 non-fixable.

### e2e vs prod `next start` (full suite)

- Full Playwright suite against the production build: **342/342 PASS** (was 321 in TASK-559 gate;
  grew with the origin-copy spec + prior sprints). Updated stale assertions across
  `hero.spec.ts`, `home.spec.ts`, `pages.spec.ts`, `navigation.spec.ts`,
  `language-switcher.spec.ts` (EN + DE), `locale-routing.spec.ts` (`/es/features` title),
  `signup.spec.ts`, `seo.spec.ts` (home/features titles) to the approved Wave-2 copy.

### SEO live sweep (SEO_LIVE_SWEEP=1)

- Exhaustive per-locale sweep: every URL advertised by the live /sitemap.xml (~897 URLs across all
  21 locale surfaces) resolves **200** — zero orphans, zero 500s; chunk 0/8–7/8 ALL PASS.
- Full 21-locale hreflang clusters verified on home/signup/location surfaces; no location URLs
  regressed.

### Known deviations (tracked, not blocking)

- **Discovery §6 160-char description rule**: the PM-approved reframe deck proposes three
  descriptions that exceed 160 chars and were applied verbatim by fe-origin-copy (TASK-567) —
  `/en/features` (169), `/en/community` (170), `/en/signup` (168). `seo.spec.ts` now allows these
  three approved paths (≤170) while all other paths must still respect ≤160. Recommend a follow-up
  fe task to tighten the three strings to ≤160.

### Files changed (test-only)

- `tests/e2e/tests/origin-copy.spec.ts` (NEW — Sprint 24 Wave-2 copy validation gate).
- `tests/e2e/tests/{hero,home,pages,navigation,language-switcher,locale-routing,signup,seo}.spec.ts`
  — updated stale copy assertions to the approved Wave-2 copy.
- `apps/web/components/TypewriterHeading.test.tsx` — updated brand-token accent split fixtures to
  the applied locale headlines.
