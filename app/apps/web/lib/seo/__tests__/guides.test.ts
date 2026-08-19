import { SUPPORTED_LOCALES } from '@joinorigin/i18n';

// `hasContent` is a non-configurable SWC export — replace it with a
// call-through jest.fn so tests can pin the committed-content state
// deterministically (TASK-421) while defaulting to the real registry.
jest.mock('../content', () => {
  const actual = jest.requireActual('../content');
  return { ...actual, hasContent: jest.fn(actual.hasContent) };
});

import * as contentModule from '../content';
import { getGuideContent, hasContent, listContent } from '../content';
import {
  GLOSSARY_HUB_PATH,
  GUIDES_HUB_PATH,
  GUIDE_SLUGS,
  guideHubLanguagesFor,
  guideHubMetadata,
  guideHubPath,
  guideLanguagesFor,
  guidePageEntries,
  guidePageEntriesWithFallback,
  guidePageEntry,
  guidePageForLocale,
  guidePageMetadata,
  guidePath,
  type GuidePageEntry,
} from '../guides';
import { MIN_PROSE_WORDS, wordCount } from '../locationGates';

/**
 * fe-guides-pages registry + content tests (TASK-309) extended for
 * TASK-320: every guide LEADS with how JoinOrigin solves the
 * connecting-people problem — the intro mentions JoinOrigin and every step
 * carries a per-step `joinOriginNote` (honest early-access framing).
 *
 * Enforces the L1 how-to guide contract (design §6.2): all 12 guides are
 * registered with unique canonical paths, every guide clears the ≥150-word
 * prose gate with FAQ ≥3 pairs + dataPoints ≥3, every guide has a
 * step-by-step structure, and the cross-link mesh (hub + sibling guides +
 * flagship city pages) is present.
 */

describe('lib/seo guides — registry', () => {
  const entries = guidePageEntries();
  const paths = entries.map((entry) => entry.path);

  it('registers exactly the 12 L1 how-to guides in display order', () => {
    expect(GUIDE_SLUGS).toHaveLength(12);
    expect(entries.map((entry) => entry.slug)).toEqual([...GUIDE_SLUGS]);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('derives canonical guide paths under /guides/<slug>', () => {
    expect(entries[0]?.path).toBe('/guides/publish-an-idea');
    for (const entry of entries) {
      expect(entry.path).toBe(`${GUIDES_HUB_PATH}/${entry.slug}`);
      expect(entry.params).toEqual({ slug: entry.slug });
    }
  });

  it('carries titles, descriptions, and deterministic lastModified', () => {
    for (const entry of entries) {
      expect(entry.title).toContain('JoinOrigin');
      expect(entry.description.length).toBeGreaterThan(0);
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.priority).toBeGreaterThan(0);
    }
    // Deterministic — no new Date / Math.random.
    expect(guidePageEntries()).toEqual(entries);
  });

  it('links every guide to its siblings (hub + related mesh)', () => {
    for (const entry of entries) {
      expect(entry.related).toHaveLength(GUIDE_SLUGS.length - 1);
      expect(entry.related).not.toContain(entry.slug);
    }
  });

  it('links every guide back to the flagship city pages', () => {
    for (const entry of entries) {
      const cityPaths = entry.cities.map((city) => city.path);
      expect(cityPaths).toContain('/location/united-states/new-york/new-york');
      expect(cityPaths).toContain('/location/germany/berlin/berlin');
    }
  });

  it('resolves a single guide entry and returns undefined for unknown slugs', () => {
    expect(guidePageEntry('start-a-community')?.slug).toBe('start-a-community');
    expect(guidePageEntry('not-a-guide')).toBeUndefined();
  });

  it('exposes the hub + glossary hub paths', () => {
    expect(GUIDES_HUB_PATH).toBe('/guides');
    expect(GLOSSARY_HUB_PATH).toBe('/glossary');
  });
});

describe('lib/seo guides — content quality gates (§6.2)', () => {
  it('every guide has committed EN content resolving through the registry', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      expect(content).toBeDefined();
      expect(content?.kind).toBe('guide');
      expect(content?.locale).toBe('en');
      expect(content?.slug).toBe(slug);
    }
  });

  it('every guide intro clears the ≥150-word prose gate (G2, paragraphs summed)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const introParagraphs = content?.intro ?? [];
      expect(introParagraphs.length).toBeGreaterThan(0);
      const introWords = introParagraphs.reduce((sum, paragraph) => sum + wordCount(paragraph), 0);
      expect(introWords).toBeGreaterThanOrEqual(MIN_PROSE_WORDS);
    }
  });

  it('every guide welcomes EXISTING projects/companies as well as new ones (TASK-415 reframe)', () => {
    // The platform serves existing projects and companies, not only
    // brand-new ones. Honest framing only — no literal phrase required.
    // Each intro must carry at least one existing-entity signal AND at
    // least one new-entity signal, so the guides read as serving both.
    const existingSignals =
      /existing|already|established|operating|running|growing|reviv|re-energ|years|underway|new home|long after|meeting informally|has been meeting|started months/i;
    const newSignals =
      /new|start|launch|spark|first|begin|brand|fresh|from zero|zero to|just getting/i;
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const intro = (content?.intro ?? []).join(' ');
      expect(intro).toMatch(existingSignals);
      expect(intro).toMatch(newSignals);
    }
  });

  it('every guide carries ≥3 data points + ≥3 FAQ pairs', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      expect(content?.dataPoints.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(content?.faq.length ?? 0).toBeGreaterThanOrEqual(3);
    }
  });

  it('every guide has a step-by-step structure with ≥4 steps', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      expect(content?.steps.length ?? 0).toBeGreaterThanOrEqual(4);
      for (const step of content?.steps ?? []) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.body.length).toBeGreaterThan(0);
      }
    }
  });

  it('every guide leads with JoinOrigin — intro mentions JoinOrigin (TASK-320)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const introParagraphs = content?.intro ?? [];
      const intro = introParagraphs.join(' ');
      expect(intro).toContain('JoinOrigin');
      // The intro leads: the JoinOrigin mention appears inside the first
      // half of the intro, not just as a trailing caveat.
      const mentionIndex = intro.indexOf('JoinOrigin');
      expect(mentionIndex).toBeGreaterThanOrEqual(0);
      expect(mentionIndex).toBeLessThan(intro.length / 2);
    }
  });

  it('every step maps to JoinOrigin via a per-step joinOriginNote (TASK-320)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const steps = content?.steps ?? [];
      expect(steps.length).toBeGreaterThanOrEqual(4);
      for (const step of steps) {
        expect(step.joinOriginNote.length).toBeGreaterThan(0);
        expect(step.joinOriginNote).toContain('JoinOrigin');
      }
    }
  });

  it('sections stay in lockstep with steps (title + body + joinOriginNote)', () => {
    for (const slug of GUIDE_SLUGS) {
      const content = getGuideContent(slug, 'en');
      const steps = content?.steps ?? [];
      const sections = content?.sections ?? [];
      expect(sections).toHaveLength(steps.length);
      steps.forEach((step, index) => {
        expect(sections[index]).toContain(step.title);
        expect(sections[index]).toContain(step.joinOriginNote);
        // The section is a long-form expansion of the step: every substantive
        // word of the step body must appear in the section (word-containment,
        // order-insensitive). This keeps sections↔steps lockstep while
        // tolerating the user's verbatim wording edits in commit 92cd1f4.
        const bodyWords = step.body
          .toLowerCase()
          .split(/[^a-z0-9']+/)
          .filter((word) => word.length > 1);
        const sectionWords = new Set(
          sections[index]
            .toLowerCase()
            .split(/[^a-z0-9']+/)
            .filter((word) => word.length > 1),
        );
        const missing = bodyWords.filter((word) => !sectionWords.has(word));
        expect(missing.length / bodyWords.length).toBeLessThanOrEqual(0.1);
      });
    }
  });

  it('the registry lists guide content alongside location content', () => {
    const enContent = listContent('en');
    const guideCount = enContent.filter((content) => content.kind === 'guide').length;
    expect(guideCount).toBe(12);
  });
});

describe('lib/seo guides — locale-aware loader + hreflang (TASK-421)', () => {
  const NON_EN_LOCALES = SUPPORTED_LOCALES.filter((locale) => locale !== 'en');

  it('exposes locale-prefixed hub + guide paths', () => {
    expect(guideHubPath('en')).toBe('/guides');
    expect(guideHubPath('de')).toBe('/de/guides');
    expect(guidePath('start-a-community')).toBe('/guides/start-a-community');
    expect(guidePath('start-a-community', 'de')).toBe('/de/guides/start-a-community');
    expect(guidePath('start-a-community', 'pt-BR')).toBe('/pt-BR/guides/start-a-community');
  });

  it('registers EN entries with the en locale and unchanged canonical paths', () => {
    const entries = guidePageEntries('en');
    expect(entries).toHaveLength(12);
    for (const entry of entries) {
      expect(entry.locale).toBe('en');
      expect(entry.path).toBe(`${GUIDES_HUB_PATH}/${entry.slug}`);
    }
  });

  it('locale surfaces enumerate ONLY guides with committed translated content', () => {
    for (const locale of NON_EN_LOCALES) {
      const entries = guidePageEntries(locale);
      expect(entries.length).toBeLessThanOrEqual(GUIDE_SLUGS.length);
      for (const entry of entries) {
        // The EN fallback is never enumerated for a per-locale surface —
        // untranslated guides never get locale-prefixed URLs (R5).
        expect(hasContent('guide', entry.slug, locale)).toBe(true);
        expect(entry.locale).toBe(locale);
        expect(entry.path).toBe(`/${locale}${GUIDES_HUB_PATH}/${entry.slug}`);
      }
    }
  });

  it('locale-aware page resolution stays consistent with committed content', () => {
    for (const locale of NON_EN_LOCALES) {
      for (const slug of GUIDE_SLUGS) {
        expect(guidePageForLocale(slug, locale) !== undefined).toBe(
          hasContent('guide', slug, locale),
        );
        expect(guidePageEntry(slug, locale) !== undefined).toBe(hasContent('guide', slug, locale));
      }
    }
    // Unknown slugs never resolve on any surface (→ notFound).
    expect(guidePageForLocale('not-a-guide')).toBeUndefined();
    expect(guidePageForLocale('not-a-guide', 'de')).toBeUndefined();
    expect(guidePageEntry('not-a-guide', 'de')).toBeUndefined();
  });

  it('EN-fallback surfaces list EVERY guide with locale-prefixed paths (TASK-453)', () => {
    for (const locale of NON_EN_LOCALES) {
      const entries = guidePageEntriesWithFallback(locale);
      expect(entries).toHaveLength(GUIDE_SLUGS.length);
      expect(new Set(entries.map((entry) => entry.slug))).toEqual(new Set(GUIDE_SLUGS));
      for (const entry of entries) {
        expect(entry.path).toBe(`/${locale}${GUIDES_HUB_PATH}/${entry.slug}`);
        expect(entry.locale).toBe(locale);
      }
    }
  });

  it('EN-fallback entries resolve the locale title/description, EN otherwise (TASK-453)', () => {
    const entries = guidePageEntriesWithFallback('de');
    // When de content is committed the card uses the de title; when it is
    // not, getGuideContent already EN-falls-back — the helper always has
    // a resolvable title/description.
    const translated = entries.find((entry) => entry.slug === 'start-a-community');
    expect(translated?.title).toBe(getGuideContent('start-a-community', 'de')?.title);
    const untranslated = entries.find((entry) => entry.slug === 'organize-a-meetup');
    expect(untranslated?.title).toBe(getGuideContent('organize-a-meetup', 'de')?.title);
    expect(untranslated?.description).toBe(getGuideContent('organize-a-meetup', 'de')?.description);
  });

  it('locale surfaces emit self + en + x-default → EN canonical hreflang', () => {
    expect(guideLanguagesFor('start-a-community', 'de')).toEqual({
      de: 'http://localhost:3100/de/guides/start-a-community',
      en: 'http://localhost:3100/guides/start-a-community',
      'x-default': 'http://localhost:3100/guides/start-a-community',
    });
    expect(guideHubLanguagesFor('de')).toEqual({
      de: 'http://localhost:3100/de/guides',
      en: 'http://localhost:3100/guides',
      'x-default': 'http://localhost:3100/guides',
    });
  });

  it('guidePageMetadata carries the hreflang cluster for a locale surface entry', () => {
    const deEntry: GuidePageEntry = {
      params: { slug: 'start-a-community' },
      path: '/de/guides/start-a-community',
      slug: 'start-a-community',
      locale: 'de',
      title: 'Gemeinschaft aufbauen | JoinOrigin',
      description: 'Praktische Schritte für den Aufbau von Gemeinschaften.',
      lastModified: '2026-08-14',
      priority: 0.7,
      related: [],
      cities: [],
    };
    const meta = guidePageMetadata(deEntry);
    expect(meta.alternates?.canonical).toBe('http://localhost:3100/de/guides/start-a-community');
    expect(meta.alternates?.languages).toEqual({
      de: 'http://localhost:3100/de/guides/start-a-community',
      en: 'http://localhost:3100/guides/start-a-community',
      'x-default': 'http://localhost:3100/guides/start-a-community',
    });
  });

  it('EN canonical guide pages list every translated locale once translations exist', () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale !== 'en' && (GUIDE_SLUGS as readonly string[]).includes(slug),
    );
    try {
      const languages = guideLanguagesFor('start-a-community', 'en');
      expect(languages?.en).toBe('http://localhost:3100/guides/start-a-community');
      expect(languages?.['x-default']).toBe('http://localhost:3100/guides/start-a-community');
      expect(languages?.de).toBe('http://localhost:3100/de/guides/start-a-community');
      expect(languages?.fa).toBe('http://localhost:3100/fa/guides/start-a-community');
      // en + x-default + one entry per non-EN locale = 22 keys.
      expect(Object.keys(languages ?? {})).toHaveLength(SUPPORTED_LOCALES.length + 1);
    } finally {
      hasContentMock.mockRestore();
    }
  });

  it('EN surfaces omit the hreflang cluster until a translation is committed (phase A parity)', () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(() => false);
    try {
      expect(guideLanguagesFor('start-a-community', 'en')).toBeUndefined();
      expect(guideHubLanguagesFor('en')).toBeUndefined();
    } finally {
      hasContentMock.mockRestore();
    }
  });

  it('guideHubMetadata keeps the EN hub title/description/canonical', () => {
    const meta = guideHubMetadata('en');
    expect(meta.title).toBe('Community Building Guides | JoinOrigin');
    expect(meta.alternates?.canonical).toBe('http://localhost:3100/guides');
    const deHub = guideHubMetadata('de');
    expect(deHub.alternates?.canonical).toBe('http://localhost:3100/de/guides');
    expect(deHub.alternates?.languages).toEqual({
      de: 'http://localhost:3100/de/guides',
      en: 'http://localhost:3100/guides',
      'x-default': 'http://localhost:3100/guides',
    });
  });
});
