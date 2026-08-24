import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useI18n, type Locale } from '@joinorigin/i18n';

import LocationHubPage, { metadata } from './page';
import { LocationView } from '../../components/location/LocationView';
import { renderWithI18n } from '../../test-utils';
import { buildLocationViewData, hubEntry, resolveLocationEntry } from '../../lib/seo/locationView';

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
    // Section headers render from the localized directorySectionTitles chrome
    // with their per-section count badges (TASK-485) — membership counts come
    // from the TASK-484 content-rich inventory (38/54/56/280/56).
    expect(
      within(directory).getByRole('heading', { level: 3, name: 'Countries (38)' }),
    ).toBeInTheDocument();
    expect(
      within(directory).getByRole('heading', { level: 3, name: 'Event ideas (56)' }),
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

  it('renders the translated hub intro + banner band for the active locale (TASK-491)', async () => {
    mockServerLocale.locale = 'de';
    try {
      // Render with the de client locale (the language lives in the URL —
      // the de surface seeds the de dictionary, TASK-468/488).
      const element = await LocationHubPage();
      if (!element) throw new Error('location hub page returned null');
      renderWithI18n(element, 'de');

      // The hub intro resolves through the route-locale dictionary.
      expect(screen.getByTestId('location-intro')).toHaveTextContent(
        'Jedes Land, jede Region, jede Stadt, jeder Community-Typ und jede Veranstaltungsidee im Netzwerk',
      );

      // The inventory banner band mirrors the /community "Join the network"
      // section with localized heading + explainer + explore links.
      expect(
        screen.getByRole('heading', { level: 2, name: 'Tritt dem Netzwerk bei' }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Durchstöbere jeden Ort und jede Community im Netzwerk. Finde die, die zu dir passt, oder gründe eine in deiner Stadt.',
        ),
      ).toBeInTheDocument();
      const explore = screen.getByTestId('location-inventory-explore');
      expect(within(explore).getByRole('link', { name: 'Standorte' })).toBeInTheDocument();
    } finally {
      mockServerLocale.locale = 'en';
    }
  });

  it('renders the inventory banner band on the EN surface: heading + copy + links + stat (TASK-491)', async () => {
    await renderHubPage();

    // SectionTitle heading (mirrors the /community "Join the network" band).
    expect(screen.getByRole('heading', { level: 2, name: 'Join the network' })).toBeInTheDocument();

    // CountUpStat — the total content-rich inventory + localized label.
    const total = buildLocationViewData(hubEntry()!).hubDirectory?.length ?? 0;
    const banner = screen.getByTestId('location-inventory-banner');
    expect(banner).toHaveTextContent(String(total));
    expect(banner).toHaveTextContent('Places and Communities');

    // BodyCopy explainer.
    expect(
      screen.getByText(
        'Browse every place and community on the network. Find the one that fits you, or start one in your city.',
      ),
    ).toBeInTheDocument();

    // ExploreLinks row — Locations/Guides/Community accent links on the EN
    // all-routes-prefixed surface (TASK-466/469).
    const explore = within(screen.getByTestId('location-inventory-explore'));
    expect(explore.getByRole('link', { name: 'Locations' })).toHaveAttribute(
      'href',
      '/en/location',
    );
    expect(explore.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/en/guides');
    expect(explore.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/en/community',
    );
  });
});

/**
 * TASK-477 / TASK-481 — the `/location` hub must fully re-translate when the
 * language toggles client-side (the language switcher calls `setLocale`
 * before navigating to the locale-prefixed route, so the provider re-renders
 * with the new dictionary first). The hub view model (`data`) is built per
 * route locale at request time, so the chrome keys
 * (`seoContent.breadcrumb.hub`, `seoContent.breadcrumb.home`,
 * `seoContent.location.hubEntity`, `seoContent.location.presenceClaim`) must
 * resolve through the ACTIVE client dictionary — MenuHero h1, the presence
 * claim body copy, and the breadcrumb chrome all re-translate on toggle.
 *
 * These page-level tests drive the real server wrapper (registry view model
 * + JSON-LD) through the same toggle path as the component suite.
 */

/** Wraps the page element with a test button that toggles the client locale
 *  through the provider (same path the language switcher takes). */
function TogglePageHarness({ children }: { children: React.ReactNode }) {
  const { setLocale } = useI18n();
  return (
    <>
      {children}
      <button onClick={() => void setLocale('de')}>switch-de</button>
      <button onClick={() => void setLocale('en')}>switch-en</button>
    </>
  );
}

/** Render the (async) hub page inside the locale-toggle harness. */
async function renderHubPageWithToggle(clientLocale: Locale = 'en') {
  const element = await LocationHubPage();
  if (!element) throw new Error('location hub page returned null');
  renderWithI18n(<TogglePageHarness>{element}</TogglePageHarness>, clientLocale);
}

describe('/location hub — language toggle translation (TASK-477/TASK-481)', () => {
  beforeEach(() => {
    mockServerLocale.locale = 'en';
  });

  it('re-translates the hero h1, presence claim, and breadcrumbs when toggled EN → de', async () => {
    const user = userEvent.setup();
    // EN route data — the hub h1 + claim city are chrome, so the whole hero
    // must re-translate through the active dictionary on toggle.
    await renderHubPageWithToggle('en');

    // Initial EN surface (MenuHero h1 + presence claim + breadcrumbs).
    expect(
      screen.getByRole('heading', { level: 1, name: 'Communities by City' }),
    ).toBeInTheDocument();
    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Home')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Communities by City')).toBeInTheDocument();
    expect(screen.getByText('Find or start a community in your city')).toBeInTheDocument();

    // Toggle to de — the h1, claim, and breadcrumb chrome re-translate even
    // though the view model is still the EN route build.
    await user.click(screen.getByText('switch-de'));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 1, name: 'Communities nach Stadt' }),
      ).toBeInTheDocument();
    });
    expect(screen.getByText('Community in deiner Stadt finden oder gründen')).toBeInTheDocument();
    const deCrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(deCrumbs).getByText('Startseite')).toBeInTheDocument();
    expect(within(deCrumbs).getByText('Communities nach Stadt')).toBeInTheDocument();
  });

  it('re-translates the hero h1, presence claim, and breadcrumbs when toggled de → en', async () => {
    const user = userEvent.setup();
    // DE route data (server locale de) rendered with a de client locale.
    mockServerLocale.locale = 'de';
    await renderHubPageWithToggle('de');

    // Initial de surface.
    expect(
      screen.getByRole('heading', { level: 1, name: 'Communities nach Stadt' }),
    ).toBeInTheDocument();
    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Startseite')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Communities nach Stadt')).toBeInTheDocument();
    expect(screen.getByText('Community in deiner Stadt finden oder gründen')).toBeInTheDocument();

    // Toggle to en — chrome re-translates back with the same DE view model.
    await user.click(screen.getByText('switch-en'));

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 1, name: 'Communities by City' }),
      ).toBeInTheDocument();
    });
    expect(screen.getByText('Find or start a community in your city')).toBeInTheDocument();
    const enCrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(enCrumbs).getByText('Home')).toBeInTheDocument();
    expect(within(enCrumbs).getByText('Communities by City')).toBeInTheDocument();
  });

  it('never mixes the route-locale claim city with toggled claim chrome', async () => {
    const user = userEvent.setup();
    // DE route data rendered with an EN client locale (the transient state
    // after toggling from de to en, before navigation completes): the claim
    // must render fully in the active locale — no "deiner Stadt" leftover.
    mockServerLocale.locale = 'de';
    await renderHubPageWithToggle('en');

    expect(screen.getByText('Find or start a community in your city')).toBeInTheDocument();
    expect(screen.queryByText('Find or start a community in deiner Stadt')).not.toBeInTheDocument();

    await user.click(screen.getByText('switch-de'));
    await waitFor(() => {
      expect(screen.getByText('Community in deiner Stadt finden oder gründen')).toBeInTheDocument();
    });
    expect(
      screen.queryByText('Community in your city finden oder gründen'),
    ).not.toBeInTheDocument();
  });
});

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
    expect(within(faq).getByText('How do I find communities in Colombia?')).toBeInTheDocument();
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
    const cityLinks = within(within(mesh).getByTestId('location-region-cities')).getAllByRole(
      'link',
    );
    expect(cityLinks.some((link) => link.textContent === 'Osaka')).toBe(true);

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
    // cities (Surabaya/Bandung/Bekasi) on the ACTIVE locale surface.
    const hrefs = links.map((link) => link.getAttribute('href'));
    expect(hrefs.every((href) => href?.startsWith('/en/location/indonesia/'))).toBe(true);
    const names = links.map((link) => link.textContent);
    expect(names.some((name) => name === 'Surabaya')).toBe(true);
    expect(names.some((name) => name === 'Bandung')).toBe(true);
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
    expect(within(breadcrumbs).getByText('Communities nach Stadt')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Vereinigte Arabische Emirate')).toBeInTheDocument();
    expect(
      within(breadcrumbs).queryByText('Communities in United Arab Emirates'),
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
      screen.queryByRole('heading', { level: 1, name: 'Communities in Colombia' }),
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

    expect(screen.getByText('Find or start a community in Ho Chi Minh City')).toBeInTheDocument();
    expect(
      screen.queryByText('Find or start a community in ho chi minh city'),
    ).not.toBeInTheDocument();
  });

  it('renders the localized directory card names on the es hub surface (TASK-518)', async () => {
    // The /es/location hub directory shows the committed es card name
    // ("Comunidades en Colombia") — never the EN registry title.
    mockServerLocale.locale = 'es';
    try {
      const element = await LocationHubPage();
      if (!element) throw new Error('location hub page returned null');
      renderWithI18n(element, 'es');

      const directory = screen.getByTestId('location-hub-directory');
      expect(within(directory).getByText('Comunidades en Colombia')).toBeInTheDocument();
      expect(within(directory).queryByText('Communities in Colombia')).not.toBeInTheDocument();
    } finally {
      mockServerLocale.locale = 'en';
    }
  });
});
