import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../components/location/LocationView';
import { JsonLd } from '../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
} from '../../../../lib/seo/locationView';

/**
 * `/nl/location/[country]` — generated locale location
 * Country page (TASK-448, TASK-453).
 *
 * Mirrors the EN `app/location/[country]/page.tsx` wrapper:
 * the EN registry entry resolves (`resolveLocationEntry(params)` — no
 * locale), view data renders the active locale's body via
 * `buildLocationViewData(entry, 'nl')` (per-locale content with
 * EN fallback — es content where it exists, EN otherwise), and unknown
 * slugs with no EN entry → `notFound()`. Rendered per-request: the
 * root layout reads `headers()`, so SSG/ISR would crash with
 * DYNAMIC_SERVER_USAGE.
 */
export const dynamic = 'force-dynamic';

interface NlCountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: NlCountryPageProps): Promise<Metadata> {
  const { country } = await params;
  const entry = resolveLocationEntry({ country });
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function NlCountryPage({ params }: NlCountryPageProps) {
  const { country } = await params;
  const entry = resolveLocationEntry({ country });
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'nl');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
