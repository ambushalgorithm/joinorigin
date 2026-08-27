/**
 * lib/seo locationView — country/region mesh + FAQ + sibling fallback +
 * un-authored mesh (TASK-490 / TASK-496 / TASK-497) unit tests.
 *
 * Asserts country pages carry the data-driven mesh (localized name,
 * cities, regions, facts), country/region data points + FAQ templates are
 * dataset-driven when un-authored, region mesh mirrors the country mesh,
 * cities without same-region siblings fall back to same-country / global
 * content-rich sets, and un-authored countries expose facts + FAQ.
 */

import { buildLocationViewData, regionMeshFor, resolveLocationEntry } from '../locationView';
import { locationPageEntries } from '../locationPages';
import { contentRichCities, findRegionBySlug } from '../locationData';

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

describe('lib/seo locationView — country data points + FAQ templates (TASK-496)', () => {
  it('un-authored country pages get dataset-driven "Country facts" data points', () => {
    // Story G authored all content-rich countries — Austria has no authored
    // content, so the dataset facts render through the localized templates.
    const austria = resolveLocationEntry({ country: 'austria' });
    expect(austria).toBeDefined();
    const data = buildLocationViewData(austria!);
    expect(data.dataPoints.length).toBeGreaterThanOrEqual(3);
    expect(data.dataPoints[0]).toMatch(/^Population: /);
    expect(data.dataPoints[0]).toContain('8,847,037');
    expect(data.dataPoints[1]).toBe('Capital: Vienna');
    expect(data.dataPoints[2]).toBe('Languages: German, Croatian, Hungarian, Slovenian');
  });

  it('authored country pages keep their authored data points (no dataset override)', () => {
    const germany = resolveLocationEntry({ country: 'germany' });
    const data = buildLocationViewData(germany!);
    expect(data.dataPoints.length).toBe(4);
    expect(data.dataPoints[0]).toBe('Population of roughly 83 million across 16 states.');
    expect(data.dataPoints.some((p) => p.startsWith('Population: '))).toBe(false);
  });

  it('un-authored country pages get the data-driven FAQ template (5 entries, dataset values)', () => {
    const austria = resolveLocationEntry({ country: 'austria' })!;
    const data = buildLocationViewData(austria);
    expect(data.faq.length).toBe(5);
    expect(data.faq[0]).toEqual({
      question: 'How do I find Origins in Austria?',
      answer:
        'The /location hub lists every Origin in Austria. Browse the Origin-type pages for startup, creative, political, meetup, and small business Origins, including in Austria.',
    });
    // Dataset values flow into the template.
    expect(data.faq[1].question).toBe('How many people live in Austria?');
    expect(data.faq[1].answer).toContain('8,847,037');
    expect(data.faq[2].answer).toBe('The capital of Austria is Vienna.');
    expect(data.faq[3].answer).toBe(
      'The languages spoken in Austria include German, Croatian, Hungarian, Slovenian.',
    );
    expect(data.faq[4].answer).toContain('JoinOrigin has no local offices');
  });

  it('authored country FAQ stays the source of truth', () => {
    const germany = resolveLocationEntry({ country: 'germany' })!;
    const data = buildLocationViewData(germany);
    expect(data.faq.length).toBe(3);
    expect(data.faq[0].question).toBe('How do I find communities in Germany?');
    // The authored FAQ is NOT replaced by the template (no duplicate
    // template entries are appended).
    expect(data.faq.some((entry) => entry.question === 'How many people live in Germany?')).toBe(
      false,
    );
  });

  it('the country FAQ template localizes per surface (localized template + dataset names)', () => {
    // Austria has no authored content — the data-driven FAQ renders through
    // the es template with the localized dataset country name.
    const austria = resolveLocationEntry({ country: 'austria' })!;
    const esData = buildLocationViewData(austria, 'es');
    expect(esData.faq.length).toBe(5);
    expect(esData.faq[0].question).toBe('¿Cómo encuentro Origins en Austria?');
    expect(esData.faq[2].answer).toBe('La capital de Austria es Vienna.');
    // EN surface keeps the EN template.
    const enData = buildLocationViewData(austria, 'en');
    expect(enData.faq[0].question).toBe('How do I find Origins in Austria?');
  });

  it('every country page carries dataset facts + a data-driven FAQ when un-authored', () => {
    const countries = locationPageEntries().filter((entry) => entry.kind === 'country');
    for (const entry of countries) {
      const data = buildLocationViewData(entry);
      expect(data.dataPoints.length).toBeGreaterThan(0);
      expect(data.faq.length).toBeGreaterThan(0);
    }
  });
});

describe('lib/seo locationView — region mesh (TASK-496)', () => {
  it('un-authored region pages carry the data-driven region mesh', () => {
    // Story G authored every content-rich region (Osaka included) — the
    // data-driven region mesh still renders for regions with no authored
    // content (Andorra's Sant Julià de Lòria).
    const region = resolveLocationEntry({ country: 'andorra', region: 'sant-julia-de-loria' });
    expect(region).toBeDefined();
    expect(region?.kind).toBe('region');
    const data = buildLocationViewData(region!);

    // Region facts — dataset-driven "Region facts" data points (part-of +
    // parent-country population/capital/languages).
    expect(data.dataPoints).toEqual([
      'Part of Andorra',
      'Population: 77,006',
      'Capital: Andorra la Vella',
      'Languages: Catalan',
    ]);

    // The region mesh mirrors the country mesh: localized region name,
    // parent-country facts, content-rich cities (registry-exact paths).
    const mesh = data.regionMesh;
    expect(mesh).toBeDefined();
    expect(mesh?.regionName).toBe('Sant Julià de Lòria');
    expect(mesh?.countryName).toBe('Andorra');
    expect(mesh?.facts).toEqual({
      population: 77006,
      capital: 'Andorra la Vella',
      languages: ['ca'],
    });
    expect(mesh?.cities).toEqual([]);

    // Data-driven FAQ — the localized template populated from the mesh.
    expect(mesh?.faq).toEqual(data.faq);
    expect(data.faq.length).toBeGreaterThanOrEqual(3);
    expect(data.faq[0].question).toBe('How do I find Origins in Sant Julià de Lòria?');
    expect(data.faq[1].answer).toBe(
      'Sant Julià de Lòria is part of Andorra, whose capital is Andorra la Vella.',
    );
    expect(data.faq[2].answer).toContain('Catalan');
    expect(data.faq[3].answer).toContain('JoinOrigin has no local offices');
  });

  it('authored region pages keep authored data points + FAQ and still carry the mesh', () => {
    const berlinRegion = resolveLocationEntry({ country: 'germany', region: 'berlin' });
    expect(berlinRegion).toBeDefined();
    const data = buildLocationViewData(berlinRegion!);
    // Authored region data points are NOT replaced by the dataset template.
    expect(data.dataPoints[0]).toBe(
      'Berlin is a city-state (Land) of roughly 3.4 million residents.',
    );
    // Authored FAQ stays the source of truth.
    expect(data.faq[0].question).toBe('Is the Berlin region different from the Berlin city scene?');
    // The mesh still resolves (region name + parent-country facts + cities).
    // The region heading is the honest dataset name ("State of Berlin" — the
    // same dataset row the country mesh region list uses).
    expect(data.regionMesh?.regionName).toBe('State of Berlin');
    expect(data.regionMesh?.countryName).toBe('Germany');
    expect(data.regionMesh?.cities.map((city) => city.name)).toEqual(['Berlin']);
  });

  it('region mesh city hrefs are registry-exact + move to the ACTIVE locale surface', () => {
    const osaka = resolveLocationEntry({ country: 'japan', region: 'osaka' })!;
    const registryPaths = new Set(locationPageEntries().map((entry) => entry.path));
    const en = buildLocationViewData(osaka, 'en');
    for (const city of en.regionMesh?.cities ?? []) {
      expect(registryPaths.has(city.path)).toBe(true);
      expect(city.path).toMatch(/^\/en\/location\//);
    }
    const es = buildLocationViewData(osaka, 'es');
    for (const city of es.regionMesh?.cities ?? []) {
      expect(city.path).toMatch(/^\/es\/location\//);
      expect(city.path).not.toMatch(/^\/en\//);
    }
  });

  it('every region page carries the mesh + dataset facts + FAQ (un-authored included)', () => {
    // Sample authored + un-authored regions across continents — full-registry
    // rebuilds inside breadcrumbsFor make iterating ALL ~3.8k regions too
    // slow, so the invariant is asserted on a representative sample.
    const sample = [
      { country: 'japan', region: 'osaka' }, // authored (Story G)
      { country: 'germany', region: 'berlin' }, // authored flagship
      { country: 'united-states', region: 'new-york' }, // authored flagship
      { country: 'france', region: 'ile-de-france' }, // authored (paris)
      { country: 'brazil', region: 'sao-paulo' }, // authored (sao-paulo)
      { country: 'australia', region: 'new-south-wales' }, // authored (sydney)
      { country: 'andorra', region: 'sant-julia-de-loria' }, // un-authored
    ];
    for (const params of sample) {
      const entry = resolveLocationEntry(params);
      expect(entry).toBeDefined();
      expect(entry?.kind).toBe('region');
      const data = buildLocationViewData(entry!);
      // Every region page renders facts + FAQ — authored or dataset-driven.
      expect(data.dataPoints.length).toBeGreaterThan(0);
      expect(data.faq.length).toBeGreaterThan(0);
      // The mesh resolves when the region hosts a content-rich city.
      if (data.regionMesh?.cities.length) {
        expect(data.regionMesh?.regionName.length).toBeGreaterThan(0);
        expect(data.regionMesh?.countryName.length).toBeGreaterThan(0);
      }
    }
  });

  it('region mesh city hrefs are registry-exact for every content-rich hosting region', () => {
    const registryPaths = new Set(locationPageEntries().map((entry) => entry.path));
    // Content-rich regions only (the section renders when cities exist).
    const contentRichRegionIds = new Set(contentRichCities().map((city) => city.regionId));
    const regions = locationPageEntries().filter(
      (entry) =>
        entry.kind === 'region' &&
        contentRichRegionIds.has(findRegionBySlug(entry.params.region ?? '')?.id ?? ''),
    );
    expect(regions.length).toBeGreaterThan(0);
    for (const entry of regions.slice(0, 12)) {
      const mesh = regionMeshFor(entry);
      expect(mesh).toBeDefined();
      expect(mesh?.cities.length).toBeGreaterThan(0);
      for (const city of mesh?.cities ?? []) {
        expect(registryPaths.has(city.path)).toBe(true);
      }
    }
  });

  it('regionMesh populates for region pages only', () => {
    const hub = locationPageEntries().find((entry) => entry.kind === 'hub')!;
    expect(buildLocationViewData(hub).regionMesh).toBeUndefined();
    const germany = resolveLocationEntry({ country: 'germany' })!;
    expect(buildLocationViewData(germany).regionMesh).toBeUndefined();
    const berlinCity = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
    })!;
    expect(buildLocationViewData(berlinCity).regionMesh).toBeUndefined();
  });
});

describe('lib/seo locationView — sibling city fallback (TASK-496)', () => {
  it('lima falls back to same-country cities (no same-region siblings)', () => {
    const lima = resolveLocationEntry({ country: 'peru', region: 'lima-province', city: 'lima' });
    expect(lima).toBeDefined();
    const data = buildLocationViewData(lima!);
    expect(data.siblingCities.length).toBeGreaterThan(0);
    const names = data.siblingCities.map((s) => s.name);
    expect(names).toContain('Arequipa');
    expect(names).toContain('Trujillo');
    // Every fallback href stays on the /en/location/peru/... surface.
    for (const sibling of data.siblingCities) {
      expect(sibling.path).toMatch(/^\/en\/location\/peru\//);
    }
  });

  it('jakarta falls back to same-country cities (no same-region siblings)', () => {
    const jakarta = resolveLocationEntry({
      country: 'indonesia',
      region: 'jakarta',
      city: 'jakarta',
    });
    expect(jakarta).toBeDefined();
    const data = buildLocationViewData(jakarta!);
    expect(data.siblingCities.length).toBeGreaterThan(0);
    const names = data.siblingCities.map((s) => s.name);
    expect(names).toContain('Surabaya');
    expect(names).toContain('Bandung');
    for (const sibling of data.siblingCities) {
      expect(sibling.path).toMatch(/^\/en\/location\/indonesia\//);
    }
  });

  it('singapore falls back to the global content-rich set (city-state with no country siblings)', () => {
    const singapore = resolveLocationEntry({
      country: 'singapore',
      region: 'singapore',
      city: 'singapore',
    });
    expect(singapore).toBeDefined();
    const data = buildLocationViewData(singapore!);
    expect(data.siblingCities.length).toBeGreaterThan(0);
    // Every fallback href is a real registry page (never a dead link).
    const registryPaths = new Set(locationPageEntries().map((entry) => entry.path));
    for (const sibling of data.siblingCities) {
      expect(registryPaths.has(sibling.path)).toBe(true);
    }
  });

  it('cities WITH same-region siblings keep the same-region set (no fallback)', () => {
    const berlin = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const data = buildLocationViewData(berlin!);
    expect(data.siblingCities.length).toBeGreaterThan(0);
    // Same-region siblings stay inside Germany (sibling city paths use the
    // dataset region slug for non-flagship rows — "state-of-berlin" — so the
    // country prefix is the stable part).
    for (const sibling of data.siblingCities) {
      expect(sibling.path).toMatch(/^\/en\/location\/germany\//);
      expect(sibling.name).not.toBe('Shanghai');
    }
  });

  it('sibling fallback hrefs move to the ACTIVE locale surface', () => {
    const lima = resolveLocationEntry({ country: 'peru', region: 'lima-province', city: 'lima' });
    const es = buildLocationViewData(lima!, 'es');
    expect(es.siblingCities.length).toBeGreaterThan(0);
    for (const sibling of es.siblingCities) {
      expect(sibling.path).toMatch(/^\/es\/location\/peru\//);
      expect(sibling.path).not.toMatch(/^\/en\//);
    }
  });
});

describe('lib/seo locationView — un-authored country mesh facts + FAQ (TASK-497)', () => {
  it('buildLocationViewData for an un-authored country exposes countryMesh facts + countryName', () => {
    // Story G authored every content-rich country (Italy included) — Austria
    // has no authored country content but still gets the data-driven mesh.
    const austria = resolveLocationEntry({ country: 'austria' });
    expect(austria).toBeDefined();
    const data = buildLocationViewData(austria!);
    expect(data.kind).toBe('country');
    expect(data.countryMesh).toBeDefined();
    expect(data.countryMesh?.countryName).toBe('Austria');
    expect(data.countryMesh?.facts).toEqual({
      population: 8847037,
      capital: 'Vienna',
      languages: ['de-AT', 'hr', 'hu', 'sl'],
    });
    // Dataset-driven country data points (localized templates).
    expect(data.dataPoints).toEqual([
      'Population: 8,847,037',
      'Capital: Vienna',
      'Languages: German, Croatian, Hungarian, Slovenian',
    ]);
    // Data-driven FAQ — non-empty for an un-authored country.
    expect(data.faq.length).toBe(5);
    expect(data.faq[0].question).toBe('How do I find Origins in Austria?');
    expect(data.faq[1].answer).toContain('8,847,037');
  });
});

describe('lib/seo locationView — multi-city region mesh (TASK-497)', () => {
  it('region pages expose region mesh cities, facts, and FAQ for multi-city regions', () => {
    // California hosts Los Angeles + San Francisco — a multi-city region
    // exercises the "cities in the region" mesh beyond the single-city Osaka.
    const california = resolveLocationEntry({ country: 'united-states', region: 'california' });
    expect(california).toBeDefined();
    expect(california?.kind).toBe('region');
    const data = buildLocationViewData(california!);
    expect(data.regionMesh).toBeDefined();
    expect(data.regionMesh?.regionName).toBe('California');
    expect(data.regionMesh?.countryName).toBe('United States');
    expect(data.regionMesh?.facts).toEqual({
      population: 327167434,
      capital: 'Washington',
      languages: ['en-US', 'es-US', 'haw', 'fr'],
    });
    // Cities sorted by population descending (LA before SF).
    expect(data.regionMesh?.cities).toEqual([
      { name: 'Los Angeles', path: '/en/location/united-states/california/los-angeles' },
      { name: 'San Francisco', path: '/en/location/united-states/california/san-francisco' },
    ]);
    // Region facts data points + data-driven FAQ — authored content wins
    // over the dataset fallback once the region content is registered
    // (TASK-511/TASK-513).
    expect(data.dataPoints).toEqual([
      'California is the most populous US state, with roughly 39 million residents.',
      'State capital is Sacramento; largest cities are Los Angeles and San Diego.',
      'Bay Area tech scene and Southern California entertainment scene are both world-scale.',
      'Home to Stanford, the UC system, and a network of research universities.',
    ]);
    expect(data.faq.length).toBeGreaterThanOrEqual(3);
    expect(data.faq[0].question).toBe('Is California one community scene or several?');
    expect(data.faq[0].answer).toContain('Los Angeles');
  });
});
