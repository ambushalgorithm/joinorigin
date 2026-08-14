/**
 * JOIN step (design §5.3).
 *
 * Join the cleaned/deduped city rows with:
 *  - `countryInfo.txt` → country names, iso3, continent, capital, population,
 *    currency, languages, tld (design §5.2 LocationCountry).
 *  - `admin1CodesASCII.txt` → region names (design §5.2 LocationRegion).
 *  - `timeZones.txt` → country-level timezone context (cities keep their own
 *    timezone from the dump; the country table is used for validation).
 *
 * Pure join/parse helpers — unit-tested with Andorra/US/DE samples.
 */

import type { GeoAdmin1Row, GeoCountryRow, GeoTimeZoneRow } from './types';

/** Parse a `countryInfo.txt` data line (skips `#` comments). */
export function parseCountryLine(line: string): GeoCountryRow | null {
  if (!line || line.startsWith('#')) {
    return null;
  }
  // Preserve trailing empty tab fields (neighbours, EquivalentFipsCode) —
  // `trim()` would drop them and shift the column count below 18.
  const f = line.replace(/\r$/, '').split('\t');
  // countryInfo has 18 columns; a trailing empty `neighbours` may be omitted.
  if (f.length < 18) {
    return null;
  }
  const population = Number(f[7]);
  return {
    iso2: f[0],
    iso3: f[1],
    isoNumeric: f[2],
    fips: f[3],
    name: f[4],
    capital: f[5],
    area: f[6],
    population: Number.isFinite(population) ? population : 0,
    continent: f[8],
    tld: f[9],
    currencyCode: f[10],
    currencyName: f[11],
    phone: f[12],
    postalFormat: f[13],
    postalRegex: f[14],
    languages: f[15],
    geonameId: Number(f[16]),
    neighbours: f[17] ?? '',
  };
}

/** Parse an `admin1CodesASCII.txt` line. */
export function parseAdmin1Line(line: string): GeoAdmin1Row | null {
  if (!line || line.startsWith('#')) {
    return null;
  }
  const f = line.trim().split('\t');
  if (f.length < 4) {
    return null;
  }
  return {
    code: f[0],
    name: f[1],
    asciiName: f[2],
    geonameId: Number(f[3]),
  };
}

/** Parse a `timeZones.txt` line (skips the header row). */
export function parseTimeZoneLine(line: string): GeoTimeZoneRow | null {
  if (!line || line.startsWith('CountryCode')) {
    return null;
  }
  const f = line.trim().split('\t');
  if (f.length < 5) {
    return null;
  }
  return {
    countryCode: f[0],
    timezoneId: f[1],
    gmtOffsetJan: f[2],
    dstOffsetJul: f[3],
    rawOffset: f[4],
  };
}

/** Build the country table from parsed countryInfo rows. */
export function buildCountries(rows: GeoCountryRow[]) {
  return rows.map((row) => ({
    iso2: row.iso2,
    iso3: row.iso3,
    name: row.name,
    asciiName: row.name,
    continent: row.continent,
    capital: row.capital,
    population: row.population,
    currency: row.currencyCode,
    languages: row.languages.split(',').filter(Boolean),
    tld: row.tld,
    geonameId: row.geonameId,
    names: {} as Record<string, string>,
  }));
}

/**
 * Build the region table from admin1CodesASCII rows.
 * Region id = `${iso2}-${admin1Code}` (design §5.2, e.g. "us-tx").
 */
export function buildRegions(rows: GeoAdmin1Row[]) {
  return rows.map((row) => {
    const [iso2, admin1Code] = row.code.split('.');
    return {
      id: `${iso2.toLowerCase()}-${admin1Code.toLowerCase()}`,
      name: row.name,
      asciiName: row.asciiName,
      countryIso2: iso2,
      admin1Code,
      geonameId: row.geonameId,
      names: {} as Record<string, string>,
    };
  });
}

/** Map country code → timezone id (first listed tz per country). */
export function buildCountryTimeZones(rows: GeoTimeZoneRow[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const row of rows) {
    if (!map.has(row.countryCode)) {
      map.set(row.countryCode, row.timezoneId);
    }
  }
  return map;
}
