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
 * `/pt-BR/location/[country]/[region]` — generated locale location
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
  return warmParamsForLocale('region', 'pt-BR');
}

interface PtBRRegionPageProps {
  params: Promise<{ country: string; region: string }>;
}

export async function generateMetadata({ params }: PtBRRegionPageProps): Promise<Metadata> {
  const { country, region } = await params;
  const entry = resolveLocationEntry({ country, region }, 'pt-BR');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function PtBRRegionPage({ params }: PtBRRegionPageProps) {
  const { country, region } = await params;
  const entry = resolveLocationEntry({ country, region }, 'pt-BR');
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
