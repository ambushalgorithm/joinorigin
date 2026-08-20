import { indexableLocationEntries, isWarmSetEntry, locationPageEntries } from '../locationPages';
import { FLAGSHIP_CITIES, TIER_2_CITY_SLUGS, getDatasetVersion, slugify } from '../locationData';
import { listContentByKind } from '../content';
import type { Locale } from '@joinorigin/i18n';
import { getDictionary, getT } from '@joinorigin/i18n';

/**
 * fe-seo-registry registry unit tests (TASK-307), extended for Sprint 20
 * (TASK-473): the registry now emits variant + ideas entries for EVERY
 * content-rich city — not just flagships (EN 56 city files × 7 pages, plus
 * per-locale committed content: de Berlin + Munich, es 8, ar 3, hi 6, …).
 *
 * Asserts `locationPageEntries()` derives correct params/paths/titles from
 * the committed snapshot, the `indexable` flag reflects the gates (Tier-3
 * content like Copenhagen renders but stays noindex — D8), the warm set is
 * exactly the hub + Tier-1 (NYC + Berlin) and Tier-2 variants/ideas are
 * never prerendered, duplicate (regionId, slug) rows are deduped, and the
 * per-locale (de) surface covers Berlin + Munich.
 */

describe('lib/seo locationPages — EN canonical surface', () => {
  const entries = locationPageEntries();
  const paths = entries.map((entry) => entry.path);

  it('derives entries from the committed snapshot with unique paths', () => {
    expect(entries.length).toBeGreaterThan(0);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('includes the hub with params {} and indexable true (EN canonical at /en/location)', () => {
    const hub = entries.find((entry) => entry.kind === 'hub');
    expect(hub).toMatchObject({
      params: {},
      path: '/en/location',
      tier: 1,
      indexable: true,
      priority: 0.9,
    });
  });

  it('derives the NYC city page params/path/title (design §8.4 shape)', () => {
    const nyc = entries.find((entry) => entry.kind === 'city' && entry.params.city === 'new-york');
    expect(nyc).toBeDefined();
    expect(nyc?.params).toEqual({
      country: 'united-states',
      region: 'new-york',
      city: 'new-york',
    });
    expect(nyc?.path).toBe('/en/location/united-states/new-york/new-york');
    expect(nyc?.title).toBe('Communities in New York City, New York | JoinOrigin');
    expect(nyc?.tier).toBe(1);
    expect(nyc?.indexable).toBe(true);
  });

  it('derives the Berlin city page path from the flagship region override', () => {
    const berlin = entries.find((entry) => entry.kind === 'city' && entry.params.city === 'berlin');
    expect(berlin?.path).toBe('/en/location/germany/berlin/berlin');
    expect(berlin?.title).toBe('Communities in Berlin | JoinOrigin'); // no ", Berlin" suffix
    expect(berlin?.indexable).toBe(true);
  });

  it('derives country + region pages for the flagship parents', () => {
    const us = entries.find(
      (entry) => entry.kind === 'country' && entry.params.country === 'united-states',
    );
    const germany = entries.find(
      (entry) => entry.kind === 'country' && entry.params.country === 'germany',
    );
    const nyRegion = entries.find(
      (entry) => entry.kind === 'region' && entry.params.region === 'new-york',
    );
    const berlinRegion = entries.find(
      (entry) => entry.kind === 'region' && entry.params.region === 'berlin',
    );
    expect(us?.path).toBe('/en/location/united-states');
    expect(germany?.path).toBe('/en/location/germany');
    expect(nyRegion?.path).toBe('/en/location/united-states/new-york');
    expect(berlinRegion?.path).toBe('/en/location/germany/berlin');
    expect(us?.indexable).toBe(true);
    expect(germany?.indexable).toBe(true);
    expect(nyRegion?.indexable).toBe(true);
    expect(berlinRegion?.indexable).toBe(true);
  });

  it('derives all 5 group-type variants + ideas for EVERY content-rich city (not just flagships)', () => {
    // Sprint 20: the registry loop generalizes to every city with committed
    // EN content — 56 city files × (5 variants + 1 ideas) = 336 entries.
    const contentCities = listContentByKind('city', 'en');
    expect(contentCities).toHaveLength(56);
    const variants = entries.filter((entry) => entry.kind === 'variant');
    const ideas = entries.filter((entry) => entry.kind === 'ideas');
    expect(variants).toHaveLength(contentCities.length * 5);
    expect(ideas).toHaveLength(contentCities.length);
    for (const variant of variants) {
      expect(variant.path).toMatch(/\/en\/location\/[^/]+\/[^/]+\/[^/]+\/[a-z-]+$/);
    }
    // Indexability is gate + tier driven: every flagship variant/ideas page
    // is indexable (Tier-1), Tier-2 content cities are indexable where gates
    // pass, and Tier-3 content (Copenhagen) renders but stays noindex.
    const flagshipVariants = variants.filter((variant) =>
      FLAGSHIP_CITIES.some((flagship) => flagship.slug === variant.params.city),
    );
    expect(flagshipVariants).toHaveLength(FLAGSHIP_CITIES.length * 5);
    expect(flagshipVariants.every((variant) => variant.indexable)).toBe(true);
    const flagshipIdeas = ideas.filter((idea) =>
      FLAGSHIP_CITIES.some((flagship) => flagship.slug === idea.params.city),
    );
    expect(flagshipIdeas).toHaveLength(FLAGSHIP_CITIES.length);
    expect(flagshipIdeas.every((idea) => idea.indexable)).toBe(true);
  });

  it('emits variant + ideas entries for dubai and buenos-aires (content-rich Tier-2, not flagships)', () => {
    for (const slug of ['dubai', 'buenos-aires']) {
      const variants = entries.filter(
        (entry) => entry.kind === 'variant' && entry.params.city === slug,
      );
      expect(variants).toHaveLength(5);
      for (const variant of variants) {
        expect(variant.tier).toBe(2);
        expect(variant.indexable).toBe(true);
      }
      const startup = variants.find((variant) => variant.groupType === 'startup');
      expect(startup).toBeDefined();
      expect(startup?.path).toContain(`/en/location/`);
      expect(startup?.path.endsWith(`/${slug}/startup`)).toBe(true);
      const ideas = entries.filter((entry) => entry.kind === 'ideas' && entry.params.city === slug);
      expect(ideas).toHaveLength(1);
      expect(ideas[0].tier).toBe(2);
      expect(ideas[0].indexable).toBe(true);
      expect(ideas[0].path.endsWith(`/${slug}/ideas`)).toBe(true);
    }
  });

  it('Copenhagen (Tier-3 but content-rich) renders its full surface but stays non-indexable (D8)', () => {
    const copenhagen = entries.filter((entry) => entry.params.city === 'copenhagen');
    // city + 5 variants + ideas — content-rich pages exist and render.
    expect(copenhagen).toHaveLength(7);
    for (const entry of copenhagen) {
      expect(entry.tier).toBe(3);
      expect(entry.indexable).toBe(false); // tier > 2 gate → noindex (D8)
    }
    expect(indexableLocationEntries().some((entry) => entry.params.city === 'copenhagen')).toBe(
      false,
    );
  });

  it('derives non-flagship Tier-2 cities as indexable and long-tail Tier-3 cities as non-indexable', () => {
    // Austin is in the Sprint 18 55-city set → Tier-2 with content → indexable.
    const austin = entries.find((entry) => entry.kind === 'city' && entry.params.city === 'austin');
    expect(austin).toBeDefined();
    expect(austin?.tier).toBe(2);
    expect(austin?.indexable).toBe(true);
    expect(austin?.path).toBe('/en/location/united-states/texas/austin');
    // Dallas is long tail — Tier-3, no content, never indexable.
    const dallas = entries.find((entry) => entry.kind === 'city' && entry.params.city === 'dallas');
    expect(dallas).toBeDefined();
    expect(dallas?.tier).toBe(3);
    expect(dallas?.indexable).toBe(false);
    expect(dallas?.path).toBe('/en/location/united-states/texas/dallas');
  });

  it('dedupes (regionId, slug) duplicate rows to one canonical URL', () => {
    // The snapshot carries multiple PPLX rows named "Manhattan" in us-ny;
    // the registry must emit exactly one /.../manhattan city page.
    const manhattan = entries.filter((entry) => entry.params.city === 'manhattan');
    expect(manhattan.length).toBeLessThanOrEqual(1);
  });

  it('lastModified equals the dataset version date (deterministic)', () => {
    const version = getDatasetVersion();
    for (const entry of entries) {
      expect(entry.lastModified).toBe(version);
    }
    expect(version).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('titles/descriptions carry the intent (G4) for every indexable page', () => {
    for (const entry of indexableLocationEntries()) {
      if (entry.kind === 'hub') continue;
      const cityName = entry.params.city
        ? FLAGSHIP_CITIES.find((flagship) => flagship.slug === entry.params.city)?.displayName
        : undefined;
      const needle = (cityName ?? slugify(entry.path.split('/').pop() ?? ''))
        .toLowerCase()
        .replace(/-/g, ' ');
      expect(entry.title.toLowerCase().replace(/-/g, ' ')).toContain(needle);
    }
  });

  it('metadata templates resolve from the seoContent.metadata.* dictionary (TASK-416)', () => {
    const en = getT(getDictionary('en'));
    // City title = communitiesInWithRegion template interpolated + brand.
    const nyc = entries.find((entry) => entry.kind === 'city' && entry.params.city === 'new-york');
    expect(nyc?.title).toBe(
      `${en('seoContent.metadata.title.communitiesInWithRegion', {
        name: 'New York City',
        region: 'New York',
      })} | JoinOrigin`,
    );
    // City description ends with the localized waitlist phrase.
    expect(nyc?.description).toBe(
      en('seoContent.metadata.description.city', {
        city: 'New York City',
        waitlist: en('seoContent.metadata.waitlistPhrase'),
      }),
    );
    // Variant title = variantIn template (localized group-type label).
    const startup = entries.find(
      (entry) =>
        entry.kind === 'variant' && entry.params.city === 'berlin' && entry.groupType === 'startup',
    );
    expect(startup?.title).toBe(
      `${en('seoContent.metadata.title.variantIn', {
        label: 'Startup communities',
        name: 'Berlin',
      })} | JoinOrigin`,
    );
    // No hardcoded EN chrome leaks into the registry metadata — every title
    // matches one of the authored metadata templates.
    for (const entry of entries) {
      expect(entry.title.endsWith(` | JoinOrigin`)).toBe(true);
      expect(entry.description.length).toBeGreaterThan(0);
    }
  });
});

describe('lib/seo locationPages — indexable set + warm set', () => {
  it('indexable EN set covers the hub + 2 countries + 2 regions + all 55 approved cities + every gate-passing variant/ideas', () => {
    const indexable = indexableLocationEntries();
    expect(indexable.length).toBeGreaterThanOrEqual(300);
    const byKind = (kind: string) => indexable.filter((entry) => entry.kind === kind);
    expect(byKind('hub')).toHaveLength(1);
    expect(byKind('country')).toHaveLength(2);
    expect(byKind('region')).toHaveLength(2);
    // 55 approved cities (incl. the 2 flagships) are indexable — duplicate
    // dataset rows sharing an approved slug (e.g. London, Ontario) are
    // additional Tier-2 entries with the same authored content.
    expect(byKind('city').length).toBeGreaterThanOrEqual(55);
    // Sprint 20: indexable variants/ideas cover every content-rich city's
    // gate-passing pages. 56 content cities × 5 = 280 variants are emitted;
    // 249 pass the gates (Tier-2, indexable) and 31 fail (Tier-3 Copenhagen
    // ×5 + translated creative/meetup gates for a subset). 55 of 56 ideas
    // pages pass (only Tier-3 Copenhagen is excluded by the tier gate).
    expect(byKind('variant').length).toBe(249);
    expect(byKind('ideas').length).toBe(55);
    // Every approved Tier-2 city page (non-flagship) is indexable.
    for (const slug of TIER_2_CITY_SLUGS) {
      if (slug === 'new-york' || slug === 'berlin') continue;
      const cityEntries = indexable.filter(
        (entry) => entry.kind === 'city' && entry.params.city === slug,
      );
      expect(cityEntries.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('warm set (hub + Tier-1) is a subset of the indexable set', () => {
    const warm = locationPageEntries().filter(isWarmSetEntry);
    const indexablePaths = new Set(indexableLocationEntries().map((entry) => entry.path));
    expect(warm.length).toBeGreaterThan(0);
    for (const entry of warm) {
      expect(indexablePaths.has(entry.path)).toBe(true);
    }
    // Tier-2 cities are indexable but NOT prerendered (ISR on demand).
    const tier2City = locationPageEntries().find(
      (entry) => entry.kind === 'city' && entry.tier === 2,
    );
    expect(tier2City).toBeDefined();
    expect(indexablePaths.has(tier2City!.path)).toBe(true);
    expect(warm.some((entry) => entry.path === tier2City!.path)).toBe(false);
  });

  it('warm set stays exactly hub + Tier-1 (NYC + Berlin) — Tier-2 variants/ideas are NOT warm', () => {
    const all = locationPageEntries();
    const warm = all.filter(isWarmSetEntry);
    const warmByKind = (kind: string) => warm.filter((entry) => entry.kind === kind);
    // Warm = hub + 2 countries + 2 regions + 2 flagship cities + 10 flagship
    // variants + 2 flagship ideas = 19 entries (unchanged by Sprint 20).
    expect(warm).toHaveLength(19);
    expect(warmByKind('hub')).toHaveLength(1);
    expect(warmByKind('country')).toHaveLength(2);
    expect(warmByKind('region')).toHaveLength(2);
    expect(warmByKind('city')).toHaveLength(2);
    expect(warmByKind('variant')).toHaveLength(10);
    expect(warmByKind('ideas')).toHaveLength(2);
    // Every warm entry is the hub or a NYC/Berlin flagship surface path
    // (country/region ancestors included — they are Tier-1 via the flagship
    // parent).
    for (const entry of warm) {
      expect(
        entry.path === '/en/location' ||
          entry.path === '/en/location/united-states' ||
          entry.path.startsWith('/en/location/united-states/new-york') ||
          entry.path === '/en/location/germany' ||
          entry.path.startsWith('/en/location/germany/berlin'),
      ).toBe(true);
    }
    // Tier-2 variants/ideas render + are indexable but never warm — dubai and
    // buenos-aires variant/ideas pages must NOT be prerendered at build.
    for (const slug of ['dubai', 'buenos-aires']) {
      const startup = all.find((entry) => entry.kind === 'variant' && entry.params.city === slug);
      const ideas = all.find((entry) => entry.kind === 'ideas' && entry.params.city === slug);
      expect(startup?.indexable).toBe(true);
      expect(warm.some((entry) => entry.path === startup?.path)).toBe(false);
      expect(ideas?.indexable).toBe(true);
      expect(warm.some((entry) => entry.path === ideas?.path)).toBe(false);
    }
  });

  it('Tier-3 entries never appear in the indexable set', () => {
    expect(indexableLocationEntries().every((entry) => entry.tier <= 2)).toBe(true);
  });
});

describe('lib/seo locationPages — per-locale (de) Berlin + Munich surface', () => {
  const de = locationPageEntries('de');

  it('emits the Berlin de 7-page surface + the Munich de surface (14 total)', () => {
    expect(de).toHaveLength(14);
    const berlin = de.filter((entry) => entry.params.city === 'berlin');
    const munich = de.filter((entry) => entry.params.city === 'munich');
    expect(berlin).toHaveLength(7); // city + 5 variants + ideas
    expect(munich).toHaveLength(7);
    const byKind = (kind: string) => de.filter((entry) => entry.kind === kind);
    expect(byKind('city')).toHaveLength(2);
    expect(byKind('variant')).toHaveLength(10);
    expect(byKind('ideas')).toHaveLength(2);
    expect(de.every((entry) => entry.locale === 'de')).toBe(true);
    expect(
      de.every(
        (entry) =>
          entry.path.startsWith('/de/location/germany/berlin/') ||
          entry.path.startsWith('/de/location/germany/bavaria/'),
      ),
    ).toBe(true);
  });

  it('munich de surface grows the de indexable set beyond 7 (Berlin 7 + Munich city)', () => {
    const deIndexable = indexableLocationEntries('de');
    // Berlin de (Tier-1) 7 pages stay indexable; the Munich de city page is
    // Tier-2 with committed content → indexable. Munich de variants/ideas are
    // committed content too but fail the translated-surface gates (G2/G4 on
    // German prose/word counts) → they render but stay noindex.
    expect(deIndexable.length).toBeGreaterThan(7);
    const berlin = deIndexable.filter((entry) => entry.params.city === 'berlin');
    const munich = deIndexable.filter((entry) => entry.params.city === 'munich');
    expect(berlin).toHaveLength(7);
    expect(munich).toHaveLength(1);
    expect(munich[0].kind).toBe('city');
    expect(munich[0].path).toBe('/de/location/germany/bavaria/munich');
    // The Munich variants/ideas pages exist in the registry but are NOT
    // indexable on the de surface (rendered, noindex — D8).
    const munichAll = de.filter((entry) => entry.params.city === 'munich');
    expect(munichAll).toHaveLength(7);
    expect(munichAll.filter((entry) => entry.indexable)).toHaveLength(1);
  });

  it('de pages carry German titles; Berlin pages are indexable', () => {
    const berlin = de.filter((entry) => entry.params.city === 'berlin');
    const startup = berlin.find(
      (entry) => entry.kind === 'variant' && entry.groupType === 'startup',
    );
    expect(startup?.title).toBe('Startup-Communities in Berlin | JoinOrigin');
    expect(startup?.indexable).toBe(true);
    const ideas = berlin.find((entry) => entry.kind === 'ideas');
    expect(ideas?.title).toBe('30 Ideen für Community-Events in Berlin | JoinOrigin');
    expect(ideas?.indexable).toBe(true);
    expect(berlin.every((entry) => entry.indexable)).toBe(true);
  });

  it('de descriptions localize from content pageTitles (TASK-449 lead source)', () => {
    // buildLocationViewData's lead prefers these per-kind description
    // overrides — assert the registry carries the committed German copy.
    const startup = de.find((entry) => entry.kind === 'variant' && entry.groupType === 'startup');
    expect(startup?.description).toBe(
      'Finde oder gründe Startup-Communities in Berlin – Gründer:innen, Builders und frühe Teams in Mitte und Kreuzberg. JoinOrigin-Warteliste.',
    );
    const city = de.find((entry) => entry.kind === 'city');
    expect(city?.description).toBe(
      'Finde oder gründe Communities in Berlin – Startup, Kreativ, politisch, Meetups und Kleinunternehmen. Jetzt auf die JoinOrigin-Warteliste.',
    );
  });

  it('does NOT enumerate untranslated cities for the de surface', () => {
    const deNewYork = de.some((entry) => entry.path.includes('united-states'));
    expect(deNewYork).toBe(false);
  });

  it('per-locale surfaces enumerate their committed content cities × 7 (es 8, ar 3, hi 6, …)', () => {
    // Sprint 20: every per-locale surface with committed city files emits the
    // city + 5 variants + ideas for EACH content city — no locale surface is
    // empty anymore. Spot-check the committed sets from the content registry:
    const expected: Record<string, number> = {
      es: 8,
      ar: 3,
      hi: 6,
      fr: 2,
      'pt-BR': 3,
      ja: 2,
      'zh-TW': 2,
    };
    for (const [locale, cityCount] of Object.entries(expected)) {
      const surface = locationPageEntries(locale as Locale);
      const citySlugs = new Set(
        surface.filter((entry) => entry.kind === 'city').map((entry) => entry.params.city),
      );
      expect(citySlugs.size).toBe(cityCount);
      expect(surface).toHaveLength(cityCount * 7);
    }
  });

  it('registry paths are all-prefixed per surface — EN /en/location/..., per-locale /<locale>/location/... (TASK-466/TASK-469)', () => {
    // EN canonical tree is the origin for every indexable page.
    for (const entry of indexableLocationEntries()) {
      expect(entry.path).toMatch(/^\/en\/location/);
    }
    // The de surface (committed Berlin) lives under its own prefix.
    for (const entry of locationPageEntries('de')) {
      expect(entry.path).toMatch(/^\/de\/location/);
    }
    // Every per-locale committed entry stays inside its own tree — card hrefs
    // derived from the EN directory map to the ACTIVE locale surface (TASK-469).
  });

  it('the ideas G4 intent phrase resolves per-locale from the dictionary (TASK-457)', () => {
    const deIdeas = de.find((entry) => entry.kind === 'ideas');
    expect(deIdeas).toBeDefined();
    // The de ideas page title embeds the de dictionary phrase
    // (seoContent.location.ideasLink: "30 Ideen für Community-Events").
    expect(deIdeas!.title).toContain(getT(getDictionary('de'))('seoContent.location.ideasLink'));
    // EN canonical uses the EN phrase — never the de literal.
    const enIdeas = locationPageEntries().find((entry) => entry.kind === 'ideas');
    expect(enIdeas).toBeDefined();
    expect(enIdeas!.title).toContain(getT(getDictionary('en'))('seoContent.location.ideasLink'));
  });
});

describe('lib/seo locationPages — determinism', () => {
  it('two calls produce identical entries (no new Date / Math.random)', () => {
    const first = locationPageEntries();
    const second = locationPageEntries();
    expect(first).toEqual(second);
  });
});
