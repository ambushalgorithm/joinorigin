import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { guidePageEntries } from '../../lib/seo/guides';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { GuidesHubView } from './guides-hub-view';

/**
 * Community Building hub (design §6.3 — L2a pillar page).
 *
 * Server wrapper exporting hub metadata + server-rendered `BreadcrumbList`
 * JSON-LD. The view lists all 7 L1 guides, the glossary, and the flagship
 * city pages (topic-cluster backbone).
 */
export const metadata: Metadata = createMetadata({
  title: 'Community Building Guides | JoinOrigin',
  description:
    'Community building how-to guides: start a community, organize a meetup, get your first 10 members, find a co-founder, stay active, run hybrid groups, and moderate well.',
  path: '/guides',
  keywords: [
    'community building',
    'how to start a community',
    'organize a meetup',
    'community guides',
    'community manager',
  ],
});

export default function GuidesHubPage() {
  const entries = guidePageEntries();
  return (
    <>
      <GuidesHubView entries={entries} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
        ])}
      />
    </>
  );
}
