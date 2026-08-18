import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../../../../components/location/LocationView';
import { JsonLd } from '../../../../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  warmParamsForLocale,
} from '../../../../../../../lib/seo/locationView';

/**
 * `/vi/location/[country]/[region]/[city]/[variant]` — generated locale location
 * Variant page (TASK-448).
 *
 * Mirrors the EN `app/location/[country]/[region]/[city]/[variant]/page.tsx` wrapper with
 * the locale fixed: `warmParamsForLocale` enumerates only committed
 * per-locale entries, unknown slugs → `notFound()` (localization R5),
 * and metadata comes from `locationMetadata(entry)`.
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsForLocale('variant', 'vi');
}

interface ViVariantPageProps {
  params: Promise<{ country: string; region: string; city: string; variant: string }>;
}

export async function generateMetadata({ params }: ViVariantPageProps): Promise<Metadata> {
  const { country, region, city, variant } = await params;
  const entry = resolveLocationEntry({ country, region, city, variant }, 'vi');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function ViVariantPage({ params }: ViVariantPageProps) {
  const { country, region, city, variant } = await params;
  const entry = resolveLocationEntry({ country, region, city, variant }, 'vi');
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'vi');
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
