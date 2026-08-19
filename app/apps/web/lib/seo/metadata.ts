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

/** The per-locale surface path — prefixes an EN route when the locale is
 *  non-EN and the path is not already on that surface. */
function surfacePathFor(path: string, locale?: Locale): string {
  if (!locale || locale === 'en') return path;
  if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return path;
  return `/${locale}${path}`;
}

/** The EN counterpart path — strips the active locale prefix. */
function enPathFor(surfacePath: string, locale?: Locale): string {
  if (!locale || locale === 'en') return surfacePath;
  if (surfacePath === `/${locale}`) return '/';
  if (surfacePath.startsWith(`/${locale}/`)) return surfacePath.slice(locale.length + 1);
  return surfacePath;
}

/** Locale-derived hreflang for a non-EN surface: self + EN + `x-default` →
 *  EN canonical. EN surfaces carry no cluster here (their callers add the
 *  full translated-locale set explicitly). */
function localeLanguages(
  locale: Locale | undefined,
  surfacePath: string,
  enPath: string,
): Record<string, string> | undefined {
  if (!locale || locale === 'en') return undefined;
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
 * Locale-aware (TASK-458): when `locale` is a non-EN surface, canonical and
 * hreflang stay per-locale (`/<locale>/...`) with `x-default` → EN canonical
 * while title/description/OG pass through — the caller applies the
 * per-locale-with-EN-fallback rule for the copy.
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
 * Rewrite EN-canonical metadata onto a non-EN locale surface — canonical and
 * hreflang point at `/<locale>/...` (`x-default` → EN canonical) while every
 * other field (title/description/OG/Twitter/robots) passes through unchanged.
 * This is the EN-fallback arm of the per-locale metadata contract (TASK-458):
 * generated `/<locale>/**` wrappers whose content has no committed translation
 * keep the EN copy but stay canonical on their own locale URL. `enPath` is the
 * page's EN route (e.g. '/location/germany/berlin'); for the EN surface the
 * metadata is returned untouched.
 */
export function localizeMetadata(meta: Metadata, locale: Locale, enPath: string): Metadata {
  if (locale === 'en') return meta;
  const surfacePath = enPath === '/' ? `/${locale}` : `/${locale}${enPath}`;
  const enUrl = absoluteUrl(enPath);
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
