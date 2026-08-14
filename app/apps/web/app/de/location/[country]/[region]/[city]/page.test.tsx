import { screen, within } from '@testing-library/react';

import { LocationView } from '../../../../../../components/location/LocationView';
import {
  buildLocationViewData,
  resolveLocationEntry,
} from '../../../../../../lib/seo/locationView';
import { renderWithI18n } from '../../../../../../test-utils';
import { generateMetadata, generateStaticParams } from './page';

/**
 * fe-location-pages Berlin de city route tests (TASK-308).
 *
 * Asserts `/de/location/[country]/[region]/[city]`: warm params = Berlin
 * only, metadata carries the full hreflang set (de self + en + x-default →
 * EN), and the page renders the committed German body content via the
 * shared `LocationView` (the route default export is an async server
 * component — params are a Promise).
 */

describe('/de/location/[country]/[region]/[city] route', () => {
  it('generateStaticParams returns only Berlin', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(1);
    expect(params[0]).toEqual({ country: 'germany', region: 'berlin', city: 'berlin' });
  });

  it('generateMetadata emits de self + en + x-default→EN', async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ country: 'germany', region: 'berlin', city: 'berlin' }),
    });
    expect(meta.alternates?.canonical).toBe(
      'http://localhost:3100/de/location/germany/berlin/berlin',
    );
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
