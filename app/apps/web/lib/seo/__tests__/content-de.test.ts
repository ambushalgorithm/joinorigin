import createAGroupGuideDe from '../content/de/guide/create-a-group';
import createAProjectGuideDe from '../content/de/guide/create-a-project';
import findACoFounderGuideDe from '../content/de/guide/find-a-co-founder';
import first10MembersGuideDe from '../content/de/guide/first-10-members';
import hybridCommunitiesGuideDe from '../content/de/guide/hybrid-communities';
import keepCommunityActiveGuideDe from '../content/de/guide/keep-a-community-active';
import moderationGuideDe from '../content/de/guide/moderation';
import organizeMeetupGuideDe from '../content/de/guide/organize-a-meetup';
import publishAnIdeaGuideDe from '../content/de/guide/publish-an-idea';
import publishASmallBusinessIdeaGuideDe from '../content/de/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideDe from '../content/de/guide/publish-a-startup-concept';
import startCommunityGuideDe from '../content/de/guide/start-a-community';
import berlinCityDe from '../content/de/city/berlin';
import munichCityDe from '../content/de/city/munich';
import { GROUP_TYPES } from '../locationData';
import { NEAR_DUPLICATE_THRESHOLD, similarity, wordCount } from '../locationGates';

/**
 * i18n-de-s18 (TASK-422) — German content-file contract tests.
 *
 * Enforces the same quality contract as the EN guides/cities but for the
 * committed `de` translation surface: every de guide declares
 * kind/locale/slug, clears the ≥150-word intro gate (G2, paragraphs
 * summed), carries ≥3 data points + ≥3 FAQ pairs, has a step-by-step
 * structure with ≥4 steps and per-step joinOriginNote, sections stay in
 * lockstep with steps, and the predominant-locale city files (berlin,
 * munich) carry the full 7-page surface (city + 5 variants + ideas) with
 * German pageTitles and per-variant unique prose (G2/G5).
 */

const MIN_PROSE_WORDS = 150;
const DE_GUIDES = [
  publishAnIdeaGuideDe,
  createAProjectGuideDe,
  createAGroupGuideDe,
  publishASmallBusinessIdeaGuideDe,
  publishAStartupConceptGuideDe,
  findACoFounderGuideDe,
  startCommunityGuideDe,
  first10MembersGuideDe,
  keepCommunityActiveGuideDe,
  hybridCommunitiesGuideDe,
  organizeMeetupGuideDe,
  moderationGuideDe,
];

describe('lib/seo content de — guide translations (TASK-422)', () => {
  it('registers all 12 guides with kind/locale/slug de', () => {
    expect(DE_GUIDES).toHaveLength(12);
    for (const guide of DE_GUIDES) {
      expect(guide.kind).toBe('guide');
      expect(guide.locale).toBe('de');
      expect(guide.slug.length).toBeGreaterThan(0);
    }
  });

  it('every guide intro clears the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const guide of DE_GUIDES) {
      const introWords = guide.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(guide.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const guide of DE_GUIDES) {
      expect(guide.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(guide.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every guide has a step-by-step structure with ≥4 steps + joinOriginNote', () => {
    for (const guide of DE_GUIDES) {
      expect(guide.steps.length).toBeGreaterThanOrEqual(4);
      for (const step of guide.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote.length).toBeGreaterThan(0);
      }
    }
  });

  it('sections stay in lockstep with steps (title + body + joinOriginNote)', () => {
    for (const guide of DE_GUIDES) {
      const steps = guide.steps;
      const sections = guide.sections;
      expect(sections).toHaveLength(steps.length);
      steps.forEach((step, index) => {
        expect(sections[index]).toContain(step.title);
        expect(sections[index]).toContain(step.joinOriginNote);
        // German word-containment: every substantive word of the step body
        // must appear in the section (order-insensitive, umlaut-safe).
        const bodyWords = step.body
          .toLowerCase()
          .split(/[^a-z0-9äöüß]+/)
          .filter((word) => word.length > 1);
        const sectionWords = new Set(
          sections[index]
            .toLowerCase()
            .split(/[^a-z0-9äöüß]+/)
            .filter((word) => word.length > 1),
        );
        const missing = bodyWords.filter((word) => !sectionWords.has(word));
        expect(missing.length / bodyWords.length).toBeLessThanOrEqual(0.1);
      });
    }
  });

  it('every guide intro mentions JoinOrigin (leading value signal)', () => {
    for (const guide of DE_GUIDES) {
      const intro = guide.intro.join(' ');
      expect(intro).toContain('JoinOrigin');
    }
  });
});

describe('lib/seo content de — predominant-locale city files (TASK-422)', () => {
  const DE_CITIES = [berlinCityDe, munichCityDe];

  it('declares kind/locale/slug for berlin + munich', () => {
    expect(DE_CITIES.map((city) => city.slug)).toEqual(['berlin', 'munich']);
    for (const city of DE_CITIES) {
      expect(city.kind).toBe('city');
      expect(city.locale).toBe('de');
    }
  });

  it('city intro arrays clear the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const city of DE_CITIES) {
      const introWords = city.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(city.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('city files carry per-variant unique prose ≥150 words (G2)', () => {
    for (const city of DE_CITIES) {
      for (const type of GROUP_TYPES) {
        const prose = city.variantIntros[type.key] ?? '';
        expect(prose.length).toBeGreaterThan(0);
        expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      }
    }
  });

  it('city files carry per-variant enrichment (venues 4–6, formats 4–5, howToStart 3) (TASK-319)', () => {
    for (const city of DE_CITIES) {
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

  it('berlin and munich variant intros differ per group type (G5)', () => {
    for (const type of GROUP_TYPES) {
      const sim = similarity(
        berlinCityDe.variantIntros[type.key] ?? '',
        munichCityDe.variantIntros[type.key] ?? '',
      );
      expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
    }
  });

  it('idea pages carry 30 ideas across 6 categories (§6.6)', () => {
    for (const city of DE_CITIES) {
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

  it('city files cover the full 7-page surface with German pageTitles', () => {
    for (const city of DE_CITIES) {
      expect(city.pageTitles?.city).toContain(city.slug === 'berlin' ? 'Berlin' : 'München');
      for (const type of GROUP_TYPES) {
        expect(city.pageTitles?.variants?.[type.key] ?? '').toContain(
          city.slug === 'berlin' ? 'Berlin' : 'München',
        );
        expect(city.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain(
          city.slug === 'berlin' ? 'Berlin' : 'München',
        );
      }
      expect(city.pageTitles?.ideas ?? '').toContain('Ideen');
    }
  });

  it('dataPoints + faq contract holds (≥3 each)', () => {
    for (const city of DE_CITIES) {
      expect(city.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(city.faq.length).toBeGreaterThanOrEqual(3);
    }
  });
});
