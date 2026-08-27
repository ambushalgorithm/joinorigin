import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { GROUP_TYPES } from '../locationData';
import { MIN_PROSE_WORDS } from '../locationGates';
import type { CityContent, GuideContent } from '../content/types';

/**
 * i18n-zh-TW-s18 content tests (TASK-437).
 *
 * Validates the Traditional Chinese (zh-TW) translated content files directly
 * (they are registered into the shared registry by content-registry TASK-442,
 * so these tests import the committed files by path):
 * - 12 guide files under `content/zh-TW/guide/<slug>.ts` with the full
 *   GuideContent surface (intro ≥150 words, ≥3 data points, ≥3 FAQ pairs,
 *   ≥4 steps, per-step JoinOrigin notes, sections in lockstep with steps).
 * - The taipei + hong-kong city files under `content/zh-TW/city/<slug>.ts`
 *   with the full 7-page CityContent surface (intro ≥150 words, ≥3 data
 *   points, 5 variant intros ≥150 words, per-type enrichment, 30 ideas in
 *   6 categories, ≥3 FAQ pairs, zh-TW pageTitles).
 *
 * Word-count note: Chinese text does not use spaces between characters, so
 * the whitespace-token `wordCount` gate would under-count. These tests use
 * a CJK-aware counter: every CJK ideograph counts as one word plus Latin
 * tokens — the standard SEO convention for Chinese text.
 */

const ZH_TW_CONTENT_DIR = join(__dirname, '..', 'content', 'zh-TW');

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

const CITY_SLUGS = ['taipei', 'hong-kong'];

/**
 * CJK-aware word count: each CJK ideograph counts as one word; Latin/ASCII
 * sequences count as whitespace-separated tokens. Chinese is written without
 * spaces, so character-level counting is the standard word-count convention
 * (the same approach Google uses for CJK text).
 */
function zhWordCount(text: string): number {
  const cjkChars = (text.match(/[\u3400-\u4dbf\u4e00-\u9fff]/g) ?? []).length;
  const latin = text
    .replace(/[\u3400-\u4dbf\u4e00-\u9fff]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return cjkChars + latin;
}

/** CJK-aware tokenizer for the G5 similarity check. */
function zhTokens(text: string): Set<string> {
  const tokens = new Set<string>();
  const lower = text.toLowerCase();
  for (const char of lower) {
    if (/[\u3400-\u4dbf\u4e00-\u9fff]/.test(char)) {
      tokens.add(char);
    }
  }
  for (const word of lower.split(/[^\u3400-\u4dbf\u4e00-\u9fff a-z0-9]+/)) {
    if (/[a-z0-9]{2,}/.test(word)) tokens.add(word);
  }
  return tokens;
}

function zhSimilarity(a: string, b: string): number {
  const setA = zhTokens(a);
  const setB = zhTokens(b);
  if (setA.size === 0 && setB.size === 0) return 1;
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection += 1;
  }
  return intersection / (setA.size + setB.size - intersection);
}

function loadZhGuide(slug: string): GuideContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(ZH_TW_CONTENT_DIR, 'guide', slug));
  return mod.default as GuideContent;
}

function loadZhCity(slug: string): CityContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(ZH_TW_CONTENT_DIR, 'city', slug));
  return mod.default as CityContent;
}

describe('lib/seo content zh-TW — 12 translated guides (TASK-437)', () => {
  it('commits all 12 zh-TW guide files with the correct locale/kind/slug', () => {
    const files = readdirSync(join(ZH_TW_CONTENT_DIR, 'guide')).filter((file) =>
      file.endsWith('.ts'),
    );
    expect(files).toHaveLength(GUIDE_SLUGS.length);
    for (const slug of GUIDE_SLUGS) {
      const content = loadZhGuide(slug);
      expect(content.locale).toBe('zh-TW');
      expect(content.kind).toBe('guide');
      expect(content.slug).toBe(slug);
    }
  });

  it('every zh-TW guide intro clears the ≥150-word prose gate (CJK-aware, paragraphs summed)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadZhGuide(slug);
      const introWords = (content.intro ?? []).reduce(
        (sum, paragraph) => sum + zhWordCount(paragraph),
        0,
      );
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      expect(content.intro.length).toBeGreaterThan(0);
    }
  });

  it('every zh-TW guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadZhGuide(slug);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
      for (const pair of content.faq) {
        expect(pair.question.length).toBeGreaterThan(0);
        expect(pair.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it('every zh-TW guide leads with JoinOrigin and has per-step JoinOrigin notes', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadZhGuide(slug);
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

  it('every zh-TW guide sections stay in lockstep with steps', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadZhGuide(slug);
      expect(content.sections).toHaveLength(content.steps.length);
      content.steps.forEach((step, index) => {
        expect(content.sections[index]).toContain(step.title);
        expect(content.sections[index]).toContain(step.joinOriginNote);
      });
    }
  });
});

describe('lib/seo content zh-TW — predominant-locale city files (TASK-437)', () => {
  it('commits the zh-TW taipei + hong-kong city files with the correct locale/kind/slug', () => {
    const files = readdirSync(join(ZH_TW_CONTENT_DIR, 'city')).filter((file) =>
      file.endsWith('.ts'),
    );
    expect(files).toHaveLength(CITY_SLUGS.length);
    for (const slug of CITY_SLUGS) {
      const content = loadZhCity(slug);
      expect(content.locale).toBe('zh-TW');
      expect(content.kind).toBe('city');
      expect(content.slug).toBe(slug);
    }
  });

  it('city intro arrays clear the ≥150-word prose gate (CJK-aware, paragraphs summed)', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadZhCity(slug);
      const introWords = content.intro.reduce((sum, paragraph) => sum + zhWordCount(paragraph), 0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      expect(content.intro.length).toBeGreaterThan(0);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('city files carry per-variant unique prose ≥150 words + enrichment', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadZhCity(slug);
      for (const type of GROUP_TYPES) {
        const prose = content.variantIntros[type.key] ?? '';
        expect(zhWordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
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

  it('taipei and hong-kong variant intros differ per group type (G5, CJK-aware)', () => {
    const taipei = loadZhCity('taipei');
    const hongKong = loadZhCity('hong-kong');
    for (const type of GROUP_TYPES) {
      const sim = zhSimilarity(
        taipei.variantIntros[type.key] ?? '',
        hongKong.variantIntros[type.key] ?? '',
      );
      expect(sim).toBeLessThan(0.7);
    }
  });

  it('city idea pages carry 30 ideas across 6 categories (§6.6)', () => {
    for (const slug of CITY_SLUGS) {
      const content = loadZhCity(slug);
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

  it('city files cover the full 7-page surface with zh-TW pageTitles', () => {
    const cityNames: Record<string, string> = { taipei: '台北', 'hong-kong': '香港' };
    for (const slug of CITY_SLUGS) {
      const content = loadZhCity(slug);
      expect(content.pageTitles?.city ?? '').toContain(cityNames[slug]);
      for (const type of GROUP_TYPES) {
        expect(content.pageTitles?.variants?.[type.key] ?? '').toContain(cityNames[slug]);
        expect(content.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain(
          cityNames[slug],
        );
      }
      expect(content.pageTitles?.ideas ?? '').toContain('點子');
    }
  });
});
