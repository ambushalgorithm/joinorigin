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

  it('has EN labels + de labels for the Berlin surface', () => {
    for (const type of GROUP_TYPES) {
      expect(type.label.length).toBeGreaterThan(0);
      expect(type.labelDe.length).toBeGreaterThan(0);
    }
  });

  it('is a config array, not code (design §4.4)', () => {
    expect(isGroupTypeKey('startup')).toBe(true);
    expect(isGroupTypeKey('not-a-type')).toBe(false);
    expect(getGroupType('meetup').label).toBe('Community meetups & events');
    expect(groupTypeLabel('small-business')).toBe('Small business communities');
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

  it('flagships derive Tier-1, everything else Tier-3 (MVP slice deferred)', () => {
    expect(tierForCitySlug('new-york')).toBe(1);
    expect(tierForCitySlug('berlin')).toBe(1);
    expect(tierForCitySlug('austin')).toBe(3);
    expect(tierForCitySlug('london')).toBe(3);
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
