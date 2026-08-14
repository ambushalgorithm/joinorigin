import {
  buildLocationViewData,
  guideLinksFor,
  languagesFor,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  waitlistSource,
  warmParamsFor,
  warmParamsForLocale,
} from '../locationView';
import { locationPageEntries } from '../locationPages';

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
  it('resolves the hub entry', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub');
    expect(hub).toBeDefined();
    expect(hub?.path).toBe('/location');
  });

  it('resolves country/region/city/variant params to registry entries', () => {
    const germany = resolveLocationEntry({ country: 'germany' });
    expect(germany?.kind).toBe('country');
    expect(germany?.path).toBe('/location/germany');

    const berlinRegion = resolveLocationEntry({ country: 'germany', region: 'berlin' });
    expect(berlinRegion?.kind).toBe('region');
    expect(berlinRegion?.path).toBe('/location/germany/berlin');

    const berlinCity = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
    });
    expect(berlinCity?.kind).toBe('city');
    expect(berlinCity?.path).toBe('/location/germany/berlin/berlin');

    const startup = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
      variant: 'startup',
    });
    expect(startup?.kind).toBe('variant');
    expect(startup?.path).toBe('/location/germany/berlin/berlin/startup');
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
    expect(data.path).toBe('/location/germany/berlin/berlin');

    // Breadcrumbs: Home › Communities by City › Germany › Berlin › Berlin.
    expect(data.breadcrumbs.map((crumb) => crumb.name)).toEqual([
      'Home',
      'Communities by City',
      'Communities in Germany',
      'Communities in Berlin, Germany',
      'Communities in Berlin',
    ]);
    expect(data.breadcrumbs.at(-1)?.path).toBe('/location/germany/berlin/berlin');

    // G1/G2 sources flow into the render model.
    expect(data.dataPoints.length).toBeGreaterThanOrEqual(3);
    expect(data.intro.split(/\s+/).length).toBeGreaterThanOrEqual(150);
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
    expect(data.attribution).toContain('CC BY 4.0');
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
    expect(data.intro.split(/\s+/).length).toBeGreaterThanOrEqual(150);
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
    const austin = resolveLocationEntry({
      country: 'united-states',
      region: 'texas',
      city: 'austin',
    });
    expect(austin).toBeDefined();
    const data = buildLocationViewData(austin!);
    expect(data.indexable).toBe(false);
    // No authored content → lead falls back to the registry description.
    expect(data.lead).toBe(austin?.description);
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
  it('emits bidirectional en/de languages + x-default→EN for Berlin pages', () => {
    const berlinCity = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
    });
    const languages = languagesFor(berlinCity!);
    expect(languages).toEqual({
      en: 'http://localhost:3100/location/germany/berlin/berlin',
      de: 'http://localhost:3100/de/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/location/germany/berlin/berlin',
    });
  });

  it('de pages list de self + en alternate + x-default→EN', () => {
    const deCity = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin' },
      'de',
    );
    const languages = languagesFor(deCity!);
    expect(languages).toEqual({
      de: 'http://localhost:3100/de/location/germany/berlin/berlin',
      en: 'http://localhost:3100/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/location/germany/berlin/berlin',
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
    expect(meta.alternates?.canonical).toBe('http://localhost:3100/location/germany');
    expect(meta.robots).toEqual({ index: true, follow: true });

    const austin = resolveLocationEntry({
      country: 'united-states',
      region: 'texas',
      city: 'austin',
    });
    const noindexMeta = locationMetadata(austin!);
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
      en: 'http://localhost:3100/location/germany/berlin/berlin/ideas',
      'x-default': 'http://localhost:3100/location/germany/berlin/berlin/ideas',
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

  it('cityLocationPath mirrors the registry (flagship overrides)', () => {
    const berlinCity = locationPageEntries().find(
      (entry) => entry.kind === 'city' && entry.params.city === 'berlin',
    );
    expect(berlinCity?.path).toBe('/location/germany/berlin/berlin');
  });

  it('guide cross-links are present for every page kind', () => {
    expect(guideLinksFor('city').length).toBeGreaterThanOrEqual(2);
    expect(guideLinksFor('hub').length).toBe(7);
    expect(guideLinksFor('ideas').length).toBeGreaterThanOrEqual(2);
  });
});
