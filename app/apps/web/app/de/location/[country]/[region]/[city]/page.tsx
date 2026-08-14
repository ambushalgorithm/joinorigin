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
 * `/de/location/[country]/[region]/[city]` — German Berlin city page
 * (design §7.2, Sprint 12 MVP).
 *
 * The de surface carries exactly the committed Berlin translations (city +
 * 5 variants + ideas, 7 pages). Only Berlin enumerates in
 * `generateStaticParams`; any other de slug → `notFound()` (never publish
 * locale-prefixed URLs with untranslated body — localization R5). Metadata
 * emits the full hreflang set: `de` self + `en` alternate + `x-default` →
 * EN canonical via `alternates.languages`.
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsForLocale('city', 'de');
}

interface DeCityPageProps {
  params: Promise<{ country: string; region: string; city: string }>;
}

export async function generateMetadata({ params }: DeCityPageProps): Promise<Metadata> {
  const { country, region, city } = await params;
  const entry = resolveLocationEntry({ country, region, city }, 'de');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function DeCityPage({ params }: DeCityPageProps) {
  const { country, region, city } = await params;
  const entry = resolveLocationEntry({ country, region, city }, 'de');
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
