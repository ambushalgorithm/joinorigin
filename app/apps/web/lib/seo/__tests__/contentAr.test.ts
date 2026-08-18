import { GROUP_TYPES } from '../locationData';
import { wordCount } from '../locationGates';
import type { CityContent, GuideContent } from '../content/types';

import dubaiAr from '../content/ar/city/dubai';
import cairoAr from '../content/ar/city/cairo';
import casablancaAr from '../content/ar/city/casablanca';

import createAGroupGuideAr from '../content/ar/guide/create-a-group';
import createAProjectGuideAr from '../content/ar/guide/create-a-project';
import findACoFounderGuideAr from '../content/ar/guide/find-a-co-founder';
import first10MembersGuideAr from '../content/ar/guide/first-10-members';
import hybridCommunitiesGuideAr from '../content/ar/guide/hybrid-communities';
import keepCommunityActiveGuideAr from '../content/ar/guide/keep-a-community-active';
import moderationGuideAr from '../content/ar/guide/moderation';
import organizeMeetupGuideAr from '../content/ar/guide/organize-a-meetup';
import publishAnIdeaGuideAr from '../content/ar/guide/publish-an-idea';
import publishASmallBusinessIdeaGuideAr from '../content/ar/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideAr from '../content/ar/guide/publish-a-startup-concept';
import startCommunityGuideAr from '../content/ar/guide/start-a-community';

/**
 * i18n-ar-s18 (TASK-433) — Arabic translation content tests.
 *
 * Verifies the ar content surface: all 12 guides translated with full
 * GuideContent structure (intro paragraphs, dataPoints, faq, sections,
 * steps + per-step joinOriginNote), and the 3 predominant-locale cities
 * (dubai, cairo, casablanca) translated with the full 7-page CityContent
 * surface (intro array, dataPoints, 5 variant intros + enrichment, 30-idea
 * page, faq, pageTitles). Arabic content is RTL and must keep brand terms
 * untranslated (JoinOrigin, Matrix, Element, DIFC, etc.).
 */

const MIN_PROSE_WORDS = 150;

const AR_GUIDES: readonly GuideContent[] = [
  createAGroupGuideAr,
  createAProjectGuideAr,
  findACoFounderGuideAr,
  first10MembersGuideAr,
  hybridCommunitiesGuideAr,
  keepCommunityActiveGuideAr,
  moderationGuideAr,
  organizeMeetupGuideAr,
  publishAnIdeaGuideAr,
  publishASmallBusinessIdeaGuideAr,
  publishAStartupConceptGuideAr,
  startCommunityGuideAr,
];

const AR_CITIES: readonly CityContent[] = [dubaiAr, cairoAr, casablancaAr];

describe('lib/seo content ar — guide translations (TASK-433)', () => {
  it('translates all 12 guides with kind/locale/slug correctly', () => {
    expect(AR_GUIDES).toHaveLength(12);
    for (const content of AR_GUIDES) {
      expect(content.kind).toBe('guide');
      expect(content.locale).toBe('ar');
      expect(content.slug.length).toBeGreaterThan(0);
      expect(content.title).toContain('JoinOrigin');
      expect((content.description ?? '').length).toBeGreaterThan(0);
    }
  });

  it('every guide intro clears the ≥150-word prose gate (paragraphs summed)', () => {
    for (const content of AR_GUIDES) {
      const introParagraphs = content.intro ?? [];
      expect(introParagraphs.length).toBeGreaterThan(0);
      const introWords = introParagraphs.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const content of AR_GUIDES) {
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every guide has a step-by-step structure with ≥4 steps and per-step joinOriginNote', () => {
    for (const content of AR_GUIDES) {
      expect(content.steps.length).toBeGreaterThanOrEqual(4);
      for (const step of content.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote).toContain('JoinOrigin');
      }
    }
  });

  it('sections stay in lockstep with steps (same length)', () => {
    for (const content of AR_GUIDES) {
      expect(content.sections).toHaveLength(content.steps.length);
    }
  });
});

describe('lib/seo content ar — city translations (TASK-433)', () => {
  it('translates dubai, cairo, casablanca with kind/locale/slug correctly', () => {
    expect(AR_CITIES).toHaveLength(3);
    const slugs = AR_CITIES.map((content) => content.slug).sort();
    expect(slugs).toEqual(['cairo', 'casablanca', 'dubai']);
    for (const content of AR_CITIES) {
      expect(content.kind).toBe('city');
      expect(content.locale).toBe('ar');
      expect(content.title).toContain('JoinOrigin');
      expect((content.description ?? '').length).toBeGreaterThan(0);
    }
  });

  it('city intros are paragraph arrays clearing the ≥150-word prose gate', () => {
    for (const content of AR_CITIES) {
      expect(Array.isArray(content.intro)).toBe(true);
      expect(content.intro.length).toBeGreaterThan(0);
      const introWords = content.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every city carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const content of AR_CITIES) {
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every city covers the full 5-variant surface with prose + enrichment', () => {
    for (const content of AR_CITIES) {
      for (const type of GROUP_TYPES) {
        const prose = content.variantIntros[type.key] ?? '';
        expect(prose.length).toBeGreaterThan(0);
        expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);

        const enrichment = content.variantEnrichment?.[type.key];
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

  it('every city carries a 30-idea page across 6 categories', () => {
    for (const content of AR_CITIES) {
      const categories = content.ideaPage.categories ?? [];
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

  it('every city carries Arabic pageTitles for the full surface', () => {
    for (const content of AR_CITIES) {
      expect(content.pageTitles?.city).toContain(content.title?.split('|')[0]?.trim() ?? '');
      for (const type of GROUP_TYPES) {
        expect(content.pageTitles?.variants?.[type.key] ?? '').toContain('JoinOrigin');
        expect(content.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('JoinOrigin');
      }
      expect(content.pageTitles?.ideas ?? '').toContain('30 فكرة');
      expect(content.pageTitles?.ideasDescription ?? '').toContain('30 فكرة');
    }
  });

  it('brand terms stay untranslated in Arabic city + guide copy', () => {
    for (const content of AR_CITIES) {
      const allText = [
        content.title,
        content.description,
        ...content.intro,
        ...content.dataPoints,
        ...content.faq.flatMap((pair) => [pair.question, pair.answer]),
        ...Object.values(content.variantIntros).filter(Boolean),
      ].join(' ');
      expect(allText).toContain('JoinOrigin');
    }
    for (const content of AR_GUIDES) {
      const allText = [
        content.title,
        content.description,
        ...content.intro,
        ...content.dataPoints,
        ...content.faq.flatMap((pair) => [pair.question, pair.answer]),
        ...content.sections,
      ].join(' ');
      expect(allText).toContain('JoinOrigin');
    }
  });
});
