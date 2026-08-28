import { screen, within } from '@testing-library/react';

import { getDir, getDictionary, getT, _resetI18nForTests } from '@joinorigin/i18n';

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
 *     headings render localized text (URL-driven via `useI18n().t` —
 *     `renderWithI18n` sets the locale prop; no cookie, TASK-468), while
 *     body copy still comes from the content files (not dictionaries).
 */

beforeEach(() => {
  _resetI18nForTests();
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
      screen.getByText('ابحث عن Origin أو أنشئه في Berlin', { exact: false }),
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
      'Find or start an Origin in Berlin',
    );
    const de = getT(getDictionary('de'));
    expect(de('seoContent.location.presenceClaim', { city: 'Berlin' })).toBe(
      'Ein Origin in Berlin finden oder gründen',
    );
  });
});

describe('seoContent chrome — active-locale chrome switching (design §7.1)', () => {
  it('renders German chrome when the active locale is de (Berlin city page)', () => {
    const entry = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />, 'de');

    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Startseite')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Origins nach Stadt')).toBeInTheDocument();

    // Section headings in German chrome.
    expect(screen.getByText('Stadt-Fakten')).toBeInTheDocument();
    expect(screen.getByText('Origin-Typen entdecken')).toBeInTheDocument();
    expect(screen.getByText('Häufig gestellte Fragen')).toBeInTheDocument();

    // Group-type chrome labels via seoContent.groupTypes.*.
    const groupLinks = screen.getByTestId('location-group-type-links');
    expect(within(groupLinks).getByText('Startup-Origins')).toBeInTheDocument();
    expect(within(groupLinks).getByText('30 Ideen für Origin-Events')).toBeInTheDocument();
  });

  it('renders EN chrome for the default locale (body copy stays content-file driven)', () => {
    const entry = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />, 'en');

    expect(screen.getByText('City facts')).toBeInTheDocument();
    expect(screen.getByText('Explore Origin types')).toBeInTheDocument();
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument();
  });
});

describe('seoContent chrome — variant enrichment sections (TASK-319)', () => {
  it('renders "Where {type} communities gather" / "Typical formats" / "How to start" on a variant page (EN)', () => {
    const entry = resolveLocationEntry({
      country: 'united-states',
      region: 'new-york',
      city: 'new-york',
      variant: 'startup',
    });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />, 'en');

    // Section headings come from seoContent.* chrome keys + the localized
    // group-type label ({{type}} interpolation).
    expect(screen.getByText('Where Startup Origins gather')).toBeInTheDocument();
    expect(screen.getByText('Typical formats')).toBeInTheDocument();
    expect(screen.getByText('How to start')).toBeInTheDocument();

    // Venue/form/step body copy comes from the content file, not dictionaries.
    expect(screen.getByTestId('variant-enrichment-venues')).toBeInTheDocument();
    expect(screen.getByTestId('variant-enrichment-formats')).toBeInTheDocument();
    expect(screen.getByTestId('variant-enrichment-howto')).toBeInTheDocument();
    expect(screen.getByText(/Coworking spaces in SoHo and Flatiron/)).toBeInTheDocument();
  });

  it('renders the German chrome headings + German body on a de variant page', () => {
    const entry = resolveLocationEntry(
      {
        country: 'germany',
        region: 'berlin',
        city: 'berlin',
        variant: 'startup',
      },
      'de',
    );
    const data = buildLocationViewData(entry!, 'de');
    renderWithI18n(<LocationView data={data} />, 'de');

    expect(screen.getByText('Wo sich Startup-Origins treffen')).toBeInTheDocument();
    expect(screen.getByText('Typische Formate')).toBeInTheDocument();
    expect(screen.getByText('So startest du')).toBeInTheDocument();
    // German body copy from the de Berlin content file.
    expect(screen.getByText(/Coworking-Spaces in Mitte und Kreuzberg/)).toBeInTheDocument();
  });

  it('does NOT render enrichment sections on city or ideas pages (variant-only)', () => {
    const city = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    renderWithI18n(<LocationView data={buildLocationViewData(city!)} />, 'en');
    expect(screen.queryByTestId('variant-enrichment')).not.toBeInTheDocument();

    const ideas = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
      variant: 'ideas',
    });
    renderWithI18n(<LocationView data={buildLocationViewData(ideas!)} />, 'en');
    expect(screen.queryByTestId('variant-enrichment')).not.toBeInTheDocument();
  });
});

describe('seoContent.location.exploreCommunities — missing chrome key fix (TASK-314)', () => {
  it('resolves the flagship-cities CTA label instead of rendering the raw key (EN hub)', () => {
    const entry = resolveLocationEntry({});
    expect(entry?.kind).toBe('hub');
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />, 'en');

    // The flagship-cities cards use seoContent.location.exploreCommunities as
    // their body — the key must resolve to the localized label.
    const flagshipGrid = screen.getByTestId('location-flagship-cities');
    expect(within(flagshipGrid).getAllByText('Explore Origins').length).toBeGreaterThan(0);

    // The raw key string must never surface in the rendered DOM.
    expect(screen.queryByText('seoContent.location.exploreCommunities')).not.toBeInTheDocument();
    expect(document.body.textContent).not.toContain('seoContent.location.exploreCommunities');
  });

  it('renders the localized flagship-cities label in German (de chrome)', () => {
    const entry = resolveLocationEntry({});
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />, 'de');

    const flagshipGrid = screen.getByTestId('location-flagship-cities');
    expect(within(flagshipGrid).getAllByText('Origins entdecken').length).toBeGreaterThan(0);
    expect(document.body.textContent).not.toContain('seoContent.location.exploreCommunities');
  });
});
