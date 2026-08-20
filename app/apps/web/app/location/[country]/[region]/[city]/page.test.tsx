import { render, screen, within } from '@testing-library/react';

import { I18nProvider, _resetI18nForTests, getDictionary, type Locale } from '@joinorigin/i18n';

import { LocationView } from '../../../../../components/location/LocationView';
import { getCityContent } from '../../../../../lib/seo/content';
import { buildLocationViewData, resolveLocationEntry } from '../../../../../lib/seo/locationView';
import { renderWithI18n } from '../../../../../test-utils';
import CityPage, { generateMetadata, generateStaticParams } from './page';

/**
 * fe-location-pages city route tests (TASK-308).
 *
 * Asserts the `/location/[country]/[region]/[city]` dynamic route:
 * warm-set static params (NYC + Berlin only), `generateMetadata` canonical /
 * hreflang / robots, and the rendered city view (single H1, breadcrumbs,
 * variant links, sibling mesh, FAQ, CTA). The route's default export is an
 * async server component (params are a Promise) so the render contract is
 * tested through the shared `LocationView` client view fed with the same
 * registry view data the route passes.
 *
 * TASK-446: the canonical city page builds its view data through the active
 * server locale (proxy-forwarded `x-joinorigin-locale`) — `getServerLocale`
 * is mocked here. With the active `es` locale Mexico City renders the
 * committed Spanish intro; Austin (no es content) falls back to EN. SEO
 * metadata stays EN (arch-i18n §1.2). Locale is URL-only (TASK-468) — no
 * cookie.
 */

jest.mock('../../../../../lib/i18n-server', () => ({
  getServerLocale: jest.fn(() => Promise.resolve(mockServerLocale.locale)),
}));

const mockServerLocale: { locale: Locale } = { locale: 'en' };

describe('/location/[country]/[region]/[city] route', () => {
  it('generateStaticParams returns the warm-set cities (NYC + Berlin)', () => {
    const params = generateStaticParams();
    expect(params.map((p) => p.city).sort()).toEqual(['berlin', 'new-york']);
    expect(params[0]).toHaveProperty('country');
    expect(params[0]).toHaveProperty('region');
  });

  it('generateMetadata emits canonical + no hreflang for NYC (EN-only)', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ country: 'united-states', region: 'new-york', city: 'new-york' }),
    });
    expect(meta.alternates?.canonical).toBe(
      'http://localhost:3100/en/location/united-states/new-york/new-york',
    );
    expect(meta.alternates?.languages).toBeUndefined();
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  it('generateMetadata emits hreflang en/de for Berlin', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ country: 'germany', region: 'berlin', city: 'berlin' }),
    });
    expect(meta.alternates?.languages).toEqual({
      en: 'http://localhost:3100/en/location/germany/berlin/berlin',
      de: 'http://localhost:3100/de/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/en/location/germany/berlin/berlin',
    });
  });

  it('generateMetadata returns empty metadata for unknown slugs (route 404s)', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ country: 'germany', region: 'berlin', city: 'atlantis' }),
    });
    expect(meta).toEqual({});
  });

  it('generateMetadata resolves the un-gated dubai city entry (TASK-474)', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({
        country: 'united-arab-emirates',
        region: 'dubai',
        city: 'dubai',
      }),
    });
    expect(meta.alternates?.canonical).toBe(
      'http://localhost:3100/en/location/united-arab-emirates/dubai/dubai',
    );
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  it('renders the Berlin city view: single h1, breadcrumbs, variants, FAQ, CTA', () => {
    const entry = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Communities in Berlin');

    const breadcrumbs = screen.getByTestId('location-breadcrumbs');
    expect(within(breadcrumbs).getByText('Communities by City')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Communities in Germany')).toBeInTheDocument();
    expect(within(breadcrumbs).getByText('Communities in Berlin, Germany')).toBeInTheDocument();

    const groupLinks = screen.getByTestId('location-group-type-links');
    expect(within(groupLinks).getByText('Startup communities')).toBeInTheDocument();
    expect(within(groupLinks).getByText('30 community event ideas')).toBeInTheDocument();

    expect(screen.getByTestId('location-faq')).toBeInTheDocument();
    expect(screen.getByTestId('location-cta-band')).toBeInTheDocument();
  });

  it('renders the un-gated dubai city view: Explore community types + nearby cities (TASK-474)', () => {
    const entry = resolveLocationEntry({
      country: 'united-arab-emirates',
      region: 'dubai',
      city: 'dubai',
    });
    expect(entry).toBeDefined();
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Communities in Dubai');

    // Explore community types — un-gated for Tier-2 content cities.
    const groupLinks = screen.getByTestId('location-group-type-links');
    expect(within(groupLinks).getByText('Startup communities')).toBeInTheDocument();
    expect(within(groupLinks).getByText('30 community event ideas')).toBeInTheDocument();

    // Communities in nearby cities — same-region siblings render too.
    const siblingGrid = screen.getByTestId('location-sibling-cities');
    expect(within(siblingGrid).getAllByRole('link').length).toBeGreaterThan(0);
  });

  it('renders the un-gated buenos-aires city view: group types + nearby cities (TASK-474)', () => {
    const entry = resolveLocationEntry({
      country: 'argentina',
      region: 'buenos-aires-f-d',
      city: 'buenos-aires',
    });
    expect(entry).toBeDefined();
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Communities in Buenos Aires');

    const groupLinks = screen.getByTestId('location-group-type-links');
    expect(within(groupLinks).getByText('Startup communities')).toBeInTheDocument();

    const siblingGrid = screen.getByTestId('location-sibling-cities');
    expect(within(siblingGrid).getAllByRole('link').length).toBeGreaterThan(0);
  });

  it('renders the Translate this page link on the EN page with the correct href (TASK-318)', () => {
    const entry = resolveLocationEntry({ country: 'germany', region: 'berlin', city: 'berlin' });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />);

    const link = screen.getByTestId('translate-page-link');
    expect(link).toHaveTextContent('Translate this page');

    const url = new URL(link.getAttribute('href') ?? '');
    expect(`${url.origin}${url.pathname}`).toBe('https://translate.google.com/translate');
    expect(url.searchParams.get('sl')).toBe('en');
    expect(url.searchParams.get('tl')).toBe('en');
    expect(url.searchParams.get('u')).toBe(window.location.href);
  });

  it('omits the translate link on the de Berlin surface (already translated — TASK-318)', () => {
    const entry = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin' },
      'de',
    );
    const data = buildLocationViewData(entry!, 'de');
    renderWithI18n(<LocationView data={data} />);

    expect(screen.getByTestId('location-breadcrumbs')).toBeInTheDocument();
    expect(screen.queryByTestId('translate-page-link')).not.toBeInTheDocument();
  });

  it('renders the forwarded locale’s city intro on the canonical route (TASK-446)', async () => {
    mockServerLocale.locale = 'es';
    try {
      const page = await CityPage({
        params: Promise.resolve({
          country: 'mexico',
          region: 'mexico-city',
          city: 'mexico-city',
        }),
      });
      renderWithI18n(page);

      // The committed es Mexico City intro renders (not the EN one).
      const esIntro = getCityContent('mexico-city', 'es')?.intro[0];
      const enIntro = getCityContent('mexico-city', 'en')?.intro[0];
      if (!esIntro || !enIntro) throw new Error('missing mexico-city content');
      expect(esIntro).not.toBe(enIntro);
      expect(screen.getByText(esIntro)).toBeInTheDocument();
      expect(screen.queryByText(enIntro)).not.toBeInTheDocument();
    } finally {
      mockServerLocale.locale = 'en';
    }
  });

  it('falls back to the EN city intro when the active locale has no content (TASK-446)', async () => {
    mockServerLocale.locale = 'es';
    try {
      const page = await CityPage({
        params: Promise.resolve({
          country: 'united-states',
          region: 'texas',
          city: 'austin',
        }),
      });
      renderWithI18n(page);

      // Austin has no es content — the canonical route EN-falls-back.
      const enIntro = getCityContent('austin', 'en')?.intro[0];
      if (!enIntro) throw new Error('missing austin content');
      expect(screen.getByText(enIntro)).toBeInTheDocument();
    } finally {
      mockServerLocale.locale = 'en';
    }
  });
});

/**
 * TASK-460 — the location view renders breadcrumb / group-type / sibling /
 * guide links through the shared locale-aware path helper per the confirmed
 * prefix table. `useLocalizePath` reads the router pathname + active i18n
 * locale, so this suite overrides the `next/navigation` mock with a mutable
 * `mockPathname`.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => mockPathname,
}));

function renderLocationForLocale(locale: Locale, data: ReturnType<typeof buildLocationViewData>) {
  return render(
    <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
      <LocationView data={data} />
    </I18nProvider>,
  );
}

describe('location view — locale-aware internal links (TASK-460)', () => {
  const berlinEntry = resolveLocationEntry({
    country: 'germany',
    region: 'berlin',
    city: 'berlin',
  });
  const berlinData = buildLocationViewData(berlinEntry!);

  beforeEach(() => {
    _resetI18nForTests();
    mockPathname = '/';
  });

  /** Finds a link with the exact href (labels are locale-dependent). */
  function linkByHref(href: string) {
    return screen.getAllByRole('link').find((link) => link.getAttribute('href') === href);
  }

  it('renders /en/** internal links on an unprefixed EN load (all-routes-prefixed)', () => {
    mockPathname = '/location/germany/berlin/berlin';
    renderLocationForLocale('en', berlinData);
    // Breadcrumb hub link, group-type link, guide cross-link all prefixed.
    expect(linkByHref('/en/location')).toBeDefined();
    expect(linkByHref('/en/location/germany/berlin/berlin/startup')).toBeDefined();
    expect(linkByHref('/en/guides/start-a-community')).toBeDefined();
  });

  it('keeps the /en/** prefix on an /en/** load (table row 2)', () => {
    mockPathname = '/en/location/germany/berlin/berlin';
    renderLocationForLocale('en', berlinData);
    expect(linkByHref('/en/location')).toBeDefined();
    expect(linkByHref('/en/location/germany/berlin/berlin/startup')).toBeDefined();
    expect(linkByHref('/en/guides/start-a-community')).toBeDefined();
  });

  it('renders /de/** links on a /de/** load (table row 3)', () => {
    mockPathname = '/de/location/germany/berlin/berlin';
    renderLocationForLocale('de', berlinData);
    expect(linkByHref('/de/location')).toBeDefined();
    expect(linkByHref('/de/location/germany/berlin/berlin/startup')).toBeDefined();
    expect(linkByHref('/de/guides/start-a-community')).toBeDefined();
  });

  it('renders /de/** links on an unprefixed path with an active de locale (URL-driven)', () => {
    mockPathname = '/location/germany/berlin/berlin';
    renderLocationForLocale('de', berlinData);
    expect(linkByHref('/de/location')).toBeDefined();
    expect(linkByHref('/de/location/germany/berlin/berlin/startup')).toBeDefined();
    expect(linkByHref('/de/guides/start-a-community')).toBeDefined();
  });
});
