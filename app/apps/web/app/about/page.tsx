import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { aboutPage, breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { AboutView } from './about-view';

/**
 * About page (discovery §5.6) — server wrapper exporting page metadata +
 * server-rendered JSON-LD (`AboutPage` + `BreadcrumbList`), rendering the
 * client view. See `sprint-4-seo-arch.md` §3.3 for the server-wrapper pattern.
 */
export const metadata: Metadata = createMetadata({
  title: 'About — The Operating System for Human Collaboration | JoinOrigin',
  description:
    "Origin's mission: a social collaboration network where people post ideas, form communities, and build projects together. The network is the product.",
  path: '/about',
  keywords: [
    'about JoinOrigin',
    'social collaboration network mission',
    'social operating system',
    'relationship network',
    'what is JoinOrigin',
  ],
});

export default function AboutPage() {
  return (
    <>
      <AboutView />
      <JsonLd data={aboutPage()} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
    </>
  );
}
