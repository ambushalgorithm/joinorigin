# Sprint 11 — SEO Content Engine Solution Design (Sprint 12 Implementation Blueprint)

> **Parent:** [`../README.md`](../README.md) · **Design docs index:** [`./README.md`](./README.md) ·
> **Producer:** `arch-seo-content-engine` (TASK-303) · **Consumers:** Sprint 12 execution roles
> (fe-geo-dataset, fe-seo-registry, fe-location-pages, fe-guides-pages, fe-i18n-seo-chrome,
> fe-sitemap-llms, e2e-seo-engine) · **Verifier:** `review-arch-seo-content-engine` ·
> **Research inputs (ALL 7):** `research/sprint-11-market-competitor.md` (TASK-296) ·
> `research/sprint-11-programmatic-seo.md` (TASK-297) · `research/sprint-11-geodata.md` (TASK-298) ·
> `research/sprint-11-content-strategy.md` (TASK-299) · `research/sprint-11-localization.md` (TASK-300) ·
> `research/sprint-11-tech-feasibility.md` (TASK-301) · `research/sprint-11-translation-services.md` (TASK-302)

> **Sprint 20 implementation update (2026-08-20, user-approved):** the "Explore
> community types" + "Communities in nearby cities" sections (§6.4 #3/#4, §8.5)
> and the group-type variant + idea pages (§6.5, §6.6) now apply to **EVERY city
> with committed content — tier-irrelevant** (EN 56 content cities + per-locale
> committed content: de 2, es 8, ar 3, hi 6, …). The registry
> (`apps/web/lib/seo/locationPages.ts`) emits variant + ideas entries for every
> content-rich city per locale via `listContentByKind('city', locale)` →
> `findCityBySlug`, and the view layer (`locationView.ts`) un-gated
> `groupTypeLinksFor()`/`buildLocationViewData()` so both sections render on every
> content city page. Indexability stays tier-gated (indexable = tier ≤ 2 AND
> G1–G5 pass; Tier-3 content pages e.g. Copenhagen render but stay noindex); the
> warm set is unchanged (hub + Tier-1 = NYC + Berlin). This aligns the
> implementation with §6.4/§8.5's "every city links 5–10 sibling cities".

---

## 1. Purpose

This document is the **solution design** for the JoinOrigin SEO Content Engine (Sprint 11
Story 1 — research + architecture only). It consumes **all seven** Sprint 11 research
reports, reconciles their findings into **one recommended approach**, and specifies **what
and how to implement in Sprint 12**: URL structure, dataset plan, page types, localization
strategy, Next.js routing/build approach, sitemap/llms.txt/ROUTES integration, and a
task/file-boundary implementation breakdown.

**Scope boundary:** design document only. Zero implementation files are edited by this role.
The Sprint 12 execution roles consume this document **verbatim** as their contract.

### 1.1 What this design decides (decision summary)

| #   | Decision               | Adopted approach                                                                                                                                                                                                                                            | Source reports reconciled                                |
| --- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| D1  | URL namespace          | `/location/<country>/<region>/<city>` + variants (user-approved brief; `singular` top-level segment)                                                                                                                                                        | brief vs programmatic-seo §4.3 (`/locations`)            |
| D2  | Slug form              | Full English kebab-case names (`united-states`, `texas`, `san-francisco`); ISO alpha-2 retained in the data model                                                                                                                                           | geodata §10 vs programmatic-seo §4.3                     |
| D3  | Dataset                | GeoNames (CC BY 4.0) primary + SimpleMaps Basic overlay (CC BY 4.0) + Wikidata localization (CC0); committed repo snapshot                                                                                                                                  | geodata §12                                              |
| D4  | Page types             | 3-layer hierarchy: L1 7 how-to guides · L2 hubs + glossary · L3 city pages + group-type variants + idea pages                                                                                                                                               | content-strategy §4                                      |
| D5  | Localization           | EN-first phase A (Sprint 12): EN canonical URLs, chrome localized via i18n `seoContent` namespace, no hreflang; phase B (Sprint 13+): curated translated subset + full hreflang                                                                             | localization R1–R8 vs translation-services §9            |
| D6  | MT-on-demand           | **Deferred.** No runtime MT in Sprint 12. Build-time MT + post-edit only for a curated phase-B subset                                                                                                                                                       | translation-services §3/§9 vs localization R5/R6         |
| D7  | Routing/build          | Hybrid: `generateStaticParams` warm set (hubs + Tier-1/2 flagships) + classic ISR on-demand long tail; `revalidateTag('geo')` invalidation; `cacheComponents` spike deferred                                                                                | tech-feasibility §6/§10                                  |
| D8  | Indexation             | Tiered + quality gates G1–G5; Tier-3/noindex until gates pass; sitemap lists only indexable pages                                                                                                                                                           | programmatic-seo §5/§8                                   |
| D9  | Single source of truth | `apps/web/lib/seo/locationPages.ts` registry consumed by `generateStaticParams`, `sitemap.ts`, metadata — ROUTES pattern extended                                                                                                                           | tech-feasibility §8.3                                    |
| D10 | Rollout                | Sprint 12 ships 8 Tier-1 flagship cities + ~30–50 Tier-2 + all hubs/guides/glossary; Tier-3 long tail noindexed. **Sprint 20:** sections + variant/idea pages emitted for every content-rich city, tier-irrelevant; indexability + warm set stay tier-gated | content-strategy §5.3, geodata §8, programmatic-seo §5.3 |

---

## 2. Executive Summary (the one recommended approach)

Build a **programmatic SEO Content Engine** on the owned domain, modeled on the
Meetup/Reddit "public discovery layer" playbook — not the Circle/Mighty Networks
login-walled model (market-competitor F1/F2). The engine is a **three-layer content
hierarchy** (content-strategy §4):

1. **L1 — Evergreen how-to guides** (7 hand-authored, human-edited): the authority +
   conversion layer that builds the domain authority city pages need to rank.
2. **L2 — Topic hubs + glossary** (manual hubs + auto-with-review glossary terms): topical
   authority, internal-link mesh backbone, AI-search answer surface.
3. **L3 — Programmatic location pages** (`/location/<country>/<region>/<city>` + group-type
   variants + "30 community event ideas in [City]" idea pages): long-tail local discovery
   at scale, **EN-first**, generated from a committed GeoNames+SimpleMaps+Wikidata snapshot
   behind quality gates.

**Every page must clear the "unique substance" bar** — real per-city data, unique copy,
honest presence claims, JSON-LD, internal links — or it is not indexed (programmatic-seo
§5.3, content-strategy §6). **No fake social proof ever** (market-competitor F3, Reddit
astroturfing case). **No MT pages in Sprint 12** — EN + Google Translated results + i18n
localized chrome deliver multilingual reach with zero penalty risk (localization §3.1.7,
translation-services §6.4).

**Sprint 12 ships small and validates before scaling:** 8 flagship cities with manual
polish + a small Tier-2 slice + the full L1/L2 surface, on the hybrid ISR architecture,
extending the existing `ROUTES`/sitemap/llms.txt single-source-of-truth pattern.
**Sprint 20:** rendering scope expanded to **every content-rich city, tier-irrelevant** —
the "Explore community types" + "Communities in nearby cities" sections and the group-type
variant/idea pages are emitted for all committed cities (see the update callout at the
top).

---

## 3. Reconciliation of Conflicting Research Findings

The seven reports agree on the core (public discovery layer, quality gates, EN-first,
unique data) but conflict on mechanics. The architect's resolution:

### 3.1 `/location` vs `/locations` (brief vs programmatic-seo §4.3)

- **Conflict:** the user-approved sprint brief fixes `/location/<country>/<region>/<city>`;
  programmatic-seo §4.3 recommends `/locations` (plural, as a directory name).
- **Resolution (D1): adopt `/location` (singular) exactly as the brief specifies.** The
  brief is the controlling contract for Sprint 12 execution roles. Google's URL guidance
  values descriptive words over plurality; the segment reads naturally as a directory
  ("location pages") and there is no measurable SEO delta between the forms. A top-level
  rename later is a one-line `ROUTES`-registry change, not a content change.

### 3.2 Country/region/city slugs: full names vs ISO codes (geodata vs programmatic-seo)

- **Conflict:** geodata §8 examples use ISO codes (`/location/us/texas/austin`,
  `/location/de/bayern`); programmatic-seo §4.3 uses full English names
  (`/locations/united-states/california/san-francisco`).
- **Resolution (D2): full English kebab-case names in the URL; ISO alpha-2 stays in the
  data model** as the stable join key (`iso2`, `regionId`). Rationale: Google's URL
  guidance prefers descriptive words ("communities in San Francisco" maps to the URL);
  Ahrefs' location-page anatomy lists a descriptive URL as element #1; the hierarchy
  (country→region→city) makes names unambiguous and human-readable; the dataset's
  `asciiName` fields make slugs deterministic. ISO codes are still emitted in JSON-LD
  (`Country`/`City` schema) and used for dataset joins — never in the path.

### 3.3 Tier sizing: 8 flagships vs 200–500 vs 25–50/500–2000 (content-strategy vs geodata vs programmatic-seo)

- **Conflict:** content-strategy §5.3 says start with 8 Tier-1 flagships; geodata §8 says
  Tier 1 ≈ 200–500 cities; programmatic-seo §5.3 says Tier 1 = 25–50, Tier 2 = 500–2000.
- **Resolution (D10): a unified 3-tier model, sized to "validate then scale":**

  | Tier                   | Definition                                             | Count                                 | Sprint 12 scope                                                                 | Indexation                       |
  | ---------------------- | ------------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------- |
  | **Tier 1 — Flagship**  | Manual-polish cities (content-strategy §5.3 shortlist) | 8 first wave; grow on signal          | **Ship 8** (NYC, SF/Bay, London, Berlin, Austin, Toronto, Singapore, Bengaluru) | `index, follow`                  |
  | **Tier 2 — Major**     | Auto-generated with rich template + human review       | ~30–50 in Sprint 12 (then up to ~250) | Ship a **small slice (~30)** to validate the template                           | `index, follow` if G1–G5 pass    |
  | **Tier 3 — Long tail** | Data-only small cities                                 | 235K in dataset                       | **Not published indexable**; rendered only when gates pass                      | `noindex, follow` until promoted |

  Promotion path: auto→flagship on GSC/link/waitlist signals (content-strategy §5.4).

  **Sprint 20 update:** tier now gates **indexability + warm-set prerendering only**, not
  page rendering/emission. City pages, both mesh sections ("Explore community types" +
  "Communities in nearby cities"), group-type variants, and idea pages are emitted and
  rendered for **every city with committed content** (Tier-1, Tier-2, or Tier-3 with
  content files) — see the Sprint 20 update callout at the top. Tier-3 content cities
  (e.g. Copenhagen) render their full surface but stay `noindex, follow`.

### 3.4 Idea-page placement (content-strategy vs programmatic-seo variant rules)

- **Conflict:** content-strategy §4.3 makes idea pages a **first-class city-page variant**;
  programmatic-seo §4.3/§5 only defines group-type variants and warns against
  near-duplicate variants.
- **Resolution:** idea pages are a first-class variant under the city:
  `/location/<country>/<region>/<city>/ideas`. They must carry **unique per-city listicle
  content** (city intro + 30 categorized ideas seeded per city + city data block + FAQ) so
  they pass G1–G5; they are not a copy of the city page. The variant slot
  (`[variant]`) hosts **both** group-type slugs and the reserved `ideas` slug (D1/D7).

### 3.5 MT-on-demand: do it cheaply vs don't publish MT pages (translation-services vs localization)

- **Conflict:** translation-services §3.3 shows full-catalog MT is affordable as a one-time
  build op ($5–15k worst case) and §5 says it is feasible; localization R1/R5/R6 says do
  **not** publish MT pages at scale — the EN + Translated-results path is cheaper, safer,
  and the marginal SEO value of MT pages is near-zero for thin content (Google already
  translates results).
- **Resolution (D6): MT is deferred, not rejected.** Sprint 12 ships phase A (EN canonical
  URLs + i18n chrome + Translated results). Phase B (Sprint 13+, curated subset only) uses
  **build-time MT + native post-edit gate** with the full SEO contract (unique per-locale
  URLs, bidirectional hreflang + `x-default`, sitemap alternates, visible MT disclosure).
  The full cost/feasibility/virality analysis is in §7.

### 3.6 hreflang now vs later (programmatic-seo §8.4 vs localization R3)

- **Conflict:** programmatic-seo says add hreflang when locales ship; localization R3 says
  **no hreflang in phase A** because one-sided hreflang is ignored by Google and adds
  maintenance debt without locale URLs.
- **Resolution:** localization wins — **no hreflang in phase A**; single canonical per
  page. hreflang + `x-default` + sitemap `<xhtml:link>` alternates arrive only in phase B
  when genuinely translated locale URLs exist. `x-default` → EN canonical is trivially
  valid later via Next.js `alternates.languages` (already confirmed in the installed
  Next 16.3, tech-feasibility §8.1).

### 3.7 Routing: all-at-build vs hybrid ISR (tech-feasibility)

- **Conflict:** geodata's snapshot implies deterministic build-time generation; the brief
  implies "thousands of pages"; tech-feasibility §7.1 shows **all-at-build breaks at scale**
  (O(P) build work, Vercel 45-min ceiling) and recommends hybrid.
- **Resolution (D7): hybrid.** `generateStaticParams` returns the warm set (all hubs,
  countries, regions, Tier-1/2 cities, all guides/glossary) at build; `dynamicParams:
true` (classic ISR) covers the long tail on first request then upgrades. `cacheComponents`
  (PPR) is evaluated on a spike branch but **not** enabled by default in Sprint 12
  (tech-feasibility §5.3/§10.2 — smaller delta, no Suspense discipline requirement).

### 3.8 Group-type variants: generate all vs only where differentiating (brief vs programmatic-seo)

- **Conflict:** the brief says "city×group-type variants"; programmatic-seo §4.3 warns that
  variants with identical copy are duplicate content.
- **Resolution:** generate a variant only when the template produces **real differentiating
  content** for that group-type in that city (venues, communities, how-tos). A fixed
  group-type taxonomy (≈10–14 types) is defined; a per-(city, type) near-duplicate gate
  (G5) decides index vs canonicalize-to-parent vs noindex. Sprint 12 generates variants
  only for Tier-1/2 cities where the seed data supports them.
  **Sprint 20 update:** the "only Tier-1/2" scoping is superseded — the registry now emits
  variant + idea pages for **every city with committed content**, tier-irrelevant
  (`locationPages.ts` iterates `listContentByKind('city', locale)` → `findCityBySlug`, not
  just `FLAGSHIP_CITIES`). G5 still decides index vs noindex per page; Tier-3 variants
  render but stay noindex.

---

## 4. URL Structure

### 4.1 Canonical URL scheme

```
/location                                    # locations hub (all countries) — indexable
/location/<country>                          # country page — indexable
/location/<country>/<region>                 # region page — indexable
/location/<country>/<region>/<city>          # city page — indexable if G1–G5 pass
/location/<country>/<region>/<city>/<variant> # group-type variant OR ideas — gate as above
/guides                                      # L2a Community Building hub — indexable
/guides/<slug>                               # L1 how-to guides (7) — indexable
/glossary                                    # L2b Community OS glossary hub — indexable
/glossary/<term>                             # glossary term pages — indexable
```

### 4.2 Slug rules (data-driven, deterministic)

- **Lowercase kebab-case**, ASCII, **no trailing slash**, no query params (programmatic-seo
  §4; Google URL guidance). Existing `ROUTES` convention preserved.
- Country slug = GeoNames `countryInfo.name` ASCII-ized (`united-states`, `germany`,
  `united-kingdom`, `netherlands`); region slug = `admin1CodesASCII` ASCII name
  (`texas`, `england`, `bayern`); city slug = GeoNames `asciiname` (`san-francisco`,
  `new-york`, `bengaluru`).
- **Uniqueness is enforced by the URL hierarchy**: same city name in two countries/regions
  is disambiguated by its parents (`/location/united-states/texas/austin` vs
  `/location/united-states/minnesota/austin`). The geodata dedup key (ascii name, country,
  admin1) guarantees one canonical URL per place (geodata §3.2).
- Group-type variant slug = fixed taxonomy key (see §4.4); idea page slug = reserved `ideas`.

### 4.3 URL examples

```
/location
/location/united-states
/location/united-states/california
/location/united-states/california/san-francisco
/location/united-states/california/san-francisco/startup-founders
/location/united-states/california/san-francisco/ideas
/location/germany/berlin
/location/germany/berlin/tech-meetups
/guides/start-a-community
/guides/organize-a-meetup
/glossary/community-manager
```

### 4.4 Group-type taxonomy (fixed; content-strategy §5.3 + whitepaper examples)

| Key                     | Display label (EN)    | Notes                                         |
| ----------------------- | --------------------- | --------------------------------------------- |
| `startup-founders`      | Startup founders      | Whitepaper example; flagship priority         |
| `ai-builders`           | AI builders           | Whitepaper example; SF/Austin/London priority |
| `local-neighborhoods`   | Local & neighborhood  | Universal; local intent                       |
| `professional-networks` | Professional networks | Industry-specific                             |
| `finance-quant`         | Finance & quant       | NYC/London priority                           |
| `book-clubs`            | Book clubs            | Universal                                     |
| `run-clubs`             | Running clubs         | Universal, venue-aware                        |
| `tech-meetups`          | Tech meetups          | Universal tech metros                         |
| `creative-design`       | Creative & design     | Berlin/London/NYC priority                    |
| `music-arts`            | Music & arts          | Austin/Nashville/Berlin priority              |
| `founders-cofounders`   | Co-founder matching   | Maps to product Core Object                   |
| `impact-local`          | Impact & volunteering | Local intent                                  |
| `families-parents`      | Families & parents    | Local intent                                  |
| `sports-fitness`        | Sports & fitness      | Universal                                     |

Sprint 12 generates variants only where seed data exists (Tier-1 flagships + small Tier-2
slice); the taxonomy is a config array, not code.

---

## 5. Dataset Plan

### 5.1 Sources & licensing (geodata §4, §12)

| Source                                                                                                                       | Use                                                                                       | License                                | Attribution                              |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------- |
| **GeoNames** free dump (`cities500.zip`, `countryInfo.txt`, `admin1CodesASCII.txt`, `alternateNamesV2.zip`, `timeZones.txt`) | Primary gazetteer: 252 countries, ~4,800 admin1 regions, 235,311 cities (>500 pop)        | **CC BY 4.0** (commercial use allowed) | Required — footer credit + NOTICE file   |
| **SimpleMaps World Cities Basic** (free)                                                                                     | Clean overlay for top 50K cities: `city_ascii`, admin names, capital flags, `ranking` 1–5 | **CC BY 4.0**                          | Required                                 |
| **Wikidata SPARQL**                                                                                                          | 21-locale localized names (labels), joined via QID from GeoNames alternate names          | **CC0** (public domain)                | None required (courtesy credit optional) |
| Natural Earth (optional, later)                                                                                              | Country/region outlines if maps are ever needed                                           | Public domain                          | None                                     |
| geoBoundaries (optional, later)                                                                                              | Admin1/2 polygons                                                                         | CC BY 4.0                              | Required if used                         |
| **Excluded**                                                                                                                 | GADM (non-commercial only); OSM as primary (ODbL share-alike + bulk-scrape policy)        | —                                      | —                                        |

**Budget: $0** for Sprint 12. Optional SimpleMaps Pro ($199 one-time) only if
zero-attribution is ever preferred (geodata §12.3).

### 5.2 Dataset schema (committed snapshot)

`apps/web/lib/seo/data/locations.json` + TS types in
`apps/web/lib/seo/data/types.ts` (geodata §10 schema, adapted):

```ts
interface LocationCountry {
  iso2: string; iso3: string; name: string; asciiName: string;
  continent: string; capital: string; population: number;
  currency: string; languages: string[]; tld: string; geonameId: number;
  names: Record<Locale, string>;            // 21 locales
}
interface LocationRegion {
  id: string;                                // `${iso2}-${admin1Code}` e.g. "us-tx"
  name: string; asciiName: string; countryIso2: string; admin1Code: string;
  geonameId: number; population?: number;
  names: Record<Locale, string>;
}
interface LocationCity {
  id: number;                                // geonameId
  qid?: string;                              // Wikidata QID
  name: string; asciiName: string;
  lat: number; lng: number;
  countryIso2: string; regionId: string;
  population?: number; timezone: string;
  featureCode: string;                       // PPLC | PPLA | ...
  capital: 'primary' | 'admin' | 'minor' | '';
  ranking?: 1 | 2 | 3 | 4 | 5;               // SimpleMaps
  sameName: boolean;
  names: Record<Locale, string>;
}
```

### 5.3 Pipeline (scripted; committed snapshot for deterministic builds)

```
GeoNames dump → 1. CLEAN (keep P-class feature codes) → 2. DEDUP (per ascii+country+admin1,
keep highest pop; flag sameName) → 3. JOIN (countryInfo/admin1/timeZones) → 4. OVERLAY
(SimpleMaps for top 50K: cleaner names + ranking) → 5. LOCALIZE (Wikidata labels; fallback
GeoNames alternate names; final fallback EN) → 6. POPULATE (Wikidata P1082 for Tier-1/2
gaps) → 7. SNAPSHOT (`locations.json` committed) → 8. ATTEST (NOTICE + footer credit)
```

The pipeline lives in `apps/web/scripts/geodata/*.ts` (or `scripts/` monorepo root —
executor's call, see §10) with a `pnpm --filter @joinorigin/web geo:sync` target. A monthly
re-sync re-downloads the GeoNames dump, re-runs cleaning, re-queries Wikidata for new
cities, and commits the regenerated snapshot. **No runtime third-party calls** — pages
read the committed snapshot only (deterministic builds, geodata §7, tech-feasibility §6.2).

### 5.4 Attribution (non-negotiable legal requirement)

- Footer credit on location pages: "Location data © GeoNames contributors, CC BY 4.0;
  city data © SimpleMaps (worldcities basic), CC BY 4.0."
- `NOTICE` file committed next to the dataset (`apps/web/lib/seo/data/NOTICE`).
- SimpleMaps + GeoNames CC BY 4.0 attribution is a licensing condition, not optional
  (geodata §5).

### 5.5 Maintenance & fallbacks

- Monthly scripted re-sync → commit snapshot; GeoNames also publishes daily deltas.
- Fallback chain if GeoNames ever goes down (2025 precedent): SimpleMaps Basic + Wikidata
  rebuild ~95% of the dataset (geodata §11).
- `lastmod` for sitemap/ISR derives from the **dataset version date**, never `new Date()`
  (tech-feasibility §6.2 — deterministic output).

---

## 6. Page Types & Content Design

### 6.1 Three-layer hierarchy (content-strategy §4.1)

```
joinorigin.com
├── L2a HUB — /guides (Community Building hub)  [manual]
│     ├── L1 /guides/start-a-community          [manual, 1,500–2,500 words]
│     ├── L1 /guides/organize-a-meetup
│     ├── L1 /guides/first-10-members
│     ├── L1 /guides/find-a-co-founder
│     ├── L1 /guides/keep-a-community-active
│     ├── L1 /guides/hybrid-communities
│     └── L1 /guides/moderation
├── L2b HUB — /glossary (Community OS glossary)  [manual hub + auto terms w/ review]
│     └── /glossary/<term>  (20–40 terms, 150–300 words each)
├── L3 /location + <country> + <region> + <city> [auto, quality-gated]
│     ├── /city/<variant>  (group-type variants) [auto, gated]
│     └── /city/ideas      ("30 community event ideas in [City]") [auto, gated]
└── (existing pages unchanged)
```

### 6.2 L1 how-to guides (Sprint 12 — all 7)

Manual, human-edited, template-assisted. Editorial rules (content-strategy §4.2):
single H1, definitional intro naming the topic + need, step-by-step structure, ≥150 words,
FAQ block mirrored in `FAQPage` JSON-LD, evergreen angles (no date-stamped framing),
honest "JoinOrigin can help" CTA (never overpromise), cross-links to hub + sibling guides +
relevant city pages. Refresh stats/examples annually.

### 6.3 L2 hubs + glossary (Sprint 12)

- `/guides` hub: pillar page linking all 7 guides + glossary + city pages (topic-cluster
  backbone).
- `/glossary` hub + 20–40 terms (seeded set from content-strategy §4.4: community,
  community manager, community OS, moderation, onboarding, activation, engagement loop,
  hybrid events, co-founder, …). Auto template + editorial review; 150–300 words;
  definitional format wins featured snippets + AI citations.

### 6.4 L3 city pages (Sprint 12 — 8 flagship + ~30 Tier-2; Sprint 20: every content-rich city)

Template anatomy (content-strategy §4/§6, programmatic-seo §5):

1. **Unique city intro** (from city dataset + editorial seed copy): what the city's
   community scene looks like — tech hubs, universities, industry clusters, notable
   venues/landmarks. No Wikipedia regurgitation (Ahrefs failure mode).
2. **City data block**: population, region, languages, country (from `locations.json`),
   formatted locale-aware (`toLocaleString(locale)`).
3. **Group-type links** to generated variants ("Explore community types") — emitted for
   every committed variant that passes G5, **for any content-rich city** (Sprint 20).
4. **Related links**: hub + ≥2 guides + sibling cities in the region (5–10) + parent
   region/country + `/location` hub (internal-link mesh, programmatic-seo §7.2). The
   "Communities in nearby cities" sibling block renders for every content-rich city,
   tier-irrelevant (Sprint 20 — aligns §8.5 "every city links 5–10 sibling cities").
5. **FAQ** (3–5 city-relevant Q&As) + `FAQPage` JSON-LD.
6. **Honest presence claim**: "Find or start a community in [City]" — never claims a local
   office/staff (content-strategy §6.2; doorway risk).
7. **Waitlist CTA** wired to `/api/leads` + analytics `trackEvent('signup_click', { source:
'location-city-<slug>' })`.

### 6.5 L3 group-type variants (Sprint 12 — flagship subset; Sprint 20: every content-rich city)

Generated only where real differentiator exists: e.g. "Startup communities in San
Francisco" (venues, communities, how-tos differ from "Running clubs in San Francisco").
If the near-duplicate gate (G5) fails, the variant is **canonicalized to the parent city
page or noindexed** — never published as near-identical copy (programmatic-seo §4.3/§5.3).
**Sprint 20 update:** emission is no longer flagship-scoped — every city with committed
`variantIntros` content emits variant pages (registry iterates all content-rich cities);
Tier-2 variants are indexable (ISR), Tier-3 variants render but stay noindex.

### 6.6 L3 idea pages (Sprint 12 — flagship subset; Sprint 20: every content-rich city)

`/city/ideas` — "30 community event ideas in [City]": city intro (editorial seed), 30
ideas grouped into 6 categories (Networking · Learning/workshops · Social/outdoor ·
Professional/industry · Creative/maker · Impact/local), each idea = 1–2 sentence pitch +
who it's for + suggested venue type; city data block; related links; 3–5 FAQ + `FAQPage`
JSON-LD; `ItemList` JSON-LD for the listicle. Honesty gate: venue/factual claims must be
true for any city or seeded per city with vetted copy (content-strategy §4.3).
**Sprint 20 update:** every content-rich city with a committed `ideaPage` emits its ideas
page — the "flagship subset" scope is superseded (idea-uniqueness rule still enforces
no cross-city reuse).

### 6.7 Quality gates (indexable or not — enforced at generation time)

Every L3 page must pass ALL of G1–G5 to be `index, follow` (programmatic-seo §5.3):

| Gate | Requirement                                                                                       | Enforcement                                                             |
| ---- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| G1   | ≥3 city-specific data points (population, region, languages, community signals, venue references) | Data layer check against `locations.json`                               |
| G2   | ≥1 unique city-specific prose section (≥150 words) — not name-swapped template                    | Template seed presence + copy length check                              |
| G3   | Real populated place from the dataset (never synthetic)                                           | Dataset lookup only                                                     |
| G4   | Intent match — page answers "communities in <city>" / "start <group-type> in <city>"              | Title/H1/meta include city + type; copy covers the intent               |
| G5   | No near-duplicate vs parent template (similarity check)                                           | Similarity threshold in registry; merge/canonicalize/noindex on failure |

Pages failing any gate are served with `robots: { index: false, follow: true }` and are
**omitted from the sitemap** (programmatic-seo §8.1, Google-endorsed exclusion). No
fabricated member counts, ratings, or communities anywhere (market-competitor §8.3).

---

## 7. Localization Strategy (21 locales, EN-first) + MT-On-Demand Trade-offs

### 7.1 Phase A (Sprint 12 — this design's scope)

- **All programmatic pages serve English body content at clean canonical URLs** with no
  locale segment. Chrome (nav, footer, headings, labels, CTAs, "Start a community in
  {{city}}") is localized via the existing cookie/Accept-Language resolution
  (`proxy.ts` + `I18nProvider`) — Google's documented "translate only the template"
  scenario (localization §3.1.1).
- **New `seoContent` chrome namespace** in `packages/i18n/locales/*.json` (en.json source
  of truth + 20 locale files; key parity enforced by `scripts/check-keys.ts`). Scope: a
  **small** namespace (~40–60 keys): hub/location labels, "Start a community in {{city}}",
  "communities in {{city}}", group-type display labels, FAQ headings, CTA copy, glossary
  intro. City **body copy stays in authored content files**, not locale JSONs
  (localization R2 — never conflate data/content with UI chrome).
- **No hreflang clusters** (localization R3): single self-referential canonical per page;
  `x-default` → EN only when phase B lands. Google's Translated results give multilingual
  SERP reach for the EN pages for free (localization §3.1.7).
- **RTL**: `ar`/`fa` chrome renders `dir="rtl"` automatically via `getDir()`; city stats
  use `toLocaleString(locale)` (localization R7). No additional work in phase A.
- **Do NOT** publish locale-prefixed URLs with untranslated body — that is the
  duplicate/doorway/scaled-content trap (localization §3.1.5–3.1.6).

### 7.2 Phase B (Sprint 13+ — designed now, not implemented)

- Curated subset: flagship cities × high-priority locales (es, pt-BR, fr, de, hi, id, ja,
  ko, zh-CN, ar, fa) at locale-prefixed subdirectory URLs (`/es/location/...`), with
  **genuinely translated body content** (human or MT+PEMT), full hreflang set (self + all
  variants + `x-default` → EN) via Next.js `alternates.languages`, sitemap
  `<xhtml:link rel="alternate">` entries, and a **visible machine-translation disclosure**
  (translation-services §6.2, localization R4).

### 7.3 MT-on-demand: cost / feasibility / virality trade-off analysis

Per translation-services §3/§5/§6/§7, reconciled with localization §3.5:

**Cost (build-time, one-time, cached — never per-pageview):**

| Scenario                                                                  | Volume      | Google NMT $20/1M | AWS $15/1M | Azure ~$10/1M | DeepL ~$27/1M    |
| ------------------------------------------------------------------------- | ----------- | ----------------- | ---------- | ------------- | ---------------- |
| Template-only chrome localization (recommended; ~1.8M chars × 20 locales) | 1.8M chars  | **~$36**          | ~$27       | ~$18          | n/a (locale gap) |
| Full-catalog MT, 1,000 pages × 20 locales                                 | 50M chars   | $1,000            | $750       | ~$500         | ~$1,350          |
| Full-catalog MT, 5,000 pages × 20 locales                                 | 250M chars  | $5,000            | $3,750     | ~$2,500       | ~$6,750          |
| Full-catalog MT, 10,000 pages × 20 locales                                | 500M chars  | $10,000           | $7,500     | ~$5,000       | ~$13,500         |
| Runtime per-pageview MT (anti-pattern)                                    | 5B chars/mo | **~$100K+/mo**    | —          | —             | —                |

Assumption: ~2,500 translatable chars per location-page-equivalent (translation-services
§3.2). The runtime path is **never used**.

**Feasibility (translation-services §4/§5):** technically feasible — all providers have
official Node SDKs fitting Next.js server components; batch APIs (Google `batchTranslateText`,
AWS Batch) are built for build-time translation; caching keyed by `hash(source)+locale`
makes cost one-time per content version. **Constraint:** DeepL does not cover `th`, `vi`,
`hi`, `fa` (4 of 20 locales including RTL `fa`) — a DeepL-only strategy is impossible for
the full 21-locale set; Google/AWS/Azure cover all 21.

**SEO trade-off (translation-services §6):** auto-translated pages ARE indexable when the
main content is genuinely translated (not duplicate); but **scaled content abuse** (Google
spam policy, site-wide demotion) explicitly names "translating" as a transformation that
triggers abuse when little value is added. Thin template + 20 translated locales = 21× thin
content. **Google already translates results** — the marginal SEO value of publishing MT
pages is positive only where target-locale search demand is high and the translation adds
local value; near-zero/negative for thin content.

**Virality (translation-services §7):** moderate positive for non-English community
sharing IF quality is gated and labeled; brand-critical copy must stay
human/community-translated (already true for the UI chrome); bad MT screenshots are a
reputation risk. The i18n-chrome phase A already delivers the "local feel" without the
body-copy risk.

**Decision (D6):** Sprint 12 does **not** implement MT. Chrome localization (~$36
equivalent, effectively free via the existing 20-locale translator pipeline) + EN body +
Google Translated results capture ~90% of the multilingual benefit at ~0% penalty risk.
Phase B MT (Google NMT v3 or AWS; $500–7,500 one-time for a curated 1–5K-page subset) is
the approved follow-up when flagship pages prove demand. This is the reconciliation of
translation-services "it's affordable and feasible" with localization's "don't publish MT
at scale" — **cheap is not the same as safe; defer until quality gates and locale demand
are proven.**

---

## 8. Next.js Routing / Build Approach

### 8.1 File structure (App Router, Next 16.3 / React 19.2.8 / Turbopack)

```
apps/web/app/
├── location/
│   ├── page.tsx                                    # /location hub (static-ish, warm)
│   ├── [country]/page.tsx                          # country page
│   ├── [country]/[region]/page.tsx                 # region page
│   ├── [country]/[region]/[city]/page.tsx          # city page
│   ├── [country]/[region]/[city]/[variant]/page.tsx # group-type + ideas variants
│   └── layout.tsx (optional shared LocationBreadcrumbs)
├── guides/
│   ├── page.tsx                                    # L2a hub
│   └── [slug]/page.tsx                             # 7 how-to guides
├── glossary/
│   ├── page.tsx                                    # L2b hub
│   └── [term]/page.tsx                             # glossary terms
└── (existing pages unchanged)
```

### 8.2 Dynamic segments & `generateStaticParams` (tech-feasibility §4)

- Segments map 1:1: `app/location/[country]/[region]/[city]/page.tsx` etc.
- **`params` is a Promise in Next 15+/16** — pages `await params` (typed via
  `PageProps<'/location/[country]/[region]/[city]'>`).
- **Warm set at build** (hybrid, D7; unchanged by Sprint 20):
  - `/location`, all country + region pages → **always** prerendered (they are the
    browsable hierarchy, programmatic-seo §7.2).
  - City pages + variants → prerender **Tier-1 flagships + the Tier-2 slice** (those that
    pass G1–G5); the long tail is generated on first request via ISR then upgraded.
    **Sprint 20:** the registry now _emits_ every content-rich city's pages (tier-
    irrelevant); the warm-set _prerender_ filter (`isWarmSetEntry` = hub + Tier-1) is
    unchanged, so Tier-2/3 content pages render via ISR on first request.
  - All guides + glossary terms → prerendered (manual content, small fixed set).
- `generateStaticParams` reads the committed `locations.json` snapshot (in-memory
  iteration; `fetch` memoization makes dataset reads effectively free at build,
  tech-feasibility §4.1).
- **`dynamicParams: true`** (default) covers unlisted params on demand; a
  `__placeholder__` + `notFound()` guard is used if Cache-Components ever requires ≥1 param
  (tech-feasibility §4.1 — only relevant on the PPR spike).
- Unknown/synthetic slugs (not in the dataset) → `notFound()` (G3 enforcement).

### 8.3 ISR / revalidation (tech-feasibility §6.3)

1. **Primary: on-demand tag revalidation keyed to dataset version.** The geo sync pipeline
   (or a CI webhook) bumps the dataset version and calls `revalidateTag('geo')` (or
   `revalidatePath('/location')`) — exact, cheap, no regeneration storm.
2. **Fallback: generous time-based revalidate** — `export const revalidate = 2592000`
   (≈30 days) on location routes so pages self-heal if the webhook is missed.
3. **Deterministic output:** all titles, `lastmod`, JSON-LD, breadcrumbs derive from the
   dataset + template; **no `new Date()`/`Math.random()`** in page or sitemap output
   (prevents ISR write churn, tech-feasibility §6.2).
4. **`cacheComponents` (PPR): spike only.** Evaluate on a branch with the e2e/build matrix
   before enabling site-wide (stricter build validation, `dynamicParams` removal, existing
   8 pages may need Suspense wraps — tech-feasibility §5.3/§10.2). Default = classic ISR.

### 8.4 Single source of truth — the location-page registry (tech-feasibility §8.3)

New module `apps/web/lib/seo/locationPages.ts` (sibling of `routes.ts`) exposing:

```ts
interface LocationPageEntry {
  params: { country: string; region?: string; city?: string; variant?: string };
  path: string;                // '/location/united-states/california/san-francisco'
  title: string;               // 'Communities in San Francisco, California | JoinOrigin'
  description: string;
  tier: 1 | 2 | 3;
  indexable: boolean;          // G1–G5 result
  lastModified: string;        // dataset version date (deterministic)
  priority: number;            // sitemap priority
  groupType?: string;          // variant key or 'ideas'
}
export function locationPageEntries(): LocationPageEntry[];  // derived from locations.json
```

- `generateStaticParams` → `locationPageEntries().map(e => e.params)` (filtered by warm-set
  policy).
- `sitemap.ts` → `[...ROUTES, ...locationPageEntries().filter(e => e.indexable)]`.
- Metadata builder → per-page `createMetadata({ title, description, path, ... })` from the
  same entry (canonical + OG + robots).
- **Invariant preserved:** one definition of a URL, three outputs (page, sitemap, metadata)
  can never disagree (tech-feasibility §8.3).
- **Sprint 20 (TASK-471):** the registry loop is generalized — variant + ideas entries are
  emitted for **every content-rich city per locale** via `listContentByKind('city', locale)`
  → `findCityBySlug`, not just `FLAGSHIP_CITIES`. Flagship config overrides are retained;
  non-flagship tier = `tierForCitySlug(slug)`. All flagship paths are preserved exactly.

### 8.5 Internal-link mesh (programmatic-seo §7, derived from the hierarchy)

- Up-links: city → region → country → `/location` hub (breadcrumbs + contextual).
- Sibling cluster: every city links 5–10 sibling cities in the same region ("Communities
  in nearby cities") — computed from `locations.json` (same regionId). **Sprint 20:** the
  cluster renders for every content-rich city, tier-irrelevant (flagship or not) — the
  implementation's `siblingCitiesFor()` + `groupTypeLinksFor()` are un-gated, so both
  mesh sections exist on every committed city page.
- Cross-links: every city links 2–4 relevant guides (`/guides/start-a-community`,
  `/guides/organize-a-meetup`, ...) and its idea page; guides link back to flagships.
- No orphan pages: every generated page reachable via hierarchy or the mesh; sitemap is a
  weak discovery signal, internal links are primary.

### 8.6 Build performance & hosting (tech-feasibility §9)

- **Sprint 12 gate:** capture `next build` wall time + route table at the current 8 pages;
  re-measure with the warm set (≈50–100 pages) and at 1k/10k params on a spike branch
  (`next build --debug-build-paths="app/location/**/page.tsx"`). Target <10 min build.
- Hosting: unchanged — `output: 'standalone'` Docker (TASK-238) or Vercel. ISR needs the
  Node.js runtime (already true post-TASK-288). Multi-replica self-hosted ISR needs a
  shared cache handler — defer until scale-out (tech-feasibility §6.2).

---

## 9. Sitemap / llms.txt / ROUTES Integration

### 9.1 `sitemap.ts`

- Extend the existing route handler: `[...ROUTES, ...locationPageEntries().filter(indexable)]`
  with deterministic `lastModified` pinned to the **dataset version date** (never
  `new Date()`), changeFrequency/priority from the entry (hubs weekly; city pages monthly;
  Tier-3 omitted).
- No `generateSitemaps` splitting until URL count approaches 50K (tech-feasibility §8.1);
  add `alternates.languages` per URL in phase B only.
- The sitemap **can never drift** from live pages because it derives from the same registry
  `generateStaticParams` uses (tech-feasibility §8.3).

### 9.2 `robots.ts` — unchanged

`Allow: /`, `Disallow: /api/`, sitemap link intact. **Never disallow `/location`** — that
would block all location indexing (programmatic-seo §8.3).

### 9.3 `llms.txt` — curated, not exhaustive (tech-feasibility §8.2)

- Extend `LLMS_ENTRIES` with a **Locations** section listing the hub + 8 flagships (stable,
  LLM-parseable URLs), a **Guides** section (all 7), and a **Glossary** section (hub +
  core terms).
- **Do not** enumerate the long tail — the file must stay ~2 KB (llms.txt v2 context-window
  intent). The sitemap is the exhaustive index. Optionally add scoped hub-level llms.txt
  later (spec-aligned).

### 9.4 Metadata & JSON-LD

- Per-page `createMetadata()` from the registry entry; self-referential canonical; robots
  from the gate (`index: false` for non-indexable pages, programmatic-seo §8.1).
- JSON-LD: `BreadcrumbList` on every location/guide/glossary page (existing builder,
  `jsonLd.ts`), `FAQPage` where FAQ blocks exist (mirrored 1:1), `ItemList` for idea
  pages; `Organization`/`WebSite` remain mounted in the root layout. City pages may add
  `City`/`Country` schema from the dataset (structured, parseable — AI/GEO-ready,
  market-competitor §7.4).

---

## 10. Sprint 12 Implementation Breakdown (task / file boundaries)

Execution roles consume this design **verbatim**. Task order matters: dataset first, then
registry, then pages, then i18n/sitemap, then validation. Each task keeps the existing
matrix green (lint 5/5, typecheck 5/5, unit 5/5, e2e, web prod build).

| #   | Task (role)            | Deliverable / file boundaries                                                                                                                                                                                                                                                                                                                                                                                                                                      | Dependencies     | Acceptance                                                                                                |
| --- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | --------------------------------------------------------------------------------------------------------- |
| 1   | **fe-geo-dataset**     | `apps/web/scripts/geodata/` pipeline: download → clean → dedup → join → overlay → localize → snapshot. Commits `apps/web/lib/seo/data/locations.json` (+ `types.ts`, `NOTICE`, `README`). `pnpm --filter @joinorigin/web geo:sync` target. Unit tests for clean/dedup/join rules (Andorra/US/DE sample asserts per geodata §4). **No routes/pages**                                                                                                                | —                | Snapshot committed; schema matches §5.2; attribution present; tests green                                 |
| 2   | **fe-seo-registry**    | `apps/web/lib/seo/locationPages.ts` + `apps/web/lib/seo/locationData.ts` (snapshot loader + tier config + group-type taxonomy + city seed copy model). G1–G5 gate functions + unit tests (near-duplicate check, intent-match, indexable flag). **No routes yet**                                                                                                                                                                                                   | Task 1           | Registry derives from snapshot; gates tested; `locationPageEntries()` returns correct params/paths/titles |
| 3   | **fe-location-pages**  | `apps/web/app/location/**` dynamic routes: hub/country/region/city/variant pages; `generateStaticParams` (warm set), `await params`, `dynamicParams`, `revalidate = 2592000`, metadata from registry, JSON-LD (BreadcrumbList/FAQPage/ItemList), internal-link mesh, waitlist CTA, noindex enforcement for Tier-3/failed gates, `notFound()` for unknown slugs. Unit + e2e (hub→country→region→city→variant navigation; canonical; robots meta)                    | Task 2           | All routes render; gates enforced; e2e green; build time measured (baseline gate §8.6)                    |
| 4   | **fe-guides-pages**    | Author 7 L1 guides + `/guides` hub + `/glossary` hub + 20–40 glossary terms as **content files + page wrappers** (`apps/web/app/guides/**`, `apps/web/app/glossary/**`); metadata, FAQPage JSON-LD, cross-links to location pages + each other; waitlist CTA. Unit tests (content presence, ≥150 words, single H1)                                                                                                                                                 | —                | All L1/L2 pages live; content quality gates pass; tests green                                             |
| 5   | **fe-i18n-seo-chrome** | Add `seoContent.*` namespace to `packages/i18n/locales/en.json` + all 20 locale files (key parity via `scripts/check-keys.ts` — extend script for the new namespace if needed); wire chrome consumption in location/guide/glossary pages; RTL/`toLocaleString` verified. **Body copy stays in content files, not locale JSONs**                                                                                                                                    | Task 3, 4        | 21-locale parity green; pages render localized chrome per cookie; no body keys in dictionaries            |
| 6   | **fe-sitemap-llms**    | Extend `apps/web/app/sitemap.ts` with `locationPageEntries().filter(indexable)` + deterministic `lastModified` (dataset version); extend `lib/seo/llms.ts` with curated Locations/Guides/Glossary sections; robots.ts untouched. Unit/e2e (sitemap ↔ pages parity; llms.txt curated; robots unchanged)                                                                                                                                                             | Task 2           | Sitemap lists exactly indexable pages; llms.txt ≤ ~2 KB curated; parity tests green                       |
| 7   | **e2e-seo-engine**     | Validation-only audit of merged master: full matrix (lint/typecheck/unit all packages/e2e/web prod build); live checks — Tier-1 city page renders + canonical + FAQPage JSON-LD; Tier-3 page noindexed; sitemap parity (every sitemap URL 200s, every indexable page in sitemap); llms.txt curated; hreflang absent (phase A); locale chrome switches by cookie; build-time gate recorded. Record PASS/FAIL in `agent-core/handoffs/joinorigin-dev/test-report.md` | Tasks 1–6 merged | All criteria PASS or flagged WITH routing; no source edits; leads.csv header-only                         |

### 10.1 Sprint 12 sequencing & gate

1. Task 1 → 2 (data + registry) must land first (everything depends on the snapshot).
2. Task 3 + 4 can proceed in parallel after 2; Task 5 + 6 follow; Task 7 validates.
3. **Build-metrics gate** (tech-feasibility §9.1): record the 8-page baseline now, and the
   warm-set build time with Task 3. If warm-set build exceeds the target (<10 min), reduce
   the prerendered set and lean on ISR — the architecture already supports it.
4. **Deferred to Sprint 13+:** phase-B localized URLs + hreflang + MT pipeline; utility
   generators (community/group name generators — market-competitor §8.4; high ROI, low
   risk, but out of Sprint 12 scope per content-strategy open question #1); comparison
   pages ("community platform alternatives" — needs product/brand sign-off); OSM/geoBoundary
   polygons; live community-data injection hooks (templates already accept it — the
   Meetup/Reddit freshness loop).

> **Sprint 20 update:** the Sprint 12 scope rows above (8 flagships + Tier-2 slice) are the
> original blueprint; the Sprint 20 user-approved change supersedes the _emission/rendering_
> scoping — see the update callout at the top and §3.3/§3.8/§6.4–§6.6/§8.2/§8.4/§8.5.

---

## 11. Risk Register

| Risk                                               | Likelihood                        | Impact        | Mitigation                                                                                                                   |
| -------------------------------------------------- | --------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Scaled-content-abuse demotion (site-wide)          | Medium if gates not enforced      | **Site-wide** | G1–G5 enforced at generation; tiered indexation; noindex long tail; waves; monitor GSC Manual Actions (programmatic-seo §10) |
| Doorway-abuse flag on city pages                   | Low (pages are real destinations) | High          | Real unique city content; browsable hierarchy; honest presence claims; CTA secondary (programmatic-seo §6.1)                 |
| Duplicate content from group-type variants         | Medium                            | Medium        | G5 near-duplicate gate; canonicalize/noindex failures (programmatic-seo §6.2)                                                |
| MT pages triggering scaled-content abuse (phase B) | Medium (later)                    | Site-wide     | EN-first phase A; phase B curated + post-edit + disclosure + hreflang (translation-services §6.3)                            |
| Index bloat / low indexation ratio                 | Medium                            | High          | Selective indexation; sitemap hygiene; GSC Page Indexing monitoring; prune noindexed (programmatic-seo §8.3)                 |
| GeoNames shutdown (2025 precedent)                 | HIGH (long-term)                  | High          | Vendor-independent committed snapshot; SimpleMaps + Wikidata rebuild path (geodata §11)                                      |
| CC BY 4.0 attribution forgotten                    | Low                               | Legal         | Automated footer credit + NOTICE file in dataset package (geodata §5)                                                        |
| Build time explodes with warm set                  | Low (warm set ≈ 100 pages)        | Medium        | Hybrid ISR; measure at 1k/10k params; `--debug-build-paths` iteration (tech-feasibility §9.1)                                |
| Multi-instance ISR staleness (self-hosted)         | Low (single instance now)         | Medium        | Defer shared cache handler until scale-out (tech-feasibility §6.2)                                                           |
| Fake social proof on pages                         | Low (never authored)              | High          | Hard rule: real data only; "coming soon" labels; no fabricated counts (market-competitor §8.3)                               |

---

## 12. Sources

- **Sprint 11 research (all 7, consumed):**
  - `app/docs/design/research/sprint-11-market-competitor.md` (TASK-296) — discovery-layer
    model, spam-policy evidence, virality loops, gaps.
  - `app/docs/design/research/sprint-11-programmatic-seo.md` (TASK-297) — URL structure,
    quality gates G1–G5, tiering, indexation, internal-link mesh, crawl budget.
  - `app/docs/design/research/sprint-11-geodata.md` (TASK-298) — GeoNames/SimpleMaps/
    Wikidata dataset plan, licensing, pipeline, schema, scale math.
  - `app/docs/design/research/sprint-11-content-strategy.md` (TASK-299) — 3-layer content
    hierarchy, 7 guides, idea-page format, glossary, flagship shortlist.
  - `app/docs/design/research/sprint-11-localization.md` (TASK-300) — EN-first phase A/B,
    hreflang, i18n fit, translation sourcing, R1–R8.
  - `app/docs/design/research/sprint-11-tech-feasibility.md` (TASK-301) — Next 16 dynamic
    segments, hybrid ISR, cacheComponents spike, registry pattern, sitemap/llms.txt.
  - `app/docs/design/research/sprint-11-translation-services.md` (TASK-302) — MT cost
    models, provider comparison, SEO/virality trade-offs, caching strategy.
- **Repo design baselines:** `app/docs/design/sprint-4-seo-arch.md` (metadata/sitemap/
  JSON-LD/llms.txt patterns), `app/docs/design/sprint-4-discovery.md` (keyword strategy),
  `app/docs/design/sprint-9-i18n-arch.md` (21-locale matrix, check-keys contract).
- **Repo code (referenced, unchanged):** `apps/web/lib/seo/routes.ts`, `sitemap.ts`,
  `llms.ts`, `metadata.ts`, `site.ts`, `url.ts`, `jsonLd.ts`; `apps/web/app/robots.ts`;
  `packages/i18n/src/{resolve,loader}.ts`; `packages/i18n/locales/*.json`.
- External evidence is cited inline within each research report (Google Search Central
  spam policies, Ahrefs, Semrush, Meetup/Reddit/Substack/Circle/Mighty Networks, etc.).

---

## 13. Open Questions for PM / Product (not blockers)

| #   | Question                                                           | Recommendation                                                                                                         |
| --- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | Utility generators ("community name generator") — Sprint 12 or 13? | Defer to Sprint 13 (high ROI, low risk; market-competitor §8.4)                                                        |
| 2   | Comparison pages ("community platform alternatives")?              | Needs product/brand sign-off (competitor brand names on the site); defer                                               |
| 3   | Waitlist CTA analytics source taxonomy                             | Use `trackEvent('signup_click', { source: 'location-…'                                                                 | 'guide-…' | 'glossary-…' })` per content-strategy §8.6 |
| 4   | Phase-B locale/city priority                                       | Flagships × high-demand locales (es, pt-BR, fr, de, hi, id, ja, ko, zh-CN, ar, fa) — decide in Sprint 13 with GSC data |
| 5   | Live-data injection hooks (real groups/members post-launch)        | Templates + registry designed to accept real community data later (freshness loop); no wiring in Sprint 12             |

---

## 14. Navigation Footer

- **Up:** [`../README.md`](../README.md) (design docs index) · [`../../README.md`](../../README.md) (docs index)
- **Research series (Sprint 11):** [`./research/README.md`](./research/README.md)
- **Consumers (Sprint 12):** `fe-geo-dataset` · `fe-seo-registry` · `fe-location-pages` · `fe-guides-pages` · `fe-i18n-seo-chrome` · `fe-sitemap-llms` · `e2e-seo-engine`
- **Verifier:** `review-arch-seo-content-engine`
