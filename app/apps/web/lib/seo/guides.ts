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
 * Locale-aware surfaces (TASK-421): `guidePageEntries(locale)` /
 * `guidePageEntry(slug, locale)` enumerate the per-locale guide set for the
 * 19/20 non-EN locales, mirroring the per-locale `location` wiring — a non-EN
 * surface lists ONLY guides with committed translated content
 * (`hasContent`, exact — no EN fallback), so untranslated locale-prefixed
 * URLs resolve to `undefined` and routes `notFound()` (localization R5).
 * `guideLanguagesFor` / `guideHubLanguagesFor` emit the complete hreflang
 * cluster (self + EN alternate + `x-default` → EN canonical).
 *
 * Consumers: `app/guides/page.tsx` (hub), `app/guides/[slug]/page.tsx`
 * (EN guide pages), `app/<locale>/guides/**` (per-locale surfaces), and
 * `app/sitemap.ts` / `lib/seo/llms.ts` (fe-sitemap-llms, TASK-311).
 *
 * No i18n locale JSONs are touched — body copy lives in content files
 * (localization R2/R5).
 */

import type { Metadata } from 'next';

import { getDictionary, getT, type Locale } from '@joinorigin/i18n';

import { getGuideContent, hasContent } from './content';
import type { GuideContent } from './content/types';
import type { FaqEntry } from './jsonLd';
import {
  cityDisplayName,
  citySlug,
  contentRichCities,
  countrySlug,
  findCountry,
  findRegion,
  getFlagshipConfig,
  localeCountryCodes,
  regionSlug,
} from './locationData';
import { createMetadata, fullLocaleLanguages } from './metadata';
import { absoluteUrl } from './url';

/** Guide hub path (L2a — design §4.1). */
export const GUIDES_HUB_PATH = '/guides';

/** Glossary hub path (L2b — design §4.1; term pages deferred in Sprint 12). */
export const GLOSSARY_HUB_PATH = '/glossary';

/** Deterministic `lastModified` for guide entries (design §9.1). */
export const GUIDES_RELEASE_DATE = '2026-08-14';

/** The 12 L1 how-to guides in display order (design §6.1). */
export const GUIDE_SLUGS = [
  'publish-an-idea',
  'create-a-project',
  'create-a-group',
  'publish-a-small-business-idea',
  'publish-a-startup-concept',
  'find-a-co-founder',
  'start-a-community',
  'first-10-members',
  'keep-a-community-active',
  'hybrid-communities',
  'organize-a-meetup',
  'moderation',
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

export interface GuidePageEntry {
  /** Dynamic segment value for `app/guides/[slug]/page.tsx`. */
  params: { slug: string };
  /** Canonical path, e.g. '/guides/start-a-community' or '/<locale>/guides/start-a-community'. */
  path: string;
  /** Guide slug. */
  slug: string;
  /** Content locale of this entry — 'en' on the canonical surface. */
  locale: Locale;
  title: string;
  /**
   * Visible H1 — the document title with the `| JoinOrigin` brand suffix
   * stripped (G-9, sprint-24 gap-analysis §6): the `<title>` keeps the
   * suffix, the H1 and hub card titles drop it. Honors the content
   * `heading` override when authored.
   */
  heading: string;
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

/** Hub path for a locale surface — '/en/guides' (EN canonical, TASK-466)
 *  or '/<locale>/guides'. The unprefixed '/guides' tree 307-redirects. */
export function guideHubPath(locale: Locale = 'en'): string {
  return locale === 'en' ? '/en/guides' : `/${locale}${GUIDES_HUB_PATH}`;
}

/** Guide detail path for a locale surface — '/guides/<slug>' or '/<locale>/guides/<slug>'. */
export function guidePath(slug: string, locale: Locale = 'en'): string {
  return `${guideHubPath(locale)}/${slug}`;
}

/** Default title when a guide file does not override it. */
function defaultTitle(slug: string): string {
  const human = slug.replace(/-/g, ' ');
  return `How to ${human.charAt(0).toUpperCase()}${human.slice(1)} | JoinOrigin`;
}

/** The visible H1 for a guide — the document title with the `| JoinOrigin`
 *  brand suffix stripped (G-9). A content `heading` override wins when
 *  authored; otherwise the suffix is removed from the title. */
export function guideHeading(title: string, headingOverride?: string): string {
  if (headingOverride) return headingOverride;
  return title.replace(/\s*\|\s*JoinOrigin\s*$/, '');
}

/**
 * "Start local" city cross-links (TASK-480) — the SAME ordered list as the
 * /location "Flagship cities" section: every content-rich city
 * (tier-irrelevant), the active locale's country/area first, capped at 6.
 * Within the area the cities sort alphabetically by display name. Card
 * hrefs stay UNPREFIXED (`/location/...`) so the client `localizePath`
 * applies the active locale prefix at render time (unlike the hub's
 * server-baked surface paths, the guides view localizes client-side).
 */
function flagshipCityLinks(locale: Locale = 'en', limit = 6): GuidePageEntry['cities'] {
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
      const flagship = getFlagshipConfig(citySlug(city));
      const region = findRegion(city.regionId);
      const country = findCountry(city.countryIso2);
      if (!region || !country) return [];
      const slug = flagship?.slug ?? citySlug(city);
      const regionSeg = flagship?.regionSlug ?? regionSlug(region);
      const countrySeg = flagship?.countrySlug ?? countrySlug(country);
      return [
        {
          name: cityDisplayName(city),
          path: `/location/${countrySeg}/${regionSeg}/${slug}`,
        },
      ];
    });
}

/** Sibling guide slugs (all others) in display order. */
function relatedSlugs(slug: string): string[] {
  return GUIDE_SLUGS.filter((candidate) => candidate !== slug);
}

/**
 * Derive the complete guide-page registry for a locale surface
 * (deterministic).
 *
 * - EN (`default`): every guide in `GUIDE_SLUGS` must have committed EN
 *   content — a missing file throws so the registry can never drift from
 *   the authored set.
 * - non-EN: only guides with committed translated content are enumerated
 *   (`hasContent` exact — no EN fallback), mirroring the per-locale
 *   `location` surface. Untranslated guides never get locale-prefixed URLs
 *   → routes `notFound()` (localization R5).
 */
export function guidePageEntries(locale: Locale = 'en'): GuidePageEntry[] {
  const cities = flagshipCityLinks(locale);
  const slugs =
    locale === 'en'
      ? [...GUIDE_SLUGS]
      : GUIDE_SLUGS.filter((slug) => hasContent('guide', slug, locale));
  return slugs.map((slug) => {
    const content = getGuideContent(slug, locale);
    if (!content) {
      throw new Error(`[guides] missing committed content for guide "${slug}" (locale ${locale})`);
    }
    const title = content.title ?? defaultTitle(slug);
    return {
      params: { slug },
      path: guidePath(slug, locale),
      slug,
      locale,
      title,
      heading: guideHeading(title, content.heading),
      description:
        content.description ?? 'Practical, evergreen steps for building and running communities.',
      lastModified: GUIDES_RELEASE_DATE,
      priority: 0.7,
      related: relatedSlugs(slug),
      cities,
    };
  });
}

/** Single guide entry for a locale surface (undefined for unknown slugs or
 *  untranslated guides → `notFound()`). */
export function guidePageEntry(slug: string, locale: Locale = 'en'): GuidePageEntry | undefined {
  return guidePageEntries(locale).find((entry) => entry.slug === slug);
}

/**
 * Every guide entry for a locale surface with EN fallback (TASK-453) —
 * used by the generated `/<locale>/guides` hubs. Unlike
 * `guidePageEntries(locale)` (which lists ONLY guides with committed
 * translated content), this lists ALL guides; each entry's title and
 * description resolve the active locale's committed content first and the
 * EN content otherwise, matching the EN-fallback contract on every
 * `/<locale>/**` page.
 */
export function guidePageEntriesWithFallback(locale: Locale = 'en'): GuidePageEntry[] {
  const cities = flagshipCityLinks(locale);
  return GUIDE_SLUGS.map((slug) => {
    const content = getGuideContent(slug, locale) ?? getGuideContent(slug, 'en');
    if (!content) {
      throw new Error(`[guides] missing committed content for guide "${slug}" (locale ${locale})`);
    }
    const title = content.title ?? defaultTitle(slug);
    return {
      params: { slug },
      path: guidePath(slug, locale),
      slug,
      locale,
      title,
      heading: guideHeading(title, content.heading),
      description:
        content.description ?? 'Practical, evergreen steps for building and running communities.',
      lastModified: GUIDES_RELEASE_DATE,
      priority: 0.7,
      related: relatedSlugs(slug),
      cities,
    };
  });
}

/**
 * Locale-aware guide page resolution — the shared loader used by both the
 * EN canonical route and the per-locale surfaces. Resolves the active
 * locale's entry + content; returns `undefined` (→ `notFound()`) for
 * unknown slugs and for guides without committed content in the locale.
 */
export function guidePageForLocale(
  slug: string,
  locale: Locale = 'en',
): { entry: GuidePageEntry; content: GuideContent } | undefined {
  const entry = guidePageEntry(slug, locale);
  if (!entry) return undefined;
  const content = getGuideContent(slug, locale);
  if (!content || content.kind !== 'guide') return undefined;
  return { entry, content };
}

/* ------------------------------------------------------------------ *
 * hreflang (per-locale guide surfaces — design §7.2, TASK-421)
 * ------------------------------------------------------------------ */

/**
 * `alternates.languages` for a guide page (G-10, sprint-24 gap-analysis §6):
 * the FULL hreflang cluster matching the sitemap xhtml:link set. A locale
 * surface page lists its locale self + `en` + `x-default` → EN canonical; an
 * EN canonical page lists every `/<locale>/guides/<slug>` counterpart (all
 * 21 locale guide routes are live generated wrappers with EN-fallback
 * content, so the cluster is never omitted).
 */
export function guideLanguagesFor(
  slug: string,
  locale: Locale = 'en',
): Record<string, string> | undefined {
  if (locale !== 'en') {
    return {
      [locale]: absoluteUrl(guidePath(slug, locale)),
      en: absoluteUrl(guidePath(slug, 'en')),
      'x-default': absoluteUrl(guidePath(slug, 'en')),
    };
  }
  return {
    ...fullLocaleLanguages(guidePath(slug, 'en')),
    en: absoluteUrl(guidePath(slug, 'en')),
    'x-default': absoluteUrl(guidePath(slug, 'en')),
  };
}

/** `alternates.languages` for a guide hub page (same hreflang rules as
 *  `guideLanguagesFor`; the EN hub lists every `/<locale>/guides` surface). */
export function guideHubLanguagesFor(locale: Locale = 'en'): Record<string, string> | undefined {
  if (locale !== 'en') {
    return {
      [locale]: absoluteUrl(guideHubPath(locale)),
      en: absoluteUrl(guideHubPath('en')),
      'x-default': absoluteUrl(guideHubPath('en')),
    };
  }
  return {
    ...fullLocaleLanguages(guideHubPath('en')),
    en: absoluteUrl(guideHubPath('en')),
    'x-default': absoluteUrl(guideHubPath('en')),
  };
}

/** Per-page metadata for a guide entry: canonical + OG/Twitter via the
 *  shared `createMetadata`, plus the full hreflang cluster when the locale
 *  surface has translations.
 *
 *  Locale-aware (TASK-458): `surfaceLocale` is the URL surface the page is
 *  served on (the generated `/<locale>/guides/[slug]` wrapper passes the
 *  active locale; it defaults to the entry's own locale for canonical EN
 *  consumers). When a non-EN surface renders EN-fallback content
 *  (`entry.locale === 'en'`), canonical + hreflang still point at the
 *  per-locale URL `/<locale>/guides/<slug>` with `x-default` → EN canonical,
 *  while the title/description/OG stay on the entry's (EN) copy. */
export function guidePageMetadata(
  entry: GuidePageEntry,
  surfaceLocale: Locale = entry.locale,
): Metadata {
  const surfacePath =
    surfaceLocale !== 'en' && entry.locale === 'en'
      ? guidePath(entry.slug, surfaceLocale)
      : entry.path;
  const meta = createMetadata({
    title: entry.title,
    description: entry.description,
    path: surfacePath,
    keywords: [entry.slug.replace(/-/g, ' '), 'community', 'how to', 'guide'],
  });
  const languages = guideLanguagesFor(entry.slug, surfaceLocale);
  if (!languages) return meta;
  return {
    ...meta,
    alternates: {
      canonical: meta.alternates?.canonical,
      languages,
    },
  };
}

/** Hub metadata for a locale surface (SEO metadata stays EN per arch-i18n
 *  §1.2; the visible chrome is localized via the active dictionary). */
export function guideHubMetadata(locale: Locale = 'en'): Metadata {
  const meta = createMetadata({
    title: 'Community Building Guides | JoinOrigin',
    description:
      'Community building how-to guides: start a community, organize a meetup, get your first 10 members, find a co-founder, stay active, run hybrid groups, and moderate well.',
    path: guideHubPath(locale),
    keywords: [
      'community building',
      'how to start a community',
      'organize a meetup',
      'community guides',
      'community manager',
    ],
  });
  const languages = guideHubLanguagesFor(locale);
  if (!languages) return meta;
  return {
    ...meta,
    alternates: {
      canonical: meta.alternates?.canonical,
      languages,
    },
  };
}

/** All guide content files (typed access for pages). */
export function listGuides(locale: Locale = 'en'): GuideContent[] {
  return GUIDE_SLUGS.map((slug) => getGuideContent(slug, locale)).filter(
    (content): content is GuideContent => content !== undefined,
  );
}

/**
 * The `/guides` hub FAQ (G-12, sprint-24 gap-analysis §6) — the generic
 * platform FAQ (the same translated `home.faq.*` keys the homepage renders,
 * resolved per-locale with EN fallback) so the hub carries a visible FAQ
 * block mirrored 1:1 in `FAQPage` JSON-LD. No new dictionary keys are
 * introduced — the keys already exist in all 21 locale files.
 */
export function guideHubFaq(locale: Locale = 'en'): FaqEntry[] {
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
