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
  guideHeading,
  guideHubFaq,
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
import { flagshipCities } from '../locationView';
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

  it('derives canonical guide paths under /en/guides/<slug> (all-prefixed EN surface)', () => {
    expect(entries[0]?.path).toBe('/en/guides/publish-an-idea');
    for (const entry of entries) {
      expect(entry.path).toBe(`/en${GUIDES_HUB_PATH}/${entry.slug}`);
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

  it('links every guide to the "Start local" content-rich cities (TASK-480: all content-rich, locale area first, capped 6)', () => {
    for (const entry of entries) {
      const cityPaths = entry.cities.map((city) => city.path);
      // Tier-irrelevant: the list shows ALL content-rich cities (not just
      // the two Tier-1 flagships), capped at 6.
      expect(cityPaths).toHaveLength(6);
      // Unprefixed `/location/...` — the client localizePath applies the
      // active locale prefix at render time.
      for (const path of cityPaths) {
        expect(path).toMatch(/^\/location\/[a-z-]+\/[a-z-]+\/[a-z-]+$/);
        expect(path).not.toMatch(/^\/en\//);
      }
    }
    // The active locale's country/area comes first — for the EN surface the
    // English-speaking area ranks ahead of the rest, alphabetically by name.
    expect(entries[0].cities.map((city) => city.name)).toEqual([
      'Austin',
      'Cape Town',
      'Chicago',
      'Dublin',
      'Johannesburg',
      'Lagos',
    ]);
  });

  it('Start-local city links rank the ACTIVE locale area first (TASK-480)', () => {
    // de surface: German cities (Berlin + Munich) lead, then alphabetical.
    const deCities = guidePageEntries('de')[0].cities;
    expect(deCities.map((city) => city.name).slice(0, 2)).toEqual(['Berlin', 'Munich']);
    expect(deCities).toHaveLength(6);
    // es surface: Spanish-speaking cities lead — Barcelona first
    // alphabetically within the es-area set.
    const esCities = guidePageEntries('es')[0].cities;
    expect(esCities[0].name).toBe('Barcelona');
    expect(esCities.map((city) => city.name).slice(0, 3)).toEqual([
      'Barcelona',
      'Barranquilla',
      'Bogota',
    ]);
  });

  it('Start-local lists stay capped at 6 on EVERY locale surface (TASK-480)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const entries = guidePageEntries(locale);
      expect(entries.length).toBeGreaterThan(0);
      expect(entries[0].cities).toHaveLength(6);
    }
  });

  it('Start-local lists mirror the /location flagshipCities list exactly (same source + order, TASK-480)', () => {
    for (const locale of ['en', 'de', 'es', 'ja', 'ar'] as const) {
      const guideCities = guidePageEntries(locale)[0].cities;
      const flagship = flagshipCities(locale);
      expect(guideCities.map((city) => city.name)).toEqual(flagship.map((city) => city.name));
      // The guides view localizes client-side: guide hrefs are unprefixed
      // /location/... while the hub's flagship cards bake the surface prefix.
      expect(guideCities.map((city) => city.path)).toEqual(
        flagship.map((city) => city.path.replace(`/${locale}`, '')),
      );
    }
  });

  it('Start-local hrefs stay unprefixed on every locale surface (client localizePath, TASK-480)', () => {
    for (const locale of SUPPORTED_LOCALES) {
      const entries = guidePageEntries(locale);
      expect(entries.length).toBeGreaterThan(0);
      for (const city of entries[0].cities) {
        expect(city.path).toMatch(/^\/location\//);
        expect(city.path).not.toMatch(/^\/(en|de|es|ja|ar)\//);
      }
    }
  });

  it('resolves a single guide entry and returns undefined for unknown slugs', () => {
    expect(guidePageEntry('start-an-origin')?.slug).toBe('start-an-origin');
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

  it('exposes locale-prefixed hub + guide paths (EN canonical at /en/**)', () => {
    expect(guideHubPath('en')).toBe('/en/guides');
    expect(guideHubPath('de')).toBe('/de/guides');
    expect(guidePath('start-an-origin')).toBe('/en/guides/start-an-origin');
    expect(guidePath('start-an-origin', 'de')).toBe('/de/guides/start-an-origin');
    expect(guidePath('start-an-origin', 'pt-BR')).toBe('/pt-BR/guides/start-an-origin');
  });

  it('path helpers generalize to ANY locale surface (not just de)', () => {
    expect(guideHubPath('es')).toBe('/es/guides');
    expect(guidePath('start-an-origin', 'es')).toBe('/es/guides/start-an-origin');
    expect(guidePath('start-an-origin', 'ja')).toBe('/ja/guides/start-an-origin');
    expect(guideHubPath('zh-CN')).toBe('/zh-CN/guides');
  });

  it('registers EN entries with the en locale and /en/** canonical paths (TASK-466)', () => {
    const entries = guidePageEntries('en');
    expect(entries).toHaveLength(12);
    for (const entry of entries) {
      expect(entry.locale).toBe('en');
      expect(entry.path).toBe(`/en${GUIDES_HUB_PATH}/${entry.slug}`);
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
    const translated = entries.find((entry) => entry.slug === 'start-an-origin');
    expect(translated?.title).toBe(getGuideContent('start-an-origin', 'de')?.title);
    const untranslated = entries.find((entry) => entry.slug === 'organize-a-meetup');
    expect(untranslated?.title).toBe(getGuideContent('organize-a-meetup', 'de')?.title);
    expect(untranslated?.description).toBe(getGuideContent('organize-a-meetup', 'de')?.description);
  });

  it('G-9 — every registry entry separates the document title from the visible H1 (heading drops `| JoinOrigin`)', () => {
    for (const entry of guidePageEntries()) {
      expect(entry.title).toContain('| JoinOrigin');
      expect(entry.heading).toBe(entry.title.replace(/\s*\|\s*JoinOrigin\s*$/, ''));
      expect(entry.heading).not.toContain('| JoinOrigin');
    }
    // The helper honors an authored `heading` override and strips otherwise.
    expect(guideHeading('How to Moderate a Community | JoinOrigin')).toBe(
      'How to Moderate a Community',
    );
    expect(guideHeading('How to Moderate a Community | JoinOrigin', 'Moderate a community')).toBe(
      'Moderate a community',
    );
  });

  it('G-12 — the guides-hub FAQ resolves the translated home FAQ keys per locale', () => {
    const en = guideHubFaq('en');
    expect(en).toHaveLength(5);
    expect(en[0].question).toBe('What is JoinOrigin?');
    const de = guideHubFaq('de');
    expect(de).toHaveLength(5);
    expect(de[0].question).toBe('Was ist JoinOrigin?');
    expect(de[0].answer.length).toBeGreaterThan(0);
  });

  it('locale surfaces emit self + en + x-default → EN canonical hreflang at /en/', () => {
    expect(guideLanguagesFor('start-an-origin', 'de')).toEqual({
      de: 'http://localhost:3100/de/guides/start-an-origin',
      en: 'http://localhost:3100/en/guides/start-an-origin',
      'x-default': 'http://localhost:3100/en/guides/start-an-origin',
    });
    expect(guideHubLanguagesFor('de')).toEqual({
      de: 'http://localhost:3100/de/guides',
      en: 'http://localhost:3100/en/guides',
      'x-default': 'http://localhost:3100/en/guides',
    });
  });

  it('hreflang clusters generalize to ANY locale surface (not just de)', () => {
    expect(guideLanguagesFor('start-an-origin', 'es')).toEqual({
      es: 'http://localhost:3100/es/guides/start-an-origin',
      en: 'http://localhost:3100/en/guides/start-an-origin',
      'x-default': 'http://localhost:3100/en/guides/start-an-origin',
    });
    expect(guideHubLanguagesFor('ja')).toEqual({
      ja: 'http://localhost:3100/ja/guides',
      en: 'http://localhost:3100/en/guides',
      'x-default': 'http://localhost:3100/en/guides',
    });
  });

  it('guidePageMetadata carries the hreflang cluster for a locale surface entry', () => {
    const deEntry: GuidePageEntry = {
      params: { slug: 'start-an-origin' },
      path: '/de/guides/start-an-origin',
      slug: 'start-an-origin',
      locale: 'de',
      title: 'Gemeinschaft aufbauen | JoinOrigin',
      heading: 'Gemeinschaft aufbauen',
      description: 'Praktische Schritte für den Aufbau von Gemeinschaften.',
      lastModified: '2026-08-14',
      priority: 0.7,
      related: [],
      cities: [],
    };
    const meta = guidePageMetadata(deEntry);
    expect(meta.alternates?.canonical).toBe('http://localhost:3100/de/guides/start-an-origin');
    expect(meta.alternates?.languages).toEqual({
      de: 'http://localhost:3100/de/guides/start-an-origin',
      en: 'http://localhost:3100/en/guides/start-an-origin',
      'x-default': 'http://localhost:3100/en/guides/start-an-origin',
    });
  });

  it('guidePageMetadata keeps EN-fallback copy but localizes canonical/hreflang to the surface (TASK-458)', () => {
    const enEntry: GuidePageEntry = {
      params: { slug: 'start-an-origin' },
      path: '/en/guides/start-an-origin',
      slug: 'start-an-origin',
      locale: 'en',
      title: 'How to Start an Origin | JoinOrigin',
      heading: 'How to Start an Origin',
      description: 'Practical, evergreen steps for building and running Origins.',
      lastModified: '2026-08-14',
      priority: 0.7,
      related: [],
      cities: [],
    };
    const meta = guidePageMetadata(enEntry, 'ja');
    // EN copy stays (no committed ja guide content → EN fallback)…
    expect(meta.title).toBe('How to Start an Origin | JoinOrigin');
    expect(meta.description).toContain('Practical, evergreen steps');
    // …but canonical + hreflang stay per-locale with x-default → /en/.
    expect(meta.alternates?.canonical).toBe('http://localhost:3100/ja/guides/start-an-origin');
    expect(meta.alternates?.languages).toEqual({
      ja: 'http://localhost:3100/ja/guides/start-an-origin',
      en: 'http://localhost:3100/en/guides/start-an-origin',
      'x-default': 'http://localhost:3100/en/guides/start-an-origin',
    });
    // Default surface = the entry's own locale: EN canonical at /en/**.
    expect(guidePageMetadata(enEntry).alternates?.canonical).toBe(
      'http://localhost:3100/en/guides/start-an-origin',
    );
  });

  it('EN canonical guide pages emit the FULL 21-locale cluster (G-10)', () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale !== 'en' && (GUIDE_SLUGS as readonly string[]).includes(slug),
    );
    try {
      const languages = guideLanguagesFor('start-an-origin', 'en');
      expect(languages?.en).toBe('http://localhost:3100/en/guides/start-an-origin');
      expect(languages?.['x-default']).toBe('http://localhost:3100/en/guides/start-an-origin');
      expect(languages?.de).toBe('http://localhost:3100/de/guides/start-an-origin');
      expect(languages?.fa).toBe('http://localhost:3100/fa/guides/start-an-origin');
      // en + x-default + one entry per non-EN locale = 22 keys.
      expect(Object.keys(languages ?? {})).toHaveLength(SUPPORTED_LOCALES.length + 1);
    } finally {
      hasContentMock.mockRestore();
    }
  });

  it('EN guide pages + hubs carry the FULL cluster even with zero translations (G-10 — all locale routes are live)', () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(() => false);
    try {
      const languages = guideLanguagesFor('start-an-origin', 'en');
      expect(languages?.en).toBe('http://localhost:3100/en/guides/start-an-origin');
      expect(languages?.de).toBe('http://localhost:3100/de/guides/start-an-origin');
      expect(Object.keys(languages ?? {})).toHaveLength(SUPPORTED_LOCALES.length + 1);
      const hubLanguages = guideHubLanguagesFor('en');
      expect(hubLanguages?.de).toBe('http://localhost:3100/de/guides');
      expect(Object.keys(hubLanguages ?? {})).toHaveLength(SUPPORTED_LOCALES.length + 1);
    } finally {
      hasContentMock.mockRestore();
    }
  });

  it('guideHubMetadata keeps the EN hub title/description/canonical at /en/guides', () => {
    const meta = guideHubMetadata('en');
    expect(meta.title).toBe('Origin Building Guides | JoinOrigin');
    expect(meta.alternates?.canonical).toBe('http://localhost:3100/en/guides');
    const deHub = guideHubMetadata('de');
    expect(deHub.alternates?.canonical).toBe('http://localhost:3100/de/guides');
    expect(deHub.alternates?.languages).toEqual({
      de: 'http://localhost:3100/de/guides',
      en: 'http://localhost:3100/en/guides',
      'x-default': 'http://localhost:3100/en/guides',
    });
  });
});
