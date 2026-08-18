import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { guideHubMetadata, guidePageEntries } from '../../lib/seo/guides';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { GuidesHubView } from './guides-hub-view';

/**
 * Community Building hub (design §6.3 — L2a pillar page).
 *
 * Server wrapper exporting hub metadata + server-rendered `BreadcrumbList`
 * JSON-LD. The view lists all 7 L1 guides, the glossary, and the flagship
 * city pages (topic-cluster backbone). Metadata carries the hreflang
 * cluster for the per-locale hub surfaces (TASK-421).
 */
export const metadata: Metadata = guideHubMetadata();

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
