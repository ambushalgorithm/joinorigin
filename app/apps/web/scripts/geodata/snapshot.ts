/**
 * SNAPSHOT step (design §5.3).
 *
 * Assemble the cleaned/deduped/joined/overlayed/localized dataset into the
 * committed `apps/web/lib/seo/data/locations.json` snapshot (design §5.2).
 *
 * The snapshot is deterministic: version = the GeoNames dump date (or the
 * sync date), never `new Date()` at app runtime.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

import type { LocationSnapshot } from '../../lib/seo/data/types';
import { LOCATION_ATTRIBUTION } from '../../lib/seo/data/types';

import { SNAPSHOT_PATH } from './config';
import type { CleanCity, CleanCountry, CleanRegion } from './types';
import { emptyNames } from './localize';

export interface SnapshotInput {
  version: string;
  sources: LocationSnapshot['sources'];
  countries: CleanCountry[];
  regions: CleanRegion[];
  cities: CleanCity[];
}

/** Ensure every names record is a full 21-locale record (schema §5.2). */
function withFullNames<
  T extends { names: Record<string, string>; name?: string; asciiName?: string },
>(entity: T): T {
  const enName = entity.names['en'] || entity.asciiName || entity.name || '';
  const names = emptyNames();
  for (const locale of Object.keys(names)) {
    names[locale as keyof typeof names] = entity.names[locale] || enName;
  }
  return { ...entity, names };
}

/** Build the snapshot object. Pure — unit-testable. */
export function buildSnapshot(input: SnapshotInput): LocationSnapshot {
  return {
    version: input.version,
    sources: input.sources,
    countries: input.countries.map(withFullNames),
    regions: input.regions.map(withFullNames),
    cities: input.cities.map(withFullNames),
  };
}

/** Write the committed snapshot JSON (+ attribution comment is not valid JSON — NOTICE is separate). */
export function writeSnapshot(snapshot: LocationSnapshot, outPath: string = SNAPSHOT_PATH) {
  mkdirSync(dirname(outPath), { recursive: true });
  const json = JSON.stringify(snapshot, null, 2);
  writeFileSync(outPath, `${json}\n`, 'utf8');
}

export { LOCATION_ATTRIBUTION };
