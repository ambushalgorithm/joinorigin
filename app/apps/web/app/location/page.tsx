import type { Metadata } from 'next';

import { LocationView } from '../../components/location/LocationView';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  hubEntry,
  locationJsonLd,
  locationMetadata,
} from '../../lib/seo/locationView';

/**
 * `/location` hub (design §8.4, warm set) — the browsable entry point for
 * the location hierarchy. Server wrapper pattern (arch §3.3): exports
 * metadata + server-rendered JSON-LD (`BreadcrumbList`) and renders the
 * client view. `revalidate` keeps the hub on the 30-day ISR cadence shared
 * by every location route (§8.3).
 */
export const revalidate = 2592000;

export const metadata: Metadata = (() => {
  const entry = hubEntry();
  return entry ? locationMetadata(entry) : {};
})();

export default function LocationHubPage() {
  const entry = hubEntry();
  if (!entry) {
    return null;
  }
  const data = buildLocationViewData(entry, 'en');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
    </>
  );
}
