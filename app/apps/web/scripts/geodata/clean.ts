/**
 * CLEAN step (design §5.3, geodata §10).
 *
 * Keep only GeoNames P-class populated-place feature codes (PPLC, PPLA,
 * PPLA2/3/4, PPL, PPLS, PPLG, PPLH, PPLL, PPLQ, PPLR, PPLW, PPLX) and rows
 * with a parseable location. Everything else (mountains, streams, admin
 * regions, historical places) is dropped before dedup/join.
 */

import { P_CLASS_FEATURE_CODES } from './config';
import type { GeoCityRow } from './types';

/** Parse a raw GeoNames `cities500` TSV line into a typed row. */
export function parseCityLine(line: string): GeoCityRow | null {
  const fields = line.split('\t');
  if (fields.length < 19) {
    return null;
  }
  const [
    geonameId,
    name,
    asciiName,
    alternateNames,
    latStr,
    lngStr,
    featureClass,
    featureCode,
    countryCode,
    cc2,
    admin1Code,
    admin2Code,
    admin3Code,
    admin4Code,
    populationStr,
    elevation,
    dem,
    timezone,
    modificationDate,
  ] = fields;

  const geonameIdNum = Number(geonameId);
  const lat = Number(latStr);
  const lng = Number(lngStr);
  const population = Number(populationStr || '0');

  if (!Number.isFinite(geonameIdNum) || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return {
    geonameId: geonameIdNum,
    name,
    asciiName,
    alternateNames,
    lat,
    lng,
    featureClass,
    featureCode,
    countryCode,
    cc2,
    admin1Code,
    admin2Code,
    admin3Code,
    admin4Code,
    population: Number.isFinite(population) ? population : 0,
    elevation,
    dem,
    timezone,
    modificationDate,
  };
}

/**
 * Filter raw rows to the P-class populated places.
 * Pure — unit-tested with Andorra/US/DE samples (geodata §4).
 */
export function cleanCities(rows: GeoCityRow[]): GeoCityRow[] {
  return rows.filter(
    (row) =>
      row.featureClass === 'P' &&
      P_CLASS_FEATURE_CODES.has(row.featureCode) &&
      row.countryCode.length === 2,
  );
}

/** Convenience: parse + clean a full cities500 dump in one pass. */
export function cleanCitiesFromLines(lines: string[]): GeoCityRow[] {
  const rows: GeoCityRow[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    const row = parseCityLine(trimmed);
    if (row) {
      rows.push(row);
    }
  }
  return cleanCities(rows);
}
