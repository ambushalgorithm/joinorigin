/**
 * Geodata pipeline configuration (TASK-306).
 *
 * Sources (design §5.1 — all verified live 2026-08-14):
 *  - GeoNames free dump (CC BY 4.0): cities500, countryInfo, admin1CodesASCII,
 *    alternateNamesV2, timeZones.
 *  - SimpleMaps World Cities Basic (CC BY 4.0): worldcities.csv.
 *  - Wikidata SPARQL (CC0): 21-locale labels via GeoNames `wkdt` QIDs.
 */

import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Directory of this module (`apps/web/scripts/geodata`). */
export const SCRIPT_DIR = fileURLToPath(new URL('.', import.meta.url));

/** Default cache dir for downloaded sources (gitignored via `.gitignore`). */
export const DEFAULT_CACHE_DIR = join(SCRIPT_DIR, '.cache');

/** Committed snapshot output. */
export const SNAPSHOT_PATH = join(SCRIPT_DIR, '..', '..', 'lib', 'seo', 'data', 'locations.json');

export const GEONAMES_BASE = 'https://download.geonames.org/export/dump';

export const GEONAMES_FILES: Record<string, string> = {
  cities500: `${GEONAMES_BASE}/cities500.zip`,
  countryInfo: `${GEONAMES_BASE}/countryInfo.txt`,
  admin1CodesASCII: `${GEONAMES_BASE}/admin1CodesASCII.txt`,
  alternateNamesV2: `${GEONAMES_BASE}/alternateNamesV2.zip`,
  timeZones: `${GEONAMES_BASE}/timeZones.txt`,
};

/** SimpleMaps Basic download (verified live 2026-08-14; requires a browser UA). */
export const SIMPLEMAPS_WORLDCITIES_URL =
  'https://simplemaps.com/static/data/world-cities/basic/simplemaps_worldcities_basicv1.91.3.zip';

export const SIMPLEMAPS_CSV_NAME = 'worldcities.csv';

export const WIKIDATA_SPARQL_URL = 'https://query.wikidata.org/sparql';

/** Browser-ish UA — SimpleMaps serves the free CSV to real browsers. */
export const DOWNLOAD_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

/**
 * GeoNames P-class populated-place feature codes kept by CLEAN (geodata §10).
 * PPLC (capital), PPLA/PPLA2/3/4 (admin seats), PPL/PPLS/PPLG/PPLH/PPLL/PPLQ/
 * PPLR/PPLW/PPLX (populated places).
 */
export const P_CLASS_FEATURE_CODES = new Set([
  'PPL',
  'PPLA',
  'PPLA2',
  'PPLA3',
  'PPLA4',
  'PPLC',
  'PPLS',
  'PPLG',
  'PPLH',
  'PPLL',
  'PPLQ',
  'PPLR',
  'PPLW',
  'PPLX',
]);

/** Feature-code precedence for dedup ties (geodata §10: PPLC > PPLA > … > PPL). */
export const FEATURE_PRIORITY: Record<string, number> = {
  PPLC: 0,
  PPLA: 1,
  PPLA2: 2,
  PPLA3: 3,
  PPLA4: 4,
  PPLS: 5,
  PPLG: 6,
  PPLH: 7,
  PPLL: 8,
  PPLQ: 9,
  PPLR: 10,
  PPLW: 11,
  PPLX: 12,
  PPL: 13,
};

/**
 * Default snapshot scope: cities with population ≥ this OR any capital/admin
 * seat (PPLC/PPLA/PPLA2/PPLA3/PPLA4). Overridable via `GEO_MIN_POPULATION`.
 * Full-dump export: `GEO_MIN_POPULATION=0`.
 */
export const DEFAULT_MIN_POPULATION = 100_000;

/** GeoNames alternate-names isoLanguage → our Locale tags (no zh/pt variants in GeoNames). */
export const GEONAMES_LANG_TO_LOCALE: Record<string, string> = {
  ar: 'ar',
  de: 'de',
  en: 'en',
  es: 'es',
  fa: 'fa',
  fr: 'fr',
  hi: 'hi',
  id: 'id',
  it: 'it',
  ja: 'ja',
  ko: 'ko',
  nl: 'nl',
  pl: 'pl',
  pt: 'pt-BR',
  ru: 'ru',
  th: 'th',
  tr: 'tr',
  uk: 'uk',
  vi: 'vi',
  zh: 'zh-CN',
};
