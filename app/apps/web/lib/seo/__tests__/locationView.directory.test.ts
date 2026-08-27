/**
 * lib/seo locationView — flagship list + 5-section browse-locations
 * directory (TASK-480 / TASK-482 / TASK-484) unit tests.
 *
 * Asserts flagshipCities returns the content-rich set (locale area first,
 * capped 6), hubDirectoryEntries splits into Countries / Regions / Cities /
 * Community types / Event ideas with per-section IP-country → locale-
 * language → alphabetical ordering, and the complete content-rich
 * inventory (38/54/56/280/56) carries the enriched searchText.
 */

import { SUPPORTED_LOCALES, type Locale } from '@joinorigin/i18n';

import { buildLocationViewData, flagshipCities, hubDirectoryEntries } from '../locationView';
import { locationPageEntries } from '../locationPages';
import {
  CONTENT_RICH_CITY_SLUGS,
  cityDisplayName,
  citySlug,
  contentRichCities,
  localeCountryCodes,
  tierForCitySlug,
} from '../locationData';
import { filterByKeyword } from '../../search/hubFilter';

describe('lib/seo locationView — TASK-480 flagship list + 5-section directory', () => {
  it('flagshipCities returns ALL content-rich cities, locale area first, capped at 6', () => {
    const en = flagshipCitiesForTest('en');
    expect(en).toHaveLength(6);
    // EN surface → English-speaking area first, alphabetical by display name.
    expect(en.map((city) => city.name)).toEqual([
      'Austin',
      'Cape Town',
      'Chicago',
      'Dublin',
      'Johannesburg',
      'Lagos',
    ]);
    // de surface → German cities (Berlin + Munich) lead.
    const de = flagshipCitiesForTest('de');
    expect(de.map((city) => city.name).slice(0, 2)).toEqual(['Berlin', 'Munich']);
  });

  it('hub siblingCities = the flagship list (content-rich, capped 6) on the hub (TASK-480)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    const data = buildLocationViewData(hub!);
    expect(data.siblingCities).toHaveLength(6);
    expect(data.siblingCities[0].name).toBe('Austin');
    for (const city of data.siblingCities) {
      expect(city.path).toMatch(/^\/en\/location\//);
    }
  });

  it('hubDirectoryEntries splits every entry into one of the 5 sections (TASK-480)', () => {
    const directory = hubDirectoryEntries('en');
    expect(directory.length).toBeGreaterThan(0);
    const sections = new Set(directory.map((entry) => entry.section));
    expect(sections).toEqual(
      new Set(['countries', 'regions', 'cities', 'communityTypes', 'eventIdeas']),
    );
    // Section membership follows the kind mapping.
    for (const entry of directory) {
      const expected =
        entry.kind === 'country'
          ? 'countries'
          : entry.kind === 'region'
            ? 'regions'
            : entry.kind === 'city'
              ? 'cities'
              : entry.kind === 'variant'
                ? 'communityTypes'
                : 'eventIdeas';
      expect(entry.section).toBe(expected);
    }
  });

  it('every directory entry carries its associated country for geo ordering (TASK-480)', () => {
    const directory = hubDirectoryEntries('en');
    const germany = directory.find((entry) => entry.name === 'Origins in Germany');
    expect(germany?.countryIso2).toBe('DE');
    const berlin = directory.find((entry) => entry.name === 'Origins in Berlin');
    expect(berlin?.countryIso2).toBe('DE');
    // Community types + Event ideas resolve via their associated city's country.
    const berlinStartup = directory.find((entry) => entry.name === 'Startup Origins in Berlin');
    expect(berlinStartup?.countryIso2).toBe('DE');
    const berlinIdeas = directory.find((entry) => entry.name === '30 Origin event ideas in Berlin');
    expect(berlinIdeas?.countryIso2).toBe('DE');
  });

  it('orders each section: IP-country matches → locale-language matches → alphabetical (TASK-480)', () => {
    // IP-country = DE: German entries rank first in every section.
    const deIp = hubDirectoryEntries('en', 'DE');
    const cityNames = deIp.filter((entry) => entry.section === 'cities').map((entry) => entry.name);
    expect(cityNames[0]).toBe('Origins in Berlin');
    expect(cityNames[1]).toBe('Origins in Munich, Bavaria');
    // ...then the EN-locale-area cities, then the rest, alphabetical overall.
    // TASK-484: the regions section is the full content-rich region set (54)
    // — with a DE IP the German regions (Bavaria + Berlin) lead alphabetically.
    const regionNames = deIp
      .filter((entry) => entry.section === 'regions')
      .map((entry) => entry.name);
    expect(regionNames[0]).toBe('Communities in Bavaria');
    expect(regionNames[1]).toBe('Origins in Berlin, Germany');
    // Community types + event ideas rank via their city's country.
    const types = deIp
      .filter((entry) => entry.section === 'communityTypes')
      .map((entry) => entry.name);
    expect(types[0]).toBe('Creative & design Origins in Berlin');
  });

  it('orders by locale-language matches first when no IP-country is present (null-safe fallback)', () => {
    // No IP country (local request) → locale-language matches rank first.
    const deLocale = hubDirectoryEntries('de', null);
    const cityNames = deLocale
      .filter((entry) => entry.section === 'cities')
      .map((entry) => entry.name);
    expect(cityNames[0]).toBe('Communities in Berlin');
    expect(cityNames[1]).toBe('Origins in Munich, Bavaria');
  });

  it('keeps alphabetical order within a section when neither IP nor locale matches', () => {
    // ja area = Japan only → Japanese ideas rank first; the remaining
    // ideas fall back to alphabetical order.
    const directory = hubDirectoryEntries('ja', null);
    const ideas = directory.filter((entry) => entry.section === 'eventIdeas');
    expect(ideas.length).toBeGreaterThan(0);
    expect(ideas[0].countryIso2).toBe('JP');
    const nonJp = ideas.filter((entry) => entry.countryIso2 !== 'JP').map((entry) => entry.name);
    const sorted = [...nonJp].sort((a, b) => a.localeCompare(b));
    expect(nonJp).toEqual(sorted);
  });

  it('buildLocationViewData threads ipCountry into the hub directory (TASK-480)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    const data = buildLocationViewData(hub!, 'en', 'DE');
    const cities = (data.hubDirectory ?? []).filter((entry) => entry.section === 'cities');
    expect(cities[0].name).toBe('Origins in Berlin');
    // Without an IP country the same surface falls back to locale ordering.
    const fallback = buildLocationViewData(hub!, 'en');
    const fallbackCities = (fallback.hubDirectory ?? []).filter(
      (entry) => entry.section === 'cities',
    );
    expect(fallbackCities[0].name).not.toBe('Origins in Berlin');
  });
});

describe('lib/seo locationView — TASK-482 flagship/start-local + browse-locations ordering (extended)', () => {
  const SECTIONS = ['countries', 'regions', 'cities', 'communityTypes', 'eventIdeas'] as const;

  /** Spec rank for a directory entry (TASK-480): 0 = IP-country match,
   *  1 = active-locale language-area match, 2 = otherwise. */
  function directoryRank(
    entry: { countryIso2?: string },
    localeCountries: ReadonlySet<string>,
    ipCountry: string | null,
  ): number {
    const country = entry.countryIso2 ?? '';
    if (ipCountry && country === ipCountry) return 0;
    if (localeCountries.has(country)) return 1;
    return 2;
  }

  /** The expected per-section order for a surface: section order first, then
   *  rank (IP-country → locale-language → other), then name alphabetical. */
  function assertSectionOrder(
    directory: ReturnType<typeof hubDirectoryEntries>,
    localeCountries: ReadonlySet<string>,
    ipCountry: string | null,
  ) {
    // Sections appear in the fixed 5-section order (no interleaving).
    const expectedSectionOrder = SECTIONS.flatMap((section) =>
      directory.filter((entry) => entry.section === section).map(() => section),
    );
    expect(directory.map((entry) => entry.section)).toEqual(expectedSectionOrder);
    // Walk each section: ranks non-decreasing; ties alphabetical by name.
    for (const section of SECTIONS) {
      const entries = directory.filter((entry) => entry.section === section);
      for (let i = 0; i < entries.length; i++) {
        const rank = directoryRank(entries[i], localeCountries, ipCountry);
        if (i > 0) {
          const prevRank = directoryRank(entries[i - 1], localeCountries, ipCountry);
          if (prevRank !== rank) {
            expect(prevRank).toBeLessThan(rank);
          } else {
            expect(entries[i - 1].name.localeCompare(entries[i].name)).toBeLessThanOrEqual(0);
          }
        }
      }
    }
  }

  it('flagshipCities includes EVERY content-rich city when the cap allows (tier-irrelevant)', () => {
    const all = flagshipCities('en', 100);
    // 55 approved Tier-2 cities + Tier-3 Copenhagen = 56 content-rich cities.
    expect(all).toHaveLength(CONTENT_RICH_CITY_SLUGS.length);
    expect(CONTENT_RICH_CITY_SLUGS.length).toBe(56);
    const names = all.map((city) => city.name);
    // Tier-1 flagships…
    expect(names).toContain('New York City');
    expect(names).toContain('Berlin');
    // …Tier-2 approved cities…
    expect(names).toContain('Austin');
    expect(names).toContain('Dubai');
    // …AND Tier-3 content-rich cities (Copenhagen) — tier-irrelevant.
    expect(names).toContain('Copenhagen');
    // The source set spans all three tiers.
    const tiers = new Set(contentRichCities().map((city) => tierForCitySlug(citySlug(city))));
    expect(tiers).toEqual(new Set([1, 2, 3]));
  });

  it('flagshipCities caps at 6 by default on EVERY locale surface', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const list = flagshipCities(locale);
      expect(list).toHaveLength(6);
    }
  });

  it('flagshipCities orders the active locale area first, then alphabetical (more surfaces)', () => {
    // es surface: Spanish-speaking cities lead (Barcelona … Madrid).
    const es = flagshipCities('es');
    expect(es.map((city) => city.name)).toEqual([
      'Barcelona',
      'Barranquilla',
      'Bogota',
      'Buenos Aires',
      'Lima',
      'Madrid',
    ]);
    // ja surface: Japanese cities lead (Osaka before Tokyo alphabetically).
    const ja = flagshipCities('ja');
    expect(ja.map((city) => city.name).slice(0, 2)).toEqual(['Osaka', 'Tokyo']);
    // ar surface: Arabic-area cities lead (Cairo, Casablanca, Dubai).
    const ar = flagshipCities('ar');
    expect(ar.map((city) => city.name).slice(0, 3)).toEqual(['Cairo', 'Casablanca', 'Dubai']);
  });

  it('flagshipCities satisfies the ordering contract for every locale (area → alphabetical)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const localeCountries = localeCountryCodes(locale);
      const list = flagshipCities(locale, 100);
      const expected = contentRichCities()
        .slice()
        .sort((a, b) => {
          const aLocal = localeCountries.has(a.countryIso2) ? 0 : 1;
          const bLocal = localeCountries.has(b.countryIso2) ? 0 : 1;
          if (aLocal !== bLocal) return aLocal - bLocal;
          return cityDisplayName(a).localeCompare(cityDisplayName(b));
        })
        .slice(0, 100);
      expect(list.map((city) => city.name)).toEqual(expected.map((city) => cityDisplayName(city)));
    }
  });

  it('every flagship card href resolves in the EN registry (no dead links)', () => {
    const registryPaths = new Set(locationPageEntries().map((entry) => entry.path));
    const enList = flagshipCities('en', 100);
    for (const city of enList) {
      expect(registryPaths.has(city.path)).toBe(true);
    }
  });

  it('hubDirectoryEntries emits sections in the fixed 5-section order (no interleaving)', () => {
    const directory = hubDirectoryEntries('en');
    const order = directory.map((entry) => entry.section);
    const expected = SECTIONS.flatMap((section) =>
      directory.filter((entry) => entry.section === section).map(() => section),
    );
    expect(order).toEqual(expected);
  });

  it('per-section ordering: IP-country matches → locale-language → alphabetical (US IP)', () => {
    const directory = hubDirectoryEntries('en', 'US');
    assertSectionOrder(directory, localeCountryCodes('en'), 'US');
    // Concrete: US entries lead every section.
    const cities = directory.filter((entry) => entry.section === 'cities');
    expect(cities[0].countryIso2).toBe('US');
    expect(cities[0].name).toBe('Origins in Austin, Texas');
    // Community types + event ideas rank via their associated city's country.
    const types = directory.filter((entry) => entry.section === 'communityTypes');
    expect(types[0].countryIso2).toBe('US');
    const ideas = directory.filter((entry) => entry.section === 'eventIdeas');
    expect(ideas[0].countryIso2).toBe('US');
    // Countries + regions lead with the IP country too.
    expect(directory.find((entry) => entry.section === 'countries')?.countryIso2).toBe('US');
    expect(directory.find((entry) => entry.section === 'regions')?.countryIso2).toBe('US');
  });

  it('per-section ordering holds for a non-EN surface with IP-country (de surface, DE IP)', () => {
    const directory = hubDirectoryEntries('de', 'DE');
    assertSectionOrder(directory, localeCountryCodes('de'), 'DE');
    const cities = directory.filter((entry) => entry.section === 'cities');
    expect(cities[0].name).toBe('Communities in Berlin');
    expect(cities[0].countryIso2).toBe('DE');
  });

  it('IP-country matches outrank locale-language matches even outside the locale area (JP IP on en)', () => {
    // JP is not in the en language area — yet a JP visitor's country must
    // rank first in every section (IP-country beats locale-language).
    const directory = hubDirectoryEntries('en', 'JP');
    assertSectionOrder(directory, localeCountryCodes('en'), 'JP');
    const cities = directory.filter((entry) => entry.section === 'cities');
    expect(cities[0].countryIso2).toBe('JP');
    expect(cities[0].name).toBe('Origins in Osaka');
    expect(cities[1].countryIso2).toBe('JP');
    expect(cities[1].name).toBe('Origins in Tokyo');
    // JP ideas rank first even though ja is not the active locale.
    const ideas = directory.filter((entry) => entry.section === 'eventIdeas');
    expect(ideas[0].countryIso2).toBe('JP');
    expect(ideas[1].countryIso2).toBe('JP');
  });

  it('IP-country-absent fallback: locale-language ordering only, never an IP rank', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const directory = hubDirectoryEntries(locale, null);
      const localeCountries = localeCountryCodes(locale);
      assertSectionOrder(directory, localeCountries, null);
      // No entry may be ranked by a (non-existent) IP country.
      for (const entry of directory) {
        expect(directoryRank(entry, localeCountries, null)).not.toBe(0);
      }
      // Locale-language matches still lead the cities section (every locale
      // has at least one content city in its own language area).
      const cities = directory.filter((entry) => entry.section === 'cities');
      expect(cities.length).toBeGreaterThan(0);
      expect(cities[0].countryIso2).toBeDefined();
      expect(localeCountries.has(cities[0].countryIso2 ?? '')).toBe(true);
    }
  });

  it('hub view siblingCities equals the flagship list on the ACTIVE locale surface (TASK-480)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    for (const locale of ['en', 'de', 'es'] as Locale[]) {
      const data = buildLocationViewData(hub!, locale);
      const flagships = flagshipCities(locale);
      expect(data.siblingCities.map((city) => city.name)).toEqual(
        flagships.map((city) => city.name),
      );
      expect(data.siblingCities.map((city) => city.path)).toEqual(
        flagships.map((city) => city.path),
      );
    }
  });
});

describe('lib/seo locationView — TASK-484 complete content-rich inventory + searchText', () => {
  const SECTIONS = ['countries', 'regions', 'cities', 'communityTypes', 'eventIdeas'] as const;

  it('membership = the full content-rich set (noindex included), NOT the indexable set', () => {
    const directory = hubDirectoryEntries('en');
    // Countries = distinct countries of content-rich cities; Regions =
    // distinct regions; Cities = 56 content-rich cities (incl. Copenhagen);
    // Community types = 56 × 5; Event ideas = 56. Total ≈ 485.
    const counts = Object.fromEntries(
      SECTIONS.map((section) => [
        section,
        directory.filter((entry) => entry.section === section).length,
      ]),
    );
    expect(counts).toEqual({
      countries: 38,
      regions: 54,
      cities: 56,
      communityTypes: 280,
      eventIdeas: 56,
    });
    expect(directory).toHaveLength(38 + 54 + 56 + 280 + 56);
    // Tier-3/noindex content is browsable — Copenhagen's city + variants + ideas.
    const copenhagenEntries = directory.filter((entry) => entry.path.includes('/copenhagen'));
    expect(copenhagenEntries).toHaveLength(7); // city + 5 variants + ideas
  });

  it('city cards are the 56 intended rows — the 7 slug-collision duplicates are dropped', () => {
    const cityPaths = hubDirectoryEntries('en')
      .filter((entry) => entry.section === 'cities')
      .map((entry) => entry.path);
    expect(cityPaths).toHaveLength(56);
    expect(new Set(cityPaths).size).toBe(56);
    // The content-rich rows resolve deterministically to their intended
    // countries — never the first-match duplicate (London, Ontario; Madrid,
    // Colombia; Los Ángeles, Chile; San Francisco, El Salvador; Vancouver,
    // Washington; Barcelona, Venezuela; New Taipei City).
    expect(cityPaths).toContain('/en/location/united-kingdom/england/london');
    expect(cityPaths).toContain('/en/location/spain/madrid/madrid');
    expect(cityPaths).toContain('/en/location/united-states/california/los-angeles');
    expect(cityPaths).toContain('/en/location/united-states/california/san-francisco');
    expect(cityPaths).toContain('/en/location/canada/british-columbia/vancouver');
    expect(cityPaths).toContain('/en/location/spain/catalonia/barcelona');
    expect(cityPaths).toContain('/en/location/taiwan/taiwan/taipei');
    for (const dropped of [
      '/en/location/canada/ontario/london',
      '/en/location/colombia/cundinamarca/madrid',
      '/en/location/chile/biobio/los-angeles',
      '/en/location/el-salvador/morazan/san-francisco',
      '/en/location/united-states/washington/vancouver',
      '/en/location/venezuela/anzoategui/barcelona',
      '/en/location/taiwan/taipei/taipei',
    ]) {
      expect(cityPaths).not.toContain(dropped);
    }
  });

  it('every directory card carries a searchText with EN + localized country/region names', () => {
    const directory = hubDirectoryEntries('en');
    expect(directory.length).toBeGreaterThan(0);
    for (const entry of directory) {
      expect(entry.searchText.length).toBeGreaterThan(0);
      // The active-locale name + EN name are always present.
      expect(entry.searchText).toContain(entry.name);
    }
    // EN surface — dataset country/region names let "Colombia" / "Italy"
    // resolve their cities, community types, and event ideas.
    const bogotaIdeas = directory.find(
      (entry) => entry.kind === 'ideas' && entry.name.includes('Bogota'),
    );
    expect(bogotaIdeas?.searchText).toContain('Colombia');
    const milanCity = directory.find(
      (entry) => entry.section === 'cities' && entry.name.includes('Milan'),
    );
    expect(milanCity?.searchText).toContain('Italy');
    expect(milanCity?.searchText).toContain('Lombardy');
  });

  it('searchText uses the ACTIVE locale dataset names (names[locale], EN fallback)', () => {
    const deDirectory = hubDirectoryEntries('de');
    const berlinCity = deDirectory.find(
      (entry) => entry.section === 'cities' && entry.name.includes('Berlin'),
    );
    expect(berlinCity).toBeDefined();
    expect(berlinCity?.searchText).toContain('Deutschland');
    expect(berlinCity?.searchText).toContain('Berlin');
    // EN name is always part of the searchable text.
    expect(berlinCity?.searchText).toContain('Origins in Berlin');
  });

  it('membership is identical across locale surfaces (paths forward to the ACTIVE surface)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const directory = hubDirectoryEntries(locale);
      expect(directory).toHaveLength(484);
      for (const entry of directory) {
        expect(entry.path).toMatch(new RegExp(`^/${locale}/location/`));
        // Non-EN surfaces never leak the EN-canonical /en/ tree.
        if (locale !== 'en') {
          expect(entry.path).not.toMatch(/^\/en\//);
        }
      }
    }
  });

  it('"colombia" matches Bogota/Medellin/Barranquilla + the Colombia country card (searchText)', () => {
    const directory = hubDirectoryEntries('en');
    const matches = filterByKeyword(directory, 'colombia', (entry) => entry.searchText);
    // The country card resolves through its dataset country name, not the
    // EN card title ("Origins in Colombia" would NOT match "colombia"
    // on name alone — it matches via the searchText country name).
    const country = matches.find((entry) => entry.section === 'countries');
    expect(country?.name).toBe('Communities in Colombia');
    // All 3 Colombian content-rich cities resolve through the country name.
    const cities = matches.filter((entry) => entry.section === 'cities').map((entry) => entry.name);
    expect(cities).toContain('Origins in Bogota, Bogota D.C.');
    expect(cities).toContain('Origins in Medellin, Antioquia');
    expect(cities).toContain('Origins in Barranquilla, Atlantico');
    // Community types + event ideas scoped to Colombia resolve too (15 + 3).
    expect(matches.filter((entry) => entry.section === 'communityTypes').length).toBe(
      3 /* cities */ * 5,
    );
    expect(matches.filter((entry) => entry.section === 'eventIdeas').length).toBe(3);
  });

  it('"italy" matches Milan + the Italy country card (searchText)', () => {
    const directory = hubDirectoryEntries('en');
    const matches = filterByKeyword(directory, 'italy', (entry) => entry.searchText);
    const country = matches.find((entry) => entry.section === 'countries');
    expect(country?.name).toBe('Communities in Italy');
    const cities = matches.filter((entry) => entry.section === 'cities').map((entry) => entry.name);
    expect(cities).toEqual(['Origins in Milan, Lombardy']);
    // Milan's 5 community types + ideas page resolve through the country name.
    expect(matches.filter((entry) => entry.section === 'communityTypes').length).toBe(5);
    expect(matches.filter((entry) => entry.section === 'eventIdeas').length).toBe(1);
    // The region card (Lombardy) resolves too.
    expect(
      matches.some((entry) => entry.section === 'regions' && entry.name.includes('Lombardy')),
    ).toBe(true);
  });

  it('searchText carries the FULL enrichment: active-locale name + EN name + country + region (TASK-484)', () => {
    const directory = hubDirectoryEntries('en');
    const milan = directory.find(
      (entry) => entry.section === 'cities' && entry.name.includes('Milan'),
    );
    expect(milan).toBeDefined();
    // Display name + country + region are all searchable.
    expect(milan?.searchText).toContain('Origins in Milan, Lombardy');
    expect(milan?.searchText).toContain('Italy');
    expect(milan?.searchText).toContain('Lombardy');

    // Active-locale surface (de): the localized country/region names appear
    // alongside the EN names — "Deutschland" + "Berlin" for the de Berlin
    // city card, with the EN display name retained.
    const deDirectory = hubDirectoryEntries('de');
    const berlin = deDirectory.find(
      (entry) => entry.section === 'cities' && entry.name.includes('Berlin'),
    );
    expect(berlin).toBeDefined();
    expect(berlin?.searchText).toContain('Origins in Berlin'); // EN name
    expect(berlin?.searchText).toContain('Deutschland'); // de country name
    expect(berlin?.searchText).toContain('Berlin'); // de region name
  });

  it('"colombia" on the es surface resolves through the localized country name too', () => {
    const directory = hubDirectoryEntries('es');
    // "Colombia" matches the country name on the es surface (same dataset
    // name) — the localized Bogotá card name is also searchable.
    const matches = filterByKeyword(directory, 'colombia', (entry) => entry.searchText);
    expect(matches.some((entry) => entry.section === 'countries')).toBe(true);
    const cities = matches.filter((entry) => entry.section === 'cities');
    expect(cities.length).toBe(3);
  });
});

/** Test-local helper — avoids the SiblingCityLink type import clash. */
function flagshipCitiesForTest(locale: string) {
  return flagshipCities(locale as 'en' | 'de');
}
