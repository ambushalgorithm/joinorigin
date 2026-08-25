/**
 * lib/seo locationView — resolve/view-model + waitlist + JSON-LD unit tests.
 *
 * Asserts resolveLocationEntry derives registry entries from params,
 * buildLocationViewData builds the render model (headings / breadcrumbs /
 * data points / FAQ / mesh), waitlistSource follows the `location-…`
 * contract, and locationJsonLd mirrors the visible FAQ / item list 1:1.
 */

import {
  buildLocationViewData,
  locationJsonLd,
  resolveLocationEntry,
  waitlistSource,
} from '../locationView';
import { locationPageEntries } from '../locationPages';

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

    // Breadcrumbs: Home › Communities by City › Germany › State of Berlin ›
    // Berlin. TASK-516 — country/region/city crumbs use the localized dataset
    // names (names[locale], EN fallback) instead of the EN registry titles.
    expect(data.breadcrumbs.map((crumb) => crumb.name)).toEqual([
      'Home',
      'Communities by City',
      'Germany',
      'State of Berlin',
      'Berlin',
    ]);
    // Every entity crumb carries the per-locale name map (TASK-516) so the
    // client re-resolves the ACTIVE locale's name on language toggle.
    expect(data.breadcrumbs[2]?.nameLocalized?.de).toBe('Deutschland');
    expect(data.breadcrumbs[3]?.nameLocalized?.de).toBe('Berlin');
    expect(data.breadcrumbs[4]?.nameLocalized?.es).toBe('Berlín');
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
