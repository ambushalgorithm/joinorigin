import type { MetadataRoute } from 'next';

import { ROUTES, SITE_RELEASE_DATE } from '../lib/seo/routes';
import { absoluteUrl } from '../lib/seo/url';

/**
 * `/sitemap.xml` (arch §3.7) — generated from `ROUTES`, the single source
 * of truth for every public HTML page, so the sitemap can never drift from
 * the nav. `lastModified` is pinned to the sprint release date so the output
 * is deterministic for e2e assertions.
 *
 * `/llms.txt` and `/docs/*.md` are not HTML pages and intentionally stay out
 * of the sitemap (discovery §8.5) — they are discovered via llms.txt /
 * alternate links.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: SITE_RELEASE_DATE,
    changeFrequency,
    priority,
  }));
}
