import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../components/location/LocationView';
import { JsonLd } from '../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  warmParamsForLocale,
} from '../../../../lib/seo/locationView';

/**
 * `/tr/location/[country]` — generated locale location
 * Country page (TASK-448).
 *
 * Mirrors the EN `app/location/[country]/page.tsx` wrapper with
 * the locale fixed: `warmParamsForLocale` enumerates only committed
 * per-locale entries, unknown slugs → `notFound()` (localization R5),
 * and metadata comes from `locationMetadata(entry)`.
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsForLocale('country', 'tr');
}

interface TrCountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: TrCountryPageProps): Promise<Metadata> {
  const { country } = await params;
  const entry = resolveLocationEntry({ country }, 'tr');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function TrCountryPage({ params }: TrCountryPageProps) {
  const { country } = await params;
  const entry = resolveLocationEntry({ country }, 'tr');
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'tr');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
