import { SUPPORTED_LOCALES, type Locale } from '@joinorigin/i18n';

import {
  buildLocationViewData,
  cityLocationPath,
  flagshipCities,
  guideLinksFor,
  hubDirectoryEntries,
  languagesFor,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  siblingCitiesFor,
  waitlistSource,
  warmParamsFor,
  warmParamsForLocale,
} from '../locationView';
import { locationPageEntries, type LocationPageEntry } from '../locationPages';
import {
  CONTENT_RICH_CITY_SLUGS,
  cityDisplayName,
  citySlug,
  contentRichCities,
  loadLocationSnapshot,
  localeCountryCodes,
  tierForCitySlug,
} from '../locationData';
import { filterByKeyword } from '../../search/hubFilter';

/**
 * fe-location-pages view-layer unit tests (TASK-308).
 *
 * Asserts the view model derives correct breadcrumbs / headings / mesh /
 * FAQ / JSON-LD from the registry, the waitlist analytics source follows the
 * `location-…` contract, the EN↔de hreflang mapping is bidirectional and
 * absent on EN-only pages, `noindex` applies to Tier-3/failed gates, and the
 * warm-set static params match the MVP surface.
 */

describe('lib/seo locationView — resolve + view model', () => {
  it('resolves the hub entry (EN canonical at /en/location)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    expect(hub?.path).toBe('/en/location');
  });

  it('resolves country/region/city/variant params to registry entries', () => {
    const germany = resolveLocationEntry({ country: 'germany' });
    expect(germany?.kind).toBe('country');
    expect(germany?.path).toBe('/en/location/germany');

    const berlinRegion = resolveLocationEntry({ country: 'germany', region: 'berlin' });
    expect(berlinRegion?.kind).toBe('region');
    expect(berlinRegion?.path).toBe('/en/location/germany/berlin');

    const berlinCity = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
    });
    expect(berlinCity?.kind).toBe('city');
    expect(berlinCity?.path).toBe('/en/location/germany/berlin/berlin');

    const startup = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
      variant: 'startup',
    });
    expect(startup?.kind).toBe('variant');
    expect(startup?.path).toBe('/en/location/germany/berlin/berlin/startup');
  });

  it('returns undefined (→ notFound) for unknown/synthetic slugs', () => {
    expect(resolveLocationEntry({ country: 'atlantis' })).toBeUndefined();
    expect(
      resolveLocationEntry({
        country: 'germany',
        region: 'berlin',
        city: 'berlin',
        variant: 'hype',
      }),
    ).toBeUndefined();
    expect(
      resolveLocationEntry({ country: 'germany', region: 'nope', city: 'nope' }),
    ).toBeUndefined();
  });

  it('builds the city view model: heading, breadcrumbs, data points, FAQ, mesh', () => {
    const entry = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
    });
    expect(entry).toBeDefined();
    const data = buildLocationViewData(entry!);

    expect(data.heading).toBe('Communities in Berlin');
    expect(data.eyebrow).toBe('Communities in this city');
    expect(data.kind).toBe('city');
    expect(data.indexable).toBe(true);
    expect(data.path).toBe('/en/location/germany/berlin/berlin');

    // Breadcrumbs: Home › Communities by City › Germany › Berlin › Berlin.
    expect(data.breadcrumbs.map((crumb) => crumb.name)).toEqual([
      'Home',
      'Communities by City',
      'Communities in Germany',
      'Communities in Berlin, Germany',
      'Communities in Berlin',
    ]);
    expect(data.breadcrumbs.at(-1)?.path).toBe('/en/location/germany/berlin/berlin');

    // G1/G2 sources flow into the render model.
    expect(data.dataPoints.length).toBeGreaterThanOrEqual(3);
    // City intros are paragraph arrays (TASK-410) — word counts sum paragraphs.
    expect(Array.isArray(data.intro)).toBe(true);
    expect(data.intro.length).toBeGreaterThan(1);
    expect(data.intro.join(' ').split(/\s+/).length).toBeGreaterThanOrEqual(150);
    // Hero lead is the short registry description (not duplicated prose).
    expect(data.lead).toBe(entry?.description);

    // Mesh: 5 group types + ideas link, sibling cities, guides.
    expect(data.groupTypeLinks.map((link) => link.path)).toEqual([
      '/location/germany/berlin/berlin/startup',
      '/location/germany/berlin/berlin/creative',
      '/location/germany/berlin/berlin/political',
      '/location/germany/berlin/berlin/meetup',
      '/location/germany/berlin/berlin/small-business',
      '/location/germany/berlin/berlin/ideas',
    ]);
    expect(data.siblingCities.length).toBeGreaterThan(0);
    // Full 7-guide "Guides for starting a community" set (TASK-489).
    expect(data.guideLinks.length).toBe(7);
    expect(data.faq.length).toBeGreaterThanOrEqual(3);
  });

  it('builds the variant view model with the group-type lead', () => {
    const entry = resolveLocationEntry({
      country: 'united-states',
      region: 'new-york',
      city: 'new-york',
      variant: 'startup',
    });
    const data = buildLocationViewData(entry!);
    expect(data.kind).toBe('variant');
    expect(data.heading).toBe('Startup communities in New York City');
    // Variant intros wrap into a single-element paragraph array.
    expect(Array.isArray(data.intro)).toBe(true);
    expect(data.intro).toHaveLength(1);
    expect(data.intro.join(' ').split(/\s+/).length).toBeGreaterThanOrEqual(150);
  });

  it('variant pages carry the group-type key + enrichment in the view model (TASK-319)', () => {
    const nycStartup = buildLocationViewData(
      resolveLocationEntry({
        country: 'united-states',
        region: 'new-york',
        city: 'new-york',
        variant: 'startup',
      })!,
    );
    expect(nycStartup.groupType).toBe('startup');
    expect(nycStartup.variantEnrichment).toBeDefined();
    expect(nycStartup.variantEnrichment?.venues.length).toBeGreaterThanOrEqual(4);
    expect(nycStartup.variantEnrichment?.venues.length).toBeLessThanOrEqual(6);
    expect(nycStartup.variantEnrichment?.formats.length).toBeGreaterThanOrEqual(4);
    expect(nycStartup.variantEnrichment?.howToStart).toHaveLength(3);

    const berlinStartup = buildLocationViewData(
      resolveLocationEntry({
        country: 'germany',
        region: 'berlin',
        city: 'berlin',
        variant: 'startup',
      })!,
    );
    expect(berlinStartup.groupType).toBe('startup');
    expect(berlinStartup.variantEnrichment).toBeDefined();
    // Genuinely distinct: NYC startup venues ≠ Berlin startup venues.
    expect(berlinStartup.variantEnrichment?.venues.join(' ')).not.toContain('SoHo');
    expect(nycStartup.variantEnrichment?.venues.join(' ')).toContain('SoHo');
    expect(berlinStartup.variantEnrichment?.venues.join(' ')).toContain('Mitte');
  });

  it('startup and creative enrichment differ within the same city (view model, TASK-319)', () => {
    const startup = buildLocationViewData(
      resolveLocationEntry({
        country: 'united-states',
        region: 'new-york',
        city: 'new-york',
        variant: 'startup',
      })!,
    );
    const creative = buildLocationViewData(
      resolveLocationEntry({
        country: 'united-states',
        region: 'new-york',
        city: 'new-york',
        variant: 'creative',
      })!,
    );
    expect(startup.groupType).toBe('startup');
    expect(creative.groupType).toBe('creative');
    expect(creative.variantEnrichment).toBeDefined();
    const venuesJoined = creative.variantEnrichment?.venues.join(' ') ?? '';
    expect(venuesJoined).toContain('Chelsea');
    expect(startup.variantEnrichment?.venues.join(' ')).not.toContain('Chelsea');
  });

  it('city/ideas pages do NOT carry group-type enrichment (variant-only, TASK-319)', () => {
    const city = buildLocationViewData(
      resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' })!,
    );
    expect(city.groupType).toBeUndefined();
    expect(city.variantEnrichment).toBeUndefined();

    const ideas = buildLocationViewData(
      resolveLocationEntry({
        country: 'germany',
        region: 'berlin',
        city: 'berlin',
        variant: 'ideas',
      })!,
    );
    expect(ideas.groupType).toBeUndefined();
    expect(ideas.variantEnrichment).toBeUndefined();
  });

  it('builds the ideas view model with the 30-item listicle', () => {
    const entry = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
      variant: 'ideas',
    });
    const data = buildLocationViewData(entry!);
    expect(data.kind).toBe('ideas');
    expect(data.ideaCategories).toBeDefined();
    const ideaCount = data.ideaCategories?.reduce((sum, cat) => sum + cat.ideas.length, 0) ?? 0;
    expect(ideaCount).toBe(30);
  });

  it('builds the Tier-3 view model without invented prose', () => {
    const dallas = resolveLocationEntry({
      country: 'united-states',
      region: 'texas',
      city: 'dallas',
    });
    expect(dallas).toBeDefined();
    const data = buildLocationViewData(dallas!);
    expect(data.indexable).toBe(false);
    // No authored content → lead falls back to the registry description.
    expect(data.lead).toBe(dallas?.description);
    expect(data.faq).toEqual([]);
  });
});

describe('lib/seo locationView — waitlist analytics source', () => {
  it('uses the location-… contract per page kind', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(waitlistSource(hub!)).toBe('location-hub');
    expect(waitlistSource(resolveLocationEntry({ country: 'germany' })!)).toBe(
      'location-country-germany',
    );
    expect(waitlistSource(resolveLocationEntry({ country: 'germany', region: 'berlin' })!)).toBe(
      'location-region-berlin',
    );
    expect(
      waitlistSource(
        resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' })!,
      ),
    ).toBe('location-city-berlin');
    expect(
      waitlistSource(
        resolveLocationEntry({
          country: 'germany',
          region: 'berlin',
          city: 'berlin',
          variant: 'startup',
        })!,
      ),
    ).toBe('location-variant-berlin-startup');
    expect(
      waitlistSource(
        resolveLocationEntry({
          country: 'germany',
          region: 'berlin',
          city: 'berlin',
          variant: 'ideas',
        })!,
      ),
    ).toBe('location-ideas-berlin');
  });
});

describe('lib/seo locationView — hreflang + metadata', () => {
  it('emits bidirectional en/de languages + x-default→EN canonical at /en/ for Berlin pages', () => {
    const berlinCity = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
    });
    const languages = languagesFor(berlinCity!);
    expect(languages).toEqual({
      en: 'http://localhost:3100/en/location/germany/berlin/berlin',
      de: 'http://localhost:3100/de/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/en/location/germany/berlin/berlin',
    });
  });

  it('de pages list de self + en alternate (at /en/) + x-default→EN canonical', () => {
    const deCity = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin' },
      'de',
    );
    const languages = languagesFor(deCity!);
    expect(languages).toEqual({
      de: 'http://localhost:3100/de/location/germany/berlin/berlin',
      en: 'http://localhost:3100/en/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/en/location/germany/berlin/berlin',
    });
  });

  it('per-locale hreflang generalizes to ANY locale surface (not just de)', () => {
    // A synthetic es entry — no committed es content exists, but the helper
    // must derive the cluster from the entry's own locale (TASK-457).
    const esEntry: LocationPageEntry = {
      params: { country: 'germany', region: 'berlin', city: 'berlin' },
      path: '/es/location/germany/berlin/berlin',
      title: 'Comunidades en Berlín',
      description: 'Encuentra o crea comunidades en Berlín.',
      tier: 1,
      indexable: true,
      lastModified: '2026-08-19',
      priority: 0.5,
      kind: 'city',
      locale: 'es',
    };
    expect(languagesFor(esEntry)).toEqual({
      es: 'http://localhost:3100/es/location/germany/berlin/berlin',
      en: 'http://localhost:3100/en/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/en/location/germany/berlin/berlin',
    });
  });

  it('EN-only pages (hub/country/region/NYC) carry NO hreflang', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(languagesFor(hub!)).toBeUndefined();
    expect(languagesFor(resolveLocationEntry({ country: 'united-states' })!)).toBeUndefined();
    expect(
      languagesFor(resolveLocationEntry({ country: 'united-states', region: 'new-york' })!),
    ).toBeUndefined();
    expect(
      languagesFor(
        resolveLocationEntry({ country: 'united-states', region: 'new-york', city: 'new-york' })!,
      ),
    ).toBeUndefined();
  });

  it('metadata: canonical + robots noindex for failed gates', () => {
    const germany = resolveLocationEntry({ country: 'germany' });
    const meta = locationMetadata(germany!);
    expect(meta.alternates?.canonical).toBe('http://localhost:3100/en/location/germany');
    expect(meta.robots).toEqual({ index: true, follow: true });

    const dallas = resolveLocationEntry({
      country: 'united-states',
      region: 'texas',
      city: 'dallas',
    });
    const noindexMeta = locationMetadata(dallas!);
    expect(noindexMeta.robots).toEqual({ index: false, follow: true });
  });

  it('metadata: Berlin de pages carry alternates.languages', () => {
    const deIdeas = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin', variant: 'ideas' },
      'de',
    );
    const meta = locationMetadata(deIdeas!);
    expect(meta.alternates?.languages).toEqual({
      de: 'http://localhost:3100/de/location/germany/berlin/berlin/ideas',
      en: 'http://localhost:3100/en/location/germany/berlin/berlin/ideas',
      'x-default': 'http://localhost:3100/en/location/germany/berlin/berlin/ideas',
    });
  });
});

describe('lib/seo locationView — JSON-LD', () => {
  it('emits BreadcrumbList + FAQPage for city pages (mirrored 1:1)', () => {
    const entry = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const data = buildLocationViewData(entry!);
    const jsonLd = locationJsonLd(data);
    expect(jsonLd.breadcrumbs?.['@type']).toBe('BreadcrumbList');
    expect(jsonLd.breadcrumbs?.itemListElement).toHaveLength(data.breadcrumbs.length);
    expect(jsonLd.faq?.['@type']).toBe('FAQPage');
    expect(jsonLd.faq?.mainEntity).toHaveLength(data.faq.length);
    // 1:1 mirror — visible FAQ text equals JSON-LD text.
    expect((jsonLd.faq?.mainEntity[0] as { name: string }).name).toBe(data.faq[0].question);
    expect(jsonLd.itemList).toBeUndefined();
  });

  it('emits ItemList (30 items) for ideas pages', () => {
    const entry = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
      variant: 'ideas',
    });
    const data = buildLocationViewData(entry!);
    const jsonLd = locationJsonLd(data);
    expect(jsonLd.itemList?.['@type']).toBe('ItemList');
    expect(jsonLd.itemList?.numberOfItems).toBe(30);
    expect(jsonLd.itemList?.itemListElement).toHaveLength(30);
    expect(jsonLd.faq?.['@type']).toBe('FAQPage');
  });
});

describe('lib/seo locationView — warm set + sibling mesh', () => {
  it('warm params match the indexable MVP surface per kind', () => {
    const countries = warmParamsFor('country');
    expect(countries.map((params) => params.country).sort()).toEqual(['germany', 'united-states']);
    const regions = warmParamsFor('region');
    expect(regions.map((params) => params.region).sort()).toEqual(['berlin', 'new-york']);
    const cities = warmParamsFor('city');
    expect(cities.map((params) => params.city).sort()).toEqual(['berlin', 'new-york']);
    const variants = warmParamsFor('variant');
    expect(variants).toHaveLength(10 + 2); // 10 variants + 2 idea pages
  });

  it('de warm params are exactly the 7 Berlin pages', () => {
    const cities = warmParamsForLocale('city', 'de');
    const variants = warmParamsForLocale('variant', 'de');
    expect(cities).toHaveLength(1);
    expect(cities[0]).toEqual({ country: 'germany', region: 'berlin', city: 'berlin' });
    expect(variants).toHaveLength(6);
    expect(variants.some((params) => params.variant === 'ideas')).toBe(true);
  });

  it('sibling cities live in the registry (every mesh link resolves)', () => {
    const berlin = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const nyc = resolveLocationEntry({
      country: 'united-states',
      region: 'new-york',
      city: 'new-york',
    });
    const snapshotEntries = new Set(locationPageEntries().map((entry) => entry.path));
    for (const entry of [berlin, nyc]) {
      const city = entry!;
      const data = buildLocationViewData(city);
      for (const sibling of data.siblingCities) {
        expect(snapshotEntries.has(sibling.path)).toBe(true);
      }
    }
  });

  it('EN sibling + directory hrefs stay on the /en/location/... surface (TASK-469)', () => {
    const berlin = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    expect(berlin).toBeDefined();
    const data = buildLocationViewData(berlin!);
    expect(data.siblingCities.length).toBeGreaterThan(0);
    for (const sibling of data.siblingCities) {
      expect(sibling.path).toMatch(/^\/en\/location\//);
    }
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    const hubData = buildLocationViewData(hub!);
    expect(hubData.hubDirectory?.length).toBeGreaterThan(0);
    for (const dir of hubData.hubDirectory ?? []) {
      expect(dir.path).toMatch(/^\/en\/location\//);
    }
  });

  it('sibling city hrefs move to the ACTIVE locale surface (TASK-469)', () => {
    const berlin = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    expect(berlin).toBeDefined();
    const data = buildLocationViewData(berlin!, 'es');
    expect(data.siblingCities.length).toBeGreaterThan(0);
    for (const sibling of data.siblingCities) {
      expect(sibling.path).toMatch(/^\/es\/location\//);
      expect(sibling.path).not.toMatch(/^\/en\//);
    }
    // de — the committed Berlin surface keeps its own tree too.
    const deData = buildLocationViewData(berlin!, 'de');
    for (const sibling of deData.siblingCities) {
      expect(sibling.path).toMatch(/^\/de\/location\//);
    }
  });

  it('hub sibling (flagship city) cards point at the ACTIVE locale surface (TASK-469)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    const esData = buildLocationViewData(hub!, 'es');
    expect(esData.siblingCities.length).toBeGreaterThan(0);
    for (const sibling of esData.siblingCities) {
      expect(sibling.path).toMatch(/^\/es\/location\//);
    }
  });

  it('cityLocationPath mirrors the registry (flagship overrides)', () => {
    const berlinCity = locationPageEntries().find(
      (entry) => entry.kind === 'city' && entry.params.city === 'berlin',
    );
    expect(berlinCity?.path).toBe('/en/location/germany/berlin/berlin');
  });

  it('cityLocationPath is locale-aware — /<locale>/location/... for non-EN surfaces (TASK-469)', () => {
    const berlinCity = loadLocationSnapshot().cities.find((city) => city.asciiName === 'Berlin');
    expect(berlinCity).toBeDefined();
    // EN default keeps the /en canonical surface.
    expect(cityLocationPath(berlinCity!)).toBe('/en/location/germany/berlin/berlin');
    expect(cityLocationPath(berlinCity!, 'es')).toBe('/es/location/germany/berlin/berlin');
    expect(cityLocationPath(berlinCity!, 'de')).toBe('/de/location/germany/berlin/berlin');
  });

  it('siblingCitiesFor(..., locale) emits sibling hrefs on the ACTIVE locale surface (TASK-469)', () => {
    const nyc = loadLocationSnapshot().cities.find((city) => city.asciiName === 'New York');
    expect(nyc).toBeDefined();
    // EN default — /en/location/... matches the registry surface.
    for (const sibling of siblingCitiesFor(nyc, 6, 'en')) {
      expect(sibling.path).toMatch(/^\/en\/location\//);
    }
    // es — every sibling href maps to the /es/location/... surface.
    const esSiblings = siblingCitiesFor(nyc, 6, 'es');
    expect(esSiblings.length).toBeGreaterThan(0);
    for (const sibling of esSiblings) {
      expect(sibling.path).toMatch(/^\/es\/location\//);
      expect(sibling.path).not.toMatch(/^\/en\//);
    }
  });

  it('hubDirectoryEntries(locale) emits every card path on the ACTIVE locale surface (TASK-469)', () => {
    const enEntries = hubDirectoryEntries('en');
    const esEntries = hubDirectoryEntries('es');
    expect(esEntries.length).toBe(enEntries.length);
    expect(esEntries.length).toBeGreaterThan(0);
    for (const entry of enEntries) {
      expect(entry.path).toMatch(/^\/en\/location\//);
    }
    for (const entry of esEntries) {
      expect(entry.path).toMatch(/^\/es\/location\//);
      expect(entry.path).not.toMatch(/^\/en\//);
    }
  });

  it('guide cross-links render the full 7-guide set for every page kind (TASK-489)', () => {
    // Every kind — hub/country/region/city/variant/ideas — returns the SAME
    // 7-guide "Guides for starting a community" set as the /location hub.
    for (const kind of ['hub', 'country', 'region', 'city', 'variant', 'ideas'] as const) {
      expect(guideLinksFor(kind).length).toBe(7);
    }
  });

  it('guide card titles resolve from seoContent.location.guideCardTitles.* (TASK-416)', () => {
    const links = guideLinksFor('hub', 'en');
    expect(links[0]).toEqual({
      title: 'Start a community',
      path: '/guides/start-a-community',
    });
    expect(links[1]).toEqual({
      title: 'Find a co-founder',
      path: '/guides/find-a-co-founder',
    });
    expect(links.map((link) => link.title)).toEqual([
      'Start a community',
      'Find a co-founder',
      'Get your first 10 members',
      'Keep a community active',
      'Run hybrid communities',
      'Organize a meetup',
      'Moderate your community',
    ]);
    // Every kind preserves the exact 7-title list + the exact 7 paths
    // (TASK-489) — identical to the /location hub set.
    for (const kind of ['hub', 'country', 'region', 'city', 'variant', 'ideas'] as const) {
      expect(guideLinksFor(kind, 'en').map((link) => link.title)).toEqual([
        'Start a community',
        'Find a co-founder',
        'Get your first 10 members',
        'Keep a community active',
        'Run hybrid communities',
        'Organize a meetup',
        'Moderate your community',
      ]);
      expect(guideLinksFor(kind, 'en').map((link) => link.path)).toEqual([
        '/guides/start-a-community',
        '/guides/find-a-co-founder',
        '/guides/first-10-members',
        '/guides/keep-a-community-active',
        '/guides/hybrid-communities',
        '/guides/organize-a-meetup',
        '/guides/moderation',
      ]);
    }
    // The same path set is exposed for the hub view model.
    const data = buildLocationViewData(locationPageEntries().find((e) => e.kind === 'hub')!);
    expect(data.guideLinks.map((link) => link.path)).toEqual(links.map((link) => link.path));
  });

  it('untranslated locales fall back to EN guide titles — never raw keys', () => {
    // de.json lacks seoContent.location.guideCardTitles.* until TASK-422 lands;
    // the server view must resolve EN titles instead of surfacing key strings.
    for (const link of guideLinksFor('hub', 'de')) {
      expect(link.title).not.toContain('seoContent.location.guideCardTitles.');
      expect(link.title.length).toBeGreaterThan(0);
    }
  });

  it('the hub has no authored intro — the view falls back to the lead', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    const data = buildLocationViewData(hub!);
    expect(data.intro).toEqual([]);
  });

  it('the hub carries translated hubIntro/hubLead chrome (TASK-491)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    const enData = buildLocationViewData(hub!, 'en');
    expect(enData.hubIntro).toBe(
      'Every country, region, city, community type, and event idea on the network — find the community you are looking for or start one in your city.',
    );
    expect(enData.hubLead).toBe(
      'Explore communities by city around the world — startup, creative, political, meetup, and small business groups.',
    );

    // Route-locale value: the de surface carries the German translation.
    const deData = buildLocationViewData(hub!, 'de');
    expect(deData.hubIntro).toContain('Jedes Land, jede Region, jede Stadt');
    expect(deData.hubLead).toContain('Entdecke Communities in Städten');

    // Non-hub kinds never carry the hub chrome keys.
    const germany = resolveLocationEntry({ country: 'germany' })!;
    const countryData = buildLocationViewData(germany, 'en');
    expect(countryData.hubIntro).toBeUndefined();
    expect(countryData.hubLead).toBeUndefined();
  });

  it('hub directory entries carry kinds for localized card labels (TASK-416)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    const data = buildLocationViewData(hub!);
    expect(data.hubDirectory?.length).toBeGreaterThan(0);
    const kinds = new Set(data.hubDirectory?.map((entry) => entry.kind));
    expect(kinds.has('country')).toBe(true);
    expect(kinds.has('region')).toBe(true);
    expect(kinds.has('city')).toBe(true);
    expect(kinds.has('variant')).toBe(true);
    expect(kinds.has('ideas')).toBe(true);
  });
});

describe('lib/seo locationView — un-gated city sections (Sprint 20, TASK-474)', () => {
  it('dubai city page returns non-empty groupTypeLinks + siblingCities (Tier-2, un-gated)', () => {
    const entry = resolveLocationEntry({
      country: 'united-arab-emirates',
      region: 'dubai',
      city: 'dubai',
    });
    expect(entry).toBeDefined();
    expect(entry?.kind).toBe('city');
    expect(entry?.tier).toBe(2);
    const data = buildLocationViewData(entry!);
    // Explore community types — 5 group types + ideas link.
    expect(data.groupTypeLinks.map((link) => link.path)).toEqual([
      '/location/united-arab-emirates/dubai/dubai/startup',
      '/location/united-arab-emirates/dubai/dubai/creative',
      '/location/united-arab-emirates/dubai/dubai/political',
      '/location/united-arab-emirates/dubai/dubai/meetup',
      '/location/united-arab-emirates/dubai/dubai/small-business',
      '/location/united-arab-emirates/dubai/dubai/ideas',
    ]);
    // Communities in nearby cities — same-region sibling cards.
    expect(data.siblingCities.length).toBeGreaterThan(0);
    for (const sibling of data.siblingCities) {
      expect(sibling.path).toMatch(/^\/en\/location\/united-arab-emirates\/dubai\//);
    }
  });

  it('buenos-aires city page returns non-empty groupTypeLinks + siblingCities (un-gated)', () => {
    const entry = resolveLocationEntry({
      country: 'argentina',
      region: 'buenos-aires-f-d',
      city: 'buenos-aires',
    });
    expect(entry).toBeDefined();
    expect(entry?.kind).toBe('city');
    const data = buildLocationViewData(entry!);
    expect(data.groupTypeLinks.map((link) => link.path)).toEqual([
      '/location/argentina/buenos-aires-f-d/buenos-aires/startup',
      '/location/argentina/buenos-aires-f-d/buenos-aires/creative',
      '/location/argentina/buenos-aires-f-d/buenos-aires/political',
      '/location/argentina/buenos-aires-f-d/buenos-aires/meetup',
      '/location/argentina/buenos-aires-f-d/buenos-aires/small-business',
      '/location/argentina/buenos-aires-f-d/buenos-aires/ideas',
    ]);
    expect(data.siblingCities.length).toBeGreaterThan(0);
  });

  it('dubai + buenos-aires /startup variant entries resolve and render the group-type view', () => {
    const dubaiStartup = resolveLocationEntry({
      country: 'united-arab-emirates',
      region: 'dubai',
      city: 'dubai',
      variant: 'startup',
    });
    expect(dubaiStartup).toBeDefined();
    expect(dubaiStartup?.kind).toBe('variant');
    expect(dubaiStartup?.path).toBe('/en/location/united-arab-emirates/dubai/dubai/startup');
    const dubaiData = buildLocationViewData(dubaiStartup!);
    expect(dubaiData.groupType).toBe('startup');
    expect(dubaiData.heading).toBe('Startup communities in Dubai');
    // Variant pages carry the same Explore community types mesh.
    expect(dubaiData.groupTypeLinks.length).toBeGreaterThan(0);

    const buenosStartup = resolveLocationEntry({
      country: 'argentina',
      region: 'buenos-aires-f-d',
      city: 'buenos-aires',
      variant: 'startup',
    });
    expect(buenosStartup).toBeDefined();
    expect(buenosStartup?.kind).toBe('variant');
    expect(buenosStartup?.path).toBe(
      '/en/location/argentina/buenos-aires-f-d/buenos-aires/startup',
    );
    const buenosData = buildLocationViewData(buenosStartup!);
    expect(buenosData.groupType).toBe('startup');
    expect(buenosData.heading).toBe('Startup communities in Buenos Aires');
  });

  it('un-gated city group-type links resolve in the registry (every mesh link real)', () => {
    const cities = [
      { country: 'united-arab-emirates', region: 'dubai', city: 'dubai' },
      { country: 'argentina', region: 'buenos-aires-f-d', city: 'buenos-aires' },
    ];
    const snapshotPaths = new Set(locationPageEntries().map((entry) => entry.path));
    for (const params of cities) {
      const entry = resolveLocationEntry(params);
      expect(entry).toBeDefined();
      const data = buildLocationViewData(entry!);
      for (const link of data.groupTypeLinks) {
        expect(snapshotPaths.has(`/en${link.path}`)).toBe(true);
      }
    }
  });
});

describe('lib/seo locationView — locale-aware titles (TASK-449)', () => {
  it('city heading/lead render the selected locale content titles when content exists', () => {
    const entry = resolveLocationEntry({
      country: 'mexico',
      region: 'mexico-city',
      city: 'mexico-city',
    });
    expect(entry).toBeDefined();
    // EN canonical → registry title/description.
    const en = buildLocationViewData(entry!);
    expect(en.heading).toBe('Communities in Mexico City');
    expect(en.lead).toBe(entry?.description);
    // es content exists → heading/lead localize from pageTitles.
    const es = buildLocationViewData(entry!, 'es');
    expect(es.heading).toBe('Comunidades en Ciudad de México');
    expect(es.lead).toContain('Encuentra o crea comunidades en Ciudad de México');
    expect(es.heading).not.toBe(en.heading);
  });

  it('variant + ideas headings localize per kind from content pageTitles (de Berlin)', () => {
    // Variant/ideas pages exist for the flagship surface; Berlin carries the
    // committed de content so the per-kind pageTitles are exercised.
    const startup = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin', variant: 'startup' },
      'de',
    );
    expect(startup).toBeDefined();
    expect(buildLocationViewData(startup!, 'de').heading).toBe('Startup-Communities in Berlin');

    const ideas = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin', variant: 'ideas' },
      'de',
    );
    expect(ideas).toBeDefined();
    expect(buildLocationViewData(ideas!, 'de').heading).toBe(
      '30 Ideen für Community-Events in Berlin',
    );
  });

  it('EN headings stay intact when the locale has no committed content (fallback)', () => {
    const austin = resolveLocationEntry({
      country: 'united-states',
      region: 'texas',
      city: 'austin',
    });
    expect(austin).toBeDefined();
    const data = buildLocationViewData(austin!, 'es');
    // Austin has no es content → heading/lead fall back to the EN registry.
    expect(data.heading).toBe('Communities in Austin, Texas');
    expect(data.lead).toBe(austin?.description);
  });

  it('de Berlin variant heading localizes from the committed de pageTitles', () => {
    const deStartup = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin', variant: 'startup' },
      'de',
    );
    expect(deStartup).toBeDefined();
    const data = buildLocationViewData(deStartup!, 'de');
    expect(data.heading).toBe('Startup-Communities in Berlin');
    expect(data.lead).toContain('Finde oder gründe Startup-Communities in Berlin');
  });

  it('hub presence-claim entity label resolves seoContent.location.hubEntity (TASK-449)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    const data = buildLocationViewData(hub!);
    // The key is synced by i18n-locale-keys-sync (TASK-452); until then the
    // server view must never surface a raw key string — it keeps the literal.
    expect(data.entityLabel).toBe('your city');
    expect(data.entityLabel).not.toContain('seoContent.location');
  });

  it('Browse-locations card names localize from the locale surface, EN fallback otherwise', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    // EN directory — complete set, registry names.
    const en = buildLocationViewData(hub!);
    expect(en.hubDirectory?.some((entry) => entry.name === 'Communities in Berlin')).toBe(true);
    expect(
      en.hubDirectory?.some((entry) => entry.name === 'Communities in the United States'),
    ).toBe(true);
    // de surface — Berlin variant cards localize; entries without de content
    // stay EN (fallback) and the directory remains complete.
    const de = buildLocationViewData(hub!, 'de');
    expect(de.hubDirectory?.some((entry) => entry.name === 'Startup-Communities in Berlin')).toBe(
      true,
    );
    expect(
      de.hubDirectory?.some((entry) => entry.name === 'Kreativ- & Design-Communities in Berlin'),
    ).toBe(true);
    expect(
      de.hubDirectory?.some((entry) => entry.name === 'Communities in the United States'),
    ).toBe(true);
    expect(de.hubDirectory?.length).toBe(en.hubDirectory?.length);
    // es surface now has committed content for 8 cities (Sprint 20) — those
    // cards localize (e.g. Buenos Aires variant cards), while uncommitted
    // entries still fall back to EN and the directory remains complete.
    const es = buildLocationViewData(hub!, 'es');
    expect(es.hubDirectory?.length).toBe(en.hubDirectory?.length);
    expect(
      es.hubDirectory?.some((entry) => entry.name === 'Comunidades de startups en Buenos Aires'),
    ).toBe(true);
    expect(
      es.hubDirectory?.some((entry) => entry.name === 'Communities in the United States'),
    ).toBe(true);
  });

  it('Browse-locations card hrefs move to the ACTIVE locale surface (TASK-469)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    // EN — every directory card points at the /en/location/... surface.
    const en = buildLocationViewData(hub!);
    expect(en.hubDirectory?.length).toBeGreaterThan(0);
    for (const entry of en.hubDirectory ?? []) {
      expect(entry.path).toMatch(/^\/en\/location\//);
    }
    // es — every card points at the /es/location/... surface (all 21 locale
    // trees exist), never /en/** (localizePath is idempotent for prefixed
    // hrefs, so a baked /en path would navigate the es hub to English).
    const es = buildLocationViewData(hub!, 'es');
    expect(es.hubDirectory?.length).toBeGreaterThan(0);
    for (const entry of es.hubDirectory ?? []) {
      expect(entry.path).toMatch(/^\/es\/location\//);
      expect(entry.path).not.toMatch(/^\/en\//);
    }
  });

  it('guide cross-links stay unprefixed so the client localizes them (TASK-469 no regression)', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    const esData = buildLocationViewData(hub!, 'es');
    // The full 7-guide set renders on every surface (TASK-489).
    expect(esData.guideLinks).toHaveLength(7);
    // GUIDE_PATHS are unprefixed /guides/... — the client localizePath applies
    // the active locale prefix (e.g. /es/guides/...) at render time.
    for (const link of esData.guideLinks) {
      expect(link.path).toMatch(/^\/guides\//);
      expect(link.path).not.toMatch(/^\/en\//);
      expect(link.path).not.toMatch(/^\/es\//);
    }
  });
});

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
    const germany = directory.find((entry) => entry.name === 'Communities in Germany');
    expect(germany?.countryIso2).toBe('DE');
    const berlin = directory.find((entry) => entry.name === 'Communities in Berlin');
    expect(berlin?.countryIso2).toBe('DE');
    // Community types + Event ideas resolve via their associated city's country.
    const berlinStartup = directory.find((entry) => entry.name === 'Startup communities in Berlin');
    expect(berlinStartup?.countryIso2).toBe('DE');
    const berlinIdeas = directory.find(
      (entry) => entry.name === '30 community event ideas in Berlin',
    );
    expect(berlinIdeas?.countryIso2).toBe('DE');
  });

  it('orders each section: IP-country matches → locale-language matches → alphabetical (TASK-480)', () => {
    // IP-country = DE: German entries rank first in every section.
    const deIp = hubDirectoryEntries('en', 'DE');
    const cityNames = deIp.filter((entry) => entry.section === 'cities').map((entry) => entry.name);
    expect(cityNames[0]).toBe('Communities in Berlin');
    expect(cityNames[1]).toBe('Communities in Munich, Bavaria');
    // ...then the EN-locale-area cities, then the rest, alphabetical overall.
    // TASK-484: the regions section is the full content-rich region set (54)
    // — with a DE IP the German regions (Bavaria + Berlin) lead alphabetically.
    const regionNames = deIp
      .filter((entry) => entry.section === 'regions')
      .map((entry) => entry.name);
    expect(regionNames[0]).toBe('Communities in Bavaria, Germany');
    expect(regionNames[1]).toBe('Communities in Berlin, Germany');
    // Community types + event ideas rank via their city's country.
    const types = deIp
      .filter((entry) => entry.section === 'communityTypes')
      .map((entry) => entry.name);
    expect(types[0]).toBe('Community meetups & events in Berlin');
  });

  it('orders by locale-language matches first when no IP-country is present (null-safe fallback)', () => {
    // No IP country (local request) → locale-language matches rank first.
    const deLocale = hubDirectoryEntries('de', null);
    const cityNames = deLocale
      .filter((entry) => entry.section === 'cities')
      .map((entry) => entry.name);
    expect(cityNames[0]).toBe('Communities in Berlin');
    expect(cityNames[1]).toBe('Communities in Munich, Bavaria');
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
    expect(cities[0].name).toBe('Communities in Berlin');
    // Without an IP country the same surface falls back to locale ordering.
    const fallback = buildLocationViewData(hub!, 'en');
    const fallbackCities = (fallback.hubDirectory ?? []).filter(
      (entry) => entry.section === 'cities',
    );
    expect(fallbackCities[0].name).not.toBe('Communities in Berlin');
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
    expect(cities[0].name).toBe('Communities in Austin, Texas');
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
    expect(cities[0].name).toBe('Communities in Osaka');
    expect(cities[1].countryIso2).toBe('JP');
    expect(cities[1].name).toBe('Communities in Tokyo');
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
    expect(berlinCity?.searchText).toContain('Communities in Berlin');
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
    // EN card title ("Communities in Colombia" would NOT match "colombia"
    // on name alone — it matches via the searchText country name).
    const country = matches.find((entry) => entry.section === 'countries');
    expect(country?.name).toBe('Communities in Colombia');
    // All 3 Colombian content-rich cities resolve through the country name.
    const cities = matches.filter((entry) => entry.section === 'cities').map((entry) => entry.name);
    expect(cities).toContain('Communities in Bogota, Bogota D.C.');
    expect(cities).toContain('Communities in Medellin, Antioquia');
    expect(cities).toContain('Communities in Barranquilla, Atlantico');
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
    expect(cities).toEqual(['Communities in Milan, Lombardy']);
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
    expect(milan?.searchText).toContain('Communities in Milan, Lombardy');
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
    expect(berlin?.searchText).toContain('Communities in Berlin'); // EN name
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

describe('lib/seo locationView — country mesh (TASK-490)', () => {
  it('country pages carry the data-driven mesh: localized name, cities, regions, facts', () => {
    const germany = resolveLocationEntry({ country: 'germany' });
    expect(germany).toBeDefined();
    const data = buildLocationViewData(germany!);
    expect(data.kind).toBe('country');
    expect(data.countryMesh).toBeDefined();
    const mesh = data.countryMesh!;

    // Localized country display name (dataset names[locale], EN fallback).
    expect(mesh.countryName).toBe('Germany');

    // Content-rich cities in the country — alphabetical by localized name,
    // registry-exact paths.
    expect(mesh.cities.map((city) => city.name)).toEqual(['Berlin', 'Munich']);
    expect(mesh.cities.map((city) => city.path)).toEqual([
      '/en/location/germany/berlin/berlin',
      '/en/location/germany/bavaria/munich',
    ]);

    // Region list — distinct regions hosting content-rich cities.
    expect(mesh.regions.map((region) => region.name)).toEqual(['Bavaria', 'State of Berlin']);
    expect(mesh.regions.map((region) => region.path)).toEqual([
      '/en/location/germany/bavaria',
      '/en/location/germany/berlin',
    ]);

    // Dataset country facts — population / capital / languages (G1, never
    // hardcoded — derived from the geo snapshot).
    expect(mesh.facts).toEqual({
      population: 82927922,
      capital: 'Berlin',
      languages: ['de'],
    });
  });

  it('mesh is data-driven for ALL countries — Tier-3 un-authored included (noindex untouched)', () => {
    // Denmark hosts Copenhagen — Tier-3 content that renders but stays noindex.
    const denmark = resolveLocationEntry({ country: 'denmark' });
    expect(denmark).toBeDefined();
    const data = buildLocationViewData(denmark!);
    expect(data.indexable).toBe(false);
    expect(data.countryMesh).toBeDefined();
    expect(data.countryMesh?.countryName).toBe('Denmark');
    expect(data.countryMesh?.cities.map((city) => city.name)).toEqual(['Copenhagen']);
    expect(data.countryMesh?.cities[0].path).toBe('/en/location/denmark/capital-region/copenhagen');
    expect(data.countryMesh?.facts.population).toBeGreaterThan(0);
    expect(data.countryMesh?.facts.capital.length).toBeGreaterThan(0);
    expect(data.countryMesh?.facts.languages.length).toBeGreaterThan(0);
  });

  it('every country page in the registry carries a data-driven mesh (name + facts always)', () => {
    const countries = locationPageEntries().filter((entry) => entry.kind === 'country');
    expect(countries.length).toBeGreaterThan(0);
    const hosting = countries.filter((entry) => {
      const mesh = buildLocationViewData(entry).countryMesh;
      return !!mesh && mesh.cities.length > 0;
    });
    // The mesh is populated for ALL countries — localized name + dataset
    // facts resolve from the geo snapshot even when no content-rich city
    // exists (the render section gates on non-empty cities).
    for (const entry of countries) {
      const data = buildLocationViewData(entry);
      expect(data.countryMesh).toBeDefined();
      expect(data.countryMesh?.countryName.length).toBeGreaterThan(0);
      // Dataset facts resolve from the geo snapshot row — the values reflect
      // the dataset exactly (some GeoNames territories carry 0 population /
      // empty capital / empty languages), so the contract is presence + type.
      expect(typeof data.countryMesh?.facts.population).toBe('number');
      expect(typeof data.countryMesh?.facts.capital).toBe('string');
      expect(Array.isArray(data.countryMesh?.facts.languages)).toBe(true);
    }
    // Countries hosting content-rich cities — every city/region href is
    // registry-exact (never a dead link) and the content-rich set is scoped.
    const registryPaths = new Set(locationPageEntries().map((entry) => entry.path));
    for (const entry of hosting) {
      const mesh = buildLocationViewData(entry).countryMesh!;
      expect(mesh.cities.length).toBeGreaterThan(0);
      for (const city of mesh.cities) {
        expect(registryPaths.has(city.path)).toBe(true);
      }
      for (const region of mesh.regions) {
        expect(registryPaths.has(region.path)).toBe(true);
      }
    }
  });

  it('mesh names localize per surface (names[locale], EN fallback)', () => {
    const germany = resolveLocationEntry({ country: 'germany' });
    const de = buildLocationViewData(germany!, 'de');
    expect(de.countryMesh?.countryName).toBe('Deutschland');
    expect(de.countryMesh?.cities.map((city) => city.name)).toEqual(['Berlin', 'Muenchen']);
    expect(de.countryMesh?.regions.map((region) => region.name)).toEqual(['Bayern', 'Berlin']);

    // es surface — the Spain mesh resolves the localized country name.
    const spain = resolveLocationEntry({ country: 'spain' });
    expect(spain).toBeDefined();
    const es = buildLocationViewData(spain!, 'es');
    expect(es.countryMesh?.countryName).toBe('España');
    expect(es.countryMesh?.cities.map((city) => city.name)).toEqual(['Barcelona', 'Madrid']);
  });

  it('mesh paths move to the ACTIVE locale surface (TASK-469)', () => {
    const germany = resolveLocationEntry({ country: 'germany' });
    const es = buildLocationViewData(germany!, 'es');
    for (const city of es.countryMesh?.cities ?? []) {
      expect(city.path).toMatch(/^\/es\/location\//);
      expect(city.path).not.toMatch(/^\/en\//);
    }
    for (const region of es.countryMesh?.regions ?? []) {
      expect(region.path).toMatch(/^\/es\/location\//);
      expect(region.path).not.toMatch(/^\/en\//);
    }
  });

  it('non-country kinds never carry the country mesh', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(buildLocationViewData(hub!).countryMesh).toBeUndefined();
    const region = resolveLocationEntry({ country: 'germany', region: 'berlin' });
    expect(buildLocationViewData(region!).countryMesh).toBeUndefined();
    const city = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    expect(buildLocationViewData(city!).countryMesh).toBeUndefined();
    const variant = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
      variant: 'startup',
    });
    expect(buildLocationViewData(variant!).countryMesh).toBeUndefined();
    const ideas = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
      variant: 'ideas',
    });
    expect(buildLocationViewData(ideas!).countryMesh).toBeUndefined();
  });
});
