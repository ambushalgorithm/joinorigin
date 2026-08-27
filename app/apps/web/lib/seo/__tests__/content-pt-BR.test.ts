import createAGroupGuidePtBR from '../content/pt-BR/guide/create-a-group';
import createAProjectGuidePtBR from '../content/pt-BR/guide/create-a-project';
import findACoFounderGuidePtBR from '../content/pt-BR/guide/find-a-co-founder';
import first10MembersGuidePtBR from '../content/pt-BR/guide/first-10-members';
import hybridCommunitiesGuidePtBR from '../content/pt-BR/guide/hybrid-origins';
import keepCommunityActiveGuidePtBR from '../content/pt-BR/guide/keep-an-origin-active';
import moderationGuidePtBR from '../content/pt-BR/guide/moderation';
import organizeMeetupGuidePtBR from '../content/pt-BR/guide/organize-a-meetup';
import publishAnIdeaGuidePtBR from '../content/pt-BR/guide/publish-an-idea';
import publishASmallBusinessIdeaGuidePtBR from '../content/pt-BR/guide/publish-a-small-business-idea';
import publishAStartupConceptGuidePtBR from '../content/pt-BR/guide/publish-a-startup-concept';
import startCommunityGuidePtBR from '../content/pt-BR/guide/start-an-origin';
import lisbonCityPtBR from '../content/pt-BR/city/lisbon';
import rioDeJaneiroCityPtBR from '../content/pt-BR/city/rio-de-janeiro';
import saoPauloCityPtBR from '../content/pt-BR/city/sao-paulo';
import { GROUP_TYPES } from '../locationData';
import { NEAR_DUPLICATE_THRESHOLD, similarity, wordCount } from '../locationGates';

/**
 * i18n-pt-BR-s18 (TASK-425) — Brazilian Portuguese content-file contract
 * tests.
 *
 * Enforces the same quality contract as the EN guides/cities but for the
 * committed `pt-BR` translation surface: every pt-BR guide declares
 * kind/locale/slug, clears the ≥150-word intro gate (G2, paragraphs summed),
 * carries ≥3 data points + ≥3 FAQ pairs, has a step-by-step structure with
 * ≥4 steps and per-step joinOriginNote, sections stay in lockstep with
 * steps, and the predominant-locale city files (sao-paulo, rio-de-janeiro,
 * lisbon) carry the full 7-page surface (city + 5 variants + ideas) with
 * Portuguese pageTitles and per-variant unique prose (G2/G5).
 */

const MIN_PROSE_WORDS = 150;
const PTBR_GUIDES = [
  publishAnIdeaGuidePtBR,
  createAProjectGuidePtBR,
  createAGroupGuidePtBR,
  publishASmallBusinessIdeaGuidePtBR,
  publishAStartupConceptGuidePtBR,
  findACoFounderGuidePtBR,
  startCommunityGuidePtBR,
  first10MembersGuidePtBR,
  keepCommunityActiveGuidePtBR,
  hybridCommunitiesGuidePtBR,
  organizeMeetupGuidePtBR,
  moderationGuidePtBR,
];

describe('lib/seo content pt-BR — guide translations (TASK-425)', () => {
  it('registers all 12 guides with kind/locale/slug pt-BR', () => {
    expect(PTBR_GUIDES).toHaveLength(12);
    for (const guide of PTBR_GUIDES) {
      expect(guide.kind).toBe('guide');
      expect(guide.locale).toBe('pt-BR');
      expect(guide.slug.length).toBeGreaterThan(0);
    }
  });

  it('every guide intro clears the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const guide of PTBR_GUIDES) {
      const introWords = guide.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(guide.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const guide of PTBR_GUIDES) {
      expect(guide.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(guide.faq.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every guide has a step-by-step structure with ≥4 steps + joinOriginNote', () => {
    for (const guide of PTBR_GUIDES) {
      expect(guide.steps.length).toBeGreaterThanOrEqual(4);
      for (const step of guide.steps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
        expect(step.joinOriginNote.length).toBeGreaterThan(0);
      }
    }
  });

  it('sections stay in lockstep with steps (title + body + joinOriginNote)', () => {
    for (const guide of PTBR_GUIDES) {
      const steps = guide.steps;
      const sections = guide.sections;
      expect(sections).toHaveLength(steps.length);
      steps.forEach((step, index) => {
        expect(sections[index]).toContain(step.title);
        expect(sections[index]).toContain(step.joinOriginNote);
        // Portuguese word-containment: every substantive word of the step
        // body must appear in the section (order-insensitive, accent-safe).
        const bodyWords = step.body
          .toLowerCase()
          .split(/[^a-z0-9áàâãéêíóôõúüç]+/)
          .filter((word) => word.length > 1);
        const sectionWords = new Set(
          sections[index]
            .toLowerCase()
            .split(/[^a-z0-9áàâãéêíóôõúüç]+/)
            .filter((word) => word.length > 1),
        );
        const missing = bodyWords.filter((word) => !sectionWords.has(word));
        expect(missing.length / bodyWords.length).toBeLessThanOrEqual(0.1);
      });
    }
  });

  it('every guide intro mentions JoinOrigin (leading value signal)', () => {
    for (const guide of PTBR_GUIDES) {
      const intro = guide.intro.join(' ');
      expect(intro).toContain('JoinOrigin');
    }
  });
});

describe('lib/seo content pt-BR — predominant-locale city files (TASK-425)', () => {
  const PTBR_CITIES = [saoPauloCityPtBR, rioDeJaneiroCityPtBR, lisbonCityPtBR];

  it('declares kind/locale/slug for sao-paulo, rio-de-janeiro, lisbon', () => {
    expect(PTBR_CITIES.map((city) => city.slug)).toEqual(['sao-paulo', 'rio-de-janeiro', 'lisbon']);
    for (const city of PTBR_CITIES) {
      expect(city.kind).toBe('city');
      expect(city.locale).toBe('pt-BR');
    }
  });

  it('city intro arrays clear the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const city of PTBR_CITIES) {
      const introWords = city.intro.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(city.intro.length).toBeGreaterThan(0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('city files carry per-variant unique prose ≥150 words (G2)', () => {
    for (const city of PTBR_CITIES) {
      for (const type of GROUP_TYPES) {
        const prose = city.variantIntros[type.key] ?? '';
        expect(prose.length).toBeGreaterThan(0);
        expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
      }
    }
  });

  it('city files carry per-variant enrichment (venues 4–6, formats 4–5, howToStart 3) (TASK-319)', () => {
    for (const city of PTBR_CITIES) {
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
    for (const city of PTBR_CITIES) {
      for (let i = 0; i < GROUP_TYPES.length; i += 1) {
        for (let j = i + 1; j < GROUP_TYPES.length; j += 1) {
          const a = city.variantIntros[GROUP_TYPES[i].key] ?? '';
          const b = city.variantIntros[GROUP_TYPES[j].key] ?? '';
          if (!a || !b) continue;
          expect(similarity(a, b)).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
        }
      }
    }
  });

  it('city intros differ from each other (G5, no reuse)', () => {
    for (let i = 0; i < PTBR_CITIES.length; i += 1) {
      for (let j = i + 1; j < PTBR_CITIES.length; j += 1) {
        const sim = similarity(PTBR_CITIES[i].intro.join(' '), PTBR_CITIES[j].intro.join(' '));
        expect(sim).toBeLessThan(NEAR_DUPLICATE_THRESHOLD);
      }
    }
  });

  it('idea pages carry 30 ideas across 6 categories (§6.6)', () => {
    for (const city of PTBR_CITIES) {
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

  it('city files cover the full 7-page surface with Portuguese pageTitles', () => {
    const CITY_NAMES: Record<string, string> = {
      'sao-paulo': 'São Paulo',
      'rio-de-janeiro': 'Rio de Janeiro',
      lisbon: 'Lisboa',
    };
    for (const city of PTBR_CITIES) {
      const cityName = CITY_NAMES[city.slug];
      expect(city.pageTitles?.city).toContain('Comunidades');
      expect(city.pageTitles?.cityDescription ?? '').toContain(cityName);
      for (const type of GROUP_TYPES) {
        expect(city.pageTitles?.variants?.[type.key] ?? '').toContain(cityName);
        expect(city.pageTitles?.variantDescriptions?.[type.key] ?? '').toContain(cityName);
      }
      expect(city.pageTitles?.ideas ?? '').toContain('ideias');
    }
  });

  it('dataPoints + faq contract holds (≥3 each)', () => {
    for (const city of PTBR_CITIES) {
      expect(city.dataPoints.length).toBeGreaterThanOrEqual(3);
      expect(city.faq.length).toBeGreaterThanOrEqual(3);
    }
  });
});
