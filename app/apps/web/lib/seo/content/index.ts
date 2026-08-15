/**
 * Content registry + loader (design §6, §7.1).
 *
 * Body copy lives in committed per-city per-locale content files — NEVER in
 * locale JSONs (localization R2/R5). This module registers every authored
 * file and resolves content with an EN fallback:
 *
 * - `getContent(kind, slug, locale)` → the requested locale when committed,
 *   else the EN source of truth (EN body at canonical URLs; Google
 *   Translated results cover untranslated locales — design §7.1).
 * - `listContent(locale)` → all content available for a locale.
 *
 * The registry itself (`../locationPages.ts`) consumes this loader to derive
 * page entries and to run the G1–G5 quality gates.
 */

import type { Locale } from '@joinorigin/i18n';

import berlinRegionEn from './en/region/berlin';
import berlinCityEn from './en/city/berlin';
import berlinCityDe from './de/city/berlin';
import germanyCountryEn from './en/country/germany';
import newYorkRegionEn from './en/region/new-york';
import newYorkCityEn from './en/city/new-york';
import unitedStatesCountryEn from './en/country/united-states';
// L1 how-to guides (TASK-309) — EN source of truth.
import createAGroupGuideEn from './en/guide/create-a-group';
import createAProjectGuideEn from './en/guide/create-a-project';
import findACoFounderGuideEn from './en/guide/find-a-co-founder';
import first10MembersGuideEn from './en/guide/first-10-members';
import hybridCommunitiesGuideEn from './en/guide/hybrid-communities';
import keepCommunityActiveGuideEn from './en/guide/keep-a-community-active';
import moderationGuideEn from './en/guide/moderation';
import organizeMeetupGuideEn from './en/guide/organize-a-meetup';
import publishAnIdeaGuideEn from './en/guide/publish-an-idea';
import publishASmallBusinessIdeaGuideEn from './en/guide/publish-a-small-business-idea';
import publishAStartupConceptGuideEn from './en/guide/publish-a-startup-concept';
import startCommunityGuideEn from './en/guide/start-a-community';
import type {
  CityContent,
  ContentKind,
  CountryContent,
  GuideContent,
  LocationContent,
  RegionContent,
} from './types';

export type {
  CityContent,
  ContentKind,
  CountryContent,
  GuideContent,
  LocationContent,
  RegionContent,
};

/** One registered content file (declared fields must match the file path). */
interface ContentFileEntry {
  kind: ContentKind;
  slug: string;
  locale: Locale;
  content: LocationContent;
}

const CONTENT_FILES: readonly ContentFileEntry[] = [
  // EN source of truth — country pages.
  { kind: 'country', slug: 'united-states', locale: 'en', content: unitedStatesCountryEn },
  { kind: 'country', slug: 'germany', locale: 'en', content: germanyCountryEn },
  // EN source of truth — region pages.
  { kind: 'region', slug: 'new-york', locale: 'en', content: newYorkRegionEn },
  { kind: 'region', slug: 'berlin', locale: 'en', content: berlinRegionEn },
  // EN source of truth — flagship city pages (city + variants + ideas).
  { kind: 'city', slug: 'new-york', locale: 'en', content: newYorkCityEn },
  { kind: 'city', slug: 'berlin', locale: 'en', content: berlinCityEn },
  // Per-locale translations (Berlin → de, MVP).
  { kind: 'city', slug: 'berlin', locale: 'de', content: berlinCityDe },
  // L1 how-to guides (TASK-309) — manual content, EN source of truth.
  { kind: 'guide', slug: 'start-a-community', locale: 'en', content: startCommunityGuideEn },
  { kind: 'guide', slug: 'organize-a-meetup', locale: 'en', content: organizeMeetupGuideEn },
  { kind: 'guide', slug: 'first-10-members', locale: 'en', content: first10MembersGuideEn },
  { kind: 'guide', slug: 'find-a-co-founder', locale: 'en', content: findACoFounderGuideEn },
  {
    kind: 'guide',
    slug: 'keep-a-community-active',
    locale: 'en',
    content: keepCommunityActiveGuideEn,
  },
  { kind: 'guide', slug: 'hybrid-communities', locale: 'en', content: hybridCommunitiesGuideEn },
  { kind: 'guide', slug: 'moderation', locale: 'en', content: moderationGuideEn },
  // L1 how-to guides (TASK-353) — 5 new guides appended in display order.
  { kind: 'guide', slug: 'publish-an-idea', locale: 'en', content: publishAnIdeaGuideEn },
  { kind: 'guide', slug: 'create-a-project', locale: 'en', content: createAProjectGuideEn },
  { kind: 'guide', slug: 'create-a-group', locale: 'en', content: createAGroupGuideEn },
  {
    kind: 'guide',
    slug: 'publish-a-small-business-idea',
    locale: 'en',
    content: publishASmallBusinessIdeaGuideEn,
  },
  {
    kind: 'guide',
    slug: 'publish-a-startup-concept',
    locale: 'en',
    content: publishAStartupConceptGuideEn,
  },
];

/** True when committed content exists for (kind, slug) in a locale. */
export function hasContent(kind: ContentKind, slug: string, locale: Locale): boolean {
  return CONTENT_FILES.some(
    (entry) => entry.kind === kind && entry.slug === slug && entry.locale === locale,
  );
}

/**
 * Resolve content for (kind, slug, locale) with EN fallback.
 * Returns `undefined` when neither the locale nor EN has authored content.
 */
export function getContent<T extends LocationContent>(
  kind: ContentKind,
  slug: string,
  locale: Locale = 'en',
): T | undefined {
  const exact = CONTENT_FILES.find(
    (entry) => entry.kind === kind && entry.slug === slug && entry.locale === locale,
  );
  if (exact) return exact.content as T;
  if (locale !== 'en') {
    const enFallback = CONTENT_FILES.find(
      (entry) => entry.kind === kind && entry.slug === slug && entry.locale === 'en',
    );
    if (enFallback) return enFallback.content as T;
  }
  return undefined;
}

/** All authored content for a locale (EN fallback is NOT applied here). */
export function listContent(locale: Locale = 'en'): LocationContent[] {
  return CONTENT_FILES.filter((entry) => entry.locale === locale).map((entry) => entry.content);
}

/** Content of a given kind for a locale (EN fallback not applied). */
export function listContentByKind(kind: ContentKind, locale: Locale = 'en'): LocationContent[] {
  return listContent(locale).filter((content) => content.kind === kind);
}

/** Locales with committed content for (kind, slug) — e.g. Berlin city: ['en','de']. */
export function contentLocalesFor(kind: ContentKind, slug: string): Locale[] {
  return CONTENT_FILES.filter((entry) => entry.kind === kind && entry.slug === slug).map(
    (entry) => entry.locale,
  );
}

/** Typed accessors so consumers do not narrow manually. */
export function getCityContent(slug: string, locale: Locale = 'en'): CityContent | undefined {
  return getContent<CityContent>('city', slug, locale);
}

export function getCountryContent(slug: string, locale: Locale = 'en'): CountryContent | undefined {
  return getContent<CountryContent>('country', slug, locale);
}

export function getRegionContent(slug: string, locale: Locale = 'en'): RegionContent | undefined {
  return getContent<RegionContent>('region', slug, locale);
}

export function getGuideContent(slug: string, locale: Locale = 'en'): GuideContent | undefined {
  return getContent<GuideContent>('guide', slug, locale);
}
