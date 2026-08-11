import type { Metadata } from 'next';

import { JsonLd } from '../../lib/menuPages/JsonLd';
import { breadcrumbList, faqPage } from '../../lib/menuPages/jsonLd';
import { createMetadata } from '../../lib/menuPages/metadata';
import { FEATURES_FAQ } from './features-data';
import { FeaturesView } from './features-view';

/**
 * Features page (discovery §5.2) — server wrapper exporting page metadata +
 * server-rendered JSON-LD (`BreadcrumbList` + `FAQPage`). The FAQ answers are
 * defined in the view module and mirrored 1:1 in the JSON-LD (discovery §8.3).
 */
export const metadata: Metadata = createMetadata({
  title: 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
  description:
    "Explore JoinOrigin's features: communities, real-time chat, feed, projects, companies, and opportunities — the social collaboration network built to turn relationships into outcomes.",
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
      <JsonLd data={faqPage(FEATURES_FAQ)} />
    </>
  );
}
