import type { MetadataRoute } from 'next';

import {
  GLOSSARY_HUB_PATH,
  GUIDES_HUB_PATH,
  GUIDES_RELEASE_DATE,
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
 * Berlin `de` pages (`/de/location/germany/berlin/...`) are listed as their
 * own indexable URLs and every Berlin page carries the full hreflang cluster
 * via `alternates.languages` (en + de + `x-default` → EN canonical) — the
 * same helper the pages' metadata uses (phase B, design §7.2/§9.1).
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

export default function sitemap(): MetadataRoute.Sitemap {
  const routeEntries = ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: SITE_RELEASE_DATE,
    changeFrequency,
    priority,
  }));

  // EN canonical location surface — exactly the indexable pages. Berlin EN
  // pages carry alternates.languages (en + de + x-default → EN); EN-only
  // pages emit no cluster (phase A).
  const locationEntries = indexableLocationEntries().map((entry) => {
    const languages = languagesFor(entry);
    return {
      url: absoluteUrl(entry.path),
      lastModified: entry.lastModified,
      changeFrequency: LOCATION_CHANGE_FREQUENCY[entry.kind],
      priority: entry.priority,
      ...(languages ? { alternates: { languages } } : {}),
    };
  });

  // Berlin `de` surface — the 7 translated pages as their own indexable
  // URLs, each with the full hreflang cluster (de + en + x-default → EN).
  const deEntries = indexableLocationEntries('de').map((entry) => {
    const languages = languagesFor(entry);
    return {
      url: absoluteUrl(entry.path),
      lastModified: entry.lastModified,
      changeFrequency: LOCATION_CHANGE_FREQUENCY[entry.kind],
      priority: entry.priority,
      alternates: { languages: (languages ?? {}) as Record<string, string> },
    };
  });

  const guideEntries = guidePageEntries().map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: entry.lastModified,
    changeFrequency: 'monthly' as const,
    priority: entry.priority,
  }));

  const hubEntries = [
    {
      url: absoluteUrl(GUIDES_HUB_PATH),
      lastModified: GUIDES_RELEASE_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl(GLOSSARY_HUB_PATH),
      lastModified: GUIDES_RELEASE_DATE,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ];

  return [...routeEntries, ...locationEntries, ...deEntries, ...guideEntries, ...hubEntries];
}
