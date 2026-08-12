import { render, screen } from '@testing-library/react';

import FeaturesPage, { metadata } from './page';

/**
 * Unit tests for the /features page (discovery §5.2): metadata export per the
 * arch pattern + semantic HTML (single h1, comparison table, FAQ).
 */

describe('features page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe(
      'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
    );
    expect(metadata.description).toContain('social collaboration network');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/features');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/features');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['community platform features', 'community chat']),
    );
  });

  it('renders a single h1 and the definitional intro', () => {
    render(<FeaturesPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Everything a community needs, in one calm workspace');
    expect(
      screen.getByText(/built around eight core objects: profiles, ideas, communities/i),
    ).toBeInTheDocument();
  });

  it('renders core-object cards, the comparison table, and the roadmap', () => {
    render(<FeaturesPage />);
    // "Core objects" appears twice after the redesign: as the hero eyebrow
    // chip and as the section title (spec sprint-8 §6 eyebrow table).
    expect(screen.getAllByText('Core objects').length).toBeGreaterThanOrEqual(1);
    for (const object of [
      'Profiles',
      'Ideas',
      'Communities',
      'Communication',
      'Feed',
      'Projects',
    ]) {
      expect(screen.getByText(object)).toBeInTheDocument();
    }
    const table = screen.getByTestId('features-comparison-table');
    expect(table.tagName).toBe('TABLE');
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Roadmap')).toBeInTheDocument();
    expect(screen.getByText(/Phase 1 — Community Foundation/)).toBeInTheDocument();
  });

  it('renders the FAQ block and mirrors it in FAQPage JSON-LD', () => {
    render(<FeaturesPage />);
    expect(screen.getByText('How is JoinOrigin different from Discord?')).toBeInTheDocument();

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const faq = payloads.find((p) => p['@type'] === 'FAQPage');
    expect(faq?.mainEntity).toHaveLength(4);
    expect(faq?.mainEntity[0].name).toBe('How is JoinOrigin different from Discord?');
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });
});
