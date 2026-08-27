import createAGroupGuideRu from '../content/ru/guide/create-a-group';
import createAProjectGuideRu from '../content/ru/guide/create-a-project';
import findACoFounderGuideRu from '../content/ru/guide/find-a-co-founder';
import first10MembersGuideRu from '../content/ru/guide/first-10-members';
import hybridCommunitiesGuideRu from '../content/ru/guide/hybrid-origins';
import keepCommunityActiveGuideRu from '../content/ru/guide/keep-an-origin-active';
import moderationGuideRu from '../content/ru/guide/moderation';
import organizeMeetupGuideRu from '../content/ru/guide/organize-a-meetup';
import publishAnIdeaGuideRu from '../content/ru/guide/publish-an-idea';
import publishASmallBusinessIdeaGuideRu from '../content/ru/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideRu from '../content/ru/guide/publish-a-startup-concept';
import startCommunityGuideRu from '../content/ru/guide/start-an-origin';
import moscowCityRu from '../content/ru/city/moscow';
import { GROUP_TYPES } from '../locationData';
import { wordCount } from '../locationGates';
import type { CityContent, GuideContent, LocationContent } from '../content/types';

/**
 * Sprint 18 ru translation content tests (TASK-431).
 *
 * Validates the committed Russian per-locale content files directly (they are
 * registered by the content-registry role, TASK-442): every ru guide and
 * the ru city file declares its kind/locale/slug, guides clear the ≥150-word
 * intro gate with ≥3 data points + ≥3 FAQ pairs + a step-by-step structure,
 * and the city carries the full 7-page surface (intro ≥150 words, 5 variants,
 * enrichment, 30 ideas across 6 categories, FAQ, pageTitles).
 */

const MIN_PROSE_WORDS = 150;

const RU_GUIDES: GuideContent[] = [
  createAGroupGuideRu,
  createAProjectGuideRu,
  findACoFounderGuideRu,
  first10MembersGuideRu,
  hybridCommunitiesGuideRu,
  keepCommunityActiveGuideRu,
  moderationGuideRu,
  organizeMeetupGuideRu,
  publishAnIdeaGuideRu,
  publishASmallBusinessIdeaGuideRu,
  publishAStartupConceptGuideRu,
  startCommunityGuideRu,
];

const RU_CITIES: CityContent[] = [moscowCityRu];

const RU_CONTENT: LocationContent[] = [...RU_GUIDES, ...RU_CITIES];

describe('lib/seo content — ru translation surface (TASK-431)', () => {
  it('registers exactly 12 ru guides and 1 ru city with correct locale metadata', () => {
    expect(RU_GUIDES).toHaveLength(12);
    expect(RU_CITIES).toHaveLength(1);
    const citySlugs = RU_CITIES.map((city) => city.slug).sort();
    expect(citySlugs).toEqual(['moscow']);
    for (const content of RU_CONTENT) {
      expect(content.locale).toBe('ru');
      expect(content.slug.length).toBeGreaterThan(0);
      expect(content.kind).toBe(content.kind === 'guide' ? 'guide' : 'city');
    }
  });

  it('every ru content file clears the ≥150-word intro prose gate (G2)', () => {
    for (const content of RU_CONTENT) {
      const introWords = Array.isArray(content.intro)
        ? content.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0)
        : wordCount(content.intro);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every ru guide has a step-by-step structure with per-step JoinOrigin notes', () => {
    for (const guide of RU_GUIDES) {
      expect(guide.kind).toBe('guide');
      expect(guide.sections.length).toBeGreaterThanOrEqual(4);
      expect(guide.steps.length).toBeGreaterThanOrEqual(4);
      expect(guide.steps).toHaveLength(guide.sections.length);
      for (const step of guide.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote).toContain('JoinOrigin');
      }
    }
  });

  it('every ru guide intro mentions JoinOrigin within its first half (TASK-320)', () => {
    for (const guide of RU_GUIDES) {
      const intro = guide.intro.join(' ');
      const mentionIndex = intro.indexOf('JoinOrigin');
      expect(mentionIndex).toBeGreaterThanOrEqual(0);
      expect(mentionIndex).toBeLessThan(intro.length / 2);
    }
  });

  it('the ru city carries the full 7-page surface (5 variants + enrichment + 30 ideas)', () => {
    for (const city of RU_CITIES) {
      expect(city.kind).toBe('city');
      for (const type of GROUP_TYPES) {
        const prose = city.variantIntros[type.key] ?? '';
        expect(prose.length).toBeGreaterThan(0);
        expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
        const enrichment = city.variantEnrichment?.[type.key];
        expect(enrichment).toBeDefined();
        if (enrichment) {
          expect(enrichment.venues.length).toBeGreaterThanOrEqual(4);
          expect(enrichment.venues.length).toBeLessThanOrEqual(6);
          expect(enrichment.formats.length).toBeGreaterThanOrEqual(4);
          expect(enrichment.formats.length).toBeLessThanOrEqual(5);
          expect(enrichment.howToStart).toHaveLength(3);
        }
      }
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

  it('the ru city carries Russian pageTitles for the full surface', () => {
    for (const city of RU_CITIES) {
      expect(city.pageTitles?.city ?? '').toContain('JoinOrigin');
      for (const type of GROUP_TYPES) {
        expect(city.pageTitles?.variants?.[type.key] ?? '').toContain('JoinOrigin');
        expect(city.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('JoinOrigin');
      }
      expect(city.pageTitles?.ideas ?? '').toContain('JoinOrigin');
    }
  });
});
