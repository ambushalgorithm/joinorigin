import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { _resetI18nForTests, useI18n } from '@joinorigin/i18n';

import { LocationView } from './LocationView';
import { buildLocationViewData, hubEntry } from '../../lib/seo/locationView';
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
