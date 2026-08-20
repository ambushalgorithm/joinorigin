import {
  buildLocationViewData,
  cityLocationPath,
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
import { loadLocationSnapshot } from '../locationData';

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
    expect(data.guideLinks.length).toBeGreaterThanOrEqual(2);
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

  it('guide cross-links are present for every page kind', () => {
    expect(guideLinksFor('city').length).toBeGreaterThanOrEqual(2);
    expect(guideLinksFor('hub').length).toBe(7);
    expect(guideLinksFor('ideas').length).toBeGreaterThanOrEqual(2);
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
    expect(esData.guideLinks.length).toBeGreaterThan(0);
    // GUIDE_PATHS are unprefixed /guides/... — the client localizePath applies
    // the active locale prefix (e.g. /es/guides/...) at render time.
    for (const link of esData.guideLinks) {
      expect(link.path).toMatch(/^\/guides\//);
      expect(link.path).not.toMatch(/^\/en\//);
      expect(link.path).not.toMatch(/^\/es\//);
    }
  });
});
