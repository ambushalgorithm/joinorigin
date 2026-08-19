import type { Metadata } from 'next';

import { LocationView } from '../../../components/location/LocationView';
import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { localizeMetadata } from '../../../lib/seo/metadata';
import {
  buildLocationViewData,
  hubEntry,
  locationJsonLd,
  locationMetadata,
} from '../../../lib/seo/locationView';

/**
 * `/pt-BR/location` — generated locale location hub (TASK-448).
 *
 * Mirrors the EN `app/location/page.tsx` wrapper. The hub entry is the
 * canonical EN hub; view data renders the active locale's body via
 * `buildLocationViewData(entry, 'pt-BR')` (per-locale content with
 * EN fallback — TASK-453). Metadata is per-locale with EN fallback
 * (TASK-458): the EN hub copy stays (no translated hub content), while
 * canonical + hreflang localize to `/pt-BR/location` with
 * `x-default` → EN canonical. Rendered per-request: the root layout
 * reads `headers()`, so SSG/ISR would crash with DYNAMIC_SERVER_USAGE.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = (() => {
  const entry = hubEntry();
  if (!entry) {
    return {};
  }
  return localizeMetadata(locationMetadata(entry), 'pt-BR', entry.path);
})();

export default async function PtBRLocationHubPage() {
  const entry = hubEntry();
  if (!entry) {
    return null;
  }
  const data = buildLocationViewData(entry, 'pt-BR');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
    </>
  );
}
