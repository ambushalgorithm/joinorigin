import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../../../components/location/LocationView';
import { getServerLocale } from '../../../../../../lib/i18n-server';
import { JsonLd } from '../../../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  warmParamsFor,
} from '../../../../../../lib/seo/locationView';

/**
 * `/location/[country]/[region]/[city]/[variant]` — group-type variant +
 * reserved `ideas` page (design §6.5, §6.6).
 *
 * The variant segment is one of the 5 group-type keys (`startup`, `creative`,
 * `political`, `meetup`, `small-business`) or the reserved `ideas` slug. The
 * registry enumerates variant + ideas entries for EVERY content-rich city,
 * tier-irrelevant (Sprint 20, TASK-471) — committed, differentiating prose
 * decides emission (G5); warm set = the MVP flagship variants + idea pages.
 * Unknown variants → `notFound()` (G3 enforcement).
 *
 * Locale-aware body (TASK-446): view data resolves through the active server
 * locale (proxy-forwarded `x-joinorigin-locale`) with EN fallback via
 * `contentFor`; SEO metadata stays EN (arch-i18n §1.2).
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsFor('variant');
}

interface VariantPageProps {
  params: Promise<{ country: string; region: string; city: string; variant: string }>;
}

export async function generateMetadata({ params }: VariantPageProps): Promise<Metadata> {
  const { country, region, city, variant } = await params;
  const entry = resolveLocationEntry({ country, region, city, variant });
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function VariantPage({ params }: VariantPageProps) {
  const { country, region, city, variant } = await params;
  const entry = resolveLocationEntry({ country, region, city, variant });
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, await getServerLocale());
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
