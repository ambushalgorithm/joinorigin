/**
 * LOCALIZE step unit tests — Wikidata → GeoNames alternate names → EN
 * fallback chain (geodata §10, TASK-306).
 */

import {
  LOCALES,
  buildNameResolver,
  emptyNames,
  indexAlternateNames,
  LOCALE_TO_WIKIDATA_LANG,
} from '../localize';

describe('geodata LOCALIZE (TASK-306)', () => {
  it('exposes the full 21-locale list (mirrors @joinorigin/i18n)', () => {
    expect(LOCALES).toHaveLength(21);
    for (const l of ['en', 'de', 'es', 'pt-BR', 'zh-CN', 'zh-TW', 'ar', 'fa']) {
      expect(LOCALES).toContain(l);
    }
  });

  it('maps every locale to a Wikidata language tag', () => {
    for (const locale of LOCALES) {
      expect(LOCALE_TO_WIKIDATA_LANG[locale]).toBeTruthy();
    }
  });

  it('builds empty names records for all 21 locales', () => {
    const names = emptyNames();
    expect(Object.keys(names)).toHaveLength(21);
    expect(names.en).toBe('');
  });

  it('indexes GeoNames alternate names into per-geonameId locale maps', () => {
    // Berlin (2950159) alternate names: de + es + wkdt QID.
    const lines = [
      '1591698\t2950159\tde\tBerlin\t1',
      '1591699\t2950159\ten\tBerlin',
      '1565741\t2950159\tes\tBerlín',
      '1591700\t2950159\tpt\tBerlim',
      '19262601\t2950159\twkdt\tQ64',
      '9999999\t2950159\tzz\tzz', // unknown language — skipped
      'bad line', // malformed — skipped
    ];
    const { names, qids } = indexAlternateNames(lines);
    expect(qids.get(2950159)).toBe('Q64');
    expect(names.get(2950159)?.['de']).toBe('Berlin');
    expect(names.get(2950159)?.['es']).toBe('Berlín');
    expect(names.get(2950159)?.['pt-BR']).toBe('Berlim'); // pt → pt-BR mapping
    // Unknown language rows are skipped — no 'zz' key in the partial record.
    const unknown = names.get(2950159) as Record<string, string | undefined>;
    expect(unknown['zz']).toBeUndefined();
  });

  it('resolves via Wikidata first, GeoNames alternates second, EN last', () => {
    const wikidataByQid = new Map([
      ['Q64', { de: 'Berlin', es: 'Berlín' } as Record<string, string>],
    ]);
    const alternates = new Map<number, Record<string, string>>([
      [2950159, { de: 'Berlin (alt)', fr: 'Berlin' }],
    ]);
    const resolve = buildNameResolver(wikidataByQid, alternates);
    const names = resolve('Q64', 2950159, 'Berlin');
    expect(names.de).toBe('Berlin'); // Wikidata wins over GeoNames alt
    expect(names.es).toBe('Berlín');
    expect(names.fr).toBe('Berlin'); // GeoNames alt fills the gap
    expect(names.ar).toBe('Berlin'); // EN fallback
    expect(names['zh-TW']).toBe('Berlin'); // EN fallback for missing zh-TW
  });

  it('falls back to EN when neither Wikidata nor GeoNames has a name', () => {
    const resolve = buildNameResolver(new Map(), new Map());
    const names = resolve(undefined, 3038832, 'Vila');
    for (const locale of LOCALES) {
      expect(names[locale]).toBe('Vila');
    }
  });

  it('uses GeoNames alternates even without a Wikidata QID', () => {
    const alternates = new Map<number, Record<string, string>>([
      [3039163, { es: 'San Julián de Loria', ca: 'Sant Julià de Lòria' }],
    ]);
    const resolve = buildNameResolver(new Map(), alternates);
    const names = resolve(undefined, 3039163, 'Sant Julia de Loria');
    expect(names.es).toBe('San Julián de Loria');
    expect(names.en).toBe('Sant Julia de Loria');
  });
});
