import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../../../../components/location/LocationView';
import { JsonLd } from '../../../../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
} from '../../../../../../../lib/seo/locationView';

/**
 * `/th/location/[country]/[region]/[city]/[variant]` — generated locale location
 * Variant page (TASK-448, TASK-453).
 *
 * Mirrors the EN `app/location/[country]/[region]/[city]/[variant]/page.tsx` wrapper:
 * the EN registry entry resolves (`resolveLocationEntry(params)` — no
 * locale), view data renders the active locale's body via
 * `buildLocationViewData(entry, 'th')` (per-locale content with
 * EN fallback — es content where it exists, EN otherwise), and unknown
 * slugs with no EN entry → `notFound()`. Rendered per-request: the
 * root layout reads `headers()`, so SSG/ISR would crash with
 * DYNAMIC_SERVER_USAGE.
 */
export const dynamic = 'force-dynamic';

interface ThVariantPageProps {
  params: Promise<{ country: string; region: string; city: string; variant: string }>;
}

export async function generateMetadata({ params }: ThVariantPageProps): Promise<Metadata> {
  const { country, region, city, variant } = await params;
  const entry = resolveLocationEntry({ country, region, city, variant });
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function ThVariantPage({ params }: ThVariantPageProps) {
  const { country, region, city, variant } = await params;
  const entry = resolveLocationEntry({ country, region, city, variant });
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'th');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
      {jsonLd.itemList ? <JsonLd data={jsonLd.itemList} /> : null}
    </>
  );
}
