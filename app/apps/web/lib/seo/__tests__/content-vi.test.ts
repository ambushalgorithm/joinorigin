import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { GROUP_TYPES } from '../locationData';
import { wordCount } from '../locationGates';
import type { CityContent, GuideContent } from '../content/types';

/**
 * i18n-vi-s18 content tests (TASK-441).
 *
 * Validates the Vietnamese (vi) translated content files directly (they are
 * registered into the shared registry by content-registry TASK-442, so these
 * tests import the committed files by path):
 * - 12 guide files under `content/vi/guide/<slug>.ts` with the full
 *   GuideContent surface (intro ≥150 words, ≥3 data points, ≥3 FAQ pairs,
 *   ≥4 steps, per-step JoinOrigin notes, sections in lockstep with steps).
 * - The Ho Chi Minh City city file under `content/vi/city/<slug>.ts` with
 *   the full 7-page CityContent surface (intro ≥150 words, ≥3 data points,
 *   5 variant intros ≥150 words, per-type enrichment, 30 ideas in 6
 *   categories, ≥3 FAQ pairs).
 *
 * Vietnamese prose is whitespace-tokenized like English (unlike CJK locales),
 * so the standard `wordCount` from locationGates applies directly to the
 * ≥150-word unique-substance bar (G2).
 */
const VI_CONTENT_DIR = join(__dirname, '..', 'content', 'vi');

const GUIDE_SLUGS = [
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

const CITY_SLUGS = ['ho-chi-minh-city'];

/** G2 prose bar — matches the EN gate (design §6.7). */
const MIN_VI_PROSE = 150;

function loadViGuide(slug: string): GuideContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(VI_CONTENT_DIR, 'guide', slug));
  return mod.default as GuideContent;
}

function loadViCity(slug: string): CityContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(VI_CONTENT_DIR, 'city', slug));
  return mod.default as CityContent;
}

describe('lib/seo content vi — 12 translated guides (TASK-441)', () => {
  it('commits all 12 vi guide files with the correct locale/kind/slug', () => {
    const files = readdirSync(join(VI_CONTENT_DIR, 'guide')).filter((file) => file.endsWith('.ts'));
    expect(files).toHaveLength(GUIDE_SLUGS.length);
    for (const slug of GUIDE_SLUGS) {
      const content = loadViGuide(slug);
      expect(content.locale).toBe('vi');
      expect(content.kind).toBe('guide');
      expect(content.slug).toBe(slug);
    }
  });

  it('every vi guide intro clears the G2 prose bar (paragraphs summed)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadViGuide(slug);
      const introLength = (content.intro ?? []).reduce(
        (sum, paragraph) => sum + wordCount(paragraph),
        0,
      );
      expect(introLength).toBeGreaterThanOrEqual(MIN_VI_PROSE);
      expect(content.intro.length).toBeGreaterThan(0);
    }
  });

  it('every vi guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadViGuide(slug);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
      for (const pair of content.faq) {
        expect(pair.question.length).toBeGreaterThan(0);
        expect(pair.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it('every vi guide leads with JoinOrigin and has per-step JoinOrigin notes', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadViGuide(slug);
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

  it('every vi guide sections stay in lockstep with steps', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadViGuide(slug);
      expect(content.sections).toHaveLength(content.steps.length);
      content.steps.forEach((step, index) => {
        expect(content.sections[index]).toContain(step.title);
        expect(content.sections[index]).toContain(step.joinOriginNote);
      });
    }
  });
});

describe('lib/seo content vi — Ho Chi Minh City city file (TASK-441)', () => {
  it('commits the vi Ho Chi Minh City city file with the correct locale/kind/slug', () => {
    const files = readdirSync(join(VI_CONTENT_DIR, 'city')).filter((file) => file.endsWith('.ts'));
    expect(files).toEqual(expect.arrayContaining([...CITY_SLUGS.map((slug) => `${slug}.ts`)]));
    for (const slug of CITY_SLUGS) {
      const content = loadViCity(slug);
      expect(content.locale).toBe('vi');
      expect(content.kind).toBe('city');
      expect(content.slug).toBe(slug);
    }
  });

  it('Ho Chi Minh City vi intro clears the G2 prose bar (paragraphs summed)', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadViCity(slug);
      const introLength = content.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(introLength).toBeGreaterThanOrEqual(MIN_VI_PROSE);
      expect(content.intro.length).toBeGreaterThan(0);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('Ho Chi Minh City vi carries per-variant unique prose + enrichment', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadViCity(slug);
      for (const type of GROUP_TYPES) {
        const prose = content.variantIntros[type.key] ?? '';
        expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_VI_PROSE);
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

  it('Ho Chi Minh City vi idea pages carry 30 ideas across 6 categories (§6.6)', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadViCity(slug);
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

  it('Ho Chi Minh City vi ships explicit pageTitles for the 7-page surface', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadViCity(slug);
      expect(content.pageTitles?.city ?? '').toContain('JoinOrigin');
      expect(content.pageTitles?.cityDescription ?? '').toContain('JoinOrigin');
      for (const type of GROUP_TYPES) {
        expect(content.pageTitles?.variants?.[type.key] ?? '').toContain('JoinOrigin');
        expect(content.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('JoinOrigin');
      }
      expect(content.pageTitles?.ideas ?? '').toContain('JoinOrigin');
      expect(content.pageTitles?.ideasDescription ?? '').toContain('JoinOrigin');
    }
  });
});
