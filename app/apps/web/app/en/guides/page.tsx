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
 * `/en/guides` — generated locale guide hub (TASK-453, TASK-458).
 *
 * Lists EVERY guide; each card's title/description resolves the active
 * locale's committed content with EN fallback
 * (`guidePageEntriesWithFallback('en')`), matching the
 * EN-fallback contract on every `/<locale>/**` page. Metadata is
 * per-locale with EN fallback (TASK-458): the hub copy stays EN (no
 * translated hub content exists), while canonical + hreflang localize to
 * `/en/guides` with `x-default` → EN canonical
 * (`guideHubMetadata`). The visible FAQ (G-12) resolves per-locale via
 * `guideHubFaq` and is mirrored 1:1 in the `FAQPage` JSON-LD.
 */
export const metadata: Metadata = guideHubMetadata('en');

export default function EnGuidesHubPage() {
  const entries = guidePageEntriesWithFallback('en');
  const faq = guideHubFaq('en');
  return (
    <>
      <GuidesHubView entries={entries} faq={faq} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/en' },
          { name: 'Guides', path: guideHubPath('en') },
        ])}
      />
      <JsonLd data={faqPage(faq)} />
    </>
  );
}
