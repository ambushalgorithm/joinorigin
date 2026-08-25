/**
 * Example-communities target resolver (Story E, TASK-536).
 *
 * The `/community` and home "Example communities" chips (community types
 * such as "Startup Founders", "Small Businesses", "Book Clubs") become real
 * links to the content-rich community that is most relevant to the visitor:
 *
 *  - Geo present (`getServerCountry()` / the proxy-forwarded
 *    `x-joinorigin-ip-country` header, TASK-479): pick the CLOSEST country
 *    to the visitor (their own country when it hosts content-rich
 *    communities, otherwise the content-rich country whose community
 *    reference point is nearest — haversine distance over dataset city
 *    coordinates), then the LARGEST content-rich community within it
 *    (highest-population content-rich city).
 *  - Geo absent / malformed: the locale-language default — the largest
 *    content-rich community in the locale's primary country (the first
 *    country of the locale's language-area ordering, `LOCALE_CITY_SLUGS`).
 *
 * The resolver reuses the existing location data layer (TASK-480/484/520)
 * WITHOUT modifying it — `contentRichCities()` / `findCountry` /
 * `findCityBySlug` / `LOCALE_CITY_SLUGS` and the registry-exact path builder
 * `cityLocationPath` (TASK-469). All lookups are deterministic: ties break on
 * the `CONTENT_RICH_CITY_SLUGS` order (first occurrence wins), and derived
 * maps are memoized (same pattern as the TASK-520 snapshot indexes).
 *
 * This module is SERVER-side only: it imports the location snapshot, so
 * client components must never import it (the 12 MB `locations.json` would
 * leak into client bundles — see `docs/design/sprint-22-nav-perf-baseline.md`
 * RC1). `components/ChipMarqueeServer.tsx` is the server entry point that
 * feeds the resolved path to the client `ChipMarquee`.
 */

import type { Locale } from '@joinorigin/i18n';

import type { LocationCity, LocationCountry } from './data/types';
import {
  LOCALE_CITY_SLUGS,
  contentRichCities,
  findCityBySlug,
  findCountry,
  loadLocationSnapshot,
} from './locationData';
import { cityLocationPath } from './locationView';

/** One content-rich community target resolved for a surface locale. */
export interface ExampleCommunityTarget {
  /** The country whose content-rich community is selected. */
  country: LocationCountry;
  /** The largest content-rich city within that country (by population). */
  city: LocationCity;
  /** Registry-exact localized city path on the ACTIVE locale surface
   *  (`/${locale}/location/<country>/<region>/<city>` — TASK-469). */
  path: string;
}

/** ISO-3166-1 alpha-2 — exactly two uppercase ASCII letters (mirrors
 *  `geo.ts`'s validation so malformed header values fall back cleanly). */
const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/;

/** Earth radius in km (haversine distance). */
const EARTH_RADIUS_KM = 6371;

/**
 * Normalize a raw country value (uppercase + trim) and validate it as an
 * ISO-3166-1 alpha-2 code. Returns `null` when absent or malformed so the
 * caller falls back to the locale-language default (TASK-479 contract).
 */
function normalizeCountryCode(ipCountry?: string | null): string | null {
  if (!ipCountry) return null;
  const raw = ipCountry.trim().toUpperCase();
  return COUNTRY_CODE_PATTERN.test(raw) ? raw : null;
}

/** Great-circle distance in km between two lat/lng points. */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

/* ------------------------------------------------------------------ *
 * Memoized derived maps (deterministic — built once from the snapshot
 * and the content-rich set, mirroring the TASK-520 index pattern).
 * ------------------------------------------------------------------ */

/** Distinct content-rich country codes in `CONTENT_RICH_CITY_SLUGS` order
 *  (first occurrence wins) — the deterministic candidate ordering. */
let contentRichCountryOrderCache: readonly string[] | undefined;

function contentRichCountryOrder(): readonly string[] {
  if (!contentRichCountryOrderCache) {
    const seen = new Set<string>();
    const order: string[] = [];
    for (const city of contentRichCities()) {
      if (!seen.has(city.countryIso2)) {
        seen.add(city.countryIso2);
        order.push(city.countryIso2);
      }
    }
    contentRichCountryOrderCache = Object.freeze(order);
  }
  return contentRichCountryOrderCache;
}

/** Per content-rich country, its LARGEST content-rich city (by population,
 *  first-wins on ties) — the "community destination" reference point. */
let largestContentRichCityByCountryCache: Map<string, LocationCity> | undefined;

function largestContentRichCityByCountry(): Map<string, LocationCity> {
  if (!largestContentRichCityByCountryCache) {
    const map = new Map<string, LocationCity>();
    for (const city of contentRichCities()) {
      const existing = map.get(city.countryIso2);
      if (!existing || (city.population ?? 0) > (existing.population ?? 0)) {
        map.set(city.countryIso2, city);
      }
    }
    largestContentRichCityByCountryCache = map;
  }
  return largestContentRichCityByCountryCache;
}

/** Per country, a stable geographic reference city from the snapshot:
 *  the capital (GeoNames `PPLC`) when present — else the highest-population
 *  city, first-wins on ties. Countries do not carry coordinates in the
 *  snapshot, so capitals are the deterministic proxy for "where the user's
 *  country is" when computing the closest content-rich country. */
let countryReferenceCityCache: Map<string, LocationCity> | undefined;

function countryReferenceCity(iso2: string): LocationCity | undefined {
  if (!countryReferenceCityCache) {
    const map = new Map<string, LocationCity>();
    for (const city of loadLocationSnapshot().cities) {
      const existing = map.get(city.countryIso2);
      if (!existing) {
        map.set(city.countryIso2, city);
        continue;
      }
      const existingIsCapital = existing.featureCode === 'PPLC';
      const cityIsCapital = city.featureCode === 'PPLC';
      if (cityIsCapital && !existingIsCapital) {
        map.set(city.countryIso2, city);
      } else if (cityIsCapital === existingIsCapital) {
        if ((city.population ?? 0) > (existing.population ?? 0)) {
          map.set(city.countryIso2, city);
        }
      }
    }
    countryReferenceCityCache = map;
  }
  return countryReferenceCityCache.get(iso2);
}

/** The country hosting the globally largest content-rich city — the
 *  defensive fallback when the locale's primary country cannot resolve. */
function largestContentRichCountryFallback(): LocationCountry | undefined {
  let largest: LocationCity | undefined;
  for (const city of contentRichCities()) {
    if (!largest || (city.population ?? 0) > (largest.population ?? 0)) {
      largest = city;
    }
  }
  return largest ? findCountry(largest.countryIso2) : undefined;
}

/**
 * The closest content-rich country to the visitor. A direct country match
 * (the visitor's own country hosts content-rich communities) wins at
 * distance 0; otherwise the content-rich country whose reference point
 * (its largest content-rich city) is nearest the visitor country's
 * reference point (its capital). Deterministic — ties break on the
 * `CONTENT_RICH_CITY_SLUGS` order.
 */
function closestContentRichCountry(ipCountry: string): LocationCountry | undefined {
  const candidates = contentRichCountryOrder();
  if (candidates.includes(ipCountry)) return findCountry(ipCountry);
  const userRef = countryReferenceCity(ipCountry);
  if (!userRef) return undefined;
  let bestIso: string | undefined;
  let bestDistance = Infinity;
  for (const iso of candidates) {
    const ref = largestContentRichCityByCountry().get(iso);
    if (!ref) continue;
    const distance = haversineKm(userRef.lat, userRef.lng, ref.lat, ref.lng);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIso = iso;
    }
  }
  return bestIso ? findCountry(bestIso) : undefined;
}

/**
 * The locale's primary country — the first country of the locale's
 * language-area ordering (`LOCALE_CITY_SLUGS`, user-approved Sprint 18
 * grouping). This is the locale-language default target country.
 */
function localeDefaultCountry(locale: Locale): LocationCountry | undefined {
  const primarySlug = LOCALE_CITY_SLUGS[locale][0];
  if (!primarySlug) return undefined;
  const city = findCityBySlug(primarySlug);
  if (!city) return undefined;
  return findCountry(city.countryIso2);
}

/**
 * Resolve the country for the example-communities target:
 *
 *  1. Geo present + well-formed → the closest content-rich country to the
 *     visitor (their own when it hosts content-rich communities).
 *  2. Geo absent/malformed (or unresolvable) → the locale's primary
 *     country (locale-language default), with the globally largest
 *     content-rich country as a defensive fallback.
 */
function resolveExampleCountry(
  locale: Locale,
  ipCountry?: string | null,
): LocationCountry | undefined {
  const normalized = normalizeCountryCode(ipCountry);
  if (normalized) {
    const geoCountry = closestContentRichCountry(normalized);
    if (geoCountry) return geoCountry;
  }
  return localeDefaultCountry(locale) ?? largestContentRichCountryFallback();
}

/**
 * Resolve the target content-rich community page for the example-community
 * chips (Story E).
 *
 * @param locale The active surface locale — drives the registry-exact
 *   localized path (`/${locale}/location/...`, TASK-469) and the
 *   locale-language default when geo is absent.
 * @param ipCountry Optional ISO-3166-1 alpha-2 visitor country (the
 *   `getServerCountry()` value). Absent/malformed values fall back to the
 *   locale default.
 * @returns The resolved `{ country, city, path }` target, or `undefined`
 *   only when the data layer cannot resolve any content-rich community
 *   (defensive — the committed set is never empty).
 */
export function exampleCommunityTarget(
  locale: Locale,
  ipCountry?: string | null,
): ExampleCommunityTarget | undefined {
  const country = resolveExampleCountry(locale, ipCountry);
  if (!country) return undefined;
  const city = largestContentRichCityByCountry().get(country.iso2);
  if (!city) return undefined;
  const path = cityLocationPath(city, locale);
  if (!path) return undefined;
  return { country, city, path };
}
