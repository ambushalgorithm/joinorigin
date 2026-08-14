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
download → CLEAN → DEDUP → JOIN → OVERLAY → LOCALIZE → SNAPSHOT
```

| Step | File | Rule |
|------|------|------|
| CLEAN | `clean.ts` | keep P-class feature codes (`PPLC, PPLA, PPLA2/3/4, PPL, …`) |
| DEDUP | `dedup.ts` | per (asciiname, country, admin1) keep highest population; flag `sameName` collisions |
| JOIN | `join.ts` | countryInfo (names/continent/capital/currency/languages/tld) + admin1CodesASCII (regions) + timeZones |
| OVERLAY | `overlay.ts` | SimpleMaps match (iso2+admin1+ascii; fallback name-unique; proximity) → cleaner names + capital |
| LOCALIZE | `localize.ts` | Wikidata labels (SPARQL, batched) → GeoNames alternate names → EN |
| SNAPSHOT | `snapshot.ts` | emit `locations.json` (deterministic version date) |

## Unit tests

```bash
pnpm --filter @joinorigin/web test scripts/geodata
```

Covers CLEAN (P-class filter), DEDUP (dedup key + population + sameName) and
JOIN (countryInfo/admin1/timeZones) rules with Andorra/US/DE sample asserts
(geodata §4).
