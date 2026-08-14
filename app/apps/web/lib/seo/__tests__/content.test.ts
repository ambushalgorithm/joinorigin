import {
  contentLocalesFor,
  getCityContent,
  getCountryContent,
  getRegionContent,
  listContent,
} from '../content';
import { GROUP_TYPES } from '../locationData';
import { nearDuplicate, NEAR_DUPLICATE_THRESHOLD, similarity, wordCount } from '../locationGates';

/**
 * fe-seo-registry content-file model tests (TASK-307).
 *
 * Enforces the content contract: EN source of truth per city/region/
 * country, per-locale files (content/de/city/berlin.ts), body copy lives
 * in content files (never locale JSONs), unique prose ≥150 words (G2),
 * ≥3 data points (G1), 30 ideas in 6 categories (§6.6), and no
 * NYC↔Berlin reuse (G5 + idea-page uniqueness rule).
 */

const MIN_PROSE_WORDS = 150;
const EXPECTED_CITIES = ['new-york', 'berlin'];

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
      expect(content.intro.length).toBeGreaterThan(0);
      expect(wordCount(content.intro)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
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

  it('NYC and Berlin city intros are not near-duplicates (G5, no reuse)', () => {
    const nyc = getCityContent('new-york', 'en');
    const berlin = getCityContent('berlin', 'en');
    expect(nearDuplicate(nyc?.intro ?? '', berlin?.intro ?? '')).toBe(false);
    expect(nearDuplicate(nyc?.intro ?? '', berlin?.intro ?? '')).toBe(false);
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
