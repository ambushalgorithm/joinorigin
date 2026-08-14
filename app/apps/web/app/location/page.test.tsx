import { screen, within } from '@testing-library/react';

import LocationHubPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * fe-location-pages hub page tests (TASK-308).
 *
 * Asserts the `/location` hub server wrapper exports registry-derived
 * metadata (canonical, OG, robots) and renders the hub view with the
 * internal-link mesh (group types + guide links) and the waitlist CTA.
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
});
