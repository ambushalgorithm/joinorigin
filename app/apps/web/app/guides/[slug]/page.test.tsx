import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';

import { getDictionary, I18nProvider, type Locale } from '@joinorigin/i18n';

import GuidePage, { generateMetadata, generateStaticParams } from './page';
import { getGuideContent } from '../../../lib/seo/content';
// `guidePageForLocale` is a non-configurable SWC export — replace it with a
// call-through jest.fn (same pattern as the de guide tests TASK-421) so the
// TASK-446 EN-fallback test can pin the locale-surface result deterministically.
jest.mock('../../../lib/seo/guides', () => {
  const actual = jest.requireActual('../../../lib/seo/guides');
  return { ...actual, guidePageForLocale: jest.fn(actual.guidePageForLocale) };
});
import * as guides from '../../../lib/seo/guides';
import { guidePageEntry, guidePageForLocale, guidePath } from '../../../lib/seo/guides';
import { GuideView } from './guide-view';

/**
 * Unit tests for the /guides/[slug] guide page (design §6.2, TASK-309 +
 * TASK-320 + TASK-353): generateStaticParams emits exactly the 12 guide
 * slugs, generateMetadata derives per-guide title/description/canonical, and
 * the page renders a single H1 + visible FAQ block mirrored in FAQPage
 * JSON-LD with the cross-link mesh (hub, sibling guides, city pages), honest
 * CTA, and the JoinOrigin-led structure (intro + per-step JoinOrigin notes).
 *
 * TASK-414: the guide-view footer copy (related-guide card body, city
 * practice line, JoinOrigin CTA body, keep-learning bullets) renders from
 * dictionary keys. The keys are seeded into the test dictionary so the suite
 * is deterministic regardless of merge order with the en-keys role.
 *
 * TASK-444: related-card links resolve through the active locale surface —
 * href via `guidePath(slug, entry.locale)` and title via
 * `guidePageEntry(slug, entry.locale)?.title` (never the humanized slug).
 *
 * TASK-446: the canonical page resolves the ACTIVE server locale (proxy-
 * forwarded `x-joinorigin-locale`) with EN fallback — `getServerLocale` is
 * mocked here. With the `de` cookie the page renders the committed German
 * guide body; when the locale lacks committed content the loader falls back
 * to the EN surface. SEO metadata stays EN (arch-i18n §1.2).
 */

jest.mock('../../../lib/i18n-server', () => ({
  getServerLocale: jest.fn(() => Promise.resolve(mockServerLocale.locale)),
}));

const mockServerLocale: { locale: Locale } = { locale: 'en' };

/** TASK-411 guide-view footer keys (EN source values — mirror en.json after
 *  the i18n-en-keys merge; kept here so the view tests run green in
 *  isolation). */
const GUIDE_FOOTER_CHROME: Record<string, unknown> = {
  continueBuilding: 'Continue building with the next guide in the series.',
  practiceInCity: 'Put these steps into practice in a real city.',
  howJoinOriginHelpsBody:
    'JoinOrigin is a community OS that helps you find or start communities — the steps above work on the platform and with the tools you already have. JoinOrigin handles the structure, discovery, and organization so you can focus on your members. Click Get Started and get discovered.',
  keepLearningGuides: 'Browse all guides on the <1>Community Building hub</1>.',
  keepLearningGlossary: 'Learn the core terms in the <1>Community OS glossary</1>.',
  keepLearningLocations: 'Find a city page on the <1>locations hub</1> to start local.',
};

function renderWithGuideI18n(ui: ReactElement) {
  const en = getDictionary('en');
  const seoContent = (en.seoContent as Record<string, unknown> | undefined) ?? {};
  const guides = (seoContent.guides as Record<string, unknown> | undefined) ?? {};
  const dictionary = {
    ...en,
    seoContent: {
      ...seoContent,
      guides: { ...guides, ...GUIDE_FOOTER_CHROME },
    },
  };
  return render(
    <I18nProvider locale="en" dictionary={dictionary}>
      {ui}
    </I18nProvider>,
  );
}

describe('guides/[slug] page — static params + metadata', () => {
  it('generateStaticParams returns exactly the 12 guide slugs', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(12);
    expect(params.map((p) => p.slug)).toEqual(
      expect.arrayContaining([
        'start-a-community',
        'organize-a-meetup',
        'first-10-members',
        'find-a-co-founder',
        'keep-a-community-active',
        'hybrid-communities',
        'moderation',
        'publish-an-idea',
        'create-a-project',
        'create-a-group',
        'publish-a-small-business-idea',
        'publish-a-startup-concept',
      ]),
    );
  });

  it('generateMetadata derives per-guide title/description/canonical', async () => {
    const entry = guidePageEntry('start-a-community');
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'start-a-community' }),
    });
    expect(metadata.title).toBe(entry?.title);
    expect(metadata.description).toBe(entry?.description);
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/guides/start-a-community');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['start a community', 'community', 'how to', 'guide']),
    );
  });

  it('generateMetadata hreflang: x-default always points at the EN canonical (TASK-421)', async () => {
    // The cluster is complete once per-locale translations land (Group 3/4);
    // whenever it exists, `en` and `x-default` resolve to the EN canonical.
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'start-a-community' }),
    });
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/guides/start-a-community');
    const languages = metadata.alternates?.languages as Record<string, string> | undefined;
    if (languages) {
      expect(languages.en).toBe('http://localhost:3100/guides/start-a-community');
      expect(languages['x-default']).toBe('http://localhost:3100/guides/start-a-community');
    }
  });
});

describe('guide view — single H1 + FAQ mirror + cross-links', () => {
  const slug = 'organize-a-meetup';
  const entry = guidePageEntry(slug);
  const content = getGuideContent(slug, 'en');

  if (!entry || !content) {
    throw new Error('Missing guide fixtures for view tests');
  }

  it('renders a single h1 with the guide title', () => {
    renderWithGuideI18n(<GuideView entry={entry} content={content} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(content.title ?? entry.title);
  });

  it('renders the definitional intro paragraphs and step-by-step structure', () => {
    renderWithGuideI18n(<GuideView entry={entry} content={content} />);
    // The intro is an array of paragraphs — every paragraph renders as its
    // own BodyCopy block (TASK-351 multi-paragraph model).
    for (const paragraph of content.intro) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(
      content.steps.length,
    );
  });

  it('leads with JoinOrigin — intro + every step renders a JoinOrigin note (TASK-320)', () => {
    renderWithGuideI18n(<GuideView entry={entry} content={content} />);
    expect(content.intro.join(' ')).toContain('JoinOrigin');
    // The "How JoinOrigin can help" label renders once per step.
    expect(screen.getAllByText('How JoinOrigin can help').length).toBeGreaterThanOrEqual(
      content.steps.length,
    );
    const firstStep = content.steps[0];
    if (!firstStep) throw new Error('guide must have steps');
    expect(screen.getByText(firstStep.joinOriginNote)).toBeInTheDocument();
  });

  it('renders the FAQ block (JSON-LD mirror is asserted on the server wrapper)', () => {
    renderWithGuideI18n(<GuideView entry={entry} content={content} />);
    const faqQ = content.faq[0];
    if (!faqQ) throw new Error('guide must have FAQ');

    expect(screen.getByText(faqQ.question)).toBeInTheDocument();
    expect(screen.getByText(faqQ.answer)).toBeInTheDocument();
  });

  it('cross-links to the guides hub + sibling guides + flagship cities + waitlist CTA', () => {
    renderWithGuideI18n(<GuideView entry={entry} content={content} />);
    expect(screen.getByText('Related guides')).toBeInTheDocument();
    // JoinOrigin-led: the "How JoinOrigin can help" label appears once per
    // step plus once in the closing CTA band.
    expect(screen.getAllByText('How JoinOrigin can help').length).toBeGreaterThanOrEqual(
      content.steps.length + 1,
    );
    expect(screen.getByTestId('guide-join-button')).toBeInTheDocument();
    // Sibling guide link — resolved through the registry (TASK-444): href via
    // guidePath and title via guidePageEntry, never the humanized slug.
    const relatedSlug = entry.related[0];
    if (!relatedSlug) throw new Error('guide must have related entries');
    const relatedEntry = guidePageEntry(relatedSlug, 'en');
    expect(screen.getByRole('link', { name: relatedEntry?.title ?? relatedSlug })).toHaveAttribute(
      'href',
      guidePath(relatedSlug, 'en'),
    );
    expect(screen.queryByText(relatedSlug.replace(/-/g, ' '))).not.toBeInTheDocument();
    // City cross-links.
    expect(screen.getByText('New York City')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
  });

  it('renders related-card links through the active locale surface (TASK-444)', () => {
    const dePage = guidePageForLocale('organize-a-meetup', 'de');
    if (!dePage) {
      throw new Error('Missing de guide fixture for locale-aware related-link tests');
    }
    renderWithGuideI18n(<GuideView entry={dePage.entry} content={dePage.content} />);

    const firstRelated = dePage.entry.related[0];
    if (!firstRelated) throw new Error('guide must have related entries');
    const relatedEntry = guidePageEntry(firstRelated, 'de');
    // The href must carry the locale prefix and the title must come from the
    // de registry entry (not the humanized slug).
    expect(screen.getByRole('link', { name: relatedEntry?.title ?? firstRelated })).toHaveAttribute(
      'href',
      guidePath(firstRelated, 'de'),
    );
    expect(screen.queryByText(firstRelated.replace(/-/g, ' '))).not.toBeInTheDocument();
  });

  it('renders the Translate this page link with the correct href (TASK-318)', () => {
    renderWithGuideI18n(<GuideView entry={entry} content={content} />);

    const link = screen.getByTestId('translate-page-link');
    expect(link).toHaveTextContent('Translate this page');

    const url = new URL(link.getAttribute('href') ?? '');
    expect(`${url.origin}${url.pathname}`).toBe('https://translate.google.com/translate');
    expect(url.searchParams.get('sl')).toBe('en');
    expect(url.searchParams.get('u')).toBe(window.location.href);
  });

  it('renders the localized footer copy from dictionary keys (TASK-414)', () => {
    renderWithGuideI18n(<GuideView entry={entry} content={content} />);
    // The related-guide card body renders once per sibling guide.
    expect(
      screen.getAllByText('Continue building with the next guide in the series.').length,
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Put these steps into practice in a real city.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'JoinOrigin is a community OS that helps you find or start communities — the steps above work on the platform and with the tools you already have. JoinOrigin handles the structure, discovery, and organization so you can focus on your members. Click Get Started and get discovered.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the keep-learning links from Trans keys (TASK-414)', () => {
    renderWithGuideI18n(<GuideView entry={entry} content={content} />);
    expect(screen.getByRole('link', { name: 'Community Building hub' })).toHaveAttribute(
      'href',
      '/guides',
    );
    expect(screen.getByRole('link', { name: 'Community OS glossary' })).toHaveAttribute(
      'href',
      '/glossary',
    );
    expect(screen.getByRole('link', { name: 'locations hub' })).toHaveAttribute(
      'href',
      '/location',
    );
  });
});

describe('guide page wrapper', () => {
  it('renders GuidePage with a single H1', async () => {
    const page = await GuidePage({ params: Promise.resolve({ slug: 'start-a-community' }) });
    renderWithGuideI18n(page);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it('mirrors the visible FAQ block 1:1 in FAQPage JSON-LD (server wrapper)', async () => {
    const slug = 'start-a-community';
    const content = getGuideContent(slug, 'en');
    if (!content) throw new Error('missing guide content');

    const page = await GuidePage({ params: Promise.resolve({ slug }) });
    renderWithGuideI18n(page);

    // Visible FAQ block.
    const faqQ = content.faq[0];
    if (!faqQ) throw new Error('guide must have FAQ');
    expect(screen.getByText(faqQ.question)).toBeInTheDocument();

    // Mirrored JSON-LD.
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const faq = payloads.find((p) => p['@type'] === 'FAQPage');
    expect(faq?.mainEntity).toHaveLength(content.faq.length);
    expect(faq?.mainEntity?.[0]?.name).toBe(faqQ.question);
  });

  it('renders the forwarded locale’s guide body on the canonical route (TASK-446)', async () => {
    mockServerLocale.locale = 'de';
    try {
      const page = await GuidePage({ params: Promise.resolve({ slug: 'start-a-community' }) });
      renderWithGuideI18n(page);

      const deContent = getGuideContent('start-a-community', 'de');
      const enContent = getGuideContent('start-a-community', 'en');
      if (!deContent || !enContent) throw new Error('missing guide fixtures');

      // The body resolves the active locale — H1 + a step render German.
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings[0]).toHaveTextContent(deContent.title ?? '');
      expect(headings[0]).not.toHaveTextContent(enContent.title ?? '');
      expect(screen.getByText(deContent.steps[0].title)).toBeInTheDocument();

      // The mirrored FAQ JSON-LD matches the German visible block.
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
      const faq = payloads.find((p) => p['@type'] === 'FAQPage');
      expect(faq?.mainEntity?.[0]?.name).toBe(deContent.faq[0].question);
    } finally {
      mockServerLocale.locale = 'en';
    }
  });

  it('falls back to the EN guide body when the active locale has no committed content (TASK-446)', async () => {
    mockServerLocale.locale = 'de';
    const realGuides = jest.requireActual<typeof guides>('../../../lib/seo/guides');
    const forLocaleMock = jest.mocked(guides.guidePageForLocale);
    // Simulate a locale surface that has NOT committed this guide: the
    // canonical route must fall back to the EN surface instead of 404ing.
    forLocaleMock.mockImplementation((slug: string, locale = 'en') =>
      locale === 'en' ? realGuides.guidePageForLocale(slug, 'en') : undefined,
    );
    try {
      const page = await GuidePage({ params: Promise.resolve({ slug: 'start-a-community' }) });
      renderWithGuideI18n(page);

      const enContent = getGuideContent('start-a-community', 'en');
      if (!enContent) throw new Error('missing guide content');
      expect(screen.getAllByRole('heading', { level: 1 })[0]).toHaveTextContent(
        enContent.title ?? '',
      );
      // The loader tried the locale surface first, then the EN fallback.
      expect(forLocaleMock).toHaveBeenCalledWith('start-a-community', 'de');
      expect(forLocaleMock).toHaveBeenCalledWith('start-a-community');
    } finally {
      forLocaleMock.mockRestore();
      mockServerLocale.locale = 'en';
    }
  });
});
