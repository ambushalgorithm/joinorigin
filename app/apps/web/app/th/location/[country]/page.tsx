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
 * `/th/location/[country]` — generated locale location
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
  return warmParamsForLocale('country', 'th');
}

interface ThCountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: ThCountryPageProps): Promise<Metadata> {
  const { country } = await params;
  const entry = resolveLocationEntry({ country }, 'th');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function ThCountryPage({ params }: ThCountryPageProps) {
  const { country } = await params;
  const entry = resolveLocationEntry({ country }, 'th');
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
    </>
  );
}
