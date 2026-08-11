/**
 * Single source of truth for every public HTML route (arch §3.2).
 *
 * `sitemap.ts`, the header/footer nav (fe-menu-pages reads the same list),
 * and metadata builders all derive from `ROUTES` — a page added here is
 * automatically in the sitemap and canonical links. **No duplicated URL
 * lists.** The set reflects `sprint-4-discovery.md` §4 (9 HTML pages).
 *
 * `title`/`description` are the discovery §5 per-page values (used by
 * sitemap.xml and llms.txt). Per-page metadata itself lives in each page's
 * server wrapper (fe-menu-pages); this module only drives URL-derived
 * outputs.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §3.2 + §3.7.
 */
export interface SiteRoute {
  /** Route path (lowercase kebab-case, no trailing slash). */
  path: string;
  /** Page title (discovery §5). */
  title: string;
  /** One-line description (discovery §5). */
  description: string;
  /** Sitemap changeFrequency (home weekly, subpages monthly). */
  changeFrequency: 'weekly' | 'monthly';
  /** Sitemap priority (home 1, menu pages 0.8, legal 0.3). */
  priority: number;
}

export const ROUTES: readonly SiteRoute[] = [
  {
    path: '/',
    title: 'JoinOrigin — Social Collaboration Network & Community OS',
    description:
      'JoinOrigin is a social collaboration network where people discover each other, form communities, start projects, and build companies together. Join 2,400+ builders on the waitlist.',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    path: '/features',
    title: 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
    description:
      "Explore JoinOrigin's features: communities, real-time chat, feed, projects, companies, and opportunities — the social collaboration network built to turn relationships into outcomes.",
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/community',
    title: 'Community — Find Your People & Build Together | JoinOrigin',
    description:
      'Join a growing social collaboration network of 2,400+ builders. Discover communities around AI, startups, trading, real estate, and local interests.',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/pricing',
    title: 'Pricing — Free During Early Access | JoinOrigin',
    description:
      'JoinOrigin is free during early access. Reserve your spot on the waitlist, then choose the plan that fits your community when we launch.',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/docs',
    title: 'Docs — Concepts, Roadmap & Architecture | JoinOrigin',
    description:
      'Learn how JoinOrigin works: profiles, communities, chat, feed, projects, companies, and opportunities. Explore the roadmap, tech stack, and open standards.',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/about',
    title: 'About — The Operating System for Human Collaboration | JoinOrigin',
    description:
      "JoinOrigin's mission: a social collaboration network where people discover each other, form communities, and build projects and companies together.",
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/contact',
    title: 'Contact — Talk to the JoinOrigin Team | JoinOrigin',
    description:
      'Questions about JoinOrigin, early access, or starting a community? Contact the team — we reply within 2 business days.',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | JoinOrigin',
    description: 'JoinOrigin privacy policy — what we collect and how your data is handled.',
    changeFrequency: 'monthly',
    priority: 0.3,
  },
  {
    path: '/terms',
    title: 'Terms of Service | JoinOrigin',
    description: 'JoinOrigin terms of service — plain-English terms for using the platform.',
    changeFrequency: 'monthly',
    priority: 0.3,
  },
] as const;

/** Static release date used for `lastmod` so sitemap output is deterministic. */
export const SITE_RELEASE_DATE = '2026-08-10';
