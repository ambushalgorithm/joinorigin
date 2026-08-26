/**
 * lib/seo exampleCommunities — Story E target resolver (TASK-536) + Story B
 * per-chip group-type variant resolver (TASK-545) unit tests.
 *
 * Contract (Story E):
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
 *
 * Contract (Story B — per chip):
 *  - startupFounders→startup, smallBusinesses→small-business,
 *    bookClubs|runClubs|peeWeeLeagues|communityOrganizations→meetup,
 *    anyoneWithAnIdea→ideas — variant pages of the same closest-largest
 *    content-rich city (reuses `exampleCommunityTarget` geo+locale).
 *  - Deterministic fallback when the mapped variant lacks COMMITTED content
 *    for that city/locale (the per-locale registry does not enumerate it):
 *    `/ideas` else the city page.
 */

import { type Locale } from '@joinorigin/i18n';

import type { LocationCity } from '../data/types';
import {
  EXAMPLE_COMMUNITY_CHIP_KEYS,
  chipVariantFallbackPath,
  exampleCommunityChipTarget,
  exampleCommunityChipTargets,
  exampleCommunityTarget,
} from '../exampleCommunities';
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

describe('lib/seo exampleCommunities — chipVariantFallbackPath (Story B fallback chain)', () => {
  const NYC = '/en/location/united-states/new-york/new-york';

  it('returns the mapped variant path when it is committed', () => {
    const committed = new Set([`${NYC}/startup`, `${NYC}/ideas`]);
    expect(chipVariantFallbackPath(NYC, 'startup', committed)).toEqual({
      path: `${NYC}/startup`,
      variantCommitted: true,
    });
  });

  it('falls back to /ideas when the mapped variant is uncommitted but the idea page is committed', () => {
    const committed = new Set([NYC, `${NYC}/ideas`]);
    expect(chipVariantFallbackPath(NYC, 'startup', committed)).toEqual({
      path: `${NYC}/ideas`,
      variantCommitted: false,
    });
  });

  it('falls back to the city page when neither the variant nor the idea page is committed', () => {
    const committed = new Set([NYC]);
    expect(chipVariantFallbackPath(NYC, 'startup', committed)).toEqual({
      path: NYC,
      variantCommitted: false,
    });
  });
});

describe('lib/seo exampleCommunities — exampleCommunityChipTarget (Story B)', () => {
  it('maps every chip to its group-type variant of the closest-largest city (en default → New York)', () => {
    expect(exampleCommunityChipTarget('startupFounders', 'en')?.path).toBe(
      '/en/location/united-states/new-york/new-york/startup',
    );
    expect(exampleCommunityChipTarget('smallBusinesses', 'en')?.path).toBe(
      '/en/location/united-states/new-york/new-york/small-business',
    );
    for (const chip of [
      'bookClubs',
      'communityOrganizations',
      'runClubs',
      'peeWeeLeagues',
    ] as const) {
      expect(exampleCommunityChipTarget(chip, 'en')?.path).toBe(
        '/en/location/united-states/new-york/new-york/meetup',
      );
    }
    expect(exampleCommunityChipTarget('anyoneWithAnIdea', 'en')?.path).toBe(
      '/en/location/united-states/new-york/new-york/ideas',
    );
  });

  it('returns the mapped variant and the committed flag on committed surfaces', () => {
    const target = exampleCommunityChipTarget('startupFounders', 'en');
    expect(target?.variant).toBe('startup');
    expect(target?.variantCommitted).toBe(true);
    expect(target?.country.iso2).toBe('US');
    expect(target?.city.asciiName).toBe('New York');
  });

  it('reuses exampleCommunityTarget geo + locale resolution (closest-largest city)', () => {
    // Geo wins: a UK visitor targets the largest content-rich city in the UK.
    const gb = exampleCommunityChipTarget('startupFounders', 'en', 'GB');
    expect(gb?.country.iso2).toBe('GB');
    expect(gb?.city.asciiName).toBe('London');
    expect(gb?.path).toBe('/en/location/united-kingdom/england/london/startup');

    // A German visitor on the German surface gets the committed Berlin variant.
    const de = exampleCommunityChipTarget('smallBusinesses', 'de');
    expect(de?.city.asciiName).toBe('Berlin');
    expect(de?.path).toBe('/de/location/germany/berlin/berlin/small-business');
    expect(de?.variantCommitted).toBe(true);

    // Geo wins on a non-EN surface when the resolved city has committed
    // content in that locale (Mexico City is a committed `es` city).
    const esMx = exampleCommunityChipTarget('startupFounders', 'es', 'MX');
    expect(esMx?.country.iso2).toBe('MX');
    expect(esMx?.city.asciiName).toBe('Mexico City');
    expect(esMx?.path).toBe('/es/location/mexico/mexico-city/mexico-city/startup');
    expect(esMx?.variantCommitted).toBe(true);
  });

  it('falls back to the city page when the mapped variant lacks committed content for the locale', () => {
    // A US visitor on the German surface resolves New York, which has NO
    // committed German variant/ideas content → the deterministic fallback is
    // the New York CITY page (Story E path), never a broken variant URL.
    const target = exampleCommunityChipTarget('startupFounders', 'de', 'US');
    expect(target?.country.iso2).toBe('US');
    expect(target?.city.asciiName).toBe('New York');
    expect(target?.variant).toBe('startup');
    expect(target?.variantCommitted).toBe(false);
    expect(target?.path).toBe('/de/location/united-states/new-york/new-york');

    // The ideas-mapped chip falls back the same way on the same surface.
    const ideas = exampleCommunityChipTarget('anyoneWithAnIdea', 'de', 'US');
    expect(ideas?.path).toBe('/de/location/united-states/new-york/new-york');
    expect(ideas?.variantCommitted).toBe(false);
  });

  it('falls back to /ideas when the idea page is committed on the surface', () => {
    // Berlin has committed German idea-page content, so the ideas-mapped chip
    // points at the committed /ideas page (the intermediate fallback rung).
    const ideas = exampleCommunityChipTarget('anyoneWithAnIdea', 'de');
    expect(ideas?.path).toBe('/de/location/germany/berlin/berlin/ideas');
    expect(ideas?.variantCommitted).toBe(true);
  });

  it('returns registry-exact localized paths for every chip across surfaces', () => {
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
      for (const chip of EXAMPLE_COMMUNITY_CHIP_KEYS) {
        for (const country of [null, 'FI', 'US'] as Array<string | null>) {
          const target = exampleCommunityChipTarget(chip, locale, country);
          expect(target).toBeDefined();
          expect(target?.path).toMatch(new RegExp(`^/${locale}/location/`));
          expect(enRegistry.has(enCounterpart(target!.path, locale))).toBe(true);
        }
      }
    }
  });

  it('is deterministic across repeated calls', () => {
    const first = exampleCommunityChipTarget('startupFounders', 'de', 'US');
    const second = exampleCommunityChipTarget('startupFounders', 'de', 'US');
    expect(second).toEqual(first);
  });
});

describe('lib/seo exampleCommunities — exampleCommunityChipTargets (Story B aggregate)', () => {
  it('resolves all seven chips in one pass with the same base city', () => {
    const targets = exampleCommunityChipTargets('en');
    expect(targets).toBeDefined();
    const base = exampleCommunityTarget('en');
    for (const chip of EXAMPLE_COMMUNITY_CHIP_KEYS) {
      const target = targets?.[chip];
      expect(target).toBeDefined();
      expect(target?.country.iso2).toBe(base?.country.iso2);
      expect(target?.city.asciiName).toBe(base?.city.asciiName);
      expect(target?.path).toMatch(new RegExp(`^/en/location/`));
    }
    expect(Object.keys(targets ?? {})).toHaveLength(EXAMPLE_COMMUNITY_CHIP_KEYS.length);
  });

  it('matches the per-chip resolver exactly', () => {
    const aggregate = exampleCommunityChipTargets('de', 'US');
    expect(aggregate).toBeDefined();
    for (const chip of EXAMPLE_COMMUNITY_CHIP_KEYS) {
      expect(aggregate?.[chip]).toEqual(exampleCommunityChipTarget(chip, 'de', 'US'));
    }
  });

  it('is deterministic and frozen (callers cannot mutate the shared map)', () => {
    const first = exampleCommunityChipTargets('en');
    const second = exampleCommunityChipTargets('en');
    expect(second).toEqual(first);
    expect(Object.isFrozen(first)).toBe(true);
  });
});
