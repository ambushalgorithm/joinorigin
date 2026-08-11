import { render, screen, within } from '@testing-library/react';

import HomePage, { metadata } from './page';
import { HOME_FAQ } from './home-data';

/**
 * Full-page smoke tests for the JoinOrigin homescreen. The typewriter
 * re-types on mount (400ms delay + 35ms/char), so advance timers to reach
 * the final heading state.
 */

describe('home page', () => {
  it('renders the sticky header with nav links and Get Started CTA', () => {
    render(<HomePage />);
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
    render(<HomePage />);
    expect(screen.getByTestId('start-project-button')).toBeInTheDocument();
    expect(
      screen.getByText(
        'JoinOrigin brings your community, projects, and conversations into one calm workspace — so your best work finally has a home.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the orbit visualization and member trust copy', () => {
    render(<HomePage />);
    expect(screen.getByTestId('orbit-viz')).toBeInTheDocument();
    expect(screen.getByText('Join 2,400+ builders already collaborating')).toBeInTheDocument();
  });

  it('renders the partner logo ticker and slim footer', () => {
    render(<HomePage />);
    expect(screen.getByText('Trusted by teams at')).toBeInTheDocument();
    expect(screen.getByText('Where work finds its origin')).toBeInTheDocument();
    expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('© 2026 JoinOrigin')).toBeInTheDocument();
  });

  it('renders the visible definition paragraph with the exact phrase "social collaboration network"', () => {
    render(<HomePage />);
    // Exact-match the definition paragraph (the same phrase is also the first
    // clause of FAQ answer #1, so a substring query would match both).
    const definition = screen.getByText(
      'JoinOrigin is a social collaboration network — a community OS that brings your people, communities, projects, and conversations into one calm workspace.',
    );
    expect(definition.tagName).toBe('P');
    // The exact lowercase phrase must appear in the visible <main> copy
    // (discovery §5.1/§6 — LLM entity clarity).
    expect(definition.textContent?.toLowerCase()).toContain('social collaboration network');
  });

  it('renders the visible FAQ block with one h2 per question and a p answer', () => {
    render(<HomePage />);
    const faqSection = screen.getByLabelText('Frequently asked questions');
    expect(faqSection.tagName).toBe('SECTION');

    for (const faq of HOME_FAQ) {
      const question = within(faqSection).getByRole('heading', { level: 2, name: faq.question });
      expect(question).toBeInTheDocument();
      const answer = within(faqSection).getByText(faq.answer);
      expect(answer.tagName).toBe('P');
    }
  });

  it('mirrors the visible FAQ block 1:1 in the FAQPage JSON-LD', () => {
    render(<HomePage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const faq = payloads.find((p) => p['@type'] === 'FAQPage');
    expect(faq?.mainEntity).toHaveLength(HOME_FAQ.length);
    for (let i = 0; i < HOME_FAQ.length; i += 1) {
      expect(faq?.mainEntity[i].name).toBe(HOME_FAQ[i].question);
      expect(faq?.mainEntity[i].acceptedAnswer.text).toBe(HOME_FAQ[i].answer);
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
