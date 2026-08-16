/**
 * Location-page registry — single source of truth for every `/location`
 * URL (design §8.4, D9).
 *
 * `locationPageEntries()` derives the complete location-page set from the
 * committed `locations.json` snapshot + tier config + group-type taxonomy
 * + authored content files. Every entry carries:
 *
 * ```
 * params / path / title / description / tier / indexable / lastModified /
 * priority (+ kind / groupType / locale for consumers)
 * ```
 *
 * One definition of a URL, three outputs — `generateStaticParams`
 * (fe-location-pages), `sitemap.ts` (fe-sitemap-llms), and metadata
 * builders — can never disagree. `lastModified` is the dataset version
 * date (deterministic — never `new Date()`), `indexable` is the G1–G5
 * gate result (design §6.7), and `priority` is the sitemap priority.
 *
 * No routes/pages are created here — this is data only.
 */

import type { Locale } from '@joinorigin/i18n';

import { getCityContent, getCountryContent, getRegionContent, hasContent } from './content';
import type { CityContent, LocationContent } from './content/types';
import type { LocationCity, LocationCountry, LocationRegion } from './data/types';
import { evaluatePageGates, ideaPageProse } from './locationGates';
import type { PageKind } from './locationGates';
import {
  FLAGSHIP_CITIES,
  GROUP_TYPES,
  IDEA_VARIANT,
  citySlug,
  countrySlug,
  findCityByGeonameId,
  findCountry,
  findRegion,
  getDatasetVersion,
  getFlagshipConfig,
  groupTypeLabelForLocale,
  isGroupTypeKey,
  loadLocationSnapshot,
  regionSlug,
  tierForCitySlug,
} from './locationData';
import type { FlagshipCityConfig, GroupTypeKey } from './locationData';

/** Location hub path (singular per D1 — user-approved brief). */
export const LOCATION_HUB_PATH = '/location';

const BRAND = 'JoinOrigin';
const WAITLIST_PHRASE = 'Join Origin and get discovered today.';

export interface LocationPageEntry {
  /** Dynamic segment values (design §8.4). Hub uses an empty object. */
  params: { country?: string; region?: string; city?: string; variant?: string };
  /** Canonical path, e.g. '/location/united-states/new-york/new-york'. */
  path: string;
  title: string;
  description: string;
  /** 1 = flagship, 2 = major slice, 3 = data-only long tail (§3.3). */
  tier: 1 | 2 | 3;
  /** G1–G5 result — `false` → `robots: noindex` + omitted from sitemap. */
  indexable: boolean;
  /** Dataset version date (deterministic `lastmod` source — §8.3). */
  lastModified: string;
  /** Sitemap priority. */
  priority: number;
  /** Page shape — hub | country | region | city | variant | ideas. */
  kind: PageKind;
  /** Variant key (group type or the reserved `ideas` slug). */
  groupType?: GroupTypeKey | typeof IDEA_VARIANT;
  /** Content locale (set on per-locale entries, e.g. Berlin `de`). */
  locale?: Locale;
}

/* ------------------------------------------------------------------ *
 * Title/description builders
 * ------------------------------------------------------------------ */

function cityPageTitle(displayName: string, regionLabel: string | undefined): string {
  const suffix =
    regionLabel && regionLabel.toLowerCase() !== displayName.toLowerCase()
      ? `, ${regionLabel}`
      : '';
  return `Communities in ${displayName}${suffix} | ${BRAND}`;
}

function variantPageTitle(label: string, displayName: string): string {
  return `${label} in ${displayName} | ${BRAND}`;
}

function ideasPageTitle(displayName: string): string {
  return `30 community event ideas in ${displayName} | ${BRAND}`;
}

function countryPageTitle(name: string): string {
  return `Communities in ${name} | ${BRAND}`;
}

function regionPageTitle(label: string, countryLabel?: string): string {
  const suffix = countryLabel ? `, ${countryLabel}` : '';
  return `Communities in ${label}${suffix} | ${BRAND}`;
}

function cityPageDescription(displayName: string): string {
  return `Find or start communities in ${displayName} — startup, creative, political, meetup, and small business groups. ${WAITLIST_PHRASE}`;
}

function variantPageDescription(label: string, displayName: string): string {
  return `Find or start ${label} in ${displayName} — real venues, groups, and how-tos. ${WAITLIST_PHRASE}`;
}

function ideasPageDescription(displayName: string): string {
  return `Discover 30 community event ideas in ${displayName} — networking, learning, outdoor, professional, creative, and impact events. ${WAITLIST_PHRASE}`;
}

function countryPageDescription(name: string): string {
  return `Find or start communities in ${name} — from startup scenes to small business networks. ${WAITLIST_PHRASE}`;
}

function regionPageDescription(label: string): string {
  return `Find or start communities in ${label} — meetups, groups, and events across the region. ${WAITLIST_PHRASE}`;
}

const PRIORITY: Record<PageKind, number> = {
  hub: 0.9,
  country: 0.7,
  region: 0.6,
  city: 0.5,
  variant: 0.4,
  ideas: 0.5,
};

/* ------------------------------------------------------------------ *
 * Entry construction + gate wiring
 * ------------------------------------------------------------------ */

interface BuildEntryInput {
  kind: PageKind;
  params: LocationPageEntry['params'];
  path: string;
  title: string;
  description: string;
  tier: 1 | 2 | 3;
  entity?: LocationCity | LocationCountry | LocationRegion;
  content?: LocationContent;
  cityName?: string;
  groupType?: GroupTypeKey | typeof IDEA_VARIANT;
  typePhrase?: string;
  parentProse?: string;
  otherCityIdeaProse?: string;
  locale?: Locale;
}

function buildEntry(input: BuildEntryInput): LocationPageEntry {
  const groupType =
    input.groupType !== undefined && isGroupTypeKey(input.groupType) ? input.groupType : undefined;
  const { indexable } = evaluatePageGates({
    kind: input.kind,
    tier: input.tier,
    entity: input.entity,
    content: input.content,
    title: input.title,
    description: input.description,
    cityName: input.cityName,
    groupType,
    typePhrase: input.typePhrase,
    parentProse: input.parentProse,
    otherCityIdeaProse: input.otherCityIdeaProse,
  });
  return {
    params: input.params,
    path: input.path,
    title: input.title,
    description: input.description,
    tier: input.tier,
    indexable,
    lastModified: getDatasetVersion(),
    priority: PRIORITY[input.kind],
    kind: input.kind,
    groupType: input.groupType,
    locale: input.locale,
  };
}

/** Path prefix for per-locale surfaces (`/de/location/...`). */
function localePrefix(locale: Locale): string {
  return locale === 'en' ? '' : `/${locale}`;
}

function locationPath(locale: Locale, segments: string[]): string {
  const prefix = localePrefix(locale);
  const suffix = segments.map((segment) => `/${segment}`).join('');
  return `${prefix}${LOCATION_HUB_PATH}${suffix}`;
}

function hubEntry(locale: Locale): LocationPageEntry {
  return buildEntry({
    kind: 'hub',
    params: {},
    path: locale === 'en' ? LOCATION_HUB_PATH : `/${locale}${LOCATION_HUB_PATH}`,
    title: 'Communities by City — Find or Start a Community Near You | JoinOrigin',
    description: `Explore communities by city around the world — startup, creative, political, meetup, and small business groups. ${WAITLIST_PHRASE}`,
    tier: 1,
    locale,
  });
}

/** The other flagship's content used for G5 (no NYC↔Berlin reuse). */
function otherFlagship(flagship: FlagshipCityConfig): FlagshipCityConfig | undefined {
  return FLAGSHIP_CITIES.find((candidate) => candidate.slug !== flagship.slug);
}

function otherFlagshipIntro(slug: string): string | undefined {
  const other = otherFlagship(getFlagshipConfig(slug) as FlagshipCityConfig);
  if (!other) return undefined;
  return getCityContent(other.slug, 'en')?.intro;
}

function otherFlagshipIdeaProse(slug: string): string | undefined {
  const other = otherFlagship(getFlagshipConfig(slug) as FlagshipCityConfig);
  if (!other) return undefined;
  const content = getCityContent(other.slug, 'en');
  return content ? ideaPageProse(content) : undefined;
}

function otherFlagshipCountryIntro(countrySlugValue: string): string | undefined {
  const other = FLAGSHIP_CITIES.find((candidate) => candidate.countrySlug !== countrySlugValue);
  if (!other) return undefined;
  return getCountryContent(other.countrySlug, 'en')?.intro;
}

function otherFlagshipRegionIntro(regionSlugValue: string): string | undefined {
  const other = FLAGSHIP_CITIES.find((candidate) => candidate.regionSlug !== regionSlugValue);
  if (!other) return undefined;
  return getRegionContent(other.regionSlug, 'en')?.intro;
}

/* ------------------------------------------------------------------ *
 * Per-entity entry builders (EN)
 * ------------------------------------------------------------------ */

function countryEntry(country: LocationCountry, locale: Locale): LocationPageEntry | null {
  const slug = countrySlug(country);
  const flagshipParent = FLAGSHIP_CITIES.find((flagship) => flagship.countrySlug === slug);
  const tier: 1 | 3 = flagshipParent ? 1 : 3;
  const content = getCountryContent(slug, locale);
  const title = content?.title ?? countryPageTitle(country.asciiName);
  const description = content?.description ?? countryPageDescription(country.asciiName);
  return buildEntry({
    kind: 'country',
    params: { country: slug },
    path: locationPath(locale, [slug]),
    title,
    description,
    tier,
    entity: country,
    content,
    cityName: country.asciiName,
    parentProse: content ? otherFlagshipCountryIntro(slug) : undefined,
    locale,
  });
}

function regionEntry(region: LocationRegion, locale: Locale): LocationPageEntry | null {
  const country = findCountry(region.countryIso2);
  if (!country) return null;
  const flagshipParent = FLAGSHIP_CITIES.find((flagship) => flagship.regionId === region.id);
  const slug = flagshipParent?.regionSlug ?? regionSlug(region);
  const countrySeg = flagshipParent?.countrySlug ?? countrySlug(country);
  const tier: 1 | 3 = flagshipParent ? 1 : 3;
  const content = getRegionContent(slug, locale);
  const label = flagshipParent?.regionLabel ?? region.asciiName;
  const title =
    content?.title ?? regionPageTitle(label, flagshipParent?.countryLabel ?? country.asciiName);
  const description = content?.description ?? regionPageDescription(label);
  return buildEntry({
    kind: 'region',
    params: { country: countrySeg, region: slug },
    path: locationPath(locale, [countrySeg, slug]),
    title,
    description,
    tier,
    entity: region,
    content,
    cityName: label,
    parentProse: content ? otherFlagshipRegionIntro(slug) : undefined,
    locale,
  });
}

function cityEntry(city: LocationCity, locale: Locale): LocationPageEntry | null {
  const flagship = FLAGSHIP_CITIES.find((candidate) => candidate.geonameId === city.id);
  const region = findRegion(city.regionId);
  const country = findCountry(city.countryIso2);
  if (!region || !country) return null;

  const slug = flagship?.slug ?? citySlug(city);
  const regionSeg = flagship?.regionSlug ?? regionSlug(region);
  const countrySeg = flagship?.countrySlug ?? countrySlug(country);
  const displayName = flagship?.displayName ?? city.asciiName;
  const regionLabel = flagship?.regionLabel ?? region.asciiName;
  const tier = flagship ? 1 : tierForCitySlug(slug);
  const content = getCityContent(slug, locale);

  let title: string;
  let description: string;
  if (content?.kind === 'city') {
    title = content.title ?? cityPageTitle(displayName, regionLabel);
    description = content.description ?? cityPageDescription(displayName);
  } else {
    title = cityPageTitle(displayName, regionLabel);
    description = cityPageDescription(displayName);
  }

  return buildEntry({
    kind: 'city',
    params: { country: countrySeg, region: regionSeg, city: slug },
    path: locationPath(locale, [countrySeg, regionSeg, slug]),
    title,
    description,
    tier,
    entity: city,
    content,
    cityName: displayName,
    parentProse: flagship && content ? otherFlagshipIntro(slug) : undefined,
    locale,
  });
}

/** Variant page entry — generated only where real differentiating prose exists. */
function variantEntry(
  flagship: FlagshipCityConfig,
  city: LocationCity,
  content: CityContent,
  typeKey: GroupTypeKey,
  locale: Locale,
): LocationPageEntry {
  const label = groupTypeLabelForLocale(typeKey, locale);
  const title =
    content.pageTitles?.variants?.[typeKey] ?? variantPageTitle(label, flagship.displayName);
  const description =
    content.pageTitles?.variantDescriptions?.[typeKey] ??
    variantPageDescription(label, flagship.displayName);
  return buildEntry({
    kind: 'variant',
    params: {
      country: flagship.countrySlug,
      region: flagship.regionSlug,
      city: flagship.slug,
      variant: typeKey,
    },
    path: locationPath(locale, [flagship.countrySlug, flagship.regionSlug, flagship.slug, typeKey]),
    title,
    description,
    tier: 1,
    entity: city,
    content,
    cityName: flagship.displayName,
    groupType: typeKey,
    typePhrase: label,
    parentProse: content.intro,
    locale,
  });
}

/** Idea page entry — `/city/ideas` with the unique-listicle rule applied. */
function ideasEntry(
  flagship: FlagshipCityConfig,
  city: LocationCity,
  content: CityContent,
  locale: Locale,
): LocationPageEntry {
  const title = content.pageTitles?.ideas ?? ideasPageTitle(flagship.displayName);
  const description =
    content.pageTitles?.ideasDescription ?? ideasPageDescription(flagship.displayName);
  // G4 intent phrase in the surface's language (de: "Ideen", EN title
  // template: "30 community event ideas in {city}").
  const typePhrase = locale === 'de' ? 'Ideen' : 'community event ideas';
  return buildEntry({
    kind: 'ideas',
    params: {
      country: flagship.countrySlug,
      region: flagship.regionSlug,
      city: flagship.slug,
      variant: IDEA_VARIANT,
    },
    path: locationPath(locale, [
      flagship.countrySlug,
      flagship.regionSlug,
      flagship.slug,
      IDEA_VARIANT,
    ]),
    title,
    description,
    tier: 1,
    entity: city,
    content,
    cityName: flagship.displayName,
    groupType: IDEA_VARIANT,
    typePhrase,
    otherCityIdeaProse: locale === 'en' ? otherFlagshipIdeaProse(flagship.slug) : undefined,
    locale,
  });
}

/* ------------------------------------------------------------------ *
 * Public registry
 * ------------------------------------------------------------------ */

/**
 * Derive the complete location-page registry.
 *
 * - `locationPageEntries()` → the EN canonical surface (hub + all
 *   countries/regions/cities + flagship variants + idea pages).
 * - `locationPageEntries('de')` → the per-locale surface where COMMITTED
 *   translated content exists (Berlin: city + 5 variants + ideas at
 *   `/de/location/germany/berlin/...`) — the EN fallback is never
 *   enumerated for a per-locale surface (phase A, design §7.1).
 *
 * Entries are deterministic: titles/descriptions derive from the snapshot
 * + content files, `lastModified` = dataset version date, and `indexable`
 * = the G1–G5 gate result. Consumers filter by tier / indexable / warm
 * set (`isWarmSetEntry`) as needed.
 */
export function locationPageEntries(locale?: Locale): LocationPageEntry[] {
  const target = locale ?? 'en';
  const snapshot = loadLocationSnapshot();
  const entries: LocationPageEntry[] = [];

  if (target === 'en') {
    entries.push(hubEntry('en'));
    for (const country of snapshot.countries) {
      const entry = countryEntry(country, 'en');
      if (entry) entries.push(entry);
    }
    for (const region of snapshot.regions) {
      const entry = regionEntry(region, 'en');
      if (entry) entries.push(entry);
    }
    // One canonical URL per place: the geodata snapshot can carry multiple
    // rows with the same ascii name inside a region (e.g. PPLX borough
    // rows like "Manhattan"). Dedupe on (regionId, slug), keep the
    // highest-population city — deterministic (design §4.2).
    const cityByKey = new Map<string, LocationCity>();
    for (const city of snapshot.cities) {
      const key = `${city.regionId}:${citySlug(city)}`;
      const existing = cityByKey.get(key);
      const cityPopulation = city.population ?? 0;
      if (!existing) {
        cityByKey.set(key, city);
        continue;
      }
      const existingPopulation = existing.population ?? 0;
      if (
        cityPopulation > existingPopulation ||
        (cityPopulation === existingPopulation && city.id < existing.id)
      ) {
        cityByKey.set(key, city);
      }
    }
    for (const city of cityByKey.values()) {
      const entry = cityEntry(city, 'en');
      if (entry) entries.push(entry);
    }
  }

  // Flagship surface — city page (per locale) + variants + ideas, only
  // where committed content produces real differentiating prose (§3.8).
  // For per-locale surfaces `hasContent` (exact, no EN fallback) gates the
  // enumeration so untranslated cities never get locale-prefixed URLs.
  for (const flagship of FLAGSHIP_CITIES) {
    if (!hasContent('city', flagship.slug, target)) continue;
    const content = getCityContent(flagship.slug, target);
    if (!content || content.kind !== 'city') continue;
    const city = findCityByGeonameId(flagship.geonameId);
    if (!city) continue;
    if (target !== 'en') {
      const entry = cityEntry(city, target);
      if (entry) entries.push(entry);
    }
    for (const type of GROUP_TYPES) {
      if (!content.variantIntros[type.key]) continue;
      entries.push(variantEntry(flagship, city, content, type.key, target));
    }
    if (content.ideaPage) {
      entries.push(ideasEntry(flagship, city, content, target));
    }
  }

  return entries;
}

/** Indexable entries (G1–G5 pass + tier ≤ 2) — the sitemap source (§9.1). */
export function indexableLocationEntries(locale?: Locale): LocationPageEntry[] {
  return locationPageEntries(locale).filter((entry) => entry.indexable);
}

/**
 * Warm-set policy (design §8.2): the hub + every Tier-1 entry are
 * prerendered at build; everything else is generated on first request
 * via ISR (`dynamicParams: true`). fe-location-pages filters
 * `locationPageEntries()` through this predicate for `generateStaticParams`.
 */
export function isWarmSetEntry(entry: LocationPageEntry): boolean {
  return entry.kind === 'hub' || entry.tier === 1;
}
