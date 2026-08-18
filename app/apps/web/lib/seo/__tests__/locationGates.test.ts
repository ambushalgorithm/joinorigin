import { getCityContent } from '../content';
import type { LocationCity } from '../data/types';
import { findCityByGeonameId, GROUP_TYPES } from '../locationData';
import {
  MIN_PROSE_WORDS,
  NEAR_DUPLICATE_THRESHOLD,
  countCityDataPoints,
  evaluatePageGates,
  gateG1,
  gateG2,
  gateG4,
  gateG5,
  ideaPageProse,
  ideaPageUnique,
  intentMatches,
  nearDuplicate,
  similarity,
  wordCount,
} from '../locationGates';

/**
 * fe-seo-registry quality-gate unit tests (TASK-307).
 *
 * Covers G1 (data points), G2 (unique prose ≥150 words), G4 (intent
 * match), G5 (near-duplicate), the idea-page uniqueness rule (no
 * NYC↔Berlin reuse), and the `indexable` flag from `evaluatePageGates`.
 */

describe('lib/seo locationGates — text utilities', () => {
  it('counts whitespace-separated words', () => {
    expect(wordCount('one two three')).toBe(3);
    expect(wordCount('  spaced   out  ')).toBe(2);
    expect(wordCount('')).toBe(0);
    expect(wordCount('   ')).toBe(0);
  });

  it('treats identical text as perfectly similar (similarity 1)', () => {
    const prose =
      'New York has startup founders in SoHo, designers in Brooklyn, and community gardens across the boroughs.';
    expect(similarity(prose, prose)).toBe(1);
  });

  it('treats disjoint text as dissimilar', () => {
    expect(similarity('apple banana cherry', 'dog elephant fox')).toBe(0);
  });
});

describe('lib/seo locationGates — G5 near-duplicate', () => {
  const unique =
    'New York City startup communities cluster in SoHo coworking spaces, Flatiron accelerators, and Brooklyn studios, with founders meeting investors, designers, and operators daily across the boroughs.';
  const duplicate = unique; // exact copy
  const nameSwapped = unique.replace(/New York City/g, 'Berlin'); // template-ish swap
  const distinct =
    'Berlin creative communities gather in Neukölln studios, Mitte galleries, and Friedrichshain project spaces, shaped by affordable rooms, self-organization, and a scene that prizes authenticity over polish.';

  it('flags exact duplicates as near-duplicate', () => {
    expect(similarity(unique, duplicate)).toBeGreaterThanOrEqual(NEAR_DUPLICATE_THRESHOLD);
    expect(nearDuplicate(unique, duplicate)).toBe(true);
  });

  it('flags name-swapped templates as near-duplicate', () => {
    // A template that only swaps the city name must be caught by G5.
    expect(similarity(unique, nameSwapped)).toBeGreaterThanOrEqual(NEAR_DUPLICATE_THRESHOLD);
    expect(nearDuplicate(unique, nameSwapped)).toBe(true);
  });

  it('passes genuinely distinct prose', () => {
    expect(similarity(unique, distinct)).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
    expect(nearDuplicate(unique, distinct)).toBe(false);
  });

  it('gateG5 fails identical prose and passes distinct prose', () => {
    expect(gateG5('variant', unique, duplicate).pass).toBe(false);
    expect(gateG5('variant', unique, distinct).pass).toBe(true);
  });
});

describe('lib/seo locationGates — G4 intent match', () => {
  it('matches a city page title/meta that name the city + communities', () => {
    expect(
      intentMatches(
        'Communities in New York City, New York | JoinOrigin',
        'Find or start communities in New York City — startup, creative, political, meetup, and small business groups.',
        'New York City',
        'city',
      ),
    ).toBe(true);
  });

  it('matches a variant page with the group-type label', () => {
    expect(
      intentMatches(
        'Small business communities in New York City | JoinOrigin',
        'Find or start small business communities in New York City — real venues and how-tos.',
        'New York City',
        'variant',
        'Small business communities',
      ),
    ).toBe(true);
  });

  it('matches an idea page with a localized phrase (de: Ideen)', () => {
    expect(
      intentMatches(
        '30 Ideen für Community-Events in Berlin | JoinOrigin',
        '30 realistische Ideen für Community-Events in Berlin – Networking, Lernen, Draußen, Beruf, Kreativ & Impact.',
        'Berlin',
        'ideas',
        'Ideen',
      ),
    ).toBe(true);
  });

  it('rejects titles that omit the city name', () => {
    expect(
      intentMatches(
        'Communities in Your Area | JoinOrigin',
        'Find or start communities in your area.',
        'New York City',
        'city',
      ),
    ).toBe(false);
  });

  it('rejects variant titles missing the group-type label', () => {
    expect(
      intentMatches(
        'Events in New York City | JoinOrigin',
        'Events in New York City.',
        'New York City',
        'variant',
        'Startup communities',
      ),
    ).toBe(false);
  });

  it('gateG4 exposes the intent phrase in the failure detail', () => {
    const result = gateG4(
      'variant',
      'Events in New York City | JoinOrigin',
      'Events in New York City.',
      'New York City',
      'Startup communities',
    );
    expect(result.pass).toBe(false);
    expect(result.detail).toContain('Startup communities in New York City');
  });
});

describe('lib/seo locationGates — G1/G2 gates', () => {
  it('counts dataset + content data points for a city (G1)', () => {
    const fakeCity: LocationCity = {
      id: 1,
      name: 'Fixture City',
      asciiName: 'Fixture City',
      lat: 0,
      lng: 0,
      countryIso2: 'US',
      regionId: 'us-fixture',
      population: 1_000_000,
      timezone: 'America/New_York',
      featureCode: 'PPL',
      capital: '',
      sameName: false,
      names: {} as LocationCity['names'],
    };
    const content = { dataPoints: ['A real venue reference.', 'A real industry cluster.'] };
    expect(countCityDataPoints(fakeCity, content)).toBeGreaterThanOrEqual(3);
    expect(gateG1('city', fakeCity, content as never).pass).toBe(true);
  });

  it('G2 fails when the unique prose is under 150 words', () => {
    const shortContent = {
      kind: 'city',
      locale: 'en',
      slug: 'fixture',
      intro: ['Short prose.'],
      dataPoints: [],
      faq: [],
      variantIntros: {},
      ideaPage: { intro: '', categories: [], faq: [] },
    } as never;
    const result = gateG2('city', shortContent);
    expect(result.pass).toBe(false);
    expect(result.detail).toContain(String(MIN_PROSE_WORDS));
  });

  it('G2 passes prose at or above 150 words', () => {
    const prose = Array.from({ length: 150 }, (_, index) => `word${index}`).join(' ');
    const content = {
      kind: 'city',
      locale: 'en',
      slug: 'fixture',
      intro: [prose],
      dataPoints: [],
      faq: [],
      variantIntros: {},
      ideaPage: { intro: '', categories: [], faq: [] },
    } as never;
    expect(gateG2('city', content).pass).toBe(true);
  });

  it('G2 sums paragraph lengths for array intros (TASK-410)', () => {
    const paragraphs = Array.from({ length: 3 }, (_, paragraphIndex) =>
      Array.from({ length: 50 }, (_, wordIndex) => `p${paragraphIndex}-w${wordIndex}`).join(' '),
    );
    const content = {
      kind: 'city',
      locale: 'en',
      slug: 'fixture',
      intro: paragraphs,
      dataPoints: [],
      faq: [],
      variantIntros: {},
      ideaPage: { intro: '', categories: [], faq: [] },
    } as never;
    expect(gateG2('city', content).pass).toBe(true);
  });
});

describe('lib/seo locationGates — idea-page uniqueness rule', () => {
  const ideaA = getCityContent('new-york', 'en');
  const ideaB = getCityContent('berlin', 'en');
  const variantA = getCityContent('berlin', 'en');

  if (!ideaA || !ideaB || !variantA) {
    throw new Error('Missing flagship content fixtures for uniqueness tests');
  }

  it('NYC and Berlin idea pages are not near-duplicates (no reuse)', () => {
    const sim = similarity(ideaPageProse(ideaA), ideaPageProse(ideaB));
    expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
  });

  it('idea prose does not overlap its own city variant prose', () => {
    expect(ideaPageUnique(ideaB, variantA)).toBe(true);
  });

  it('fails when idea prose is copied between cities', () => {
    const copied = {
      kind: 'city' as const,
      ideaPage: {
        intro: ideaPageProse(ideaA),
        categories: [],
        faq: [],
      },
    };
    expect(ideaPageUnique(copied, variantA, ideaPageProse(ideaA))).toBe(false);
  });
});

describe('lib/seo locationGates — indexable flag via evaluatePageGates', () => {
  it('hub is always indexable without gate evaluation', () => {
    const result = evaluatePageGates({ kind: 'hub', tier: 1 });
    expect(result.indexable).toBe(true);
    expect(result.gates).toEqual([]);
  });

  it('a page failing any gate is not indexable', () => {
    const result = evaluatePageGates({
      kind: 'city',
      tier: 1,
      title: 'Communities in Fixture | JoinOrigin',
      description: 'Find or start communities in Fixture.',
      cityName: 'Fixture',
      content: {
        kind: 'city',
        locale: 'en',
        slug: 'fixture',
        intro: ['Too short.'],
        dataPoints: [],
        faq: [],
        variantIntros: {},
        ideaPage: { intro: '', categories: [], faq: [] },
      } as never,
    });
    expect(result.indexable).toBe(false);
    expect(result.gates.some((gate) => !gate.pass)).toBe(true);
  });

  it('Tier-3 long-tail entries are never indexable even with passing content', () => {
    const prose = Array.from({ length: 200 }, (_, index) => `word${index}`).join(' ');
    const entity = findCityByGeonameId(5128581); // real dataset place for G1/G3
    const content = {
      kind: 'city',
      locale: 'en',
      slug: 'fixture',
      intro: [prose],
      dataPoints: ['a', 'b', 'c'],
      faq: [],
      variantIntros: {},
      ideaPage: { intro: prose, categories: [], faq: [] },
    } as never;
    const result = evaluatePageGates({
      kind: 'city',
      tier: 3,
      entity,
      title: 'Communities in Fixture | JoinOrigin',
      description: 'Find or start communities in Fixture.',
      cityName: 'Fixture',
      content,
    });
    expect(result.gates.every((gate) => gate.pass)).toBe(true);
    expect(result.indexable).toBe(false); // tier gate
  });

  it('a full passing Tier-1 city page is indexable', () => {
    const city = getCityContent('berlin', 'en');
    expect(city).toBeDefined();
    const result = evaluatePageGates({
      kind: 'city',
      tier: 1,
      entity: findCityByGeonameId(2950159),
      title: 'Communities in Berlin | JoinOrigin',
      description: 'Find or start communities in Berlin.',
      cityName: 'Berlin',
      content: city as never,
      parentProse: getCityContent('new-york', 'en')?.intro.join(' '),
    });
    expect(result.gates.map((gate) => gate.pass)).toEqual([true, true, true, true, true]);
    expect(result.indexable).toBe(true);
  });
});

describe('lib/seo locationGates — taxonomy sanity', () => {
  it('every group-type key has a variant intro in both flagship city content files', () => {
    for (const citySlug of ['new-york', 'berlin'] as const) {
      const content = getCityContent(citySlug, 'en');
      expect(content).toBeDefined();
      for (const type of GROUP_TYPES) {
        expect(content?.variantIntros[type.key]?.length ?? 0).toBeGreaterThan(0);
      }
    }
  });
});

describe('lib/seo locationGates — variant enrichment distinctness (TASK-319)', () => {
  const concatEnrichment = (enrichment: {
    venues: string[];
    formats: string[];
    howToStart: string[];
  }) => [...enrichment.venues, ...enrichment.formats, ...enrichment.howToStart].join(' ');

  it('NYC startup enrichment differs from Berlin startup enrichment (no name-swap)', () => {
    const nyc = getCityContent('new-york', 'en');
    const berlin = getCityContent('berlin', 'en');
    const nycStartup = nyc?.variantEnrichment?.startup;
    const berlinStartup = berlin?.variantEnrichment?.startup;
    expect(nycStartup).toBeDefined();
    expect(berlinStartup).toBeDefined();
    expect(berlinStartup?.venues.join(' ')).not.toContain('SoHo');
    expect(nycStartup?.venues.join(' ')).toContain('SoHo');
    const sim = similarity(concatEnrichment(nycStartup!), concatEnrichment(berlinStartup!));
    expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
  });

  it('startup enrichment differs from creative enrichment within the same city', () => {
    for (const citySlug of ['new-york', 'berlin'] as const) {
      const content = getCityContent(citySlug, 'en');
      const startup = content?.variantEnrichment?.startup;
      const creative = content?.variantEnrichment?.creative;
      expect(startup).toBeDefined();
      expect(creative).toBeDefined();
      const sim = similarity(concatEnrichment(startup!), concatEnrichment(creative!));
      expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
    }
  });
});
