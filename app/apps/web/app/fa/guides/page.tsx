import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import {
  guideHubFaq,
  guideHubMetadata,
  guideHubPath,
  guidePageEntriesWithFallback,
} from '../../../lib/seo/guides';
import { breadcrumbList, faqPage } from '../../../lib/seo/jsonLd';
import { GuidesHubView } from '../../guides/guides-hub-view';

/**
 * `/fa/guides` — generated locale guide hub (TASK-453, TASK-458).
 *
 * Lists EVERY guide; each card's title/description resolves the active
 * locale's committed content with EN fallback
 * (`guidePageEntriesWithFallback('fa')`), matching the
 * EN-fallback contract on every `/<locale>/**` page. Metadata is
 * per-locale with EN fallback (TASK-458): the hub copy stays EN (no
 * translated hub content exists), while canonical + hreflang localize to
 * `/fa/guides` with `x-default` → EN canonical
 * (`guideHubMetadata`). The visible FAQ (G-12) resolves per-locale via
 * `guideHubFaq` and is mirrored 1:1 in the `FAQPage` JSON-LD.
 */
export const metadata: Metadata = guideHubMetadata('fa');

export default function FaGuidesHubPage() {
  const entries = guidePageEntriesWithFallback('fa');
  const faq = guideHubFaq('fa');
  return (
    <>
      <GuidesHubView entries={entries} faq={faq} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/fa' },
          { name: 'Guides', path: guideHubPath('fa') },
        ])}
      />
      <JsonLd data={faqPage(faq)} />
    </>
  );
}
