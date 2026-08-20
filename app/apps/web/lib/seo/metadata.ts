import type { Metadata } from 'next';

import type { Locale } from '@joinorigin/i18n';

import { SITE } from './site';
import { absoluteUrl } from './url';

export interface CreateMetadataInput {
  /** Exact page title (per sprint-4-discovery.md §5). */
  title: string;
  description: string;
  /** Route path, e.g. '/features' — used for canonical + OG URLs. */
  path: string;
  keywords?: string[];
  /** Defaults to the site OG asset. */
  image?: string;
  type?: 'website' | 'article';
  robots?: { index: boolean; follow: boolean };
  /**
   * Active locale surface. When non-EN, canonical + hreflang stay per-locale:
   * `path` is used as-is when it already carries the `/<locale>` prefix (as
   * the generated `/<locale>/**` wrappers emit), otherwise it is prefixed,
   * and `alternates.languages` lists the surface self + `en` +
   * `x-default` → EN canonical (per-locale-with-EN-fallback, TASK-458).
   * Title/description stay EN here — callers pass the locale's translated
   * values where committed content exists and EN otherwise.
   */
  locale?: Locale;
  /** Explicit hreflang map — overrides the locale-derived alternates. */
  languages?: Record<string, string>;
}

/** The per-locale surface path — prefixes an EN route onto the active
 *  surface for ANY locale, including EN (all-routes-prefixed, TASK-466):
 *  the EN canonical surface is `/en/...` (never unprefixed `/**`, which
 *  307-redirects at the proxy). Paths already on the surface are returned
 *  unchanged. */
function surfacePathFor(path: string, locale?: Locale): string {
  if (!locale) return path;
  if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** The EN counterpart path — `/en/...` for any surface (the unprefixed
 *  `/**` tree is no longer canonical, TASK-466). */
function enPathFor(surfacePath: string, locale?: Locale): string {
  if (!locale || locale === 'en') return surfacePath;
  if (surfacePath === `/${locale}`) return '/en';
  if (surfacePath.startsWith(`/${locale}/`)) return `/en${surfacePath.slice(locale.length + 1)}`;
  return surfacePath;
}

/** Locale-derived hreflang for a surface: non-EN emits self + EN +
 *  `x-default` → EN canonical (`/en/...`); EN emits the EN surface cluster
 *  (`en` + `x-default` → `/en/...`). Callers needing the full 21-locale set
 *  pass an explicit `languages` map (sitemap / guide / location helpers). */
function localeLanguages(
  locale: Locale | undefined,
  surfacePath: string,
  enPath: string,
): Record<string, string> | undefined {
  if (!locale) return undefined;
  if (locale === 'en') {
    return {
      en: absoluteUrl(surfacePath),
      'x-default': absoluteUrl(surfacePath),
    };
  }
  return {
    [locale]: absoluteUrl(surfacePath),
    en: absoluteUrl(enPath),
    'x-default': absoluteUrl(enPath),
  };
}

/**
 * Per-page metadata builder (arch §3.3): canonical = absolute page URL,
 * Open Graph + Twitter card with a 1200×630 image, robots index/follow.
 *
 * New menu pages export `metadata` through this helper (server wrapper
 * pattern); the root layout supplies site-wide defaults and `metadataBase`
 * so the absolute URLs here resolve consistently.
 *
 * Locale-aware (TASK-458 + TASK-466): when `locale` is provided, canonical
 * and hreflang stay per-locale (`/<locale>/...`) with `x-default` → EN
 * canonical at `/en/...` — for non-EN surfaces the EN alternate is the
 * `/en/...` surface (the unprefixed `/**` tree 307-redirects), and for the
 * EN surface itself canonical is `/en/...` with the EN cluster
 * (`en` + `x-default`). Title/description/OG pass through — the caller
 * applies the per-locale-with-EN-fallback rule for the copy.
 */
export function createMetadata(input: CreateMetadataInput): Metadata {
  const surfacePath = surfacePathFor(input.path, input.locale);
  const enPath = enPathFor(surfacePath, input.locale);
  const url = absoluteUrl(surfacePath);
  const imageUrl = absoluteUrl(input.image ?? SITE.ogImage);
  const languages = input.languages ?? localeLanguages(input.locale, surfacePath, enPath);
  const alternates: Metadata['alternates'] = { canonical: url };
  if (languages) alternates.languages = languages;
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates,
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE.name,
      type: input.type ?? 'website',
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [imageUrl],
    },
    robots: input.robots ?? { index: true, follow: true },
  };
}

/**
 * Rewrite EN-canonical metadata onto a locale surface — canonical and
 * hreflang point at `/<locale>/...` (`x-default` → EN canonical at
 * `/en/...`; TASK-466: the unprefixed `/**` tree 307-redirects) while every
 * other field (title/description/OG/Twitter/robots) passes through
 * unchanged. This is the EN-fallback arm of the per-locale metadata contract
 * (TASK-458): generated `/<locale>/**` wrappers whose content has no
 * committed translation keep the EN copy but stay canonical on their own
 * locale URL. For the EN surface itself (`locale === 'en'`) the canonical is
 * rewritten to `/en/...` with the EN cluster (`en` + `x-default` → `/en/...`).
 * `enPath` is the page's EN route (e.g. '/location/germany/berlin'); an
 * already-`/en`-prefixed EN surface path is accepted and kept as-is.
 */
export function localizeMetadata(meta: Metadata, locale: Locale, enPath: string): Metadata {
  const enSurface =
    enPath === '/' || enPath === '/en' ? '/en' : enPath.startsWith('/en') ? enPath : `/en${enPath}`;
  const enUrl = absoluteUrl(enSurface);
  if (locale === 'en') {
    return {
      ...meta,
      alternates: {
        canonical: enUrl,
        languages: {
          en: enUrl,
          'x-default': enUrl,
        },
      },
    };
  }
  const surfacePath =
    enPath === '/' || enPath === '/en'
      ? `/${locale}`
      : enPath.startsWith('/en')
        ? `/${locale}${enPath.slice(3)}`
        : `/${locale}${enPath}`;
  return {
    ...meta,
    alternates: {
      canonical: absoluteUrl(surfacePath),
      languages: {
        [locale]: absoluteUrl(surfacePath),
        en: enUrl,
        'x-default': enUrl,
      },
    },
  };
}
