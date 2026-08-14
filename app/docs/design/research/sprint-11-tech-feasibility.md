# Sprint 11 — Tech Feasibility: Next.js 16 + React 19 + Turbopack Programmatic Routes at Scale

> **Parent:** [`../README.md`](../README.md) (design docs) · **Research index:** [`./README.md`](./README.md) · **Consumer:** `arch-seo-content-engine` (TASK-303) · **Author:** `research-tech-feasibility` (TASK-301)

## 1. Purpose

This report answers, with evidence from the installed stack (`next@16.3.0`,
`react@19.2.8`, Turbopack as the default bundler) and the official Next.js 16.3
documentation, whether the JoinOrigin web app can serve **thousands of
programmatic pages** (location hubs: `/location/<country>/<region>/<city>`,
city×group-type variants, how-to guides, idea pages) without blowing up build
time, disk, or hosting cost.

It is a **findings report, not a solution design**. The architect (TASK-303)
merges this with the other six research reports and owns the final
architecture. Findings here are intentionally technical: what the framework
does, what the trade-offs are, and what the architect should weigh.

**Scope boundary (unchanged):** research only. Zero implementation files were
touched. The report assumes the Sprint 11 scope: SEO Content Engine = research
+ architecture only; implementation lands in Sprint 12.

---

## 2. Executive Summary (TL;DR)

1. **Next.js 16.3 is fully capable of thousands of programmatic pages.** The
   App Router's `generateStaticParams` + `dynamicParams` + ISR model is the
   exact feature set built for this. No framework blocker exists.
2. **Do NOT statically generate all pages at build time.** The official
   guidance is explicit: every prerendered page increases build work and stored
   output. The recommended pattern is **hybrid**: prerender a warm set
   (flagship/high-traffic pages), let the rest generate on first request via
   ISR, then upgrade. Evidence: ISR guide + ISR-with-Cache-Components guide.
3. **`cacheComponents: true` is the Next 16 unified switch** that replaces
   `experimental.ppr` / `experimental.dynamicIO` / `experimental.useCache` and
   makes Partial Prerendering (static shell + streamed dynamic content) the
   default. It requires the Node.js runtime — already true after TASK-288
   (edge removed). It is a **runtime/server** feature; ISR is not supported
   with static export (`output: 'export'`).
4. **Revalidation strategy: prefer on-demand invalidation keyed to dataset
   version** (`revalidateTag('geo')` / `revalidatePath`) over short
   time-based `revalidate`. The geodata dataset updates on a known cadence
   (see `research-geodata`), so dataset-driven invalidation is cheaper and
   deterministic. Add a generous time-based fallback (e.g., 1 month) for
   safety. Deterministic output matters: `new Date()`/`Math.random()` in ISR
   output causes spurious ISR writes and cache churn.
5. **Sitemap: keep the single-source-of-truth pattern.** Extend
   `lib/seo/routes.ts` (or introduce a sibling data module the sitemap and
   `generateStaticParams` both consume) so `/sitemap.xml` can never drift from
   the pages that actually exist. Use `generateSitemaps` to split once the
   URL count approaches 50,000 per sitemap (Google limit), and use
   `alternates.languages` for the 21-locale hreflang story when localization
   lands.
6. **`/llms.txt` must stay curated, not exhaustive.** The llms.txt v2 spec
   and its intent (small enough to fit an LLM context window) are
   incompatible with listing thousands of city pages. Keep llms.txt pointing
   at hubs + flagship pages; the sitemap is the exhaustive index.
7. **Hosting:** Vercel (ISR + build minutes) or the existing
   `output: 'standalone'` Docker single instance both work. Multi-instance
   self-hosted ISR requires a shared cache handler (Redis/S3) — the default
   filesystem cache is per-instance, and on-demand revalidation only
   invalidates the instance that receives the call.
8. **Baseline before scaling:** Sprint 12 should capture the `next build`
   route table + wall time at the current 8-page site, then re-measure with a
   representative page count (e.g., 1k / 10k params) before committing to a
   full build-time strategy. Vercel's hard build ceiling is 45 minutes / 1 GB
   cache; Docker self-hosting has no such ceiling but build time is still
   deploy time.

---

## 3. Current-State Baseline (what exists today)

Verified in the repo:

| Concern | Current state | File(s) |
|---|---|---|
| Framework | `next@16.3.0`, `react@19.2.8`, `react-dom@19.2.8`; Turbopack default bundler | `apps/web/package.json`, `next.config.mjs` |
| Route surface | 8 static HTML pages (`/`, `/features`, `/community`, `/docs`, `/about`, `/contact`, `/privacy`, `/terms`) — zero dynamic segments today | `apps/web/app/*` |
| Single source of truth | `ROUTES` array (`SiteRoute[]`) drives `sitemap.ts` + nav + metadata | `apps/web/lib/seo/routes.ts` |
| Sitemap | `sitemap.ts` maps `ROUTES` → `MetadataRoute.Sitemap`; deterministic `lastModified` pinned to `SITE_RELEASE_DATE` | `apps/web/app/sitemap.ts` |
| robots | `robots.ts` allow-all + `Sitemap:` link; `/api/` disallowed | `apps/web/app/robots.ts` |
| llms.txt | Route handler `app/llms.txt/route.ts` → `buildLlmsText()` from `LLMS_ENTRIES`; ~2 KB curated | `apps/web/app/llms.txt/route.ts`, `lib/seo/llms.ts` |
| Metadata builder | `createMetadata()` — canonical + OG + Twitter + robots | `apps/web/lib/seo/metadata.ts` |
| i18n | 21 locales; `getDictionary` (static sync) + `loadDictionary` (dynamic import) | `packages/i18n/src/loader.ts` |
| Server runtime | Node.js only (proxy.ts, icon/apple-icon migrated off edge in TASK-288) — **required** for ISR/Cache Components | `apps/web/proxy.ts` |
| Output | `output: 'standalone'` (Docker multi-stage) — compatible with ISR | `next.config.mjs` |

The existing conventions (ROUTES single source, deterministic sitemap,
curated llms.txt) are **directly reusable** for the programmatic page system;
the research below shows how they extend.

---

## 4. Dynamic Segments + `generateStaticParams` in Next.js 16 (evidence)

### 4.1 API surface (verified against official docs, version 16.3.1)

- **Dynamic segments** are folders `[segment]`; catch-all `[...segment]`;
  optional catch-all `[[...segment]]`. For the planned
  `/location/<country>/<region>/<city>` shape this maps to three dynamic
  segments: `app/location/[country]/[region]/[city]/page.tsx`.
- **`params` is a Promise** in Next 15+/16 — pages must `await params`
  (or `use(params)` in client components). Type helpers `PageProps<'/route'>`
  / `LayoutProps<'/route'>` / `RouteContext<'/route'>` type the promise.
- **`generateStaticParams` works with pages, layouts, AND route handlers.**
  Layouts can generate parent params top-down; a page can generate all params
  bottom-up. Child `generateStaticParams` receives the parent params.
- **`fetch` inside `generateStaticParams` is automatically memoized/
  deduplicated**, so the dataset fetch that feeds params does not repeat per
  page — a real build-time accelerator when the params come from a shared
  geodata module (see §4.3).
- **`dynamicParams`** (route segment config): `true` (default) = params not
  in `generateStaticParams` are generated on first request; `false` = 404.
  **Important:** `dynamicParams` is NOT available when `cacheComponents` is
  enabled — the Cache-Components ISR model replaces it with App Shell
  upgrades (§5.2).
- **Build-time validation is sample-based:** only the param values returned
  by `generateStaticParams` are exercised at build; unlisted param code paths
  are validated at first request. Conditional branches that read
  `cookies()`/`headers()` for unlisted params must be wrapped in `<Suspense>`
  or the runtime request errors.
- **Empty array + `export const dynamic = 'force-static'`** = render all
  paths on demand (classic all-at-runtime ISR). With Cache Components, an
  **empty array is a build error** — `generateStaticParams` must return at
  least one param (a `__placeholder__` param + `notFound()` is the documented
  workaround when params are unknown at build).

### 4.2 What this means for the location-page system

- The planned URL hierarchy maps cleanly onto 2–3 nested dynamic segments.
- Prerender strategy should be **explicit and intentional**, not "all pages":
  - `generateStaticParams` returns the **warm set** (e.g., every country/region
    hub + flagship cities from `research-content-strategy`), which becomes
    fully static at build.
  - The **long tail** (all other cities, all city×group-type variants) is
    covered by on-demand generation + upgrade. This is the documented hybrid
    pattern, not a compromise.
- Because params come from a static geodata module (per `research-geodata`),
  `generateStaticParams` is effectively synchronous in-memory iteration —
  build cost per param is dominated by rendering the page template, not data
  I/O.

### 4.3 Dataset-param coupling (single source of truth)

Today `ROUTES` is the single source of truth for 8 static pages. For
programmatic pages the same invariant must hold: **one data module** (e.g.,
`lib/seo/location-pages.ts` or an extension of `routes.ts`) should expose:
(1) the canonical param list for `generateStaticParams`,
(2) the title/description/URL metadata for each page,
(3) the entries for `sitemap.ts`.

If `generateStaticParams` and `sitemap.ts` both derive from the same module,
the sitemap can never list a page that 404s, and every generated page is
automatically in the sitemap — preserving the exact property the current
`ROUTES` design enforces ("a page added here is automatically in the sitemap
and canonical links. **No duplicated URL lists.**").

---

## 5. Partial Prerendering / Cache Components (PPR) in Next.js 16

### 5.1 `cacheComponents: true` is the unified switch

Official docs (config reference, 16.3.1): `cacheComponents` "implements
**Partial Prerendering (PPR)** as the default behavior in the App Router.
This means the `experimental.ppr` configuration flag and the
`experimental_ppr` route segment configuration are no longer necessary and
have been removed."

- Enables the `use cache` directive, `cacheLife` profiles, and `cacheTag`
  for component/function-level caching.
- Requires the **Node.js runtime** (the repo is already there post-TASK-288).
- Data fetching becomes dynamic-by-default; you opt into caching — the
  inverse of the classic model. This is a **paradigm shift** the architect
  must account for: existing pages that rely on implicit static rendering
  would need explicit `use cache` / Suspense discipline once the flag is on.

### 5.2 ISR with Cache Components = App Shell upgrades

The Next.js 16 guide "Incremental Static Regeneration with Cache Components"
defines the flagship pattern for exactly our use case:

- At build, PPR splits each route into an **App Shell** (URL-independent part)
  + param-specific prerenders from `generateStaticParams`.
- Visit to a **listed param** → fully prerendered page from cache.
- Visit to an **unlisted param** → App Shell served instantly, upgraded in the
  background with known params; subsequent visits get the upgraded result.
- A `<Link>` prefetch counts as the first visit (background upgrade starts
  before click) — with `partialPrefetching: true` (16.3+), one App Shell per
  route is prefetched and shared across links.
- "Choosing what to prerender": *"Not every route needs to be prerendered.
  Every page you prerender increases build work and produces output that has
  to be stored and deployed... use `generateStaticParams` to prerender the
  routes that benefit most... Less frequently visited routes are generated on
  demand and upgraded after their first visit."*

### 5.3 When to enable vs not

- **Enable `cacheComponents`** if the architect wants PPR shells + `use cache`
  — best for the SEO engine (static shells for unknown-city URLs, cached
  template data).
- **Cost:** build-time validation becomes stricter (uncached/runtime data
  outside `<Suspense>` blocks prerendering → build errors), `dynamicParams`
  is unavailable, and `generateStaticParams` must return ≥1 param. The
  existing 8 static pages may need small mechanical changes (wrap runtime
  reads in Suspense) to keep the build green.
- The current repo does **not** have `cacheComponents` enabled. **Recommend
  the architect evaluate it in Sprint 12 on a spike branch** before committing
  the whole site to it; classic ISR (`export const revalidate`) is fully
  sufficient for the location pages without PPR and is the lower-risk path.

---

## 6. ISR / Revalidation Strategies (build-time vs runtime)

### 6.1 The three levers

| Lever | Mechanism | Best for | Caveats |
|---|---|---|---|
| Time-based revalidation | `export const revalidate = 3600` (route segment) | Content with a known freshness cadence | Official guidance: use HIGH values (1h+); short intervals are an anti-pattern; lowest fetch revalidate wins; `revalidate: 0`/`no-store` makes route dynamic |
| On-demand path revalidation | `revalidatePath('/location/...')` from a server action / route handler / webhook | Dataset version bumps, CMS publishes | Regeneration happens on next request (no eager API in App Router yet); proxy is NOT executed for on-demand ISR — revalidate the exact path |
| On-demand tag revalidation | `revalidateTag('geo')` (+ `cacheTag`/`fetch { next: { tags } }` / `unstable_cache`) | Coarse invalidation of a whole page family | `revalidatePath` is a convenience layer over tags; tag-based is the granular primitive |

### 6.2 ISR facts that matter for thousands of pages

- **ISR requires the Node.js runtime** (satisfied) and **is not supported with
  static export** (`output: 'export'`). The repo uses `output: 'standalone'`
  — compatible.
- **Background regeneration runs on the instance that receives the triggering
  request**; on per-request-billing platforms (Vercel) this counts as compute.
- **Default filesystem cache is per-instance.** On-demand revalidation only
  invalidates the instance that receives the call. Multi-container Docker →
  either accept per-instance staleness, run a single instance, or add a
  shared cache handler (Redis/S3 via `incrementalCacheHandlerPath` /
  `cacheHandlers`).
- **Observability:** `x-nextjs-cache` response header reports `HIT` / `STALE`
  / `MISS` / `REVALIDATED`; `NEXT_PRIVATE_DEBUG_CACHE=1` logs cache hits/misses.
- **Vercel ISR pricing:** reads/writes metered in 8 KB units in the function
  region; durable cache evicted after 31 days unaccessed; CDN layer is
  ephemeral and free. **Non-deterministic output (`new Date()`, `Math.random()`,
  un-keyed ids) causes spurious writes** — the current repo's deterministic
  `SITE_RELEASE_DATE` practice is exactly right and must be preserved for
  programmatic pages (i.e., pin derived `lastmod` values to dataset version
  dates, never `new Date()`).
- **Self-hosted single `next start`:** filesystem cache + `s-maxage,
  stale-while-revalidate` Cache-Control works out of the box; CDN in front
  should respect `Cache-Control` to offload.

### 6.3 Recommended strategy for the SEO Content Engine

1. **Primary: on-demand tag revalidation driven by dataset version.** The
   geodata/city dataset (see `research-geodata`) has a defined update cadence
   (e.g., annual/quarterly or on new source releases). A CI/webhook step bumps
   the dataset version and calls `revalidateTag('geo')` (or `revalidatePath`
   on the location tree). No background regeneration storm; invalidation is
   exact and cheap.
2. **Fallback: a generous time-based revalidate** (e.g., `revalidate = 2592000`
   ≈ 30 days) so pages self-heal even if the webhook is missed. High value,
   not short — per official guidance.
3. **Keep pages deterministic:** all page output (titles, dates, JSON-LD,
   breadcrumbs) must derive from the dataset + template; no runtime
   timestamps in the page body.
4. **Respect multi-instance reality:** if Vercel: ISR cache is platform
   managed. If self-hosted Docker with >1 replica: plan a shared cache handler
   in Sprint 12 or accept single-instance until traffic demands scale-out.

---

## 7. Build-time vs Runtime Generation — Cost Analysis for Thousands of Pages

### 7.1 The math

| Strategy | Build cost | Storage/deploy cost | First-visit UX | Notes |
|---|---|---|---|---|
| **All at build time** (`generateStaticParams` returns everything) | O(P) rendering work; linear in page count | All pages shipped as static files | Instant | Simplest ops; breaks down at 50k–1M pages on CI; Vercel 45-min ceiling |
| **Hybrid: warm set + on-demand ISR** | O(warm set); long tail deferred | Warm set files + shells | Warm: instant; long tail: shell→stream/upgrade | **Recommended**; official pattern |
| **All on demand** (`generateStaticParams` returns `[]`/placeholder, no prerender) | ~zero prerender work | Only shells | First visit = dynamic render, then cached | High burst cost on crawl; not recommended for SEO launch |

- Rendering a single programmatic page is cheap when the template + data are
  in-memory (no network I/O in `generateStaticParams` due to memoization).
  The linear term is real but small per page; the practical ceiling is CI
  build budget, not the framework.
- The Next.js build prints `[+N more paths]` when the route table overflows —
  evidence that large static sets are an expected, supported shape.

### 7.2 Hard ceilings (evidence)

- **Vercel builds:** 45-minute build timeout; build cache 1 GB; container
  resources Hobby/Pro: 8 GB RAM, 32 GB disk, 2/4 CPUs. Builds bill as build
  minutes. Monorepo: Turborepo remote caching available.
- **Self-hosted Docker:** no platform build ceiling; `output: 'standalone'`
  keeps the runtime image small (traced node_modules), but static page files
  still ship in the image — thousands of pages = extra MB, not a problem.
- **Sitemap:** 50,000 URLs / 50 MB per sitemap (Google protocol) → split via
  `generateSitemaps` (Next 16: `id` is a Promise).

### 7.3 Build-time tooling (available in Next 16)

- `next build` route table shows `○` static, `◐` partial prerender, `●` SSG,
  `ƒ` dynamic + `Revalidate`/`Expire` columns (with cacheComponents).
- `next build --debug-build-paths="app/location/**/page.tsx"` — build only
  matching routes (great for iterating on the location templates without
  rebuilding the site).
- `next build --debug-prerender` — readable stack traces for prerender
  failures.
- `next experimental-analyze --output` — bundle composition analysis
  (Turbopack).
- `next typegen` — generate route types without a full build (CI-friendly).
- CI build caching guide (Next docs) — persist `.next/cache` in CI to make
  incremental builds fast across commits (this repo's turbo pipeline can also
  add remote caching).

---

## 8. sitemap.ts / llms.txt / ROUTES Integration for Dynamic Pages

### 8.1 sitemap.ts

- `sitemap.ts` is a special route handler **cached by default** unless it uses
  request-time APIs or dynamic config — good: the sitemap is served from cache,
  not rendered per crawl request.
- Supports `alternates.languages` → emits `xhtml:link rel="alternate"
  hreflang` per URL. This is the framework-native mechanism for the 21-locale
  story once localization lands (`research-localization` owns the strategy;
  tech side is ready today).
- **Splitting:** `generateSitemaps` (export alongside the sitemap function)
  returns `[{ id }]`; each chunk served at `/sitemap/[id].xml`. `id` is a
  Promise in v16. Chunk by the same dataset slices used by
  `generateStaticParams` so both stay aligned; keep `robots.ts` pointing at
  `/sitemap.xml` (it can stay a single index that references the chunks, or
  point directly — architect's call).
- **Deterministic `lastModified`:** keep pinning to dataset-version dates
  (repo precedent: `SITE_RELEASE_DATE`). Avoid `new Date()` in sitemap output
  — it both breaks e2e determinism and causes ISR write churn.

### 8.2 llms.txt

- Spec (llmstxt.org v2, modified 2026-08-10): H1 + blockquote summary +
  H2 file-list sections; files should be "small enough to fit in context";
  links should point at LLM-friendly content; `Optional` section convention;
  `rel="alternate" type="text/markdown"` and `rel="describedby"` links
  recommended. The repo's `buildLlmsText()` already follows this format.
- **Finding: llms.txt is the wrong place for the long tail.** Listing tens of
  thousands of city pages would blow the context-window budget that is the
  file's entire point. Keep llms.txt **curated**: overview + flagship hubs +
  category guides + a pointer to the sitemap for exhaustive discovery.
- **Per-section llms.txt is supported by the spec** (any path, e.g.
  `/docs/llms.txt` covers `/docs/`). If the architect wants city-group
  LLM discovery later, scoped `llms.txt` route handlers at a few hub levels
  are more spec-aligned than one giant file.
- The existing route-handler approach (`app/llms.txt/route.ts` + a builder in
  `lib/seo/llms.ts`) extends naturally: the builder can consume the same
  data module used by `ROUTES`/`generateStaticParams`.

### 8.3 The single-source-of-truth extension

Recommended shape for the architect to evaluate (not a spec):

- Keep `ROUTES` for the 8 static pages (nav + sitemap + metadata — untouched
  contract).
- Add a **programmatic-page registry** (e.g., `lib/seo/locationPages.ts`)
  exporting `locationPageEntries()` derived from the geodata module: each
  entry = `{ params: { country, region, city }, path, title, description,
  priority, lastModified }`.
- `generateStaticParams` → `locationPageEntries().map(e => e.params)`.
- `sitemap.ts` → `[...ROUTES, ...locationPageEntries()]` (+ hreflang via
  `alternates.languages` when localized).
- Metadata builder → per-page `createMetadata({...})` from the same entry
  (avoids a second canonical/OG implementation for dynamic pages).
- llms.txt → still curated; can reference hub pages generated by the registry
  for their stable URLs.

This preserves the invariant the whole SEO layer relies on today: **one
definition of a URL, three outputs (page, sitemap, metadata) can never
disagree.**

---

## 9. Build Performance + Hosting Implications

### 9.1 Build performance with Turbopack

- Turbopack is the **default bundler** in Next 16 for both `next dev` and
  `next build` (`--webpack` opts out; the repo's `next.config.mjs` already
  uses `turbopack.resolveAlias`/`resolveExtensions`).
- Compilation is fast and incremental; the expensive part of a large page set
  is **prerendering**, not bundling — which is exactly why the hybrid
  prerender strategy matters more than bundler choice.
- Repo-specific: `styled-components` SSR via the SWC compiler hook is honored
  by Turbopack; no bundler migration risk for the programmatic pages.
- **Recommended Sprint 12 gate:** capture baseline (`next build` wall time,
  route table, `.next` size) at the current 8 pages; then measure with
  `generateStaticParams` returning 1k / 10k params on a spike branch. Use
  `--debug-build-paths` to iterate. Choose the warm-set size from the
  measured per-page render cost, targeting a comfortable CI budget
  (e.g., <10 min total build).

### 9.2 Hosting matrix (for thousands of pages)

| Option | ISR | Static pages | Notes |
|---|---|---|---|
| **Vercel** | Yes (platform-managed durable cache + CDN) | Shipped as static files | 45-min build ceiling, build minutes billing, 8 KB-unit ISR read/write metering; simplest ops; recommended default |
| **Self-hosted Docker (`output: 'standalone'`, `next start`)** | Yes (filesystem cache, single instance) | Shipped in image | No platform ceiling; needs persistent disk; multi-replica requires shared cache handler + `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` + deployment ID (documented in self-hosting guide) |
| **Static export (`output: 'export'`)** | **No** | All files | Only viable if build-time full generation is affordable and no ISR needed — NOT recommended for this feature |

- The repo already emits `output: 'standalone'` + Docker multi-stage
  (TASK-238), so the self-hosted path is zero-new-infra. Vercel deployment
  would be a new target but is the lowest-ops path for ISR at scale.
- CDN in front of self-hosted: pages fully prerendered get
  `Cache-Control: public` (CDN-cacheable); pages touching dynamic APIs get
  `private, no-cache` — CDN must respect `Cache-Control` and cache-key
  variability (self-hosting guide §CDN caching).

---

## 10. Best-Opinion Recommendations for the Architect

Ranked (highest confidence first):

1. **Use the hybrid prerender model.** `generateStaticParams` returns a warm
   set (all country/region hubs + flagship cities + high-value guides);
   `dynamicParams: true` (classic ISR) or the Cache-Components App Shell
   upgrade covers the long tail. Do not full-prerender everything.
2. **Prefer classic ISR for Sprint 12 unless a spike proves PPR value.**
   `export const revalidate` + `dynamicParams` is the smallest delta from
   today's fully static site, has no Suspense discipline requirement, and is
   fully documented. `cacheComponents: true` is compelling (PPR shells for
   unknown URLs, `use cache`) but imposes stricter build validation and
   `dynamicParams` removal — evaluate on a spike branch with the e2e/build
   matrix.
3. **Invalidate by dataset version, not by clock.** `revalidateTag('geo')` /
   `revalidatePath('/location/...')` from the data pipeline (CI/webhook),
   plus a 30-day time-based fallback. Keep all page/sitemap output
   deterministic (no `new Date()`).
4. **Extend the ROUTES single-source-of-truth pattern** to a programmatic
   page registry consumed by `generateStaticParams`, `sitemap.ts`, and
   metadata. Split sitemaps via `generateSitemaps` at ~50k URLs; add
   `alternates.languages` when localization lands.
5. **Keep llms.txt curated**; do not enumerate the long tail. Reuse the
   existing `buildLlmsText()` builder; optionally add scoped hub-level
   llms.txt later per the v2 spec.
6. **Ship on Vercel or single-instance standalone Docker.** Both work today.
   If Docker scales to multiple replicas, add a shared cache handler early.
7. **Measure before optimizing.** Record a build-time/route-table baseline in
   Sprint 12 and re-measure at 1k/10k params. Use `--debug-build-paths` for
   template iteration and `next experimental-analyze` if bundle size ever
   becomes a concern.

---

## 11. Risks & Open Questions for the Architect

| # | Risk / question | Notes |
|---|---|---|
| R1 | `cacheComponents` strict validation could block the existing 8 pages (runtime reads outside Suspense) | Spike before enabling; mechanical fixes are small |
| R2 | Multi-instance self-hosted ISR staleness | Needs shared cache handler; defer until scale-out |
| R3 | Sitemap size growth × 21 locales (50k limit × hreflang) | `generateSitemaps` chunking planned; localization multiplies URLs — coordinate with `research-localization` |
| R4 | Crawl-burst cost of on-demand generation (thousands of first visits) | Warm set should cover likely-crawled hubs; see `research-programmatic-seo` for crawl-budget guidance |
| R5 | Dataset freshness vs revalidation cadence | Depends on geodata source cadence (see `research-geodata`); on-demand tag revalidation is the coupling point |
| R6 | Build-time validation only covers warm-set params (unlisted branches unvalidated at build) | Keep template code deterministic; wrap any runtime API access in Suspense; e2e smoke a few long-tail URLs |
| R7 | Turbopack vs webpack behavioral differences | Repo already on Turbopack; do not regress to `--webpack` |

---

## 12. Sources

- Next.js 16.3.1 official docs (fetched 2026-08-13):
  - Dynamic Route Segments — <https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes>
  - `generateStaticParams` — <https://nextjs.org/docs/app/api-reference/functions/generate-static-params>
  - `cacheComponents` (PPR) — <https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents>
  - ISR guide — <https://nextjs.org/docs/app/guides/incremental-static-regeneration>
  - ISR with Cache Components — <https://nextjs.org/docs/app/guides/incremental-static-regeneration-cache-components>
  - `dynamicParams` — <https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams>
  - `partialPrefetching` — <https://nextjs.org/docs/app/api-reference/config/next-config-js/partialPrefetching>
  - sitemap.xml / `generateSitemaps` — <https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap>, <https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps>
  - Building your application — <https://nextjs.org/docs/app/guides/building>
  - Self-hosting — <https://nextjs.org/docs/app/guides/self-hosting>
  - CLI (`next build`, Turbopack flags) — <https://nextjs.org/docs/app/api-reference/cli/next>
  - Turbopack config — <https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack>
- llms.txt v2 spec — <https://llmstxt.org/>
- Vercel docs:
  - ISR usage & pricing — <https://vercel.com/docs/incremental-static-regeneration/limits-and-pricing>
  - Builds (45-min timeout, 1 GB cache, container resources) — <https://vercel.com/docs/builds>
- Repo evidence: `apps/web/package.json` (next 16.3.0, react 19.2.8),
  `apps/web/next.config.mjs` (Turbopack + standalone), `apps/web/lib/seo/routes.ts`,
  `apps/web/app/sitemap.ts`, `apps/web/app/llms.txt/route.ts` +
  `apps/web/lib/seo/llms.ts`, `apps/web/lib/seo/metadata.ts`,
  `packages/i18n/src/loader.ts` (21 locales), `app/tests/e2e/tests/seo.spec.ts`.

---

## 13. Status

- **Research:** complete. Findings above are evidence-backed from the installed
  framework version and official documentation.
- **Deliverable:** this report at
  `app/docs/design/research/sprint-11-tech-feasibility.md` (TASK-301).
- **Consumer handoff:** `arch-seo-content-engine` (TASK-303) merges this with
  the other six sprint-11 research reports.
- **Zero implementation files edited** (per role boundary).
