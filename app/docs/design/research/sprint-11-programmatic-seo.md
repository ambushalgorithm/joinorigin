# Sprint 11 — Programmatic SEO Research: Location-Page Strategy for the SEO Content Engine

> **Parent:** [`../README.md`](../README.md) — design docs index
> **Produced by:** `research-programmatic-seo` (TASK-297) · **Consumers:** `arch-seo-content-engine` (TASK-303) · **Sibling reports:** `sprint-11-market-competitor.md`, `sprint-11-geodata.md`, `sprint-11-content-strategy.md`, `sprint-11-localization.md`, `sprint-11-tech-feasibility.md`, `sprint-11-translation-services.md`

---

## 1. Purpose

This is a **best-opinion research report** on programmatic location-page SEO for the
JoinOrigin SEO Content Engine. It answers four questions the architect (TASK-303) needs
before designing `/location/<country>/<region>/<city>` pages plus city × group-type
variants:

1. What URL structure best serves programmatic location pages (SEO + user + engineering)?
2. What template-quality thresholds separate "helpful programmatic pages" from "thin content"?
3. How do doorway-page, duplicate-content, and scaled-content-abuse penalties work, and how does a site with **thousands** of generated pages avoid them?
4. How should internal links, canonicalization, indexation, sitemaps, and crawl budget be designed so Google indexes the *right* pages and skips the *wrong* ones?

This report is **research only**. It contains no implementation files, no routes, and no
code changes. The architect consumes it (with the other 6 reports) to produce
`app/docs/design/sprint-11-seo-content-engine.md`.

---

## 2. Executive Summary — Key Findings

| # | Finding | Evidence | Implication for JoinOrigin |
|---|---------|----------|----------------------------|
| F1 | Programmatic SEO works at massive scale when each page is **data-driven and intent-matched**; it fails when it is template-spam. | Ahrefs: Zapier (~800K pages), Wise (~14.8K pages, ~4.7M/mo organic), Nomadlist (~25.8K location pages, ~41K/mo). John Mueller: "Programmatic SEO is often a fancy banner for spam." | Location pages must contain **real, city-specific data** (community topics, count of communities, geodata stats, FAQ) — not boilerplate with the city name swapped in. |
| F2 | Google's spam policies explicitly define **doorway abuse** and **scaled content abuse**; both are triggered by mass-generated, low-value pages. | Google Search Central Spam Policies (doorway abuse: "multiple domain names or pages targeted at specific regions or cities that funnel users to one page"; scaled content abuse: "many pages generated for the primary purpose of manipulating search rankings"). | Every generated URL must earn its place: unique content + unique user value + browsable hierarchy. Never create pages just to cover a long-tail keyword matrix. |
| F3 | Thin/duplicate content is the #1 killer of programmatic location pages. Google demotes pages with "little to no added value" and can apply **site-wide** demotion when a large fraction of the site is scaled-content. | Google Helpful Content guidance ("mass-produced by or outsourced to a large number of creators"); Ahrefs location-page guide: "Duplicated content with just the location swapped out" is exactly what Google dislikes. | Adopt a **quality threshold**: only generate pages where unique data fields (pop, region, group-type stats, curated copy) exceed a minimum "information value" bar; noindex/defer anything below it. |
| F4 | URL structure should be **hierarchical, human-readable, hyphenated, lowercase**, with location in the path (not query params). `/location/<country>/<region>/<city>` and `/location/<country>/<region>/<city>/<group-type>` is a clean, scalable, topical architecture. | Google URL structure guidance (descriptive words, hyphens, lowercase, "organize content so URLs are constructed logically"); Ahrefs location-page guide (parent/child structure: `example.com/location/service`). | Use path hierarchy, never query-string variants, for location/group-type pages. Avoid unnecessary params that explode URL count. |
| F5 | Duplicate-content risk at scale is managed with **canonicalization + one-URL-per-concept**: every page self-canonicalizes; near-duplicate variants canonicalize to a parent; hreflang for localized versions. | Google canonicalization docs (rel=canonical, self-referential, sitemap as weak signal); Google localized-versions docs (hreflang). | One canonical URL per logical page. City pages and group-type variants must differ in content; if a variant is too similar, canonicalize it to the parent city page. |
| F6 | **Indexation must be selective.** Not every generated page should be indexable. Strategy: index only pages above a quality/data threshold; noindex (or omit from sitemap) the long tail that would dilute crawl budget and site quality. | Google: "If you're hosting such content on your site, exclude it from Search"; crawl budget docs (unnecessary URLs consume bandwidth and can prevent full indexing); sitemap best practices (only list canonical URLs you want indexed). | Introduce a **tiering system** (Tier 1 flagship cities, Tier 2 large cities, Tier 3 small towns). Tier 3 may be generated but noindexed until it earns data. Sitemap lists only indexable pages. |
| F7 | Internal-link mesh is "super critical" for SEO; a **pyramid + topic-cluster** structure (hub-and-spoke) distributes authority from money pages down to location pages and back up. | John Mueller via Ahrefs internal-links guide ("internal linking is super critical"); Ahrefs guide (pyramid structure, topic clusters, 3–5 contextual links per article, breadcrumbs, no orphan pages). | Design: Home → `/locations` hub → country → region → city → group-type variants. Each city page links to sibling cities in the same region (cluster), parent region/country, and related how-to guides. |
| F8 | Crawl budget matters at thousands of pages but is not the primary concern for a site this size; the bigger risk is **index bloat** (Google indexes junk → site-wide quality signal drops). | Google crawl-budget / URL-structure guidance ("unnecessarily high numbers of URLs… may be unable to completely index all the content"); Search Console Page Indexing report. | Generate pages in waves (flagship cities first), monitor Index Coverage, and prune/noindex non-performing pages. Use sitemap index files if >50K URLs (not needed initially). |
| F9 | Localized (multi-language) location pages need **hreflang + per-language canonical**, and Google prefers URLs in an hreflang cluster as canonical. Auto-translated pages are indexable but duplicate/quality risk is high (see sibling report on MT). | Google canonicalization docs ("prefers URLs in hreflang clusters"); Google localized-versions docs. | EN-first (see localization report). When locales ship, add `hreflang` alternates + `x-default`; never serve near-identical translated content under separate URLs without real localization. |

---

## 3. Programmatic SEO at Scale — What Works, What Fails

### 3.1 Evidence of success

Programmatic SEO ("creating keyword-targeted pages in an automatic — or near automatic —
way") is a well-established pattern. Documented success cases (Ahrefs, Oct 2023):

| Site | Programmatic pattern | Scale | Organic traffic |
|------|---------------------|-------|-----------------|
| **Zapier** | App directory (one page per integration) | ~800K pages | ~306K/mo |
| **Wise** | Currency converter pages (every currency pair) | ~14.9K pages | ~4.7M/mo |
| **Nomadlist** | Location pages (per city: internet speed, temp, language) | ~25.9K pages | ~41K/mo |
| **Webflow** | Made-in-Webflow template pages | ~31.5K pages | ~27.6K/mo |

The common thread: **each page is a useful answer to a specific query, powered by real
data** (rates, workflows, city stats). The pages are not paraphrased boilerplate — they
contain unique, structured, actionable information.

### 3.2 Evidence of failure

Google's John Mueller (Aug 2023, Twitter/X): *"Programmatic SEO is often a fancy banner
for spam."* The gap between the successful examples above and the spam classification is
exactly the **thin content** gap: pages with "little or no value to the end user" that were
created "for the primary purpose of manipulating search rankings."

Google's **scaled content abuse** policy (Spam Policies, updated 2026) is the direct
enforcement:

> "Scaled content abuse is when many pages are generated for the primary purpose of
> manipulating search rankings and not helping users. This abusive practice is typically
> focused on creating large amounts of unoriginal content that provides little to no value
> to users, no matter how it's created."

Examples named by Google:
- Generative AI used to create many pages without adding value for users
- Scraping feeds/results and "automated transformations like synonymizing, translating, or other obfuscation techniques"
- "Creating many pages where the content makes little or no sense to a reader but contains search keywords"

**Implication:** JoinOrigin's city pages must be more than "search keywords + swapped city
name." Each page needs a demonstrable information value: real community data, real
geodata, curated how-to content, and unique local facts.

---

## 4. URL Structure Design for Location Pages

### 4.1 Google's URL guidance (authoritative)

From Google Search Central "URL structure best practices":

- Use **descriptive words, not long ID numbers**: `example.com/wiki/Aviation` good; `example.com/index.php?topic=42&area=3a5e...` bad.
- Use **hyphens** to separate words, not underscores.
- Keep URLs **lowercase** and consistent in case.
- **Avoid unnecessary parameters**; params "that don't change the content" should be trimmed. Overly complex URLs with many params "can cause problems for crawlers by creating unnecessarily high numbers of URLs that point to identical or similar content."
- For multi-regional sites, use **locale-specific subdirectories** with a gTLD: `example.com/de/`.
- Organize content "so that URLs are constructed logically and in a manner that is most intelligible to humans."

### 4.2 Location-page URL patterns (Ahrefs)

Ahrefs' location-page guide (Dec 2023) recommends **parent/child structure**:
- If the business is national/multi-city, locations are parents: `example.com/location/service`
- If the business is single-area, services are parents: `example.com/service/location`

### 4.3 Recommendation for JoinOrigin

Adopt a **hierarchical geographic namespace** under one top-level segment:

```
/community/                                # existing hub (parent)
/locations                                 # new top-level hub (all countries)
/locations/<country>                       # country page  (e.g. /locations/united-states)
/locations/<country>/<region>              # region page   (e.g. /locations/united-states/california)
/locations/<country>/<region>/<city>       # city page     (e.g. /locations/united-states/california/san-francisco)
/locations/<country>/<region>/<city>/<group-type>   # city × group-type variant
```

Rationale:
- **Human-readable + keyword-bearing**: "communities in San Francisco" maps cleanly to the URL.
- **Topical hierarchy** that mirrors real geography — Google's pyramid/topical-cluster model.
- **No query-string explosion**: variants are path segments, not `?type=run-club` params.
- **Scale-safe**: country (~200) → region (~3,000) → city (~50,000+ populated places). The
  hierarchy keeps URL count manageable and gives crawlers clear parent-child context.
- **Consistent with the existing app**: `ROUTES` in `apps/web/lib/seo/routes.ts` is the
  single source of truth; dynamic location routes can extend this pattern (see tech-feasibility report).

**Group-type variants** (`/city/<group-type>`): only generate where there is real
differentiating content (e.g., "running clubs in San Francisco" has different local venues,
communities, and how-tos than "book clubs in San Francisco"). If two group-types have
identical copy, that is duplicate content — merge or noindex.

**Naming conventions:**
- Use the canonical English/ASCII slug form (transliterated where needed per Google's
  percent-encoding guidance). Hyphenated kebab-case, lowercase.
- No trailing slash (consistent with current `ROUTES`).
- Case-sensitive by spec: enforce lowercase at generation time.

---

## 5. Template Quality Thresholds — Avoiding Thin Content

### 5.1 Google's "helpful, reliable, people-first content" bar

Google's guidance asks, for every page (including programmatic ones):
- Does the content provide original information, research, or analysis?
- Does it provide a substantial, complete, or comprehensive description of the topic?
- Does it provide value beyond obvious rephrasing?
- Would you expect to see this content in a printed magazine/encyclopedia?
- Is the content mass-produced "so that individual pages or sites don't get as much attention or care"?

And warns against "search engine-first" signals:
- "Are you producing lots of content on many different topics in hopes that some of it might perform well in search results?"
- "Are you using extensive automation to produce content on many topics?"
- "Are you mainly summarizing what others have to say without adding much value?"

### 5.2 Thin content triggers specific to location pages (Ahrefs)

Google dislikes, per Ahrefs' location-page guide:
1. Mass-produced local pages prioritizing quantity over quality
2. Location pages for areas the business has **no tangible presence in**
3. Duplicated content with just the location swapped out
4. Regurgitated Wikipedia history of a location

### 5.3 Recommended quality threshold model for the SEO Content Engine

Define a **"can this page be indexed?" gate** evaluated at generation time. A page is
indexable only if it meets ALL of:

| Gate | Requirement | Why |
|------|-------------|-----|
| G1 | **Unique data fields ≥ N** — at least 3+ city-specific data points (population, region, community-type counts, venue/landmark references, FAQ answers specific to the place) | Differentiates from "city name swapped" boilerplate |
| G2 | **Unique copy ≥ M words** — a meaningful block of original, human-quality copy per city (not template prose) | Content worth indexing; E-E-A-T signal |
| G3 | **Real existence** — the location is a real populated place (from the geodata dataset), not a synthetic/keyword-invented location | Doorway/area-with-no-presence risk |
| G4 | **Intent match** — the page answers the query "communities in <city>" or "start a <group-type> in <city>" | Avoids generating pages nobody searches for |
| G5 | **No near-duplicate** — Levenshtein/similarity check against the parent template; below threshold → merge/noindex | Duplicate-content mitigation |

**Tiering strategy (indexation-focused):**
- **Tier 1 — Flagship cities** (e.g., top 25–50 cities by community activity / search
  demand): full unique copy, custom data, curated how-to guides, manual polish. All indexable.
- **Tier 2 — Major cities** (e.g., top 500–2,000): data-driven copy with strong unique
  fields, semi-automated. Indexable if gates pass.
- **Tier 3 — Small towns** (the long tail): generated from data only. **Noindex by default**
  until data/copy exceeds the bar, or serve as `index, follow` only when G1–G5 all pass.

This mirrors how successful sites (Zapier, Nomadlist) actually operate: high-value pages
first, long tail only where it earns its place.

---

## 6. Doorway-Page, Duplicate-Content, and Content-Farm Penalties

### 6.1 Doorway abuse (Google spam policy)

> "Doorway abuse is when sites or pages are created to rank for specific, similar search
> queries. They lead users to intermediate pages that are not as useful as the final
> destination. Examples include: … having multiple domain names or pages targeted at
> specific regions or cities that funnel users to one page; … generating pages to funnel
> visitors into the actual usable or relevant portion of a site; creating substantially
> similar pages that are closer to search results than a clearly defined, browseable hierarchy."

**Risk for JoinOrigin:** If `/locations/.../city` pages are created purely to funnel users
to a generic join/CTA page, or if we generate hundreds of near-identical city pages that
all funnel to one template, we trip this policy. Mitigations:
- Every location page is a **standalone, useful destination** (real city content, not a funnel).
- The page's CTA (join waitlist) is secondary, not the entire content.
- Pages live in a **clearly defined, browsable hierarchy** (home → locations → country → region → city), not a flat list of keyword URLs.

### 6.2 Duplicate content (Google Search Central)

Google's duplicate-content guidance: duplicate content is not penalized per se, but
Google **selects one canonical** version; near-duplicate pages "can be problematic" and
waste crawl budget. Google explicitly states canonicalization techniques should be used to
consolidate signals, and "you may want Googlebot to get the most out of your site, so it's
better for it to spend time crawling new (or updated) pages… rather than crawling duplicate
versions of the same content."

**Mitigations:**
- One URL per concept; self-referential `rel="canonical"` on every page.
- No URL parameters that change nothing (no `?utm_*` variants, no `?page=` for pagination without `rel=canonical` management).
- If group-type variants are too similar to the parent city page → canonicalize to parent or noindex the variant.
- For localized versions, use `hreflang` + `x-default` (see §8.4).

### 6.3 Content-farm / scaled-content abuse (Google spam policy)

Google's **scaled content abuse** policy (see §3.2) is the modern enforcement against
content farms. The policy is **site-wide**: "If you're hosting such content on your site,
exclude it from Search." Violations can demote **the entire site**, not just the bad pages.

**Implication:** this is the single biggest risk in a thousands-of-pages programmatic
strategy. A low-quality long tail can drag down the whole domain. Therefore:
- Apply the quality gate (§5.3) **before** any page is generated for indexation.
- Generate in waves; watch Search Console Page Indexing + Manual Actions reports.
- Prefer **fewer, better pages** over maximum URL coverage. A site with 500 excellent city
  pages outranks a site with 50,000 thin ones — and carries far less penalty risk.

### 6.4 Keyword stuffing (Google spam policy)

Google names "blocks of text that list cities and regions that a web page is trying to
rank for" as a keyword-stuffing example. Location pages must not contain hidden city
lists, off-screen location keywords, or repeated "communities in X, communities in Y, …"
blocks. All location names must appear as natural, visible, useful content (nav, cards,
links).

---

## 7. Internal-Link Mesh Design

### 7.1 Why internal links matter

John Mueller: *"Internal linking is super critical for SEO. It's one of the biggest things
you can do on a website to guide Google and visitors to the pages that you think are
important."* Internal links:
- Discoverability: Google finds new pages by following links from known pages.
- PageRank distribution: more internal links → more authority to target pages.
- Context: descriptive anchor text tells Google what each page is about.

### 7.2 Pyramid + topic-cluster model

Ahrefs' internal-links guide recommends a **pyramid structure** (every page within ~3
clicks of home) combined with **topic clusters** (a pillar page linked reciprocally to
related subtopic pages). Recommended for JoinOrigin:

```
Home (/) 
  └── /locations (pillar hub — lists all countries)
        └── /locations/united-states (country pillar)
              └── /locations/united-states/california (region hub)
                    └── /locations/united-states/california/san-francisco (city page)
                          └── /locations/.../san-francisco/running-clubs (variant)
```

Link mesh rules:
- **Up-links:** every city page links to its region, country, and the `/locations` hub (breadcrumb pattern).
- **Sibling links (cluster):** every city page links to 5–10 sibling cities in the same region ("Communities in nearby cities") — this is the topic-cluster engine that distributes authority across the cluster.
- **Cross-links to content:** every city page links to 2–4 relevant how-to guides/idea pages (e.g., "How to start a community in San Francisco", "30 event ideas for communities in California") — links content strategy to location pages.
- **Anchor text:** descriptive, varied ("running clubs in San Francisco", "communities in the Bay Area"), never generic "click here".
- **Placement:** contextual links in the main content body carry the most weight; nav/breadcrumb links are structural; footer links are weakest.
- **Quantity:** ~3–5 contextual links per page (beyond nav/breadcrumbs) is a good target; too many links dilute PageRank.
- **No orphan pages:** every generated page must be reachable from at least one other page (or the sitemap — but sitemap alone is a weak discovery signal; internal links are primary).

### 7.3 Programmatic internal linking at scale

Because thousands of pages cannot be hand-linked, the link mesh must be **derived from the
geodata hierarchy itself**:
- Region → sibling cities: computed from the same dataset (same region, different city).
- Country → regions: computed from admin-1 boundaries.
- City → guides: curated mapping table (topic → city) or rule-based (guide mentions city).

This keeps the mesh consistent, complete, and automatically updated when data changes.

---

## 8. Indexation Strategy, Canonicalization, and Crawl Budget

### 8.1 Which pages to index — selective indexation

Recommendation: **index only pages that pass the quality gate (§5.3).** Everything else
gets `noindex` (via `robots` meta or Next.js metadata `robots: { index: false }`) or is
excluded from the sitemap.

- **Indexable:** Tier 1 + Tier 2 pages that pass G1–G5; the `/locations` hub, country, region pages.
- **Noindex / deferred:** Tier 3 (small towns) until they pass the gate; any group-type
  variant that fails the near-duplicate check.
- **Never index:** internal API pages, search/filter pages, staging variants, preview URLs.

Google explicitly endorses this: *"If you're hosting such content on your site, exclude it
from Search."* — the exclusion is part of the spam-policy compliance story, not just a
technical nicety.

### 8.2 Canonicalization

Per Google's canonicalization docs:
- Every indexable page emits a **self-referential `rel="canonical"`** (absolute URL).
- Sitemap inclusion is a **weak** canonical signal; `rel="canonical"` is strong. Use both,
  consistently (never point sitemap at URL A and canonical at URL B).
- Never use `noindex` as a substitute for canonical selection on in-site near-duplicates —
  prefer `rel="canonical"` to the parent; use `noindex` only for pages you don't want in
  Search at all.
- Never use robots.txt for canonicalization; don't block indexable content in robots.
- For localized pages, include `hreflang` clusters (Google prefers URLs in an hreflang
  cluster as canonical).

Current app baseline: `createMetadata` in `apps/web/lib/seo/metadata.ts` already sets
`alternates.canonical` per page; location pages must follow the same pattern with dynamic
absolute URLs from `absoluteUrl()`.

### 8.3 Crawl budget and sitemap design

Google crawl-budget guidance: sites with "unnecessarily high numbers of URLs that point to
identical or similar content" waste bandwidth and risk incomplete indexing. At JoinOrigin's
scale (thousands, not millions), crawl budget is **not the binding constraint** — index
quality is. Still:

- **Sitemap:** list only indexable canonical URLs. Use `sitemap.ts` (existing) extended
  with dynamic location entries; use a **sitemap index** only if >50K URLs (not now).
- **robots.txt:** keep `Allow: /` and `Disallow: /api/` (current baseline). Do not disallow
  `/locations` — that would block all location indexing.
- **lastmod:** Google uses `lastmod` only if consistently accurate. Use dataset update
  timestamps for location pages, not the static sprint release date.
- **Monitor:** Search Console Page Indexing report + Crawl Stats. If large fractions of
  generated pages are "Crawled – currently not indexed" or "Discovered – not indexed",
  either the pages are below quality bar or internal links are insufficient — both are
  fixable by design.

### 8.4 Localization and hreflang

Per the sibling localization report, the strategy is EN-first. When translated pages ship:
- Use **locale-specific subdirectories** (Google's recommended pattern for gTLD + locale):
  `https://joinorigin.com/es/locations/...` or per-locale prefix.
- Add reciprocal `hreflang` links on every localized page, plus `x-default` pointing to EN.
- Keep canonical in the same language; Google prefers hreflang-cluster URLs as canonical.
- Auto-translated pages (MT on-demand) are indexable, but **poor-quality MT increases
  duplicate/quality risk** — do not index MT output until quality bar is verified
  (see translation-services report for cost/quality trade-offs).

---

## 9. Concrete Recommendations for the Architect (TASK-303)

1. **URL scheme:** `/locations/<country>/<region>/<city>` and
   `/locations/<country>/<region>/<city>/<group-type>`; lowercase, hyphenated, no trailing
   slash; city slugs from the geodata dataset.
2. **Hub spine:** add `/locations` hub + country + region pages as pillar/topic-cluster
   nodes; every city page links up, to siblings, and to 2–4 content guides.
3. **Quality gate in the data layer:** before rendering, evaluate G1–G5 per city; mark page
   `indexable: true|false`. Only `indexable: true` pages are in sitemap and are
   `index,follow`; the rest are `noindex,follow` (still crawlable for future promotion).
4. **Tiered rollout:** launch Tier 1 flagship cities first (manual polish), then Tier 2;
   keep Tier 3 noindexed. Track Search Console.
5. **Canonical + hreflang discipline:** self-referential canonicals everywhere; hreflang +
   x-default when locales ship; never two URLs with identical content.
6. **No doorway pattern:** every page is a real destination with unique copy + data; CTAs
   are secondary. No "city → join funnel" pages.
7. **Sitemap/robots:** extend `sitemap.ts` with dynamic indexable location URLs; keep
   robots allowing `/locations`; noindex API/search surfaces.
8. **Content-engine coupling:** how-to guides and idea pages (content-strategy report) must
   link to city pages and be linked back — the mesh is bidirectional.
9. **Monitoring plan:** Search Console Index Coverage, Manual Actions, and Core Web Vitals
   on Tier 1 pages; set a "percentage of indexed vs generated" KPI.

---

## 10. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Scaled-content-abuse demotion from thousands of thin pages | Medium (if gates not enforced) | **Site-wide** | Enforce G1–G5; tiered indexation; waves; monitor Manual Actions |
| Doorway-abuse flag on city→CTA funnels | Low (if pages are real destinations) | High | No funnel pages; browsable hierarchy; real city content |
| Duplicate-content dilution (group-type variants too similar to city page) | Medium | Medium | Near-duplicate gate; canonicalize/noindex variants |
| Crawl budget waste on long tail | Low (thousands of pages) | Low | Sitemap lists only indexable; noindex long tail |
| Index bloat → site-wide quality signal drop | Medium | High | Selective indexation; prune non-indexed pages |
| hreflang errors when locales ship | Medium | Medium | Test hreflang reciprocity; x-default; one canonical per language |
| Low-quality MT hurting quality signals | Medium (later) | Medium | Don't index MT until quality verified (see MT report) |

---

## 11. Sources

### Google Search Central (official)
1. Google Spam Policies — doorway abuse, scaled content abuse, keyword stuffing, thin affiliation. https://developers.google.com/search/docs/essentials/spam-policies
2. Creating Helpful, Reliable, People-First Content (incl. scaled-content-abuse warning). https://developers.google.com/search/docs/fundamentals/creating-helpful-content
3. URL Structure Best Practices for Google Search. https://developers.google.com/search/docs/crawling-indexing/url-structure
4. How to Specify a Canonical with rel="canonical" and Other Methods. https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
5. Build and Submit a Sitemap; Manage Sitemaps with Sitemap Index File. https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap · https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps
6. Google Search Essentials — technical requirements. https://developers.google.com/search/docs/essentials

### Expert / industry
7. Ahrefs — Programmatic SEO, Explained for Beginners (Ryan Law). https://ahrefs.com/blog/programmatic-seo/
8. Ahrefs — Location Landing Pages: 6 Crucial Elements of Local Visibility (Despina Gavoyannis). https://ahrefs.com/blog/location-pages/
9. Ahrefs — Internal Links for SEO: An Actionable Guide (Chris Haines; John Mueller quotes). https://ahrefs.com/blog/internal-links-for-seo/
10. John Mueller (Google) on programmatic SEO, Aug 2023. https://twitter.com/JohnMu/status/1683881977529634816

### Internal (repo) context
11. `app/docs/design/sprint-4-seo-arch.md` — existing SEO architecture (canonical, sitemap, robots, llms.txt, ROUTES).
12. `app/docs/design/sprint-4-discovery.md` — existing page hierarchy, URL rules, keyword strategy.
13. `apps/web/lib/seo/routes.ts`, `apps/web/lib/seo/site.ts`, `apps/web/lib/seo/metadata.ts` — current single-source-of-truth SEO plumbing.

---

## 12. Navigation Footer

- **Up:** [`../README.md`](../README.md) — design docs index
- **Sibling research reports:** `sprint-11-market-competitor.md` · `sprint-11-geodata.md` · `sprint-11-content-strategy.md` · `sprint-11-localization.md` · `sprint-11-tech-feasibility.md` · `sprint-11-translation-services.md`
- **Consumer:** `arch-seo-content-engine` (TASK-303)
