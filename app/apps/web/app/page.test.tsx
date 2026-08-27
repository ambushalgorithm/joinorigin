import { screen, within } from '@testing-library/react';

import { getDictionary } from '@joinorigin/i18n';

import ChipMarqueeServer from '../components/ChipMarqueeServer';
import HomePage, { metadata } from './page';
import { faqEntries, faqNamespace } from '../lib/faq';
import { renderWithI18n } from '../test-utils';

/**
 * Full-page smoke tests for the JoinOrigin homescreen. The typewriter
 * re-types on mount (400ms delay + 20ms/char), so advance timers to reach
 * the final heading state. FAQ content is read from the EN dictionary (the
 * same source the server layout seeds in real requests).
 *
 * Story B (TASK-547): the wrapper passes the server-rendered `ChipMarqueeServer`
 * into the view's `marquee` slot. The server component reads `next/headers`
 * (geo + locale), so this page suite mocks it — its own behaviour is covered
 * in `components/ChipMarqueeServer.test.tsx` — and asserts the slot wiring
 * through the mock being instantiated by the wrapper.
 */

const EN_FAQ = faqEntries(faqNamespace(getDictionary('en'), 'home'));

/** EN concept-tile labels (`common.objects.*` in the EN dictionary), in the
 *  order the home view renders them. */
const EN_CONCEPT_LABELS = [
  'Ideas',
  'Projects',
  'Feed',
  'Origins',
  'Communication',
  'Profiles',
  'Opportunities',
  'Companies',
];

jest.mock('../components/ChipMarqueeServer', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const mockChipMarqueeServer = ChipMarqueeServer as jest.Mock;

function renderPage() {
  return renderWithI18n(<HomePage />);
}

describe('home page', () => {
  it('renders the sticky header with nav links and Get Started CTA', () => {
    renderPage();
    expect(screen.getAllByText('JoinOrigin').length).toBeGreaterThan(0);
    // Nav labels appear in both the header nav and the grouped footer links.
    expect(screen.getAllByText('Features').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Community').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Docs').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByTestId('get-started-button')).toBeInTheDocument();
  });

  it('renders the typewriter hero heading and Start Project CTA', () => {
    renderPage();
    expect(screen.getByTestId('start-project-button')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Create a profile that works like your resume, post your idea as a page, and start an Origin around anything — an idea, a small business, an AI startup, a book club, or a 10k run. Then invite the people who'll move it forward with you.",
      ),
    ).toBeInTheDocument();
  });

  it('renders the orbit visualization and member trust copy', () => {
    renderPage();
    expect(screen.getByTestId('orbit-viz')).toBeInTheDocument();
    expect(screen.getByText('Join 2,400+ builders already collaborating')).toBeInTheDocument();
  });

  it('renders the partner logo ticker and slim footer', () => {
    renderPage();
    expect(screen.getByText('Trusted by teams at')).toBeInTheDocument();
    expect(screen.getByText('Where teams find their Origin')).toBeInTheDocument();
    // Every primary join CTA reads "Get Started" (header, hero, footer).
    expect(screen.getAllByText('Get Started').length).toBeGreaterThanOrEqual(3);
    const footerCta = screen.getByTestId('footer-waitlist-button');
    expect(footerCta).toHaveAttribute('href', '/en/signup');
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('© 2026 JoinOrigin')).toBeInTheDocument();
  });

  it('renders the visible definition paragraph with the exact phrase "space you start around a goal"', () => {
    renderPage();
    // Exact-match the definition paragraph (the same phrase is also the first
    // clause of FAQ answer #1, so a substring query would match both).
    const definition = screen.getByText(
      'Origin is the space you start around a goal — an idea, a startup, a small business, or a project. Bring the people and resources it needs, and move it forward together: co-founders, partners, clients, supporters, and your network. JoinOrigin is the brand and the network behind it.',
    );
    expect(definition.tagName).toBe('P');
    // The exact lowercase phrase must appear in the visible <main> copy
    // (discovery §5.1/§6 — LLM entity clarity).
    expect(definition.textContent?.toLowerCase()).toContain('space you start around a goal');
  });

  it('renders the visible FAQ block with one h2 per question and a p answer', () => {
    renderPage();
    const faqSection = screen.getByLabelText('Frequently asked questions');
    expect(faqSection.tagName).toBe('SECTION');

    for (const faq of EN_FAQ) {
      const question = within(faqSection).getByRole('heading', { level: 2, name: faq.question });
      expect(question).toBeInTheDocument();
      const answer = within(faqSection).getByText(faq.answer);
      expect(answer.tagName).toBe('P');
    }
  });

  it('mirrors the visible FAQ block 1:1 in the FAQPage JSON-LD', () => {
    renderPage();
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const faq = payloads.find((p) => p['@type'] === 'FAQPage');
    expect(faq?.mainEntity).toHaveLength(EN_FAQ.length);
    for (let i = 0; i < EN_FAQ.length; i += 1) {
      expect(faq?.mainEntity[i].name).toBe(EN_FAQ[i].question);
      expect(faq?.mainEntity[i].acceptedAnswer.text).toBe(EN_FAQ[i].answer);
    }
  });

  it('renders the concept tiles as non-interactive static cards (Story A)', () => {
    renderPage();
    // The #concepts anchor stays for deep links from /docs.
    expect(screen.getByRole('heading', { level: 2, name: 'Concepts' })).toHaveAttribute(
      'id',
      'concepts',
    );
    // Story A: the eight concept tiles are informational surfaces — no
    // /docs#concepts links remain and no card title is wrapped in a link
    // (no hover/focus/selected highlight on the tile itself).
    expect(
      screen
        .queryAllByRole('link')
        .filter((link) => link.getAttribute('href') === '/en/docs#concepts'),
    ).toHaveLength(0);
    for (const label of EN_CONCEPT_LABELS) {
      const heading = screen.getByRole('heading', { level: 3, name: label });
      expect(heading.closest('a')).toBeNull();
      expect(heading.closest('article')).not.toBeNull();
    }
  });

  it('renders the server-rendered example-communities marquee slot (Story B)', () => {
    mockChipMarqueeServer.mockClear();
    renderPage();
    // The wrapper passes <ChipMarqueeServer /> into the view's marquee slot —
    // the mock is instantiated exactly once (the view renders the slot).
    expect(mockChipMarqueeServer).toHaveBeenCalledTimes(1);
  });

  it('exports metadata per the arch pattern (title, canonical, keywords)', () => {
    expect(metadata.title).toBe('Origin — Social Collaboration Network & Community OS');
    expect(metadata.description).toContain('space you start around a goal');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/');
    expect(metadata.openGraph?.title).toBe('Origin — Social Collaboration Network & Community OS');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['social collaboration network', 'community OS']),
    );
  });
});
