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
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'joinorigin.com',
  description:
    'Origin is a social collaboration network — the community OS where your ideas, projects, and communities come together in one organized space.',
  twitterHandle: '@joinorigin', // update if a real handle is provisioned
  /** Local OG image (1200×630, branded) — no external image hosts (repo rule). */
  ogImage: '/assets/og/og-default.png',
  /** Brand background (`@joinorigin/design` colors.background) — used for theme-color. */
  themeColor: '#0A1022',
} as const;
