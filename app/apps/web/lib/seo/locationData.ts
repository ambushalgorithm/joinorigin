/**
 * Location data layer — snapshot loader + tier config + group-type taxonomy
 * + city seed copy model (design §5.2, §4.4, §6.4).
 *
 * This module is the data foundation for the location-page registry
 * (`./locationPages.ts`, fe-seo-registry TASK-307):
 *
 *  - loads the committed GeoNames/SimpleMaps/Wikidata snapshot exactly once
 *    (lazy singleton, deterministic — pages never re-fetch at runtime),
 *  - defines the MVP 5-type group-type taxonomy from the user-approved
 *    Sprint 12 scope (startup, creative, political, meetup, small-business),
 *  - defines the tier model (Tier-1 flagships with manual polish, Tier-2
 *    auto-generated slice, Tier-3 data-only long tail),
 *  - carries the city seed copy model — per-city facts (neighborhoods,
 *    landmarks, industries, universities, venues, culture) that content
 *    authors weave into unique, honest prose (G1/G2 sources).
 *
 * Body copy lives in `./content/` files, NEVER in locale JSONs (localization
 * R2/R5, design §7.1). This module holds data/config only — no page routes.
 *
 * Design source: `app/docs/design/sprint-11-seo-content-engine.md`
 * (TASK-303) §5.2/§4.4/§6.4; Sprint 12 MVP scope (tasks.md).
 */

import { getDictionary, getT, type Locale } from '@joinorigin/i18n';

import data from './data/locations.json';
import type { LocationCity, LocationCountry, LocationRegion, LocationSnapshot } from './data/types';

export type { Locale };

/* ------------------------------------------------------------------ *
 * Snapshot loader
 * ------------------------------------------------------------------ */

let snapshot: LocationSnapshot | undefined;

/**
 * The committed location snapshot (lazy singleton). Reading the JSON once
 * and memoizing keeps build-time iteration cheap and deterministic; the
 * dataset version drives `lastModified` for every registry entry.
 */
export function loadLocationSnapshot(): LocationSnapshot {
  if (!snapshot) {
    snapshot = data as LocationSnapshot;
  }
  return snapshot;
}

/** Dataset version date — deterministic `lastModified` source (§8.3). */
export function getDatasetVersion(): string {
  return loadLocationSnapshot().version;
}

/* ------------------------------------------------------------------ *
 * Slug helpers (§4.2 — lowercase kebab-case, ASCII, no trailing slash)
 * ------------------------------------------------------------------ */

/** ASCII kebab-case slug for a display/ascii name. */
export function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function countrySlug(country: LocationCountry): string {
  return slugify(country.asciiName);
}

export function regionSlug(region: LocationRegion): string {
  return slugify(region.asciiName);
}

export function citySlug(city: LocationCity): string {
  return slugify(city.asciiName);
}

/* ------------------------------------------------------------------ *
 * Dataset lookups (G3 — real places only, never synthetic)
 * ------------------------------------------------------------------ */

export function findCountry(iso2: string): LocationCountry | undefined {
  return loadLocationSnapshot().countries.find((c) => c.iso2 === iso2);
}

export function findRegion(regionId: string): LocationRegion | undefined {
  return loadLocationSnapshot().regions.find((r) => r.id === regionId);
}

/** Find a country by its URL slug (the canonical `countrySlug` segment). */
export function findCountryBySlug(slug: string): LocationCountry | undefined {
  return loadLocationSnapshot().countries.find((c) => countrySlug(c) === slug);
}

/** Find a region by its URL slug (the canonical `regionSlug` segment). */
export function findRegionBySlug(slug: string): LocationRegion | undefined {
  return loadLocationSnapshot().regions.find((r) => regionSlug(r) === slug);
}

export function findCityByGeonameId(geonameId: number): LocationCity | undefined {
  return loadLocationSnapshot().cities.find((c) => c.id === geonameId);
}

/**
 * Deterministic geonameId resolution for slug-collision content-rich cities
 * (TASK-484). The GeoNames snapshot can carry multiple rows sharing an ascii
 * name across different countries/regions (e.g. "London" exists as London,
 * Ontario AND London, England; "Taipei" as the Taipei capital AND the New
 * Taipei City district). A bare `citySlug` scan returns the FIRST snapshot
 * match, which is not always the intended content-rich city — this map pins
 * the intended row so every content-rich consumer (Browse-locations
 * directory, Flagship/Start-local lists, locale-area ordering, registry
 * variant/ideas construction) resolves deterministically. The 7 collisions:
 * london-CA, madrid-CO, los-angeles-CL, san-francisco-SV, vancouver-US,
 * barcelona-VE, taipei-dup.
 */
export const CONTENT_RICH_CITY_GEONAME_IDS: Readonly<Record<string, number>> = {
  london: 2643743, // London, England — not London, Ontario
  'san-francisco': 5391959, // San Francisco, US — not San Francisco, El Salvador
  'los-angeles': 5368361, // Los Angeles, US — not Los Ángeles, Chile
  vancouver: 6173331, // Vancouver, Canada — not Vancouver, Washington
  barcelona: 3128760, // Barcelona, Spain — not Barcelona, Venezuela
  madrid: 3117735, // Madrid, Spain — not Madrid, Colombia
  taipei: 1668341, // Taipei, Taiwan — not the Shulin District / New Taipei City rows
};

/**
 * Find a city by URL slug. Slug-collision content-rich cities resolve
 * through `CONTENT_RICH_CITY_GEONAME_IDS` first (deterministic — the
 * intended row wins regardless of snapshot order); all other slugs fall back
 * to the first snapshot row whose ascii name slugs to the value.
 */
export function findCityBySlug(slug: string): LocationCity | undefined {
  const pinnedId = CONTENT_RICH_CITY_GEONAME_IDS[slug];
  if (pinnedId !== undefined) {
    const pinned = findCityByGeonameId(pinnedId);
    if (pinned) return pinned;
  }
  return loadLocationSnapshot().cities.find((c) => citySlug(c) === slug);
}

/* ------------------------------------------------------------------ *
 * Group-type taxonomy (§4.4 — a config array, not code)
 *
 * The user-approved Sprint 12 MVP scope fixes the 5-type set:
 * startup · creative · political · meetup · small-business.
 * These keys are the variant URL segments and the stable join key for
 * variant content + chrome. Display labels are NOT hardcoded here — they
 * resolve from the `seoContent.groupTypes.*` dictionary per locale
 * (TASK-310 + TASK-411/TASK-416), so every surface renders localized
 * chrome and no EN label ever drifts into another locale.
 * ------------------------------------------------------------------ */

export type GroupTypeKey = 'startup' | 'creative' | 'political' | 'meetup' | 'small-business';

export const GROUP_TYPES = [
  { key: 'startup' },
  { key: 'creative' },
  { key: 'political' },
  { key: 'meetup' },
  { key: 'small-business' },
] as const satisfies readonly { key: GroupTypeKey }[];

export function isGroupTypeKey(value: string): value is GroupTypeKey {
  return (GROUP_TYPES as readonly { key: string }[]).some((t) => t.key === value);
}

export function getGroupType(key: GroupTypeKey): (typeof GROUP_TYPES)[number] {
  const type = (GROUP_TYPES as readonly (typeof GROUP_TYPES)[number][]).find((t) => t.key === key);
  if (!type) {
    throw new Error(`Unknown group type: ${key}`);
  }
  return type;
}

/** EN display label for a group-type key (via the `seoContent` chrome). */
export function groupTypeLabel(key: GroupTypeKey): string {
  return getT(getDictionary('en'))(`seoContent.groupTypes.${groupTypeChromeKey(key)}`);
}

/** Map a group-type key to its `seoContent.groupTypes.*` dictionary key. */
function groupTypeChromeKey(key: GroupTypeKey): string {
  return key === 'small-business' ? 'smallBusiness' : key;
}

/**
 * Per-locale display label for a group-type key — reads the `seoContent`
 * chrome namespace (TASK-310). Returns the raw key only if a locale drifts
 * (the client provider falls back to EN, so surfaces stay localized).
 */
export function groupTypeLabelForLocale(key: GroupTypeKey, locale: Locale): string {
  return getT(getDictionary(locale))(`seoContent.groupTypes.${groupTypeChromeKey(key)}`);
}

/** Reserved variant slug for the idea page (design §3.4). */
export const IDEA_VARIANT = 'ideas';

/** True when a variant slug is the reserved idea page slug. */
export function isIdeaVariant(slug: string): boolean {
  return slug === IDEA_VARIANT;
}

/* ------------------------------------------------------------------ *
 * Tier model (D10 unified 3-tier; §3.3)
 *
 * Tier 1 — Flagship: manual-polish cities (MVP: NYC + Berlin).
 * Tier 2 — Major: auto-generated with rich template (MVP slice deferred).
 * Tier 3 — Long tail: data-only cities, noindexed until promoted.
 * ------------------------------------------------------------------ */

/**
 * Tier-2 auto-generated slice — the Sprint 18 55-city approved set
 * (user-approved planning session 2026-08-17; tasks.md). The 2 flagships
 * (new-york, berlin) are also part of the 55-city set but resolve to Tier-1
 * because `tierForCitySlug` checks the flagship list first.
 */
export const TIER_2_CITY_SLUGS: readonly string[] = [
  // en (15)
  'new-york',
  'london',
  'san-francisco',
  'los-angeles',
  'chicago',
  'austin',
  'toronto',
  'vancouver',
  'dublin',
  'nairobi',
  'lagos',
  'cape-town',
  'johannesburg',
  'sydney',
  'singapore',
  // de (2)
  'berlin',
  'munich',
  // fr (2)
  'paris',
  'montreal',
  // es (8)
  'mexico-city',
  'buenos-aires',
  'bogota',
  'lima',
  'barcelona',
  'madrid',
  'medellin',
  'barranquilla',
  // pt-BR (3)
  'sao-paulo',
  'rio-de-janeiro',
  'lisbon',
  // it (1)
  'milan',
  // nl (1)
  'amsterdam',
  // pl (1)
  'warsaw',
  // tr (1)
  'istanbul',
  // uk (1)
  'kyiv',
  // ru (1)
  'moscow',
  // fa (1)
  'tehran',
  // ar (3)
  'dubai',
  'cairo',
  'casablanca',
  // hi (6)
  'mumbai',
  'delhi',
  'bengaluru',
  'hyderabad',
  'chennai',
  'pune',
  // ja (2)
  'tokyo',
  'osaka',
  // ko (1)
  'seoul',
  // zh-TW (2)
  'taipei',
  'hong-kong',
  // zh-CN (1)
  'shanghai',
  // id (1)
  'jakarta',
  // th (1)
  'bangkok',
  // vi (1)
  'ho-chi-minh-city',
];

export interface FlagshipCityConfig {
  /** City URL slug (kebab-case). */
  slug: string;
  /** Stable dataset join key (GeoNames geonameId — never ambiguous). */
  geonameId: number;
  /** Display name for titles/H1 (e.g. "New York City"). */
  displayName: string;
  /** Region URL segment (override where the dataset name is poor). */
  regionSlug: string;
  /** Dataset region id (e.g. "us-ny", "de-16") for slug override detection. */
  regionId: string;
  /** Human region label for titles (e.g. "New York"). */
  regionLabel: string;
  /** Country URL segment. */
  countrySlug: string;
  /** Human country label for titles. */
  countryLabel: string;
  /** Locales with committed per-locale content files (body translations). */
  locales: Locale[];
}

/** Tier-1 flagship cities — the user-approved MVP surface (tasks.md). */
export const FLAGSHIP_CITIES: readonly FlagshipCityConfig[] = [
  {
    slug: 'new-york',
    geonameId: 5128581,
    displayName: 'New York City',
    regionSlug: 'new-york',
    regionId: 'us-ny',
    regionLabel: 'New York',
    countrySlug: 'united-states',
    countryLabel: 'United States',
    locales: ['en'],
  },
  {
    slug: 'berlin',
    geonameId: 2950159,
    displayName: 'Berlin',
    regionSlug: 'berlin',
    regionId: 'de-16',
    regionLabel: 'Berlin',
    countrySlug: 'germany',
    countryLabel: 'Germany',
    locales: ['en', 'de'],
  },
];

export function getFlagshipConfig(slug: string): FlagshipCityConfig | undefined {
  return FLAGSHIP_CITIES.find((c) => c.slug === slug);
}

export function isFlagshipSlug(slug: string): boolean {
  return getFlagshipConfig(slug) !== undefined;
}

/** Tier for a city slug: 1 = flagship, 2 = auto slice, 3 = long tail. */
export function tierForCitySlug(slug: string): 1 | 2 | 3 {
  if (isFlagshipSlug(slug)) return 1;
  if (TIER_2_CITY_SLUGS.includes(slug)) return 2;
  return 3;
}

/* ------------------------------------------------------------------ *
 * Content-rich city set (TASK-480 — Flagship + Start-local, tier-irrelevant)
 *
 * The browsable flagship/start-local lists show EVERY city with committed
 * authored content, not just the Tier-1 flagships. The base set is the
 * approved Tier-2 slice (which includes the two flagships); `EXTRA_...`
 * collects additional committed-content cities outside that slice (e.g.
 * Copenhagen — Tier-3 content that renders but stays noindex). Ordering is
 * locale-driven (`localeCountryCodes`) — see `locationView.flagshipCities`.
 * ------------------------------------------------------------------ */

/** Committed-content cities beyond the approved Tier-2 slice (Tier-3). */
const EXTRA_CONTENT_RICH_CITY_SLUGS = ['copenhagen'] as const;

/** Every content-rich city slug (flagships + Tier-2 slice + Tier-3 content). */
export const CONTENT_RICH_CITY_SLUGS: readonly string[] = [
  ...TIER_2_CITY_SLUGS,
  ...EXTRA_CONTENT_RICH_CITY_SLUGS,
];

/** The content-rich city entities in `CONTENT_RICH_CITY_SLUGS` order
 *  (slug-resolved via the snapshot — undefined rows are skipped).
 *  Slug-collision cities (london, madrid, los-angeles, san-francisco,
 *  vancouver, barcelona, taipei) resolve deterministically through
 *  `CONTENT_RICH_CITY_GEONAME_IDS` (TASK-484) — never a bare first-match
 *  snapshot row. */
export function contentRichCities(): LocationCity[] {
  return CONTENT_RICH_CITY_SLUGS.flatMap((slug) => {
    const city = findCityBySlug(slug);
    return city ? [city] : [];
  });
}

/** Display name for a city card — flagship config overrides (e.g. "New York
 *  City") keep the polished titles; every other city uses its ascii name. */
export function cityDisplayName(city: LocationCity): string {
  const flagship = getFlagshipConfig(citySlug(city));
  return flagship?.displayName ?? city.asciiName;
}

/* ------------------------------------------------------------------ *
 * Localized dataset names (TASK-484 — searchText source)
 *
 * `locations.json` carries a 21-locale `names` record per country/region/
 * city (Wikidata → GeoNames alternates → EN). These helpers resolve the
 * ACTIVE locale's name for a row with an EN fallback, so the
 * Browse-locations `searchText` enrichment can include the localized
 * country + region names ("Deutschland", "東京") instead of EN only.
 * ------------------------------------------------------------------ */

/** Active-locale dataset name for a country (`names[locale]` → EN fallback). */
export function countryLocalizedName(country: LocationCountry, locale: Locale): string {
  return country.names[locale] || country.names.en || country.asciiName;
}

/** Active-locale dataset name for a region (`names[locale]` → EN fallback). */
export function regionLocalizedName(region: LocationRegion, locale: Locale): string {
  return region.names[locale] || region.names.en || region.asciiName;
}

/** Active-locale dataset name for a city (`names[locale]` → EN fallback). */
export function cityLocalizedName(city: LocationCity, locale: Locale): string {
  return city.names[locale] || city.names.en || city.asciiName;
}

/* ------------------------------------------------------------------ *
 * Locale-driven area (TASK-480 — "active locale's country/area first")
 *
 * Each locale's "language area" is the set of countries whose
 * predominant-locale cities live in that locale (mirrors the Sprint 18
 * 55-city grouping in `TIER_2_CITY_SLUGS`). `localeCountryCodes(locale)`
 * resolves those countries to ISO-3166-1 alpha-2 codes so ordering helpers
 * can rank entries — Flagship/Start-local lists and every Browse-locations
 * section — by "the active locale's country/area first".
 * ------------------------------------------------------------------ */

/** Predominant-locale city slugs per locale (mirrors the Tier-2 slice
 *  grouping — user-approved 2026-08-17; stays in lockstep with
 *  `TIER_2_CITY_SLUGS`). */
export const LOCALE_CITY_SLUGS: Readonly<Record<Locale, readonly string[]>> = {
  en: [
    'new-york',
    'london',
    'san-francisco',
    'los-angeles',
    'chicago',
    'austin',
    'toronto',
    'vancouver',
    'dublin',
    'nairobi',
    'lagos',
    'cape-town',
    'johannesburg',
    'sydney',
    'singapore',
  ],
  de: ['berlin', 'munich'],
  fr: ['paris', 'montreal'],
  es: [
    'mexico-city',
    'buenos-aires',
    'bogota',
    'lima',
    'barcelona',
    'madrid',
    'medellin',
    'barranquilla',
  ],
  'pt-BR': ['sao-paulo', 'rio-de-janeiro', 'lisbon'],
  it: ['milan'],
  nl: ['amsterdam'],
  pl: ['warsaw'],
  tr: ['istanbul'],
  uk: ['kyiv'],
  ru: ['moscow'],
  fa: ['tehran'],
  ar: ['dubai', 'cairo', 'casablanca'],
  hi: ['mumbai', 'delhi', 'bengaluru', 'hyderabad', 'chennai', 'pune'],
  ja: ['tokyo', 'osaka'],
  ko: ['seoul'],
  'zh-TW': ['taipei', 'hong-kong'],
  'zh-CN': ['shanghai'],
  id: ['jakarta'],
  th: ['bangkok'],
  vi: ['ho-chi-minh-city'],
};

/**
 * ISO-3166-1 alpha-2 codes of the active locale's language area — the
 * countries whose predominant-locale content cities are committed in that
 * locale. Used to rank Flagship/Start-local lists and Browse-locations
 * sections "locale-language matches first". Deterministic (data-driven —
 * never header-dependent). Slug-collision cities resolve through
 * `CONTENT_RICH_CITY_GEONAME_IDS` (TASK-484), so the area reflects the
 * intended row's country (london → GB, never London, Ontario's CA).
 */
export function localeCountryCodes(locale: Locale): ReadonlySet<string> {
  const codes = new Set<string>();
  for (const slug of LOCALE_CITY_SLUGS[locale]) {
    const city = findCityBySlug(slug);
    if (city) codes.add(city.countryIso2);
  }
  return codes;
}

/* ------------------------------------------------------------------ *
 * City seed copy model (§6.4 #1 — "Unique city intro" source)
 *
 * Verifiable, honest per-city facts used by content authors to write
 * unique prose. Seeds power G1 data points (venue/industry/landmark
 * references) and G2 unique prose. Never fabricated social proof.
 * ------------------------------------------------------------------ */

export interface CitySeed {
  /** Boroughs / neighborhoods with distinct community scenes. */
  neighborhoods: string[];
  /** Landmarks + public spaces people actually know. */
  landmarks: string[];
  /** Economic clusters that shape the community scene. */
  industries: string[];
  /** Universities feeding local communities. */
  universities: string[];
  /** Venue types where groups realistically meet. */
  venues: string[];
  /** Culture/events that anchor meetups. */
  culture: string[];
}

/** Seed copy per flagship city (keyed by city slug). */
export const CITY_SEED: Record<string, CitySeed> = {
  'new-york': {
    neighborhoods: [
      'SoHo',
      'Williamsburg',
      'Harlem',
      'Astoria',
      'Greenwich Village',
      'Bushwick',
      'the Upper East Side',
      'DUMBO',
    ],
    landmarks: [
      'Central Park',
      'the High Line',
      'Brooklyn Bridge',
      'Prospect Park',
      'the Statue of Liberty',
      'Times Square',
    ],
    industries: ['finance', 'technology', 'media', 'fashion', 'healthcare', 'advertising'],
    universities: ['NYU', 'Columbia University', 'CUNY', 'Fordham University', 'Pratt Institute'],
    venues: [
      'coworking spaces in SoHo',
      'coffee shops in Greenwich Village',
      'public libraries across the five boroughs',
      'community gardens in Brooklyn',
      'rooftop bars in Williamsburg',
    ],
    culture: [
      'Broadway theater',
      'Chelsea gallery openings',
      'museum mile',
      'food markets like Essex Market',
      'street festivals such as the Feast of San Gennaro',
    ],
  },
  berlin: {
    neighborhoods: [
      'Kreuzberg',
      'Neukölln',
      'Prenzlauer Berg',
      'Friedrichshain',
      'Mitte',
      'Wedding',
      'Charlottenburg',
      'Schöneberg',
    ],
    landmarks: [
      'Brandenburg Gate',
      'Tempelhofer Feld',
      'the Fernsehturm',
      'the East Side Gallery',
      'Tiergarten',
      'Mauerpark',
    ],
    industries: ['technology', 'media', 'music', 'design', 'climate tech', 'e-commerce'],
    universities: ['Humboldt University', 'TU Berlin', 'FU Berlin', 'UdK Berlin', 'ESMT Berlin'],
    venues: [
      'Kulturbrauerei',
      'RAW-Gelände',
      'Späti corner shops',
      'biergartens in Kreuzberg',
      'coworking spaces in Mitte',
      'Volkspark Friedrichshain',
    ],
    culture: [
      'the techno and electronic music scene',
      'gallery openings in Mitte',
      'street art in Friedrichshain',
      'the Stammtisch meetup tradition',
      'film festivals such as the Berlinale',
    ],
  },
};

export function getCitySeed(slug: string): CitySeed | undefined {
  return CITY_SEED[slug];
}
