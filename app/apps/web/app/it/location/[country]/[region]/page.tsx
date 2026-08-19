import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../../components/location/LocationView';
import { JsonLd } from '../../../../../lib/seo/JsonLdScript';
import { localizeMetadata } from '../../../../../lib/seo/metadata';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
} from '../../../../../lib/seo/locationView';

/**
 * `/it/location/[country]/[region]` — generated locale location
 * Region page (TASK-448, TASK-453, TASK-458).
 *
 * Mirrors the EN `app/location/[country]/[region]/page.tsx` wrapper:
 * the active locale's committed entry resolves first
 * (`resolveLocationEntry(params, 'it')`), EN entry otherwise —
 * view data renders the active locale's body via
 * `buildLocationViewData(entry, 'it')` (per-locale content with
 * EN fallback), and unknown slugs with no EN entry → `notFound()`.
 * Metadata is per-locale with EN fallback (TASK-458): the locale entry's
 * committed title/description/OG win when it exists; otherwise the EN
 * copy is used with canonical + hreflang localized to
 * `/it/location/[country]/[region]` (`x-default` → EN
 * canonical). Rendered per-request: the root layout reads `headers()`,
 * so SSG/ISR would crash with DYNAMIC_SERVER_USAGE.
 */
export const dynamic = 'force-dynamic';

interface ItRegionPageProps {
  params: Promise<{ country: string; region: string }>;
}

export async function generateMetadata({ params }: ItRegionPageProps): Promise<Metadata> {
  const { country, region } = await params;
  const localeEntry = resolveLocationEntry({ country, region }, 'it');
  const entry = localeEntry ?? resolveLocationEntry({ country, region });
  if (!entry) {
    return {};
  }
  return localeEntry
    ? locationMetadata(localeEntry)
    : localizeMetadata(locationMetadata(entry), 'it', entry.path);
}

export default async function ItRegionPage({ params }: ItRegionPageProps) {
  const { country, region } = await params;
  const entry = resolveLocationEntry({ country, region });
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'it');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
