// `hasContent` is a non-configurable SWC export — replace it with a
// call-through jest.fn so tests can pin the committed-content state
// deterministically (TASK-421).
jest.mock('../../../../lib/seo/content', () => {
  const actual = jest.requireActual('../../../../lib/seo/content');
  return { ...actual, hasContent: jest.fn(actual.hasContent) };
});

import * as contentModule from '../../../../lib/seo/content';
import { GUIDE_SLUGS, guidePageEntries, guidePageForLocale } from '../../../../lib/seo/guides';
import { generateMetadata, generateStaticParams } from './page';

/**
 * fe-guides-locale-routes — `/de/guides/[slug]` per-locale route tests
 * (TASK-421).
 *
 * Mirrors the `/de/location` wiring: generateStaticParams enumerates only
 * guides with committed de content (no EN fallback — localization R5),
 * metadata emits the full hreflang set (de self + en + x-default → EN),
 * and untranslated slugs resolve through the locale-aware loader to
 * `undefined` → `notFound()`.
 *
 * The hasContent spy pins the committed-content state deterministically so
 * the suite stays green both before AND after the Group 3/4 translation
 * roles land.
 */
describe('/de/guides/[slug] route (TASK-421)', () => {
  it('generateStaticParams emits only guides with committed de content', () => {
    const params = generateStaticParams();
    expect(new Set(params.map((p) => p.slug)).size).toBe(params.length);
    for (const p of params) {
      expect(GUIDE_SLUGS).toContain(p.slug);
    }
    // The registry is the single source: static params = the de entry set.
    expect(params).toEqual(guidePageEntries('de').map((entry) => ({ slug: entry.slug })));
  });

  it('enumerates exactly the committed guides; untranslated → notFound', () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale === 'de' && slug === 'start-a-community',
    );
    try {
      expect(generateStaticParams()).toEqual([{ slug: 'start-a-community' }]);
      // The committed guide resolves; any other slug stays untranslated.
      expect(guidePageForLocale('start-a-community', 'de')).toBeDefined();
      expect(guidePageForLocale('organize-a-meetup', 'de')).toBeUndefined();
      expect(guidePageForLocale('not-a-guide', 'de')).toBeUndefined();
    } finally {
      hasContentMock.mockRestore();
    }
  });

  it('generateMetadata carries the de hreflang cluster when the entry resolves', async () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale === 'de' && slug === 'start-a-community',
    );
    try {
      const meta = await generateMetadata({
        params: Promise.resolve({ slug: 'start-a-community' }),
      });
      expect(meta.alternates?.canonical).toBe('http://localhost:3100/de/guides/start-a-community');
      expect(meta.alternates?.languages).toEqual({
        de: 'http://localhost:3100/de/guides/start-a-community',
        en: 'http://localhost:3100/guides/start-a-community',
        'x-default': 'http://localhost:3100/guides/start-a-community',
      });
    } finally {
      hasContentMock.mockRestore();
    }
  });
});
