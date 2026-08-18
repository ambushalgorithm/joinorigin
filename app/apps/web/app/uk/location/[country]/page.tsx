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
 * `/uk/location/[country]` — generated locale location
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
  return warmParamsForLocale('country', 'uk');
}

interface UkCountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: UkCountryPageProps): Promise<Metadata> {
  const { country } = await params;
  const entry = resolveLocationEntry({ country }, 'uk');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function UkCountryPage({ params }: UkCountryPageProps) {
  const { country } = await params;
  const entry = resolveLocationEntry({ country }, 'uk');
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'uk');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
