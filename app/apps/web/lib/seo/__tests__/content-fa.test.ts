import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { GROUP_TYPES } from '../locationData';
import { MIN_PROSE_WORDS, wordCount } from '../locationGates';
import type { CityContent, GuideContent } from '../content/types';

/**
 * i18n-fa-s18 content tests (TASK-432).
 *
 * Validates the Persian (fa) translated content files directly (they are
 * registered into the shared registry by content-registry TASK-442, so these
 * tests import the committed files by path):
 * - 12 guide files under `content/fa/guide/<slug>.ts` with the full
 *   GuideContent surface (intro ≥150 words, ≥3 data points, ≥3 FAQ pairs,
 *   ≥4 steps, per-step JoinOrigin notes, sections in lockstep with steps).
 * - The Tehran city file under `content/fa/city/tehran.ts` with the full
 *   7-page CityContent surface (intro ≥150 words, ≥3 data points, 5
 *   variant intros ≥150 words, per-type enrichment, 30 ideas in 6
 *   categories, ≥3 FAQ pairs).
 */
const FA_CONTENT_DIR = join(__dirname, '..', 'content', 'fa');

const GUIDE_SLUGS = [
  'publish-an-idea',
  'create-a-project',
  'create-a-group',
  'publish-a-small-business-idea',
  'publish-a-startup-concept',
  'find-a-co-founder',
  'start-an-origin',
  'first-10-members',
  'keep-an-origin-active',
  'hybrid-origins',
  'organize-a-meetup',
  'moderation',
];

function loadFaGuide(slug: string): GuideContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(FA_CONTENT_DIR, 'guide', slug));
  return mod.default as GuideContent;
}

function loadFaTehran(): CityContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(FA_CONTENT_DIR, 'city', 'tehran'));
  return mod.default as CityContent;
}

describe('lib/seo content fa — 12 translated guides (TASK-432)', () => {
  it('commits all 12 fa guide files with the correct locale/kind/slug', () => {
    const files = readdirSync(join(FA_CONTENT_DIR, 'guide')).filter((file) => file.endsWith('.ts'));
    expect(files).toHaveLength(GUIDE_SLUGS.length);
    for (const slug of GUIDE_SLUGS) {
      const content = loadFaGuide(slug);
      expect(content.locale).toBe('fa');
      expect(content.kind).toBe('guide');
      expect(content.slug).toBe(slug);
    }
  });

  it('every fa guide intro clears the ≥150-word prose gate (paragraphs summed)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadFaGuide(slug);
      const introWords = (content.intro ?? []).reduce(
        (sum, paragraph) => sum + wordCount(paragraph),
        0,
      );
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      expect(content.intro.length).toBeGreaterThan(0);
    }
  });

  it('every fa guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadFaGuide(slug);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
      for (const pair of content.faq) {
        expect(pair.question.length).toBeGreaterThan(0);
        expect(pair.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it('every fa guide leads with JoinOrigin and has per-step JoinOrigin notes', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadFaGuide(slug);
      const intro = (content.intro ?? []).join(' ');
      expect(intro).toContain('JoinOrigin');
      const mentionIndex = intro.indexOf('JoinOrigin');
      expect(mentionIndex).toBeGreaterThanOrEqual(0);
      expect(mentionIndex).toBeLessThan(intro.length / 2);
      expect(content.steps.length).toBeGreaterThanOrEqual(4);
      for (const step of content.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote).toContain('JoinOrigin');
      }
    }
  });

  it('every fa guide sections stay in lockstep with steps', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadFaGuide(slug);
      expect(content.sections).toHaveLength(content.steps.length);
      content.steps.forEach((step, index) => {
        expect(content.sections[index]).toContain(step.title);
        expect(content.sections[index]).toContain(step.joinOriginNote);
      });
    }
  });
});

describe('lib/seo content fa — Tehran city file (TASK-432)', () => {
  it('commits the fa Tehran city file with the correct locale/kind/slug', () => {
    const files = readdirSync(join(FA_CONTENT_DIR, 'city')).filter((file) => file.endsWith('.ts'));
    expect(files).toContain('tehran.ts');
    const content = loadFaTehran();
    expect(content.locale).toBe('fa');
    expect(content.kind).toBe('city');
    expect(content.slug).toBe('tehran');
  });

  it('Tehran fa intro clears the ≥150-word prose gate (paragraphs summed)', () => {
    const content = loadFaTehran();
    const introWords = content.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
    expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    expect(content.intro.length).toBeGreaterThan(0);
    expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
    expect(content.faq.length).toBeGreaterThanOrEqual(3);
  });

  it('Tehran fa carries per-variant unique prose ≥150 words + enrichment', () => {
    const content = loadFaTehran();
    for (const type of GROUP_TYPES) {
      const prose = content.variantIntros[type.key] ?? '';
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
  });

  it('Tehran fa idea page carries 30 ideas across 6 categories (§6.6)', () => {
    const content = loadFaTehran();
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
  });
});
