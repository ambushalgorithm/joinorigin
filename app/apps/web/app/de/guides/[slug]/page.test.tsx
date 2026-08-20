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
 * fe-guides-locale-routes — `/de/guides/[slug]` per-locale route tests
 * (TASK-421, updated TASK-453).
 *
 * After the EN-fallback regeneration the wrapper mirrors the canonical EN
 * route: generateStaticParams enumerates every guide (`GUIDE_SLUGS`), the
 * page loader resolves the committed de content first and EN fallback
 * otherwise (`guidePageForLocale(slug, 'de') ?? guidePageForLocale(slug)`),
 * and metadata carries the de hreflang cluster when the de entry resolves
 * (else the EN canonical metadata).
 *
 * The hasContent spy pins the committed-content state deterministically so
 * the suite stays green both before AND after the Group 3/4 translation
 * roles land.
 */
describe('/de/guides/[slug] route (TASK-421 + TASK-453)', () => {
  it('generateStaticParams emits every guide slug (EN fallback surface)', () => {
    const params = generateStaticParams();
    expect(new Set(params.map((p) => p.slug)).size).toBe(params.length);
    expect(params).toEqual(GUIDE_SLUGS.map((slug) => ({ slug })));
  });

  it('locale content resolves first, EN fallback otherwise; unknown slugs → notFound', () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale === 'de' && slug === 'start-a-community',
    );
    try {
      // The committed guide resolves; untranslated guides fall back to EN
      // via the wrapper loader; unknown slugs stay undefined → notFound.
      expect(guidePageForLocale('start-a-community', 'de')).toBeDefined();
      expect(guidePageForLocale('organize-a-meetup', 'de')).toBeUndefined();
      expect(
        guidePageForLocale('organize-a-meetup', 'de') ?? guidePageForLocale('organize-a-meetup'),
      ).toBeDefined();
      expect(
        guidePageForLocale('not-a-guide', 'de') ?? guidePageForLocale('not-a-guide'),
      ).toBeUndefined();
    } finally {
      hasContentMock.mockRestore();
    }
  });

  it('generateMetadata carries the de hreflang cluster when the de entry resolves', async () => {
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
        en: 'http://localhost:3100/en/guides/start-a-community',
        'x-default': 'http://localhost:3100/en/guides/start-a-community',
      });
    } finally {
      hasContentMock.mockRestore();
    }
  });

  it('generateMetadata falls back to EN copy but keeps canonical/hreflang per-locale (TASK-458)', async () => {
    const hasContentMock = contentModule.hasContent as jest.Mock;
    hasContentMock.mockImplementation(
      (kind: string, slug: string, locale: string) =>
        kind === 'guide' && locale === 'de' && slug === 'start-a-community',
    );
    try {
      const meta = await generateMetadata({
        params: Promise.resolve({ slug: 'organize-a-meetup' }),
      });
      // Untranslated guide → EN copy stays…
      expect(meta.title).toContain('JoinOrigin');
      // …but canonical + hreflang stay per-locale with x-default → EN.
      expect(meta.alternates?.canonical).toBe('http://localhost:3100/de/guides/organize-a-meetup');
      expect(meta.alternates?.languages).toEqual({
        de: 'http://localhost:3100/de/guides/organize-a-meetup',
        en: 'http://localhost:3100/en/guides/organize-a-meetup',
        'x-default': 'http://localhost:3100/en/guides/organize-a-meetup',
      });
    } finally {
      hasContentMock.mockRestore();
    }
  });
});
