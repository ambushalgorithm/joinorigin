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

export function findCityByGeonameId(geonameId: number): LocationCity | undefined {
  return loadLocationSnapshot().cities.find((c) => c.id === geonameId);
}

export function findCityBySlug(slug: string): LocationCity | undefined {
  return loadLocationSnapshot().cities.find((c) => citySlug(c) === slug);
}

/* ------------------------------------------------------------------ *
 * Group-type taxonomy (§4.4 — a config array, not code)
 *
 * The user-approved Sprint 12 MVP scope fixes the 5-type set:
 * startup · creative · political · meetup · small-business.
 * These keys are the variant URL segments and the stable join key for
 * variant content + chrome. Display labels are EN chrome; the de labels
 * below support the MVP Berlin `de` registry titles (full per-locale
 * chrome localization is TASK-310's `seoContent` namespace).
 * ------------------------------------------------------------------ */

export type GroupTypeKey = 'startup' | 'creative' | 'political' | 'meetup' | 'small-business';

export const GROUP_TYPES = [
  {
    key: 'startup',
    label: 'Startup communities',
    labelDe: 'Startup-Communities',
    intent: 'startup communities',
  },
  {
    key: 'creative',
    label: 'Creative & design communities',
    labelDe: 'Kreativ- & Design-Communities',
    intent: 'creative and design communities',
  },
  {
    key: 'political',
    label: 'Political & civic communities',
    labelDe: 'Politische & bürgerschaftliche Communities',
    intent: 'political and civic communities',
  },
  {
    key: 'meetup',
    label: 'Community meetups & events',
    labelDe: 'Community-Meetups & Veranstaltungen',
    intent: 'community meetups and events',
  },
  {
    key: 'small-business',
    label: 'Small business communities',
    labelDe: 'Kleinunternehmer-Communities',
    intent: 'small business communities',
  },
] as const satisfies readonly {
  key: GroupTypeKey;
  label: string;
  labelDe: string;
  intent: string;
}[];

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

/** EN display label for a group-type key. */
export function groupTypeLabel(key: GroupTypeKey): string {
  return getGroupType(key).label;
}

/** Map a group-type key to its `seoContent.groupTypes.*` dictionary key. */
function groupTypeChromeKey(key: GroupTypeKey): string {
  return key === 'small-business' ? 'smallBusiness' : key;
}

/**
 * Per-locale display label for a group-type key — reads the `seoContent`
 * chrome namespace (TASK-310) with a fallback to the EN/de config labels so
 * registry titles + view links stay deterministic even if a key drifts.
 */
export function groupTypeLabelForLocale(key: GroupTypeKey, locale: Locale): string {
  const type = getGroupType(key);
  const chrome = getT(getDictionary(locale))(`seoContent.groupTypes.${groupTypeChromeKey(key)}`);
  if (chrome !== `seoContent.groupTypes.${groupTypeChromeKey(key)}`) {
    return chrome;
  }
  if (locale === 'de') return type.labelDe;
  return type.label;
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

/** Tier-2 auto-generated slice for Sprint 12 (empty — deferred per MVP). */
export const TIER_2_CITY_SLUGS: readonly string[] = [];

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
