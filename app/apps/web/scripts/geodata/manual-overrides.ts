/**
 * MANUAL OVERRIDES step (TASK-409).
 *
 * Deterministic post-build step that merges hand-added city/region/country
 * rows into the snapshot so hand-maintained locations survive every
 * `geo:sync` run.
 *
 * Why: the GeoNames dump has no admin-1 region for Singapore (SG) and no
 * admin-1 for the Hong Kong (HK) capital feature, so the pipeline's scope
 * step (city needs a known regionId) drops both cities. Bengaluru's row
 * (geonameId 1277333) is emitted with a wrong name/asciiName by the
 * overlay/localize steps. These rows are committed in `manual-overrides.json`
 * and merged AFTER the pipeline build, BEFORE writeSnapshot — the pipeline can
 * never silently drop them again.
 *
 * Merge rules (deterministic, unit-tested):
 *  - Countries are keyed by `iso2`, regions by `id`, cities by `id`.
 *  - Override rows REPLACE the fields they provide; pipeline fields not
 *    mentioned in the override are preserved (never blanked out).
 *  - `names` is merged per-locale: override locales win, all other locales
 *    are preserved for existing entities and filled with the EN name for
 *    newly added entities (schema §5.2: every record has 21 locales).
 *  - New entities are appended at the end of their array (pipeline order
 *    preserved); existing entities keep their position.
 *  - Every existing entity that an override supersedes with different data is
 *    reported in `superseded` so the replacement is never silent.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type {
  LocationCity,
  LocationCountry,
  LocationRegion,
  LocationSnapshot,
} from '../../lib/seo/data/types';
import { emptyNames } from './localize';
import { SCRIPT_DIR } from './config';

/** Committed manual-overrides file (same directory as this module). */
export const MANUAL_OVERRIDES_PATH = join(SCRIPT_DIR, 'manual-overrides.json');

/** All 21 locale tags used by the snapshot schema (deterministic order). */
const KNOWN_LOCALES = Object.keys(emptyNames());

/** A hand-authored override row: any subset of entity fields + optional partial names. */
export type OverrideEntity<T extends { names: Record<string, string> }> = Partial<
  Omit<T, 'names'>
> & {
  names?: Record<string, string>;
};

export type ManualCountryOverride = OverrideEntity<LocationCountry> & { iso2: string };
export type ManualRegionOverride = OverrideEntity<LocationRegion> & { id: string };
export type ManualCityOverride = OverrideEntity<LocationCity> & { id: number };

export interface ManualOverridesFile {
  /** Schema version of the overrides file (bump on breaking shape changes). */
  version: number;
  countries: ManualCountryOverride[];
  regions: ManualRegionOverride[];
  cities: ManualCityOverride[];
}

export interface ManualOverridesResult {
  snapshot: LocationSnapshot;
  /** `"<kind> <key>"` for every pipeline entity an override replaced with different data. */
  superseded: string[];
}

/** Keep only known locale keys with non-empty values (deterministic filter). */
function pickKnownLocales(names: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of KNOWN_LOCALES) {
    const value = names[locale];
    if (typeof value === 'string' && value.length > 0) {
      out[locale] = value;
    }
  }
  return out;
}

/** EN fallback used to fill missing locales for newly added entities. */
function enNameOf<T extends { names: Record<string, string>; name?: string; asciiName?: string }>(
  override: OverrideEntity<T>,
): string {
  return String(override.name ?? override.asciiName ?? '');
}

/**
 * Merge one override row into the pipeline entity with the same key.
 * `existing === undefined` → build a full entity from the override alone.
 */
function mergeEntity<T extends { names: Record<string, string> }>(
  existing: T | undefined,
  override: OverrideEntity<T>,
): T {
  const { names: overrideNames, ...fields } = override;
  const picked = pickKnownLocales(overrideNames ?? {});
  if (!existing) {
    const enName = enNameOf(override);
    const names: Record<string, string> = {};
    for (const locale of KNOWN_LOCALES) {
      names[locale] = picked[locale] || enName;
    }
    return { ...(fields as object), names } as T;
  }
  return {
    ...existing,
    ...(fields as object),
    names: { ...existing.names, ...picked },
  } as T;
}

/** Merge a pipeline array with its override rows (pure, deterministic). */
function mergeArray<T extends { names: Record<string, string> }>(
  pipeline: T[],
  overrides: OverrideEntity<T>[],
  keyOf: (entity: T) => string,
  kind: string,
  superseded: string[],
): T[] {
  const byKey = new Map<string, T>();
  const original = new Map<string, T>();
  for (const entity of pipeline) {
    const key = keyOf(entity);
    byKey.set(key, entity);
    original.set(key, entity);
  }
  for (const override of overrides) {
    const key = keyOf(override as T);
    const existing = byKey.get(key);
    const merged = mergeEntity(existing, override);
    byKey.set(key, merged);
    const before = original.get(key);
    if (before && JSON.stringify(before) !== JSON.stringify(merged)) {
      superseded.push(`${kind} ${key}`);
    }
  }
  return Array.from(byKey.values());
}

/**
 * Apply the manual overrides to a built snapshot.
 * Pure — unit-tested. Order is deterministic: pipeline order preserved,
 * new entities appended at the end.
 */
export function applyManualOverrides(
  snapshot: LocationSnapshot,
  overrides: ManualOverridesFile,
): ManualOverridesResult {
  const superseded: string[] = [];
  const countries = mergeArray(
    snapshot.countries,
    overrides.countries,
    (c) => c.iso2,
    'country',
    superseded,
  );
  const regions = mergeArray(
    snapshot.regions,
    overrides.regions,
    (r) => r.id,
    'region',
    superseded,
  );
  const cities = mergeArray(
    snapshot.cities,
    overrides.cities,
    (c) => String(c.id),
    'city',
    superseded,
  );
  return {
    snapshot: { ...snapshot, countries, regions, cities },
    superseded,
  };
}

/** Read + validate the committed manual-overrides file. */
export function loadManualOverrides(path: string = MANUAL_OVERRIDES_PATH): ManualOverridesFile {
  const raw = readFileSync(path, 'utf8');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`manual-overrides: invalid JSON in ${path}: ${(err as Error).message}`);
  }
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error(`manual-overrides: expected an object in ${path}`);
  }
  const file = parsed as Partial<ManualOverridesFile>;
  if (typeof file.version !== 'number') {
    throw new Error(`manual-overrides: missing numeric "version" in ${path}`);
  }
  for (const key of ['countries', 'regions', 'cities'] as const) {
    if (!Array.isArray(file[key])) {
      throw new Error(`manual-overrides: missing "${key}" array in ${path}`);
    }
  }
  for (const [i, row] of (file.countries ?? []).entries()) {
    if (typeof row.iso2 !== 'string' || row.iso2.length === 0) {
      throw new Error(`manual-overrides: countries[${i}] missing "iso2" in ${path}`);
    }
  }
  for (const [i, row] of (file.regions ?? []).entries()) {
    if (typeof row.id !== 'string' || row.id.length === 0) {
      throw new Error(`manual-overrides: regions[${i}] missing "id" in ${path}`);
    }
  }
  for (const [i, row] of (file.cities ?? []).entries()) {
    if (typeof row.id !== 'number' || !Number.isInteger(row.id)) {
      throw new Error(`manual-overrides: cities[${i}] missing numeric "id" in ${path}`);
    }
  }
  return file as ManualOverridesFile;
}
