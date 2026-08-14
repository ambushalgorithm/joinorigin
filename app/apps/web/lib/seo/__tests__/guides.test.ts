import { getGuideContent, listContent } from '../content';
import {
  GLOSSARY_HUB_PATH,
  GUIDES_HUB_PATH,
  GUIDE_SLUGS,
  guidePageEntries,
  guidePageEntry,
} from '../guides';
import { MIN_PROSE_WORDS, wordCount } from '../locationGates';

/**
 * fe-guides-pages registry + content tests (TASK-309).
 *
 * Enforces the L1 how-to guide contract (design §6.2): all 7 guides are
 * registered with unique canonical paths, every guide clears the ≥150-word
 * prose gate with FAQ ≥3 pairs + dataPoints ≥3, every guide has a
 * step-by-step structure, and the cross-link mesh (hub + sibling guides +
 * flagship city pages) is present.
 */

describe('lib/seo guides — registry', () => {
  const entries = guidePageEntries();
  const paths = entries.map((entry) => entry.path);

  it('registers exactly the 7 L1 how-to guides in display order', () => {
    expect(GUIDE_SLUGS).toHaveLength(7);
    expect(entries.map((entry) => entry.slug)).toEqual([...GUIDE_SLUGS]);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('derives canonical guide paths under /guides/<slug>', () => {
    expect(entries[0]?.path).toBe('/guides/start-a-community');
    for (const entry of entries) {
      expect(entry.path).toBe(`${GUIDES_HUB_PATH}/${entry.slug}`);
      expect(entry.params).toEqual({ slug: entry.slug });
    }
  });

  it('carries titles, descriptions, and deterministic lastModified', () => {
    for (const entry of entries) {
      expect(entry.title).toContain('JoinOrigin');
      expect(entry.description.length).toBeGreaterThan(0);
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.priority).toBeGreaterThan(0);
    }
    // Deterministic — no new Date / Math.random.
    expect(guidePageEntries()).toEqual(entries);
  });

  it('links every guide to its siblings (hub + related mesh)', () => {
    for (const entry of entries) {
      expect(entry.related).toHaveLength(GUIDE_SLUGS.length - 1);
      expect(entry.related).not.toContain(entry.slug);
    }
  });

  it('links every guide back to the flagship city pages', () => {
    for (const entry of entries) {
      const cityPaths = entry.cities.map((city) => city.path);
      expect(cityPaths).toContain('/location/united-states/new-york/new-york');
      expect(cityPaths).toContain('/location/germany/berlin/berlin');
    }
  });

  it('resolves a single guide entry and returns undefined for unknown slugs', () => {
    expect(guidePageEntry('start-a-community')?.slug).toBe('start-a-community');
    expect(guidePageEntry('not-a-guide')).toBeUndefined();
  });

  it('exposes the hub + glossary hub paths', () => {
    expect(GUIDES_HUB_PATH).toBe('/guides');
    expect(GLOSSARY_HUB_PATH).toBe('/glossary');
  });
});

describe('lib/seo guides — content quality gates (§6.2)', () => {
  it('every guide has committed EN content resolving through the registry', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      expect(content).toBeDefined();
      expect(content?.kind).toBe('guide');
      expect(content?.locale).toBe('en');
      expect(content?.slug).toBe(slug);
    }
  });

  it('every guide intro clears the ≥150-word prose gate (G2)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      expect(wordCount(content?.intro ?? '')).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      expect(content?.dataPoints.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(content?.faq.length ?? 0).toBeGreaterThanOrEqual(3);
    }
  });

  it('every guide has a step-by-step structure with ≥4 steps', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      expect(content?.steps.length ?? 0).toBeGreaterThanOrEqual(4);
      for (const step of content?.steps ?? []) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
      }
    }
  });

  it('the registry lists guide content alongside location content', () => {
    const enContent = listContent('en');
    const guideCount = enContent.filter((content) => content.kind === 'guide').length;
    expect(guideCount).toBe(7);
  });
});
