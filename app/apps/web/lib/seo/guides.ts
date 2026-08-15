/**
 * Guide-page registry — single source of truth for every `/guides` and
 * `/glossary` URL (design §6.2/§6.3, §8.4).
 *
 * `guidePageEntries()` derives the complete guide set from the committed
 * content files (TASK-309 authored). Every entry carries the URL segments,
 * canonical path, title/description, a deterministic `lastModified` (fixed
 * release date — never `new Date()`), sitemap priority, and the cross-link
 * mesh: hub + sibling guides + flagship city pages (design §8.5).
 *
 * Consumers: `app/guides/page.tsx` (hub), `app/guides/[slug]/page.tsx`
 * (guide pages), and later `app/sitemap.ts` / `lib/seo/llms.ts`
 * (fe-sitemap-llms, TASK-311).
 *
 * No i18n locale JSONs are touched — body copy lives in content files
 * (localization R2/R5).
 */

import type { Locale } from '@joinorigin/i18n';

import { getGuideContent } from './content';
import type { GuideContent } from './content/types';
import { FLAGSHIP_CITIES } from './locationData';

/** Guide hub path (L2a — design §4.1). */
export const GUIDES_HUB_PATH = '/guides';

/** Glossary hub path (L2b — design §4.1; term pages deferred in Sprint 12). */
export const GLOSSARY_HUB_PATH = '/glossary';

/** Deterministic `lastModified` for guide entries (design §9.1). */
export const GUIDES_RELEASE_DATE = '2026-08-14';

/** The 12 L1 how-to guides in display order (design §6.1). */
export const GUIDE_SLUGS = [
  'start-a-community',
  'find-a-co-founder',
  'first-10-members',
  'keep-a-community-active',
  'hybrid-communities',
  'organize-a-meetup',
  'moderation',
  // TASK-353 — 5 new L1 guides appended after the original 7 (user order
  // of the existing guides is preserved unchanged).
  'publish-an-idea',
  'create-a-project',
  'create-a-group',
  'publish-a-small-business-idea',
  'publish-a-startup-concept',
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export interface GuidePageEntry {
  /** Dynamic segment value for `app/guides/[slug]/page.tsx`. */
  params: { slug: string };
  /** Canonical path, e.g. '/guides/start-a-community'. */
  path: string;
  /** Guide slug. */
  slug: string;
  title: string;
  description: string;
  /** Deterministic `lastmod` source (fixed release date — §9.1). */
  lastModified: string;
  /** Sitemap priority. */
  priority: number;
  /** Sibling guide slugs for the cross-link mesh (design §8.5). */
  related: string[];
  /** Flagship city page links (guides link back to flagships). */
  cities: Array<{ name: string; path: string }>;
}

function guidePath(slug: string): string {
  return `${GUIDES_HUB_PATH}/${slug}`;
}

/** Default title when a guide file does not override it. */
function defaultTitle(slug: string): string {
  const human = slug.replace(/-/g, ' ');
  return `How to ${human.charAt(0).toUpperCase()}${human.slice(1)} | JoinOrigin`;
}

/** Flagship city cross-links — the published city-page surface (MVP). */
function flagshipCityLinks(): GuidePageEntry['cities'] {
  return FLAGSHIP_CITIES.map((flagship) => ({
    name: flagship.displayName,
    path: `/location/${flagship.countrySlug}/${flagship.regionSlug}/${flagship.slug}`,
  }));
}

/** Sibling guide slugs (all others) in display order. */
function relatedSlugs(slug: string): string[] {
  return GUIDE_SLUGS.filter((candidate) => candidate !== slug);
}

/**
 * Derive the complete guide-page registry (deterministic).
 * Every guide in `GUIDE_SLUGS` must have committed EN content — a missing
 * file throws so the registry can never drift from the authored set.
 */
export function guidePageEntries(): GuidePageEntry[] {
  const cities = flagshipCityLinks();
  return GUIDE_SLUGS.map((slug) => {
    const content = getGuideContent(slug, 'en');
    if (!content) {
      throw new Error(`[guides] missing committed content for guide "${slug}"`);
    }
    return {
      params: { slug },
      path: guidePath(slug),
      slug,
      title: content.title ?? defaultTitle(slug),
      description:
        content.description ?? 'Practical, evergreen steps for building and running communities.',
      lastModified: GUIDES_RELEASE_DATE,
      priority: 0.7,
      related: relatedSlugs(slug),
      cities,
    };
  });
}

/** Single guide entry (undefined for unknown slugs → `notFound()`). */
export function guidePageEntry(slug: string): GuidePageEntry | undefined {
  return guidePageEntries().find((entry) => entry.slug === slug);
}

/** All guide content files (typed access for pages). */
export function listGuides(locale: Locale = 'en'): GuideContent[] {
  return GUIDE_SLUGS.map((slug) => getGuideContent(slug, locale)).filter(
    (content): content is GuideContent => content !== undefined,
  );
}
