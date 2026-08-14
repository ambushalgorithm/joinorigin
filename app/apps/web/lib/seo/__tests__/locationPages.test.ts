import { indexableLocationEntries, isWarmSetEntry, locationPageEntries } from '../locationPages';
import { FLAGSHIP_CITIES, getDatasetVersion, slugify } from '../locationData';

/**
 * fe-seo-registry registry unit tests (TASK-307).
 *
 * Asserts `locationPageEntries()` derives correct params/paths/titles from
 * the committed snapshot, the `indexable` flag reflects the gates, the
 * warm set matches the MVP surface, duplicate (regionId, slug) rows are
 * deduped, and the per-locale (de) Berlin surface is exactly 7 pages.
 */

describe('lib/seo locationPages — EN canonical surface', () => {
  const entries = locationPageEntries();
  const paths = entries.map((entry) => entry.path);

  it('derives entries from the committed snapshot with unique paths', () => {
    expect(entries.length).toBeGreaterThan(0);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('includes the hub with params {} and indexable true', () => {
    const hub = entries.find((entry) => entry.kind === 'hub');
    expect(hub).toMatchObject({
      params: {},
      path: '/location',
      tier: 1,
      indexable: true,
      priority: 0.9,
    });
  });

  it('derives the NYC city page params/path/title (design §8.4 shape)', () => {
    const nyc = entries.find((entry) => entry.kind === 'city' && entry.params.city === 'new-york');
    expect(nyc).toBeDefined();
    expect(nyc?.params).toEqual({
      country: 'united-states',
      region: 'new-york',
      city: 'new-york',
    });
    expect(nyc?.path).toBe('/location/united-states/new-york/new-york');
    expect(nyc?.title).toBe('Communities in New York City, New York | JoinOrigin');
    expect(nyc?.tier).toBe(1);
    expect(nyc?.indexable).toBe(true);
  });

  it('derives the Berlin city page path from the flagship region override', () => {
    const berlin = entries.find((entry) => entry.kind === 'city' && entry.params.city === 'berlin');
    expect(berlin?.path).toBe('/location/germany/berlin/berlin');
    expect(berlin?.title).toBe('Communities in Berlin | JoinOrigin'); // no ", Berlin" suffix
    expect(berlin?.indexable).toBe(true);
  });

  it('derives country + region pages for the flagship parents', () => {
    const us = entries.find(
      (entry) => entry.kind === 'country' && entry.params.country === 'united-states',
    );
    const germany = entries.find(
      (entry) => entry.kind === 'country' && entry.params.country === 'germany',
    );
    const nyRegion = entries.find(
      (entry) => entry.kind === 'region' && entry.params.region === 'new-york',
    );
    const berlinRegion = entries.find(
      (entry) => entry.kind === 'region' && entry.params.region === 'berlin',
    );
    expect(us?.path).toBe('/location/united-states');
    expect(germany?.path).toBe('/location/germany');
    expect(nyRegion?.path).toBe('/location/united-states/new-york');
    expect(berlinRegion?.path).toBe('/location/germany/berlin');
    expect(us?.indexable).toBe(true);
    expect(germany?.indexable).toBe(true);
    expect(nyRegion?.indexable).toBe(true);
    expect(berlinRegion?.indexable).toBe(true);
  });

  it('derives all 5 group-type variants + ideas for each flagship', () => {
    const variants = entries.filter((entry) => entry.kind === 'variant');
    const ideas = entries.filter((entry) => entry.kind === 'ideas');
    expect(variants).toHaveLength(FLAGSHIP_CITIES.length * 5);
    expect(ideas).toHaveLength(FLAGSHIP_CITIES.length);
    for (const variant of variants) {
      expect(variant.path).toMatch(/\/location\/[^/]+\/[^/]+\/[^/]+\/[a-z-]+$/);
      expect(variant.indexable).toBe(true);
    }
  });

  it('derives non-flagship cities as Tier-3 and non-indexable (no content)', () => {
    const austin = entries.find((entry) => entry.kind === 'city' && entry.params.city === 'austin');
    expect(austin).toBeDefined();
    expect(austin?.tier).toBe(3);
    expect(austin?.indexable).toBe(false);
    expect(austin?.path).toBe('/location/united-states/texas/austin');
  });

  it('dedupes (regionId, slug) duplicate rows to one canonical URL', () => {
    // The snapshot carries multiple PPLX rows named "Manhattan" in us-ny;
    // the registry must emit exactly one /.../manhattan city page.
    const manhattan = entries.filter((entry) => entry.params.city === 'manhattan');
    expect(manhattan.length).toBeLessThanOrEqual(1);
  });

  it('lastModified equals the dataset version date (deterministic)', () => {
    const version = getDatasetVersion();
    for (const entry of entries) {
      expect(entry.lastModified).toBe(version);
    }
    expect(version).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('titles/descriptions carry the intent (G4) for every indexable page', () => {
    for (const entry of indexableLocationEntries()) {
      if (entry.kind === 'hub') continue;
      const cityName = entry.params.city
        ? FLAGSHIP_CITIES.find((flagship) => flagship.slug === entry.params.city)?.displayName
        : undefined;
      const needle = (cityName ?? slugify(entry.path.split('/').pop() ?? ''))
        .toLowerCase()
        .replace(/-/g, ' ');
      expect(entry.title.toLowerCase().replace(/-/g, ' ')).toContain(needle);
    }
  });
});

describe('lib/seo locationPages — indexable set + warm set', () => {
  it('indexable EN set is exactly the 19-page MVP location surface', () => {
    const indexable = indexableLocationEntries();
    expect(indexable).toHaveLength(19);
    const byKind = (kind: string) => indexable.filter((entry) => entry.kind === kind);
    expect(byKind('hub')).toHaveLength(1);
    expect(byKind('country')).toHaveLength(2);
    expect(byKind('region')).toHaveLength(2);
    expect(byKind('city')).toHaveLength(2);
    expect(byKind('variant')).toHaveLength(10);
    expect(byKind('ideas')).toHaveLength(2);
  });

  it('warm set (hub + Tier-1) matches the indexable MVP surface', () => {
    const warm = locationPageEntries().filter(isWarmSetEntry);
    expect(warm.map((entry) => entry.path).sort()).toEqual(
      indexableLocationEntries()
        .map((entry) => entry.path)
        .sort(),
    );
  });

  it('Tier-3 entries never appear in the indexable set', () => {
    expect(indexableLocationEntries().every((entry) => entry.tier <= 2)).toBe(true);
  });
});

describe('lib/seo locationPages — per-locale (de) Berlin surface', () => {
  const de = locationPageEntries('de');

  it('emits exactly the 7 Berlin de pages (city + 5 variants + ideas)', () => {
    expect(de).toHaveLength(7);
    const byKind = (kind: string) => de.filter((entry) => entry.kind === kind);
    expect(byKind('city')).toHaveLength(1);
    expect(byKind('variant')).toHaveLength(5);
    expect(byKind('ideas')).toHaveLength(1);
    expect(de.every((entry) => entry.locale === 'de')).toBe(true);
    expect(de.every((entry) => entry.path.startsWith('/de/location/germany/berlin/'))).toBe(true);
  });

  it('de pages carry German titles and are indexable', () => {
    const startup = de.find((entry) => entry.kind === 'variant' && entry.groupType === 'startup');
    expect(startup?.title).toBe('Startup-Communities in Berlin | JoinOrigin');
    expect(startup?.indexable).toBe(true);
    const ideas = de.find((entry) => entry.kind === 'ideas');
    expect(ideas?.title).toBe('30 Ideen für Community-Events in Berlin | JoinOrigin');
    expect(ideas?.indexable).toBe(true);
    expect(de.every((entry) => entry.indexable)).toBe(true);
  });

  it('does NOT enumerate untranslated cities for the de surface', () => {
    const deNewYork = de.some((entry) => entry.path.includes('united-states'));
    expect(deNewYork).toBe(false);
  });
});

describe('lib/seo locationPages — determinism', () => {
  it('two calls produce identical entries (no new Date / Math.random)', () => {
    const first = locationPageEntries();
    const second = locationPageEntries();
    expect(first).toEqual(second);
  });
});
