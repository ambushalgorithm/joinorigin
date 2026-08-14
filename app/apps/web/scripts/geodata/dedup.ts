/**
 * DEDUP step (design §5.3, geodata §10).
 *
 * Group cities by (asciiname, country, admin1). Within a group keep the row
 * with the best feature-code priority (PPLC > PPLA > PPLA2 > … > PPL) then
 * the highest population (geodata §10). Flag `sameName` when the surviving
 * ascii name is shared by another city in a *different* country/admin1
 * bucket (e.g. "Berlin" in DE/US/RU) — consumers disambiguate by URL.
 *
 * Pure — unit-tested with Andorra/US/DE samples.
 */

import { FEATURE_PRIORITY } from './config';
import type { GeoCityRow } from './types';

export interface DedupResult {
  /** Surviving city rows, one per (asciiname, country, admin1) bucket. */
  cities: GeoCityRow[];
  /** Set of lowercase ascii names that collide across buckets. */
  sameNameAscii: Set<string>;
}

function compareRows(a: GeoCityRow, b: GeoCityRow): number {
  const pa = FEATURE_PRIORITY[a.featureCode] ?? 99;
  const pb = FEATURE_PRIORITY[b.featureCode] ?? 99;
  if (pa !== pb) {
    return pa - pb;
  }
  if (b.population !== a.population) {
    return b.population - a.population;
  }
  // Deterministic tie-break: lowest geonameId wins.
  return a.geonameId - b.geonameId;
}

/** Group key: lowercased ascii name + country + admin1. */
export function dedupKey(row: GeoCityRow): string {
  return `${row.asciiName.toLowerCase()}\u0000${row.countryCode}\u0000${row.admin1Code}`;
}

/** Deduplicate cleaned city rows. Pure — unit-tested. */
export function dedupCities(rows: GeoCityRow[]): DedupResult {
  const buckets = new Map<string, GeoCityRow[]>();
  for (const row of rows) {
    const key = dedupKey(row);
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.push(row);
    } else {
      buckets.set(key, [row]);
    }
  }

  const cities: GeoCityRow[] = [];
  const nameCounts = new Map<string, number>();
  const survivors: GeoCityRow[] = [];

  for (const bucket of buckets.values()) {
    let best = bucket[0];
    for (let i = 1; i < bucket.length; i++) {
      if (compareRows(bucket[i], best) < 0) {
        best = bucket[i];
      }
    }
    cities.push(best);
    survivors.push(best);
  }

  // sameName = the ascii name appears in more than one surviving bucket.
  for (const row of survivors) {
    const name = row.asciiName.toLowerCase();
    nameCounts.set(name, (nameCounts.get(name) ?? 0) + 1);
  }
  const sameNameAscii = new Set<string>();
  for (const [name, count] of nameCounts) {
    if (count > 1) {
      sameNameAscii.add(name);
    }
  }

  return { cities, sameNameAscii };
}
