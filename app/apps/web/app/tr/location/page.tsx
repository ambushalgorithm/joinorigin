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
 * `/tr/location` — generated locale location hub (TASK-448).
 *
 * Mirrors the EN `app/location/page.tsx` wrapper. The hub entry is the
 * canonical EN hub (per-locale location entries exist only where committed
 * content is registered); view data renders the active locale's chrome via
 * `buildLocationViewData(entry, 'tr')`.
 */
export const revalidate = 2592000;

export const metadata: Metadata = (() => {
  const entry = hubEntry();
  return entry ? locationMetadata(entry) : {};
})();

export default async function TrLocationHubPage() {
  const entry = hubEntry();
  if (!entry) {
    return null;
  }
  const data = buildLocationViewData(entry, 'tr');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
    </>
  );
}
