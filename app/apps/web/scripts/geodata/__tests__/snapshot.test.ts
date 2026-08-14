/**
 * SNAPSHOT step unit tests — deterministic assembly + 21-locale names
 * completeness (design §5.2, TASK-306).
 */

import { buildSnapshot } from '../snapshot';
import { emptyNames } from '../localize';
import type { CleanCity, CleanCountry, CleanRegion } from '../types';

const country: CleanCountry = {
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

const region: CleanRegion = {
  id: 'de-16',
  name: 'State of Berlin',
  asciiName: 'State of Berlin',
  countryIso2: 'DE',
  admin1Code: '16',
  geonameId: 2950157,
  names: { de: 'Berlin' },
};

const city: CleanCity = {
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

describe('geodata SNAPSHOT (TASK-306)', () => {
  it('produces a snapshot with version + sources + three entity arrays', () => {
    const snap = buildSnapshot({
      version: '2026-08-14',
      sources: {
        geonames: 'https://download.geonames.org/export/dump/',
        simplemaps: 'https://simplemaps.com/data/world-cities',
        wikidata: 'https://www.wikidata.org/',
      },
      countries: [country],
      regions: [region],
      cities: [city],
    });
    expect(snap.version).toBe('2026-08-14');
    expect(snap.countries).toHaveLength(1);
    expect(snap.regions).toHaveLength(1);
    expect(snap.cities).toHaveLength(1);
    expect(snap.sources.geonames).toContain('geonames.org');
  });

  it('fills every entity names record to 21 locales (schema §5.2)', () => {
    const snap = buildSnapshot({
      version: '2026-08-14',
      sources: { geonames: '', simplemaps: '', wikidata: '' },
      countries: [country],
      regions: [region],
      cities: [city],
    });
    const all = [...snap.countries, ...snap.regions, ...snap.cities];
    for (const entity of all) {
      expect(Object.keys(entity.names)).toHaveLength(21);
      expect(entity.names.en).toBeTruthy();
    }
    // Missing locales fall back to the enName (Berlin).
    expect(snap.cities[0].names['zh-TW']).toBe('Berlin');
    expect(snap.countries[0].names.de).toBe('Deutschland');
  });

  it('keeps city schema fields intact (design §5.2)', () => {
    const snap = buildSnapshot({
      version: '2026-08-14',
      sources: { geonames: '', simplemaps: '', wikidata: '' },
      countries: [],
      regions: [],
      cities: [city],
    });
    const c = snap.cities[0];
    expect(c).toMatchObject({
      id: 2950159,
      qid: 'Q64',
      countryIso2: 'DE',
      regionId: 'de-16',
      featureCode: 'PPLC',
      capital: 'primary',
      sameName: true,
    });
  });

  it('the empty-names helper is 21 locales', () => {
    expect(Object.keys(emptyNames())).toHaveLength(21);
  });
});
