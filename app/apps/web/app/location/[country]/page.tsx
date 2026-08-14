import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../components/location/LocationView';
import { JsonLd } from '../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  warmParamsFor,
} from '../../../lib/seo/locationView';

/**
 * `/location/[country]` — country page (design §8.4, §6.4).
 *
 * Warm set: the two MVP flagship countries (United States, Germany) are
 * prerendered; every other country renders on first request via ISR and is
 * `noindex, follow` (Tier-3 until content passes G1–G5). Unknown slugs →
 * `notFound()` (G3 enforcement).
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsFor('country');
}

interface CountryPageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country } = await params;
  const entry = resolveLocationEntry({ country });
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country } = await params;
  const entry = resolveLocationEntry({ country });
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, 'en');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
