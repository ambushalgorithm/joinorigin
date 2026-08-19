import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import {
  guideHubMetadata,
  guideHubPath,
  guidePageEntriesWithFallback,
} from '../../../lib/seo/guides';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { GuidesHubView } from '../../guides/guides-hub-view';

/**
 * `/ru/guides` — generated locale guide hub (TASK-453, TASK-458).
 *
 * Lists EVERY guide; each card's title/description resolves the active
 * locale's committed content with EN fallback
 * (`guidePageEntriesWithFallback('ru')`), matching the
 * EN-fallback contract on every `/<locale>/**` page. Metadata is
 * per-locale with EN fallback (TASK-458): the hub copy stays EN (no
 * translated hub content exists), while canonical + hreflang localize to
 * `/ru/guides` with `x-default` → EN canonical
 * (`guideHubMetadata`).
 */
export const metadata: Metadata = guideHubMetadata('ru');

export default function RuGuidesHubPage() {
  const entries = guidePageEntriesWithFallback('ru');
  return (
    <>
      <GuidesHubView entries={entries} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ru' },
          { name: 'Guides', path: guideHubPath('ru') },
        ])}
      />
    </>
  );
}
