import type { MetadataRoute } from 'next';

import { absoluteUrl } from '../lib/seo/url';

/**
 * `/robots.txt` (arch §3.8) — allow all user agents (standard crawlers AND
 * LLM crawlers: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.).
 * No crawler is blocked — the Sprint 4 goal is maximum LLM-crawler
 * friendliness. Only the private `/api/` surface is disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
