import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { FeaturesView } from './features-view';

/**
 * Features page (discovery §5.2) — server wrapper exporting page metadata +
 * server-rendered `BreadcrumbList` JSON-LD. The FAQPage JSON-LD is rendered
 * by the view from the active locale dictionary (arch-i18n §7.4), mirrored
 * 1:1 with the visible FAQ block in the initial SSR HTML.
 */
export const metadata: Metadata = createMetadata({
  title: 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
  description:
    "Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — a social collaboration network for real outcomes.",
  path: '/features',
  keywords: [
    'community platform features',
    'collaboration network',
    'community chat',
    'community feed',
    'online community platform',
    'project collaboration platform',
    'community building platform',
  ],
});

export default function FeaturesPage() {
  return (
    <>
      <FeaturesView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Features', path: '/features' },
        ])}
      />
    </>
  );
}
