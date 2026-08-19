import type { Metadata } from 'next';

import { LocationView } from '../../../components/location/LocationView';
import { JsonLd } from '../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  hubEntry,
  locationJsonLd,
  locationMetadata,
} from '../../../lib/seo/locationView';

/**
 * `/vi/location` — generated locale location hub (TASK-448).
 *
 * Mirrors the EN `app/location/page.tsx` wrapper. The hub entry is the
 * canonical EN hub; view data renders the active locale's body via
 * `buildLocationViewData(entry, 'vi')` (per-locale content with
 * EN fallback — TASK-453). Rendered per-request: the root layout reads
 * `headers()`, so SSG/ISR would crash with DYNAMIC_SERVER_USAGE.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = (() => {
  const entry = hubEntry();
  return entry ? locationMetadata(entry) : {};
})();

export default async function ViLocationHubPage() {
  const entry = hubEntry();
  if (!entry) {
    return null;
  }
  const data = buildLocationViewData(entry, 'vi');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
    </>
  );
}
