import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { GROUP_TYPES } from '../locationData';
import type { CityContent, GuideContent } from '../content/types';

/**
 * i18n-ja-s18 content tests (TASK-435).
 *
 * Validates the Japanese (ja) translated content files directly (they are
 * registered into the shared registry by content-registry TASK-442, so these
 * tests import the committed files by path):
 * - 12 guide files under `content/ja/guide/<slug>.ts` with the full
 *   GuideContent surface (intro ≥150 words, ≥3 data points, ≥3 FAQ pairs,
 *   ≥4 steps, per-step JoinOrigin notes, sections in lockstep with steps).
 * - The Tokyo and Osaka city files under `content/ja/city/<slug>.ts` with
 *   the full 7-page CityContent surface (intro ≥150 words, ≥3 data points,
 *   5 variant intros ≥150 words, per-type enrichment, 30 ideas in 6
 *   categories, ≥3 FAQ pairs).
 *
 * Japanese has no inter-word spaces, so the whitespace-token `wordCount`
 * from locationGates is meaningless for ja prose. The G2-equivalent gate
 * here counts Japanese characters (each CJK character = one prose unit)
 * plus whitespace-separated tokens for any Latin/katakana fragments — a
 * faithful proxy for the ≥150-word unique-substance bar.
 */
const JA_CONTENT_DIR = join(__dirname, '..', 'content', 'ja');

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

const CITY_SLUGS = ['tokyo', 'osaka'];

/**
 * G2-equivalent prose bar for ja: the EN gate is ≥150 words; Japanese prose
 * is character-dense, so the CJK-aware measure must clear a comparable
 * threshold (≥150 units) to satisfy the unique-substance intent.
 */
const MIN_JA_PROSE = 150;

/** Japanese-appropriate prose length: CJK chars + whitespace tokens. */
function jaProseLength(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const cjk = (trimmed.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) ?? [])
    .length;
  const tokens = trimmed.split(/\s+/).filter(Boolean).length;
  return cjk + tokens;
}

function loadJaGuide(slug: string): GuideContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(JA_CONTENT_DIR, 'guide', slug));
  return mod.default as GuideContent;
}

function loadJaCity(slug: string): CityContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(JA_CONTENT_DIR, 'city', slug));
  return mod.default as CityContent;
}

describe('lib/seo content ja — 12 translated guides (TASK-435)', () => {
  it('commits all 12 ja guide files with the correct locale/kind/slug', () => {
    const files = readdirSync(join(JA_CONTENT_DIR, 'guide')).filter((file) => file.endsWith('.ts'));
    expect(files).toHaveLength(GUIDE_SLUGS.length);
    for (const slug of GUIDE_SLUGS) {
      const content = loadJaGuide(slug);
      expect(content.locale).toBe('ja');
      expect(content.kind).toBe('guide');
      expect(content.slug).toBe(slug);
    }
  });

  it('every ja guide intro clears the G2 prose bar (CJK-aware, paragraphs summed)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadJaGuide(slug);
      const introLength = (content.intro ?? []).reduce(
        (sum, paragraph) => sum + jaProseLength(paragraph),
        0,
      );
      expect(introLength).toBeGreaterThanOrEqual(MIN_JA_PROSE);
      expect(content.intro.length).toBeGreaterThan(0);
    }
  });

  it('every ja guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadJaGuide(slug);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
      for (const pair of content.faq) {
        expect(pair.question.length).toBeGreaterThan(0);
        expect(pair.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it('every ja guide leads with JoinOrigin and has per-step JoinOrigin notes', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadJaGuide(slug);
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

  it('every ja guide sections stay in lockstep with steps', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadJaGuide(slug);
      expect(content.sections).toHaveLength(content.steps.length);
      content.steps.forEach((step, index) => {
        expect(content.sections[index]).toContain(step.title);
        expect(content.sections[index]).toContain(step.joinOriginNote);
      });
    }
  });
});

describe('lib/seo content ja — Tokyo and Osaka city files (TASK-435)', () => {
  it('commits the ja Tokyo and Osaka city files with the correct locale/kind/slug', () => {
    const files = readdirSync(join(JA_CONTENT_DIR, 'city')).filter((file) => file.endsWith('.ts'));
    expect(files).toEqual(expect.arrayContaining([...CITY_SLUGS.map((slug) => `${slug}.ts`)]));
    for (const slug of CITY_SLUGS) {
      const content = loadJaCity(slug);
      expect(content.locale).toBe('ja');
      expect(content.kind).toBe('city');
      expect(content.slug).toBe(slug);
    }
  });

  it('Tokyo and Osaka ja intros clear the G2 prose bar (paragraphs summed)', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadJaCity(slug);
      const introLength = content.intro.reduce(
        (sum, paragraph) => sum + jaProseLength(paragraph),
        0,
      );
      expect(introLength).toBeGreaterThanOrEqual(MIN_JA_PROSE);
      expect(content.intro.length).toBeGreaterThan(0);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('Tokyo and Osaka ja carry per-variant unique prose + enrichment', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadJaCity(slug);
      for (const type of GROUP_TYPES) {
        const prose = content.variantIntros[type.key] ?? '';
        expect(jaProseLength(prose)).toBeGreaterThanOrEqual(MIN_JA_PROSE);
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

  it('Tokyo and Osaka ja idea pages carry 30 ideas across 6 categories (§6.6)', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadJaCity(slug);
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

  it('Tokyo and Osaka ja ship explicit pageTitles for the 7-page surface', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadJaCity(slug);
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
