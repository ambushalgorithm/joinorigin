/**
 * Site-wide constants for the JoinOrigin web app (arch §3.2).
 *
 * Single source for the canonical origin, brand name, default description,
 * Twitter handle, and the default Open Graph image. Every absolute URL in
 * canonical links, Open Graph / Twitter cards, sitemap.xml, robots.txt,
 * llms.txt, and JSON-LD derives from `SITE.url` through `absoluteUrl()` in
 * `./url`, so the origin is defined exactly once.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §3.2.
 */
export const SITE = {
  name: 'JoinOrigin',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3100',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'joinorigin.co',
  description:
    'Origin is the space you start around a goal — gather the people and resources you need, and move it forward. JoinOrigin is the network behind it.',
  twitterHandle: '@joinorigin', // update if a real handle is provisioned
  /** Local OG image (1200×630, branded) — no external image hosts (repo rule). */
  ogImage: '/assets/og/og-default.png',
  /** Brand background (`@joinorigin/design` colors.background) — used for theme-color. */
  themeColor: '#0A1022',
} as const;

/**
 * Real social profile URLs for the brand (G-7, sprint-24 gap-analysis).
 *
 * Populate with the provisioned X / GitHub / LinkedIn / YouTube profile URLs
 * when they exist. The `Organization.sameAs` JSON-LD property is emitted
 * ONLY when this array is non-empty (an empty `sameAs` array is an
 * unfinished-template signal to crawlers), so until profiles exist the
 * property is omitted from the structured data entirely.
 */
export const SOCIAL_PROFILES: readonly string[] = [];
