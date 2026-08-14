/**
 * OVERLAY step (design §5.3, geodata §10).
 *
 * Overlay SimpleMaps World Cities Basic (CC BY 4.0) onto the joined GeoNames
 * cities: cleaner `city_ascii` names, `capital` tier and (when the source
 * provides it) `ranking`. Matching strategy:
 *
 *  1. Exact: iso2 + admin1Code + normalized city ascii.
 *  2. Fallback: iso2 + normalized city ascii when unique within the country.
 *  3. Proximity: iso2 + admin1Code + lat/lng within 0.25° (SimpleMaps Basic
 *     sometimes splits metro cores, e.g. "New York" vs "New York City").
 *
 * Pure — the SimpleMaps index is a plain object so unit tests can run
 * without the 50K-row CSV.
 */

import type { GeoCityRow, SimpleMapsRow } from './types';

export interface SimpleMapsEntry {
  city: string;
  cityAscii: string;
  adminName: string;
  capital: SimpleMapsRow['capital'];
  ranking?: 1 | 2 | 3 | 4 | 5;
}

export interface SimpleMapsIndex {
  /** key: iso2 | normalized ascii | admin1code-lower. */
  byExact: Map<string, SimpleMapsEntry>;
  /** key: iso2 | normalized ascii (admin-agnostic). */
  byName: Map<string, SimpleMapsEntry[]>;
  /** key: iso2 | normalized ascii with common suffixes stripped | admin1code-lower. */
  byStrippedName: Map<string, SimpleMapsEntry>;
  /** key: iso2 | admin1code-lower | latKey | lngKey (0.25° cells). */
  byProximity: Map<string, SimpleMapsEntry>;
}

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Strip common place suffixes so "New York City" ↔ "New York" can match
 * (SimpleMaps Basic splits metro cores from boroughs).
 */
function normStripped(s: string): string {
  const n = norm(s);
  return n
    .replace(/(city|town|borough|village|municipality)$/, '')
    .replace(/(^|-)(city|town|borough|village|municipality)$/, '');
}

/** Resolve SimpleMaps admin_name → GeoNames admin1 code via admin1 names. */
export function buildAdminNameIndex(
  admin1Rows: { code: string; asciiName: string; name: string }[],
): Map<string, string> {
  const map = new Map<string, string>();
  for (const row of admin1Rows) {
    const [, admin1Code] = row.code.split('.');
    map.set(`${row.code.slice(0, 2).toUpperCase()}|${norm(row.asciiName)}`, admin1Code);
    map.set(`${row.code.slice(0, 2).toUpperCase()}|${norm(row.name)}`, admin1Code);
  }
  return map;
}

/** Build a lookup index over SimpleMaps rows. */
export function buildSimpleMapsIndex(
  rows: SimpleMapsRow[],
  adminNameIndex: Map<string, string>,
): SimpleMapsIndex {
  const byExact = new Map<string, SimpleMapsEntry>();
  const byName = new Map<string, SimpleMapsEntry[]>();
  const byStrippedName = new Map<string, SimpleMapsEntry>();
  const byProximity = new Map<string, SimpleMapsEntry>();

  for (const row of rows) {
    const admin1Code = adminNameIndex.get(`${row.iso2}|${norm(row.adminName)}`) ?? '';
    const entry: SimpleMapsEntry = {
      city: row.city,
      cityAscii: row.cityAscii,
      adminName: row.adminName,
      capital: row.capital,
    };
    const nameKey = `${row.iso2}|${norm(row.cityAscii)}`;
    const exactKey = `${row.iso2}|${norm(row.cityAscii)}|${admin1Code.toLowerCase()}`;
    if (admin1Code) {
      // Prefer the entry with the largest city_ascii (metro core over boroughs).
      const existing = byExact.get(exactKey);
      if (!existing || row.cityAscii.length > existing.cityAscii.length) {
        byExact.set(exactKey, entry);
      }
    }
    const list = byName.get(nameKey) ?? [];
    list.push(entry);
    byName.set(nameKey, list);

    // Suffix-stripped fallback ("New York City" ↔ "New York").
    const strippedKey = `${row.iso2}|${normStripped(row.cityAscii)}|${admin1Code.toLowerCase()}`;
    if (admin1Code) {
      const existingStripped = byStrippedName.get(strippedKey);
      if (!existingStripped || row.cityAscii.length > existingStripped.cityAscii.length) {
        byStrippedName.set(strippedKey, entry);
      }
    }

    const latCell = Math.round(row.lat / 0.25);
    const lngCell = Math.round(row.lng / 0.25);
    byProximity.set(`${row.iso2}|${admin1Code.toLowerCase()}|${latCell}|${lngCell}`, entry);
  }

  return { byExact, byName, byStrippedName, byProximity };
}

/**
 * Find the SimpleMaps overlay for a GeoNames city row.
 * Returns `null` when no confident match exists (GeoNames data stands).
 */
export function matchSimpleMaps(row: GeoCityRow, index: SimpleMapsIndex): SimpleMapsEntry | null {
  const iso2 = row.countryCode;
  const nameKey = `${iso2}|${norm(row.asciiName)}`;
  const admin1 = row.admin1Code.toLowerCase();
  const exactKey = `${iso2}|${norm(row.asciiName)}|${admin1}`;

  // 1. Exact iso2+ascii+admin1.
  const exact = index.byExact.get(exactKey);
  if (exact) {
    return exact;
  }

  // 2. Unique name within country.
  const byName = index.byName.get(nameKey);
  if (byName && byName.length === 1) {
    return byName[0];
  }

  // 2b. Suffix-stripped name within country+admin1 ("New York City" ↔ "New York").
  const strippedKey = `${iso2}|${normStripped(row.asciiName)}|${admin1}`;
  const stripped = index.byStrippedName.get(strippedKey);
  if (stripped) {
    return stripped;
  }

  // 3. Proximity within the same 0.25° cell + admin1.
  const latCell = Math.round(row.lat / 0.25);
  const lngCell = Math.round(row.lng / 0.25);
  const prox = index.byProximity.get(`${iso2}|${admin1}|${latCell}|${lngCell}`);
  if (prox) {
    return prox;
  }

  return null;
}
