import type { Metadata, Viewport } from 'next';

import { AnalyticsProvider } from '../lib/analytics';
import { JsonLd } from '../lib/seo/JsonLd';
import { organization, website } from '../lib/seo/jsonLd';
import { SITE } from '../lib/seo/site';
import Registry from './registry';

/**
 * Site-wide metadata + structured data + analytics mount (arch §3.3, §3.6).
 *
 * - `metadataBase` resolves relative metadata URLs (canonical/OG/Twitter)
 *   against the single `SITE.url` origin.
 * - `title.template` is an **identity** template: fe-menu-pages already
 *   embeds the brand suffix in every page title (e.g. "Features — ... |
 *   JoinOrigin" per sprint-4-discovery.md §5), so appending another suffix
 *   would produce a doubled brand ("… | JoinOrigin · JoinOrigin"). The
 *   default covers the home page (a client component without its own
 *   metadata export).
 * - Icons point at the static favicon set under `public/` produced by
 *   fe-branding (TASK-214) — the App Router file conventions (`app/icon.tsx`,
 *   `app/apple-icon.tsx`) additionally serve generated variants.
 * - `Organization` + `WebSite` JSON-LD render once, server-side, so crawlers
 *   and LLMs see the structured data in the initial HTML.
 * - `AnalyticsProvider` mounts per the fe-analytics contract (§2.7) — zero
 *   visual output; adapters own script injection.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    // Home page title (discovery §5.1) — the anchor keyword for the
    // "social collaboration network" intent.
    default: 'JoinOrigin — Social Collaboration Network & Community OS',
    template: '%s',
  },
  description: SITE.description,
  // Canonical base (arch §3.4): the home page is a client component with no
  // metadata export, so the layout supplies the '/' canonical as the default.
  // Every subpage overrides it via `createMetadata` → `alternates.canonical`
  // (page-level metadata takes precedence over layout-level in App Router).
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: SITE.name,
    type: 'website',
    locale: 'en_US',
    url: new URL('/', SITE.url).toString(),
    images: [
      {
        url: new URL(SITE.ogImage, SITE.url).toString(),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Hosted fonts — no Google Fonts network request at runtime (spec §2.3). */}
        <link rel="stylesheet" href="/fonts/inter.css" />
        <link rel="stylesheet" href="/fonts/urbanist.css" />
      </head>
      <body>
        <Registry>
          {/* fe-analytics mount contract (arch §2.7) — client provider,
              renders children unchanged; adapters inject their own scripts. */}
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </Registry>
        {/* Site-wide JSON-LD (arch §3.6) — server-rendered, once. */}
        <JsonLd data={organization()} />
        <JsonLd data={website()} />
      </body>
    </html>
  );
}
