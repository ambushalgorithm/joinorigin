import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../../../components/location/LocationView';
import { JsonLd } from '../../../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  warmParamsForLocale,
} from '../../../../../../lib/seo/locationView';

/**
 * `/pt-BR/location/[country]/[region]/[city]` — generated locale location
 * City page (TASK-448).
 *
 * Mirrors the EN `app/location/[country]/[region]/[city]/page.tsx` wrapper with
 * the locale fixed: `warmParamsForLocale` enumerates only committed
 * per-locale entries, unknown slugs → `notFound()` (localization R5),
 * and metadata comes from `locationMetadata(entry)`.
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsForLocale('city', 'pt-BR');
}

interface PtBRCityPageProps {
  params: Promise<{ country: string; region: string; city: string }>;
}

export async function generateMetadata({ params }: PtBRCityPageProps): Promise<Metadata> {
  const { country, region, city } = await params;
  const entry = resolveLocationEntry({ country, region, city }, 'pt-BR');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function PtBRCityPage({ params }: PtBRCityPageProps) {
  const { country, region, city } = await params;
  const entry = resolveLocationEntry({ country, region, city }, 'pt-BR');
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'pt-BR');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
