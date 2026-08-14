# JoinOrigin Location Dataset

Committed snapshot backing the SEO location pages (`/location/<country>/<region>/<city>`,
design §5.2 of `app/docs/design/sprint-11-seo-content-engine.md`).

## Files

| File | Purpose |
|------|---------|
| `locations.json` | The committed dataset snapshot (countries + regions + cities). |
| `types.ts` | `LocationCountry` / `LocationRegion` / `LocationCity` schema + `LocationSnapshot` + `LOCATION_ATTRIBUTION`. |
| `NOTICE` | Required CC BY 4.0 attribution for GeoNames + SimpleMaps. |

## Schema (design §5.2)

- **Country**: ISO alpha-2/3, name/asciiName, continent, capital, population,
  currency, languages, tld, GeoNames id, 21-locale `names`.
- **Region** (admin-1): id `${iso2}-${admin1Code}` (e.g. `us-tx`), name,
  country, admin1 code, GeoNames id, `names`.
- **City**: GeoNames id, optional Wikidata QID, name/asciiName, lat/lng,
  country + region id, population, timezone, GeoNames feature code
  (`PPLC`/`PPLA`/`PPLA2`/`PPLA3`/`PPLA4`/`PPL`/…), SimpleMaps capital tier,
  optional SimpleMaps `ranking` (1–5), `sameName` collision flag, `names`.

`names` is a 21-locale record (`ar, de, en, es, fa, fr, hi, id, it, ja, ko,
nl, pl, pt-BR, ru, th, tr, uk, vi, zh-CN, zh-TW`) resolved as Wikidata label →
GeoNames alternate name → EN fallback.

## Regenerating the snapshot

```bash
pnpm --filter @joinorigin/web geo:sync
```

Options (pass after `geo:sync`):
- `--fresh` — re-download all sources (default: reuse the `.cache/` dir).
- `--skip-wikidata` — skip the SPARQL query; fall back to GeoNames alternate
  names + EN (offline mode).
- `GEO_MIN_POPULATION=0` — export the full 235K-city dump (Tier-3 long tail).
  Default scope: countries + regions + cities with population ≥ 100,000 OR
  capital/admin1 seats (hierarchy stays complete for every country/region).

Pipeline (design §5.3): download → CLEAN (keep P-class) → DEDUP
(asciiname+country+admin1, highest population) → JOIN (countryInfo/admin1/
timeZones) → OVERLAY (SimpleMaps Basic) → LOCALIZE (Wikidata SPARQL, fallback
GeoNames alternate names, fallback EN) → SNAPSHOT.

## Attribution (non-negotiable — see NOTICE)

Location data © GeoNames contributors, CC BY 4.0; city data © SimpleMaps
(worldcities basic), CC BY 4.0. Import `LOCATION_ATTRIBUTION` from
`types.ts` for the exact footer credit string.

## Usage from app code

Pages read the committed snapshot only (no runtime third-party calls):

```ts
import locations from './locations.json';
// locations.countries, locations.regions, locations.cities
```
