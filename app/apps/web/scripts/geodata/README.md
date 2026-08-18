# geodata pipeline (TASK-306)

Builds the committed location snapshot
(`apps/web/lib/seo/data/locations.json`) from public data sources.

## Sources & licenses (design §5.1)

| Source | Use | License | Attribution |
|--------|-----|---------|-------------|
| GeoNames free dump (`cities500`, `countryInfo`, `admin1CodesASCII`, `alternateNamesV2`, `timeZones`) | Primary gazetteer: countries, admin1 regions, cities | CC BY 4.0 | Required (footer + NOTICE) |
| SimpleMaps World Cities Basic | Clean overlay: city names, capital tier | CC BY 4.0 | Required |
| Wikidata SPARQL | 21-locale localized labels (via `wkdt` QIDs) | CC0 | None required |

**No runtime third-party calls** — app pages read the committed snapshot only.

## Run

```bash
pnpm --filter @joinorigin/web geo:sync        # reuses .cache/ if present
pnpm --filter @joinorigin/web geo:sync --fresh
pnpm --filter @joinorigin/web geo:sync --skip-wikidata
```

Scope: all countries + all regions + cities with population ≥
`GEO_MIN_POPULATION` (default 100,000) OR capital/admin1 seats, so every
country/region keeps a representative city. `GEO_MIN_POPULATION=0` exports the
full 235K dump (Tier-3 long tail).

## Pipeline (design §5.3)

```
download → CLEAN → DEDUP → JOIN → OVERLAY → LOCALIZE → SNAPSHOT → MANUAL OVERRIDES
```

| Step | File | Rule |
|------|------|------|
| CLEAN | `clean.ts` | keep P-class feature codes (`PPLC, PPLA, PPLA2/3/4, PPL, …`) |
| DEDUP | `dedup.ts` | per (asciiname, country, admin1) keep highest population; flag `sameName` collisions |
| JOIN | `join.ts` | countryInfo (names/continent/capital/currency/languages/tld) + admin1CodesASCII (regions) + timeZones |
| OVERLAY | `overlay.ts` | SimpleMaps match (iso2+admin1+ascii; fallback name-unique; proximity) → cleaner names + capital |
| LOCALIZE | `localize.ts` | Wikidata labels (SPARQL, batched) → GeoNames alternate names → EN |
| SNAPSHOT | `snapshot.ts` | emit `locations.json` (deterministic version date) |
| MANUAL OVERRIDES | `manual-overrides.ts` | merge committed `manual-overrides.json` AFTER the build, BEFORE write — hand-added rows survive every run |

## Manual overrides (TASK-409)

`manual-overrides.json` holds hand-added city/region/country rows that the
pipeline would drop or mis-name:

- **Bengaluru** (geonameId 1277333, IN, region `in-19` Karnataka) — pipeline
  emits the row with a wrong `name`/`asciiName`; the override pins the canonical
  identity and preserves the pipeline's localization.
- **Singapore** (geonameId 1880251, SG, new region row `sg-00`) — GeoNames has
  no admin-1 for SG, so the pipeline scope step drops the city; both the city
  and a whole-country region row are hand-added.
- **Hong Kong** (geonameId 1819729, HK, unified city row) — the capital feature
  has no admin-1 in GeoNames and is dropped; the unified city row is hand-added
  under the existing `hk-hcw` (Central and Western) region.

Merge rules (`applyManualOverrides`, unit-tested): keyed by `iso2`/`id`/`id`;
override fields win, unmentioned pipeline fields are preserved; `names` is
merged per-locale and every new entity is filled to 21 locales (EN fallback);
new entities append at the end; superseded pipeline entities are logged via
`console.warn` (never silently overwritten). Re-running `geo:sync` keeps the
rows because the merge happens after every build.

## Unit tests

```bash
pnpm --filter @joinorigin/web test scripts/geodata
```

Covers CLEAN (P-class filter), DEDUP (dedup key + population + sameName),
JOIN (countryInfo/admin1/timeZones), SNAPSHOT (deterministic assembly + 21-locale
names) and MANUAL OVERRIDES (append/replace/merge rules, idempotency, supersede
reporting) with Andorra/US/DE/sample asserts (geodata §4).
