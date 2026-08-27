import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { FeaturesView } from '../../features/features-view';

/**
 * `/ja/features` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/features/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ja/features' })`, breadcrumb `Home` → `/ja`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/ja/features` and `alternates.languages` `ja` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Features — Origins, Chat, Projects & Opportunities | JoinOrigin',
  description:
    "Explore Origin's features: profiles, ideas, Origins, chat, feed, projects, and opportunities — one space where every idea finds the people and resources to move forward.",
  path: '/ja/features',
  locale: 'ja',
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

export default function JaFeaturesPage() {
  return (
    <>
      <FeaturesView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ja' },
          { name: 'Features', path: '/ja/features' },
        ])}
      />
    </>
  );
}
