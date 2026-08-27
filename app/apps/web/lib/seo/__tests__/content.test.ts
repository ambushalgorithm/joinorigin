import {
  contentLocalesFor,
  getCityContent,
  getCountryContent,
  getGuideContent,
  getRegionContent,
  listContent,
} from '../content';
import { GROUP_TYPES, TIER_2_CITY_SLUGS } from '../locationData';
import type { Locale } from '@joinorigin/i18n';
import { nearDuplicate, NEAR_DUPLICATE_THRESHOLD, similarity, wordCount } from '../locationGates';

/**
 * fe-seo-registry content-file model tests (TASK-307) + Sprint 18
 * registry-completeness tests (TASK-442).
 *
 * Enforces the content contract: EN source of truth per city/region/
 * country, per-locale files (content/de/city/berlin.ts), body copy lives
 * in content files (never locale JSONs), unique prose ≥150 words (G2),
 * ≥3 data points (G1), 30 ideas in 6 categories (§6.6), and no
 * NYC↔Berlin reuse (G5 + idea-page uniqueness rule).
 *
 * TASK-442: every Sprint 18 file — 55 EN cities, per-locale city
 * translations, and 12×20 guide translations — must be registered and
 * resolvable through the registry.
 */

const MIN_PROSE_WORDS = 150;
const EXPECTED_CITIES = ['new-york', 'berlin'];
const GUIDE_SLUGS = [
  'publish-an-idea',
  'create-a-project',
  'create-a-group',
  'publish-a-small-business-idea',
  'publish-a-startup-concept',
  'find-a-co-founder',
  'start-an-origin',
  'first-10-members',
  'keep-an-origin-active',
  'hybrid-origins',
  'organize-a-meetup',
  'moderation',
];
const NON_EN_LOCALES: Locale[] = [
  'ar',
  'de',
  'es',
  'fa',
  'fr',
  'hi',
  'id',
  'it',
  'ja',
  'ko',
  'nl',
  'pl',
  'pt-BR',
  'ru',
  'th',
  'tr',
  'uk',
  'vi',
  'zh-CN',
  'zh-TW',
];

describe('lib/seo content — Sprint 18 registry completeness (TASK-442)', () => {
  it('registers every one of the 55 approved cities with EN source-of-truth content', () => {
    expect(TIER_2_CITY_SLUGS).toHaveLength(55);
    for (const slug of TIER_2_CITY_SLUGS) {
      const content = getCityContent(slug, 'en');
      expect(content).toBeDefined();
      expect(content?.kind).toBe('city');
      expect(content?.locale).toBe('en');
      expect(content?.slug).toBe(slug);
    }
  });

  it('registers the per-locale city translations for the predominant-locale cities', () => {
    // de: berlin + munich; es: 8 cities; hi: 6 cities; etc. Every locale
    // listed in the Sprint 18 plan has committed city content.
    expect(contentLocalesFor('city', 'berlin')).toEqual(expect.arrayContaining(['en', 'de']));
    expect(contentLocalesFor('city', 'munich')).toEqual(expect.arrayContaining(['en', 'de']));
    expect(contentLocalesFor('city', 'paris')).toEqual(expect.arrayContaining(['en', 'fr']));
    expect(contentLocalesFor('city', 'montreal')).toEqual(expect.arrayContaining(['en', 'fr']));
    expect(contentLocalesFor('city', 'mexico-city')).toEqual(expect.arrayContaining(['en', 'es']));
    expect(contentLocalesFor('city', 'sao-paulo')).toEqual(expect.arrayContaining(['en', 'pt-BR']));
    expect(contentLocalesFor('city', 'mumbai')).toEqual(expect.arrayContaining(['en', 'hi']));
    expect(contentLocalesFor('city', 'tokyo')).toEqual(expect.arrayContaining(['en', 'ja']));
    expect(contentLocalesFor('city', 'taipei')).toEqual(expect.arrayContaining(['en', 'zh-TW']));
    expect(contentLocalesFor('city', 'dubai')).toEqual(expect.arrayContaining(['en', 'ar']));
    // Locale translation resolves exactly (no EN fallback at the per-locale surface).
    expect(getCityContent('paris', 'fr')?.locale).toBe('fr');
    expect(getCityContent('mumbai', 'hi')?.locale).toBe('hi');
  });

  it('registers all 12×20 = 240 guide translations', () => {
    for (const locale of NON_EN_LOCALES) {
      for (const slug of GUIDE_SLUGS) {
        const content = getGuideContent(slug, locale);
        expect(content).toBeDefined();
        expect(content?.kind).toBe('guide');
        expect(content?.locale).toBe(locale);
        expect(content?.slug).toBe(slug);
      }
    }
  });

  it('registers the 12 EN guides and keeps the EN source of truth', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      expect(content).toBeDefined();
      expect(content?.locale).toBe('en');
    }
  });
});

describe('lib/seo content — registry + EN fallback', () => {
  it('resolves the EN source of truth for both flagship cities', () => {
    for (const slug of EXPECTED_CITIES) {
      expect(getCityContent(slug, 'en')).toBeDefined();
      expect(getCityContent(slug, 'en')?.locale).toBe('en');
    }
  });

  it('resolves per-locale content exactly (de Berlin) and falls back to EN otherwise', () => {
    const berlinDe = getCityContent('berlin', 'de');
    expect(berlinDe?.locale).toBe('de');
    expect(contentLocalesFor('city', 'berlin')).toEqual(expect.arrayContaining(['en', 'de']));
    // NYC has no de content — EN source of truth falls through.
    expect(getCityContent('new-york', 'de')?.locale).toBe('en');
    expect(contentLocalesFor('city', 'new-york')).toEqual(['en']);
  });

  it('lists only committed content per locale', () => {
    const deContent = listContent('de');
    expect(deContent.length).toBeGreaterThanOrEqual(1);
    expect(deContent.every((content) => content.locale === 'de')).toBe(true);
  });

  it('country/region content resolves for the flagship parents', () => {
    expect(getCountryContent('united-states', 'en')).toBeDefined();
    expect(getCountryContent('germany', 'en')).toBeDefined();
    expect(getRegionContent('new-york', 'en')).toBeDefined();
    expect(getRegionContent('berlin', 'en')).toBeDefined();
  });
});

describe('lib/seo content — quality contract (G1/G2/G5)', () => {
  it('every content file declares its kind/locale/slug and ≥150-word intro (G2)', () => {
    for (const content of listContent('en')) {
      // Guides and cities model the intro as a paragraph array (TASK-351 /
      // TASK-410) — sum the paragraph word counts so the same ≥150-word
      // gate applies.
      const introWords = Array.isArray(content.intro)
        ? content.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0)
        : wordCount(content.intro);
      expect(content.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('city files carry per-variant unique prose ≥150 words (G2)', () => {
    for (const slug of EXPECTED_CITIES) {
      const content = getCityContent(slug, 'en');
      expect(content).toBeDefined();
      for (const type of GROUP_TYPES) {
        const prose = content?.variantIntros[type.key] ?? '';
        expect(prose.length).toBeGreaterThan(0);
        expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      }
    }
  });

  it('city files carry per-variant enrichment (venues 4–6, formats 4–5, howToStart 3) (TASK-319)', () => {
    for (const slug of EXPECTED_CITIES) {
      const content = getCityContent(slug, 'en');
      expect(content).toBeDefined();
      for (const type of GROUP_TYPES) {
        const enrichment = content?.variantEnrichment?.[type.key];
        expect(enrichment).toBeDefined();
        if (!enrichment) continue;
        expect(enrichment.venues.length).toBeGreaterThanOrEqual(4);
        expect(enrichment.venues.length).toBeLessThanOrEqual(6);
        expect(enrichment.formats.length).toBeGreaterThanOrEqual(4);
        expect(enrichment.formats.length).toBeLessThanOrEqual(5);
        expect(enrichment.howToStart).toHaveLength(3);
        for (const venue of enrichment.venues) {
          expect(venue.length).toBeGreaterThan(0);
        }
        for (const format of enrichment.formats) {
          expect(format.length).toBeGreaterThan(0);
        }
        for (const step of enrichment.howToStart) {
          expect(step.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('variant enrichment differs per city for the same group type (G5-safe, TASK-319)', () => {
    for (const type of GROUP_TYPES) {
      const nyc = getCityContent('new-york', 'en');
      const berlin = getCityContent('berlin', 'en');
      const nycEnrichment = nyc?.variantEnrichment?.[type.key];
      const berlinEnrichment = berlin?.variantEnrichment?.[type.key];
      expect(nycEnrichment).toBeDefined();
      expect(berlinEnrichment).toBeDefined();
      const concat = (e: { venues: string[]; formats: string[]; howToStart: string[] }) =>
        [...e.venues, ...e.formats, ...e.howToStart].join(' ');
      const sim = similarity(concat(nycEnrichment!), concat(berlinEnrichment!));
      expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
    }
  });

  it('variant enrichment differs within a city across group types (TASK-319)', () => {
    for (const slug of EXPECTED_CITIES) {
      const content = getCityContent(slug, 'en');
      expect(content).toBeDefined();
      const concat = (e: { venues: string[]; formats: string[]; howToStart: string[] }) =>
        [...e.venues, ...e.formats, ...e.howToStart].join(' ');
      for (let i = 0; i < GROUP_TYPES.length; i += 1) {
        for (let j = i + 1; j < GROUP_TYPES.length; j += 1) {
          const a = content?.variantEnrichment?.[GROUP_TYPES[i].key];
          const b = content?.variantEnrichment?.[GROUP_TYPES[j].key];
          if (!a || !b) continue;
          const sim = similarity(concat(a), concat(b));
          expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
        }
      }
    }
  });

  it('NYC and Berlin city intros are not near-duplicates (G5, no reuse)', () => {
    const nyc = getCityContent('new-york', 'en');
    const berlin = getCityContent('berlin', 'en');
    // City intros are paragraph arrays (TASK-410) — join before comparing.
    const nycIntro = nyc?.intro.join(' ') ?? '';
    const berlinIntro = berlin?.intro.join(' ') ?? '';
    expect(nearDuplicate(nycIntro, berlinIntro)).toBe(false);
  });

  it('NYC and Berlin variant intros differ per group type (G5)', () => {
    for (const type of GROUP_TYPES) {
      const nyc = getCityContent('new-york', 'en');
      const berlin = getCityContent('berlin', 'en');
      const sim = similarity(
        nyc?.variantIntros[type.key] ?? '',
        berlin?.variantIntros[type.key] ?? '',
      );
      expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
    }
  });

  it('idea pages carry 30 ideas across 6 categories (§6.6)', () => {
    for (const slug of EXPECTED_CITIES) {
      const content = getCityContent(slug, 'en');
      const categories = content?.ideaPage.categories ?? [];
      expect(categories).toHaveLength(6);
      const ideaCount = categories.reduce((sum, category) => sum + category.ideas.length, 0);
      expect(ideaCount).toBe(30);
      for (const category of categories) {
        for (const idea of category.ideas) {
          expect(idea.title.length).toBeGreaterThan(0);
          expect(idea.pitch.length).toBeGreaterThan(0);
          expect(idea.audience.length).toBeGreaterThan(0);
          expect(idea.venueType.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('the German Berlin file covers the full 7-page surface with German titles', () => {
    const de = getCityContent('berlin', 'de');
    expect(de?.pageTitles?.city).toContain('Communities in Berlin');
    for (const type of GROUP_TYPES) {
      expect(de?.pageTitles?.variants?.[type.key] ?? '').toContain('Berlin');
      expect(de?.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('Berlin');
    }
    expect(de?.pageTitles?.ideas ?? '').toContain('Ideen');
  });
});
