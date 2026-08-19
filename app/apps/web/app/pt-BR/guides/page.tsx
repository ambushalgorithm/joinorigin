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
 * `/pt-BR/guides` — generated locale guide hub (TASK-453).
 *
 * Lists EVERY guide; each card's title/description resolves the active
 * locale's committed content with EN fallback
 * (`guidePageEntriesWithFallback('pt-BR')`), matching the
 * EN-fallback contract on every `/<locale>/**` page. Metadata emits the
 * hreflang set (`guideHubMetadata`) — SEO metadata stays EN
 * (arch-i18n §1.2).
 */
export const metadata: Metadata = guideHubMetadata('pt-BR');

export default function PtBRGuidesHubPage() {
  const entries = guidePageEntriesWithFallback('pt-BR');
  return (
    <>
      <GuidesHubView entries={entries} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/pt-BR' },
          { name: 'Guides', path: guideHubPath('pt-BR') },
        ])}
      />
    </>
  );
}
