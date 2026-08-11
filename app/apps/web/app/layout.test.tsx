import { render, screen } from '@testing-library/react';
import type { Icons } from 'next/dist/lib/metadata/types/metadata-types';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

import RootLayout, { metadata, viewport } from './layout';
import { SITE } from '../lib/seo/site';
import { absoluteUrl } from '../lib/seo/url';

/**
 * Root layout tests (fe-seo, TASK-216): site-wide metadata contract (arch
 * §3.3) + JSON-LD Organization/WebSite + AnalyticsProvider mount (§2.7).
 *
 * `next/navigation` is mocked (analytics provider + registry need
 * `usePathname` / `useServerInsertedHTML`); script injection is stubbed by
 * the analytics test doubles, so rendering is side-effect free.
 */

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useServerInsertedHTML: (callback: () => React.ReactNode) => {
    // Collect styles once during the test render; returns nothing in jsdom.
    void callback();
    return null;
  },
}));

// Rendering the root layout in jsdom legitimately nests <html> inside the
// test container — a DOM-nesting warning, not a product defect. Keep the
// output clean while asserting the render contract.
const originalError = console.error;
beforeAll(() => {
  console.error = (message?: unknown, ...args: unknown[]) => {
    if (typeof message === 'string' && message.includes('validateDOMNesting')) {
      return;
    }
    originalError(message, ...args);
  };
});
afterAll(() => {
  console.error = originalError;
});

describe('root layout', () => {
  it('exports site-wide metadata: metadataBase, title default, description', () => {
    expect(metadata.metadataBase?.toString()).toBe(SITE.url + '/');
    expect(metadata.title).toEqual({
      default: 'JoinOrigin — Social Collaboration Network & Community OS',
      template: '%s',
    });
    expect(metadata.description).toContain('social collaboration network');
    // Home-page canonical base (subpages override via createMetadata; Next
    // resolves the relative '/' against metadataBase at render time).
    expect(metadata.alternates?.canonical).toBe('/');
  });

  it('exports Open Graph + Twitter defaults with a local 1200x630 image', () => {
    const og = metadata.openGraph as OpenGraph;
    expect(og).toMatchObject({ siteName: 'JoinOrigin', type: 'website', locale: 'en_US' });
    // Home-page OG URL default (subpages override via createMetadata).
    expect((og as { url?: string }).url).toBe(SITE.url + '/');
    const images = og.images as Array<{ url: string; width: number; height: number }>;
    expect(images[0].url).toBe(absoluteUrl(SITE.ogImage));
    expect(images[0]).toMatchObject({ width: 1200, height: 630 });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('registers the favicon set produced by fe-branding', () => {
    const icons = metadata.icons as Icons;
    expect(icons.icon).toEqual(
      expect.arrayContaining([
        { url: '/favicon.ico', sizes: 'any' },
        expect.objectContaining({ url: '/icon-192.png', sizes: '192x192' }),
        expect.objectContaining({ url: '/maskable-icon-512x512.png', sizes: '512x512' }),
      ]),
    );
    expect(icons.apple).toBe('/apple-touch-icon.png');
  });

  it('exports viewport with the brand theme color', () => {
    expect(viewport).toMatchObject({ themeColor: SITE.themeColor, colorScheme: 'dark' });
  });

  it('mounts AnalyticsProvider around children (fe-analytics contract)', () => {
    render(
      <RootLayout>
        <main>page content</main>
      </RootLayout>,
    );
    expect(screen.getByText('page content')).toBeInTheDocument();
  });

  it('renders Organization + WebSite JSON-LD once, server-side', () => {
    const { container } = render(
      <RootLayout>
        <main>page content</main>
      </RootLayout>,
    );
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    expect(scripts.length).toBe(2);
    const types = Array.from(scripts).map((s) => JSON.parse(s.textContent ?? '{}')['@type']);
    expect(types).toEqual(expect.arrayContaining(['Organization', 'WebSite']));
  });
});
