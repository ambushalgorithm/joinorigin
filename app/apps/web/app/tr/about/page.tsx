import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { aboutPage, breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { AboutView } from '../../about/about-view';

/**
 * `/tr/about` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/about/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/tr/about' })`, breadcrumb `Home` → `/tr`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458): title/description/OG
 * stay on the EN copy (no translated static-page content exists), while
 * canonical + hreflang stay per-locale — canonical
 * `/tr/about` and `alternates.languages` `tr` +
 * `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'About — The Operating System for Human Collaboration | JoinOrigin',
  description:
    "Origin's mission: a social collaboration network where people post ideas, form communities, and build projects together. The network is the product.",
  path: '/tr/about',
  locale: 'tr',
  keywords: [
    'about JoinOrigin',
    'social collaboration network mission',
    'social operating system',
    'relationship network',
    'what is JoinOrigin',
  ],
});

export default function TrAboutPage() {
  return (
    <>
      <AboutView />
      <JsonLd data={aboutPage()} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/tr' },
          { name: 'About', path: '/tr/about' },
        ])}
      />
    </>
  );
}
