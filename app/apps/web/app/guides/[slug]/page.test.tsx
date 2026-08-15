import { screen } from '@testing-library/react';

import { renderWithI18n } from '../../../test-utils';
import GuidePage, { generateMetadata, generateStaticParams } from './page';
import { getGuideContent } from '../../../lib/seo/content';
import { guidePageEntry } from '../../../lib/seo/guides';
import { GuideView } from './guide-view';

/**
 * Unit tests for the /guides/[slug] guide page (design §6.2, TASK-309 +
 * TASK-320): generateStaticParams emits exactly the 7 guide slugs,
 * generateMetadata derives per-guide title/description/canonical, and the
 * page renders a single H1 + visible FAQ block mirrored in FAQPage JSON-LD
 * with the cross-link mesh (hub, sibling guides, city pages), honest CTA,
 * and the JoinOrigin-led structure (intro + per-step JoinOrigin notes).
 */

describe('guides/[slug] page — static params + metadata', () => {
  it('generateStaticParams returns exactly the 7 guide slugs', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(7);
    expect(params.map((p) => p.slug)).toEqual(
      expect.arrayContaining([
        'start-a-community',
        'organize-a-meetup',
        'first-10-members',
        'find-a-co-founder',
        'keep-a-community-active',
        'hybrid-communities',
        'moderation',
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
});

describe('guide view — single H1 + FAQ mirror + cross-links', () => {
  const slug = 'organize-a-meetup';
  const entry = guidePageEntry(slug);
  const content = getGuideContent(slug, 'en');

  if (!entry || !content) {
    throw new Error('Missing guide fixtures for view tests');
  }

  it('renders a single h1 with the guide title', () => {
    renderWithI18n(<GuideView entry={entry} content={content} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(content.title ?? entry.title);
  });

  it('renders the definitional intro paragraphs and step-by-step structure', () => {
    renderWithI18n(<GuideView entry={entry} content={content} />);
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
    renderWithI18n(<GuideView entry={entry} content={content} />);
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
    renderWithI18n(<GuideView entry={entry} content={content} />);
    const faqQ = content.faq[0];
    if (!faqQ) throw new Error('guide must have FAQ');

    expect(screen.getByText(faqQ.question)).toBeInTheDocument();
    expect(screen.getByText(faqQ.answer)).toBeInTheDocument();
  });

  it('cross-links to the guides hub + sibling guides + flagship cities + waitlist CTA', () => {
    renderWithI18n(<GuideView entry={entry} content={content} />);
    expect(screen.getByText('Related guides')).toBeInTheDocument();
    // JoinOrigin-led: the "How JoinOrigin can help" label appears once per
    // step plus once in the closing CTA band.
    expect(screen.getAllByText('How JoinOrigin can help').length).toBeGreaterThanOrEqual(
      content.steps.length + 1,
    );
    expect(screen.getByTestId('guide-join-button')).toBeInTheDocument();
    // Sibling guide link.
    expect(screen.getByText(entry.related[0]?.replace(/-/g, ' ') ?? '')).toBeInTheDocument();
    // City cross-links.
    expect(screen.getByText('New York City')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
  });

  it('renders the Translate this page link with the correct href (TASK-318)', () => {
    renderWithI18n(<GuideView entry={entry} content={content} />);

    const link = screen.getByTestId('translate-page-link');
    expect(link).toHaveTextContent('Translate this page');

    const url = new URL(link.getAttribute('href') ?? '');
    expect(`${url.origin}${url.pathname}`).toBe('https://translate.google.com/translate');
    expect(url.searchParams.get('sl')).toBe('en');
    expect(url.searchParams.get('u')).toBe(window.location.href);
  });
});

describe('guide page wrapper', () => {
  it('renders GuidePage with a single H1', async () => {
    const page = await GuidePage({ params: Promise.resolve({ slug: 'start-a-community' }) });
    renderWithI18n(page);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it('mirrors the visible FAQ block 1:1 in FAQPage JSON-LD (server wrapper)', async () => {
    const slug = 'start-a-community';
    const content = getGuideContent(slug, 'en');
    if (!content) throw new Error('missing guide content');

    const page = await GuidePage({ params: Promise.resolve({ slug }) });
    renderWithI18n(page);

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
});
