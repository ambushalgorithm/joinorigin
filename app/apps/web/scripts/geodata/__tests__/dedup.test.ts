/**
 * DEDUP step unit tests — dedup key + highest-population rule + sameName
 * flag with Andorra/US/DE samples (geodata §10, TASK-306).
 */

import { dedupCities, dedupKey } from '../dedup';
import { cleanCitiesFromLines } from '../clean';
import type { GeoCityRow } from '../types';

/** Build a city row inline (fields mirroring cities500 columns). */
function row(
  geonameId: number,
  name: string,
  asciiName: string,
  countryCode: string,
  admin1Code: string,
  population: number,
  featureCode: string,
  timezone = 'Europe/Andorra',
): GeoCityRow {
  return {
    geonameId,
    name,
    asciiName,
    alternateNames: '',
    lat: 42.5,
    lng: 1.5,
    featureClass: 'P',
    featureCode,
    countryCode,
    cc2: '',
    admin1Code,
    admin2Code: '',
    admin3Code: '',
    admin4Code: '',
    population,
    elevation: '',
    dem: '',
    timezone,
    modificationDate: '2026-01-01',
  };
}

describe('geodata DEDUP (TASK-306)', () => {
  it('groups by (asciiName, country, admin1)', () => {
    const a = row(1, 'Springfield', 'Springfield', 'US', 'IL', 1000, 'PPL');
    const b = row(2, 'Springfield', 'Springfield', 'US', 'MA', 2000, 'PPL');
    expect(dedupKey(a)).not.toBe(dedupKey(b));
    // Same ascii + country + admin1 → identical key regardless of id/pop.
    expect(dedupKey(row(3, 'Springfield', 'Springfield', 'US', 'IL', 1, 'PPL'))).toBe(dedupKey(a));
  });

  it('keeps the highest population within a (ascii, country, admin1) bucket', () => {
    const rows = cleanCitiesFromLines([
      // Duplicate ascii+country+admin1: two Springfield, IL rows.
      '1\tSpringfield\tSpringfield\t\t42\t1\tP\tPPL\tUS\t\tIL\t\t\t\t500\t\t\tAmerica/Chicago\t2026-01-01',
      '2\tSpringfield\tSpringfield\t\t42\t1\tP\tPPL\tUS\t\tIL\t\t\t\t9000\t\t\tAmerica/Chicago\t2026-01-01',
      '3\tOther\tOther\t\t42\t1\tP\tPPL\tUS\t\tIL\t\t\t\t100\t\t\tAmerica/Chicago\t2026-01-01',
    ]);
    const { cities } = dedupCities(rows);
    const springfield = cities.find((c) => c.geonameId === 2);
    expect(springfield).toBeDefined();
    expect(cities).toHaveLength(2);
  });

  it('prefers a higher feature-code priority over population (PPLC > PPLA > PPL)', () => {
    // Same bucket: PPLC (Berlin) with lower pop beats a hypothetical PPL row.
    const rows = [
      row(1, 'Berlin', 'Berlin', 'DE', '16', 9000000, 'PPL'),
      row(2950159, 'Berlin', 'Berlin', 'DE', '16', 11000, 'PPLC'),
    ];
    const { cities } = dedupCities(rows);
    expect(cities).toHaveLength(1);
    expect(cities[0].geonameId).toBe(2950159);
    expect(cities[0].featureCode).toBe('PPLC');
  });

  it('flags sameName when the ascii name collides across buckets', () => {
    // "Berlin" in DE (admin1 16) and US (admin1 NH) — same name, different bucket.
    const rows = cleanCitiesFromLines([
      '2950159\tBerlin\tBerlin\t\t52.5\t13.4\tP\tPPLC\tDE\t\t16\t\t\t\t11000\t\t\tEurope/Berlin\t2026-01-01',
      '4182096\tBerlin\tBerlin\t\t31.1\t-83.6\tP\tPPL\tUS\t\tGA\t\t\t\t559\t\t\tAmerica/New_York\t2026-01-01',
      '3038832\tVila\tVila\t\t42.5\t1.5\tP\tPPL\tAD\t\t03\t\t\t\t1418\t\t\tEurope/Andorra\t2026-01-01',
    ]);
    const { cities, sameNameAscii } = dedupCities(rows);
    const berlinDe = cities.find((c) => c.countryCode === 'DE');
    const berlinUs = cities.find((c) => c.countryCode === 'US');
    const vila = cities.find((c) => c.geonameId === 3038832);
    expect(berlinDe).toBeDefined();
    expect(berlinUs).toBeDefined();
    expect(vila).toBeDefined();
    expect(sameNameAscii.has('berlin')).toBe(true);
    expect(sameNameAscii.has('vila')).toBe(false);
    expect(cities.map((c) => c.geonameId).sort()).toEqual([2950159, 3038832, 4182096]);
  });

  it('keeps both Andorra admin1 districts that share a name only in one bucket', () => {
    // Andorra: Sant Julià de Lòria (PPLA) vs its parish; same bucket dedups.
    const rows = cleanCitiesFromLines([
      '3039163\tSant Julià de Lòria\tSant Julia de Loria\t\t42.46\t1.49\tP\tPPLA\tAD\t\t06\t\t\t\t8022\t\t\tEurope/Andorra\t2026-01-01',
      '3038832\tVila\tVila\t\t42.53\t1.56\tP\tPPL\tAD\t\t03\t\t\t\t1418\t\t\tEurope/Andorra\t2026-01-01',
    ]);
    const { cities } = dedupCities(rows);
    expect(cities).toHaveLength(2);
  });

  it('produces a deterministic survivor on population ties', () => {
    const rows = [
      row(10, 'Tieville', 'Tieville', 'US', 'CA', 500, 'PPL'),
      row(5, 'Tieville', 'Tieville', 'US', 'CA', 500, 'PPL'),
    ];
    const { cities } = dedupCities(rows);
    expect(cities).toHaveLength(1);
    expect(cities[0].geonameId).toBe(5); // lowest id wins the tie-break.
  });
});
