/**
 * lib/seo locationView — warm set + sibling mesh + un-gated sections tests.
 *
 * Asserts warmParamsFor / warmParamsForLocale match the indexable MVP
 * surface, sibling/directory hrefs move to the ACTIVE locale surface
 * (TASK-469), guide cross-links are the full 7-guide set (TASK-489), the
 * hub chrome translates (TASK-491), and un-gated Tier-2 city sections
 * render groupTypeLinks + siblingCities (Sprint 20, TASK-474).
 */

import {
  buildLocationViewData,
  cityLocationPath,
  guideLinksFor,
  hubDirectoryEntries,
  resolveLocationEntry,
  siblingCitiesFor,
  warmParamsFor,
  warmParamsForLocale,
} from '../locationView';
import { locationPageEntries } from '../locationPages';
import { loadLocationSnapshot } from '../locationData';

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
      title: 'Start an Origin',
      path: '/guides/start-an-origin',
    });
    expect(links[1]).toEqual({
      title: 'Find a co-founder',
      path: '/guides/find-a-co-founder',
    });
    expect(links.map((link) => link.title)).toEqual([
      'Start an Origin',
      'Find a co-founder',
      'Get your first 10 members',
      'Keep an Origin active',
      'Run hybrid Origins',
      'Organize a meetup',
      'Moderate your Origin',
    ]);
    // Every kind preserves the exact 7-title list + the exact 7 paths
    // (TASK-489) — identical to the /location hub set.
    for (const kind of ['hub', 'country', 'region', 'city', 'variant', 'ideas'] as const) {
      expect(guideLinksFor(kind, 'en').map((link) => link.title)).toEqual([
        'Start an Origin',
        'Find a co-founder',
        'Get your first 10 members',
        'Keep an Origin active',
        'Run hybrid Origins',
        'Organize a meetup',
        'Moderate your Origin',
      ]);
      expect(guideLinksFor(kind, 'en').map((link) => link.path)).toEqual([
        '/guides/start-an-origin',
        '/guides/find-a-co-founder',
        '/guides/first-10-members',
        '/guides/keep-an-origin-active',
        '/guides/hybrid-origins',
        '/guides/organize-a-meetup',
        '/guides/moderation',
      ]);
    }
    // The same path set is exposed for the hub view model.
    const data = buildLocationViewData(locationPageEntries().find((e) => e.kind === 'hub')!);
    expect(data.guideLinks.map((link) => link.path)).toEqual(links.map((link) => link.path));
  });

  it('every kind VIEW MODEL carries the exact 7-guide path set (TASK-489)', () => {
    // The Story D contract at the render-model level: buildLocationViewData
    // for hub/country/region/city/variant/ideas ALL emit the identical
    // 7-guide "Guides for starting a community" set — the same paths as the
    // /location hub, so every location screen renders the same cross-links.
    const expectedPaths = [
      '/guides/start-an-origin',
      '/guides/find-a-co-founder',
      '/guides/first-10-members',
      '/guides/keep-an-origin-active',
      '/guides/hybrid-origins',
      '/guides/organize-a-meetup',
      '/guides/moderation',
    ];
    const kinds = ['hub', 'country', 'region', 'city', 'variant', 'ideas'] as const;
    for (const kind of kinds) {
      const entry = locationPageEntries().find((e) => e.kind === kind);
      expect(entry).toBeDefined();
      const data = buildLocationViewData(entry!);
      expect(data.guideLinks.map((link) => link.path)).toEqual(expectedPaths);
      expect(data.guideLinks).toHaveLength(7);
    }
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
