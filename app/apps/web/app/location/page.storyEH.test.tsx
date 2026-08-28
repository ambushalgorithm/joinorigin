import { screen, within } from '@testing-library/react';

import type { Locale } from '@joinorigin/i18n';

import LocationHubPage from './page';
import { LocationView } from '../../components/location/LocationView';
import { renderWithI18n } from '../../test-utils';
import { buildLocationViewData, resolveLocationEntry } from '../../lib/seo/locationView';

/**
 * fe-location-pages — page-level render assertions for Story E (TASK-497)
 * and Story H (TASK-518).
 *
 * Split from `page.test.tsx` under the 600-line test-file cap (TASK-521/523
 * pattern). These suites drive the real `LocationView` fed with the same
 * registry view data the country/region/city route wrappers build
 * (`buildLocationViewData`), so the country mesh, region mesh, city sibling
 * fallback, FAQ copy replacement, and localized H1/breadcrumb/directory
 * chrome all render through the actual page surface.
 */

jest.mock('../../lib/i18n-server', () => ({
  getServerLocale: jest.fn(() => Promise.resolve(mockServerLocale.locale)),
}));

// The hub wrapper threads `getServerCountry()` into the view model — a null
// country (no Cloudflare header in tests) exercises the null-safe
// locale-language fallback ordering.
jest.mock('next/headers', () => ({
  headers: () => ({
    get: () => null,
  }),
}));

const mockServerLocale: { locale: Locale } = { locale: 'en' };

/**
 * Story E (TASK-497) — page-level render assertions for the location page
 * completeness work (TASK-496). These drive the real `LocationView` fed with
 * the same registry view data the country/region/city route wrappers build
 * (`buildLocationViewData`), so the country mesh (facts + countryName), the
 * region mesh (cities + FAQ), the city sibling fallback, and the FAQ copy
 * replacement all render through the actual page surface.
 */
describe('/location page — Story E country/region/city render (TASK-497)', () => {
  beforeEach(() => {
    mockServerLocale.locale = 'en';
  });

  it('renders the country page: Country facts label + authored points + mesh + FAQ (Story G)', () => {
    const colombia = resolveLocationEntry({ country: 'colombia' });
    expect(colombia).toBeDefined();
    const data = buildLocationViewData(colombia!);
    renderWithI18n(<LocationView data={data} />);

    // Kind-appropriate "Country facts" label — never "City facts".
    expect(screen.getByRole('heading', { level: 2, name: 'Country facts' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2, name: 'City facts' })).not.toBeInTheDocument();

    // Authored data points render (Story G authored every content-rich country).
    const points = screen.getByTestId('location-data-points');
    expect(
      within(points).getByText(
        'Population of roughly 49.6 million across 32 departments plus the capital district.',
      ),
    ).toBeInTheDocument();

    // The country mesh section: countryName heading + content-rich city cards.
    const mesh = screen.getByTestId('location-country-mesh');
    expect(within(mesh).getByTestId('location-country-name')).toHaveTextContent('Colombia');
    const cityCards = within(within(mesh).getByTestId('location-country-cities')).getAllByRole(
      'link',
    );
    expect(cityCards.length).toBeGreaterThan(0);

    // Authored FAQ renders (Story G authored every content-rich country).
    const faq = screen.getByTestId('location-faq');
    expect(within(faq).getByText('How do I find Origins in Colombia?')).toBeInTheDocument();
    expect(
      within(faq).getByText('What makes Colombian community culture distinctive?'),
    ).toBeInTheDocument();
  });

  it('renders the region page (japan/osaka): Region facts + region mesh + FAQ (Story G)', () => {
    const osaka = resolveLocationEntry({ country: 'japan', region: 'osaka' });
    expect(osaka).toBeDefined();
    const data = buildLocationViewData(osaka!);
    renderWithI18n(<LocationView data={data} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Region facts' })).toBeInTheDocument();
    const points = screen.getByTestId('location-data-points');
    expect(
      within(points).getByText('Osaka Prefecture hosts Osaka, the commercial heart of Kansai.'),
    ).toBeInTheDocument();

    const mesh = screen.getByTestId('location-region-mesh');
    expect(within(mesh).getByTestId('location-region-name')).toHaveTextContent('Osaka Prefecture');
    // Story D full-card links (TASK-533): the whole card is one wrapping link
    // whose accessible name includes the city title + explore label.
    const cityGrid = within(mesh).getByTestId('location-region-cities');
    expect(within(cityGrid).getByRole('link', { name: /Osaka/ })).toBeInTheDocument();

    const faq = screen.getByTestId('location-faq');
    expect(
      within(faq).getByText('Is the Osaka region different from the Osaka city scene?'),
    ).toBeInTheDocument();
  });

  it('renders the jakarta nearby section from same-country fallback cities', () => {
    const jakarta = resolveLocationEntry({
      country: 'indonesia',
      region: 'jakarta',
      city: 'jakarta',
    });
    expect(jakarta).toBeDefined();
    const data = buildLocationViewData(jakarta!);
    renderWithI18n(<LocationView data={data} />);

    const siblingGrid = screen.getByTestId('location-sibling-cities');
    const links = within(siblingGrid).getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    // Jakarta has no same-region siblings — the fallback renders same-country
    // cities (Surabaya/Bandung/Bekasi) on the ACTIVE locale surface. Story D
    // full-card links (TASK-533): each card is one wrapping link whose href is
    // registry-exact and whose accessible name includes the city title.
    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs.every((href) => href?.startsWith('/en/location/indonesia/'))).toBe(true);
    expect(within(siblingGrid).getByRole('link', { name: /Surabaya/ })).toBeInTheDocument();
    expect(within(siblingGrid).getByRole('link', { name: /Bandung/ })).toBeInTheDocument();
  });

  it('renders FAQ answers with the sourcing statement — never the old fabrication line', () => {
    const jakarta = resolveLocationEntry({
      country: 'indonesia',
      region: 'jakarta',
      city: 'jakarta',
    });
    const data = buildLocationViewData(jakarta!);
    renderWithI18n(<LocationView data={data} />);

    const faq = screen.getByTestId('location-faq');
    const faqText = within(faq)
      .getAllByRole('paragraph')
      .map((p) => p.textContent)
      .join(' ');
    expect(faqText).not.toContain('We never fabricate member counts, ratings, or local offices');
    expect(faqText).toContain('compiled from real, publicly known community spaces');
  });
});

/**
 * Story H (TASK-518) — page-level render assertions for /location i18n
 * completeness (TASK-515/516/517): the directory card names, the MenuHero H1,
 * the breadcrumbs, and the presence-claim entity label all resolve through
 * the ACTIVE locale. Country/city/region pages render through the real
 * `LocationView` fed with the same registry view data the route wrappers
 * build (`buildLocationViewData`), and the hub directory is exercised through
 * the real hub page wrapper on the es surface.
 */
describe('/location page — Story H i18n completeness (TASK-518)', () => {
  beforeEach(() => {
    mockServerLocale.locale = 'en';
  });

  it('renders the German H1 + breadcrumbs for a country without committed de content (UAE)', () => {
    // /de/location/united-arab-emirates — AE has no de country content, so
    // the MenuHero H1 + current crumb resolve the de dataset name.
    const uae = resolveLocationEntry({ country: 'united-arab-emirates' });
    expect(uae).toBeDefined();
    const data = buildLocationViewData(uae!, 'de');
    renderWithI18n(<LocationView data={data} />, 'de');

    expect(
      screen.getByRole('heading', { level: 1, name: 'Vereinigte Arabische Emirate' }),
    ).toBeInTheDocument();
    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Startseite')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Origins nach Stadt')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Vereinigte Arabische Emirate')).toBeInTheDocument();
    expect(
      within(breadcrumbs).queryByText('Origins in United Arab Emirates'),
    ).not.toBeInTheDocument();
  });

  it('renders the German H1 via the localized dataset name when no committed de title exists (Colombia)', () => {
    // /de/location/colombia — no committed de content → the hero H1 resolves
    // the de dataset name ("Kolumbien"), never the EN registry heading.
    const colombia = resolveLocationEntry({ country: 'colombia' });
    expect(colombia).toBeDefined();
    const data = buildLocationViewData(colombia!, 'de');
    renderWithI18n(<LocationView data={data} />, 'de');

    expect(screen.getByRole('heading', { level: 1, name: 'Kolumbien' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 1, name: 'Origins in Colombia' }),
    ).not.toBeInTheDocument();
    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Kolumbien')).toBeInTheDocument();
  });

  it('renders the German H1 + breadcrumbs for a region page (osaka)', () => {
    // /de/location/japan/osaka — the region H1 resolves the de dataset name.
    const osaka = resolveLocationEntry({ country: 'japan', region: 'osaka' });
    expect(osaka).toBeDefined();
    const data = buildLocationViewData(osaka!, 'de');
    renderWithI18n(<LocationView data={data} />, 'de');

    expect(screen.getByRole('heading', { level: 1, name: 'Präfektur Osaka' })).toBeInTheDocument();
    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Startseite')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Japan')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Präfektur Osaka')).toBeInTheDocument();
  });

  it('renders the proper-cased presence-claim city for ho-chi-minh-city (TASK-517/518)', () => {
    // The presence-claim SectionTitle must use the proper-cased dataset name
    // ("Ho Chi Minh City"), never the lowercase slug-spaced params.
    const hcmc = resolveLocationEntry({
      country: 'vietnam',
      region: 'ho-chi-minh-city-hcmc',
      city: 'ho-chi-minh-city',
    });
    expect(hcmc).toBeDefined();
    const data = buildLocationViewData(hcmc!);
    renderWithI18n(<LocationView data={data} />);

    expect(screen.getByText('Find or start an Origin in Ho Chi Minh City')).toBeInTheDocument();
    expect(
      screen.queryByText('Find or start an Origin in ho chi minh city'),
    ).not.toBeInTheDocument();
  });

  it('renders the localized directory card names on the es hub surface (TASK-518)', async () => {
    // The /es/location hub directory shows the committed es card name
    // ("Origins en Colombia") — never the EN registry title.
    mockServerLocale.locale = 'es';
    try {
      const element = await LocationHubPage();
      if (!element) throw new Error('location hub page returned null');
      renderWithI18n(element, 'es');

      const directory = screen.getByTestId('location-hub-directory');
      expect(within(directory).getByText('Origins en Colombia')).toBeInTheDocument();
      expect(within(directory).queryByText('Origins in Colombia')).not.toBeInTheDocument();
    } finally {
      mockServerLocale.locale = 'en';
    }
  });
});
