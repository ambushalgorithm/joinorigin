/**
 * lib/seo exampleCommunities — Story E target resolver (TASK-536) unit tests.
 *
 * Contract:
 *  - Geo present + well-formed → the CLOSEST content-rich country to the
 *    visitor (their own when it hosts content-rich communities, otherwise
 *    the nearest by haversine distance over dataset city coordinates), then
 *    the LARGEST content-rich community within it (highest population).
 *  - Geo absent / malformed → the locale-language default: the largest
 *    content-rich community in the locale's primary country
 *    (`LOCALE_CITY_SLUGS` ordering).
 *  - The returned path is registry-exact on the ACTIVE locale surface
 *    (`/${locale}/location/...`) — its `/en` counterpart always exists in
 *    the location registry.
 *  - Resolution is deterministic (ties break on `CONTENT_RICH_CITY_SLUGS`
 *    order; derived maps are memoized).
 */

import { type Locale } from '@joinorigin/i18n';

import type { LocationCity } from '../data/types';
import { exampleCommunityTarget } from '../exampleCommunities';
import { contentRichCities } from '../locationData';
import { locationPageEntries } from '../locationPages';

function enRegistryPaths(): Set<string> {
  return new Set(locationPageEntries().map((entry) => entry.path));
}

/** Strip the locale prefix to compare against the EN canonical registry. */
function enCounterpart(path: string, locale: Locale): string {
  return path.replace(`/${locale}`, '/en');
}

describe('lib/seo exampleCommunities — exampleCommunityTarget (Story E)', () => {
  it('resolves the locale-language default (no geo) — en → US / New York', () => {
    const target = exampleCommunityTarget('en');
    expect(target?.country.iso2).toBe('US');
    expect(target?.city.asciiName).toBe('New York');
    expect(target?.path).toBe('/en/location/united-states/new-york/new-york');
  });

  it('resolves the locale-language default for non-EN locales', () => {
    const de = exampleCommunityTarget('de');
    expect(de?.country.iso2).toBe('DE');
    expect(de?.city.asciiName).toBe('Berlin');
    expect(de?.path).toBe('/de/location/germany/berlin/berlin');

    const es = exampleCommunityTarget('es');
    expect(es?.country.iso2).toBe('MX');
    expect(es?.city.asciiName).toBe('Mexico City');

    const ar = exampleCommunityTarget('ar');
    expect(ar?.country.iso2).toBe('AE');
    expect(ar?.city.asciiName).toBe('Dubai');

    const hi = exampleCommunityTarget('hi');
    expect(hi?.country.iso2).toBe('IN');
    expect(hi?.city.asciiName).toBe('Mumbai');
  });

  it('prefers the visitor country when it hosts content-rich communities (distance 0)', () => {
    const us = exampleCommunityTarget('en', 'US');
    expect(us?.country.iso2).toBe('US');
    expect(us?.city.asciiName).toBe('New York');

    const gb = exampleCommunityTarget('en', 'GB');
    expect(gb?.country.iso2).toBe('GB');
    expect(gb?.city.asciiName).toBe('London');
  });

  it('selects the LARGEST content-rich community within the matched country', () => {
    // US content-rich cities: New York (8.8M) > Los Angeles > Chicago > ...
    const us = exampleCommunityTarget('en', 'US');
    expect(us?.city.asciiName).toBe('New York');
    // South Africa: Johannesburg (9.4M) > Cape Town.
    const za = exampleCommunityTarget('en', 'ZA');
    expect(za?.city.asciiName).toBe('Johannesburg');
    // Vietnam: Ho Chi Minh City (14M) > the rest.
    const vn = exampleCommunityTarget('en', 'VN');
    expect(vn?.city.asciiName).toBe('Ho Chi Minh City');
  });

  it('geo wins over the locale-language default on a non-EN surface', () => {
    const deUs = exampleCommunityTarget('de', 'US');
    expect(deUs?.country.iso2).toBe('US');
    expect(deUs?.city.asciiName).toBe('New York');
    expect(deUs?.path).toBe('/de/location/united-states/new-york/new-york');
  });

  it('resolves the CLOSEST content-rich country when the visitor country has none', () => {
    // Finland has no content-rich community — Copenhagen (DK) is the nearest
    // (883 km from Helsinki vs 915 km to Warsaw).
    const fi = exampleCommunityTarget('en', 'FI');
    expect(fi?.country.iso2).toBe('DK');
    expect(fi?.city.asciiName).toBe('Copenhagen');
    expect(fi?.path).toBe('/en/location/denmark/capital-region/copenhagen');

    // Switzerland — Milan (IT) at ~213 km from Bern is the nearest community.
    const ch = exampleCommunityTarget('en', 'CH');
    expect(ch?.country.iso2).toBe('IT');
    expect(ch?.city.asciiName).toBe('Milan');
    expect(ch?.path).toBe('/en/location/italy/lombardy/milan');

    // New Zealand — Australia hosts the nearest content-rich community.
    const nz = exampleCommunityTarget('en', 'NZ');
    expect(nz?.country.iso2).toBe('AU');
    expect(nz?.city.asciiName).toBe('Sydney');
    expect(nz?.path).toBe('/en/location/australia/new-south-wales/sydney');
  });

  it('applies closest-country resolution on a non-EN surface', () => {
    // The geo country wins over the de locale default (DE/Berlin): a Finnish
    // visitor on the German surface still targets the nearest content-rich
    // community (DK/Copenhagen), on the ACTIVE /de path tree.
    const deFi = exampleCommunityTarget('de', 'FI');
    expect(deFi?.country.iso2).toBe('DK');
    expect(deFi?.city.asciiName).toBe('Copenhagen');
    expect(deFi?.path).toBe('/de/location/denmark/capital-region/copenhagen');
  });

  it('falls back to the locale default for well-formed but unknown country codes', () => {
    // 'XX' is syntactically valid alpha-2 but not in the dataset; 'AQ'
    // (Antarctica) has no city row to use as a geographic reference point —
    // both are unresolvable and must fall back to the locale-language
    // default (never a crash, never an arbitrary country).
    expect(exampleCommunityTarget('en', 'XX')?.path).toBe(
      '/en/location/united-states/new-york/new-york',
    );
    expect(exampleCommunityTarget('en', 'AQ')?.path).toBe(
      '/en/location/united-states/new-york/new-york',
    );
  });

  it('falls back to the locale default for absent/malformed geo', () => {
    expect(exampleCommunityTarget('en', null)?.path).toBe(
      '/en/location/united-states/new-york/new-york',
    );
    expect(exampleCommunityTarget('en', undefined)?.path).toBe(
      '/en/location/united-states/new-york/new-york',
    );
    expect(exampleCommunityTarget('en', 'USA')?.path).toBe(
      '/en/location/united-states/new-york/new-york',
    );
    expect(exampleCommunityTarget('en', 'D1')?.path).toBe(
      '/en/location/united-states/new-york/new-york',
    );
  });

  it('normalizes lowercase / whitespace-padded country codes', () => {
    expect(exampleCommunityTarget('en', 'us')?.path).toBe(
      '/en/location/united-states/new-york/new-york',
    );
    expect(exampleCommunityTarget('en', '  gb ')?.path).toBe(
      '/en/location/united-kingdom/england/london',
    );
  });

  it('returns registry-exact localized paths — the /en counterpart exists in the registry', () => {
    const enRegistry = enRegistryPaths();
    const cases: Array<[Locale, string | null]> = [
      ['en', null],
      ['en', 'FI'],
      ['de', null],
      ['de', 'US'],
      ['es', null],
      ['ar', null],
      ['hi', null],
      ['ja', null],
    ];
    for (const [locale, country] of cases) {
      const target = exampleCommunityTarget(locale, country);
      expect(target).toBeDefined();
      expect(target?.path).toMatch(new RegExp(`^/${locale}/location/`));
      expect(enRegistry.has(enCounterpart(target!.path, locale))).toBe(true);
    }
  });

  it('resolves a registry-exact target for every locale, with and without geo', () => {
    // Broad sweep: every locale surface resolves BOTH its locale-language
    // default (no geo) and a closest-country target (FI → DK) to a
    // registry-exact path on that surface. Guards against a data/locale
    // regression anywhere in the 21-locale tree.
    const enRegistry = enRegistryPaths();
    const locales: Locale[] = [
      'en',
      'de',
      'fr',
      'es',
      'pt-BR',
      'it',
      'nl',
      'pl',
      'tr',
      'uk',
      'ru',
      'fa',
      'ar',
      'hi',
      'ja',
      'ko',
      'zh-TW',
      'zh-CN',
      'id',
      'th',
      'vi',
    ];
    for (const locale of locales) {
      for (const country of [null, 'FI'] as Array<string | null>) {
        const target = exampleCommunityTarget(locale, country);
        expect(target).toBeDefined();
        expect(target?.path).toMatch(new RegExp(`^/${locale}/location/`));
        expect(enRegistry.has(enCounterpart(target!.path, locale))).toBe(true);
      }
    }
  });

  it('returns the LARGEST content-rich city in the matched country (data-level check)', () => {
    // For every content-rich country the resolver must return the
    // highest-population content-rich city within it, and the country
    // object must be the city's own country (invariant for link metadata).
    const byCountry = new Map<string, LocationCity[]>();
    for (const city of contentRichCities()) {
      const list = byCountry.get(city.countryIso2) ?? [];
      list.push(city);
      byCountry.set(city.countryIso2, list);
    }
    for (const iso2 of byCountry.keys()) {
      const target = exampleCommunityTarget('en', iso2);
      expect(target).toBeDefined();
      expect(target?.country.iso2).toBe(iso2);
      expect(target?.city.countryIso2).toBe(iso2);
      const maxPop = Math.max(...byCountry.get(iso2)!.map((city) => city.population ?? 0));
      expect(target?.city.population ?? 0).toBe(maxPop);
    }
  });

  it('is deterministic across repeated calls', () => {
    const first = exampleCommunityTarget('en', 'FI');
    const second = exampleCommunityTarget('en', 'FI');
    expect(second).toEqual(first);
  });
});
