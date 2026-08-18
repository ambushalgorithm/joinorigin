import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { guideHubMetadata, guideHubPath, guidePageEntries } from '../../../lib/seo/guides';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { GuidesHubView } from '../../guides/guides-hub-view';

/**
 * `/<locale>/guides` — per-locale Community Building hub (TASK-421).
 *
 * Lists exactly the guides with committed `<locale>` content (untranslated
 * guides never get locale-prefixed URLs — localization R5). Metadata emits
 * the hreflang set: `<locale>` self + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = guideHubMetadata('ko');

export default function KoGuidesHubPage() {
  const entries = guidePageEntries('ko');
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
