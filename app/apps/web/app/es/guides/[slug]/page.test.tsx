// `hasContent` is a non-configurable SWC export — replace it with a
// call-through jest.fn so tests can pin the committed-content state
// deterministically (TASK-421).
jest.mock('../../../../lib/seo/content', () => {
  const actual = jest.requireActual('../../../../lib/seo/content');
  return { ...actual, hasContent: jest.fn(actual.hasContent) };
});

import * as contentModule from '../../../../lib/seo/content';
import { guidePageEntries, guidePageForLocale } from '../../../../lib/seo/guides';
import { generateMetadata, generateStaticParams } from './page';

/**
 * fe-guides-locale-routes — `/es/guides/[slug]` per-locale route tests
 * (TASK-421). Same wiring as `/de/guides/[slug]`: only committed es guide
 * content enumerates (no EN fallback — R5), metadata carries the full
 * hreflang set, and untranslated slugs resolve to `undefined` → notFound.
 */
describe('/es/guides/[slug] route (TASK-421)', () => {
  it('generateStaticParams mirrors the es entry set', () => {
    expect(generateStaticParams()).toEqual(
      guidePageEntries('es').map((entry) => ({ slug: entry.slug })),
    );
  });

  it('enumerates exactly the committed guides; untranslated → notFound', () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale === 'es' && slug === 'publish-an-idea',
    );
    try {
      expect(generateStaticParams()).toEqual([{ slug: 'publish-an-idea' }]);
      expect(guidePageForLocale('publish-an-idea', 'es')).toBeDefined();
      expect(guidePageForLocale('create-a-project', 'es')).toBeUndefined();
    } finally {
      hasContentMock.mockRestore();
    }
  });

  it('generateMetadata carries the es hreflang cluster when the entry resolves', async () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale === 'es' && slug === 'publish-an-idea',
    );
    try {
      const meta = await generateMetadata({
        params: Promise.resolve({ slug: 'publish-an-idea' }),
      });
      expect(meta.alternates?.canonical).toBe('http://localhost:3100/es/guides/publish-an-idea');
      expect(meta.alternates?.languages).toEqual({
        es: 'http://localhost:3100/es/guides/publish-an-idea',
        en: 'http://localhost:3100/guides/publish-an-idea',
        'x-default': 'http://localhost:3100/guides/publish-an-idea',
      });
    } finally {
      hasContentMock.mockRestore();
    }
  });
});
