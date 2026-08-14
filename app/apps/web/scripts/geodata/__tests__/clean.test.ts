/**
 * CLEAN step unit tests — P-class filter with Andorra/US/DE samples
 * (geodata §4 sample asserts, TASK-306).
 */

import { cleanCities, cleanCitiesFromLines, parseCityLine } from '../clean';
import { P_CLASS_FEATURE_CODES } from '../config';
import type { GeoCityRow } from '../types';

/** Real Andorra/US/DE cities500 rows (dump 2026-08-14, sampled verbatim). */
const AD_VILA = [
  3038832,
  'Vila',
  'Vila',
  'Casas Vila,Vila',
  '42.53176',
  '1.56654',
  'P',
  'PPL',
  'AD',
  '',
  '03',
  '',
  '',
  '',
  '1418',
  '',
  '1318',
  'Europe/Andorra',
  '2024-11-04',
].join('\t');

const AD_SANT_JULIA = [
  3039163,
  'Sant Julià de Lòria',
  'Sant Julia de Loria',
  'San Julia,Sant Julià de Lòria',
  '42.46372',
  '1.49129',
  'P',
  'PPLA',
  'AD',
  '',
  '06',
  '',
  '',
  '',
  '8022',
  '',
  '921',
  'Europe/Andorra',
  '2026-04-13',
].join('\t');

const US_NYC = [
  5128581,
  'New York City',
  'New York City',
  'NYC,New York',
  '40.71427',
  '-74.00597',
  'P',
  'PPL',
  'US',
  '',
  'NY',
  '',
  '',
  '',
  '8804190',
  '10',
  '57',
  'America/New_York',
  '2026-03-07',
].join('\t');

const DE_BERLIN = [
  2950159,
  'Berlin',
  'Berlin',
  'BER,Berlin',
  '52.52437',
  '13.41053',
  'P',
  'PPLC',
  'DE',
  '',
  '16',
  '',
  '',
  '',
  '11000',
  '11000000',
  '3426354',
  'Europe/Berlin',
  '2025-07-22',
].join('\t');

/** Non-P feature class (mountain) — must be dropped by CLEAN. */
const MOUNTAIN = [
  3041565,
  'Andorra',
  'Andorra',
  '',
  '42.5',
  '1.5',
  'T',
  'MT',
  'AD',
  '',
  '',
  '',
  '',
  '',
  '0',
  '',
  '',
  'Europe/Andorra',
  '2020-01-01',
].join('\t');

/** P-class code outside the allowed set (farmstead, PPLF) — dropped. */
const P_CLASS_OUTSIDE = [
  9999999,
  'Oldtown',
  'Oldtown',
  '',
  '42.5',
  '1.5',
  'P',
  'PPLF',
  'AD',
  '',
  '03',
  '',
  '',
  '',
  '100',
  '',
  '',
  'Europe/Andorra',
  '2020-01-01',
].join('\t');

describe('geodata CLEAN (TASK-306)', () => {
  it('keeps P-class populated places from the sample rows', () => {
    const cleaned = cleanCitiesFromLines([AD_VILA, AD_SANT_JULIA, US_NYC, DE_BERLIN]);
    expect(cleaned.map((r) => r.geonameId)).toEqual([3038832, 3039163, 5128581, 2950159]);
  });

  it('drops non-P feature classes (T/Mount) and disallowed P-codes', () => {
    const cleaned = cleanCitiesFromLines([MOUNTAIN, P_CLASS_OUTSIDE, AD_VILA]);
    expect(cleaned).toHaveLength(1);
    expect(cleaned[0].geonameId).toBe(3038832);
  });

  it('preserves the schema-critical columns for downstream joins', () => {
    const [nyc] = cleanCitiesFromLines([US_NYC]);
    expect(nyc).toMatchObject({
      geonameId: 5128581,
      asciiName: 'New York City',
      countryCode: 'US',
      admin1Code: 'NY',
      population: 8804190,
      timezone: 'America/New_York',
      featureCode: 'PPL',
    });
  });

  it('parses the Berlin PPLC row and the Andorra PPLA row', () => {
    const berlin = parseCityLine(DE_BERLIN);
    const santJulia = parseCityLine(AD_SANT_JULIA);
    expect(berlin?.featureCode).toBe('PPLC');
    expect(berlin?.countryCode).toBe('DE');
    expect(santJulia?.featureCode).toBe('PPLA');
    expect(santJulia?.admin1Code).toBe('06');
  });

  it('the P-class feature-code set contains the geodata §10 codes', () => {
    for (const code of ['PPLC', 'PPLA', 'PPLA2', 'PPLA3', 'PPLA4', 'PPL']) {
      expect(P_CLASS_FEATURE_CODES.has(code)).toBe(true);
    }
  });

  it('rejects malformed lines', () => {
    expect(parseCityLine('')).toBeNull();
    expect(parseCityLine('not a tsv line at all')).toBeNull();
    expect(parseCityLine('1\tName\tascii\talt\tnotlat\tnotlng')).toBeNull();
  });

  it('typechecks a full GeoCityRow shape', () => {
    const row: GeoCityRow = {
      geonameId: 1,
      name: 'x',
      asciiName: 'x',
      alternateNames: '',
      lat: 1,
      lng: 2,
      featureClass: 'P',
      featureCode: 'PPL',
      countryCode: 'US',
      cc2: '',
      admin1Code: 'NY',
      admin2Code: '',
      admin3Code: '',
      admin4Code: '',
      population: 0,
      elevation: '',
      dem: '',
      timezone: 'America/New_York',
      modificationDate: '2026-01-01',
    };
    expect(cleanCities([row])).toEqual([row]);
  });
});
