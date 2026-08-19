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
 * `/ko/guides` — generated locale guide hub (TASK-453).
 *
 * Lists EVERY guide; each card's title/description resolves the active
 * locale's committed content with EN fallback
 * (`guidePageEntriesWithFallback('ko')`), matching the
 * EN-fallback contract on every `/<locale>/**` page. Metadata emits the
 * hreflang set (`guideHubMetadata`) — SEO metadata stays EN
 * (arch-i18n §1.2).
 */
export const metadata: Metadata = guideHubMetadata('ko');

export default function KoGuidesHubPage() {
  const entries = guidePageEntriesWithFallback('ko');
  return (
    <>
      <GuidesHubView entries={entries} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ko' },
          { name: 'Guides', path: guideHubPath('ko') },
        ])}
      />
    </>
  );
}
