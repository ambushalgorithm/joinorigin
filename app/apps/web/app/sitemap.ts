import type { MetadataRoute } from 'next';

import { SUPPORTED_LOCALES, type Locale } from '@joinorigin/i18n';

import {
  GLOSSARY_HUB_PATH,
  GUIDES_RELEASE_DATE,
  guideHubLanguagesFor,
  guideHubPath,
  guideLanguagesFor,
  guidePageEntries,
} from '../lib/seo/guides';
import { indexableLocationEntries } from '../lib/seo/locationPages';
import { languagesFor } from '../lib/seo/locationView';
import { ROUTES, SITE_RELEASE_DATE } from '../lib/seo/routes';
import { absoluteUrl } from '../lib/seo/url';

/**
 * `/sitemap.xml` (arch §3.7, design §9.1) — derived from `ROUTES` + the
 * location registry + the guide registry, so the sitemap can never drift
 * from live pages. The registry (`locationPageEntries().filter(indexable)`)
 * is the same source `generateStaticParams` uses — Tier-3 / failed-gate
 * pages are excluded (D8), and `lastModified` is always deterministic
 * (dataset version date / fixed release dates — never `new Date()`).
 *
 * Sprint 19 (Goal 1 + Q4): every one of the 21 locale surfaces is covered —
 * each page (static routes, location registry, guides, hubs) × every locale
 * is its own indexable URL. All-routes-prefixed (TASK-464 + TASK-466): every
 * URL is emitted at its `/<locale>/...` surface — including EN, which is
 * canonical at `/en/...` (the unprefixed `/**` tree 307-redirects at the
 * proxy and is never emitted here). Every URL carries the full hreflang
 * cluster via `alternates.languages` with `x-default` → EN canonical
 * (`/en/...`): EN pages list every locale that has a live `/<locale>/...`
 * counterpart, and a non-EN page lists its own locale self + `en` +
 * `x-default` (the same helpers the pages' metadata use — phase B,
 * design §7.2/§9.1).
 *
 * `/llms.txt` and `/docs/*.md` are not HTML pages and intentionally stay out
 * of the sitemap (discovery §8.5) — they are discovered via llms.txt /
 * alternate links.
 */
const LOCATION_CHANGE_FREQUENCY: Record<
  'hub' | 'country' | 'region' | 'city' | 'variant' | 'ideas',
  'weekly' | 'monthly'
> = {
  hub: 'weekly',
  country: 'monthly',
  region: 'monthly',
  city: 'monthly',
  variant: 'monthly',
  ideas: 'monthly',
};

/** Static route sitemap spec — the `ROUTES` list plus the glossary hub,
 *  carrying the existing values (home weekly/1.0, menu monthly/0.8, legal
 *  monthly/0.3, glossary weekly/0.6) and a deterministic lastmod source. */
interface StaticRouteSpec {
  path: string;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
  lastModified: string;
}

const STATIC_ROUTES: StaticRouteSpec[] = [
  ...ROUTES.map(({ path, changeFrequency, priority }) => ({
    path,
    changeFrequency,
    priority,
    lastModified: SITE_RELEASE_DATE,
  })),
  {
    path: GLOSSARY_HUB_PATH,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
    lastModified: GUIDES_RELEASE_DATE,
  },
];

/** Path of a static route on a locale surface — home `/<locale>`, others
 *  `/<locale>/<route>`; EN canonical surfaces are `/en/...` (all-prefixed,
 *  TASK-466 — the unprefixed `/**` tree 307-redirects). */
function staticPath(locale: Locale, path: string): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/**
 * `alternates.languages` for a static route. An EN page lists every locale
 * (all `/<locale>` wrappers are live generated routes) with `en` +
 * `x-default` → `/en/...`; a non-EN page lists its locale self + `en` +
 * `x-default` → EN canonical at `/en/...` — the same shape the guide/location
 * helpers emit.
 */
function staticLanguagesFor(locale: Locale, path: string): Record<string, string> {
  const enUrl = absoluteUrl(staticPath('en', path));
  if (locale !== 'en') {
    return {
      [locale]: absoluteUrl(staticPath(locale, path)),
      en: enUrl,
      'x-default': enUrl,
    };
  }
  const languages: Record<string, string> = {
    en: enUrl,
    'x-default': enUrl,
  };
  for (const other of SUPPORTED_LOCALES) {
    if (other === 'en') continue;
    languages[other] = absoluteUrl(staticPath(other, path));
  }
  return languages;
}

/**
 * Every indexable page of ONE locale surface — static routes, the location
 * registry (`indexableLocationEntries(locale)`), guide pages
 * (`guidePageEntries(locale)`), and the guides hub — each as its own
 * indexable URL with the full hreflang cluster and a deterministic
 * `lastModified`. Every locale (incl. EN, canonical at `/en/**`) contributes
 * its `/<locale>/...` URLs (committed content only for non-EN — phase A,
 * design §7.1).
 */
function localeSurfaceEntries(locale: Locale): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    entries.push({
      url: absoluteUrl(staticPath(locale, route.path)),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: staticLanguagesFor(locale, route.path) },
    });
  }

  for (const entry of indexableLocationEntries(locale)) {
    const languages = languagesFor(entry);
    entries.push({
      url: absoluteUrl(entry.path),
      lastModified: entry.lastModified,
      changeFrequency: LOCATION_CHANGE_FREQUENCY[entry.kind],
      priority: entry.priority,
      ...(languages ? { alternates: { languages } } : {}),
    });
  }

  for (const entry of guidePageEntries(locale)) {
    const languages = guideLanguagesFor(entry.slug, locale);
    entries.push({
      url: absoluteUrl(entry.path),
      lastModified: entry.lastModified,
      changeFrequency: 'monthly' as const,
      priority: entry.priority,
      ...(languages ? { alternates: { languages } } : {}),
    });
  }

  const hubLanguages = guideHubLanguagesFor(locale);
  entries.push({
    url: absoluteUrl(guideHubPath(locale)),
    lastModified: GUIDES_RELEASE_DATE,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    ...(hubLanguages ? { alternates: { languages: hubLanguages } } : {}),
  });

  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return SUPPORTED_LOCALES.flatMap((locale) => localeSurfaceEntries(locale));
}
