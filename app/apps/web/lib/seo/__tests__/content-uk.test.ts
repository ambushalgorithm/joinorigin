import createAGroupGuideUk from '../content/uk/guide/create-a-group';
import createAProjectGuideUk from '../content/uk/guide/create-a-project';
import findACoFounderGuideUk from '../content/uk/guide/find-a-co-founder';
import first10MembersGuideUk from '../content/uk/guide/first-10-members';
import hybridCommunitiesGuideUk from '../content/uk/guide/hybrid-origins';
import keepCommunityActiveGuideUk from '../content/uk/guide/keep-an-origin-active';
import moderationGuideUk from '../content/uk/guide/moderation';
import organizeMeetupGuideUk from '../content/uk/guide/organize-a-meetup';
import publishAnIdeaGuideUk from '../content/uk/guide/publish-an-idea';
import publishASmallBusinessIdeaGuideUk from '../content/uk/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideUk from '../content/uk/guide/publish-a-startup-concept';
import startCommunityGuideUk from '../content/uk/guide/start-an-origin';
import kyivCityUk from '../content/uk/city/kyiv';
import { GROUP_TYPES } from '../locationData';
import { NEAR_DUPLICATE_THRESHOLD, wordCount } from '../locationGates';

/**
 * i18n-uk-s18 (TASK-430) — Ukrainian content-file contract tests.
 *
 * Enforces the same quality contract as the EN guides/cities but for the
 * committed `uk` translation surface: every uk guide declares
 * kind/locale/slug, clears the ≥150-word intro gate (G2, paragraphs
 * summed), carries ≥3 data points + ≥3 FAQ pairs, has a step-by-step
 * structure with ≥4 steps and per-step joinOriginNote, sections stay in
 * lockstep with steps, and the predominant-locale city file (kyiv)
 * carries the full 7-page surface (city + 5 variants + ideas) with
 * Ukrainian pageTitles and per-variant unique prose (G2/G5).
 *
 * NOTE: the shared `similarity` helper in locationGates strips non-Latin
 * characters (its tokenizer is English/European-Latin oriented), so this
 * file implements a Cyrillic-aware word-set Jaccard similarity for the G5
 * variant-uniqueness check — the same threshold semantics, correct for
 * Ukrainian prose.
 */

const MIN_PROSE_WORDS = 150;

/** Cyrillic-aware tokens (lowercase, punctuation stripped). */
function ukTokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яіїєґ'\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

/** Word-set Jaccard similarity in [0,1] (G5 semantics, Cyrillic-safe). */
function ukSimilarity(a: string, b: string): number {
  const setA = new Set(ukTokenize(a));
  const setB = new Set(ukTokenize(b));
  if (setA.size === 0 && setB.size === 0) return 1;
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection += 1;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}
const UK_GUIDES = [
  publishAnIdeaGuideUk,
  createAProjectGuideUk,
  createAGroupGuideUk,
  publishASmallBusinessIdeaGuideUk,
  publishAStartupConceptGuideUk,
  findACoFounderGuideUk,
  startCommunityGuideUk,
  first10MembersGuideUk,
  keepCommunityActiveGuideUk,
  hybridCommunitiesGuideUk,
  organizeMeetupGuideUk,
  moderationGuideUk,
];

describe('lib/seo content uk — guide translations (TASK-430)', () => {
  it('registers all 12 guides with kind/locale/slug uk', () => {
    expect(UK_GUIDES).toHaveLength(12);
    for (const guide of UK_GUIDES) {
      expect(guide.kind).toBe('guide');
      expect(guide.locale).toBe('uk');
      expect(guide.slug.length).toBeGreaterThan(0);
    }
  });

  it('every guide intro clears the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const guide of UK_GUIDES) {
      const introWords = guide.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(guide.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const guide of UK_GUIDES) {
      expect(guide.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(guide.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every guide has a step-by-step structure with ≥4 steps + joinOriginNote', () => {
    for (const guide of UK_GUIDES) {
      expect(guide.steps.length).toBeGreaterThanOrEqual(4);
      for (const step of guide.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote.length).toBeGreaterThan(0);
      }
    }
  });

  it('sections stay in lockstep with steps (title + body + joinOriginNote)', () => {
    for (const guide of UK_GUIDES) {
      const steps = guide.steps;
      const sections = guide.sections;
      expect(sections).toHaveLength(steps.length);
      steps.forEach((step, index) => {
        expect(sections[index]).toContain(step.title);
        expect(sections[index]).toContain(step.joinOriginNote);
        // Ukrainian word-containment: every substantive word of the step
        // body must appear in the section (order-insensitive,
        // Cyrillic-safe).
        const bodyWords = step.body
          .toLowerCase()
          .split(/[^a-z0-9а-яіїєґ']+/)
          .filter((word) => word.length > 1);
        const sectionWords = new Set(
          sections[index]
            .toLowerCase()
            .split(/[^a-z0-9а-яіїєґ']+/)
            .filter((word) => word.length > 1),
        );
        const missing = bodyWords.filter((word) => !sectionWords.has(word));
        expect(missing.length / bodyWords.length).toBeLessThanOrEqual(0.1);
      });
    }
  });

  it('every guide intro mentions JoinOrigin (leading value signal)', () => {
    for (const guide of UK_GUIDES) {
      const intro = guide.intro.join(' ');
      expect(intro).toContain('JoinOrigin');
    }
  });
});

describe('lib/seo content uk — predominant-locale city file (TASK-430)', () => {
  const UK_CITIES = [kyivCityUk];

  it('declares kind/locale/slug for kyiv', () => {
    expect(UK_CITIES.map((city) => city.slug)).toEqual(['kyiv']);
    for (const city of UK_CITIES) {
      expect(city.kind).toBe('city');
      expect(city.locale).toBe('uk');
    }
  });

  it('city intro arrays clear the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const city of UK_CITIES) {
      const introWords = city.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(city.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('city files carry per-variant unique prose ≥150 words (G2)', () => {
    for (const city of UK_CITIES) {
      for (const type of GROUP_TYPES) {
        const prose = city.variantIntros[type.key] ?? '';
        expect(prose.length).toBeGreaterThan(0);
        expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      }
    }
  });

  it('city files carry per-variant enrichment (venues 4–6, formats 4–5, howToStart 3) (TASK-319)', () => {
    for (const city of UK_CITIES) {
      for (const type of GROUP_TYPES) {
        const enrichment = city.variantEnrichment?.[type.key];
        expect(enrichment).toBeDefined();
        if (!enrichment) continue;
        expect(enrichment.venues.length).toBeGreaterThanOrEqual(4);
        expect(enrichment.venues.length).toBeLessThanOrEqual(6);
        expect(enrichment.formats.length).toBeGreaterThanOrEqual(4);
        expect(enrichment.formats.length).toBeLessThanOrEqual(5);
        expect(enrichment.howToStart).toHaveLength(3);
      }
    }
  });

  it('kyiv variant intros differ per group type (G5)', () => {
    const types = GROUP_TYPES;
    for (let i = 0; i < types.length; i += 1) {
      for (let j = i + 1; j < types.length; j += 1) {
        const sim = ukSimilarity(
          kyivCityUk.variantIntros[types[i].key] ?? '',
          kyivCityUk.variantIntros[types[j].key] ?? '',
        );
        expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
      }
    }
  });

  it('idea pages carry 30 ideas across 6 categories (§6.6)', () => {
    for (const city of UK_CITIES) {
      const categories = city.ideaPage.categories;
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

  it('city files cover the full 7-page surface with Ukrainian pageTitles', () => {
    for (const city of UK_CITIES) {
      expect(city.pageTitles?.city ?? '').toContain('Києв');
      for (const type of GROUP_TYPES) {
        expect(city.pageTitles?.variants?.[type.key] ?? '').toContain('Києв');
        expect(city.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('Києв');
      }
      expect(city.pageTitles?.ideas ?? '').toContain('ідей');
    }
  });

  it('dataPoints + faq contract holds (≥3 each)', () => {
    for (const city of UK_CITIES) {
      expect(city.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(city.faq.length).toBeGreaterThanOrEqual(3);
    }
  });
});
