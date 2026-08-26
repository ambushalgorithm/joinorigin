import type { Metadata } from 'next';

import { LocationView } from '../../components/location/LocationView';
import { getServerLocale } from '../../lib/i18n-server';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import { getServerCountry } from '../../lib/seo/geo';
import {
  buildLocationViewData,
  hubEntry,
  locationJsonLd,
  locationMetadata,
} from '../../lib/seo/locationView';

/**
 * `/location` hub (design §8.4, warm set) — the browsable entry point for
 * the location hierarchy. Server wrapper pattern (arch §3.3): exports
 * metadata + server-rendered JSON-LD (`BreadcrumbList`) and renders the
 * client view. `revalidate` keeps the hub on the 30-day ISR cadence shared
 * by every location route (§8.3).
 *
 * Locale-aware body (TASK-446): view data resolves through the active server
 * locale (proxy-forwarded `x-joinorigin-locale`) — chrome (breadcrumbs,
 * guide-link card titles, directory labels) and any committed per-locale
 * content render in the selected locale, with EN fallback via `contentFor`.
 * SEO metadata stays EN (arch-i18n §1.2).
 */
export const revalidate = 2592000;

export const metadata: Metadata = (() => {
  const entry = hubEntry();
  return entry ? locationMetadata(entry) : {};
})();

export default async function LocationHubPage() {
  const entry = hubEntry();
  if (!entry) {
    return null;
  }
  const data = buildLocationViewData(entry, await getServerLocale(), await getServerCountry());
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
