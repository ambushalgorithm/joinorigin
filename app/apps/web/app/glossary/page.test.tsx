import { screen } from '@testing-library/react';

import { renderWithI18n } from '../../test-utils';
import GlossaryHubPage, { metadata } from './page';

/**
 * Unit tests for the /glossary hub (design §6.3 — L2b hub; term pages
 * deferred in Sprint 12): metadata export + single H1 + seeded term list +
 * cross-links to guides + city pages.
 */

describe('glossary hub page', () => {
  it('exports hub metadata (title, description, canonical)', () => {
    expect(metadata.title).toBe('Community OS Glossary | JoinOrigin');
    expect(metadata.description).toContain('community building');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/glossary');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/glossary');
  });

  it('renders a single h1', () => {
    renderWithI18n(<GlossaryHubPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Community OS Glossary');
  });

  it('lists the seeded terms (term pages deferred)', () => {
    renderWithI18n(<GlossaryHubPage />);
    expect(screen.getByText('Terms we will define')).toBeInTheDocument();
    for (const term of ['Community', 'Moderation', 'Hybrid events', 'Co-founder']) {
      expect(screen.getAllByText(term).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('cross-links to the guides hub and the flagship city pages', () => {
    renderWithI18n(<GlossaryHubPage />);
    expect(screen.getByRole('link', { name: 'Community Building guides' })).toHaveAttribute(
      'href',
      '/guides',
    );
    expect(screen.getByRole('link', { name: 'New York City' })).toHaveAttribute(
      'href',
      '/location/united-states/new-york/new-york',
    );
    expect(screen.getByRole('link', { name: 'Berlin' })).toHaveAttribute(
      'href',
      '/location/germany/berlin/berlin',
    );
  });

  it('renders the BreadcrumbList JSON-LD', () => {
    renderWithI18n(<GlossaryHubPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });
});
