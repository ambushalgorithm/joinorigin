import { screen, within } from '@testing-library/react';

import { getDictionary } from '@joinorigin/i18n';

import HomePage, { metadata } from './page';
import { faqEntries, faqNamespace } from '../lib/faq';
import { renderWithI18n } from '../test-utils';

/**
 * Full-page smoke tests for the JoinOrigin homescreen. The typewriter
 * re-types on mount (400ms delay + 20ms/char), so advance timers to reach
 * the final heading state. FAQ content is read from the EN dictionary (the
 * same source the server layout seeds in real requests).
 */

const EN_FAQ = faqEntries(faqNamespace(getDictionary('en'), 'home'));

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
        'Create a profile that works like your resume, post your idea as a page, and start or join a community around anything — a brand-new idea, an existing small business, an AI startup, a book club, or a 10k run.',
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
    expect(screen.getByText('Where teams find their origin')).toBeInTheDocument();
    expect(screen.getByText('Get Discovered')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('© 2026 JoinOrigin')).toBeInTheDocument();
  });

  it('renders the visible definition paragraph with the exact phrase "social collaboration network"', () => {
    renderPage();
    // Exact-match the definition paragraph (the same phrase is also the first
    // clause of FAQ answer #1, so a substring query would match both).
    const definition = screen.getByText(
      'Origin is a social collaboration network — the community OS where your ideas, projects, and communities come together in one organized space. JoinOrigin is the brand and the network behind it.',
    );
    expect(definition.tagName).toBe('P');
    // The exact lowercase phrase must appear in the visible <main> copy
    // (discovery §5.1/§6 — LLM entity clarity).
    expect(definition.textContent?.toLowerCase()).toContain('social collaboration network');
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

  it('renders the concept cards as full-card single wrapping links (Story D)', () => {
    renderPage();
    // Every concept card is one semantic focusable <a> covering the entire
    // card, localized to the docs concepts section (TASK-534, Story D).
    const conceptLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === '/en/docs#concepts');
    expect(conceptLinks.length).toBeGreaterThanOrEqual(8);
    // The link is the card itself: it wraps the card title heading.
    for (const link of conceptLinks) {
      expect(within(link as HTMLElement).getByRole('heading', { level: 3 })).toBeInTheDocument();
    }
  });

  it('exports metadata per the arch pattern (title, canonical, keywords)', () => {
    expect(metadata.title).toBe('JoinOrigin — Social Collaboration Network & Community OS');
    expect(metadata.description).toContain('social collaboration network');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/');
    expect(metadata.openGraph?.title).toBe(
      'JoinOrigin — Social Collaboration Network & Community OS',
    );
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['social collaboration network', 'community OS']),
    );
  });
});
