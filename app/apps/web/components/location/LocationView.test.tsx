import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { _resetI18nForTests, useI18n } from '@joinorigin/i18n';

import { LocationView } from './LocationView';
import { buildLocationViewData, hubEntry, resolveLocationEntry } from '../../lib/seo/locationView';
import type { LocationViewData } from '../../lib/seo/locationView';
import { renderWithI18n } from '../../test-utils';

/**
 * TASK-477 — `/location` translation on language toggle.
 *
 * The hero H1, the honest presence claim ("Find or start a community in
 * {{city}}"), and the breadcrumb chrome must fully re-translate when the
 * language is toggled client-side (the language switcher calls `setLocale`
 * before navigating to the locale-prefixed route, so the provider re-renders
 * with the new dictionary first).
 *
 * The hub view model (`data`) is built per route locale at request time; the
 * chrome keys (`seoContent.breadcrumb.hub`, `seoContent.breadcrumb.home`,
 * `seoContent.location.hubEntity`, `seoContent.location.presenceClaim`) must
 * therefore resolve through the ACTIVE client dictionary rather than the
 * server-baked strings.
 */

let mockPathname = '/en/location';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: jest.fn(), prefetch: jest.fn() }),
}));

/** Renders the view inside the i18n provider + a test button that toggles
 *  the client locale through the provider (same path the language switcher
 *  takes before navigating). */
function ToggleHarness({ data }: { data: LocationViewData }) {
  const { setLocale } = useI18n();
  return (
    <>
      <LocationView data={data} />
      <button onClick={() => void setLocale('de')}>switch-de</button>
    </>
  );
}

describe('LocationView language toggle (TASK-477)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/en/location';
  });

  it('translates the hero h1, presence claim, and breadcrumb chrome when toggled to de', async () => {
    const user = userEvent.setup();
    // EN route data — the hub H1 + claim city are chrome, so the whole hero
    // must re-translate through the active dictionary on toggle.
    const data = buildLocationViewData(hubEntry()!, 'en');
    renderWithI18n(<ToggleHarness data={data} />, 'en');

    // Initial EN surface.
    expect(
      screen.getByRole('heading', { level: 1, name: 'Communities by City' }),
    ).toBeInTheDocument();
    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Home')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Communities by City')).toBeInTheDocument();
    expect(screen.getByText('Find or start a community in your city')).toBeInTheDocument();

    // Toggle to de — the H1, claim, and breadcrumb chrome re-translate even
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

  it('never mixes the route-locale claim city with toggled claim chrome', async () => {
    const user = userEvent.setup();
    // DE route data rendered with an EN client locale (the transient state
    // after toggling from de to en, before navigation completes): the claim
    // must render fully in the active locale — no "deiner Stadt" leftover.
    const data = buildLocationViewData(hubEntry()!, 'de');
    renderWithI18n(<ToggleHarness data={data} />, 'en');

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

describe('LocationView hub intro translation (TASK-491)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/en/location';
  });

  it('renders the translated hubIntro for the hub location-intro block', () => {
    const data = buildLocationViewData(hubEntry()!, 'en');
    renderWithI18n(<LocationView data={data} />, 'en');

    const intro = screen.getByTestId('location-intro');
    expect(intro).toHaveTextContent(
      'Every country, region, city, community type, and event idea on the network',
    );
  });

  it('re-translates the hub intro + hero lead when toggled to de', async () => {
    const user = userEvent.setup();
    const data = buildLocationViewData(hubEntry()!, 'en');
    renderWithI18n(<ToggleHarness data={data} />, 'en');

    expect(screen.getByTestId('location-intro')).toHaveTextContent(
      'Every country, region, city, community type, and event idea on the network',
    );

    await user.click(screen.getByText('switch-de'));

    await waitFor(() => {
      expect(screen.getByTestId('location-intro')).toHaveTextContent(
        'Jedes Land, jede Region, jede Stadt, jeder Community-Typ und jede Veranstaltungsidee im Netzwerk',
      );
    });
    // The hero lead re-translates through the active dictionary too.
    expect(
      screen.getByText(
        'Entdecke Communities in Städten auf der ganzen Welt — Startup-, Kreativ-, Politik-, Meetup- und Kleinunternehmens-Gruppen.',
      ),
    ).toBeInTheDocument();
  });

  it('falls back gracefully when the hub intro key is absent (non-hub kinds)', () => {
    // City pages have authored prose — the hub chrome keys must not leak.
    const data = buildLocationViewData(
      resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' })!,
      'en',
    );
    renderWithI18n(<LocationView data={data} />, 'en');

    const intro = screen.getByTestId('location-intro');
    expect(intro).toHaveTextContent('Berlin');
    expect(intro.textContent).not.toContain('seoContent.location.hubIntro');
  });
});

describe('LocationView Browse-locations inventory UI (TASK-485)', () => {
  const DIRECTORY_SECTIONS = [
    { key: 'countries', label: 'Countries' },
    { key: 'regions', label: 'Regions' },
    { key: 'cities', label: 'Cities' },
    { key: 'communityTypes', label: 'Community types' },
    { key: 'eventIdeas', label: 'Event ideas' },
  ] as const;

  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/en/location';
  });

  it('renders the inventory banner band: title, stat, explainer, and explore links (TASK-491)', () => {
    const data = buildLocationViewData(hubEntry()!, 'en');
    const total = data.hubDirectory?.length ?? 0;
    renderWithI18n(<LocationView data={data} />, 'en');

    // SectionTitle heading (mirrors the /community "Join the network" band).
    expect(screen.getByRole('heading', { level: 2, name: 'Join the network' })).toBeInTheDocument();

    // CountUpStat with the total count + localized label.
    const banner = screen.getByTestId('location-inventory-banner');
    expect(banner).toHaveTextContent(String(total));
    expect(banner).toHaveTextContent('Places and Communities');

    // BodyCopy explainer.
    expect(
      screen.getByText(
        'Browse every place and community on the network. Find the one that fits you, or start one in your city.',
      ),
    ).toBeInTheDocument();

    // ExploreLinks row — Locations/Guides/Community accent links.
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

  it('shows the total content-rich inventory next to the Browse locations title', () => {
    const data = buildLocationViewData(hubEntry()!, 'en');
    const total = data.hubDirectory?.length ?? 0;
    renderWithI18n(<LocationView data={data} />, 'en');

    const title = screen.getByTestId('location-hub-directory-title');
    expect(title).toHaveTextContent('Browse locations');
    expect(title).toHaveTextContent(String(total));
  });

  it('renders per-section count badges beside each section sub-title', () => {
    const data = buildLocationViewData(hubEntry()!, 'en');
    const directory = data.hubDirectory ?? [];
    renderWithI18n(<LocationView data={data} />, 'en');

    for (const { key, label } of DIRECTORY_SECTIONS) {
      const count = directory.filter((entry) => entry.section === key).length;
      expect(screen.getByText(`${label} (${count})`)).toBeInTheDocument();
    }
  });

  it('matches search against entry.searchText so "colombia" resolves the country card + its cities', async () => {
    const user = userEvent.setup();
    const data = buildLocationViewData(hubEntry()!, 'en');
    renderWithI18n(<LocationView data={data} />, 'en');

    const search = screen.getByRole('searchbox', { name: 'Search locations' });
    await user.type(search, 'colombia');

    // The countries section keeps ONLY the Colombia country card (its
    // searchText contains the dataset country name, not just the card title).
    await waitFor(() => {
      expect(screen.getByTestId('location-hub-directory-countries')).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: 'Communities in Colombia' })).toBeInTheDocument();
    // Cities scoped to Colombia resolve through the country name too.
    expect(
      screen.getByRole('link', { name: 'Communities in Bogota, Bogota D.C.' }),
    ).toBeInTheDocument();
  });
});

describe('LocationView country mesh (TASK-490)', () => {
  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/en/location/germany';
  });

  it('renders the country mesh section with content-rich cities + regions', () => {
    const data = buildLocationViewData(resolveLocationEntry({ country: 'germany' })!, 'en');
    renderWithI18n(<LocationView data={data} />, 'en');

    const mesh = screen.getByTestId('location-country-mesh');
    expect(mesh).toBeInTheDocument();

    // City cards carry localized dataset names + registry-exact hrefs.
    const cities = within(screen.getByTestId('location-country-cities'));
    expect(cities.getByRole('link', { name: 'Berlin' })).toHaveAttribute(
      'href',
      '/en/location/germany/berlin/berlin',
    );
    expect(cities.getByRole('link', { name: 'Munich' })).toHaveAttribute(
      'href',
      '/en/location/germany/bavaria/munich',
    );

    // Region cards carry localized dataset names + registry-exact hrefs.
    const regions = within(screen.getByTestId('location-country-regions'));
    expect(regions.getByRole('link', { name: 'Bavaria' })).toHaveAttribute(
      'href',
      '/en/location/germany/bavaria',
    );
    expect(regions.getByRole('link', { name: 'State of Berlin' })).toHaveAttribute(
      'href',
      '/en/location/germany/berlin',
    );
  });

  it('does NOT render the country mesh on non-country pages', () => {
    const hubData = buildLocationViewData(hubEntry()!, 'en');
    renderWithI18n(<LocationView data={hubData} />, 'en');
    expect(screen.queryByTestId('location-country-mesh')).not.toBeInTheDocument();
  });
});
