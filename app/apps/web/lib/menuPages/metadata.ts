import type { Metadata } from 'next';

/**
 * Local metadata helpers for the Sprint 4 menu pages (TASK-215).
 *
 * This mirrors the shared SEO pattern from
 * `app/docs/design/sprint-4-seo-arch.md` §3.2–3.4 so each page exports its
 * metadata through the same `createMetadata` contract:
 * canonical, Open Graph, Twitter card, robots, and keywords. fe-seo
 * (TASK-216) owns the canonical `apps/web/lib/seo/**` implementation; these
 * stubs keep the menu pages self-contained until `lib/seo` merges, after
 * which the imports can be switched to `lib/seo/metadata` unchanged.
 */

export const SITE = {
  name: 'JoinOrigin',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3100',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'joinorigin.com',
  description:
    'JoinOrigin is a social collaboration network — a community OS that brings your people, communities, projects, and conversations into one calm workspace.',
  twitterHandle: '@joinorigin',
  // Existing local brand asset; fe-seo replaces with /assets/og/og-default.png.
  ogImage: '/assets/logo/joinorigin-logo.svg',
} as const;

/** Absolute URL for a path, based on the single SITE origin (arch §3.2). */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}

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
}

/**
 * Per-page metadata builder (arch §3.3): canonical = absolute page URL,
 * Open Graph + Twitter card with a 1200×630 image, robots index/follow.
 */
export function createMetadata(input: CreateMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  const imageUrl = absoluteUrl(input.image ?? SITE.ogImage);
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
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
