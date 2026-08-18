import { GROUP_TYPES } from '../locationData';
import { MIN_PROSE_WORDS, wordCount } from '../locationGates';

/**
 * i18n-it-s18 (TASK-426) — test dei contenuti tradotti in italiano (it).
 *
 * Verifica che i 12 file guida it + il file città di Milano (it) rispettino
 * lo stesso contratto dei contenuti della fonte EN (kind/locale/slug,
 * prosa introduttiva ≥150 parole G2, ≥3 data point + ≥3 coppie FAQ,
 * struttura passo dopo passo con note JoinOrigin per passo, prosa e
 * arricchimento per variante, pagina con 30 idee) prima che TASK-442 li
 * registri nel registro dei contenuti.
 *
 * I file vengono importati DIRETTAMENTE (non tramite il registro) così
 * questi test funzionano indipendentemente dalla tempistica del ruolo di
 * registrazione.
 */

import createAGroupGuideIt from '../content/it/guide/create-a-group';
import createAProjectGuideIt from '../content/it/guide/create-a-project';
import findACoFounderGuideIt from '../content/it/guide/find-a-co-founder';
import first10MembersGuideIt from '../content/it/guide/first-10-members';
import hybridCommunitiesGuideIt from '../content/it/guide/hybrid-communities';
import keepCommunityActiveGuideIt from '../content/it/guide/keep-a-community-active';
import moderationGuideIt from '../content/it/guide/moderation';
import organizeMeetupGuideIt from '../content/it/guide/organize-a-meetup';
import publishAnIdeaGuideIt from '../content/it/guide/publish-an-idea';
import publishASmallBusinessIdeaGuideIt from '../content/it/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideIt from '../content/it/guide/publish-a-startup-concept';
import startCommunityGuideIt from '../content/it/guide/start-a-community';
import milanCityIt from '../content/it/city/milan';

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

const itGuides = [
  createAGroupGuideIt,
  createAProjectGuideIt,
  findACoFounderGuideIt,
  first10MembersGuideIt,
  hybridCommunitiesGuideIt,
  keepCommunityActiveGuideIt,
  moderationGuideIt,
  organizeMeetupGuideIt,
  publishAnIdeaGuideIt,
  publishASmallBusinessIdeaGuideIt,
  publishAStartupConceptGuideIt,
  startCommunityGuideIt,
];

describe('lib/seo content — guide tradotte in italiano (it) (TASK-426)', () => {
  it('registra 12 guide it con kind/locale/slug corretti', () => {
    expect(itGuides).toHaveLength(GUIDE_SLUGS.length);
    for (const [index, guide] of itGuides.entries()) {
      expect(guide.kind).toBe('guide');
      expect(guide.locale).toBe('it');
      expect(guide.slug).toBe(GUIDE_SLUGS[index]);
    }
  });

  it('ogni guida it ha un intro che supera la soglia di prosa ≥150 parole (G2, paragrafi sommati)', () => {
    for (const guide of itGuides) {
      const introParagraphs = guide.intro ?? [];
      expect(introParagraphs.length).toBeGreaterThan(0);
      const introWords = introParagraphs.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('ogni guida it ha ≥3 data point + ≥3 coppie FAQ + un titolo', () => {
    for (const guide of itGuides) {
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

  it('ogni guida it ha una struttura passo dopo passo con ≥4 passi + note JoinOrigin per passo', () => {
    for (const guide of itGuides) {
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

  it("ogni guida it menziona JoinOrigin nell'intro (lead TASK-320)", () => {
    for (const guide of itGuides) {
      const intro = (guide.intro ?? []).join(' ');
      expect(intro).toContain('JoinOrigin');
    }
  });
});

describe('lib/seo content — traduzione della città di Milano (it) (TASK-426)', () => {
  it('dichiara kind/locale/slug corretti', () => {
    expect(milanCityIt.kind).toBe('city');
    expect(milanCityIt.locale).toBe('it');
    expect(milanCityIt.slug).toBe('milan');
  });

  it("l'intro supera la soglia di prosa ≥150 parole (G2, paragrafi sommati)", () => {
    const introWords = (milanCityIt.intro ?? []).reduce(
      (sum, paragraph) => sum + wordCount(paragraph),
      0,
    );
    expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
  });

  it('ha ≥3 data point + ≥3 coppie FAQ + titolo/descrizione', () => {
    expect(milanCityIt.title).toContain('JoinOrigin');
    expect(milanCityIt.description?.length ?? 0).toBeGreaterThan(0);
    expect(milanCityIt.dataPoints.length).toBeGreaterThanOrEqual(3);
    expect(milanCityIt.faq.length).toBeGreaterThanOrEqual(3);
  });

  it('ha prosa per variante ≥150 parole + arricchimento (sedi 4–6, formati 4–5, comeIniziare 3)', () => {
    for (const type of GROUP_TYPES) {
      const prose = milanCityIt.variantIntros[type.key] ?? '';
      expect(prose.length).toBeGreaterThan(0);
      expect(wordCount(prose)).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);

      const enrichment = milanCityIt.variantEnrichment?.[type.key];
      expect(enrichment).toBeDefined();
      if (!enrichment) continue;
      expect(enrichment.venues.length).toBeGreaterThanOrEqual(4);
      expect(enrichment.venues.length).toBeLessThanOrEqual(6);
      expect(enrichment.formats.length).toBeGreaterThanOrEqual(4);
      expect(enrichment.formats.length).toBeLessThanOrEqual(5);
      expect(enrichment.howToStart).toHaveLength(3);
    }
  });

  it('ha una pagina con 30 idee in 6 categorie da 5 idee ciascuna', () => {
    expect(milanCityIt.ideaPage.intro.length).toBeGreaterThan(0);
    expect(milanCityIt.ideaPage.categories).toHaveLength(6);
    for (const category of milanCityIt.ideaPage.categories) {
      expect(category.ideas).toHaveLength(5);
      for (const idea of category.ideas) {
        expect(idea.title.length).toBeGreaterThan(0);
        expect(idea.pitch.length).toBeGreaterThan(0);
        expect(idea.audience.length).toBeGreaterThan(0);
        expect(idea.venueType.length).toBeGreaterThan(0);
      }
    }
    expect(milanCityIt.ideaPage.faq.length).toBeGreaterThanOrEqual(3);
  });

  it('include pageTitles espliciti per la superficie it', () => {
    expect(milanCityIt.pageTitles?.city).toContain('Milano');
    expect(milanCityIt.pageTitles?.ideas).toContain('Milano');
    expect(milanCityIt.pageTitles?.variants?.startup).toContain('Milano');
  });
});
