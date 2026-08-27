import createAGroupGuideHi from '../content/hi/guide/create-a-group';
import createAProjectGuideHi from '../content/hi/guide/create-a-project';
import findACoFounderGuideHi from '../content/hi/guide/find-a-co-founder';
import first10MembersGuideHi from '../content/hi/guide/first-10-members';
import hybridCommunitiesGuideHi from '../content/hi/guide/hybrid-origins';
import keepCommunityActiveGuideHi from '../content/hi/guide/keep-an-origin-active';
import moderationGuideHi from '../content/hi/guide/moderation';
import organizeMeetupGuideHi from '../content/hi/guide/organize-a-meetup';
import publishAnIdeaGuideHi from '../content/hi/guide/publish-an-idea';
import publishASmallBusinessIdeaGuideHi from '../content/hi/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideHi from '../content/hi/guide/publish-a-startup-concept';
import startCommunityGuideHi from '../content/hi/guide/start-an-origin';
import bengaluruCityHi from '../content/hi/city/bengaluru';
import chennaiCityHi from '../content/hi/city/chennai';
import delhiCityHi from '../content/hi/city/delhi';
import hyderabadCityHi from '../content/hi/city/hyderabad';
import mumbaiCityHi from '../content/hi/city/mumbai';
import puneCityHi from '../content/hi/city/pune';
import { GROUP_TYPES } from '../locationData';
import { wordCount } from '../locationGates';
import type { CityContent, GuideContent, LocationContent } from '../content/types';

/**
 * Sprint 18 hi translation content tests (TASK-434).
 *
 * Validates the committed Hindi per-locale content files directly (they are
 * registered by the content-registry role, TASK-442): every hi guide and
 * hi city file declares its kind/locale/slug, guides clear the ≥150-word
 * intro gate with ≥3 data points + ≥3 FAQ pairs + a step-by-step structure,
 * and cities carry the full 7-page surface (intro ≥150 words, 5 variants,
 * enrichment, 30 ideas across 6 categories, FAQ, pageTitles).
 */

const MIN_PROSE_WORDS = 150;

const HI_GUIDES: GuideContent[] = [
  createAGroupGuideHi,
  createAProjectGuideHi,
  findACoFounderGuideHi,
  first10MembersGuideHi,
  hybridCommunitiesGuideHi,
  keepCommunityActiveGuideHi,
  moderationGuideHi,
  organizeMeetupGuideHi,
  publishAnIdeaGuideHi,
  publishASmallBusinessIdeaGuideHi,
  publishAStartupConceptGuideHi,
  startCommunityGuideHi,
];

const HI_CITIES: CityContent[] = [
  bengaluruCityHi,
  chennaiCityHi,
  delhiCityHi,
  hyderabadCityHi,
  mumbaiCityHi,
  puneCityHi,
];

const HI_CONTENT: LocationContent[] = [...HI_GUIDES, ...HI_CITIES];

describe('lib/seo content — hi translation surface (TASK-434)', () => {
  it('registers exactly 12 hi guides and 6 hi cities with correct locale metadata', () => {
    expect(HI_GUIDES).toHaveLength(12);
    expect(HI_CITIES).toHaveLength(6);
    const citySlugs = HI_CITIES.map((city) => city.slug).sort();
    expect(citySlugs).toEqual(['bengaluru', 'chennai', 'delhi', 'hyderabad', 'mumbai', 'pune']);
    for (const content of HI_CONTENT) {
      expect(content.locale).toBe('hi');
      expect(content.slug.length).toBeGreaterThan(0);
      expect(content.kind).toBe(content.kind === 'guide' ? 'guide' : 'city');
    }
  });

  it('every hi content file clears the ≥150-word intro prose gate (G2)', () => {
    for (const content of HI_CONTENT) {
      const introWords = Array.isArray(content.intro)
        ? content.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0)
        : wordCount(content.intro);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every hi guide has a step-by-step structure with per-step JoinOrigin notes', () => {
    for (const guide of HI_GUIDES) {
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

  it('every hi guide intro mentions JoinOrigin within its first half (TASK-320)', () => {
    for (const guide of HI_GUIDES) {
      const intro = guide.intro.join(' ');
      const mentionIndex = intro.indexOf('JoinOrigin');
      expect(mentionIndex).toBeGreaterThanOrEqual(0);
      expect(mentionIndex).toBeLessThan(intro.length / 2);
    }
  });

  it('every hi city carries the full 7-page surface (5 variants + enrichment + 30 ideas)', () => {
    for (const city of HI_CITIES) {
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

  it('every hi city carries Hindi pageTitles for the full surface', () => {
    for (const city of HI_CITIES) {
      expect(city.pageTitles?.city ?? '').toContain('JoinOrigin');
      for (const type of GROUP_TYPES) {
        expect(city.pageTitles?.variants?.[type.key] ?? '').toContain('JoinOrigin');
        expect(city.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('JoinOrigin');
      }
      expect(city.pageTitles?.ideas ?? '').toContain('JoinOrigin');
    }
  });
});
