import { screen } from '@testing-library/react';

import DocsPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /docs page (discovery §5.5): metadata export per the
 * arch pattern + semantic HTML (single h1, concepts, roadmap, architecture).
 */

describe('docs page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Docs — Concepts, Roadmap & Architecture | JoinOrigin');
    expect(metadata.description).toContain('how Origin works');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/docs');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/docs');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['JoinOrigin docs', 'Matrix community platform']),
    );
  });

  it('renders a single h1 and the definitional intro', () => {
    renderWithI18n(<DocsPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('JoinOrigin docs');
    expect(
      screen.getByText(/the product: a social collaboration network and community OS/i),
    ).toBeInTheDocument();
  });

  it('renders concept definitions for every core object', () => {
    renderWithI18n(<DocsPage />);
    // "Concepts" appears twice after the Sprint 10 redesign: as the sticky
    // anchor-nav link and as the section title.
    expect(screen.getAllByText('Concepts').length).toBeGreaterThanOrEqual(1);
    for (const concept of [
      'Profiles',
      'Communities',
      'Ideas',
      'Communication',
      'Feed',
      'Projects',
      'Companies',
      'Opportunities',
    ]) {
      expect(screen.getByText(concept)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Roadmap').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Architecture & standards').length).toBeGreaterThanOrEqual(1);
    // "Matrix protocol" appears in both the Communication concept and the
    // Architecture section — assert at least one render.
    expect(screen.getAllByText(/open Matrix protocol/i).length).toBeGreaterThan(0);
  });

  it('renders the FAQ block and mirrors it in FAQPage JSON-LD', () => {
    renderWithI18n(<DocsPage />);
    expect(screen.getByText('What is JoinOrigin built on?')).toBeInTheDocument();

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const faq = payloads.find((p) => p['@type'] === 'FAQPage');
    expect(faq?.mainEntity).toHaveLength(4);
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });
});
