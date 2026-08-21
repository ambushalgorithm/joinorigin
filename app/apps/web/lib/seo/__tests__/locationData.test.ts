import {
  CITY_SEED,
  FLAGSHIP_CITIES,
  GROUP_TYPES,
  IDEA_VARIANT,
  getDatasetVersion,
  getGroupType,
  groupTypeLabel,
  isGroupTypeKey,
  slugify,
  tierForCitySlug,
} from '../locationData';
import {
  CONTENT_RICH_CITY_GEONAME_IDS,
  cityLocalizedName,
  contentRichCities,
  countryLocalizedName,
  findCityBySlug,
  regionLocalizedName,
} from '../locationData';
import { loadLocationSnapshot } from '../locationData';

/**
 * fe-seo-registry data-layer unit tests (TASK-307).
 *
 * Covers the snapshot loader, slug rules, the 5-type group-type taxonomy,
 * the tier model, and the city seed copy model.
 */

describe('lib/seo locationData — snapshot loader', () => {
  it('loads the committed snapshot with the deterministic version date', () => {
    const snapshot = loadLocationSnapshot();
    expect(snapshot.version).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(snapshot.countries.length).toBeGreaterThan(200);
    expect(snapshot.regions.length).toBeGreaterThan(3000);
    expect(snapshot.cities.length).toBeGreaterThan(8000);
    expect(getDatasetVersion()).toBe(snapshot.version);
  });

  it('returns the same memoized snapshot on repeated calls', () => {
    expect(loadLocationSnapshot()).toBe(loadLocationSnapshot());
  });
});

describe('lib/seo locationData — slug rules (§4.2)', () => {
  it('kebab-cases ASCII names', () => {
    expect(slugify('United States')).toBe('united-states');
    expect(slugify('New York')).toBe('new-york');
    expect(slugify('State of Berlin')).toBe('state-of-berlin');
    expect(slugify('San Francisco')).toBe('san-francisco');
  });

  it('strips leading/trailing separators and lowercases', () => {
    expect(slugify('  Austin  ')).toBe('austin');
    expect(slugify('Saint-Tropez')).toBe('saint-tropez');
  });
});

describe('lib/seo locationData — 5-type group-type taxonomy', () => {
  it('exposes the user-approved MVP 5-type set', () => {
    expect(GROUP_TYPES.map((type) => type.key)).toEqual([
      'startup',
      'creative',
      'political',
      'meetup',
      'small-business',
    ]);
  });

  it('is a config array, not code (design §4.4) — labels resolve from the dictionary', () => {
    expect(isGroupTypeKey('startup')).toBe(true);
    expect(isGroupTypeKey('not-a-type')).toBe(false);
    // Display labels come from the seoContent.groupTypes.* chrome (TASK-416),
    // never from the config — the config carries keys only.
    expect(getGroupType('meetup').key).toBe('meetup');
    expect(groupTypeLabel('small-business')).toBe('Small business communities');
    expect(groupTypeLabel('startup')).toBe('Startup communities');
  });

  it('reserves the ideas slug for idea pages (§3.4)', () => {
    expect(IDEA_VARIANT).toBe('ideas');
  });
});

describe('lib/seo locationData — tier model (§3.3)', () => {
  it('flagships are Tier-1 with stable geonameId join keys', () => {
    expect(FLAGSHIP_CITIES.map((city) => city.slug)).toEqual(['new-york', 'berlin']);
    for (const flagship of FLAGSHIP_CITIES) {
      expect(flagship.geonameId).toBeGreaterThan(0);
      expect(flagship.locales.length).toBeGreaterThan(0);
    }
  });

  it('flagships derive Tier-1; the Sprint 18 55-city set Tier-2; the long tail Tier-3', () => {
    expect(tierForCitySlug('new-york')).toBe(1);
    expect(tierForCitySlug('berlin')).toBe(1);
    // Approved 55-city set (TASK-442) — non-flagship cities are Tier-2.
    expect(tierForCitySlug('austin')).toBe(2);
    expect(tierForCitySlug('london')).toBe(2);
    expect(tierForCitySlug('tokyo')).toBe(2);
    expect(tierForCitySlug('sao-paulo')).toBe(2);
    expect(tierForCitySlug('dubai')).toBe(2);
    // Long tail (not in the approved set) stays Tier-3.
    expect(tierForCitySlug('dallas')).toBe(3);
    expect(tierForCitySlug('oslo')).toBe(3);
  });
});

describe('lib/seo locationData — city seed copy model', () => {
  it('seeds exist for both flagship cities with honest, verifiable facts', () => {
    for (const flagship of FLAGSHIP_CITIES) {
      const seed = CITY_SEED[flagship.slug];
      expect(seed).toBeDefined();
      expect(seed.neighborhoods.length).toBeGreaterThan(3);
      expect(seed.landmarks.length).toBeGreaterThan(3);
      expect(seed.industries.length).toBeGreaterThan(2);
      expect(seed.universities.length).toBeGreaterThan(2);
      expect(seed.venues.length).toBeGreaterThan(2);
      expect(seed.culture.length).toBeGreaterThan(2);
    }
  });

  it('NYC and Berlin seeds do not overlap (no template reuse)', () => {
    const nyc = CITY_SEED['new-york'];
    const berlin = CITY_SEED.berlin;
    const nycWords = new Set(
      [...nyc.neighborhoods, ...nyc.landmarks].map((word) => word.toLowerCase()),
    );
    const berlinWords = new Set(
      [...berlin.neighborhoods, ...berlin.landmarks].map((word) => word.toLowerCase()),
    );
    const overlap = [...nycWords].filter((word) => berlinWords.has(word));
    expect(overlap).toEqual([]);
  });
});

describe('lib/seo locationData — deterministic content-rich city resolution (TASK-484)', () => {
  it('findCityBySlug resolves the 7 slug-collision cities to their intended rows', () => {
    expect(findCityBySlug('london')?.countryIso2).toBe('GB');
    expect(findCityBySlug('london')?.id).toBe(2643743);
    expect(findCityBySlug('madrid')?.countryIso2).toBe('ES');
    expect(findCityBySlug('san-francisco')?.countryIso2).toBe('US');
    expect(findCityBySlug('los-angeles')?.countryIso2).toBe('US');
    expect(findCityBySlug('vancouver')?.countryIso2).toBe('CA');
    expect(findCityBySlug('barcelona')?.countryIso2).toBe('ES');
    expect(findCityBySlug('taipei')?.countryIso2).toBe('TW');
  });

  it('every content-rich slug in the pin map resolves (no stale ids)', () => {
    const snapshot = loadLocationSnapshot();
    for (const geonameId of Object.values(CONTENT_RICH_CITY_GEONAME_IDS)) {
      const city = snapshot.cities.find((c) => c.id === geonameId);
      expect(city).toBeDefined();
      expect(city?.id).toBe(geonameId);
    }
    // contentRichCities() returns exactly one row per slug (never the dups).
    const cities = contentRichCities();
    expect(cities).toHaveLength(56);
    expect(new Set(cities.map((c) => c.id)).size).toBe(56);
  });

  it('localized name helpers fall back to EN when a locale name is missing', () => {
    const snapshot = loadLocationSnapshot();
    const country = snapshot.countries.find((c) => c.iso2 === 'DE');
    const region = snapshot.regions.find((r) => r.id === 'de-16');
    const city = snapshot.cities.find((c) => c.id === 2950159); // Berlin
    expect(country && region && city).toBeDefined();
    expect(countryLocalizedName(country!, 'de')).toBe('Deutschland');
    expect(countryLocalizedName(country!, 'en')).toBe('Germany');
    expect(regionLocalizedName(region!, 'de')).toBe('Berlin');
    expect(cityLocalizedName(city!, 'en')).toBe('Berlin');
    expect(cityLocalizedName(city!, 'en').length).toBeGreaterThan(0);
  });
});
