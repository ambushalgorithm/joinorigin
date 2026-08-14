import { screen } from '@testing-library/react';

import { guidePageEntries } from '../../lib/seo/guides';
import { renderWithI18n } from '../../test-utils';
import GuidesHubPage, { metadata } from './page';

/**
 * Unit tests for the /guides hub (design §6.3 — L2a pillar page):
 * metadata export + single H1 + links to all 7 guides + glossary + city pages.
 */

describe('guides hub page', () => {
  it('exports hub metadata (title, description, canonical)', () => {
    expect(metadata.title).toBe('Community Building Guides | JoinOrigin');
    expect(metadata.description?.toLowerCase() ?? '').toContain('community building');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/guides');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/guides');
  });

  it('renders a single h1', () => {
    renderWithI18n(<GuidesHubPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Community Building Guides');
  });

  it('links all 7 guides', () => {
    renderWithI18n(<GuidesHubPage />);
    for (const entry of guidePageEntries()) {
      expect(screen.getByRole('link', { name: entry.title })).toHaveAttribute('href', entry.path);
    }
  });

  it('links the glossary and the flagship city pages', () => {
    renderWithI18n(<GuidesHubPage />);
    expect(screen.getByRole('link', { name: 'Community OS glossary' })).toHaveAttribute(
      'href',
      '/glossary',
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
    renderWithI18n(<GuidesHubPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });
});
