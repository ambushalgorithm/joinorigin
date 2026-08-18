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
 * fe-guides-pages registry + content tests (TASK-309) extended for
 * TASK-320: every guide LEADS with how JoinOrigin solves the
 * connecting-people problem — the intro mentions JoinOrigin and every step
 * carries a per-step `joinOriginNote` (honest early-access framing).
 *
 * Enforces the L1 how-to guide contract (design §6.2): all 12 guides are
 * registered with unique canonical paths, every guide clears the ≥150-word
 * prose gate with FAQ ≥3 pairs + dataPoints ≥3, every guide has a
 * step-by-step structure, and the cross-link mesh (hub + sibling guides +
 * flagship city pages) is present.
 */

describe('lib/seo guides — registry', () => {
  const entries = guidePageEntries();
  const paths = entries.map((entry) => entry.path);

  it('registers exactly the 12 L1 how-to guides in display order', () => {
    expect(GUIDE_SLUGS).toHaveLength(12);
    expect(entries.map((entry) => entry.slug)).toEqual([...GUIDE_SLUGS]);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('derives canonical guide paths under /guides/<slug>', () => {
    expect(entries[0]?.path).toBe('/guides/publish-an-idea');
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

  it('every guide intro clears the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const introParagraphs = content?.intro ?? [];
      expect(introParagraphs.length).toBeGreaterThan(0);
      const introWords = introParagraphs.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every guide welcomes EXISTING projects/companies as well as new ones (TASK-415 reframe)', () => {
    // The platform serves existing projects and companies, not only
    // brand-new ones. Honest framing only — no literal phrase required.
    // Each intro must carry at least one existing-entity signal AND at
    // least one new-entity signal, so the guides read as serving both.
    const existingSignals =
      /existing|already|established|operating|running|growing|reviv|re-energ|years|underway|new home|long after|meeting informally|has been meeting|started months/i;
    const newSignals =
      /new|start|launch|spark|first|begin|brand|fresh|from zero|zero to|just getting/i;
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const intro = (content?.intro ?? []).join(' ');
      expect(intro).toMatch(existingSignals);
      expect(intro).toMatch(newSignals);
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

  it('every guide leads with JoinOrigin — intro mentions JoinOrigin (TASK-320)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const introParagraphs = content?.intro ?? [];
      const intro = introParagraphs.join(' ');
      expect(intro).toContain('JoinOrigin');
      // The intro leads: the JoinOrigin mention appears inside the first
      // half of the intro, not just as a trailing caveat.
      const mentionIndex = intro.indexOf('JoinOrigin');
      expect(mentionIndex).toBeGreaterThanOrEqual(0);
      expect(mentionIndex).toBeLessThan(intro.length / 2);
    }
  });

  it('every step maps to JoinOrigin via a per-step joinOriginNote (TASK-320)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const steps = content?.steps ?? [];
      expect(steps.length).toBeGreaterThanOrEqual(4);
      for (const step of steps) {
        expect(step.joinOriginNote.length).toBeGreaterThan(0);
        expect(step.joinOriginNote).toContain('JoinOrigin');
      }
    }
  });

  it('sections stay in lockstep with steps (title + body + joinOriginNote)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const steps = content?.steps ?? [];
      const sections = content?.sections ?? [];
      expect(sections).toHaveLength(steps.length);
      steps.forEach((step, index) => {
        expect(sections[index]).toContain(step.title);
        expect(sections[index]).toContain(step.joinOriginNote);
        // The section is a long-form expansion of the step: every substantive
        // word of the step body must appear in the section (word-containment,
        // order-insensitive). This keeps sections↔steps lockstep while
        // tolerating the user's verbatim wording edits in commit 92cd1f4.
        const bodyWords = step.body
          .toLowerCase()
          .split(/[^a-z0-9']+/)
          .filter((word) => word.length > 1);
        const sectionWords = new Set(
          sections[index]
            .toLowerCase()
            .split(/[^a-z0-9']+/)
            .filter((word) => word.length > 1),
        );
        const missing = bodyWords.filter((word) => !sectionWords.has(word));
        expect(missing.length / bodyWords.length).toBeLessThanOrEqual(0.1);
      });
    }
  });

  it('the registry lists guide content alongside location content', () => {
    const enContent = listContent('en');
    const guideCount = enContent.filter((content) => content.kind === 'guide').length;
    expect(guideCount).toBe(12);
  });
});
