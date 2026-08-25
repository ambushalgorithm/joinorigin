# Sprint 22 — Navigation Performance Baseline & Root-Cause (Story F)

- **Status:** Baseline established — regression root-caused, fixes scoped for `fe-nav-perf-fix` (TASK-537)
- **Author:** fe-nav-perf-investigate (TASK-527, Group 0 — investigation/doc only, no source edits)
- **Date:** 2026-08-25
- **Build under test:** `master` @ `0d8323a` — Next.js **16.3.0** (Turbopack), React 19.2.8, styled-components 6.5.2, pnpm monorepo
- **Story F gate (reference):** click → new route's primary content rendered **≤ 100 ms** (RAIL perceptual budget)
- **Consumed by:** TASK-537 (`fe-nav-perf-fix`), TASK-538 (`fe-nav-progress`), TASK-543 (`e2e-nav-perf`)

---

## 1. Method

- **Environment:** production build (`pnpm --filter @joinorigin/web build`), standalone server
  (`node .next/standalone/apps/web/server.js`, `output: 'standalone'`) on `127.0.0.1:3100`,
  `.next/static` + `public` copied into the standalone tree (mirrors the Docker image).
- **Browser:** Playwright Chromium (Desktop Chrome profile), 1440×900, locale `en-US`,
  `prefers-reduced-motion` default (no-preference). Localhost latency — server work is not
  network-dominated; the numbers isolate client-side costs plus local RSC round-trips.
- **Metric (gate):** click dispatch (`performance.now()` at `mousedown`-time click) → target
  route's **primary content element** (`main h1` — the page's single `<h1>`, rendered by
  `MenuHero` on menu pages / `Hero` on home) **rendered into layout** (bounding box with
  non-zero width/height). This is the strictest "primary content rendered" reading: the
  element exists in the DOM and occupies layout space.
- **Runs:** warm-session ×5 per transition (same browser context, cache warm); separate
  cold-context runs for first-load JS and guides/glossary chunk impact.
- **Corroborating metrics:** RSC request duration (resource timing), JS transfer/decoded
  bytes per route (resource timing `transferSize`/`decodedBodySize`), HTML/RSC payload sizes
  (raw fetch), proxy microbenchmark, build route table, client-reference manifests.

> **Perceptual caveat (see RC4):** the gate is measured on _element-in-layout_. On menu
> pages the hero title additionally starts at `opacity: 0` and fades in over ~0.7 s, so the
> _visibly readable_ time is later than the numbers below. This animation is itself a
> Story F blocker.

---

## 2. Measured baseline — click → primary content (BEFORE)

### 2.1 Warm-session click-to-content (5 reps each, cache warm, prefetch as-observed)

| Transition                                    | avg        | min    | max     | RSC req | JS fetched on click            |
| --------------------------------------------- | ---------- | ------ | ------- | ------- | ------------------------------ |
| home → `/en/features`                         | **183 ms** | 141 ms | 244 ms  | ~7 ms   | ~10 KB (rep 1)                 |
| home → `/en/location`                         | **261 ms** | 226 ms | 366 ms  | ~17 ms  | ~596 KB (rep 1)                |
| `/en/location` → `/en/location/united-states` | **183 ms** | 154 ms | 240 ms  | ~12 ms  | ~14 KB                         |
| home → `/en/guides`                           | **418 ms** | 188 ms | 1063 ms | ~22 ms  | **3.17 MB (rep 1; geo chunk)** |

**Every transition misses the ≤ 100 ms gate.** Even the best case (features, min 141 ms) is

> 100 ms; the worst case (guides cold) is **1.06–1.4 s**.

### 2.2 Cold first-load (fresh context, no cache) — JS shipped per route

| Route                        | JS transfer | JS decoded   | Geo chunk (`1_l0a_4aujb-d.js`)      |
| ---------------------------- | ----------- | ------------ | ----------------------------------- |
| `/en` (home)                 | 0.57 MB     | 1.97 MB      | no                                  |
| `/en/features`               | 0.57 MB     | 1.97 MB      | no                                  |
| `/en/location`               | 0.57 MB     | 1.99 MB      | no                                  |
| `/en/location/united-states` | 0.57 MB     | 1.99 MB      | no                                  |
| `/en/guides`                 | **3.59 MB** | **15.98 MB** | **14.01 MB decoded (3.16 MB gzip)** |
| `/en/glossary`               | **3.59 MB** | **15.98 MB** | **14.01 MB decoded (3.16 MB gzip)** |

### 2.3 Server / HTML payload sizes (raw)

| Route                        | HTML bytes                                         |
| ---------------------------- | -------------------------------------------------- |
| `/en`                        | 149 KB                                             |
| `/en/features`               | 144 KB                                             |
| `/en/guides`                 | 148 KB                                             |
| `/en/location`               | **413 KB** (2.8× other pages — hub directory data) |
| `/en/location/united-states` | 144 KB                                             |

### 2.4 Prefetch observation (home → nav links)

- On home load the router prefetches **RSC payloads** for all visible nav links
  (`/en/features`, `/en/location`, `/en/guides`, `/en/docs`, `/en/about`, `/en/community`,
  ×2 each — prefetch + full), but **zero client JS chunks are prefetched**.
- The Explore dropdown links (Locations/Guides) trigger **no prefetch at all on hover**
  (`0` requests) — hidden-panel links are not "in viewport", so those clicks always pay the
  full chunk cost on the critical path.
- On click, `/en/guides` fetched 11 resources including the 14.7 MB geo chunk
  (`/_next/static/chunks/1_l0a_4aujb-d.js`), then prefetched 3 guide-card routes.

---

## 3. Root causes (regression — "was faster")

### RC1 — 12 MB `locations.json` leaks into client bundles → 14.7 MB chunk on guides/glossary (CRITICAL)

**Chain:** client components (`app/guides/guides-hub-view.tsx`, `app/glossary/glossary-hub-view.tsx`,
`app/guides/[slug]/guide-view.tsx`) import `lib/seo/guides.ts` (for constants like
`GUIDES_HUB_PATH` / `GLOSSARY_HUB_PATH`) → `guides.ts` imports **8 helpers** from
`lib/seo/locationData.ts` (TASK-480) → `locationData.ts` does
`import data from './data/locations.json'` — **11.9 MB** world geo snapshot (geonames /
simplemaps / wikidata, 21-locale names).

**Evidence:**

- `_next/static/chunks/1_l0a_4aujb-d.js` = **14,692,301 bytes** raw, **3.16 MB gzip**.
- Referenced by **66 route client-reference-manifests** (guides, guides/[slug], glossary ×
  canonical + 21 locale surfaces).
- Cold `/en/guides` and `/en/glossary` first-load decode **15.98 MB JS** vs **1.97 MB** for
  every other route — the geo chunk is 88% of decoded bytes.
- Cold guides click-nav: **1.06–1.4 s**; warm guides click-nav still 188–337 ms.

**Regression origin:** `lib/seo/guides.ts`'s client-facing surface drags the full
`locationData` module into the browser bundle. The guides hub predates this (TASK-309), but
TASK-480 (Sprint 21) massively expanded the imported helper set and the payload now lands on
the click critical path because of RC3 (RSC-only prefetch).

### RC2 — ISR/caching fully disabled: `await headers()` in `app/layout.tsx`

- The root layout calls `await headers()` (to resolve `x-joinorigin-locale` and load the
  server dictionary). In Next 16 this opts **every route** into dynamic rendering.
- Build table: **all 357 routes are `ƒ` (dynamic)**; even `/en/location` which exports
  `revalidate = 2592000` responds `Cache-Control: private, no-cache, no-store, max-age=0,
must-revalidate` — **ISR never serves a cached response**.
- Consequence: every client-side navigation triggers a **full server render** (RSC + HTML)
  per request; no CDN/edge caching possible; origin does all work per click. Locally the RSC
  round-trip is only 7–33 ms (data layer is fast + localhost), but in production this adds
  origin latency + load on every navigation.
- Compounding: `/en/location` server payload is **413 KB HTML** — `hubDirectoryEntries()`
  serializes a directory card for every content-rich country/region/city into the flight
  payload on every hub render (no cache).

### RC3 — Next 16 `<Link>` prefetch is RSC-only; JS chunks load on click (the core "was faster" driver)

- Pre-Next 16 (webpack, Next 13/14), `<Link>` prefetch warmed the target route's **JS chunks
  - data**, so clicks were cache hits (near-instant).
- Since the Next 16.3 + Turbopack upgrade (TASK-226, 2026-08-11), default
  `prefetch={null}` prefetches **only the RSC payload**; the client JS chunks are fetched and
  evaluated **after the click**.
- Verified on the build: RSC prefetches at load, zero chunk prefetches; click then fetches
  11 resources for `/en/guides` including the 14.7 MB geo chunk.
- This moves RC1's 14.7 MB chunk and the ~600 KB location chunk set onto the click critical
  path, which is exactly the "navigation got slower" symptom.

### RC4 — Hero entrance animation re-runs on every SPA navigation (perceptual gate blocker)

- `MenuHero` (`useGSAP` on mount) sets `[data-hero="title"]` (the page `<h1>`) to
  `autoAlpha: 0` and fades it in: **stagger 0.08 s + 0.7 s duration** → fully readable only
  ~0.78 s after mount. `Header` replays `fadeDown` (0.8 s) as well.
- Even with instant data, a menu page cannot be _perceived_ as "primary content rendered"
  under 100 ms while the H1 is transparent. Reduced-motion users (settled state) are exempt.
- Coordinates with Story B/`fe-motion-timing` (TASK-530) and `fe-menuhero` (TASK-532).

### RC5 — Proxy does per-navigation work on every request (secondary)

- Matcher `/((?!_next/static|_next/image|assets|fonts|favicon.ico).*)` runs `proxy.ts` on
  every page/RSC request. It computes `localeFromPathname` (21-locale array scan) and, for
  unprefixed paths, `resolveAcceptLanguage` (RFC 9110 parse + sort).
- **Microbench:** prefixed path resolution ~0.1 µs; unprefixed + Accept-Language ~4 µs —
  negligible CPU. Real cost is the middleware hop itself (Node runtime) on every request and
  the 307 redirect round-trip for any unprefixed URL (entrance traffic, crawlers, or a missed
  link). Client links are always prefixed via `localizePath`, so SPA nav avoids the redirect.

---

## 4. Recommended fixes (for TASK-537 fe-nav-perf-fix) + expected impact

| #   | Fix                                                                                                                                                                                                                                                                                                                                                                          | Where                                                                           | Expected impact                                                                              | Coordinates with                                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| F1  | **Keep `locations.json` out of client bundles.** Split the path constants (`GUIDES_HUB_PATH`, `GLOSSARY_HUB_PATH`) used by client views out of `lib/seo/guides.ts`, and move server-only helpers behind a `'use server'`/server-component boundary or compute data server-side and pass as props. Remove the `locationData` import from any client component's module graph. | `lib/seo/guides.ts`, `lib/seo/locationData.ts`, client views                    | guides/glossary click 1.06–1.4 s → ~150–250 ms; cold load 3.6 MB → 0.6 MB transfer           | `fe-guides-legal` (TASK-535) owns the guide views; share the boundary without editing their files |
| F2  | **Restore static/ISR caching.** Stop reading `headers()` in the root layout (or scope it so canonical static surfaces render statically and location pages actually use `revalidate`). Locale is already resolved + forwarded by the proxy (`x-joinorigin-locale`); the layout doesn't need to re-read it per request for the common prefixed case.                          | `app/layout.tsx`                                                                | RSC nav served from cache; CDN-cacheable responses; origin load per navigation removed       | `fe-nav-progress` (TASK-538) owns `layout.tsx` — coordinate mount/placement                       |
| F3  | **Re-enable JS prefetch on the click path.** Use `prefetch={true}` (or a shared prefetch mechanism) on nav links — especially the Explore dropdown links, which currently prefetch nothing because they're hidden until hover.                                                                                                                                               | `components/Header.tsx` (shared mechanism only; do not edit), `next.config.mjs` | click cost drops to ~RSC-only (~20–50 ms) when chunks are preloaded — inside the 100 ms gate | `fe-header-footer` (TASK-531) owns Header; implement shared mechanism + log coordination note     |
| F4  | **Make hero entrance render-first on client nav.** On SPA navigation the hero `<h1>` should not start invisible (or should use a shortened, non-blocking reveal). Align with the Story B reduced-motion rule.                                                                                                                                                                | `MenuHero.tsx`, `motion.ts` (shared tokens only)                                | perceived click-to-visible ≤ 100 ms                                                          | `fe-menuhero` (TASK-532), `fe-motion-timing` (TASK-530)                                           |
| F5  | **Trim the `/en/location` hub payload.** `hubDirectoryEntries` serializes the full content-rich directory into the flight payload (413 KB HTML). Lazy-load the directory client-side or reduce serialized fields.                                                                                                                                                            | `lib/seo/locationView.ts`, `LocationView.tsx`                                   | location hub nav + first load materially lighter                                             | `fe-location-view` (TASK-533)                                                                     |
| F6  | **Proxy trim (secondary).** Skip `resolveAcceptLanguage` when the pathname already carries a locale prefix; exclude prefetch/RSC requests from the matcher where locale resolution is not needed.                                                                                                                                                                            | `proxy.ts`                                                                      | small per-navigation reduction; fewer middleware invocations                                 | proxy tests must stay green (TASK-541)                                                            |

**Guardrail for TASK-537:** implement at route/config level (`next.config.mjs`, `proxy.ts`,
`lib/seo/localePath.ts`) and via shared mechanisms only — do not edit components owned by
other roles (Header nav prefetch, lazy-loaded scenes, layout). Keep URL-only locale semantics;
proxy + locale tests must pass. Re-measure with the method in §1 and record before/after.

---

## 5. Raw evidence artifacts

- Warm-session click-to-content: 20 samples (5 per transition) — full table in §2.1.
- Cold first-load JS transfer/decoded per route — §2.2 (resource timing).
- HTML/RSC payload sizes — §2.3.
- Prefetch request traces (home load, dropdown hover, guides click) — §2.4.
- Geo chunk: `_next/static/chunks/1_l0a_4aujb-d.js` = 14,692,301 B raw / 3.16 MB gzip;
  referenced by 66 route manifests.
- Proxy microbenchmark: `localeFromPathname` 0.1–1.2 µs; `resolveAcceptLanguage` 2.3 µs;
  combined unprefixed ~4 µs (200k-iteration means).
- Build: Next 16.3.0 Turbopack; 357 dynamic routes, 5 static (icons); `Cache-Control:
no-store` on all page responses.

## 6. What "after" must look like (Story F gate)

Re-measure the same transitions with the fix set F1–F6:

| Transition                                    | BEFORE (avg)               | AFTER target (≤ 100 ms) |
| --------------------------------------------- | -------------------------- | ----------------------- |
| home → `/en/features`                         | 183 ms                     | ≤ 100 ms                |
| home → `/en/location`                         | 261 ms                     | ≤ 100 ms                |
| `/en/location` → `/en/location/united-states` | 183 ms                     | ≤ 100 ms                |
| home → `/en/guides`                           | 418 ms (cold 1063–1388 ms) | ≤ 100 ms                |

Fixes F1+F3 are expected to deliver the majority of the win (chunk removal + click-path
prefetch); F4 closes the perceptual gap; F2 removes per-navigation origin work.
