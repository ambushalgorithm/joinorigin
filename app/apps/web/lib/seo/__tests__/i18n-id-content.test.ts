import { GROUP_TYPES } from '../locationData';
import { MIN_PROSE_WORDS, wordCount } from '../locationGates';

/**
 * i18n-id-s18 (TASK-439) — Indonesian (id) translation content tests.
 *
 * Verifies the 12 id guide files + the id Jakarta city file clear the same
 * content contract as the EN source of truth (kind/locale/slug, ≥150-word
 * intro prose G2, ≥3 data points + ≥3 FAQ pairs, step-by-step structure
 * with per-step JoinOrigin notes, per-variant prose + enrichment, 30-idea
 * page) before TASK-442 registers them in the content registry.
 *
 * The files are imported DIRECTLY (not through the registry) so these tests
 * work independently of the registration role's timeline.
 */

import createAGroupGuideId from '../content/id/guide/create-a-group';
import createAProjectGuideId from '../content/id/guide/create-a-project';
import findACoFounderGuideId from '../content/id/guide/find-a-co-founder';
import first10MembersGuideId from '../content/id/guide/first-10-members';
import hybridCommunitiesGuideId from '../content/id/guide/hybrid-communities';
import keepCommunityActiveGuideId from '../content/id/guide/keep-a-community-active';
import moderationGuideId from '../content/id/guide/moderation';
import organizeMeetupGuideId from '../content/id/guide/organize-a-meetup';
import publishAnIdeaGuideId from '../content/id/guide/publish-an-idea';
import publishASmallBusinessIdeaGuideId from '../content/id/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideId from '../content/id/guide/publish-a-startup-concept';
import startCommunityGuideId from '../content/id/guide/start-a-community';
import jakartaCityId from '../content/id/city/jakarta';

const GUIDE_SLUGS = [
  'create-a-group',
  'create-a-project',
  'find-a-co-founder',
  'first-10-members',
  'hybrid-communities',
  'keep-a-community-active',
  'moderation',
  'organize-a-meetup',
  'publish-an-idea',
  'publish-a-small-business-idea',
  'publish-a-startup-concept',
  'start-a-community',
] as const;

const idGuides = [
  createAGroupGuideId,
  createAProjectGuideId,
  findACoFounderGuideId,
  first10MembersGuideId,
  hybridCommunitiesGuideId,
  keepCommunityActiveGuideId,
  moderationGuideId,
  organizeMeetupGuideId,
  publishAnIdeaGuideId,
  publishASmallBusinessIdeaGuideId,
  publishAStartupConceptGuideId,
  startCommunityGuideId,
];

describe('lib/seo content — Indonesian (id) guide translations (TASK-439)', () => {
  it('registers 12 id guides with correct kind/locale/slug', () => {
    expect(idGuides).toHaveLength(GUIDE_SLUGS.length);
    for (const [index, guide] of idGuides.entries()) {
      expect(guide.kind).toBe('guide');
      expect(guide.locale).toBe('id');
      expect(guide.slug).toBe(GUIDE_SLUGS[index]);
    }
  });

  it('every id guide intro clears the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const guide of idGuides) {
      const introParagraphs = guide.intro ?? [];
      expect(introParagraphs.length).toBeGreaterThan(0);
      const introWords = introParagraphs.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every id guide carries ≥3 data points + ≥3 FAQ pairs + a title', () => {
    for (const guide of idGuides) {
      expect(guide.title).toContain('JoinOrigin');
      expect(guide.description?.length ?? 0).toBeGreaterThan(0);
      expect(guide.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(guide.faq.length).toBeGreaterThanOrEqual(3);
      for (const pair of guide.faq) {
        expect(pair.question.length).toBeGreaterThan(0);
        expect(pair.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it('every id guide has a step-by-step structure with ≥4 steps + per-step JoinOrigin notes', () => {
    for (const guide of idGuides) {
      expect(guide.steps.length).toBeGreaterThanOrEqual(4);
      expect(guide.sections).toHaveLength(guide.steps.length);
      for (const step of guide.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote.length).toBeGreaterThan(0);
        expect(step.joinOriginNote).toContain('JoinOrigin');
      }
    }
  });

  it('every id guide mentions JoinOrigin in the intro (TASK-320 lead)', () => {
    for (const guide of idGuides) {
      const intro = (guide.intro ?? []).join(' ');
      expect(intro).toContain('JoinOrigin');
    }
  });
});

describe('lib/seo content — Indonesian (id) Jakarta city translation (TASK-439)', () => {
  it('declares the correct kind/locale/slug', () => {
    expect(jakartaCityId.kind).toBe('city');
    expect(jakartaCityId.locale).toBe('id');
    expect(jakartaCityId.slug).toBe('jakarta');
  });

  it('intro clears the ≥150-word prose gate (G2, paragraphs summed)', () => {
    const introWords = (jakartaCityId.intro ?? []).reduce(
      (sum, paragraph) => sum + wordCount(paragraph),
      0,
    );
    expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
  });

  it('carries ≥3 data points + ≥3 FAQ pairs + title/description', () => {
    expect(jakartaCityId.title).toContain('JoinOrigin');
    expect(jakartaCityId.description?.length ?? 0).toBeGreaterThan(0);
    expect(jakartaCityId.dataPoints.length).toBeGreaterThanOrEqual(3);
    expect(jakartaCityId.faq.length).toBeGreaterThanOrEqual(3);
  });

  it('carries per-variant unique prose ≥150 words + enrichment (venues 4–6, formats 4–5, howToStart 3)', () => {
    for (const type of GROUP_TYPES) {
      const prose = jakartaCityId.variantIntros[type.key] ?? '';
      expect(prose.length).toBeGreaterThan(0);
      expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);

      const enrichment = jakartaCityId.variantEnrichment?.[type.key];
      expect(enrichment).toBeDefined();
      if (!enrichment) continue;
      expect(enrichment.venues.length).toBeGreaterThanOrEqual(4);
      expect(enrichment.venues.length).toBeLessThanOrEqual(6);
      expect(enrichment.formats.length).toBeGreaterThanOrEqual(4);
      expect(enrichment.formats.length).toBeLessThanOrEqual(5);
      expect(enrichment.howToStart).toHaveLength(3);
    }
  });

  it('carries a 30-idea page in 6 categories with 5 ideas each', () => {
    expect(jakartaCityId.ideaPage.intro.length).toBeGreaterThan(0);
    expect(jakartaCityId.ideaPage.categories).toHaveLength(6);
    for (const category of jakartaCityId.ideaPage.categories) {
      expect(category.ideas).toHaveLength(5);
      for (const idea of category.ideas) {
        expect(idea.title.length).toBeGreaterThan(0);
        expect(idea.pitch.length).toBeGreaterThan(0);
        expect(idea.audience.length).toBeGreaterThan(0);
        expect(idea.venueType.length).toBeGreaterThan(0);
      }
    }
    expect(jakartaCityId.ideaPage.faq.length).toBeGreaterThanOrEqual(3);
  });

  it('ships explicit pageTitles for the id surface', () => {
    expect(jakartaCityId.pageTitles?.city).toContain('Jakarta');
    expect(jakartaCityId.pageTitles?.ideas).toContain('Jakarta');
    expect(jakartaCityId.pageTitles?.variants?.startup).toContain('Jakarta');
  });
});
