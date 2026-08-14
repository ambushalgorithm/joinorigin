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
 * `/de/location/[country]/[region]/[city]/[variant]` — German Berlin
 * variant + reserved `ideas` page (design §7.2, Sprint 12 MVP).
 *
 * De enumeration is limited to the committed Berlin variant/idea content;
 * any other de slug → `notFound()` (localization R5 — no untranslated
 * locale-prefixed URLs). Metadata emits the full hreflang set:
 * `de` self + `en` alternate + `x-default` → EN canonical.
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsForLocale('variant', 'de');
}

interface DeVariantPageProps {
  params: Promise<{ country: string; region: string; city: string; variant: string }>;
}

export async function generateMetadata({ params }: DeVariantPageProps): Promise<Metadata> {
  const { country, region, city, variant } = await params;
  const entry = resolveLocationEntry({ country, region, city, variant }, 'de');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function DeVariantPage({ params }: DeVariantPageProps) {
  const { country, region, city, variant } = await params;
  const entry = resolveLocationEntry({ country, region, city, variant }, 'de');
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
      {jsonLd.itemList ? <JsonLd data={jsonLd.itemList} /> : null}
    </>
  );
}
