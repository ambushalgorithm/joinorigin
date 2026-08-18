import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { FeaturesView } from '../../features/features-view';

/**
 * `/ar/features` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/features/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ar/features' })`, breadcrumb `Home` → `/ar`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
  description:
    "Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — a social collaboration network for real outcomes.",
  path: '/ar/features',
  keywords: [
    'community platform features',
    'collaboration network',
    'community chat',
    'community feed',
    'online community platform',
    'project collaboration platform',
    'community building platform',
  ],
});

export default function ArFeaturesPage() {
  return (
    <>
      <FeaturesView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ar' },
          { name: 'Features', path: '/ar/features' },
        ])}
      />
    </>
  );
}
