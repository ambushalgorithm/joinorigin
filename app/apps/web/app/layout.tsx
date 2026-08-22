import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';

import { getDictionary, getDir, resolveLocale } from '@joinorigin/i18n';

import { AnalyticsProvider } from '../lib/analytics';
import LocalePathnameSync from '../components/LocalePathnameSync';
import { JsonLd } from '../lib/seo/JsonLdScript';
import { organization, website } from '../lib/seo/jsonLd';
import { SITE } from '../lib/seo/site';
import Registry from './registry';

/**
 * Site-wide metadata + structured data + analytics + i18n mount
 * (arch §3.3, §3.6; i18n arch §6.3).
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
 * - i18n: the proxy resolves the locale (URL prefix → Accept-Language → en)
 *   and forwards it as `x-joinorigin-locale`; this layout renders
 *   `<html lang dir>` from that server-resolved locale (SSR first paint) and
 *   hands it to the `LocalePathnameSync` wrapper, which seeds the client
 *   `I18nProvider` with the URL-derived locale (pathname prefix wins; the
 *   server locale is the unprefixed fallback). The active locale therefore
 *   follows the URL on every navigation (TASK-488) — no cookie. SEO
 *   metadata stays hardcoded English per arch-i18n §1.2.
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerStore = await headers();
  const serverLocale = resolveLocale(headerStore.get('x-joinorigin-locale') ?? undefined);
  const dir = getDir(serverLocale);
  const serverDictionary = getDictionary(serverLocale);

  return (
    <html
      lang={serverLocale}
      dir={dir}
      // Critical first-paint style: the brand canvas color is applied as an
      // inline attribute so the page never flashes white before the
      // styled-components SSR flush is parsed (FOUC elimination, TASK-404).
      // Mirrors `theme.colors.background` (#0A1022).
      //
      // `suppressHydrationWarning` is intentional: React 19 compares the
      // style attribute during hydration and reports a diff between the
      // server-serialized `background-color: rgb(...)` and the client
      // camelCase style object even though the computed value is identical.
      // The attribute is static and critical — no patching is needed, and
      // suppressing the check keeps hydration from bailing on the whole tree.
      suppressHydrationWarning
      style={{ backgroundColor: 'rgb(10, 16, 34)' }}
    >
      <head>
        {/* Hosted fonts — no Google Fonts network request at runtime (spec §2.3).
            Latin + latin-ext subsets are preloaded (critical path) so the
            `font-display: swap` faces are ready near first paint (TASK-494);
            the CSS files declare the full @font-face + unicode-range set and
            /fonts/* is served with immutable cache headers. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/inter/inter-latin.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/inter/inter-latin-ext.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/urbanist/urbanist-latin.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/urbanist/urbanist-latin-ext.woff2"
        />
        <link rel="stylesheet" href="/fonts/inter.css" />
        <link rel="stylesheet" href="/fonts/urbanist.css" />
      </head>
      <body suppressHydrationWarning style={{ backgroundColor: 'rgb(10, 16, 34)' }}>
        <Registry>
          {/* i18n mount — URL-locale provider wrapper (TASK-488): reads
              `usePathname()` and seeds `I18nProvider` with the pathname-
              derived locale (server-resolved `x-joinorigin-locale` is the
              unprefixed fallback, arch-i18n §6.3), so the active locale
              follows the URL on every navigation and the first paint is
              already translated. The language switcher is navigation only —
              no setLocale-then-push toggle. */}
          <LocalePathnameSync serverLocale={serverLocale} serverDictionary={serverDictionary}>
            {/* fe-analytics mount contract (arch §2.7) — client provider,
                renders children unchanged; adapters inject their own scripts. */}
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </LocalePathnameSync>
        </Registry>
        {/* Site-wide JSON-LD (arch §3.6) — server-rendered, once. */}
        <JsonLd data={organization()} />
        <JsonLd data={website()} />
      </body>
    </html>
  );
}
