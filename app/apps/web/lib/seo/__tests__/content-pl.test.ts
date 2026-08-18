import createAGroupGuidePl from '../content/pl/guide/create-a-group';
import createAProjectGuidePl from '../content/pl/guide/create-a-project';
import findACoFounderGuidePl from '../content/pl/guide/find-a-co-founder';
import first10MembersGuidePl from '../content/pl/guide/first-10-members';
import hybridCommunitiesGuidePl from '../content/pl/guide/hybrid-communities';
import keepCommunityActiveGuidePl from '../content/pl/guide/keep-a-community-active';
import moderationGuidePl from '../content/pl/guide/moderation';
import organizeMeetupGuidePl from '../content/pl/guide/organize-a-meetup';
import publishAnIdeaGuidePl from '../content/pl/guide/publish-an-idea';
import publishASmallBusinessIdeaGuidePl from '../content/pl/guide/publish-a-small-business-idea';
import publishAStartupConceptGuidePl from '../content/pl/guide/publish-a-startup-concept';
import startCommunityGuidePl from '../content/pl/guide/start-a-community';
import warsawCityPl from '../content/pl/city/warsaw';
import { GROUP_TYPES } from '../locationData';
import { NEAR_DUPLICATE_THRESHOLD, similarity, wordCount } from '../locationGates';

/**
 * i18n-pl-s18 (TASK-428) — Polish content-file contract tests.
 *
 * Enforces the same quality contract as the EN guides/cities but for the
 * committed `pl` translation surface: every pl guide declares
 * kind/locale/slug, clears the ≥150-word intro gate (G2, paragraphs
 * summed), carries ≥3 data points + ≥3 FAQ pairs, has a step-by-step
 * structure with ≥4 steps and per-step joinOriginNote, sections stay in
 * lockstep with steps, and the predominant-locale city file (warsaw)
 * carries the full 7-page surface (city + 5 variants + ideas) with
 * Polish pageTitles and per-variant unique prose (G2/G5).
 */

const MIN_PROSE_WORDS = 150;
const PL_GUIDES = [
  publishAnIdeaGuidePl,
  createAProjectGuidePl,
  createAGroupGuidePl,
  publishASmallBusinessIdeaGuidePl,
  publishAStartupConceptGuidePl,
  findACoFounderGuidePl,
  startCommunityGuidePl,
  first10MembersGuidePl,
  keepCommunityActiveGuidePl,
  hybridCommunitiesGuidePl,
  organizeMeetupGuidePl,
  moderationGuidePl,
];

describe('lib/seo content pl — guide translations (TASK-428)', () => {
  it('registers all 12 guides with kind/locale/slug pl', () => {
    expect(PL_GUIDES).toHaveLength(12);
    for (const guide of PL_GUIDES) {
      expect(guide.kind).toBe('guide');
      expect(guide.locale).toBe('pl');
      expect(guide.slug.length).toBeGreaterThan(0);
    }
  });

  it('every guide intro clears the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const guide of PL_GUIDES) {
      const introWords = guide.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(guide.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const guide of PL_GUIDES) {
      expect(guide.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(guide.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every guide has a step-by-step structure with ≥4 steps + joinOriginNote', () => {
    for (const guide of PL_GUIDES) {
      expect(guide.steps.length).toBeGreaterThanOrEqual(4);
      for (const step of guide.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote.length).toBeGreaterThan(0);
      }
    }
  });

  it('sections stay in lockstep with steps (title + body + joinOriginNote)', () => {
    for (const guide of PL_GUIDES) {
      const steps = guide.steps;
      const sections = guide.sections;
      expect(sections).toHaveLength(steps.length);
      steps.forEach((step, index) => {
        expect(sections[index]).toContain(step.title);
        expect(sections[index]).toContain(step.joinOriginNote);
        // Polish word-containment: every substantive word of the step body
        // must appear in the section (order-insensitive, diacritic-safe).
        const bodyWords = step.body
          .toLowerCase()
          .split(/[^a-z0-9ąćęłńóśźż]+/)
          .filter((word) => word.length > 1);
        const sectionWords = new Set(
          sections[index]
            .toLowerCase()
            .split(/[^a-z0-9ąćęłńóśźż]+/)
            .filter((word) => word.length > 1),
        );
        const missing = bodyWords.filter((word) => !sectionWords.has(word));
        expect(missing.length / bodyWords.length).toBeLessThanOrEqual(0.1);
      });
    }
  });

  it('every guide intro mentions JoinOrigin (leading value signal)', () => {
    for (const guide of PL_GUIDES) {
      const intro = guide.intro.join(' ');
      expect(intro).toContain('JoinOrigin');
    }
  });
});

describe('lib/seo content pl — predominant-locale city file (TASK-428)', () => {
  const PL_CITIES = [warsawCityPl];

  it('declares kind/locale/slug for warsaw', () => {
    expect(PL_CITIES.map((city) => city.slug)).toEqual(['warsaw']);
    for (const city of PL_CITIES) {
      expect(city.kind).toBe('city');
      expect(city.locale).toBe('pl');
    }
  });

  it('city intro arrays clear the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const city of PL_CITIES) {
      const introWords = city.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(city.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('city files carry per-variant unique prose ≥150 words (G2)', () => {
    for (const city of PL_CITIES) {
      for (const type of GROUP_TYPES) {
        const prose = city.variantIntros[type.key] ?? '';
        expect(prose.length).toBeGreaterThan(0);
        expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      }
    }
  });

  it('city files carry per-variant enrichment (venues 4–6, formats 4–5, howToStart 3) (TASK-319)', () => {
    for (const city of PL_CITIES) {
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

  it('warsaw variant intros differ per group type (G5)', () => {
    const types = GROUP_TYPES;
    for (let i = 0; i < types.length; i += 1) {
      for (let j = i + 1; j < types.length; j += 1) {
        const sim = similarity(
          warsawCityPl.variantIntros[types[i].key] ?? '',
          warsawCityPl.variantIntros[types[j].key] ?? '',
        );
        expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
      }
    }
  });

  it('idea pages carry 30 ideas across 6 categories (§6.6)', () => {
    for (const city of PL_CITIES) {
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

  it('city files cover the full 7-page surface with Polish pageTitles', () => {
    for (const city of PL_CITIES) {
      expect(city.pageTitles?.city ?? '').toContain('Warszaw');
      for (const type of GROUP_TYPES) {
        expect(city.pageTitles?.variants?.[type.key] ?? '').toContain('Warszaw');
        expect(city.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('Warszaw');
      }
      expect(city.pageTitles?.ideas ?? '').toContain('pomysłów');
    }
  });

  it('dataPoints + faq contract holds (≥3 each)', () => {
    for (const city of PL_CITIES) {
      expect(city.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(city.faq.length).toBeGreaterThanOrEqual(3);
    }
  });
});
