/**
 * Location page view layer — builds the render model + metadata + JSON-LD
 * payloads for the `/location/**` dynamic routes (design §8.4/§9.4, §6.4).
 *
 * fe-location-pages (TASK-308) consumes the fe-seo-registry
 * `locationPageEntries()` set — the single source of truth — and turns one
 * entry into everything the route needs:
 *
 *  - `resolveLocationEntry()` — params → registry entry (G3 enforcement),
 *  - `locationMetadata()` — `Metadata` from the entry (canonical + hreflang
 *    languages for locale surfaces with committed translations + robots
 *    noindex for Tier-3/failed-gate pages),
 *  - `buildLocationViewData()` — the serializable render model (hero copy,
 *    breadcrumbs, data points, FAQ, group-type links, sibling cities,
 *    guide cross-links, idea listicle, waitlist CTA source),
 *  - `locationJsonLd()` — `BreadcrumbList` / `FAQPage` / `ItemList`
 *    structured-data payloads (mirrored 1:1 with the visible blocks).
 *
 * Honesty rules (design §6.7, market-competitor §8.3): only dataset +
 * authored content facts are rendered — never fabricated member counts,
 * ratings, or local offices. Every claim is the "find or start a community
 * in {city}" pattern (doorway-safe).
 *
 * No route files are created here — this is data/view-model only.
 */

import type { Metadata } from 'next';

import { SUPPORTED_LOCALES, getDictionary, getT, type Locale } from '@joinorigin/i18n';

import { getCityContent, getCountryContent, getRegionContent, listContentByKind } from './content';
import type {
  CityContent,
  CountryContent,
  IdeaCategory,
  LocationContent,
  LocationFaq,
  RegionContent,
  VariantEnrichment,
} from './content/types';
import type { LocationCity, LocationCountry, LocationRegion } from './data/types';
import { breadcrumbList, cityPlace, faqPage, type BreadcrumbItem } from './jsonLd';
import {
  FLAGSHIP_CITIES,
  GROUP_TYPES,
  IDEA_VARIANT,
  cityDisplayName,
  cityLocalizedName,
  citySlug,
  contentRichCities,
  contentRichCitiesInCountry,
  contentRichCitiesInRegion,
  countryFactsFor,
  countryLocalizedName,
  countrySlug,
  findCityBySlug,
  findCountry,
  findCountryBySlug,
  findRegion,
  findRegionBySlugOrFlagship,
  formatPopulation,
  getFlagshipConfig,
  groupTypeLabelForLocale,
  isGroupTypeKey,
  languageNamesFor,
  loadLocationSnapshot,
  localeCountryCodes,
  regionLocalizedName,
  regionSlug,
  regionsForCountry,
  type CountryFacts,
  type GroupTypeKey,
} from './locationData';
import type { PageKind } from './locationGates';
import {
  LOCATION_HUB_PATH,
  isWarmSetEntry,
  locationPageEntries,
  type LocationPageEntry,
} from './locationPages';
import { createMetadata, fullLocaleLanguages } from './metadata';
import { SITE } from './site';
import { absoluteUrl } from './url';

export type { BreadcrumbItem, IdeaCategory, LocationFaq, PageKind };

/* ------------------------------------------------------------------ *
 * Route resolution (G3 — real places only, never synthetic)
 * ------------------------------------------------------------------ */

export interface LocationRouteParams {
  country?: string;
  region?: string;
  city?: string;
  variant?: string;
}

/**
 * Resolve route params to a registry entry for the given locale surface.
 * Returns `undefined` for unknown/synthetic slugs so routes can
 * `notFound()` (G3 enforcement). The hub has no dynamic segments — callers
 * use `locationPageEntries().find((e) => e.kind === 'hub')`.
 */
export function resolveLocationEntry(
  params: LocationRouteParams,
  locale: Locale = 'en',
): LocationPageEntry | undefined {
  return locationPageEntries(locale).find(
    (entry) =>
      (entry.params.country ?? '') === (params.country ?? '') &&
      (entry.params.region ?? '') === (params.region ?? '') &&
      (entry.params.city ?? '') === (params.city ?? '') &&
      (entry.params.variant ?? '') === (params.variant ?? ''),
  );
}

/** The hub entry (warm-set, indexable by construction). */
export function hubEntry(): LocationPageEntry | undefined {
  return locationPageEntries().find((entry) => entry.kind === 'hub');
}

/* ------------------------------------------------------------------ *
 * Waitlist analytics source (design §6.4 #7)
 * ------------------------------------------------------------------ */

/**
 * `trackEvent('signup_click', { source })` source for a location page —
 * e.g. `location-city-berlin`, `location-variant-berlin-startup`,
 * `location-ideas-berlin`, `location-country-germany`.
 */
export function waitlistSource(entry: LocationPageEntry): string {
  if (entry.kind === 'hub') return 'location-hub';
  if (entry.kind === 'country') return `location-country-${entry.params.country}`;
  if (entry.kind === 'region') return `location-region-${entry.params.region}`;
  if (entry.kind === 'city') return `location-city-${entry.params.city}`;
  if (entry.kind === 'ideas') return `location-ideas-${entry.params.city}`;
  return `location-variant-${entry.params.city}-${entry.groupType ?? ''}`;
}

/* ------------------------------------------------------------------ *
 * hreflang (per-locale surfaces — design §7.2, G-10)
 * ------------------------------------------------------------------ */

/** The EN counterpart path for a locale-surface path — `/en/...`
 *  (all-routes-prefixed, TASK-466). */
function enPathForLocale(localePath: string, locale: Locale): string {
  const stripped = localePath.replace(new RegExp(`^/${locale}`), '');
  return stripped === '' ? '/en' : `/en${stripped}`;
}

/**
 * Forward an EN-surface path (`/en/...`) to the ACTIVE locale surface
 * (`/${locale}/...`). All-routes-prefixed (TASK-466): EN registry paths
 * carry the `/en` prefix, and the generator created all 21 locale trees —
 * every `/<locale>/location/**` route exists — so the mapping is
 * unconditional. Card hrefs must point at the surface the user is browsing:
 * `/en/...` would navigate a `/es/location` visitor to the English surface.
 * Unprefixed paths (guide links) and EN itself pass through unchanged.
 */
function forwardToLocaleSurface(enPath: string, locale: Locale): string {
  if (locale === 'en' || !enPath.startsWith('/en')) return enPath;
  return `/${locale}${enPath.slice('/en'.length)}`;
}

/**
 * `alternates.languages` for a location entry (G-10, sprint-24 gap-analysis
 * §6): the FULL hreflang cluster matching the sitemap xhtml:link set — an EN
 * page lists every `/<locale>/...` counterpart (all 21 locale trees are live
 * generated wrappers with EN-fallback content, so the cluster is never
 * omitted); a per-locale page lists its own locale + `en` + `x-default` →
 * EN canonical.
 */
export function languagesFor(entry: LocationPageEntry): Record<string, string> | undefined {
  if (entry.locale && entry.locale !== 'en') {
    const enUrl = absoluteUrl(enPathForLocale(entry.path, entry.locale));
    return {
      [entry.locale]: absoluteUrl(entry.path),
      en: enUrl,
      'x-default': enUrl,
    };
  }
  return {
    ...fullLocaleLanguages(entry.path),
    en: absoluteUrl(entry.path),
    'x-default': absoluteUrl(entry.path),
  };
}

/* ------------------------------------------------------------------ *
 * Metadata
 * ------------------------------------------------------------------ */

/**
 * Per-page metadata for a location entry: canonical + OG/Twitter via the
 * shared `createMetadata`, robots `noindex,follow` for Tier-3 / failed-gate
 * pages, and `alternates.languages` (hreflang) for locale surfaces with
 * committed translations.
 */
export function locationMetadata(entry: LocationPageEntry): Metadata {
  const meta = createMetadata({
    title: entry.title,
    description: entry.description,
    path: entry.path,
    robots: entry.indexable ? undefined : { index: false, follow: true },
  });
  const languages = languagesFor(entry);
  if (!languages) return meta;
  return {
    ...meta,
    alternates: {
      canonical: meta.alternates?.canonical,
      languages,
    },
  };
}

/* ------------------------------------------------------------------ *
 * Hub directory (TASK-317 — /location hub search/filter; TASK-480 split
 * into 5 sections with IP-country → locale-language → alphabetical order)
 * ------------------------------------------------------------------ */

/** The 5 Browse-locations directory sections (TASK-480). */
export type HubDirectorySection =
  'countries' | 'regions' | 'cities' | 'communityTypes' | 'eventIdeas';

const SECTION_ORDER: readonly HubDirectorySection[] = [
  'countries',
  'regions',
  'cities',
  'communityTypes',
  'eventIdeas',
];

/** One browsable entry in the `/location` hub directory. */
export interface HubDirectoryEntry {
  /** Display name (registry title without the brand suffix). */
  name: string;
  path: string;
  kind: PageKind;
  /** Browse-locations section (TASK-480) — countries/regions/cities/
   *  communityTypes/eventIdeas. */
  section: HubDirectorySection;
  /** ISO-3166-1 alpha-2 code of the entry's associated country — the
   *  geographic scope used for IP-country + locale-language ordering
   *  (variants/ideas resolve via their associated city's country). */
  countryIso2?: string;
  /**
   * Searchable text (TASK-484) — the ACTIVE locale display name + the EN
   * display name + the dataset country name + the dataset region name
   * (`locations.json` `names[locale]`, EN fallback). The hub search matches
   * this field so "Colombia" / "Italy" resolve their country cards and the
   * cities/community-types/event-ideas scoped to them.
   */
  searchText: string;
}

/**
 * The complete browsable directory for the `/location` hub — the full
 * CONTENT-RICH inventory (TASK-484), tier-irrelevant and noindex included:
 * every country/region hosting a content-rich city, every content-rich city
 * (56, incl. Copenhagen; the 7 slug-collision duplicates resolve
 * deterministically to their intended rows via
 * `CONTENT_RICH_CITY_GEONAME_IDS`), every group-type variant (56 × 5) and
 * every event-ideas page (56) — split into 5 sections (TASK-480). The hub
 * view filters this client-side by keyword WITHIN each section; no separate
 * index is invented (design §8.4).
 *
 * Membership (TASK-484): countries = distinct countries of content-rich
 * cities (~38), regions = distinct regions (~54), cities = 56, community
 * types = 280, event ideas = 56 (total ~485) — sourced from the content-rich
 * set, NOT the indexable set, so Tier-3/noindex pages (e.g. Copenhagen) are
 * browsable in the directory even though they never enter the sitemap.
 *
 * Ordering (TASK-480): within every section, entries whose associated
 * country matches the visitor's IP-country come first, then entries whose
 * country is in the active locale's language area, then alphabetical by
 * name. `ipCountry` is the null-safe `getServerCountry()` value — when
 * absent (local / non-Cloudflare requests) the order falls back to
 * locale-language → alphabetical.
 *
 * Locale-aware (TASK-515): each card's display name resolves through the
 * ACTIVE locale — committed per-locale page title (the locale-surface
 * registry entry, plus per-locale country/region content enumerated
 * explicitly) → else the localized dataset name for the card's own kind
 * (`countryLocalizedName` / `regionLocalizedName` / `cityLocalizedName`) →
 * else the EN registry title — the EN directory always stays complete.
 * Variant/ideas cards keep their (localized) pageTitles template with the
 * localized city name. Locale-aware paths (TASK-469): every card href points
 * at the ACTIVE locale surface (`/${locale}/location/...`) — all 21 locale
 * trees exist — never the EN-canonical `/en/...` (localizePath passes
 * already-prefixed hrefs through idempotently, so `/en` here would navigate
 * a non-EN hub visitor to the English surface).
 */
export function hubDirectoryEntries(
  locale: Locale = 'en',
  ipCountry: string | null = null,
): HubDirectoryEntry[] {
  // Registry titles/names: the EN canonical surface is the source of truth
  // for hrefs + EN fallback names; the ACTIVE locale contributes committed
  // localized titles (registry city/variant/ideas entries + enumerated
  // country/region content, TASK-515). Keys are locale-independent
  // (kind + params), so every content-rich card resolves its localized name
  // when the locale carries a committed title, else the localized dataset
  // name, and falls back to EN otherwise.
  const enEntries = new Map<string, LocationPageEntry>();
  for (const entry of locationPageEntries()) {
    if (entry.kind !== 'hub') enEntries.set(locationEntryKey(entry), entry);
  }
  // Committed per-locale page titles for the ACTIVE surface. The registry
  // `locationPageEntries(locale)` only emits city/variant/ideas for non-EN
  // locales (locationPages.ts city loop), so country/region keys are always
  // absent there — enumerate committed per-locale country/region content into
  // the locale title map explicitly so a committed title (e.g.
  // es/country/colombia.ts "Comunidades en Colombia", de/country/germany.ts
  // "Communities in Deutschland") resolves as the card name on its locale
  // surface (TASK-515). Keys reuse `locationEntryKey` shape (kind + params).
  const localeTitles = new Map<string, string>();
  for (const entry of locationPageEntries(locale)) {
    if (entry.kind !== 'hub') localeTitles.set(locationEntryKey(entry), entry.title);
  }
  if (locale !== 'en') {
    for (const content of listContentByKind('country', locale)) {
      if (content.kind !== 'country' || !content.title) continue;
      const country = findCountryBySlug(content.slug);
      if (!country) continue;
      localeTitles.set(`country:${countrySlug(country)}///`, content.title);
    }
    for (const content of listContentByKind('region', locale)) {
      if (content.kind !== 'region' || !content.title) continue;
      const region = findRegionBySlugOrFlagship(content.slug);
      if (!region) continue;
      const country = findCountry(region.countryIso2);
      if (!country) continue;
      // URL segments honor flagship overrides (same rule as the city loop).
      const flagshipParent = FLAGSHIP_CITIES.find((flagship) => flagship.regionId === region.id);
      const regionSeg = flagshipParent?.regionSlug ?? regionSlug(region);
      const countrySeg = flagshipParent?.countrySlug ?? countrySlug(country);
      localeTitles.set(`region:${countrySeg}/${regionSeg}//`, content.title);
    }
  }

  const localeCountries = localeCountryCodes(locale);
  const entries: HubDirectoryEntry[] = [];
  const seenCountryKeys = new Set<string>();
  const seenRegionKeys = new Set<string>();

  for (const city of contentRichCities()) {
    const region = findRegion(city.regionId);
    const country = findCountry(city.countryIso2);
    if (!region || !country) continue;

    // URL segments honor flagship overrides (same rule as `cityLocationPath`).
    const flagship = getFlagshipConfig(citySlug(city));
    const citySlugValue = flagship?.slug ?? citySlug(city);
    const regionSeg = flagship?.regionSlug ?? regionSlug(region);
    const countrySeg = flagship?.countrySlug ?? countrySlug(country);

    const countryName = countryLocalizedName(country, locale);
    const regionName = regionLocalizedName(region, locale);

    // Countries — one card per distinct country hosting a content-rich city.
    const countryKey = `country:${countrySeg}///`;
    if (!seenCountryKeys.has(countryKey)) {
      seenCountryKeys.add(countryKey);
      const card = contentRichDirectoryCard(
        enEntries.get(countryKey),
        localeTitles.get(countryKey),
        locale,
        'country',
        'countries',
        country.iso2,
        [countryName],
        countryName,
      );
      if (card) entries.push(card);
    }

    // Regions — one card per distinct region hosting a content-rich city.
    const regionKey = `region:${countrySeg}/${regionSeg}//`;
    if (!seenRegionKeys.has(regionKey)) {
      seenRegionKeys.add(regionKey);
      const card = contentRichDirectoryCard(
        enEntries.get(regionKey),
        localeTitles.get(regionKey),
        locale,
        'region',
        'regions',
        country.iso2,
        [countryName, regionName],
        regionName,
      );
      if (card) entries.push(card);
    }

    // Cities — one card per content-rich city (intended rows only).
    // Registry key shape: `city:{country}/{region}/{city}/` (kind + params,
    // trailing empty variant segment).
    const cityKey = `city:${countrySeg}/${regionSeg}/${citySlugValue}/`;
    const cityCard = contentRichDirectoryCard(
      enEntries.get(cityKey),
      localeTitles.get(cityKey),
      locale,
      'city',
      'cities',
      country.iso2,
      [countryName, regionName],
      cityLocalizedName(city, locale),
    );
    if (cityCard) entries.push(cityCard);

    // Community types — 5 group-type variants per content-rich city.
    for (const type of GROUP_TYPES) {
      const variantKey = `variant:${countrySeg}/${regionSeg}/${citySlugValue}/${type.key}`;
      const card = contentRichDirectoryCard(
        enEntries.get(variantKey),
        localeTitles.get(variantKey),
        locale,
        'variant',
        'communityTypes',
        country.iso2,
        [countryName, regionName],
      );
      if (card) entries.push(card);
    }

    // Event ideas — the ideas page per content-rich city.
    const ideasKey = `ideas:${countrySeg}/${regionSeg}/${citySlugValue}/${IDEA_VARIANT}`;
    const ideasCard = contentRichDirectoryCard(
      enEntries.get(ideasKey),
      localeTitles.get(ideasKey),
      locale,
      'ideas',
      'eventIdeas',
      country.iso2,
      [countryName, regionName],
    );
    if (ideasCard) entries.push(ideasCard);
  }

  return entries.sort(
    (a, b) =>
      SECTION_ORDER.indexOf(a.section) - SECTION_ORDER.indexOf(b.section) ||
      rankDirectoryEntry(a, localeCountries, ipCountry) -
        rankDirectoryEntry(b, localeCountries, ipCountry) ||
      a.name.localeCompare(b.name),
  );
}

/**
 * Build one content-rich directory card from its registry entries. The EN
 * canonical entry is the source of truth for the href (forwarded to the
 * ACTIVE locale surface); the display name resolves through the ACTIVE
 * locale (TASK-515): the committed per-locale page title (`localeTitle`,
 * e.g. es/country/colombia.ts "Comunidades en Colombia") when present →
 * else the localized dataset name (`localizedName` — country/region/city
 * kinds) → else the EN registry title. Variant/ideas cards keep their
 * (localized) pageTitles template with the localized city name — they never
 * substitute the bare dataset city name. `searchParts` carry the dataset
 * country/region names for the `searchText` enrichment (TASK-484 — the
 * search text is unchanged by TASK-515; only the display name localizes).
 * Returns `undefined` when the EN registry lacks the entry — never emit a
 * card for a path that does not exist.
 */
function contentRichDirectoryCard(
  enEntry: LocationPageEntry | undefined,
  localeTitle: string | undefined,
  locale: Locale,
  kind: PageKind,
  section: HubDirectorySection,
  countryIso2: string,
  searchParts: string[],
  localizedName?: string,
): HubDirectoryEntry | undefined {
  if (!enEntry) return undefined;
  const name = stripBrand(localeTitle ?? localizedName ?? enEntry.title);
  return {
    name,
    path: forwardToLocaleSurface(enEntry.path, locale),
    kind,
    section,
    countryIso2,
    searchText: [name, stripBrand(enEntry.title), ...searchParts].filter(Boolean).join(' '),
  };
}

/**
 * Ordering rank for a directory entry within its section — 0 when the
 * associated country matches the visitor's IP-country, 1 when it is in the
 * active locale's language area, 2 otherwise. Community types + event ideas
 * rank via their associated city's country (the entry's parent country).
 */
function rankDirectoryEntry(
  entry: HubDirectoryEntry,
  localeCountries: ReadonlySet<string>,
  ipCountry: string | null,
): number {
  const country = entry.countryIso2 ?? '';
  if (ipCountry && country === ipCountry) return 0;
  if (localeCountries.has(country)) return 1;
  return 2;
}

/** Locale-independent identity for a location entry (kind + params). */
function locationEntryKey(entry: LocationPageEntry): string {
  return `${entry.kind}:${entry.params.country ?? ''}/${entry.params.region ?? ''}/${entry.params.city ?? ''}/${entry.params.variant ?? ''}`;
}

/* ------------------------------------------------------------------ *
 * Guide cross-links (design §8.5 — every location page kind links the
 * full 7-guide "Guides for starting a community" set, TASK-489)
 * ------------------------------------------------------------------ */

export interface GuideLink {
  title: string;
  path: string;
}

/**
 * Guide cross-link paths. Card titles are NOT hardcoded — each entry's
 * `key` is the guide slug used to resolve `seoContent.location.guideCardTitles.<key>`
 * for the active locale (TASK-411/TASK-416), so guide links stay localized.
 */
const GUIDE_PATHS = [
  { key: 'start-a-community', path: '/guides/start-an-origin' },
  { key: 'find-a-co-founder', path: '/guides/find-a-co-founder' },
  { key: 'first-10-members', path: '/guides/first-10-members' },
  { key: 'keep-a-community-active', path: '/guides/keep-an-origin-active' },
  { key: 'hybrid-communities', path: '/guides/hybrid-origins' },
  { key: 'organize-a-meetup', path: '/guides/organize-a-meetup' },
  { key: 'moderation', path: '/guides/moderation' },
] as const satisfies readonly { key: string; path: string }[];

/**
 * The full 7-guide "Guides for starting a community" set — the SAME set for
 * EVERY location page kind (hub/country/region/city/variant/ideas, TASK-489),
 * so every location screen renders the identical guide cross-links as the
 * `/location` hub. The `kind` parameter is retained for call-site
 * compatibility; every kind returns `GUIDE_PATHS` with localized card titles.
 */
export function guideLinksFor(kind: PageKind, locale: Locale = 'en'): GuideLink[] {
  const t = getT(getDictionary(locale));
  const enT = getT(getDictionary('en'));
  const withTitles = (paths: readonly { key: string; path: string }[]) =>
    paths.map(({ key, path }) => {
      const keyPath = `seoContent.location.guideCardTitles.${key}`;
      const title = t(keyPath);
      // Server-side `getT` has no automatic EN fallback — resolve untranslated
      // keys from EN (the client provider does the same via fallbackLng).
      return { title: title === keyPath ? enT(keyPath) : title, path };
    });
  return withTitles(GUIDE_PATHS);
}

/* ------------------------------------------------------------------ *
 * Sibling cities (design §8.5 — 5–10 same-region cities)
 * ------------------------------------------------------------------ */

/** Display name + path for a sibling city (registry-exact URL). */
export interface SiblingCityLink {
  name: string;
  path: string;
}

/** Registry-exact location path for a city (mirrors `cityEntry`) — on the
 *  ACTIVE locale surface `/${locale}/location/...` (all-routes-prefixed,
 *  TASK-466/TASK-469; all 21 locale trees exist). */
export function cityLocationPath(city: LocationCity, locale: Locale = 'en'): string | undefined {
  const flagship = FLAGSHIP_CITIES.find((candidate) => candidate.geonameId === city.id);
  const region = findRegion(city.regionId);
  const country = findCountry(city.countryIso2);
  if (!region || !country) return undefined;
  const slug = flagship?.slug ?? citySlug(city);
  const regionSeg = flagship?.regionSlug ?? regionSlug(region);
  const countrySeg = flagship?.countrySlug ?? countrySlug(country);
  return `/${locale}${LOCATION_HUB_PATH}/${countrySeg}/${regionSeg}/${slug}`;
}

/**
 * Same-region sibling cities, deduped on (regionId, slug), highest
 * population first, excluding the given city — capped at `limit` (5–10).
 * Sibling card hrefs point at the ACTIVE locale surface (TASK-469).
 *
 * TASK-496 sibling fallback — every content-rich city renders a nearby
 * section even when its region has no other cities (jakarta/lima/singapore):
 *   1. same-region siblings (the original set),
 *   2. if the region yields none → same-COUNTRY cities (other cities in the
 *      parent country, deduped + population-sorted; the section would
 *      otherwise vanish for jakarta/lima),
 *   3. if the country yields none too (singapore — a city-state with a
 *      single content-rich city) → the global content-rich set sorted by
 *      population (every card is a real registry page).
 */
export function siblingCitiesFor(
  city: LocationCity | undefined,
  limit = 6,
  locale: Locale = 'en',
): SiblingCityLink[] {
  if (!city) return [];
  const regionCandidates = siblingCandidates(city.regionId, city.id);
  // TASK-496 — same-region first; fall back to same-country when the region
  // hosts no sibling cities, then to the global content-rich set (the only
  // cases where the nearby section would otherwise be empty).
  let candidates = regionCandidates;
  if (candidates.length === 0) {
    candidates = siblingCandidates(city.countryIso2, city.id, true);
  }
  if (candidates.length === 0) {
    candidates = contentRichCities()
      .filter((candidate) => candidate.id !== city.id)
      .sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
  }
  return candidates.slice(0, limit).flatMap((sibling) => {
    const path = cityLocationPath(sibling, locale);
    return path ? [{ name: sibling.asciiName, path }] : [];
  });
}

/**
 * Deduped sibling candidates for a city — by region (default) or by country
 * (`byCountry`). Excludes the given city id. Same population-order + dedupe
 * rule as the original sibling logic: keep the highest-population row per
 * (scope, slug) with the lowest geonameId as a deterministic tiebreak.
 */
function siblingCandidates(
  scope: string,
  excludeCityId: number,
  byCountry = false,
): LocationCity[] {
  const snapshot = loadLocationSnapshot();
  const byKey = new Map<string, LocationCity>();
  for (const candidate of snapshot.cities) {
    const inScope = byCountry ? candidate.countryIso2 === scope : candidate.regionId === scope;
    if (!inScope || candidate.id === excludeCityId) continue;
    const key = byCountry
      ? `${candidate.countryIso2}:${citySlug(candidate)}`
      : `${candidate.regionId}:${citySlug(candidate)}`;
    const existing = byKey.get(key);
    const candidatePopulation = candidate.population ?? 0;
    if (
      !existing ||
      candidatePopulation > (existing.population ?? 0) ||
      (candidatePopulation === (existing.population ?? 0) && candidate.id < existing.id)
    ) {
      byKey.set(key, candidate);
    }
  }
  return [...byKey.values()].sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
}

/**
 * Flagship-city cards (TASK-480) — the "Flagship cities" / "Start local"
 * lists show EVERY content-rich city (tier-irrelevant), with the active
 * locale's country/area first, capped at `limit` (6). Within the area the
 * cities sort alphabetically by display name. Card hrefs point at the
 * ACTIVE locale surface (`/${locale}/location/...`, TASK-469).
 */
export function flagshipCities(locale: Locale = 'en', limit = 6): SiblingCityLink[] {
  const localeCountries = localeCountryCodes(locale);
  return contentRichCities()
    .slice()
    .sort((a, b) => {
      const aLocal = localeCountries.has(a.countryIso2) ? 0 : 1;
      const bLocal = localeCountries.has(b.countryIso2) ? 0 : 1;
      if (aLocal !== bLocal) return aLocal - bLocal;
      return cityDisplayName(a).localeCompare(cityDisplayName(b));
    })
    .slice(0, limit)
    .flatMap((city) => {
      const path = cityLocationPath(city, locale);
      return path ? [{ name: cityDisplayName(city), path }] : [];
    });
}

/* ------------------------------------------------------------------ *
 * Country mesh (TASK-490 — data-driven content-rich info for every
 * `/location/<country>` page)
 *
 * The country page gets a content-rich mesh populated for ALL countries
 * (indexability is untouched — un-authored Tier-3 pages stay noindex):
 * the localized country display name, the country's content-rich cities
 * (registry-exact paths), the region list for the country, and dataset
 * country facts (population/capital/languages) derived from the geo
 * snapshot. All names resolve from the dataset `names[locale]` with EN
 * fallback — never hardcoded.
 * ------------------------------------------------------------------ */

/** One region link in the country mesh (TASK-490). */
export interface CountryRegionLink {
  /** Localized dataset region name (`names[locale]`, EN fallback). */
  name: string;
  /** Registry-exact region page path on the ACTIVE locale surface. */
  path: string;
}

/** The country-scoped mesh for `/location/<country>` pages (TASK-490). */
export interface CountryMesh {
  /** Localized country display name (dataset `names[locale]`, EN fallback). */
  countryName: string;
  /** Dataset country facts — population / capital / languages (G1). */
  facts: CountryFacts;
  /** Content-rich cities in the country — localized names + registry-exact
   *  paths, alphabetical by localized name. */
  cities: SiblingCityLink[];
  /** Regions hosting content-rich cities in the country — localized names
   *  + registry-exact paths, alphabetical by localized name. */
  regions: CountryRegionLink[];
}

/** Registry-exact location path for a region — on the ACTIVE locale surface
 *  `/${locale}/location/...` (all-routes-prefixed, TASK-466/TASK-469).
 *  Honors flagship region-slug/country-slug overrides (same rule as
 *  `cityLocationPath` + `regionEntry`). */
export function regionLocationPath(
  region: LocationRegion,
  locale: Locale = 'en',
): string | undefined {
  const country = findCountry(region.countryIso2);
  if (!country) return undefined;
  const flagship = FLAGSHIP_CITIES.find((candidate) => candidate.regionId === region.id);
  const regionSeg = flagship?.regionSlug ?? regionSlug(region);
  const countrySeg = flagship?.countrySlug ?? countrySlug(country);
  return `/${locale}${LOCATION_HUB_PATH}/${countrySeg}/${regionSeg}`;
}

/**
 * The country-scoped mesh for a country page (TASK-490) — localized country
 * name, content-rich cities in the country (registry-exact paths, sorted
 * alphabetically by localized name), the region list (regions hosting
 * content-rich cities), and dataset facts (population/capital/languages).
 * Data-driven for EVERY country — tier-irrelevant and noindex untouched.
 * Returns `undefined` when the country row is unresolvable (unknown slug),
 * so the view renders no mesh rather than empty sections.
 */
export function countryMeshFor(
  entry: LocationPageEntry,
  locale: Locale = 'en',
): CountryMesh | undefined {
  const country = findCountryBySlug(entry.params.country ?? '');
  if (!country) return undefined;
  const facts = countryFactsFor(country.iso2);
  if (!facts) return undefined;

  const cities = contentRichCitiesInCountry(country.iso2)
    .map((city) => ({
      name: cityLocalizedName(city, locale),
      path: cityLocationPath(city, locale),
    }))
    .filter((link): link is SiblingCityLink => link.path !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name));

  const regions = regionsForCountry(country.iso2)
    .map((region) => ({
      name: regionLocalizedName(region, locale),
      path: regionLocationPath(region, locale),
    }))
    .filter((link): link is CountryRegionLink => link.path !== undefined)
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    countryName: countryLocalizedName(country, locale),
    facts,
    cities,
    regions,
  };
}

/* ------------------------------------------------------------------ *
 * Region mesh (TASK-496 — the data-driven content-rich equivalent of the
 * country mesh for every `/location/<country>/<region>` page)
 *
 * Un-authored region pages (e.g. `/location/japan/osaka`) currently render
 * an empty shell: no prose, no data points, no FAQ, no nearby-city mesh.
 * The region mesh mirrors the country mesh + big-city page pattern —
 * localized region name, the parent country's dataset facts (regions carry
 * no population/capital/languages in the snapshot, so "region facts" are
 * the parent country's honest dataset facts), the content-rich cities in
 * the region (registry-exact paths — the "Communities in nearby cities"
 * list), and a data-driven FAQ template. Authored region content (Berlin/
 * New York) still wins for intro/dataPoints/FAQ; the mesh fills the gap for
 * the ~50 un-authored regions.
 * ------------------------------------------------------------------ */

/** The region-scoped mesh for `/location/<country>/<region>` pages
 *  (TASK-496). */
export interface RegionMesh {
  /** Localized region display name (dataset `names[locale]`, EN fallback). */
  regionName: string;
  /** Localized parent-country display name (dataset names, EN fallback). */
  countryName: string;
  /** Parent-country dataset facts — population / capital / languages. */
  facts: CountryFacts;
  /** Content-rich cities in the region — localized names + registry-exact
   *  paths, sorted by population descending (the "Communities in nearby
   *  cities" list). */
  cities: SiblingCityLink[];
  /** Data-driven FAQ for the region (localized template + dataset data). */
  faq: LocationFaq[];
}

/**
 * The region-scoped mesh for a region page (TASK-496) — localized region
 * name, parent-country dataset facts, content-rich cities in the region
 * (registry-exact paths), and a data-driven FAQ. Data-driven for EVERY
 * region — tier-irrelevant and noindex untouched. Returns `undefined` when
 * the region row is unresolvable (unknown slug), so the view renders no
 * mesh rather than empty sections.
 */
export function regionMeshFor(
  entry: LocationPageEntry,
  locale: Locale = 'en',
): RegionMesh | undefined {
  const region = findRegionBySlugOrFlagship(entry.params.region ?? '');
  if (!region) return undefined;
  const country = findCountry(region.countryIso2);
  const facts = country ? countryFactsFor(country.iso2) : undefined;
  if (!country || !facts) return undefined;

  const cities = contentRichCitiesInRegion(region.id)
    .slice()
    .sort((a, b) => (b.population ?? 0) - (a.population ?? 0))
    .map((city) => ({
      name: cityLocalizedName(city, locale),
      path: cityLocationPath(city, locale),
    }))
    .filter((link): link is SiblingCityLink => link.path !== undefined);

  return {
    regionName: regionLocalizedName(region, locale),
    countryName: countryLocalizedName(country, locale),
    facts,
    cities,
    faq: regionFaqFor(locale, {
      regionName: regionLocalizedName(region, locale),
      countryName: countryLocalizedName(country, locale),
      facts,
      cities,
    }),
  };
}

/* ------------------------------------------------------------------ *
 * Dataset-driven country/region data points (TASK-496)
 *
 * Un-authored country/region pages have no `content.dataPoints`, so their
 * "Country facts" / "Region facts" sections would render empty. These
 * builders derive honest data point strings from the geo snapshot
 * (population/capital/languages) through the localized
 * `seoContent.location.factsTemplates.*` / `regionFactsTemplates.*` keys —
 * the same `countryFactsFor` source that feeds `countryMesh.facts` /
 * `regionMesh.facts`, so the mesh facts are always rendered.
 * ------------------------------------------------------------------ */

/** Dataset-driven "Country facts" data points from a resolved country row
 *  (TASK-496) — population/capital/languages via localized templates.
 *  Returns `[]` when the country row is unresolvable. */
export function countryDataPointsFor(country: LocationCountry, locale: Locale = 'en'): string[] {
  const facts = countryFactsFor(country.iso2);
  return facts ? countryFactsDataPoints(facts, locale) : [];
}

/** Dataset-driven "Country facts" data points from resolved country facts
 *  (TASK-496) — population/capital/languages via localized templates. The
 *  same source (`countryFactsFor`) that feeds `countryMesh.facts`, so the
 *  mesh facts are always rendered on screen. */
export function countryFactsDataPoints(facts: CountryFacts, locale: Locale = 'en'): string[] {
  const t = factsTemplateFor(locale);
  return [
    t('seoContent.location.factsTemplates.population', {
      value: formatPopulation(facts.population, locale),
    }),
    t('seoContent.location.factsTemplates.capital', { value: facts.capital }),
    t('seoContent.location.factsTemplates.languages', {
      value: languageNamesFor(facts.languages),
    }),
  ];
}

/** Dataset-driven "Region facts" data points from a resolved region row
 *  (TASK-496) — parent-country context (part-of + population/capital/
 *  languages) via localized templates. Returns `[]` when the parent country
 *  row is unresolvable. */
export function regionDataPointsFor(region: LocationRegion, locale: Locale = 'en'): string[] {
  const country = findCountry(region.countryIso2);
  if (!country) return [];
  const facts = countryFactsFor(country.iso2);
  if (!facts) return [];
  return regionFactsDataPoints(countryLocalizedName(country, locale), facts, locale);
}

/** Dataset-driven "Region facts" data points from the localized country
 *  name + the parent-country facts (TASK-496). */
export function regionFactsDataPoints(
  countryName: string,
  facts: CountryFacts,
  locale: Locale = 'en',
): string[] {
  const t = factsTemplateFor(locale);
  return [
    t('seoContent.location.regionFactsTemplates.partOfCountry', { country: countryName }),
    t('seoContent.location.factsTemplates.population', {
      value: formatPopulation(facts.population, locale),
    }),
    t('seoContent.location.factsTemplates.capital', { value: facts.capital }),
    t('seoContent.location.factsTemplates.languages', {
      value: languageNamesFor(facts.languages),
    }),
  ];
}

/** Locale-aware `t` for the facts templates with EN fallback (the client
 *  provider falls back the same way, so surfaces never show raw keys). */
function factsTemplateFor(locale: Locale) {
  const t = getT(getDictionary(locale));
  const enT = getT(getDictionary('en'));
  return (key: string, vars: Record<string, string | number>): string => {
    const localized = t(key, vars);
    return localized === key ? enT(key, vars) : localized;
  };
}

/* ------------------------------------------------------------------ *
 * Data-driven FAQ templates (TASK-496 — genuinely useful, dataset-driven
 * FAQ for ALL country/region pages, un-authored included)
 *
 * Authored country/region FAQ (Germany, United States, Berlin, New York)
 * stays the source of truth; every OTHER country/region page derives a
 * localized FAQ from the geo dataset — population, capital, languages,
 * content-rich cities and regions — through the
 * `seoContent.location.faqTemplates.*` keys. No fabricated claims: every
 * value is the dataset's own, and the operation answer mirrors the honest
 * "no local offices" line used across the authored content.
 * ------------------------------------------------------------------ */

/** Data-driven FAQ for a country page (TASK-496) — the localized template
 *  populated from the country mesh (dataset facts + content-rich cities +
 *  regions). Falls back to authored content FAQ when present (higher
 *  quality, hand-written); this fills the gap for un-authored countries. */
export function countryFaqFor(locale: Locale, mesh: CountryMesh): LocationFaq[] {
  const t = faqTemplateFor(locale);
  const country = mesh.countryName;
  const cities = mesh.cities.map((city) => city.name).slice(0, 3);
  const cityList = cities.length > 0 ? cities.join(', ') : country;
  const { population, capital, languages } = mesh.facts;
  return [
    {
      question: t('seoContent.location.faqTemplates.country.communitiesQuestion', { country }),
      answer: t('seoContent.location.faqTemplates.country.communitiesAnswer', {
        country,
        cities: cityList,
      }),
    },
    {
      question: t('seoContent.location.faqTemplates.country.populationQuestion', { country }),
      answer: t('seoContent.location.faqTemplates.country.populationAnswer', {
        country,
        population: formatPopulation(population, locale),
      }),
    },
    {
      question: t('seoContent.location.faqTemplates.country.capitalQuestion', { country }),
      answer: t('seoContent.location.faqTemplates.country.capitalAnswer', {
        country,
        capital,
      }),
    },
    {
      question: t('seoContent.location.faqTemplates.country.languageQuestion', { country }),
      answer: t('seoContent.location.faqTemplates.country.languageAnswer', {
        country,
        languages: languageNamesFor(languages),
      }),
    },
    {
      question: t('seoContent.location.faqTemplates.country.operationQuestion', { country }),
      answer: t('seoContent.location.faqTemplates.country.operationAnswer', { country }),
    },
  ];
}

/** Data-driven FAQ for a region page (TASK-496) — the localized template
 *  populated from the region mesh (parent-country facts + content-rich
 *  cities in the region). */
export function regionFaqFor(
  locale: Locale,
  mesh: Pick<RegionMesh, 'regionName' | 'countryName' | 'facts' | 'cities'>,
): LocationFaq[] {
  const t = faqTemplateFor(locale);
  const region = mesh.regionName;
  const country = mesh.countryName;
  const cities = mesh.cities.map((city) => city.name).slice(0, 3);
  const cityList = cities.length > 0 ? cities.join(', ') : region;
  const { capital, languages } = mesh.facts;
  return [
    {
      question: t('seoContent.location.faqTemplates.region.communitiesQuestion', { region }),
      answer: t('seoContent.location.faqTemplates.region.communitiesAnswer', {
        region,
        cities: cityList,
      }),
    },
    {
      question: t('seoContent.location.faqTemplates.region.countryQuestion', { region }),
      answer: t('seoContent.location.faqTemplates.region.countryAnswer', {
        region,
        country,
        capital,
      }),
    },
    {
      question: t('seoContent.location.faqTemplates.region.languageQuestion', { region }),
      answer: t('seoContent.location.faqTemplates.region.languageAnswer', {
        region,
        languages: languageNamesFor(languages),
      }),
    },
    {
      question: t('seoContent.location.faqTemplates.region.operationQuestion', { region }),
      answer: t('seoContent.location.faqTemplates.region.operationAnswer', { region }),
    },
  ];
}

/** Locale-aware `t` for the FAQ templates with EN fallback. */
function faqTemplateFor(locale: Locale) {
  const t = getT(getDictionary(locale));
  const enT = getT(getDictionary('en'));
  return (key: string, vars: Record<string, string | number>): string => {
    const localized = t(key, vars);
    return localized === key ? enT(key, vars) : localized;
  };
}

/* ------------------------------------------------------------------ *
 * Group-type links (city/variant pages — design §6.4 #3)
 * ------------------------------------------------------------------ */

export interface GroupTypeLink {
  label: string;
  path: string;
  current?: boolean;
  /** Group-type key (or the reserved `ideas` slug) for client chrome lookup. */
  key?: GroupTypeKey | typeof IDEA_VARIANT;
}

/**
 * Locale prefix for surface-relative paths — `/${locale}` for any non-EN
 * surface (e.g. `/de` for the de Berlin surface), empty for EN canonical.
 * Surfaces only carry committed pages, so surface-relative links stay inside
 * that tree.
 */
function localePathPrefix(locale: Locale): string {
  return locale === 'en' ? '' : `/${locale}`;
}

/**
 * Variant + ideas links for a city/variant/ideas entry (only committed
 * content). Un-gated (Sprint 20): derives from the registry entry — city
 * identity via `entry.params` and content via
 * `getCityContent(entry.params.city, locale)` — so the "Explore community
 * types" section renders for EVERY content-rich city, flagship or not.
 */
export function groupTypeLinksFor(entry: LocationPageEntry, locale: Locale): GroupTypeLink[] {
  const citySlugValue = entry.params.city ?? '';
  if (!citySlugValue) return [];
  const content = getCityContent(citySlugValue, locale);
  if (!content || content.kind !== 'city') return [];
  const prefix = localePathPrefix(locale);
  const base = `${prefix}${LOCATION_HUB_PATH}/${entry.params.country ?? ''}/${entry.params.region ?? ''}/${citySlugValue}`;
  const links: GroupTypeLink[] = [];
  const t = getT(getDictionary(locale));
  for (const type of GROUP_TYPES) {
    if (!content.variantIntros[type.key]) continue;
    links.push({
      label: groupTypeLabelForLocale(type.key, locale),
      path: `${base}/${type.key}`,
      key: type.key,
    });
  }
  if (content.ideaPage) {
    links.push({
      label: t('seoContent.location.ideasLink'),
      path: `${base}/${IDEA_VARIANT}`,
      key: IDEA_VARIANT,
    });
  }
  return links;
}

/* ------------------------------------------------------------------ *
 * View model
 * ------------------------------------------------------------------ */

export interface LocationViewData {
  kind: PageKind;
  locale: Locale;
  path: string;
  title: string;
  description: string;
  indexable: boolean;
  /** Hero eyebrow (chrome — static EN for phase A; seoContent lands TASK-310). */
  eyebrow: string;
  /** H1. */
  heading: string;
  /** Hero lead — the registry description (short, keyword-rich chrome). */
  lead: string;
  /**
   * Full authored intro prose — an explicit array of paragraphs (G2 source).
   * City intros are paragraph arrays (TASK-410); single-paragraph kinds
   * (variant/ideas/country/region) wrap into a one-element array. Each entry
   * renders as its own paragraph block on the location page (TASK-416). An
   * empty array means no authored prose — the view falls back to the lead.
   */
  intro: string[];
  /**
   * Group-type key of the current variant page (TASK-319) — lets the view
   * render the "Where {type} communities gather" enrichment headings.
   * Present only on variant pages.
   */
  groupType?: GroupTypeKey;
  /**
   * Per-variant enrichment — venues/formats/how-to (TASK-319). Present only
   * on variant pages with committed enrichment; drives the distinct variant
   * sections ("Where {type} communities gather", "Typical formats",
   * "How to start").
   */
  variantEnrichment?: VariantEnrichment;
  breadcrumbs: BreadcrumbItem[];
  /**
   * Per-locale H1 values (TASK-516) — populated for non-hub kinds: the hero
   * heading resolved for EVERY supported locale (committed per-locale content
   * title → localized dataset name → EN registry heading). The client view
   * picks the ACTIVE locale's value on language toggle (a titleKey/titleVars
   * style re-resolution that works without new i18n dictionary keys — entity
   * names live in the dataset, not the chrome dictionaries); the server-baked
   * `heading` stays the pre-hydration/SSR fallback. Hub stays undefined — its
   * H1 resolves through the `seoContent.breadcrumb.hub` chrome key.
   */
  headingLocalized?: Partial<Record<Locale, string>>;
  dataPoints: string[];
  faq: LocationFaq[];
  groupTypeLinks: GroupTypeLink[];
  siblingCities: SiblingCityLink[];
  guideLinks: GuideLink[];
  /** Browsable directory for the hub (TASK-317) — populated for `hub` only. */
  hubDirectory?: HubDirectoryEntry[];
  /**
   * Translated hub intro prose (TASK-491) — populated for `hub` only from
   * `seoContent.location.hubIntro` (route-locale value with EN fallback).
   * The client view re-resolves the same key through the ACTIVE dictionary
   * on language toggle; this is the deterministic pre-hydration fallback.
   */
  hubIntro?: string;
  /**
   * Translated hub hero lead (TASK-491) — populated for `hub` only from
   * `seoContent.location.hubLead` (route-locale value with EN fallback).
   * The client view re-resolves the same key through the ACTIVE dictionary
   * on language toggle; this is the deterministic pre-hydration fallback.
   */
  hubLead?: string;
  /**
   * Country-scoped content-rich mesh (TASK-490) — populated for `country`
   * pages only: localized country name, content-rich cities in the country
   * (registry-exact paths), the region list, and dataset facts
   * (population/capital/languages).
   */
  countryMesh?: CountryMesh;
  /**
   * Region-scoped content-rich mesh (TASK-496) — populated for `region`
   * pages only: localized region name, parent-country dataset facts,
   * content-rich cities in the region (registry-exact paths), and a
   * data-driven FAQ. Data-driven for EVERY region (un-authored regions
   * included); authored region content still wins for prose/dataPoints/FAQ.
   */
  regionMesh?: RegionMesh;
  /** Idea listicle (ideas pages only). */
  ideaCategories?: IdeaCategory[];
  waitlistSource: string;
  /** Country/region/city display names for the honest presence claim. */
  entityLabel: string;
  /**
   * Real GeoNames coordinates for city pages (G-13) — populated for
   * `city` kind only, from the dataset row (never fabricated). Drives the
   * `City`/`Place` + `GeoCoordinates` JSON-LD payload.
   */
  cityGeo?: { lat: number; lng: number };
}

/** Localized eyebrow labels (chrome — seoContent namespace, TASK-310). */
function eyebrowFor(kind: PageKind, locale: Locale): string {
  const t = getT(getDictionary(locale));
  return t(`seoContent.eyebrow.${kind}`);
}

/** Strip the `| JoinOrigin` brand suffix (registry/content titles carry it). */
function stripBrand(title: string): string {
  return title.replace(/\s*\|\s*JoinOrigin\s*$/, '');
}

/** H1 for a location page (registry title without the brand suffix). */
function headingFor(entry: LocationPageEntry): string {
  return stripBrand(entry.title);
}

/**
 * The dataset entities behind a location entry (TASK-516) — resolved once per
 * build and shared by every per-locale resolution so the hot per-locale loops
 * never re-scan the ~50k-row city snapshot (findCityBySlug is a slug scan).
 */
interface DatasetEntities {
  city?: LocationCity;
  region?: LocationRegion;
  country?: LocationCountry;
}

/** Resolve the dataset entities for an entry (kind-scoped, once). */
function datasetEntitiesFor(entry: LocationPageEntry): DatasetEntities {
  if (entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas') {
    return { city: findCityBySlug(entry.params.city ?? '') };
  }
  if (entry.kind === 'region') {
    return { region: findRegionBySlugOrFlagship(entry.params.region ?? '') };
  }
  if (entry.kind === 'country') {
    return { country: findCountryBySlug(entry.params.country ?? '') };
  }
  return {};
}

/**
 * H1 for a location page — prefers the authored localized content title for
 * the ACTIVE locale (`pageTitles` per kind: city/variants/ideas; content
 * `title` overrides for country/region), else the localized dataset name
 * (country/region/city `names[locale]`) for non-EN surfaces, EN fallback to
 * the registry heading. TASK-449: canonical EN routes render the selected
 * locale's body titles when content exists (mexico-city → es), else stay EN.
 *
 * TASK-516: the content-title branch only applies to EXACT per-locale content
 * (`content.locale === locale`). EN-fallback content (see `getContent`) must
 * not leak EN chrome titles onto non-EN surfaces — e.g.
 * `/de/location/united-arab-emirates` renders "Vereinigte Arabische Emirate"
 * (the de dataset name) instead of the EN "Communities in United Arab
 * Emirates". The EN canonical surface keeps the registry heading fallback.
 */
function contentHeadingFor(
  entry: LocationPageEntry,
  content: CountryContent | RegionContent | CityContent | undefined,
  locale: Locale,
  entities: DatasetEntities = datasetEntitiesFor(entry),
): string {
  if (content && content.locale === locale) {
    if (content.kind === 'city') {
      const localized =
        entry.kind === 'variant'
          ? entry.groupType && isGroupTypeKey(entry.groupType)
            ? content.pageTitles?.variants?.[entry.groupType as GroupTypeKey]
            : undefined
          : entry.kind === 'ideas'
            ? content.pageTitles?.ideas
            : entry.kind === 'city'
              ? content.pageTitles?.city
              : undefined;
      if (localized) return stripBrand(localized);
    }
    if (content.title) return stripBrand(content.title);
  }
  const datasetName =
    locale !== 'en' ? localizedDatasetNameFor(entry, locale, entities) : undefined;
  return datasetName ?? headingFor(entry);
}

/**
 * The localized dataset display name for a country/region/city entry
 * (`names[locale]`, EN fallback — TASK-516). Used as the hero H1 fallback on
 * non-EN surfaces when no committed per-locale content title exists, and for
 * breadcrumb labels. `undefined` when the dataset entity cannot be resolved.
 * `entities` (optional) carries the pre-resolved dataset rows so hot
 * per-locale loops skip the ~50k-row city slug scan.
 */
function localizedDatasetNameFor(
  entry: LocationPageEntry,
  locale: Locale,
  entities: DatasetEntities = datasetEntitiesFor(entry),
): string | undefined {
  if (entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas') {
    const city = entities.city;
    if (city) return cityLocalizedName(city, locale);
  }
  if (entry.kind === 'region') {
    const region = entities.region;
    if (region) return regionLocalizedName(region, locale);
  }
  if (entry.kind === 'country') {
    const country = entities.country;
    if (country) return countryLocalizedName(country, locale);
  }
  return undefined;
}

/**
 * The hero H1 resolved for EVERY supported locale (TASK-516) — populated on
 * the view model as `headingLocalized` so the client LocationView re-resolves
 * the ACTIVE locale's H1 on language toggle without new i18n dictionary keys
 * (entity names live in the dataset, not the chrome dictionaries). The hub
 * skips the map — its H1 resolves through the `seoContent.breadcrumb.hub`
 * chrome key.
 */
function headingLocalizedFor(entry: LocationPageEntry): Partial<Record<Locale, string>> {
  const byLocale: Partial<Record<Locale, string>> = {};
  // Resolve the dataset rows once — the per-locale loop reuses them.
  const entities = datasetEntitiesFor(entry);
  for (const locale of SUPPORTED_LOCALES) {
    byLocale[locale] = contentHeadingFor(entry, contentFor(entry, locale), locale, entities);
  }
  return byLocale;
}

/**
 * Hero lead — prefers the authored localized content description for the
 * active locale (`pageTitles` descriptions per kind, then the content
 * `description` override), else the registry description. TASK-449: mirrors
 * the registry title/description precedence so canonical EN routes render
 * the selected locale's lead when content exists.
 */
function leadFor(
  entry: LocationPageEntry,
  content: CountryContent | RegionContent | CityContent | undefined,
): string {
  if (content?.kind === 'city') {
    const localized =
      entry.kind === 'variant'
        ? entry.groupType && isGroupTypeKey(entry.groupType)
          ? content.pageTitles?.variantDescriptions?.[entry.groupType as GroupTypeKey]
          : undefined
        : entry.kind === 'ideas'
          ? content.pageTitles?.ideasDescription
          : entry.kind === 'city'
            ? content.pageTitles?.cityDescription
            : undefined;
    if (localized) return localized;
  }
  if (content?.description) return content.description;
  return entry.description;
}

/**
 * Hub entity label for the honest presence claim — resolves the localized
 * `seoContent.location.hubEntity` key (TASK-449; i18n-locale-keys-sync
 * TASK-452 ships the key to every locale JSON), with EN + literal fallbacks
 * so the server view never surfaces a raw key string.
 */
function hubEntityLabel(locale: Locale): string {
  const t = getT(getDictionary(locale));
  const enT = getT(getDictionary('en'));
  const key = 'seoContent.location.hubEntity';
  const localized = t(key);
  if (localized !== key) return localized;
  const enValue = enT(key);
  return enValue === key ? 'your city' : enValue;
}

/**
 * TASK-491 — hub chrome for the translated intro + hero lead: resolves the
 * localized `seoContent.location.hubIntro` / `hubLead` keys for the active
 * locale (EN fallback, literal fallbacks for resilience) so the server view
 * model carries route-locale values as a deterministic pre-hydration
 * fallback, exactly like the other chrome keys. The client LocationView
 * re-resolves the same keys through the ACTIVE dictionary on language
 * toggle, so `/location` and per-locale hubs fully translate.
 */
function hubChromeFor(locale: Locale): { hubIntro?: string; hubLead?: string } {
  const t = getT(getDictionary(locale));
  const enT = getT(getDictionary('en'));
  const introKey = 'seoContent.location.hubIntro';
  const leadKey = 'seoContent.location.hubLead';
  const resolve = (key: string, enFallback: string): string | undefined => {
    const localized = t(key);
    if (localized !== key) return localized;
    const enValue = enT(key);
    return enValue === key ? enFallback : enValue;
  };
  return {
    hubIntro: resolve(introKey, ''),
    hubLead: resolve(leadKey, ''),
  };
}

/** Entity display label for the honest presence claim (§6.4 #6). TASK-517:
 *  proper-cased dataset display names — the flagship override for flagship
 *  cities, else the localized dataset name (EN fallback) for city/variant/
 *  ideas/region/country — never the lowercase slug-spaced params. */
function entityLabelFor(entry: LocationPageEntry, locale: Locale): string {
  if (entry.kind === 'hub') return hubEntityLabel(locale);
  if (entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas') {
    const city = findCityBySlug(entry.params.city ?? '');
    if (city) {
      const flagship = getFlagshipConfig(citySlug(city));
      if (flagship) return cityDisplayName(city);
      return cityLocalizedName(city, locale);
    }
  }
  if (entry.kind === 'region') {
    const region = findRegionBySlugOrFlagship(entry.params.region ?? '');
    if (region) return regionLocalizedName(region, locale);
  }
  if (entry.kind === 'country') {
    const country = findCountryBySlug(entry.params.country ?? '');
    if (country) return countryLocalizedName(country, locale);
  }
  return (entry.params.city ?? entry.params.region ?? entry.params.country ?? 'your city').replace(
    /-/g,
    ' ',
  );
}

/**
 * Build the full render model for a location page. Content resolves with
 * per-locale files (EN fallback only at canonical EN URLs — de pages use the
 * committed de content exactly, design §7.1).
 *
 * `ipCountry` (optional, TASK-480) is the null-safe server geo value
 * (`getServerCountry()`) — it orders the hub's Browse-locations directory
 * IP-country matches first. Absent on non-hub pages / fallback surfaces.
 */
export function buildLocationViewData(
  entry: LocationPageEntry,
  locale: Locale = 'en',
  ipCountry: string | null = null,
): LocationViewData {
  const content = contentFor(entry, locale);
  // Sprint 20 — un-gated: the city entity resolves from the registry entry's
  // slug for ANY city/variant/ideas entry (flagship or content-rich Tier-2/3),
  // so sibling-cities + group-type links populate for every content city.
  const cityEntity =
    entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas'
      ? findCityBySlug(entry.params.city ?? '')
      : undefined;

  // TASK-516 — the per-locale hero H1 map (non-hub kinds) is computed once
  // and shared by the view model + the variant/ideas current-page breadcrumb
  // crumb, so the client can re-resolve the ACTIVE locale on language toggle.
  const headingLocalized = entry.kind === 'hub' ? undefined : headingLocalizedFor(entry);
  const breadcrumbs = breadcrumbsFor(entry, locale, headingLocalized);
  const intro = introFor(entry, content);
  // TASK-491 — hub chrome: the translated intro prose + hero lead resolve
  // from the active locale dictionary (`hubIntro` / `hubLead`). The hub's
  // registry description is locale-independent EN chrome, so the view model
  // carries route-locale translations as the pre-hydration fallback and the
  // client re-resolves through the ACTIVE dictionary on language toggle.
  const hubChrome = entry.kind === 'hub' ? hubChromeFor(locale) : undefined;

  // TASK-319 — per-variant enrichment: expose the current variant's group
  // type + its committed venues/formats/howToStart so LocationView can render
  // distinct "Where {type} communities gather" / "Typical formats" /
  // "How to start" sections on variant pages only.
  const groupType =
    entry.kind === 'variant' && isGroupTypeKey(entry.groupType ?? '')
      ? (entry.groupType as GroupTypeKey)
      : undefined;
  const variantEnrichment =
    groupType && content?.kind === 'city' ? content.variantEnrichment?.[groupType] : undefined;

  // The hero lead is the registry description (short chrome); the full
  // authored intro renders as the body prose section (design §6.4 #1/#6).
  // TASK-449: prefer the localized content description override for the
  // active locale (pageTitles per kind), else the registry description.
  const lead = leadFor(entry, content);

  // TASK-496 — country/region data points + FAQ are data-driven for
  // un-authored pages: the authored content fields win when present (they
  // are higher quality), and the dataset fills the gap so EVERY country/
  // region page renders the same sections as the big-city pages. The
  // dataset data points derive from the same `countryFactsFor` source that
  // feeds `countryMesh.facts` / `regionMesh.facts`, so the mesh facts are
  // always rendered on screen.
  const countryMesh = entry.kind === 'country' ? countryMeshFor(entry, locale) : undefined;
  const regionMeshData = entry.kind === 'region' ? regionMeshFor(entry, locale) : undefined;
  const dataPoints =
    content?.dataPoints ??
    (entry.kind === 'country' && countryMesh
      ? countryFactsDataPoints(countryMesh.facts, locale)
      : entry.kind === 'region' && regionMeshData
        ? regionFactsDataPoints(regionMeshData.countryName, regionMeshData.facts, locale)
        : []);
  const faq =
    entry.kind === 'country'
      ? content?.faq && content.faq.length > 0
        ? content.faq
        : countryMesh
          ? countryFaqFor(locale, countryMesh)
          : []
      : entry.kind === 'region'
        ? content?.faq && content.faq.length > 0
          ? content.faq
          : regionMeshData
            ? regionMeshData.faq
            : []
        : entry.kind === 'hub'
          ? hubFaqFor(locale)
          : faqFor(entry, content);

  // G-13 — real GeoNames coordinates for city pages (the JSON-LD City/Place
  // payload mirrors the visible "City facts" section; never fabricated).
  const cityGeo =
    entry.kind === 'city' && cityEntity ? { lat: cityEntity.lat, lng: cityEntity.lng } : undefined;

  return {
    kind: entry.kind,
    locale,
    path: entry.path,
    title: entry.title,
    description: entry.description,
    indexable: entry.indexable,
    eyebrow: eyebrowFor(entry.kind, locale),
    heading: contentHeadingFor(entry, content, locale),
    // TASK-516 — the hero H1 resolves through the ACTIVE locale on language
    // toggle via the per-locale map (non-hub kinds; the hub keeps its chrome
    // titleKey). The map carries committed per-locale content titles → else
    // localized dataset names → else EN registry headings.
    headingLocalized,
    lead,
    intro,
    groupType,
    variantEnrichment,
    breadcrumbs,
    dataPoints,
    faq,
    groupTypeLinks:
      entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas'
        ? groupTypeLinksFor(entry, locale)
        : [],
    siblingCities:
      entry.kind === 'hub'
        ? flagshipCities(locale, 6)
        : entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas'
          ? siblingCitiesFor(cityEntity, 6, locale)
          : [],
    guideLinks: guideLinksFor(entry.kind, locale),
    hubDirectory: entry.kind === 'hub' ? hubDirectoryEntries(locale, ipCountry) : undefined,
    hubIntro: hubChrome?.hubIntro,
    hubLead: hubChrome?.hubLead,
    // TASK-490 — the country-scoped content-rich mesh populates for country
    // pages only: localized country name, content-rich cities, region list,
    // and dataset facts. Data-driven for EVERY country — indexability is
    // untouched (un-authored Tier-3 pages stay noindex).
    countryMesh,
    // TASK-496 — the region-scoped content-rich mesh populates for region
    // pages only: localized region name, parent-country facts, content-rich
    // cities in the region, and a data-driven FAQ. Data-driven for EVERY
    // region — indexability is untouched (un-authored Tier-3 pages stay
    // noindex).
    regionMesh: regionMeshData,
    ideaCategories:
      entry.kind === 'ideas' && content?.kind === 'city' ? content.ideaPage.categories : undefined,
    waitlistSource: waitlistSource(entry),
    entityLabel: entityLabelFor(entry, locale),
    cityGeo,
  };
}

/**
 * The authored intro paragraphs for a page — an explicit array where each
 * entry renders as its own paragraph block (TASK-410/TASK-416). City intros
 * are paragraph arrays; variant/ideas/country/region prose is a single
 * string wrapped into a one-element array. No authored content → `[]`.
 */
function introFor(
  entry: LocationPageEntry,
  content: CountryContent | RegionContent | CityContent | undefined,
): string[] {
  if (!content) return [];
  if (entry.kind === 'variant' && content.kind === 'city' && entry.groupType) {
    const variantIntro = content.variantIntros[entry.groupType as GroupTypeKey];
    return variantIntro ? [variantIntro] : [];
  }
  if (entry.kind === 'ideas' && content.kind === 'city') {
    return [content.ideaPage.intro];
  }
  if (content.kind === 'city') {
    return content.intro;
  }
  return content.intro ? [content.intro] : [];
}

/** Resolve the authored content for an entry (per-locale, EN at canonical).
 *  Location pages never load guide content — only country/region/city. */
function contentFor(
  entry: LocationPageEntry,
  locale: Locale,
): CountryContent | RegionContent | CityContent | undefined {
  if (entry.kind === 'country') return getCountryContent(entry.params.country ?? '', locale);
  if (entry.kind === 'region') return getRegionContent(entry.params.region ?? '', locale);
  return getCityContent(entry.params.city ?? '', locale);
}

/** FAQ for the page (city/variant/ideas share the city FAQ; mirror 1:1 in JSON-LD). */
function faqFor(entry: LocationPageEntry, content: LocationContent | undefined): LocationFaq[] {
  if (!content) return [];
  if (entry.kind === 'ideas' && content.kind === 'city') return content.ideaPage.faq;
  return content.faq;
}

/**
 * The `/location` hub FAQ (G-12, sprint-24 gap-analysis §6) — the generic
 * platform FAQ (the same translated `home.faq.*` keys the homepage renders,
 * resolved per-locale with EN fallback) so the hub carries a visible FAQ
 * block mirrored 1:1 in `FAQPage` JSON-LD. No new dictionary keys are
 * introduced — the keys already exist in all 21 locale files.
 */
function hubFaqFor(locale: Locale): LocationFaq[] {
  const t = getT(getDictionary(locale));
  const enT = getT(getDictionary('en'));
  const resolve = (key: string): string => {
    const localized = t(key);
    return localized === key ? enT(key) : localized;
  };
  return [1, 2, 3, 4, 5].map((n) => ({
    question: resolve(`home.faq.q${n}.question`),
    answer: resolve(`home.faq.q${n}.answer`),
  }));
}

/* ------------------------------------------------------------------ *
 * Breadcrumbs (design §8.5 up-links)
 * ------------------------------------------------------------------ */

function breadcrumbsFor(
  entry: LocationPageEntry,
  locale: Locale,
  headingLocalized?: Partial<Record<Locale, string>>,
): BreadcrumbItem[] {
  const t = getT(getDictionary(locale));
  const hubName = t('seoContent.breadcrumb.hub');
  // G-8 (sprint-24 gap-analysis §6): every crumb lives on the ACTIVE locale
  // surface `/<locale>/...` so the JSON-LD items use the same locale-prefixed
  // path the canonical tag uses (all-routes-prefixed, TASK-466 — the EN
  // canonical surface is `/en/**`, and every `/<locale>/location/**` route
  // exists as a generated wrapper with EN-fallback content, so surface paths
  // never 404). Ancestors no longer fall back to the unprefixed `/**` tree.
  const surfacePrefix = `/${locale}`;
  const upPath = (segments: string[]) =>
    `${surfacePrefix}${LOCATION_HUB_PATH}${segments.map((segment) => `/${segment}`).join('')}`;
  const crumbs: BreadcrumbItem[] = [
    { name: t('seoContent.breadcrumb.home'), path: surfacePrefix },
    { name: hubName, path: `${surfacePrefix}${LOCATION_HUB_PATH}` },
  ];
  if (entry.kind === 'hub') {
    return crumbs;
  }

  // TASK-516 — country/region/city crumbs use the localized dataset name
  // (`countryLocalizedName` / `regionLocalizedName` / `cityLocalizedName` —
  // `names[locale]` with an EN dataset fallback, EN registry title as the
  // last resort) instead of the EN `headingFor(entry)` titles. Each entity
  // crumb also carries the full per-locale map (`nameLocalized`) so the
  // client LocationView re-resolves the ACTIVE locale's name on language
  // toggle; the server-baked `name` stays the pre-hydration fallback. Home +
  // the `/location` hub crumb already resolve through the chrome dictionary —
  // they are kept unchanged.
  const country = findCountryBySlug(entry.params.country ?? '');
  const region = findRegionBySlugOrFlagship(entry.params.region ?? '');
  const city = findCityBySlug(entry.params.city ?? '');

  const pushEntityCrumb = (
    resolve: (l: Locale) => string | undefined,
    fallback: string,
    path: string,
  ) => {
    const nameLocalized: NonNullable<BreadcrumbItem['nameLocalized']> = {};
    for (const l of SUPPORTED_LOCALES) {
      nameLocalized[l] = resolve(l) ?? fallback;
    }
    crumbs.push({ name: nameLocalized[locale] ?? fallback, path, nameLocalized });
  };

  if (entry.kind === 'country') {
    pushEntityCrumb(
      (l) => (country ? countryLocalizedName(country, l) : undefined),
      headingFor(entry),
      forwardToLocaleSurface(entry.path, locale),
    );
    return crumbs;
  }

  if (entry.kind === 'region') {
    // Ancestor registry rows are looked up lazily per kind — building the
    // full EN registry (`locationPageEntries()`) is expensive, so country
    // pages (0 rows) and region pages (1 row) never pay the city-row scan.
    const countryEntry = locationPageEntries().find(
      (e) => e.kind === 'country' && e.params.country === entry.params.country,
    );
    if (countryEntry) {
      pushEntityCrumb(
        (l) => (country ? countryLocalizedName(country, l) : undefined),
        stripBrand(countryEntry.title),
        upPath([entry.params.country ?? '']),
      );
    }
    pushEntityCrumb(
      (l) => (region ? regionLocalizedName(region, l) : undefined),
      headingFor(entry),
      forwardToLocaleSurface(entry.path, locale),
    );
    return crumbs;
  }

  // city / variant / ideas — up-links through country + region.
  const countryEntry = locationPageEntries().find(
    (e) => e.kind === 'country' && e.params.country === entry.params.country,
  );
  const regionEntry = locationPageEntries().find(
    (e) =>
      e.kind === 'region' &&
      e.params.country === entry.params.country &&
      e.params.region === entry.params.region,
  );
  const cityEntryRow = locationPageEntries().find(
    (e) =>
      e.kind === 'city' &&
      e.params.country === entry.params.country &&
      e.params.region === entry.params.region &&
      e.params.city === entry.params.city,
  );
  if (countryEntry) {
    pushEntityCrumb(
      (l) => (country ? countryLocalizedName(country, l) : undefined),
      stripBrand(countryEntry.title),
      upPath([entry.params.country ?? '']),
    );
  }
  if (regionEntry) {
    pushEntityCrumb(
      (l) => (region ? regionLocalizedName(region, l) : undefined),
      stripBrand(regionEntry.title),
      upPath([entry.params.country ?? '', entry.params.region ?? '']),
    );
  }
  // The city crumb is only an ancestor for variant/ideas pages — on the city
  // page itself the current crumb IS the city, so no duplicate is emitted.
  if (cityEntryRow && entry.kind !== 'city') {
    pushEntityCrumb(
      (l) => (city ? cityLocalizedName(city, l) : undefined),
      stripBrand(cityEntryRow.title),
      upPath([entry.params.country ?? '', entry.params.region ?? '', entry.params.city ?? '']),
    );
  }
  if (entry.kind === 'city') {
    // Current crumb = the localized city dataset name (TASK-516) at the
    // ACTIVE locale surface path (G-8 — never the EN entry path).
    pushEntityCrumb(
      (l) => (city ? cityLocalizedName(city, l) : undefined),
      headingFor(entry),
      forwardToLocaleSurface(entry.path, locale),
    );
  } else {
    // variant / ideas — the current crumb mirrors the localized H1 (committed
    // per-locale pageTitles → localized city dataset name → EN registry
    // heading) so it re-translates on language toggle like the hero title.
    const currentNameLocalized: NonNullable<BreadcrumbItem['nameLocalized']> = {};
    for (const l of SUPPORTED_LOCALES) {
      currentNameLocalized[l] = headingLocalized?.[l] ?? headingFor(entry);
    }
    crumbs.push({
      name: currentNameLocalized[locale] ?? headingFor(entry),
      path: forwardToLocaleSurface(entry.path, locale),
      nameLocalized: currentNameLocalized,
    });
  }
  return crumbs;
}

/* ------------------------------------------------------------------ *
 * JSON-LD (BreadcrumbList / FAQPage / ItemList)
 * ------------------------------------------------------------------ */

export interface LocationJsonLdPayload {
  breadcrumbs?: ReturnType<typeof breadcrumbList>;
  faq?: ReturnType<typeof faqPage>;
  itemList?: ReturnType<typeof itemListForIdeas>;
  /** City/Place + GeoCoordinates (G-13) — city pages only. */
  city?: ReturnType<typeof cityPlace>;
}

/** ItemList JSON-LD for the 30-idea listicle (design §6.6, §9.4). */
export function itemListForIdeas(categories: IdeaCategory[]) {
  const items = categories.flatMap((category, categoryIndex) =>
    category.ideas.map((idea, ideaIndex) => ({
      '@type': 'ListItem' as const,
      position: categoryIndex * category.ideas.length + ideaIndex + 1,
      name: idea.title,
    })),
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items,
  };
}

/** All JSON-LD payloads for a location page (rendered by the route wrapper). */
export function locationJsonLd(data: LocationViewData): LocationJsonLdPayload {
  const payload: LocationJsonLdPayload = {
    breadcrumbs: breadcrumbList(data.breadcrumbs),
  };
  if (data.faq.length > 0) {
    payload.faq = faqPage(data.faq);
  }
  if (data.ideaCategories && data.ideaCategories.length > 0) {
    payload.itemList = itemListForIdeas(data.ideaCategories);
  }
  if (data.kind === 'city' && data.cityGeo) {
    // G-13 — City/Place + GeoCoordinates from the dataset row. The URL is
    // the current breadcrumb's path (already surface-prefixed), so it always
    // matches the page's canonical tag on every locale surface.
    const currentPath =
      data.breadcrumbs.length > 0 ? data.breadcrumbs[data.breadcrumbs.length - 1].path : data.path;
    payload.city = cityPlace({
      name: data.heading,
      path: currentPath,
      lat: data.cityGeo.lat,
      lng: data.cityGeo.lng,
    });
  }
  return payload;
}

/* ------------------------------------------------------------------ *
 * Static-params helpers (warm set — design §8.2)
 * ------------------------------------------------------------------ */

/** Warm-set params for a route kind on the EN surface. */
export function warmParamsFor(kind: PageKind): LocationRouteParams[] {
  return locationPageEntries()
    .filter(isWarmSetEntry)
    .filter((entry) => entry.kind === kind || (kind === 'variant' && entry.kind === 'ideas'))
    .map((entry) => entry.params);
}

/** Warm-set params for the de Berlin surface. */
export function warmParamsForLocale(kind: PageKind, locale: Locale): LocationRouteParams[] {
  return locationPageEntries(locale)
    .filter(isWarmSetEntry)
    .filter((entry) => entry.kind === kind || (kind === 'variant' && entry.kind === 'ideas'))
    .map((entry) => entry.params);
}

export { GROUP_TYPES, SITE };
