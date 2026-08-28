import createAGroupGuideZhCN from '../content/zh-CN/guide/create-a-group';
import createAProjectGuideZhCN from '../content/zh-CN/guide/create-a-project';
import findACoFounderGuideZhCN from '../content/zh-CN/guide/find-a-co-founder';
import first10MembersGuideZhCN from '../content/zh-CN/guide/first-10-members';
import hybridCommunitiesGuideZhCN from '../content/zh-CN/guide/hybrid-origins';
import keepCommunityActiveGuideZhCN from '../content/zh-CN/guide/keep-an-origin-active';
import moderationGuideZhCN from '../content/zh-CN/guide/moderation';
import organizeMeetupGuideZhCN from '../content/zh-CN/guide/organize-a-meetup';
import publishAnIdeaGuideZhCN from '../content/zh-CN/guide/publish-an-idea';
import publishASmallBusinessIdeaGuideZhCN from '../content/zh-CN/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideZhCN from '../content/zh-CN/guide/publish-a-startup-concept';
import startCommunityGuideZhCN from '../content/zh-CN/guide/start-an-origin';
import shanghaiCityZhCN from '../content/zh-CN/city/shanghai';
import { GROUP_TYPES } from '../locationData';
import { NEAR_DUPLICATE_THRESHOLD, wordCount } from '../locationGates';

/**
 * i18n-zh-CN-s18 (TASK-438) — Simplified Chinese content-file contract
 * tests.
 *
 * Enforces the same quality contract as the EN guides/cities but for the
 * committed `zh-CN` translation surface: every zh-CN guide declares
 * kind/locale/slug, clears the ≥150-word intro gate (G2, paragraphs summed
 * — zh-CN prose is written with spaced word segmentation so the shared
 * whitespace-token word counter applies), carries ≥3 data points + ≥3 FAQ
 * pairs, has a step-by-step structure with ≥4 steps and per-step
 * joinOriginNote, sections stay in lockstep with steps (whitespace-
 * normalized so spaced zh-CN text matches), and the predominant-locale
 * city file (shanghai) carries the full 7-page surface (city + 5 variants
 * + ideas) with Chinese pageTitles and per-variant unique prose (G2/G5).
 */

const MIN_PROSE_WORDS = 150;
const ZHCn_GUIDES = [
  publishAnIdeaGuideZhCN,
  createAProjectGuideZhCN,
  createAGroupGuideZhCN,
  publishASmallBusinessIdeaGuideZhCN,
  publishAStartupConceptGuideZhCN,
  findACoFounderGuideZhCN,
  startCommunityGuideZhCN,
  first10MembersGuideZhCN,
  keepCommunityActiveGuideZhCN,
  hybridCommunitiesGuideZhCN,
  organizeMeetupGuideZhCN,
  moderationGuideZhCN,
];

/** Normalize spaced zh-CN text for containment checks (remove whitespace). */
function compact(text: string): string {
  return text.replace(/\s+/g, '');
}

/**
 * zh-CN-aware tokenizer — keeps CJK ideographs + latin alphanumerics, so
 * spaced Chinese words and brand tokens survive (the shared EN `similarity`
 * strips non-latin chars, which makes it meaningless for zh-CN prose).
 */
function zhTokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fff]+/)
    .filter((token) => token.length > 0);
}

/** Jaccard similarity over zh-CN tokens (proxy for the EN G5 gate). */
function zhSimilarity(a: string, b: string): number {
  const setA = new Set(zhTokens(a));
  const setB = new Set(zhTokens(b));
  if (setA.size === 0 && setB.size === 0) return 1;
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection += 1;
  }
  return intersection / (setA.size + setB.size - intersection);
}

/** Substantive body tokens (len > 1) for the lockstep word-containment check. */
function bodyTokensOf(text: string): string[] {
  return zhTokens(text).filter((token) => token.length > 1);
}

describe('lib/seo content zh-CN — guide translations (TASK-438)', () => {
  it('registers all 12 guides with kind/locale/slug zh-CN', () => {
    expect(ZHCn_GUIDES).toHaveLength(12);
    for (const guide of ZHCn_GUIDES) {
      expect(guide.kind).toBe('guide');
      expect(guide.locale).toBe('zh-CN');
      expect(guide.slug.length).toBeGreaterThan(0);
    }
  });

  it('every guide intro clears the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const guide of ZHCn_GUIDES) {
      const introWords = guide.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(guide.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const guide of ZHCn_GUIDES) {
      expect(guide.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(guide.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every guide has a step-by-step structure with ≥4 steps + joinOriginNote', () => {
    for (const guide of ZHCn_GUIDES) {
      expect(guide.steps.length).toBeGreaterThanOrEqual(4);
      for (const step of guide.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote.length).toBeGreaterThan(0);
      }
    }
  });

  it('sections stay in lockstep with steps (title + body + joinOriginNote)', () => {
    for (const guide of ZHCn_GUIDES) {
      const steps = guide.steps;
      const sections = guide.sections;
      expect(sections).toHaveLength(steps.length);
      steps.forEach((step, index) => {
        // Whitespace-normalized containment — spaced zh-CN section prose
        // contains the compact step title verbatim.
        expect(compact(sections[index])).toContain(compact(step.title));
        expect(compact(sections[index])).toContain(compact(step.joinOriginNote));
        // Word containment: every substantive body token (latin + CJK,
        // len > 1) must appear in the section.
        const bodyTokens = bodyTokensOf(step.body);
        const sectionTokens = new Set(bodyTokensOf(sections[index]));
        const missing = bodyTokens.filter((token) => !sectionTokens.has(token));
        expect(missing.length / bodyTokens.length).toBeLessThanOrEqual(0.1);
      });
    }
  });

  it('every guide intro mentions JoinOrigin (leading value signal)', () => {
    for (const guide of ZHCn_GUIDES) {
      const intro = guide.intro.join(' ');
      expect(intro).toContain('JoinOrigin');
    }
  });
});

describe('lib/seo content zh-CN — predominant-locale city files (TASK-438)', () => {
  const ZHCn_CITIES = [shanghaiCityZhCN];

  it('declares kind/locale/slug for shanghai', () => {
    expect(ZHCn_CITIES.map((city) => city.slug)).toEqual(['shanghai']);
    for (const city of ZHCn_CITIES) {
      expect(city.kind).toBe('city');
      expect(city.locale).toBe('zh-CN');
    }
  });

  it('city intro arrays clear the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const city of ZHCn_CITIES) {
      const introWords = city.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(city.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('city files carry per-variant unique prose ≥150 words (G2)', () => {
    for (const city of ZHCn_CITIES) {
      for (const type of GROUP_TYPES) {
        const prose = city.variantIntros[type.key] ?? '';
        expect(prose.length).toBeGreaterThan(0);
        expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      }
    }
  });

  it('city files carry per-variant enrichment (venues 4–6, formats 4–5, howToStart 3) (TASK-319)', () => {
    for (const city of ZHCn_CITIES) {
      for (const type of GROUP_TYPES) {
        const enrichment = city.variantEnrichment?.[type.key];
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

  it('city variant intros differ per group type within each city (G5)', () => {
    for (const city of ZHCn_CITIES) {
      for (let i = 0; i < GROUP_TYPES.length; i += 1) {
        for (let j = i + 1; j < GROUP_TYPES.length; j += 1) {
          const a = city.variantIntros[GROUP_TYPES[i].key] ?? '';
          const b = city.variantIntros[GROUP_TYPES[j].key] ?? '';
          if (!a || !b) continue;
          // The shared EN tokenizer strips CJK, so G5 uses the zh-CN-aware
          // tokenizer for the same no-near-duplicate guarantee.
          expect(zhSimilarity(a, b)).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
        }
      }
    }
  });

  it('idea pages carry 30 ideas across 6 categories (§6.6)', () => {
    for (const city of ZHCn_CITIES) {
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

  it('city files cover the full 7-page surface with Chinese pageTitles', () => {
    for (const city of ZHCn_CITIES) {
      expect(city.pageTitles?.city).toContain('Origin');
      expect(city.pageTitles?.cityDescription ?? '').toContain('上海');
      for (const type of GROUP_TYPES) {
        expect(city.pageTitles?.variants?.[type.key] ?? '').toContain('上海');
        expect(city.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain('上海');
      }
      expect(city.pageTitles?.ideas ?? '').toContain('创意');
    }
  });

  it('dataPoints + faq contract holds (≥3 each)', () => {
    for (const city of ZHCn_CITIES) {
      expect(city.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(city.faq.length).toBeGreaterThanOrEqual(3);
    }
  });
});
