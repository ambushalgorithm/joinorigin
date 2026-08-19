import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../../components/location/LocationView';
import { JsonLd } from '../../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
} from '../../../../../lib/seo/locationView';

/**
 * `/es/location/[country]/[region]` — generated locale location
 * Region page (TASK-448, TASK-453).
 *
 * Mirrors the EN `app/location/[country]/[region]/page.tsx` wrapper:
 * the EN registry entry resolves (`resolveLocationEntry(params)` — no
 * locale), view data renders the active locale's body via
 * `buildLocationViewData(entry, 'es')` (per-locale content with
 * EN fallback — es content where it exists, EN otherwise), and unknown
 * slugs with no EN entry → `notFound()`. Rendered per-request: the
 * root layout reads `headers()`, so SSG/ISR would crash with
 * DYNAMIC_SERVER_USAGE.
 */
export const dynamic = 'force-dynamic';

interface EsRegionPageProps {
  params: Promise<{ country: string; region: string }>;
}

export async function generateMetadata({ params }: EsRegionPageProps): Promise<Metadata> {
  const { country, region } = await params;
  const entry = resolveLocationEntry({ country, region });
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function EsRegionPage({ params }: EsRegionPageProps) {
  const { country, region } = await params;
  const entry = resolveLocationEntry({ country, region });
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'es');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
