import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { aboutPage, breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { AboutView } from '../../about/about-view';

/**
 * `/pt-BR/about` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/about/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/pt-BR/about' })`, breadcrumb `Home` → `/pt-BR`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'About — The Operating System for Human Collaboration | JoinOrigin',
  description:
    "Origin's mission: a social collaboration network where people post ideas, form communities, and build projects together. The network is the product.",
  path: '/pt-BR/about',
  keywords: [
    'about JoinOrigin',
    'social collaboration network mission',
    'social operating system',
    'relationship network',
    'what is JoinOrigin',
  ],
});

export default function PtBRAboutPage() {
  return (
    <>
      <AboutView />
      <JsonLd data={aboutPage()} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/pt-BR' },
          { name: 'About', path: '/pt-BR/about' },
        ])}
      />
    </>
  );
}
