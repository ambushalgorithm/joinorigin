import { screen } from '@testing-library/react';

import { LocationView } from '../../../../../../components/location/LocationView';
import {
  buildLocationViewData,
  resolveLocationEntry,
} from '../../../../../../lib/seo/locationView';
import { renderWithI18n } from '../../../../../../test-utils';
import { generateMetadata, generateStaticParams } from './page';

/**
 * fe-location-pages variant route tests (TASK-308).
 *
 * Asserts the `/location/[country]/[region]/[city]/[variant]` dynamic route
 * for the group-type variants AND the reserved `ideas` slug: warm-set
 * params, metadata (canonical/robots), and the rendered variant/ideas view
 * through the shared `LocationView` (the route default export is an async
 * server component — params are a Promise — so the render contract is tested
 * via the view with registry-built data, plus the ItemList JSON-LD payload
 * asserted in the view-data suite).
 */

describe('/location/[country]/[region]/[city]/[variant] route', () => {
  it('generateStaticParams returns the 10 warm variants + 2 idea pages', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(12);
    const variants = params.filter((p) => p.variant !== 'ideas');
    const ideas = params.filter((p) => p.variant === 'ideas');
    expect(variants).toHaveLength(10);
    expect(ideas).toHaveLength(2);
  });

  it('generateMetadata emits canonical + robots for a variant', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({
        country: 'germany',
        region: 'berlin',
        city: 'berlin',
        variant: 'startup',
      }),
    });
    expect(meta.alternates?.canonical).toBe(
      'http://localhost:3100/en/location/germany/berlin/berlin/startup',
    );
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  it('generateMetadata resolves the un-gated dubai startup variant (TASK-474)', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({
        country: 'united-arab-emirates',
        region: 'dubai',
        city: 'dubai',
        variant: 'startup',
      }),
    });
    expect(meta.alternates?.canonical).toBe(
      'http://localhost:3100/en/location/united-arab-emirates/dubai/dubai/startup',
    );
    expect(meta.robots).toEqual({ index: true, follow: true });
  });

  it('renders the startup variant view: single h1 + variant lead prose', () => {
    const entry = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
      variant: 'startup',
    });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Startup communities in Berlin');
  });

  it('renders the un-gated dubai startup variant (TASK-474)', () => {
    const entry = resolveLocationEntry({
      country: 'united-arab-emirates',
      region: 'dubai',
      city: 'dubai',
      variant: 'startup',
    });
    expect(entry).toBeDefined();
    expect(entry?.kind).toBe('variant');
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Startup communities in Dubai');
  });

  it('renders the un-gated buenos-aires startup variant (TASK-474)', () => {
    const entry = resolveLocationEntry({
      country: 'argentina',
      region: 'buenos-aires-f-d',
      city: 'buenos-aires',
      variant: 'startup',
    });
    expect(entry).toBeDefined();
    expect(entry?.kind).toBe('variant');
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Startup communities in Buenos Aires');
  });

  it('renders the ideas view: 30-idea grid in 6 categories', () => {
    const entry = resolveLocationEntry({
      country: 'germany',
      region: 'berlin',
      city: 'berlin',
      variant: 'ideas',
    });
    const data = buildLocationViewData(entry!);
    renderWithI18n(<LocationView data={data} />);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings[0]).toHaveTextContent('30 community event ideas in Berlin');

    const grids = screen.getAllByTestId('location-idea-grid');
    expect(grids).toHaveLength(6); // 6 categories
  });
});
