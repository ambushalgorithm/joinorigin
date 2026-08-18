import { GROUP_TYPES } from '../locationData';
import { nearDuplicate, NEAR_DUPLICATE_THRESHOLD, similarity, wordCount } from '../locationGates';
import type { CityContent, GuideContent } from '../content/types';

import istanbulTr from '../content/tr/city/istanbul';
import createAGroupTr from '../content/tr/guide/create-a-group';
import createAProjectTr from '../content/tr/guide/create-a-project';
import findACoFounderTr from '../content/tr/guide/find-a-co-founder';
import first10MembersTr from '../content/tr/guide/first-10-members';
import hybridCommunitiesTr from '../content/tr/guide/hybrid-communities';
import keepCommunityActiveTr from '../content/tr/guide/keep-a-community-active';
import moderationTr from '../content/tr/guide/moderation';
import organizeMeetupTr from '../content/tr/guide/organize-a-meetup';
import publishAnIdeaTr from '../content/tr/guide/publish-an-idea';
import publishASmallBusinessIdeaTr from '../content/tr/guide/publish-a-small-business-idea';
import publishAStartupConceptTr from '../content/tr/guide/publish-a-startup-concept';
import startCommunityTr from '../content/tr/guide/start-a-community';

/**
 * Sprint 18 Turkish translation content tests (TASK-429).
 *
 * Enforces the per-locale translation contract for `lib/seo/content/tr/**`:
 * all 12 guides translated with the full GuideContent surface (kind/locale/
 * slug, intro ≥150 words summed across paragraphs, dataPoints ≥3, FAQ ≥3,
 * step-by-step structure with per-step JoinOrigin notes, sections ↔ steps
 * lockstep), and the Istanbul city file with the full 7-page CityContent
 * surface (pageTitles, intro ≥150 words, 5 variantIntros ≥150 words,
 * enrichment shape, 30 ideas / 6 categories, city FAQ).
 */
const MIN_PROSE_WORDS = 150;

const TR_GUIDES: GuideContent[] = [
  publishAnIdeaTr,
  createAProjectTr,
  createAGroupTr,
  publishASmallBusinessIdeaTr,
  publishAStartupConceptTr,
  findACoFounderTr,
  startCommunityTr,
  first10MembersTr,
  keepCommunityActiveTr,
  hybridCommunitiesTr,
  organizeMeetupTr,
  moderationTr,
];

const TR_GUIDE_SLUGS = [
  'publish-an-idea',
  'create-a-project',
  'create-a-group',
  'publish-a-small-business-idea',
  'publish-a-startup-concept',
  'find-a-co-founder',
  'start-a-community',
  'first-10-members',
  'keep-a-community-active',
  'hybrid-communities',
  'organize-a-meetup',
  'moderation',
];

describe('lib/seo content — tr guides (TASK-429)', () => {
  it('translates exactly the 12 L1 guides with correct kind/locale/slug', () => {
    expect(TR_GUIDES).toHaveLength(12);
    for (const guide of TR_GUIDES) {
      expect(guide.kind).toBe('guide');
      expect(guide.locale).toBe('tr');
      expect(TR_GUIDE_SLUGS).toContain(guide.slug);
      expect(guide.title).toContain('JoinOrigin');
      expect((guide.description ?? '').length).toBeGreaterThan(0);
    }
    expect(new Set(TR_GUIDES.map((g) => g.slug)).size).toBe(12);
  });

  it('every tr guide intro clears the ≥150-word prose gate (paragraphs summed)', () => {
    for (const guide of TR_GUIDES) {
      const introWords = guide.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every tr guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const guide of TR_GUIDES) {
      expect(guide.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(guide.faq.length).toBeGreaterThanOrEqual(3);
      for (const pair of guide.faq) {
        expect(pair.question.length).toBeGreaterThan(0);
        expect(pair.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it('every tr guide has a step-by-step structure with per-step JoinOrigin notes', () => {
    for (const guide of TR_GUIDES) {
      expect(guide.steps.length).toBeGreaterThanOrEqual(4);
      for (const step of guide.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote.length).toBeGreaterThan(0);
        expect(step.joinOriginNote).toContain('JoinOrigin');
      }
    }
  });

  it('tr guide sections stay in lockstep with steps', () => {
    for (const guide of TR_GUIDES) {
      expect(guide.sections).toHaveLength(guide.steps.length);
      guide.steps.forEach((step, index) => {
        expect(guide.sections[index]).toContain(step.title);
        expect(guide.sections[index]).toContain(step.joinOriginNote);
      });
    }
  });

  it('tr guides are not near-duplicates of each other (G5, no template reuse)', () => {
    for (let i = 0; i < TR_GUIDES.length; i += 1) {
      for (let j = i + 1; j < TR_GUIDES.length; j += 1) {
        const a = TR_GUIDES[i].intro.join(' ');
        const b = TR_GUIDES[j].intro.join(' ');
        expect(nearDuplicate(a, b)).toBe(false);
      }
    }
  });
});

describe('lib/seo content — tr istanbul city (TASK-429)', () => {
  const city: CityContent = istanbulTr;

  it('declares the full city surface with Turkish titles', () => {
    expect(city.kind).toBe('city');
    expect(city.locale).toBe('tr');
    expect(city.slug).toBe('istanbul');
    expect(city.pageTitles?.city).toContain('İstanbul');
    for (const type of GROUP_TYPES) {
      expect(city.pageTitles?.variants?.[type.key] ?? '').toContain('İstanbul');
      expect(city.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('İstanbul');
    }
    expect(city.pageTitles?.ideas ?? '').toContain('İstanbul');
  });

  it('intro (paragraph array) clears the ≥150-word prose gate', () => {
    const introWords = city.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
    expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
  });

  it('carries ≥3 data points + ≥3 FAQ pairs', () => {
    expect(city.dataPoints.length).toBeGreaterThanOrEqual(3);
    expect(city.faq.length).toBeGreaterThanOrEqual(3);
  });

  it('carries 5 per-variant intros ≥150 words each', () => {
    for (const type of GROUP_TYPES) {
      const prose = city.variantIntros[type.key] ?? '';
      expect(prose.length).toBeGreaterThan(0);
      expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('carries per-variant enrichment (venues 4–6, formats 4–5, howToStart 3)', () => {
    for (const type of GROUP_TYPES) {
      const enrichment = city.variantEnrichment?.[type.key];
      expect(enrichment).toBeDefined();
      if (!enrichment) continue;
      expect(enrichment.venues.length).toBeGreaterThanOrEqual(4);
      expect(enrichment.venues.length).toBeLessThanOrEqual(6);
      expect(enrichment.formats.length).toBeGreaterThanOrEqual(4);
      expect(enrichment.formats.length).toBeLessThanOrEqual(5);
      expect(enrichment.howToStart).toHaveLength(3);
      for (const venue of enrichment.venues) expect(venue.length).toBeGreaterThan(0);
      for (const format of enrichment.formats) expect(format.length).toBeGreaterThan(0);
      for (const step of enrichment.howToStart) expect(step.length).toBeGreaterThan(0);
    }
  });

  it('variant intros differ per group type (G5)', () => {
    for (let i = 0; i < GROUP_TYPES.length; i += 1) {
      for (let j = i + 1; j < GROUP_TYPES.length; j += 1) {
        const a = city.variantIntros[GROUP_TYPES[i].key] ?? '';
        const b = city.variantIntros[GROUP_TYPES[j].key] ?? '';
        const sim = similarity(a, b);
        expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
      }
    }
  });

  it('idea page carries 30 ideas across 6 categories', () => {
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
    expect(city.ideaPage.faq.length).toBeGreaterThanOrEqual(3);
  });
});
