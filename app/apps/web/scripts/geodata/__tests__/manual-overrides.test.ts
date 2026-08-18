/**
 * MANUAL OVERRIDES step unit tests (TASK-409) — deterministic post-build
 * merge of hand-added cities/regions so they survive every geo:sync run.
 */

import { buildSnapshot } from '../snapshot';
import { applyManualOverrides, loadManualOverrides } from '../manual-overrides';
import type { ManualOverridesFile } from '../manual-overrides';
import type { CleanCity, CleanCountry, CleanRegion } from '../types';
import type { LocationSnapshot } from '../../../lib/seo/data/types';

const countryDE: CleanCountry = {
  iso2: 'DE',
  iso3: 'DEU',
  name: 'Germany',
  asciiName: 'Germany',
  continent: 'EU',
  capital: 'Berlin',
  population: 82927922,
  currency: 'EUR',
  languages: ['de'],
  tld: '.de',
  geonameId: 2921044,
  names: { de: 'Deutschland' },
};

const regionDE: CleanRegion = {
  id: 'de-16',
  name: 'State of Berlin',
  asciiName: 'State of Berlin',
  countryIso2: 'DE',
  admin1Code: '16',
  geonameId: 2950157,
  names: { de: 'Berlin' },
};

const cityBerlin: CleanCity = {
  id: 2950159,
  qid: 'Q64',
  name: 'Berlin',
  asciiName: 'Berlin',
  lat: 52.52437,
  lng: 13.41053,
  countryIso2: 'DE',
  regionId: 'de-16',
  population: 11000,
  timezone: 'Europe/Berlin',
  featureCode: 'PPLC',
  capital: 'primary',
  sameName: true,
  names: { de: 'Berlin', es: 'Berlín' },
};

/** The pipeline bug TASK-409 fixes: Bengaluru row emitted with a wrong name. */
const cityBengaluruPipeline: CleanCity = {
  id: 1277333,
  qid: 'Q1355',
  name: 'Jālhalli',
  asciiName: 'Jalhalli',
  lat: 12.97194,
  lng: 77.59369,
  countryIso2: 'IN',
  regionId: 'in-19',
  population: 8495492,
  timezone: 'Asia/Kolkata',
  featureCode: 'PPLA',
  capital: '',
  sameName: false,
  names: { en: 'Bengaluru', hi: 'बेंगलुरु' },
};

function baseSnapshot(): LocationSnapshot {
  return buildSnapshot({
    version: '2026-08-14',
    sources: { geonames: '', simplemaps: '', wikidata: '' },
    countries: [countryDE],
    regions: [regionDE],
    cities: [cityBerlin, cityBengaluruPipeline],
  });
}

describe('geodata MANUAL OVERRIDES (TASK-409)', () => {
  it('loads the committed manual-overrides.json in the expected shape', () => {
    const overrides = loadManualOverrides();
    expect(typeof overrides.version).toBe('number');
    expect(Array.isArray(overrides.countries)).toBe(true);
    expect(Array.isArray(overrides.regions)).toBe(true);
    expect(Array.isArray(overrides.cities)).toBe(true);
    expect(overrides.cities.length).toBe(3);
    expect(overrides.regions.length).toBe(1);
    for (const city of overrides.cities) {
      expect(typeof city.id).toBe('number');
    }
    for (const region of overrides.regions) {
      expect(typeof region.id).toBe('string');
    }
  });

  it('appends the hand-added Singapore + Hong Kong cities and SG region', () => {
    const overrides = loadManualOverrides();
    const { snapshot } = applyManualOverrides(baseSnapshot(), overrides);

    expect(snapshot.cities).toHaveLength(4);
    expect(snapshot.regions).toHaveLength(2);

    const singapore = snapshot.cities.find((c) => c.id === 1880251);
    expect(singapore).toBeDefined();
    expect(singapore).toMatchObject({
      name: 'Singapore',
      countryIso2: 'SG',
      regionId: 'sg-00',
      featureCode: 'PPLC',
      capital: 'primary',
      qid: 'Q334',
    });

    const hongKong = snapshot.cities.find((c) => c.id === 1819729);
    expect(hongKong).toBeDefined();
    expect(hongKong).toMatchObject({
      name: 'Hong Kong',
      countryIso2: 'HK',
      regionId: 'hk-hcw',
      featureCode: 'PPLC',
      capital: 'primary',
      qid: 'Q8646',
    });

    const sgRegion = snapshot.regions.find((r) => r.id === 'sg-00');
    expect(sgRegion).toBeDefined();
    expect(sgRegion).toMatchObject({
      name: 'Singapore',
      countryIso2: 'SG',
      admin1Code: '00',
      geonameId: 1880251,
    });
  });

  it('replaces the mis-named Bengaluru row while preserving its localization', () => {
    const overrides = loadManualOverrides();
    const { snapshot } = applyManualOverrides(baseSnapshot(), overrides);

    const bengaluru = snapshot.cities.find((c) => c.id === 1277333);
    expect(bengaluru).toBeDefined();
    expect(bengaluru?.name).toBe('Bengaluru');
    expect(bengaluru?.asciiName).toBe('Bengaluru');
    expect(bengaluru?.population).toBe(8495492);
    expect(bengaluru?.featureCode).toBe('PPLA');
    // Locales not mentioned by the override survive (never blanked out).
    expect(bengaluru?.names['hi']).toBe('बेंगलुरु');
    expect(bengaluru?.names['en']).toBe('Bengaluru');
  });

  it('fills every new entity names record to 21 locales (schema §5.2)', () => {
    const overrides = loadManualOverrides();
    const { snapshot } = applyManualOverrides(baseSnapshot(), overrides);

    const added = [
      snapshot.cities.find((c) => c.id === 1880251),
      snapshot.cities.find((c) => c.id === 1819729),
      snapshot.regions.find((r) => r.id === 'sg-00'),
    ];
    for (const entity of added) {
      expect(Object.keys(entity!.names)).toHaveLength(21);
      expect(entity!.names['en']).toBeTruthy();
    }
    expect(snapshot.cities.find((c) => c.id === 1880251)?.names['ja']).toBe('シンガポール');
    expect(snapshot.cities.find((c) => c.id === 1819729)?.names['zh-TW']).toBe('香港');
  });

  it('reports superseded pipeline entities (never silently overwritten)', () => {
    const overrides = loadManualOverrides();
    const { superseded } = applyManualOverrides(baseSnapshot(), overrides);
    expect(superseded).toContain('city 1277333');
    // Berlin + DE region are untouched by the overrides → not superseded.
    expect(superseded).not.toContain('city 2950159');
    expect(superseded).not.toContain('region de-16');
  });

  it('never drops existing pipeline entities and preserves their order', () => {
    const overrides = loadManualOverrides();
    const { snapshot } = applyManualOverrides(baseSnapshot(), overrides);

    expect(snapshot.countries.map((c) => c.iso2)).toEqual(['DE']);
    expect(snapshot.regions.map((r) => r.id)).toEqual(['de-16', 'sg-00']);
    expect(snapshot.cities.map((c) => c.id)).toEqual([2950159, 1277333, 1880251, 1819729]);
    // Untouched entities keep their exact data.
    expect(snapshot.cities.find((c) => c.id === 2950159)?.name).toBe('Berlin');
  });

  it('is deterministic and idempotent — re-applying changes nothing', () => {
    const overrides = loadManualOverrides();
    const first = applyManualOverrides(baseSnapshot(), overrides);
    const second = applyManualOverrides(first.snapshot, overrides);

    expect(second.snapshot.countries).toEqual(first.snapshot.countries);
    expect(second.snapshot.regions).toEqual(first.snapshot.regions);
    expect(second.snapshot.cities).toEqual(first.snapshot.cities);
    // Re-applying to the already-merged output changes nothing, so the
    // second round supersedes nothing (idempotent).
    expect(second.superseded).toEqual([]);
    expect(first.superseded).toEqual(['city 1277333']);
  });

  it('merges only the override-provided fields and filters unknown locale keys', () => {
    const pipeline = baseSnapshot();
    const overrides: ManualOverridesFile = {
      version: 1,
      countries: [],
      regions: [
        {
          id: 'de-16',
          name: 'Land Berlin',
          names: { en: 'Berlin', not_a_locale: 'ignored' },
        },
      ],
      cities: [
        {
          id: 2950159,
          population: 999999,
          names: { en: 'Berlin', xx: 'ignored' },
        },
      ],
    };
    const { snapshot } = applyManualOverrides(pipeline, overrides);

    const region = snapshot.regions.find((r) => r.id === 'de-16')!;
    expect(region.name).toBe('Land Berlin');
    // Unmentioned fields survive.
    expect(region.admin1Code).toBe('16');
    // Unknown locale keys are dropped.
    expect(Object.keys(region.names)).toHaveLength(21);
    expect((region.names as Record<string, string>)['not_a_locale']).toBeUndefined();
    // Override locale wins, others preserved.
    expect(region.names['de']).toBe('Berlin');

    const city = snapshot.cities.find((c) => c.id === 2950159)!;
    expect(city.population).toBe(999999);
    expect(city.timezone).toBe('Europe/Berlin');
    expect(city.names['es']).toBe('Berlín');
    expect(Object.keys(city.names)).toHaveLength(21);
  });

  it('builds a full entity from the override alone when the key is new', () => {
    const pipeline = baseSnapshot();
    const overrides: ManualOverridesFile = {
      version: 1,
      countries: [],
      regions: [],
      cities: [
        {
          id: 999,
          name: 'Exampleville',
          asciiName: 'Exampleville',
          countryIso2: 'XX',
          regionId: 'xx-00',
          names: { fr: 'Exampleville-FR' },
        },
      ],
    };
    const { snapshot } = applyManualOverrides(pipeline, overrides);
    const city = snapshot.cities.find((c) => c.id === 999)!;
    expect(city).toMatchObject({
      name: 'Exampleville',
      asciiName: 'Exampleville',
      countryIso2: 'XX',
      regionId: 'xx-00',
    });
    // Missing locales fall back to the EN name.
    expect(city.names['fr']).toBe('Exampleville-FR');
    expect(city.names['de']).toBe('Exampleville');
    expect(Object.keys(city.names)).toHaveLength(21);
  });
});
