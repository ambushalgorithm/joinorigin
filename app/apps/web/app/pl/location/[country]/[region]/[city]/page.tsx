import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../../../components/location/LocationView';
import { JsonLd } from '../../../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
} from '../../../../../../lib/seo/locationView';

/**
 * `/pl/location/[country]/[region]/[city]` — generated locale location
 * City page (TASK-448, TASK-453).
 *
 * Mirrors the EN `app/location/[country]/[region]/[city]/page.tsx` wrapper:
 * the EN registry entry resolves (`resolveLocationEntry(params)` — no
 * locale), view data renders the active locale's body via
 * `buildLocationViewData(entry, 'pl')` (per-locale content with
 * EN fallback — es content where it exists, EN otherwise), and unknown
 * slugs with no EN entry → `notFound()`. Rendered per-request: the
 * root layout reads `headers()`, so SSG/ISR would crash with
 * DYNAMIC_SERVER_USAGE.
 */
export const dynamic = 'force-dynamic';

interface PlCityPageProps {
  params: Promise<{ country: string; region: string; city: string }>;
}

export async function generateMetadata({ params }: PlCityPageProps): Promise<Metadata> {
  const { country, region, city } = await params;
  const entry = resolveLocationEntry({ country, region, city });
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function PlCityPage({ params }: PlCityPageProps) {
  const { country, region, city } = await params;
  const entry = resolveLocationEntry({ country, region, city });
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'pl');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
