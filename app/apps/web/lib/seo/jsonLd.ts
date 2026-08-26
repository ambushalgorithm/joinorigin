import { SUPPORTED_LOCALES, type Locale } from '@joinorigin/i18n';

import { SITE, SOCIAL_PROFILES } from './site';
import { absoluteUrl } from './url';

/**
 * Typed JSON-LD structured-data builders (arch §3.6).
 *
 * Each builder returns a plain object that is safe to serialize into
 * `<script type="application/ld+json">` via `<JsonLd>` — no user input is
 * ever interpolated. All data mirrors **visible** page content (Google
 * structured-data policies, `sprint-4-discovery.md` §7): `Product`,
 * `Offer`, `AggregateRating`, and `Review` are intentionally never emitted
 * — the platform does not present commercial offers.
 *
 * Types follow `sprint-4-discovery.md` §7. The layout mounts `Organization`
 * + `WebSite` once site-wide; menu pages mount `BreadcrumbList` and
 * `FAQPage`/`AboutPage`/`ContactPage` per page.
 */

export interface BreadcrumbItem {
  name: string;
  path: string;
  /** Per-locale display names for the crumb (TASK-516) — populated for
   *  country/region/city crumbs so the client LocationView re-resolves the
   *  ACTIVE locale's name on language toggle. The server-baked `name` stays
   *  the pre-hydration/SSR fallback; JSON-LD mirrors `name` only. */
  nameLocalized?: Partial<Record<Locale, string>>;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/** Organization — mounted once in the root layout (site-wide). */
export function organization() {
  const payload: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/assets/logo/joinorigin-logo.svg'),
    description: SITE.description,
  };
  // G-7: emit `sameAs` only when real social profiles are provisioned —
  // an empty `sameAs: []` reads as an unfinished template to crawlers.
  if (SOCIAL_PROFILES.length > 0) {
    payload.sameAs = [...SOCIAL_PROFILES];
  }
  return payload;
}

/** WebSite — mounted once in the root layout. No SearchAction until real search exists. */
export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: absoluteUrl('/'),
    inLanguage: 'en',
  };
}

/** BreadcrumbList — every menu page (Home › Page). */
export function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(canonicalBreadcrumbPath(item.path)),
    })),
  };
}

/**
 * Normalize a breadcrumb path onto a canonical locale surface (G-8,
 * sprint-24 gap-analysis §6): JSON-LD breadcrumb items must not mix
 * unprefixed (`/`, `/location`) and canonical (`/en/...`) URLs — every item
 * uses the same `/<locale>/...` path the page's canonical tag uses.
 *
 * - Unprefixed paths map onto the EN canonical surface (`/` → `/en`,
 *   `/location` → `/en/location`) — the canonical tree for EN pages.
 * - Paths already on a locale surface (`/en/...`, `/de/...`, …) pass
 *   through unchanged — they are canonical on their own surface.
 */
export function canonicalBreadcrumbPath(path: string): string {
  if (path === '/' || path === '') return '/en';
  if (path === '/en' || path.startsWith('/en/')) return path;
  const segment = path.split('/')[1];
  if (segment !== undefined && SUPPORTED_LOCALES.includes(segment as Locale)) return path;
  return `/en${path}`;
}

/** FAQPage — pages with a visible FAQ block (Home, Features, Community, Docs). */
export function faqPage(entries: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

/** Input for the City/Place builder (G-13) — derived from the location
 *  dataset rows (never fabricated). */
export interface CityPlaceData {
  /** Visible city name (the page H1). */
  name: string;
  /** Canonical page path (surface-prefixed, e.g. `/en/location/...`). */
  path: string;
  /** GeoNames latitude. */
  lat: number;
  /** GeoNames longitude. */
  lng: number;
}

/**
 * City/Place + GeoCoordinates — city pages (G-13, sprint-24 gap-analysis
 * §6): schema.org `City` (a `Place`) with the dataset's real lat/lng so
 * crawlers can geolocate the city page.
 */
export function cityPlace(data: CityPlaceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'City',
    name: data.name,
    url: absoluteUrl(canonicalBreadcrumbPath(data.path)),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: data.lat,
      longitude: data.lng,
    },
  };
}

/** AboutPage — /about. */
export function aboutPage() {
  const payload: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About JoinOrigin',
    url: absoluteUrl('/about'),
    about: {
      '@type': 'Organization',
      name: SITE.name,
      url: absoluteUrl('/'),
    },
  };
  // G-7: mirror the Organization sameAs rule — omit the empty property.
  if (SOCIAL_PROFILES.length > 0) {
    (payload.about as Record<string, unknown>).sameAs = [...SOCIAL_PROFILES];
  }
  return payload;
}

/** ContactPage — /contact. */
export function contactPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact JoinOrigin',
    url: absoluteUrl('/contact'),
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      url: absoluteUrl('/'),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hello@joinorigin.co',
        url: absoluteUrl('/contact'),
      },
    },
  };
}
