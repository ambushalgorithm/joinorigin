import { screen, within } from '@testing-library/react';

import { LocationView } from '../../../../../../components/location/LocationView';
import {
  buildLocationViewData,
  resolveLocationEntry,
} from '../../../../../../lib/seo/locationView';
import { renderWithI18n } from '../../../../../../test-utils';
import { generateMetadata } from './page';

/**
 * fe-location-pages Berlin de city route tests (TASK-308, updated TASK-453).
 *
 * Asserts `/de/location/[country]/[region]/[city]`: after the EN-fallback
 * regeneration the wrapper resolves the EN registry entry (no per-locale
 * surface) and renders the active locale's body via
 * `buildLocationViewData(entry, 'de')`. The route is force-dynamic (the
 * root layout reads `headers()`, so SSG/ISR would crash with
 * DYNAMIC_SERVER_USAGE) — no `generateStaticParams` is exported.
 * Metadata comes from the EN entry (canonical EN + de alternate hreflang
 * for the committed Berlin de surface).
 */

describe('/de/location/[country]/[region]/[city] route', () => {
  it('does not export generateStaticParams (force-dynamic EN-fallback wrapper)', async () => {
    const page = await import('./page');
    expect(page.dynamic).toBe('force-dynamic');
    expect((page as { generateStaticParams?: unknown }).generateStaticParams).toBeUndefined();
  });

  it('generateMetadata resolves the EN entry — canonical EN + de alternate hreflang', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ country: 'germany', region: 'berlin', city: 'berlin' }),
    });
    expect(meta.alternates?.canonical).toBe('http://localhost:3100/location/germany/berlin/berlin');
    expect(meta.alternates?.languages).toEqual({
      de: 'http://localhost:3100/de/location/germany/berlin/berlin',
      en: 'http://localhost:3100/location/germany/berlin/berlin',
      'x-default': 'http://localhost:3100/location/germany/berlin/berlin',
    });
  });

  it('renders the German city view: German H1 + German body + FAQ + CTA', () => {
    const entry = resolveLocationEntry(
      { country: 'germany', region: 'berlin', city: 'berlin' },
      'de',
    );
    const data = buildLocationViewData(entry!, 'de');
    renderWithI18n(<LocationView data={data} />, 'de');

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Communities in Berlin');

    // German body copy from the per-locale content file (not locale JSONs).
    expect(screen.getByText(/Berlin ist eine Stadt, die von Communities lebt/)).toBeInTheDocument();

    // German variant links (pageTitles from the de content file).
    const groupLinks = screen.getByTestId('location-group-type-links');
    expect(within(groupLinks).getByText('Startup-Communities')).toBeInTheDocument();
    expect(within(groupLinks).getByText('30 Ideen für Community-Events')).toBeInTheDocument();

    // FAQ block rendered from the de FAQ.
    expect(screen.getByTestId('location-faq')).toBeInTheDocument();
    expect(screen.getByTestId('location-cta-band')).toBeInTheDocument();
  });
});
