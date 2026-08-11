import type { Metadata } from 'next';

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
}

/**
 * Per-page metadata builder (arch §3.3): canonical = absolute page URL,
 * Open Graph + Twitter card with a 1200×630 image, robots index/follow.
 *
 * New menu pages export `metadata` through this helper (server wrapper
 * pattern); the root layout supplies site-wide defaults and `metadataBase`
 * so the absolute URLs here resolve consistently.
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
