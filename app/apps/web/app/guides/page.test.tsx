import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { guidePageEntries } from '../../lib/seo/guides';
import { renderWithI18n } from '../../test-utils';
import GuidesHubPage, { metadata } from './page';

/**
 * Unit tests for the /guides hub (design §6.3 — L2a pillar page):
 * metadata export + single H1 + links to all 12 guides + glossary + city
 * pages, plus the TASK-317 client-side guide-card search/filter (debounced
 * keyword match + empty state).
 *
 * Note: the debounce itself is unit-tested in `lib/search/__tests__` with
 * fake timers; here the full page render uses real timers + `waitFor`
 * because the page mounts GSAP Reveal/ScrollTrigger, which is flaky under
 * `jest.useFakeTimers()`.
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

  it('links all 12 guides', () => {
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

  it('renders a keyboard-accessible search input (TASK-317)', () => {
    renderWithI18n(<GuidesHubPage />);
    const search = screen.getByRole('searchbox', { name: 'Search guides' });
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('type', 'search');
  });

  it('filters guide cards by keyword, case-insensitively, after the debounce (TASK-317)', async () => {
    const user = userEvent.setup();
    renderWithI18n(<GuidesHubPage />);

    const search = screen.getByRole('searchbox', { name: 'Search guides' });
    await user.type(search, 'meetup');

    // All 7 cards render initially; after the debounce only the matching
    // guide remains.
    await waitFor(() => {
      const grid = screen.getByTestId('guides-hub-grid');
      const cards = within(grid).getAllByRole('link');
      expect(cards).toHaveLength(1);
      expect(cards[0]).toHaveAttribute('href', '/guides/organize-a-meetup');
    });
  });

  it('shows an empty state when no guide card matches (TASK-317)', async () => {
    const user = userEvent.setup();
    renderWithI18n(<GuidesHubPage />);

    const search = screen.getByRole('searchbox', { name: 'Search guides' });
    await user.type(search, 'quantum-community');

    await waitFor(() => {
      expect(screen.queryByTestId('guides-hub-grid')).not.toBeInTheDocument();
      expect(screen.getByTestId('guides-hub-empty')).toHaveTextContent('No guides match');
    });
  });
});
