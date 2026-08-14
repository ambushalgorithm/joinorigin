# Sprint 11 — Geodata Research: Clean Country/Region/City Datasets for Programmatic Location Pages

> **Parent:** [`../README.md`](../README.md) · **Design docs index:** [`./README.md`](./README.md) · **Producer:** `research-geodata` (TASK-298) · **Consumer:** `arch-seo-content-engine` (TASK-303) · **Related research:** `sprint-11-programmatic-seo.md` (URL/indexation), `sprint-11-localization.md` (21-locale strategy), `sprint-11-content-strategy.md` (page types)

## 1. Purpose

This report answers one question for the Sprint 12 SEO Content Engine: **where does JoinOrigin get a clean, legally-safe, maintainable dataset of countries, regions, and cities** to power programmatic location pages (`/location/<country>/<region>/<city>` + city×group-type variants)?

It evaluates the realistic candidates — GeoNames, OpenStreetMap, Natural Earth, Wikidata, SimpleMaps, geoBoundaries, GADM, UN World Urbanization Prospects — and scores them on the criteria that actually matter for a **community-discovery product**:

1. **Licensing** — commercial use, attribution, share-alike obligations, redistribution rights.
2. **Cleanliness** — dedup, consistent naming (ASCII + localized), hierarchical integrity (city → region → country), slug-ability.
3. **Data size & scale** — how many pages can be generated at each tier.
4. **Freshness & update cadence** — how stale the data gets, how hard sync is.
5. **Maintenance burden** — what it costs to keep the dataset correct over time.
6. **Community-discovery value** — which cities/regions deserve priority pages first.

This is a **research document only**. It recommends a dataset plan; the architect (TASK-303) turns it into a solution design. No implementation files were edited.

---

## 2. Executive Summary (TL;DR)

| # | Finding | Recommendation |
|---|---------|----------------|
| 1 | **GeoNames free dump is the best primary source.** Alive and operated by Unxos GmbH (post-2025 rescue), CC BY 4.0, daily updates, free download, 235,311 cities in `cities500` (>500 pop) with coordinates, population, country, admin1/2 codes, timezone, alternate names. | **Primary:** GeoNames dump (`cities500.zip` + `countryInfo.txt` + `admin1CodesASCII.txt` + `alternateNamesV2.zip` + `timeZones.txt`), CC BY 4.0, attribution required. |
| 2 | **GeoNames is not "clean" out of the box** — name collisions across countries/states, legacy FIPS admin codes, population gaps for small towns, no importance metric. A deterministic cleaning pass is required (feature-code filter → dedup → population fill → hierarchy join). | Treat GeoNames as raw material; the pipeline (Sprint 12) owns the cleaning rules. |
| 3 | **SimpleMaps World Cities Basic is the cleanest free cross-check** — 50,192 prominent cities, curated from authoritative sources, `city_ascii`, admin names, capital flags, importance ranking 1–5, CC BY 4.0 (free) or no-attribution Pro ($199 one-time). | Use as curated overlay for the top ~50K cities; buy Pro only if we want zero attribution + 2M cities. |
| 4 | **Wikidata is the best localization source** — CC0 (public domain), SPARQL returns localized labels per language; verified working. GeoNames alternate names already carry Wikidata QIDs. | Use Wikidata SPARQL to fetch 21-locale city/region/country names at build time. |
| 5 | **Boundaries (optional)**: Natural Earth (public domain) for country/region outlines; geoBoundaries (CC BY 4.0) for admin1/admin2 polygons. | Only if maps/geometry are needed in Sprint 12+. Names alone do not require either. |
| 6 | **GADM is OUT** — explicitly non-commercial-only; commercial use requires permission. **OSM-derived data is a poor primary** — ODbL share-alike complicates a derived database; Overpass/Nominatim usage policies forbid bulk scraping. | Exclude GADM; use OSM only as enrichment with ODbL obligations documented, or skip entirely. |
| 7 | **Population freshness**: UN World Urbanization Prospects 2025 (open API + CSV) provides authoritative agglomeration populations for ~2,000 largest cities. | Optional enrichment for top-tier pages; GeoNames/Wikidata cover most needs. |
| 8 | **Scale plan**: 252 country entries (243 sovereign) → ~4,800 admin1 regions → 235K cities (full), 6,213 cities >100K pop (core), 560 cities >1M pop (flagship). Start with **Tier 1 ≈ 200–500 flagship cities**, grow to Tier 2 (6,213), then Tier 3 (235K). | Prioritize community-hub cities (tech/startup/college/diaspora), not pure population. |
| 9 | **Maintenance is cheap**: GeoNames files are small (13–400 MB zipped); a monthly full re-sync or daily delta application keeps data fresh. Store a snapshot in-repo (JSON/TS) so builds are deterministic. | Monthly re-sync + git snapshot; document provenance in `NOTICE`/attribution. |
| 10 | **Supply risk**: GeoNames nearly shut down in 2025; Unxos GmbH currently operates it. | Mitigate: keep SimpleMaps Basic + Wikidata as fallbacks; vendor-independent local snapshot. |

**Bottom line:** Build the location dataset as **GeoNames-derived (CC BY 4.0) with SimpleMaps Basic overlay (CC BY 4.0) + Wikidata localization (CC0)**. This combination is free, commercially usable with simple attribution, globally complete, localization-ready for all 21 locales, and refreshable at near-zero cost.

---

## 3. Requirements for a Community-Discovery Product

The dataset must support the page types planned by the content strategy (`sprint-11-content-strategy.md`): country pages, region pages, city pages, and city×group-type variants (e.g. "startup communities in Berlin", "running clubs in Austin").

### 3.1 Minimum fields per entity

| Entity | Required fields | Use |
|--------|----------------|-----|
| Country | ISO-3166 alpha-2/3, name, ASCII name, continent, capital, population, currency, languages, tld | Country pages, URL segment, JSON-LD `Country` |
| Region (admin1) | Name, ASCII name, parent country, admin code, population (best-effort) | Region pages, URL segment, breadcrumbs |
| City | Name, ASCII name, coordinates (lat/lng WGS84), country, admin1, population, timezone, feature class/code, capital flag, importance | City pages, JSON-LD `City`, proximity queries, map embeds |
| Localized names | 21-locale display names (ar, de, en, es, fa, fr, hi, id, it, ja, ko, nl, pl, pt-BR, ru, th, tr, uk, vi, zh-CN, zh-TW) | hreflang + localized titles/metadata |
| Stable ID | GeoNames geonameId (int) + Wikidata QID (string) | Joins, dedup, updates |

### 3.2 Quality bar

- **No duplicate city pages**: same city must not appear twice (e.g. "Paris" TX vs FR; "Sydney" CA vs AU). Dedup key = (ascii name, country, admin1) with a priority rule.
- **Deterministic slugs**: ASCII, lowercase, hyphenated; uniqueness enforced by the URL hierarchy.
- **Hierarchy integrity**: every city resolves to exactly one country and one admin1; every admin1 to one country.
- **Attribution-ready**: we must be able to display a small credit (e.g. footer "Location data © GeoNames, CC BY 4.0").

---

## 4. Candidate Sources (with evidence)

### 4.1 GeoNames — **primary recommendation**

**Status (verified 2026-08-13):** `geonames.org` is live, operated by Unxos GmbH ("by unxos gmbh" footer), and still distributes the free gazetteer dump. The service survived the 2025 shutdown crisis under new ownership.

**License:** Creative Commons Attribution 4.0 (CC BY 4.0) — **commercial use allowed**, attribution required. From the dump readme: *"This work is licensed under a Creative Commons Attribution 4.0 License… The Data is provided 'as is' without warranty."*

**Files (verified live on 2026-08-14, dump timestamps 2026-08-14 04:01–04:15 CET):**

| File | Size | Content |
|------|------|---------|
| `cities500.zip` | 13.5 MB (verified) | **235,311 cities** with pop >500 or seats of adm div (verified line count) — name, asciiname, alternatenames, lat/lng, feature class/code, country, admin1–4, population, elevation, dem, timezone, modification date |
| `cities1000.zip` | 10 MB | ~130K cities pop >1000 |
| `cities5000.zip` | 5.3 MB | ~50K cities pop >5000 |
| `cities15000.zip` | 3.2 MB | ~25K cities pop >15000 |
| `allCountries.zip` | 401 MB | All ~11M geonames (all feature classes) |
| `countryInfo.txt` | 31 KB / 302 lines | **252 entries (243 countries + dependent territories)** (ISO, ISO3, numeric, FIPS, name, capital, area, population, continent, tld, currency, phone, postal regex, languages, geonameid, neighbours) — verified header/schema |
| `admin1CodesASCII.txt` | 148 KB | Admin1 codes + English names (~4,800 regions) |
| `admin2Codes.txt` | 2.3 MB | Admin2 codes + names |
| `alternateNamesV2.zip` | 193 MB | Alternate names with ISO language codes (incl. `wkdt` = Wikidata QID links) — **this is the localization goldmine** |
| `timeZones.txt` | 14 KB | countryCode, tz id, offsets |
| `shapes_simplified_low.zip` / `.json` | 1.2–1.3 MB | Simplified country boundaries (GeoJSON) |
| `modifications-<date>.txt`, `deletes-<date>.txt` | ~40 B–119 KB | **Daily delta files** for incremental sync |

**Data sources** (geonames.org/datasources): mostly public-domain government sources (NGA/NIMA, USGS, statistical offices) — no proprietary encumbrance.

**Quality assessment (sampled):**
- Population coverage: **204,650 / 235,311 (87%)** rows have population >0; **6,213 cities >100K**; **560 cities >1M** (verified from the actual dump).
- Coordinates: present on every row (WGS84 decimal).
- Name collisions exist across countries (e.g. "Dubai" appears in IN, "Paris" in CA) — must be disambiguated by country+admin1.
- Admin1 codes are **FIPS for most countries** (legacy; ISO codes for US/CH/BE/ME) — a known wart; SimpleMaps admin names (GENC/ISO 3166-2) can cross-check.
- Population for small towns is often missing (the Andorra sample showed empty pop for towns <1,500).

**Freshness / cadence:** dump regenerated **daily**; delta files for yesterday's modifications/deletions. Excellent.

**Maintenance burden:** LOW. Monthly full re-sync (13 MB zip) or daily deltas. Snapshot into the repo for deterministic builds.

**Cost:** $0 (dump). Optional premium web services are paid but not needed.

### 4.2 OpenStreetMap / Geofabrik / Overpass / Nominatim — **not recommended as primary**

**License:** ODbL 1.0 (verified at openstreetmap.org/copyright). You may copy, distribute, transmit, adapt **with attribution**; if you alter/build upon the data, **derivative works must be distributed under the same license (share-alike)**.

**Access paths:**
- Geofabrik extracts (download.geofabrik.de): daily `.osm.pbf` per continent/country (Europe 32.4 GB, North America 17.9 GB, Asia 15.1 GB) — huge, requires osmium/osmfilter processing to extract `place=city/town/village` nodes.
- Overpass API: queryable but has **usage policy** (no bulk downloading; heavy queries prohibited).
- Nominatim: **usage policy caps at ~1 req/sec**, no bulk — unsuitable as a data source for thousands of pages.

**Assessment:** Excellent geometry source, but for our need (a clean country/region/city **table**) it is heavy and legally sticky: a derived database from OSM must be ODbL, which complicates any future redistribution of our location dataset. GeoNames/Wikidata/SimpleMaps already provide the same names+coords with lighter licenses. **Use OSM only if we need fine-grained polygons (city-level boundaries), and document the ODbL share-alike obligation.**

### 4.3 Natural Earth — **recommended for optional boundaries**

**License:** **Public domain** (verified naturalearthdata.com terms): *"All versions of Natural Earth… are in the public domain. You may use the maps in any manner… No permission is needed… Crediting the authors is unnecessary."*

**Content:** Admin-0 countries, admin-1 states/provinces, populated places (with POP_MAX/POP_MIN, NAME, ADM0NAME/ADM1NAME) at 1:10m/1:50m/1:110m. Scale is coarse (10m ≈ ~243 countries, ~4,800 admin1, ~7K populated places) but perfectly adequate for country/region **names and outlines**.

**Freshness:** versioned releases (v5.1.x era); updated every few years. **Low cadence — fine for static location pages.**

**Maintenance:** near-zero. Public domain = no attribution legal burden (optional courtesy credit).

### 4.4 Wikidata — **recommended for 21-locale localization**

**License:** **CC0 / public domain** for structured data (verified on Wikidata main page: *"All structured data from the main, Property, Lexeme, and EntitySchema namespaces is available under the Creative Commons CC0 License"*). 122.9M entities.

**Access:** SPARQL query service (`query.wikidata.org`) — **verified working** (probe returned German labels + populations for German cities). Relevant properties: `wdt:P31` (instance of) → `wd:Q515` (city), `wdt:P17` (country), `wdt:P131` (admin division), `wdt:P1082` (population), `wdt:P625` (coords), `wdt:P36` (capital).

**Why it matters for this product:** the SEO engine must localize city/region/country names across **21 locales**. Wikidata labels give us those names for free and reliably (better coverage than GeoNames alternate names for some locales). GeoNames `alternateNamesV2` already carries `wkdt` entries linking geonameId → QID, giving us the join key.

**Assessment:** PERFECT fit for localization + ID linking; CC0 means zero attribution. Watch out for **noise**: population statements vary in vintage, some items lack labels in rare locales, and quality is uneven for small towns. Use it as enrichment over GeoNames, not as the primary gazetteer.

### 4.5 SimpleMaps World Cities — **recommended as clean curated overlay**

**Status (verified 2026-08-13):** refreshed **August 13, 2026** — one day before this report. 248 countries, fields: `city`, `city_ascii`, `city_alt`, `city_local`, `lat`, `lng`, `country`, `iso2`, `iso3`, `admin_name`, `admin_name_ascii`, `admin_code`, `admin_type`, `capital` (primary/admin/minor), `density`, `population`, `population_proper`, `timezone`, `ranking` (1–5 importance), `same_name`, `id`.

**Licensing tiers (verified):**
| Tier | Entries | Price | License | Attribution |
|------|---------|-------|---------|-------------|
| **Basic** | 50.2K prominent cities | **Free** | CC BY 4.0 | Required |
| Pro | 2.0M cities/towns | $199 one-time | Permissive, no redistribution | Not required |
| Comprehensive | 4.4M places | $499 one-time | Permissive, no redistribution | Not required |

Updates: Basic "not guaranteed"; Pro includes 12 months; Comprehensive 24 months (renewals $99/$199). Sources: NGA, USGS, US Census, NASA — "public domain and permissively-licensed sources."

**Assessment:** This is the **cleanest turnkey city table** — one row per city, ASCII slugs, admin names in ISO-3166-2 style, capital flags, importance ranking. The free Basic tier (50K cities) is more than enough for Tier 1–2 pages. It overlaps with GeoNames but is far cleaner for names/admin; the `ranking` field is a ready-made prioritization signal. **$0–499 is trivial vs. the engineering time saved.**

### 4.6 geoBoundaries — **optional admin boundaries**

**License:** **CC BY 4.0** (verified geoboundaries.org): commercial use allowed, attribution required ("acknowledgement… in any products you produce").

**Content:** political administrative boundaries (ADM0/ADM1/ADM2) for every country — ~1M boundaries across 200+ entities, standardized formats, individual country files + global composites + simplified files.

**Assessment:** Best free source if we ever need **city/region polygons** (map embeds, geofencing). Overkill for pure name-based pages. CC BY 4.0 attribution is easy.

### 4.7 GADM — **EXCLUDED**

**License (verified gadm.org/license.html):** *"The data are freely available for academic use and other non-commercial use. Redistribution or commercial use is not allowed without prior permission."*

**Assessment:** JoinOrigin is a commercial product — GADM cannot be used without a paid permission agreement. **Exclude.** (Natural Earth + geoBoundaries cover the same needs under permissive licenses.)

### 4.8 UN World Urbanization Prospects (WUP 2025) — **optional population enrichment**

**Status (verified 2026-08-13):** 2025 Revision live at population.un.org/wup; **Data Portal with open API** + CSV bulk download; consistent with World Population Prospects 2024.

**Content:** urban/rural populations + ~2,000 major urban agglomerations 1950–2050.

**License:** UN data terms — free to use, attribution appreciated; no share-alike. (UN data products are generally usable commercially with attribution.)

**Assessment:** Nice-to-have for authoritative top-city populations; GeoNames/Wikidata suffice for v1. Skip unless page copy needs "metro area population" precision.

### 4.9 Other candidates considered (and set aside)

| Source | Verdict | Why |
|--------|---------|-----|
| ISO 3166-1 (official) | Skip | Paid; GeoNames countryInfo already carries ISO codes (CC BY 4.0) |
| CLDR (Unicode) | Optional | CC-BY 4.0; useful for **country names in 21 locales** (complement to Wikidata) |
| World Bank / UN M49 | Optional | Free (CC-BY 4.0); region groupings if we want continental hubs |
| Wikipedia dumps | Skip | CC BY-SA — share-alike is worse than GeoNames/Wikidata for our derived dataset |
| CIA World Factbook | Optional | Public domain; country descriptions for long-form copy, not core dataset |

---

## 5. Licensing Assessment Summary

| Source | Commercial use | Attribution | Share-alike | Redistribution of derived DB | Verdict |
|--------|---------------|-------------|-------------|------------------------------|---------|
| **GeoNames** | ✅ Yes | ✅ CC BY 4.0 | ❌ No | ✅ Allowed (with attribution + license note) | **PRIMARY** |
| **Wikidata** | ✅ Yes | ❌ None needed (CC0) | ❌ No | ✅ Allowed (CC0) | **Localization** |
| **SimpleMaps Basic** | ✅ Yes | ✅ CC BY 4.0 | ❌ No | ✅ Allowed (with attribution) | **Clean overlay** |
| SimpleMaps Pro/Comp | ✅ Yes | ❌ Not required | ❌ No | ⚠️ No public redistribution of the DB itself (internal use + derived product OK) | Optional purchase |
| **Natural Earth** | ✅ Yes | ❌ Not required (PD) | ❌ No | ✅ Allowed | **Boundaries (PD)** |
| **geoBoundaries** | ✅ Yes | ✅ CC BY 4.0 | ❌ No | ✅ Allowed (with attribution) | **Boundaries (opt)** |
| GADM | ❌ No (non-commercial only) | n/a | n/a | ❌ No | **EXCLUDED** |
| OpenStreetMap/Geofabrik | ✅ Yes | ✅ ODbL attribution | ⚠️ **Yes — derived DBs must be ODbL** | ⚠️ Derived DB must remain ODbL | Only as enrichment |
| UN WUP | ✅ Yes | ✅ courtesy | ❌ No | ✅ Allowed | Optional enrichment |

**Attribution implementation (recommended):** a site footer line + a `NOTICE` file in the dataset package, e.g. *"Location data © GeoNames contributors, CC BY 4.0; city data © SimpleMaps (worldcities basic), CC BY 4.0."* For Wikidata/NE no attribution is legally required, but a courtesy credit is good practice.

---

## 6. Cleanliness Comparison

| Criterion | GeoNames | SimpleMaps | Wikidata | OSM | Natural Earth |
|-----------|----------|-----------|----------|-----|---------------|
| Dedup ready | ⚠️ collisions across countries/states | ✅ one row per city | ⚠️ multiple items per concept | ⚠️ nodes+relations | ✅ curated |
| ASCII names | ✅ `asciiname` | ✅ `city_ascii` | ⚠️ label per locale | ✅ `name:en` | ✅ |
| Hierarchy (city→region→country) | ✅ via admin1/2 codes + countryInfo | ✅ admin_name/admin_code | ✅ P17/P131 | ⚠️ relations | ✅ |
| Population | ⚠️ 87% coverage; gaps in small towns | ⚠️ only prominent cities | ⚠️ uneven vintage | ⚠️ sparse | ✅ POP_MAX |
| Localized names (21 locales) | ⚠️ alternateNamesV2 partial | ⚠️ city_local only (few) | ✅ **best** | ✅ name:<lang> | ⚠️ few |
| Importance/priority signal | ❌ none (infer from pop) | ✅ **ranking 1–5** | ⚠️ P1082 only | ❌ | ❌ |
| Coordinates | ✅ WGS84 | ✅ WGS84 | ✅ P625 | ✅ | ✅ |

**Conclusion:** no single source is clean enough alone; the winning combo is **GeoNames (breadth) + SimpleMaps (cleanliness/priority) + Wikidata (localization)** with GeoNames as the backbone.

---

## 7. Freshness, Update Cadence & Maintenance Burden

| Source | Cadence | Refresh cost | Maintenance burden |
|--------|---------|--------------|--------------------|
| GeoNames dump | **Daily** (verified 2026-08-14 timestamps + daily delta files) | 13 MB zip monthly; deltas for day-level | LOW — scripted download + import; snapshot in git |
| SimpleMaps Basic | Annual-ish (last: 2026-08-13) | One-time download; updates not guaranteed on Basic | VERY LOW — static CSV in repo |
| Wikidata | Continuous (live SPARQL) | Query at build time for changed/added cities | LOW-MED — rate-limited SPARQL; cache results |
| Natural Earth | Versioned (v5.1.x era) | Rare (multi-year) | VERY LOW — static files |
| geoBoundaries | Versioned | Rare | VERY LOW — static files |
| UN WUP | 2025 rev (next ~2030) | Rare | VERY LOW — static CSV |

**Recommended pipeline cadence (Sprint 12+):** a script (CI job or make target) that re-downloads GeoNames dump monthly, re-imports, re-applies cleaning, re-runs the Wikidata localization query for new cities, and commits the regenerated `locations.json`/TS snapshot. Cost: minutes/month. Deterministic builds from the committed snapshot; no runtime third-party calls.

---

## 8. Scale & Page-Count Math

| Tier | Dataset | Count | Example page types |
|------|---------|-------|--------------------|
| Countries | countryInfo | **252 (243 sovereign + territories)** | `/location/us`, `/location/de` |
| Regions | admin1 | **~4,800** | `/location/us/texas`, `/location/de/bayern` |
| Flagship cities | pop >1M | **560** | `/location/us/texas/austin` + variants |
| Core cities | pop >100K | **6,213** | Tier 2 expansion |
| All cities | cities500 (>500 pop) | **235,311** | Tier 3 long-tail (SEO doorway risk — see programmatic-seo report) |

**Recommendation:** do **not** launch with 235K pages. Launch Tier 1 (≈200–500 flagship community hubs), validate indexation/quality per the programmatic-SEO research, then expand to 6,213 (Tier 2) and only later the long tail.

---

## 9. Prioritization for Community-Discovery

Community activity correlates with **density of organizers**, not just population. Priority heuristics (ordered):

1. **Tech/startup ecosystems** — startup density (SF Bay, NYC, London, Berlin, Bangalore, Tel Aviv, Austin, Toronto, Singapore, Amsterdam, Stockholm, Paris, Shanghai, Seoul, Tokyo, Sydney, Melbourne, Dubai, São Paulo, Mexico City).
2. **University/college cities** — student populations drive community formation (Boston, Austin, Ann Arbor, Cambridge, Heidelberg, Leuven, Waterloo, Kyoto, etc.).
3. **Diaspora/migration hubs** — high foreign-born share → interest in "new to city" communities (Toronto, Vancouver, Sydney, London, NYC, Dubai, Auckland, Düsseldorf, Stuttgart).
4. **Large metro population** as tie-breaker (UN WUP / GeoNames).
5. **21-locale country weighting** — the product's existing locales (ar, de, en, es, fa, fr, hi, id, it, ja, ko, nl, pl, pt-BR, ru, th, tr, uk, vi, zh-CN, zh-TW) give an EN-first rollout a head start; prioritize the home countries of those locales for localized pages (DE, ES, FR, IN, ID, IT, JP, KR, NL, PL, BR, RU, TH, TR, UA, VN, CN, TW, IR, SA/EG etc.).
6. **EN-first bias** — English-speaking metros (US/UK/CA/AU/IN/NZ/IE/SG) should dominate Tier 1 since auto-generated content is EN-first; other locales get EN pages initially (see localization research).

**Tier 1 draft (illustrative, ~250 cities):** US (NYC, SF, LA, Chicago, Austin, Seattle, Boston, Miami, Denver, Atlanta, Toronto), UK (London, Manchester, Berlin, Amsterdam, Paris, Barcelona, Madrid), AU (Sydney, Melbourne), IN (Bangalore, Mumbai, Delhi, Hyderabad, Pune), JP (Tokyo, Osaka), KR (Seoul), BR (São Paulo, Rio), MX (Mexico City), ID (Jakarta, Bandung), plus regional tech hubs (Tel Aviv, Singapore, Dubai, Stockholm, Oslo, Helsinki, Copenhagen, Dublin, Zurich, Warsaw, Prague, Lisbon, Istanbul, Kyiv, Ho Chi Minh City, Bangkok, Taipei, Shanghai, Shenzhen).

---

## 10. Recommended Data Pipeline (for the architect)

```
GeoNames dump (cities500 + countryInfo + admin1CodesASCII + alternateNamesV2 + timeZones)
        │  CC BY 4.0
        ▼
 1. CLEAN: filter feature codes → keep P-class populated places
        (PPL, PPLA, PPLA2, PPLA3, PPLA4, PPLC, PPLS, PPLG, PPLH, PPLL, PPLQ, PPLR, PPLW, PPLX)
        ▼
 2. DEDUP: prefer PPLC > PPLA > PPLA2 > PPLA3 > PPLA4 > PPL; per (asciiname, country, admin1)
        keep highest population; flag `same_name` collisions
        ▼
 3. JOIN: countryInfo → country names; admin1CodesASCII → region names; timeZones → tz id
        ▼
 4. OVERLAY: SimpleMaps Basic (CC BY 4.0) → city_ascii/admin_name/ranking/capital for top 50K
        (match on iso2+admin_name+ascii city; use SimpleMaps names when they differ for cleanliness)
        ▼
 5. LOCALIZE: Wikidata SPARQL (CC0) → 21-locale labels for country/region/city
        (join key: Wikidata QID, available in GeoNames alternateNamesV2 `wkdt` rows)
        fallback: GeoNames alternate names; final fallback: EN name
        ▼
 6. POPULATE: fill missing populations from Wikidata P1082 / UN WUP for Tier 1-2 cities
        ▼
 7. SNAPSHOT: emit `apps/web/lib/seo/data/locations.json` (+ TS types) — committed to repo
        ▼
 8. ATTEST: NOTICE + footer attribution ("Location data © GeoNames, CC BY 4.0" etc.)
```

Schema suggestion (feeding TASK-303):

```ts
interface LocationCountry {
  iso2: string; iso3: string; name: string; asciiName: string;
  continent: string; capital: string; population: number;
  currency: string; languages: string[]; tld: string; geonameId: number;
  names: Record<Locale, string>; // 21 locales
}
interface LocationRegion {
  id: string;            // `${country}-${admin1Code}` e.g. "us-tx"
  name: string; asciiName: string; countryIso2: string; admin1Code: string;
  geonameId: number; population?: number;
  names: Record<Locale, string>;
}
interface LocationCity {
  id: number;            // geonameId
  qid?: string;          // Wikidata QID
  name: string; asciiName: string;
  lat: number; lng: number;
  countryIso2: string; regionId: string;
  population?: number; timezone: string;
  featureCode: string;   // PPLC | PPLA | ...
  capital: 'primary' | 'admin' | 'minor' | '';
  ranking?: 1 | 2 | 3 | 4 | 5;  // SimpleMaps
  sameName: boolean;
  names: Record<Locale, string>;
}
```

---

## 11. Risks & Fallbacks

| Risk | Severity | Mitigation |
|------|----------|------------|
| GeoNames shutdown/ownership change (2025 precedent) | HIGH | Vendor-independent snapshot in git; SimpleMaps Basic + Wikidata can rebuild 95% of the dataset |
| FIPS admin codes drift/rename | MED | Join by admin1 code but store `admin1 name` snapshot; refresh on re-sync |
| Name collisions → duplicate pages | HIGH | Dedup key + `sameName` flag; URL hierarchy disambiguates (see programmatic-seo research) |
| Wikidata label gaps in rare locales | LOW | Fallback chain: Wikidata → GeoNames alternate names → EN |
| ODbL contamination from OSM enrichment | MED | If OSM polygons are added, keep them as a separately-attested layer; do not merge into the main GeoNames-derived table |
| CC BY 4.0 attribution forgotten | LOW | Automated footer credit + NOTICE file in dataset package |

---

## 12. Final Recommendations

1. **Primary source: GeoNames free dump** (`cities500.zip` + `countryInfo.txt` + `admin1CodesASCII.txt` + `admin2Codes.txt` + `alternateNamesV2.zip` + `timeZones.txt`) — CC BY 4.0, free, daily updates, 235K cities verified.
2. **Clean overlay: SimpleMaps World Cities Basic** (free, CC BY 4.0, 50.2K prominent cities, ranking 1–5). Buy Pro ($199) later only if zero-attribution matters.
3. **Localization: Wikidata SPARQL** (CC0) for 21-locale names, joined via QID from GeoNames alternate names; fallback to GeoNames alternate names, then EN.
4. **Boundaries (only if maps needed): Natural Earth** (public domain) + **geoBoundaries** (CC BY 4.0).
5. **Population enrichment (optional): UN WUP 2025** for top ~2,000 agglomerations.
6. **Exclude GADM** (non-commercial only). **Do not use OSM as primary** (ODbL share-alike + bulk-scraping policy); OSM only as a separate attested polygon layer if ever needed.
7. **Rollout: Tier 1 (≈200–500 community hubs) → Tier 2 (6,213 cities >100K) → Tier 3 (235K long-tail)** — sized to the indexation/quality guidance in the programmatic-SEO research.
8. **Maintenance: monthly scripted re-sync → commit snapshot; automated attribution in footer + NOTICE.**

---

## 13. Evidence & Sources (accessed 2026-08-13/14)

- GeoNames dump index + readme: https://download.geonames.org/export/dump/ (timestamps 2026-08-14; `cities500.zip` 13.5 MB; `allCountries.zip` 401 MB; `countryInfo.txt` 31 KB; daily `modifications-`/`deletes-` files)
- GeoNames homepage (Unxos GmbH operator, CC BY 4.0 footer): https://www.geonames.org/
- GeoNames data sources (public-domain government inputs): https://www.geonames.org/datasources/
- **Verified locally:** downloaded `cities500.zip` (13,523,956 B) → 235,311 rows; sampled Andorra/DE/GB/FR/IN/JP/MX rows (coords, pop, admin1, tz); coverage stats: 204,650 rows pop>0, 6,213 pop>100K, 560 pop>1M; `countryInfo.txt` 302 lines with 252 data rows (243 sovereign countries + dependent territories; schema verified).
- OpenStreetMap copyright/license (ODbL 1.0, share-alike): https://www.openstreetmap.org/copyright
- Geofabrik download server (daily extracts, ODbL): https://download.geofabrik.de/
- Natural Earth terms (public domain): https://www.naturalearthdata.com/about/terms-of-use/
- Wikidata main page (CC0 for structured data; 122,902,688 entities): https://www.wikidata.org/
- **Verified locally:** SPARQL probe `query.wikidata.org` returned localized (de) labels + P1082 populations for German cities — endpoint operational.
- SimpleMaps World Cities (2026-08-13 refresh; Basic free CC BY 4.0 / Pro $199 / Comprehensive $499; field list): https://simplemaps.com/data/world-cities
- geoBoundaries (CC BY 4.0, ~1M boundaries, 200+ entities): https://www.geoboundaries.org/
- GADM license (non-commercial only): https://gadm.org/license.html
- UN World Urbanization Prospects 2025 (Data Portal + open API + CSV bulk download): https://population.un.org/wup/

---

## 14. Handoff to Architect (TASK-303)

The architect should treat this report as the **dataset plan**: source = GeoNames (CC BY 4.0) + SimpleMaps Basic (CC BY 4.0) + Wikidata (CC0); pipeline = clean → dedup → join → overlay → localize → snapshot; schema = `LocationCountry` / `LocationRegion` / `LocationCity` (section 10); rollout = Tier 1 → 2 → 3. Budget note: $0 (optionally $199 for SimpleMaps Pro if zero-attribution is preferred). Attribution is a **non-negotiable legal requirement** for GeoNames + SimpleMaps Basic; the design must include a footer credit and NOTICE file.
