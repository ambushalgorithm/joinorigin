/**
 * JOIN step unit tests — countryInfo/admin1/timeZones join rules with
 * Andorra/US/DE samples (geodata §4, TASK-306).
 */

import {
  buildCountries,
  buildCountryTimeZones,
  buildRegions,
  parseAdmin1Line,
  parseCountryLine,
  parseTimeZoneLine,
} from '../join';

describe('geodata JOIN (TASK-306)', () => {
  it('parses the Andorra countryInfo line (CC BY 4.0 sample)', () => {
    const row = parseCountryLine(
      'AD\tAND\t020\tAN\tAndorra\tAndorra la Vella\t468\t77006\tEU\t.ad\tEUR\tEuro\t376\tAD###\t^(?:AD)*(\\d{3})$\tca\t3041565\tES,FR',
    );
    expect(row).toMatchObject({
      iso2: 'AD',
      iso3: 'AND',
      name: 'Andorra',
      capital: 'Andorra la Vella',
      population: 77006,
      continent: 'EU',
      tld: '.ad',
      currencyCode: 'EUR',
      languages: 'ca',
      geonameId: 3041565,
    });
  });

  it('parses the US countryInfo line with multi-language field', () => {
    const row = parseCountryLine(
      'US\tUSA\t840\tUS\tUnited States\tWashington\t9629091\t327167434\tNA\t.us\tUSD\tDollar\t1\t#####-####\t^\\d{5}(-\\d{4})?$\ten-US,es-US,haw,fr\t6252001\tCA,MX,CU',
    );
    expect(row?.iso2).toBe('US');
    expect(row?.population).toBe(327167434);
    expect(row?.languages).toBe('en-US,es-US,haw,fr');
  });

  it('skips comment/header lines in countryInfo', () => {
    expect(parseCountryLine('#ISO\tISO3')).toBeNull();
    expect(parseCountryLine('')).toBeNull();
  });

  it('parses Germany admin1CodesASCII lines (DE.16 Berlin)', () => {
    const berlin = parseAdmin1Line('DE.16\tState of Berlin\tState of Berlin\t2950157');
    expect(berlin).toMatchObject({
      code: 'DE.16',
      name: 'State of Berlin',
      asciiName: 'State of Berlin',
      geonameId: 2950157,
    });
  });

  it('parses US admin1CodesASCII lines (US.NY)', () => {
    const ny = parseAdmin1Line('US.NY\tNew York\tNew York\t5128638');
    expect(ny).toMatchObject({ code: 'US.NY', geonameId: 5128638 });
  });

  it('builds region ids as lowercase iso2-admin1Code (design §5.2)', () => {
    const regions = buildRegions([
      { code: 'US.TX', name: 'Texas', asciiName: 'Texas', geonameId: 4736286 },
      { code: 'DE.16', name: 'State of Berlin', asciiName: 'State of Berlin', geonameId: 2950157 },
      {
        code: 'AD.06',
        name: 'Sant Julià de Loria',
        asciiName: 'Sant Julia de Loria',
        geonameId: 3039162,
      },
    ]);
    expect(regions).toHaveLength(3);
    expect(regions[0]).toMatchObject({
      id: 'us-tx',
      countryIso2: 'US',
      admin1Code: 'TX',
      name: 'Texas',
    });
    expect(regions[1].id).toBe('de-16');
    expect(regions[2].id).toBe('ad-06');
  });

  it('builds the country table with typed languages arrays', () => {
    const countries = buildCountries([
      {
        iso2: 'DE',
        iso3: 'DEU',
        isoNumeric: '276',
        fips: 'GM',
        name: 'Germany',
        capital: 'Berlin',
        area: '357021',
        population: 82927922,
        continent: 'EU',
        tld: '.de',
        currencyCode: 'EUR',
        currencyName: 'Euro',
        phone: '49',
        postalFormat: '#####',
        postalRegex: '^(\\d{5})$',
        languages: 'de',
        geonameId: 2921044,
        neighbours: 'CH,PL,NL,DK,BE,CZ,LU,FR,AT',
      },
    ]);
    expect(countries[0]).toMatchObject({
      iso2: 'DE',
      iso3: 'DEU',
      name: 'Germany',
      capital: 'Berlin',
      population: 82927922,
      continent: 'EU',
      tld: '.de',
      currency: 'EUR',
      languages: ['de'],
      geonameId: 2921044,
    });
  });

  it('parses timeZones.txt rows and builds the country tz map', () => {
    const rows = [
      parseTimeZoneLine(
        'CountryCode\tTimeZoneId\tGMT offset 1. Jan 2026\tDST offset 1. Jul 2026\trawOffset (independant of DST)',
      ),
      parseTimeZoneLine('CI\tAfrica/Abidjan\t0.0\t0.0\t0.0'),
      parseTimeZoneLine('DE\tEurope/Berlin\t1.0\t2.0\t1.0'),
      parseTimeZoneLine('DE\tEurope/Busingen\t1.0\t2.0\t1.0'),
    ].filter((r) => r !== null);
    expect(rows).toHaveLength(3);
    const map = buildCountryTimeZones(rows);
    expect(map.get('DE')).toBe('Europe/Berlin'); // first tz wins
    expect(map.get('CI')).toBe('Africa/Abidjan');
  });
});
