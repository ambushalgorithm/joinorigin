// `hasContent` is a non-configurable SWC export — replace it with a
// call-through jest.fn so tests can pin the committed-content state
// deterministically (TASK-421, updated TASK-453).
jest.mock('../../../../lib/seo/content', () => {
  const actual = jest.requireActual('../../../../lib/seo/content');
  return { ...actual, hasContent: jest.fn(actual.hasContent) };
});

import * as contentModule from '../../../../lib/seo/content';
import { GUIDE_SLUGS, guidePageForLocale } from '../../../../lib/seo/guides';
import { generateMetadata, generateStaticParams } from './page';

/**
 * fe-guides-locale-routes — `/es/guides/[slug]` per-locale route tests
 * (TASK-421, updated TASK-453). Same wiring as `/de/guides/[slug]` after
 * the EN-fallback regeneration: generateStaticParams enumerates every
 * guide, the page loader resolves the committed es content first and EN
 * fallback otherwise, and metadata carries the es hreflang cluster when
 * the es entry resolves (else the EN canonical metadata).
 */
describe('/es/guides/[slug] route (TASK-421 + TASK-453)', () => {
  it('generateStaticParams emits every guide slug (EN fallback surface)', () => {
    expect(generateStaticParams()).toEqual(GUIDE_SLUGS.map((slug) => ({ slug })));
  });

  it('locale content resolves first, EN fallback otherwise', () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale === 'es' && slug === 'publish-an-idea',
    );
    try {
      expect(guidePageForLocale('publish-an-idea', 'es')).toBeDefined();
      expect(guidePageForLocale('create-a-project', 'es')).toBeUndefined();
      expect(
        guidePageForLocale('create-a-project', 'es') ?? guidePageForLocale('create-a-project'),
      ).toBeDefined();
    } finally {
      hasContentMock.mockRestore();
    }
  });

  it('generateMetadata carries the es hreflang cluster when the es entry resolves', async () => {
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

  it('generateMetadata falls back to the EN entry for untranslated guides', async () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale === 'es' && slug === 'publish-an-idea',
    );
    try {
      const meta = await generateMetadata({
        params: Promise.resolve({ slug: 'create-a-project' }),
      });
      expect(meta.alternates?.canonical).toBe('http://localhost:3100/guides/create-a-project');
      expect(meta.alternates?.languages).toBeUndefined();
    } finally {
      hasContentMock.mockRestore();
    }
  });
});
