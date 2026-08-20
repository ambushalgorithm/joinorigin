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

import { getCityContent, getCountryContent, getRegionContent } from './content';
import type {
  CityContent,
  CountryContent,
  IdeaCategory,
  LocationContent,
  LocationFaq,
  RegionContent,
  VariantEnrichment,
} from './content/types';
import type { LocationCity } from './data/types';
import { breadcrumbList, faqPage, type BreadcrumbItem } from './jsonLd';
import {
  FLAGSHIP_CITIES,
  GROUP_TYPES,
  IDEA_VARIANT,
  citySlug,
  countrySlug,
  findCityBySlug,
  findCountry,
  findRegion,
  getFlagshipConfig,
  groupTypeLabelForLocale,
  isGroupTypeKey,
  loadLocationSnapshot,
  regionSlug,
  type GroupTypeKey,
} from './locationData';
import type { PageKind } from './locationGates';
import {
  LOCATION_HUB_PATH,
  indexableLocationEntries,
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
 * hreflang (per-locale surfaces — design §7.2)
 * ------------------------------------------------------------------ */

/**
 * Committed path sets per locale surface — the dynamic generalization of the
 * former Berlin-only `DE_PATHS`. Each non-EN locale contributes the paths
 * `locationPageEntries(locale)` actually enumerates (committed content only,
 * phase A §7.1), so a counterpart is only ever reported where a translation
 * exists. EN never appears here — the canonical tree is the origin.
 */
function committedPathSets(): Map<Locale, ReadonlySet<string>> {
  const sets = new Map<Locale, ReadonlySet<string>>();
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === 'en') continue;
    sets.set(locale, new Set(locationPageEntries(locale).map((entry) => entry.path)));
  }
  return sets;
}

const COMMITTED_PATHS = committedPathSets();

/**
 * The counterpart path for an EN path on a locale surface (undefined when
 * the surface has no committed content for that page). All-routes-prefixed
 * (TASK-466): the EN surface is `/en/...` — an already-`/en`-prefixed input
 * is accepted (EN entry paths now carry the prefix). The EN locale itself
 * has no committed path set (the canonical tree is the origin), so callers
 * fall back to the EN view-model path and the client view localizes it.
 */
function localePathForEn(enPath: string, locale: Locale): string | undefined {
  const base = enPath.startsWith('/en') ? enPath.slice(3) : enPath;
  const candidate = `/${locale}${base}`;
  return COMMITTED_PATHS.get(locale)?.has(candidate) ? candidate : undefined;
}

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
 * unconditional. Unlike `localePathForEn` (which only maps surfaces with
 * COMMITTED content, for hreflang), card hrefs must point at the surface the
 * user is browsing: `/en/...` would navigate a `/es/location` visitor to the
 * English surface. Unprefixed paths (guide links) and EN itself pass through
 * unchanged.
 */
function forwardToLocaleSurface(enPath: string, locale: Locale): string {
  if (locale === 'en' || !enPath.startsWith('/en')) return enPath;
  return `/${locale}${enPath.slice('/en'.length)}`;
}

/**
 * `alternates.languages` for a location entry. Only surfaces with committed
 * translations carry a hreflang cluster (phase A — EN-only pages carry no
 * cluster). An EN page lists every locale surface with committed content for
 * the same path; a per-locale page lists its own locale + `en` + `x-default`
 * → EN canonical.
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
  const alternatives: Record<string, string> = {
    en: absoluteUrl(entry.path),
    'x-default': absoluteUrl(entry.path),
  };
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === 'en') continue;
    const localePath = localePathForEn(entry.path, locale);
    if (localePath) alternatives[locale] = absoluteUrl(localePath);
  }
  return Object.keys(alternatives).length > 2 ? alternatives : undefined;
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
 * Hub directory (TASK-317 — /location hub search/filter)
 * ------------------------------------------------------------------ */

/** One browsable entry in the `/location` hub directory. */
export interface HubDirectoryEntry {
  /** Display name (registry title without the brand suffix). */
  name: string;
  path: string;
  kind: PageKind;
}

/**
 * The complete browsable directory for the `/location` hub — every
 * indexable location page (countries, regions, cities, group-type variants,
 * ideas) derived from the registry. The hub view filters this client-side
 * by keyword; no separate index is invented (design §8.4).
 *
 * Locale-aware (TASK-449): each card's name resolves from the locale
 * surface (`indexableLocationEntries(locale)`) so Browse-locations card
 * names (country/region/city) render in the active locale when committed
 * content exists, EN fallback otherwise — the EN directory always stays
 * complete. Locale-aware paths (TASK-469): every card href points at the
 * ACTIVE locale surface (`/${locale}/location/...`) — all 21 locale trees
 * exist — never the EN-canonical `/en/...` (localizePath passes
 * already-prefixed hrefs through idempotently, so `/en` here would navigate
 * a non-EN hub visitor to the English surface).
 */
export function hubDirectoryEntries(locale: Locale = 'en'): HubDirectoryEntry[] {
  const localizedNames = new Map<string, string>();
  for (const entry of indexableLocationEntries(locale)) {
    if (entry.kind === 'hub') continue;
    localizedNames.set(locationEntryKey(entry), stripBrand(entry.title));
  }
  return indexableLocationEntries()
    .filter((entry) => entry.kind !== 'hub')
    .map((entry) => ({
      name: localizedNames.get(locationEntryKey(entry)) ?? stripBrand(entry.title),
      path: forwardToLocaleSurface(entry.path, locale),
      kind: entry.kind,
    }));
}

/** Locale-independent identity for a location entry (kind + params). */
function locationEntryKey(entry: LocationPageEntry): string {
  return `${entry.kind}:${entry.params.country ?? ''}/${entry.params.region ?? ''}/${entry.params.city ?? ''}/${entry.params.variant ?? ''}`;
}

/* ------------------------------------------------------------------ *
 * Guide cross-links (design §8.5 — every city links 2–4 relevant guides)
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
  { key: 'start-a-community', path: '/guides/start-a-community' },
  { key: 'find-a-co-founder', path: '/guides/find-a-co-founder' },
  { key: 'first-10-members', path: '/guides/first-10-members' },
  { key: 'keep-a-community-active', path: '/guides/keep-a-community-active' },
  { key: 'hybrid-communities', path: '/guides/hybrid-communities' },
  { key: 'organize-a-meetup', path: '/guides/organize-a-meetup' },
  { key: 'moderation', path: '/guides/moderation' },
] as const satisfies readonly { key: string; path: string }[];

/** 2–4 relevant guides per page kind (city pages → the how-to starter set). */
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
  if (kind === 'hub') return withTitles(GUIDE_PATHS);
  if (kind === 'country' || kind === 'region') {
    return withTitles([GUIDE_PATHS[0], GUIDE_PATHS[1]]);
  }
  if (kind === 'ideas') {
    return withTitles([GUIDE_PATHS[0], GUIDE_PATHS[1], GUIDE_PATHS[2]]);
  }
  // city + variant pages
  return withTitles([GUIDE_PATHS[0], GUIDE_PATHS[1], GUIDE_PATHS[2]]);
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
 */
export function siblingCitiesFor(
  city: LocationCity | undefined,
  limit = 6,
  locale: Locale = 'en',
): SiblingCityLink[] {
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
      const path = cityLocationPath(sibling, locale);
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
  dataPoints: string[];
  faq: LocationFaq[];
  groupTypeLinks: GroupTypeLink[];
  siblingCities: SiblingCityLink[];
  guideLinks: GuideLink[];
  /** Browsable directory for the hub (TASK-317) — populated for `hub` only. */
  hubDirectory?: HubDirectoryEntry[];
  /** Idea listicle (ideas pages only). */
  ideaCategories?: IdeaCategory[];
  waitlistSource: string;
  /** Country/region/city display names for the honest presence claim. */
  entityLabel: string;
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
 * H1 for a location page — prefers the authored localized content title for
 * the active locale (`pageTitles` per kind: city/variants/ideas; content
 * `title` overrides for country/region), EN fallback to the registry
 * heading. TASK-449: canonical EN routes render the selected locale's body
 * titles when content exists (mexico-city → es), else stay EN.
 */
function contentHeadingFor(
  entry: LocationPageEntry,
  content: CountryContent | RegionContent | CityContent | undefined,
): string {
  if (content?.kind === 'city') {
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
  if (content?.title) return stripBrand(content.title);
  return headingFor(entry);
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

/** Entity display label for the honest presence claim (§6.4 #6). */
function entityLabelFor(entry: LocationPageEntry, locale: Locale): string {
  if (entry.kind === 'hub') return hubEntityLabel(locale);
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
  // Sprint 20 — un-gated: the city entity resolves from the registry entry's
  // slug for ANY city/variant/ideas entry (flagship or content-rich Tier-2/3),
  // so sibling-cities + group-type links populate for every content city.
  const cityEntity =
    entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas'
      ? findCityBySlug(entry.params.city ?? '')
      : undefined;

  const breadcrumbs = breadcrumbsFor(entry, locale);
  const intro = introFor(entry, content);

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

  return {
    kind: entry.kind,
    locale,
    path: entry.path,
    title: entry.title,
    description: entry.description,
    indexable: entry.indexable,
    eyebrow: eyebrowFor(entry.kind, locale),
    heading: contentHeadingFor(entry, content),
    lead,
    intro,
    groupType,
    variantEnrichment,
    breadcrumbs,
    dataPoints: content?.dataPoints ?? [],
    faq: faqFor(entry, content),
    groupTypeLinks:
      entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas'
        ? groupTypeLinksFor(entry, locale)
        : [],
    siblingCities:
      entry.kind === 'hub'
        ? FLAGSHIP_CITIES.flatMap((flagshipCity) => {
            const cityEntryRow = locationPageEntries().find(
              (e) => e.kind === 'city' && e.params.city === flagshipCity.slug,
            );
            return cityEntryRow
              ? [
                  {
                    name: flagshipCity.displayName,
                    path: forwardToLocaleSurface(cityEntryRow.path, locale),
                  },
                ]
              : [];
          })
        : entry.kind === 'city' || entry.kind === 'variant' || entry.kind === 'ideas'
          ? siblingCitiesFor(cityEntity, 6, locale)
          : [],
    guideLinks: guideLinksFor(entry.kind, locale),
    hubDirectory: entry.kind === 'hub' ? hubDirectoryEntries(locale) : undefined,
    ideaCategories:
      entry.kind === 'ideas' && content?.kind === 'city' ? content.ideaPage.categories : undefined,
    waitlistSource: waitlistSource(entry),
    entityLabel: entityLabelFor(entry, locale),
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

/* ------------------------------------------------------------------ *
 * Breadcrumbs (design §8.5 up-links)
 * ------------------------------------------------------------------ */

function breadcrumbsFor(entry: LocationPageEntry, locale: Locale): BreadcrumbItem[] {
  const t = getT(getDictionary(locale));
  const hubName = t('seoContent.breadcrumb.hub');
  // Up-links point at the per-locale surface when that ancestor has committed
  // content there; otherwise they stay on the EN canonical tree (phase A §7.1
  // — the de surface only carries the 7 Berlin pages, so ancestors are
  // EN-only). The hub crumb follows the same rule.
  const upPath = (segments: string[]) => {
    const canonical = `${LOCATION_HUB_PATH}${segments.map((segment) => `/${segment}`).join('')}`;
    return localePathForEn(canonical, locale) ?? canonical;
  };
  const crumbs: BreadcrumbItem[] = [
    { name: t('seoContent.breadcrumb.home'), path: '/' },
    { name: hubName, path: localePathForEn(LOCATION_HUB_PATH, locale) ?? LOCATION_HUB_PATH },
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
