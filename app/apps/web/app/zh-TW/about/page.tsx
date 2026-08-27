import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { aboutPage, breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { AboutView } from '../../about/about-view';

/**
 * `/zh-TW/about` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/about/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/zh-TW/about' })`, breadcrumb `Home` → `/zh-TW`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/zh-TW/about` and `alternates.languages` `zh-TW` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'About — The Operating System for Human Collaboration | JoinOrigin',
  description:
    "Origin's mission: one space where people start around a goal, gather the people and resources they need, and build together. The network is the product.",
  path: '/zh-TW/about',
  locale: 'zh-TW',
  keywords: [
    'about JoinOrigin',
    'social collaboration network mission',
    'social operating system',
    'relationship network',
    'what is JoinOrigin',
  ],
});

export default function ZhTWAboutPage() {
  return (
    <>
      <AboutView />
      <JsonLd data={aboutPage()} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/zh-TW' },
          { name: 'About', path: '/zh-TW/about' },
        ])}
      />
    </>
  );
}
