import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '../../../../../components/location/LocationView';
import { getServerLocale } from '../../../../../lib/i18n-server';
import { JsonLd } from '../../../../../lib/seo/JsonLdScript';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  warmParamsFor,
} from '../../../../../lib/seo/locationView';

/**
 * `/location/[country]/[region]/[city]` — city page (design §8.4, §6.4).
 *
 * Warm set: the two MVP flagship cities (New York City, Berlin) are
 * prerendered; every other city renders on first request via ISR. The
 * "Explore community types" + "Communities in nearby cities" sections
 * (and their group-type variant/idea pages) render for EVERY content-rich
 * city — tier-irrelevant (Sprint 20, TASK-472). Indexability stays
 * tier-gated: `indexable` = tier ≤ 2 AND G1–G5 pass; Tier-3 content pages
 * (e.g. Copenhagen) render but stay `noindex, follow`. Unknown slugs →
 * `notFound()` (G3 enforcement).
 *
 * Locale-aware body (TASK-446): view data resolves through the active server
 * locale (proxy-forwarded `x-joinorigin-locale`) — e.g. Mexico City renders
 * the committed Spanish content with an `es` cookie, Austin falls back to EN
 * (no es content) — with EN fallback via `contentFor`; SEO metadata stays EN
 * (arch-i18n §1.2).
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsFor('city');
}

interface CityPageProps {
  params: Promise<{ country: string; region: string; city: string }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { country, region, city } = await params;
  const entry = resolveLocationEntry({ country, region, city });
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function CityPage({ params }: CityPageProps) {
  const { country, region, city } = await params;
  const entry = resolveLocationEntry({ country, region, city });
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
      {jsonLd.city ? <JsonLd data={jsonLd.city} /> : null}
    </>
  );
}
