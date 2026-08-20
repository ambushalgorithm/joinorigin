import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Locale } from '@joinorigin/i18n';

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
 * TASK-446: the canonical hub builds its view data through the active server
 * locale (proxy-forwarded `x-joinorigin-locale`) — `getServerLocale` is
 * mocked here. With the active `de` locale the hub chrome (guide-link card
 * titles, breadcrumbs) renders German; SEO metadata stays EN (arch-i18n
 * §1.2). Locale is URL-only (TASK-468) — no cookie.
 *
 * Note: the debounce itself is unit-tested in `lib/search/__tests__` with
 * fake timers; here the full page render uses real timers + `waitFor`
 * because the page mounts GSAP Reveal/ScrollTrigger, which is flaky under
 * `jest.useFakeTimers()`.
 */

jest.mock('../../lib/i18n-server', () => ({
  getServerLocale: jest.fn(() => Promise.resolve(mockServerLocale.locale)),
}));

// TASK-480: the hub wrapper threads `getServerCountry()` into the view
// model — a null country (no Cloudflare header in tests) exercises the
// null-safe locale-language fallback ordering.
jest.mock('next/headers', () => ({
  headers: () => ({
    get: () => null,
  }),
}));

const mockServerLocale: { locale: Locale } = { locale: 'en' };

/** Render the (async) hub page; the wrapper returns null only if the hub
 *  entry is missing, which the test fixtures never hit. */
async function renderHubPage() {
  const element = await LocationHubPage();
  if (!element) throw new Error('location hub page returned null');
  renderWithI18n(element);
}

describe('/location hub page', () => {
  it('exports registry-derived metadata with canonical at /en/location + robots', () => {
    expect(metadata.title).toBe(
      'Communities by City — Find or Start a Community Near You | JoinOrigin',
    );
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/en/location');
    expect(metadata.robots).toEqual({ index: true, follow: true });
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/en/location');
  });

  it('renders a single h1 with the hub heading', async () => {
    await renderHubPage();
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Communities by City');
  });

  it('renders breadcrumbs, flagship-city links, guides, and the waitlist CTA', async () => {
    await renderHubPage();

    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Home')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Communities by City')).toBeInTheDocument();

    // TASK-480: the hub links the content-rich flagship list — every
    // content-rich city (tier-irrelevant), the active locale's country/area
    // first, capped at 6 (EN surface → English-speaking area first).
    const flagshipCities = screen.getByTestId('location-flagship-cities');
    const flagshipLinks = within(flagshipCities).getAllByRole('link');
    expect(flagshipLinks).toHaveLength(6);
    expect(within(flagshipCities).getByText('Austin')).toBeInTheDocument();
    expect(within(flagshipCities).getByText('Lagos')).toBeInTheDocument();

    // Guide cross-links.
    const guideLinks = screen.getByTestId('location-guide-links');
    expect(within(guideLinks).getByText('Start a community')).toBeInTheDocument();
    expect(within(guideLinks).getByText('Organize a meetup')).toBeInTheDocument();

    // Waitlist CTA band wired to the analytics source.
    expect(screen.getByTestId('location-cta-band')).toBeInTheDocument();
    expect(screen.getByTestId('location-cta-join-button')).toBeInTheDocument();
  });

  it('renders server-side JSON-LD: BreadcrumbList (no FAQ/ItemList on hub)', async () => {
    await renderHubPage();
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const breadcrumb = payloads.find((p) => p['@type'] === 'BreadcrumbList');
    expect(breadcrumb?.itemListElement).toHaveLength(2);
    expect(payloads.some((p) => p['@type'] === 'FAQPage')).toBe(false);
  });

  it('renders the searchable "Browse locations" directory (TASK-317)', async () => {
    await renderHubPage();

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
    await renderHubPage();

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

  it('splits Browse locations into the 5 TASK-480 sections', async () => {
    await renderHubPage();
    const directory = screen.getByTestId('location-hub-directory');
    for (const section of ['countries', 'regions', 'cities', 'communityTypes', 'eventIdeas']) {
      expect(
        within(directory).getByTestId(`location-hub-directory-${section}`),
      ).toBeInTheDocument();
    }
    // Section headers render from the localized directoryKinds chrome.
    expect(
      within(directory).getByRole('heading', { level: 3, name: 'Country' }),
    ).toBeInTheDocument();
    expect(
      within(directory).getByRole('heading', { level: 3, name: 'Community event ideas' }),
    ).toBeInTheDocument();
  });

  it('filters WITHIN each section — no-match sections collapse (TASK-480)', async () => {
    const user = userEvent.setup();
    await renderHubPage();

    const search = screen.getByRole('searchbox', { name: 'Search locations' });
    await user.type(search, 'berlin');

    await waitFor(() => {
      // The Cities section keeps its Berlin match…
      const cities = screen.getByTestId('location-hub-directory-cities');
      expect(within(cities).getByText('Communities in Berlin')).toBeInTheDocument();
      // …while the Countries section collapses (no country card matches).
      expect(screen.queryByTestId('location-hub-directory-countries')).not.toBeInTheDocument();
      // Community types still match Berlin variants within their section.
      const types = screen.getByTestId('location-hub-directory-communityTypes');
      expect(within(types).getByText('Startup communities in Berlin')).toBeInTheDocument();
    });
  });

  it('shows an empty state when no directory entry matches (TASK-317)', async () => {
    const user = userEvent.setup();
    await renderHubPage();

    const search = screen.getByRole('searchbox', { name: 'Search locations' });
    await user.type(search, 'atlantis');

    await waitFor(() => {
      expect(screen.queryByTestId('location-hub-directory')).not.toBeInTheDocument();
      expect(screen.getByTestId('location-hub-empty')).toHaveTextContent('No locations match');
    });
  });

  it('renders localized hub chrome for the active locale on the canonical route (TASK-446)', async () => {
    mockServerLocale.locale = 'de';
    try {
      await renderHubPage();
      // Guide-link card titles resolve through the forwarded locale's
      // dictionary (not hardcoded EN).
      const guideLinks = screen.getByTestId('location-guide-links');
      expect(within(guideLinks).getByText('Starte eine Community')).toBeInTheDocument();
      expect(within(guideLinks).queryByText('Start a community')).not.toBeInTheDocument();
    } finally {
      mockServerLocale.locale = 'en';
    }
  });
});
