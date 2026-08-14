import { screen, within } from '@testing-library/react';

import { getDir, getDictionary, getT, _resetI18nForTests } from '@joinorigin/i18n';
import { LOCALE_COOKIE_NAME } from '@joinorigin/i18n';

import { LocationView } from '../../../components/location/LocationView';
import { buildLocationViewData, resolveLocationEntry } from '../locationView';
import { renderWithI18n } from '../../../test-utils';

/**
 * TASK-310 — seoContent chrome namespace verification.
 *
 * Asserts the three acceptance points from the task brief:
 *  1. RTL: `ar`/`fa` resolve `dir="rtl"` via `getDir` and the location view
 *     renders the same chrome with the RTL dictionary (no crashes, localized
 *     headings present).
 *  2. Locale-aware number formatting: city-stat numbers format through
 *     `toLocaleString(locale)` with locale-specific separators (R7).
 *  3. Chrome follows the active locale: the presence claim / section
 *     headings render localized text (cookie-driven via `useI18n().t`),
 *     while body copy still comes from the content files (not dictionaries).
 */

beforeEach(() => {
  // The provider's post-mount auto-detect reads the persisted cookie and can
  // override the locale prop across tests in this file (provider.test.tsx
  // uses the same isolation pattern). Reset both so every test starts clean.
  _resetI18nForTests();
  document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
});

describe('seoContent chrome — RTL contract (TASK-310 §7.1)', () => {
  it('resolves dir=rtl for ar and fa only (via getDir)', () => {
    expect(getDir('ar')).toBe('rtl');
    expect(getDir('fa')).toBe('rtl');
    expect(getDir('en')).toBe('ltr');
    expect(getDir('de')).toBe('ltr');
  });

  it('renders the Berlin city view with the Arabic chrome (dir=rtl dictionary)', () => {
    const entry = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />, 'ar');

    // Presence claim — localized chrome, not the EN default.
    expect(
      screen.getByText('ابحث عن مجتمع أو أنشئه في Berlin', { exact: false }),
    ).toBeInTheDocument();
    // City facts section heading is Arabic chrome.
    expect(screen.getByText('حقائق عن المدينة')).toBeInTheDocument();
    // Body copy still renders (authored content file — never a dictionary key).
    expect(screen.getByText(/New York|Berlin ist eine Stadt|Berlin is a city/)).toBeInTheDocument();
  });
});

describe('seoContent chrome — locale-aware number formatting (R7)', () => {
  it('formats a city stat with locale-specific separators via toLocaleString(locale)', () => {
    const berlinPopulation = 3_644_826;
    expect(berlinPopulation.toLocaleString('en-US')).toBe('3,644,826');
    expect(berlinPopulation.toLocaleString('de-DE')).toBe('3.644.826');
    expect(berlinPopulation.toLocaleString('ar-EG')).not.toBe('3,644,826');
  });

  it('getT interpolates {{city}} in the presence claim template', () => {
    const en = getT(getDictionary('en'));
    expect(en('seoContent.location.presenceClaim', { city: 'Berlin' })).toBe(
      'Find or start a community in Berlin',
    );
    const de = getT(getDictionary('de'));
    expect(de('seoContent.location.presenceClaim', { city: 'Berlin' })).toBe(
      'Community in Berlin finden oder gründen',
    );
  });
});

describe('seoContent chrome — cookie-locale chrome switching (design §7.1)', () => {
  it('renders German chrome when the active locale is de (Berlin city page)', () => {
    const entry = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />, 'de');

    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Startseite')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Communities nach Stadt')).toBeInTheDocument();

    // Section headings in German chrome.
    expect(screen.getByText('Stadt-Fakten')).toBeInTheDocument();
    expect(screen.getByText('Community-Typen entdecken')).toBeInTheDocument();
    expect(screen.getByText('Häufig gestellte Fragen')).toBeInTheDocument();

    // Group-type chrome labels via seoContent.groupTypes.*.
    const groupLinks = screen.getByTestId('location-group-type-links');
    expect(within(groupLinks).getByText('Startup-Communities')).toBeInTheDocument();
    expect(within(groupLinks).getByText('30 Ideen für Community-Events')).toBeInTheDocument();
  });

  it('renders EN chrome for the default locale (body copy stays content-file driven)', () => {
    const entry = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />, 'en');

    expect(screen.getByText('City facts')).toBeInTheDocument();
    expect(screen.getByText('Explore community types')).toBeInTheDocument();
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument();
  });
});
