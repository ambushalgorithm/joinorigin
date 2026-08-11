import { SITE } from './site';

/**
 * Build an absolute URL from a site-relative path (arch §3.2).
 *
 * The canonical origin is `SITE.url` — the single source used by canonical
 * links, Open Graph / Twitter cards, sitemap.xml, robots.txt, and JSON-LD.
 * Sitemap URLs and canonical URLs therefore can never disagree.
 */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}
