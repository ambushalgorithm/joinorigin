/**
 * OVERLAY step unit tests — SimpleMaps matching rules (TASK-306).
 */

import { buildAdminNameIndex, buildSimpleMapsIndex, matchSimpleMaps } from '../overlay';
import type { SimpleMapsRow } from '../types';

const ADMIN1 = [
  { code: 'US.NY', name: 'New York', asciiName: 'New York', geonameId: 5128638 },
  { code: 'DE.16', name: 'State of Berlin', asciiName: 'State of Berlin', geonameId: 2950157 },
  { code: 'US.TX', name: 'Texas', asciiName: 'Texas', geonameId: 4736286 },
];

function sm(
  city: string,
  cityAscii: string,
  iso2: string,
  adminName: string,
  capital: SimpleMapsRow['capital'],
  lat: number,
  lng: number,
): SimpleMapsRow {
  return {
    city,
    cityAscii,
    lat,
    lng,
    country: iso2,
    iso2,
    iso3: iso2,
    adminName,
    capital,
    population: 0,
    id: city,
  };
}

function geoRow(
  geonameId: number,
  asciiName: string,
  countryCode: string,
  admin1Code: string,
  lat: number,
  lng: number,
) {
  return {
    geonameId,
    name: asciiName,
    asciiName,
    alternateNames: '',
    lat,
    lng,
    featureClass: 'P',
    featureCode: 'PPL',
    countryCode,
    cc2: '',
    admin1Code,
    admin2Code: '',
    admin3Code: '',
    admin4Code: '',
    population: 1000,
    elevation: '',
    dem: '',
    timezone: 'UTC',
    modificationDate: '2026-01-01',
  };
}

describe('geodata OVERLAY (TASK-306)', () => {
  const adminNameIndex = buildAdminNameIndex(ADMIN1);

  it('matches exact iso2 + admin1 + ascii name', () => {
    const rows = [
      sm('Austin', 'Austin', 'US', 'Texas', 'admin', 30.27, -97.74),
      sm('Berlin', 'Berlin', 'DE', 'State of Berlin', 'primary', 52.52, 13.4),
    ];
    const index = buildSimpleMapsIndex(rows, adminNameIndex);
    const austin = matchSimpleMaps(geoRow(1, 'Austin', 'US', 'TX', 30.27, -97.74), index);
    const berlin = matchSimpleMaps(geoRow(2950159, 'Berlin', 'DE', '16', 52.52, 13.4), index);
    expect(austin?.capital).toBe('admin');
    expect(berlin?.capital).toBe('primary');
    expect(berlin?.cityAscii).toBe('Berlin');
  });

  it('falls back to a unique country-level name match when admin1 differs', () => {
    // SimpleMaps admin_name may not resolve to a GeoNames admin1 code
    // (e.g. the Basic CSV lists the city name as admin). A unique name
    // within the country still matches.
    const rows = [sm('Vila', 'Vila', 'AD', 'Vila', '', 42.53, 1.56)];
    const index = buildSimpleMapsIndex(rows, adminNameIndex);
    const vila = matchSimpleMaps(geoRow(3038832, 'Vila', 'AD', '03', 42.53, 1.56), index);
    expect(vila).not.toBeNull();
    expect(vila?.city).toBe('Vila');
  });

  it('returns null when no confident match exists', () => {
    const index = buildSimpleMapsIndex([], adminNameIndex);
    const miss = matchSimpleMaps(geoRow(1, 'Nowhereville', 'US', 'TX', 30, -97), index);
    expect(miss).toBeNull();
  });

  it('disambiguates same-name cities across countries by admin1', () => {
    // "Berlin" in DE vs US — exact admin1 match must pick the right one.
    const rows = [
      sm('Berlin', 'Berlin', 'DE', 'State of Berlin', 'primary', 52.52, 13.4),
      sm('Berlin', 'Berlin', 'US', 'New Hampshire', '', 44.48, -71.25),
    ];
    const index = buildSimpleMapsIndex(rows, adminNameIndex);
    const de = matchSimpleMaps(geoRow(2950159, 'Berlin', 'DE', '16', 52.52, 13.4), index);
    expect(de?.capital).toBe('primary');
  });

  it('matches "New York City" to the "New York" metro core (not a borough)', () => {
    // SimpleMaps splits the NYC metro into "New York" (core) + boroughs
    // (Manhattan/Brooklyn). GeoNames uses "New York City". The suffix-
    // stripped match must prefer the metro core.
    const rows = [
      sm('New York', 'New York', 'US', 'New York', '', 40.69, -73.92),
      sm('Manhattan', 'Manhattan', 'US', 'New York', '', 40.78, -73.97),
      sm('Brooklyn', 'Brooklyn', 'US', 'New York', '', 40.65, -73.95),
    ];
    const index = buildSimpleMapsIndex(rows, adminNameIndex);
    const nyc = matchSimpleMaps(geoRow(5128581, 'New York City', 'US', 'NY', 40.71, -74.0), index);
    expect(nyc?.cityAscii).toBe('New York');
  });
});
