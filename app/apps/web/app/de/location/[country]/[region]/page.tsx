import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../../components/location/LocationView';
import { JsonLd } from '../../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  warmParamsForLocale,
} from '../../../../../lib/seo/locationView';

/**
 * `/de/location/[country]/[region]` — generated locale location
 * Region page (TASK-448).
 *
 * Mirrors the EN `app/location/[country]/[region]/page.tsx` wrapper with
 * the locale fixed: `warmParamsForLocale` enumerates only committed
 * per-locale entries, unknown slugs → `notFound()` (localization R5),
 * and metadata comes from `locationMetadata(entry)`.
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsForLocale('region', 'de');
}

interface DeRegionPageProps {
  params: Promise<{ country: string; region: string }>;
}

export async function generateMetadata({ params }: DeRegionPageProps): Promise<Metadata> {
  const { country, region } = await params;
  const entry = resolveLocationEntry({ country, region }, 'de');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function DeRegionPage({ params }: DeRegionPageProps) {
  const { country, region } = await params;
  const entry = resolveLocationEntry({ country, region }, 'de');
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'de');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
