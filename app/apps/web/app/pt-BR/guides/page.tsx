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
 * `/pt-BR/guides` — generated locale guide hub (TASK-453, TASK-458).
 *
 * Lists EVERY guide; each card's title/description resolves the active
 * locale's committed content with EN fallback
 * (`guidePageEntriesWithFallback('pt-BR')`), matching the
 * EN-fallback contract on every `/<locale>/**` page. Metadata is
 * per-locale with EN fallback (TASK-458): the hub copy stays EN (no
 * translated hub content exists), while canonical + hreflang localize to
 * `/pt-BR/guides` with `x-default` → EN canonical
 * (`guideHubMetadata`). The visible FAQ (G-12) resolves per-locale via
 * `guideHubFaq` and is mirrored 1:1 in the `FAQPage` JSON-LD.
 */
export const metadata: Metadata = guideHubMetadata('pt-BR');

export default function PtBRGuidesHubPage() {
  const entries = guidePageEntriesWithFallback('pt-BR');
  const faq = guideHubFaq('pt-BR');
  return (
    <>
      <GuidesHubView entries={entries} faq={faq} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/pt-BR' },
          { name: 'Guides', path: guideHubPath('pt-BR') },
        ])}
      />
      <JsonLd data={faqPage(faq)} />
    </>
  );
}
