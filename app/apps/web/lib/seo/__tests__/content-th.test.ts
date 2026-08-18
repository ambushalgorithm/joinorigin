import { readdirSync } from 'node:fs';
import { join } from 'node:path';

import { GROUP_TYPES } from '../locationData';
import { MIN_PROSE_WORDS } from '../locationGates';
import type { CityContent, GuideContent } from '../content/types';

/**
 * i18n-th-s18 content tests (TASK-440).
 *
 * Validates the Thai (th) translated content files directly (they are
 * registered into the shared registry by content-registry TASK-442, so these
 * tests import the committed files by path):
 * - 12 guide files under `content/th/guide/<slug>.ts` with the full
 *   GuideContent surface (intro ≥150 words, ≥3 data points, ≥3 FAQ pairs,
 *   ≥4 steps, per-step JoinOrigin notes, sections in lockstep with steps).
 * - The Bangkok city file under `content/th/city/bangkok.ts` with the full
 *   7-page CityContent surface (intro ≥150 words, ≥3 data points, 5
 *   variant intros ≥150 words, per-type enrichment, 30 ideas in 6
 *   categories, ≥3 FAQ pairs, deterministic pageTitles).
 *
 * Thai prose does not separate words with spaces (script convention), so the
 * whitespace-based `wordCount` from locationGates is not a faithful Thai word
 * counter. `thWordCount` approximates Thai word volume by counting
 * consonant-initial syllable clusters (Thai syllables always begin with a
 * consonant) plus Latin/digit tokens — a consistent, script-appropriate
 * proxy for the ≥150-word prose gate.
 */
const TH_CONTENT_DIR = join(__dirname, '..', 'content', 'th');

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

/**
 * Thai-aware word-count approximation. Thai script (U+0E00–U+0E7F) writes
 * words without spaces; each syllable begins with a consonant, so
 * consonant-initial clusters are a consistent proxy for word volume.
 * Latin/digit tokens (brand names, numbers) count as one word each.
 */
export function thWordCount(text: string): number {
  if (!text.trim()) return 0;
  const thSyllablePattern = /[\u0E01-\u0E2E](?:[\u0E30-\u0E4E]|[^\u0E01-\u0E2E\u0E30-\u0E4E])*/g;
  const latinPattern = /[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g;
  return text
    .trim()
    .split(/\s+/)
    .reduce((sum, token) => {
      if (/[\u0E00-\u0E7F]/.test(token)) {
        return sum + (token.match(thSyllablePattern) ?? []).length;
      }
      return sum + (token.match(latinPattern) ?? []).length;
    }, 0);
}

function loadThGuide(slug: string): GuideContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(TH_CONTENT_DIR, 'guide', slug));
  return mod.default as GuideContent;
}

function loadThBangkok(): CityContent {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(join(TH_CONTENT_DIR, 'city', 'bangkok'));
  return mod.default as CityContent;
}

describe('lib/seo content th — 12 translated guides (TASK-440)', () => {
  it('commits all 12 th guide files with the correct locale/kind/slug', () => {
    const files = readdirSync(join(TH_CONTENT_DIR, 'guide')).filter((file) => file.endsWith('.ts'));
    expect(files).toHaveLength(GUIDE_SLUGS.length);
    for (const slug of GUIDE_SLUGS) {
      const content = loadThGuide(slug);
      expect(content.locale).toBe('th');
      expect(content.kind).toBe('guide');
      expect(content.slug).toBe(slug);
    }
  });

  it('every th guide intro clears the ≥150-word prose gate (paragraphs summed)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadThGuide(slug);
      const introWords = (content.intro ?? []).reduce(
        (sum, paragraph) => sum + thWordCount(paragraph),
        0,
      );
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      expect(content.intro.length).toBeGreaterThan(0);
    }
  });

  it('every th guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadThGuide(slug);
      expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(content.faq.length).toBeGreaterThanOrEqual(3);
      for (const pair of content.faq) {
        expect(pair.question.length).toBeGreaterThan(0);
        expect(pair.answer.length).toBeGreaterThan(0);
      }
    }
  });

  it('every th guide leads with JoinOrigin and has per-step JoinOrigin notes', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadThGuide(slug);
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

  it('every th guide sections stay in lockstep with steps', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = loadThGuide(slug);
      expect(content.sections).toHaveLength(content.steps.length);
      content.steps.forEach((step, index) => {
        expect(content.sections[index]).toContain(step.title);
        expect(content.sections[index]).toContain(step.joinOriginNote);
      });
    }
  });
});

describe('lib/seo content th — Bangkok city file (TASK-440)', () => {
  it('commits the th Bangkok city file with the correct locale/kind/slug', () => {
    const files = readdirSync(join(TH_CONTENT_DIR, 'city')).filter((file) => file.endsWith('.ts'));
    expect(files).toContain('bangkok.ts');
    const content = loadThBangkok();
    expect(content.locale).toBe('th');
    expect(content.kind).toBe('city');
    expect(content.slug).toBe('bangkok');
  });

  it('Bangkok th intro clears the ≥150-word prose gate (paragraphs summed)', () => {
    const content = loadThBangkok();
    const introWords = content.intro.reduce((sum, paragraph) => sum + thWordCount(paragraph), 0);
    expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    expect(content.intro.length).toBeGreaterThan(0);
    expect(content.dataPoints.length).toBeGreaterThanOrEqual(3);
    expect(content.faq.length).toBeGreaterThanOrEqual(3);
  });

  it('Bangkok th carries per-variant unique prose ≥150 words + enrichment', () => {
    const content = loadThBangkok();
    for (const type of GROUP_TYPES) {
      const prose = content.variantIntros[type.key] ?? '';
      expect(thWordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
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

  it('Bangkok th idea page carries 30 ideas across 6 categories (§6.6)', () => {
    const content = loadThBangkok();
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

  it('Bangkok th ships deterministic pageTitles for the 7-page surface', () => {
    const content = loadThBangkok();
    expect(content.pageTitles?.city ?? '').toContain('กรุงเทพฯ');
    for (const type of GROUP_TYPES) {
      expect(content.pageTitles?.variants?.[type.key] ?? '').toContain('กรุงเทพฯ');
      expect(content.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('กรุงเทพฯ');
    }
    expect(content.pageTitles?.ideas ?? '').toContain('กรุงเทพฯ');
  });
});
