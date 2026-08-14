import { screen, within } from '@testing-library/react';

import { LocationView } from '../../../../../components/location/LocationView';
import { buildLocationViewData, resolveLocationEntry } from '../../../../../lib/seo/locationView';
import { renderWithI18n } from '../../../../../test-utils';
import { generateMetadata, generateStaticParams } from './page';

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
 */

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
      'http://localhost:3100/location/united-states/new-york/new-york',
    );
    expect(meta.alternates?.languages).toBeUndefined();
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  it('generateMetadata emits hreflang en/de for Berlin', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ country: 'germany', region: 'berlin', city: 'berlin' }),
    });
    expect(meta.alternates?.languages).toEqual({
      en: 'http://localhost:3100/location/germany/berlin/berlin',
      de: 'http://localhost:3100/de/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/location/germany/berlin/berlin',
    });
  });

  it('generateMetadata returns empty metadata for unknown slugs (route 404s)', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ country: 'germany', region: 'berlin', city: 'atlantis' }),
    });
    expect(meta).toEqual({});
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
});
