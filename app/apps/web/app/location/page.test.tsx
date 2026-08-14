import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LocationHubPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * fe-location-pages hub page tests (TASK-308) + TASK-317 hub search/filter.
 *
 * Asserts the `/location` hub server wrapper exports registry-derived
 * metadata (canonical, OG, robots), renders the hub view with the
 * internal-link mesh (group types + guide links) and the waitlist CTA, and
 * the client-side "Browse locations" filter (debounced keyword match with
 * an empty state).
 *
 * Note: the debounce itself is unit-tested in `lib/search/__tests__` with
 * fake timers; here the full page render uses real timers + `waitFor`
 * because the page mounts GSAP Reveal/ScrollTrigger, which is flaky under
 * `jest.useFakeTimers()`.
 */

describe('/location hub page', () => {
  it('exports registry-derived metadata with canonical + robots', () => {
    expect(metadata.title).toBe(
      'Communities by City — Find or Start a Community Near You | JoinOrigin',
    );
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/location');
    expect(metadata.robots).toEqual({ index: true, follow: true });
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/location');
  });

  it('renders a single h1 with the hub heading', () => {
    renderWithI18n(<LocationHubPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Communities by City');
  });

  it('renders breadcrumbs, flagship-city links, guides, and the waitlist CTA', () => {
    renderWithI18n(<LocationHubPage />);

    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Home')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Communities by City')).toBeInTheDocument();

    // The hub links the two flagship cities (the browsable entry points).
    const flagshipCities = screen.getByTestId('location-sibling-cities');
    expect(within(flagshipCities).getByText('New York City')).toBeInTheDocument();
    expect(within(flagshipCities).getByText('Berlin')).toBeInTheDocument();

    // Guide cross-links.
    const guideLinks = screen.getByTestId('location-guide-links');
    expect(within(guideLinks).getByText('Start a community')).toBeInTheDocument();
    expect(within(guideLinks).getByText('Organize a meetup')).toBeInTheDocument();

    // Waitlist CTA band wired to the analytics source.
    expect(screen.getByTestId('location-cta-band')).toBeInTheDocument();
    expect(screen.getByTestId('location-cta-join-button')).toBeInTheDocument();
  });

  it('renders server-side JSON-LD: BreadcrumbList (no FAQ/ItemList on hub)', () => {
    renderWithI18n(<LocationHubPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const breadcrumb = payloads.find((p) => p['@type'] === 'BreadcrumbList');
    expect(breadcrumb?.itemListElement).toHaveLength(2);
    expect(payloads.some((p) => p['@type'] === 'FAQPage')).toBe(false);
  });

  it('renders the searchable "Browse locations" directory (TASK-317)', () => {
    renderWithI18n(<LocationHubPage />);

    // Search input is keyboard accessible via an aria-label.
    const search = screen.getByRole('searchbox', { name: 'Search locations' });
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('type', 'search');

    // Full indexable set rendered initially (registry-driven).
    const directory = screen.getByTestId('location-hub-directory');
    expect(within(directory).getByText('Communities in Berlin')).toBeInTheDocument();
    expect(within(directory).getByText('Communities in the United States')).toBeInTheDocument();
  });

  it('filters the directory by keyword, case-insensitively, after the debounce (TASK-317)', async () => {
    const user = userEvent.setup();
    renderWithI18n(<LocationHubPage />);

    const search = screen.getByRole('searchbox', { name: 'Search locations' });
    await user.type(search, 'berlin');

    // Debounce (~180ms real time) must elapse before the visible set changes.
    await waitFor(() => {
      const directory = screen.getByTestId('location-hub-directory');
      expect(within(directory).getByText('Communities in Berlin')).toBeInTheDocument();
      expect(
        within(directory).queryByText('Communities in the United States'),
      ).not.toBeInTheDocument();
    });

    // Case-insensitive: uppercase query matches lowercase entries.
    await user.clear(search);
    await user.type(search, 'STARTUP');

    await waitFor(() => {
      const directory = screen.getByTestId('location-hub-directory');
      expect(within(directory).getByText('Startup communities in Berlin')).toBeInTheDocument();
      expect(within(directory).queryByText('Communities in Berlin')).not.toBeInTheDocument();
    });
  });

  it('shows an empty state when no directory entry matches (TASK-317)', async () => {
    const user = userEvent.setup();
    renderWithI18n(<LocationHubPage />);

    const search = screen.getByRole('searchbox', { name: 'Search locations' });
    await user.type(search, 'atlantis');

    await waitFor(() => {
      expect(screen.queryByTestId('location-hub-directory')).not.toBeInTheDocument();
      expect(screen.getByTestId('location-hub-empty')).toHaveTextContent('No locations match');
    });
  });
});
