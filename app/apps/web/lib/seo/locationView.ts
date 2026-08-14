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
 *    languages for the Berlin `de` surface + robots noindex for
 *    Tier-3/failed-gate pages),
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

import type { Locale } from '@joinorigin/i18n';

import { getCityContent, getCountryContent, getRegionContent } from './content';
import type { IdeaCategory, LocationContent, LocationFaq } from './content/types';
import type { LocationCity } from './data/types';
import { LOCATION_ATTRIBUTION } from './data/types';
import { breadcrumbList, faqPage, type BreadcrumbItem } from './jsonLd';
import {
  FLAGSHIP_CITIES,
  GROUP_TYPES,
  IDEA_VARIANT,
  citySlug,
  countrySlug,
  findCityByGeonameId,
  findCountry,
  findRegion,
  getFlagshipConfig,
  groupTypeLabelForLocale,
  loadLocationSnapshot,
  regionSlug,
  type FlagshipCityConfig,
  type GroupTypeKey,
} from './locationData';
import type { PageKind } from './locationGates';
import {
  LOCATION_HUB_PATH,
  isWarmSetEntry,
  locationPageEntries,
  type LocationPageEntry,
} from './locationPages';
import { createMetadata } from './metadata';
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
 * hreflang (Berlin de surface — design §7.2)
 * ------------------------------------------------------------------ */

const DE_PATHS = new Set(locationPageEntries('de').map((entry) => entry.path));

/** The de counterpart path for an EN path (Berlin surface only). */
function dePathForEn(enPath: string): string | undefined {
  const dePath = `/de${enPath}`;
  return DE_PATHS.has(dePath) ? dePath : undefined;
}

/** The EN counterpart path for a de path. */
function enPathForDe(dePath: string): string {
  return dePath.replace(/^\/de/, '');
}

/**
 * `alternates.languages` for a location entry. Only the Berlin surface has
 * committed de translations (phase A — EN-only pages carry no hreflang
 * cluster). EN Berlin pages list `en` + `de` + `x-default` → EN canonical;
 * de Berlin pages list `de` + `en` + `x-default` → EN canonical.
 */
export function languagesFor(entry: LocationPageEntry): Record<string, string> | undefined {
  if (entry.locale === 'de') {
    const enUrl = absoluteUrl(enPathForDe(entry.path));
    return {
      de: absoluteUrl(entry.path),
      en: enUrl,
      'x-default': enUrl,
    };
  }
  const dePath = dePathForEn(entry.path);
  if (!dePath) return undefined;
  return {
    en: absoluteUrl(entry.path),
    de: absoluteUrl(dePath),
    'x-default': absoluteUrl(entry.path),
  };
}

/* ------------------------------------------------------------------ *
 * Metadata
 * ------------------------------------------------------------------ */

/**
 * Per-page metadata for a location entry: canonical + OG/Twitter via the
 * shared `createMetadata`, robots `noindex,follow` for Tier-3 / failed-gate
 * pages, and `alternates.languages` (hreflang) for the Berlin de surface.
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
 * Guide cross-links (design §8.5 — every city links 2–4 relevant guides)
 * ------------------------------------------------------------------ */

export interface GuideLink {
  title: string;
  path: string;
}

const GUIDE_PATHS = [
  { title: 'Start a community', path: '/guides/start-a-community' },
  { title: 'Organize a meetup', path: '/guides/organize-a-meetup' },
  { title: 'Get your first 10 members', path: '/guides/first-10-members' },
  { title: 'Find a co-founder', path: '/guides/find-a-co-founder' },
  { title: 'Keep a community active', path: '/guides/keep-a-community-active' },
  { title: 'Run hybrid communities', path: '/guides/hybrid-communities' },
  { title: 'Moderate your community', path: '/guides/moderation' },
] as const satisfies readonly GuideLink[];

/** 2–4 relevant guides per page kind (city pages → the how-to starter set). */
export function guideLinksFor(kind: PageKind): GuideLink[] {
  if (kind === 'hub') return [...GUIDE_PATHS];
  if (kind === 'country' || kind === 'region') {
    return [GUIDE_PATHS[0], GUIDE_PATHS[1]];
  }
  if (kind === 'ideas') {
    return [GUIDE_PATHS[0], GUIDE_PATHS[1], GUIDE_PATHS[2]];
  }
  // city + variant pages
  return [GUIDE_PATHS[0], GUIDE_PATHS[1], GUIDE_PATHS[2]];
}

/* ------------------------------------------------------------------ *
 * Sibling cities (design §8.5 — 5–10 same-region cities)
 * ------------------------------------------------------------------ */

/** Display name + path for a sibling city (registry-exact URL). */
export interface SiblingCityLink {
  name: string;
  path: string;
}

/** Registry-exact location path for a city (mirrors `cityEntry`). */
export function cityLocationPath(city: LocationCity): string | undefined {
  const flagship = FLAGSHIP_CITIES.find((candidate) => candidate.geonameId === city.id);
  const region = findRegion(city.regionId);
  const country = findCountry(city.countryIso2);
  if (!region || !country) return undefined;
  const slug = flagship?.slug ?? citySlug(city);
  const regionSeg = flagship?.regionSlug ?? regionSlug(region);
  const countrySeg = flagship?.countrySlug ?? countrySlug(country);
  return `${LOCATION_HUB_PATH}/${countrySeg}/${regionSeg}/${slug}`;
}

/**
 * Same-region sibling cities, deduped on (regionId, slug), highest
 * population first, excluding the given city — capped at `limit` (5–10).
 */
export function siblingCitiesFor(city: LocationCity | undefined, limit = 6): SiblingCityLink[] {
  if (!city) return [];
  const snapshot = loadLocationSnapshot();
  const byKey = new Map<string, LocationCity>();
  for (const candidate of snapshot.cities) {
    if (candidate.regionId !== city.regionId || candidate.id === city.id) continue;
    const key = `${candidate.regionId}:${citySlug(candidate)}`;
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
  return [...byKey.values()]
    .sort((a, b) => (b.population ?? 0) - (a.population ?? 0))
    .slice(0, limit)
    .flatMap((sibling) => {
      const path = cityLocationPath(sibling);
      return path ? [{ name: sibling.asciiName, path }] : [];
    });
}

/* ------------------------------------------------------------------ *
 * Group-type links (city/variant pages — design §6.4 #3)
 * ------------------------------------------------------------------ */

export interface GroupTypeLink {
  label: string;
  path: string;
  current?: boolean;
}

/**
 * Locale prefix for surface-relative paths (`/de` for the de Berlin surface,
 * empty for EN canonical). The de surface only carries the 7 Berlin pages,
 * so surface-relative links stay inside that tree.
 */
function localePathPrefix(locale: Locale): string {
  return locale === 'de' ? '/de' : '';
}

/** Variant + ideas links for a flagship city page (only committed content). */
export function groupTypeLinksFor(
  flagship: FlagshipCityConfig,
  locale: Locale,
  entryPath?: string,
): GroupTypeLink[] {
  const content = getCityContent(flagship.slug, locale);
  if (!content || content.kind !== 'city') return [];
  const base =
    entryPath && entryPath.startsWith('/de/')
      ? entryPath.replace(/\/[^/]+$/, '')
      : `${localePathPrefix(locale)}${LOCATION_HUB_PATH}/${flagship.countrySlug}/${flagship.regionSlug}/${flagship.slug}`;
  const links: GroupTypeLink[] = [];
  for (const type of GROUP_TYPES) {
    if (!content.variantIntros[type.key]) continue;
    links.push({
      label: groupTypeLabelForLocale(type.key, locale),
      path: `${base}/${type.key}`,
    });
  }
  if (content.ideaPage) {
    links.push({
      label: locale === 'de' ? '30 Ideen für Community-Events' : '30 community event ideas',
      path: `${base}/${IDEA_VARIANT}`,
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
  /** Full authored intro prose (unique city/variant/idea copy — G2 source). */
  intro: string;
  breadcrumbs: BreadcrumbItem[];
  dataPoints: string[];
  faq: LocationFaq[];
  groupTypeLinks: GroupTypeLink[];
  siblingCities: SiblingCityLink[];
  guideLinks: GuideLink[];
  /** Idea listicle (ideas pages only). */
  ideaCategories?: IdeaCategory[];
  waitlistSource: string;
  attribution: string;
  /** Country/region/city display names for the honest presence claim. */
  entityLabel: string;
}

/** Localized eyebrow labels (static chrome — TASK-310 wires seoContent). */
function eyebrowFor(kind: PageKind, locale: Locale): string {
  if (locale === 'de') {
    if (kind === 'hub') return 'Communities nach Stadt';
    if (kind === 'country') return 'Communities im Land';
    if (kind === 'region') return 'Communities in der Region';
    if (kind === 'ideas') return 'Event-Ideen';
    if (kind === 'variant') return 'Community-Typ';
    return 'Communities in der Stadt';
  }
  if (kind === 'hub') return 'Communities by city';
  if (kind === 'country') return 'Communities in this country';
  if (kind === 'region') return 'Communities in this region';
  if (kind === 'ideas') return 'Community event ideas';
  if (kind === 'variant') return 'Community type';
  return 'Communities in this city';
}

/** H1 for a location page (registry title without the brand suffix). */
function headingFor(entry: LocationPageEntry): string {
  return entry.title.replace(/\s*\|\s*JoinOrigin\s*$/, '');
}

/** Entity display label for the honest presence claim (§6.4 #6). */
function entityLabelFor(entry: LocationPageEntry): string {
  if (entry.kind === 'hub') return 'your city';
  if (entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas') {
    const flagship = getFlagshipConfig(entry.params.city ?? '');
    if (flagship) return flagship.displayName;
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
 */
export function buildLocationViewData(
  entry: LocationPageEntry,
  locale: Locale = 'en',
): LocationViewData {
  const content = contentFor(entry, locale);
  const flagship =
    entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas'
      ? getFlagshipConfig(entry.params.city ?? '')
      : undefined;
  const cityEntity =
    flagship && entry.params.city ? findCityByGeonameId(flagship.geonameId) : undefined;

  const breadcrumbs = breadcrumbsFor(entry, locale);
  const intro =
    (entry.kind === 'variant' && content?.kind === 'city' && entry.groupType
      ? content.variantIntros[entry.groupType as GroupTypeKey]
      : undefined) ??
    (entry.kind === 'ideas' && content?.kind === 'city' ? content.ideaPage.intro : undefined) ??
    content?.intro ??
    '';

  // The hero lead is the registry description (short chrome); the full
  // authored intro renders as the body prose section (design §6.4 #1/#6).
  const lead = entry.description;

  return {
    kind: entry.kind,
    locale,
    path: entry.path,
    title: entry.title,
    description: entry.description,
    indexable: entry.indexable,
    eyebrow: eyebrowFor(entry.kind, locale),
    heading: headingFor(entry),
    lead,
    intro,
    breadcrumbs,
    dataPoints: content?.dataPoints ?? [],
    faq: faqFor(entry, content),
    groupTypeLinks:
      flagship && (entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas')
        ? groupTypeLinksFor(flagship, locale)
        : [],
    siblingCities:
      entry.kind === 'hub'
        ? FLAGSHIP_CITIES.flatMap((flagshipCity) => {
            const cityEntryRow = locationPageEntries().find(
              (e) => e.kind === 'city' && e.params.city === flagshipCity.slug,
            );
            return cityEntryRow
              ? [{ name: flagshipCity.displayName, path: cityEntryRow.path }]
              : [];
          })
        : entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas'
          ? siblingCitiesFor(cityEntity)
          : [],
    guideLinks: guideLinksFor(entry.kind),
    ideaCategories:
      entry.kind === 'ideas' && content?.kind === 'city' ? content.ideaPage.categories : undefined,
    waitlistSource: waitlistSource(entry),
    attribution: LOCATION_ATTRIBUTION,
    entityLabel: entityLabelFor(entry),
  };
}

/** Resolve the authored content for an entry (per-locale, EN at canonical). */
function contentFor(entry: LocationPageEntry, locale: Locale): LocationContent | undefined {
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

/* ------------------------------------------------------------------ *
 * Breadcrumbs (design §8.5 up-links)
 * ------------------------------------------------------------------ */

function breadcrumbsFor(entry: LocationPageEntry, locale: Locale): BreadcrumbItem[] {
  const hubName = locale === 'de' ? 'Communities nach Stadt' : 'Communities by City';
  // Up-links stay on the EN canonical tree for de pages (the de surface only
  // carries the 7 Berlin pages — ancestors are EN-only, phase A §7.1).
  const upPrefix = locale === 'de' ? '' : '';
  const upPath = (segments: string[]) =>
    `${upPrefix}${LOCATION_HUB_PATH}${segments.map((segment) => `/${segment}`).join('')}`;
  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: hubName, path: locale === 'de' ? LOCATION_HUB_PATH : LOCATION_HUB_PATH },
  ];
  if (entry.kind === 'hub') {
    return crumbs;
  }
  if (entry.kind === 'country') {
    crumbs.push({ name: headingFor(entry), path: entry.path });
    return crumbs;
  }
  if (entry.kind === 'region') {
    const countryEntry = locationPageEntries().find(
      (e) => e.kind === 'country' && e.params.country === entry.params.country,
    );
    if (countryEntry) {
      crumbs.push({
        name: countryEntry.title.replace(/\s*\|\s*JoinOrigin\s*$/, ''),
        path: upPath([entry.params.country ?? '']),
      });
    }
    crumbs.push({ name: headingFor(entry), path: entry.path });
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
    crumbs.push({
      name: countryEntry.title.replace(/\s*\|\s*JoinOrigin\s*$/, ''),
      path: upPath([entry.params.country ?? '']),
    });
  }
  if (regionEntry) {
    crumbs.push({
      name: regionEntry.title.replace(/\s*\|\s*JoinOrigin\s*$/, ''),
      path: upPath([entry.params.country ?? '', entry.params.region ?? '']),
    });
  }
  // The city crumb is only an ancestor for variant/ideas pages — on the city
  // page itself the current crumb IS the city, so no duplicate is emitted.
  if (cityEntryRow && entry.kind !== 'city') {
    crumbs.push({
      name: cityEntryRow.title.replace(/\s*\|\s*JoinOrigin\s*$/, ''),
      path: upPath([
        entry.params.country ?? '',
        entry.params.region ?? '',
        entry.params.city ?? '',
      ]),
    });
  }
  crumbs.push({ name: headingFor(entry), path: entry.path });
  return crumbs;
}

/* ------------------------------------------------------------------ *
 * JSON-LD (BreadcrumbList / FAQPage / ItemList)
 * ------------------------------------------------------------------ */

export interface LocationJsonLdPayload {
  breadcrumbs?: ReturnType<typeof breadcrumbList>;
  faq?: ReturnType<typeof faqPage>;
  itemList?: ReturnType<typeof itemListForIdeas>;
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
