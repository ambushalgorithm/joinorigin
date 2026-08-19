import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { FeaturesView } from '../../features/features-view';

/**
 * `/fa/features` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/features/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/fa/features' })`, breadcrumb `Home` → `/fa`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458): title/description/OG
 * stay on the EN copy (no translated static-page content exists), while
 * canonical + hreflang stay per-locale — canonical
 * `/fa/features` and `alternates.languages` `fa` +
 * `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
  description:
    "Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — a social collaboration network for real outcomes.",
  path: '/fa/features',
  locale: 'fa',
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

export default function FaFeaturesPage() {
  return (
    <>
      <FeaturesView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/fa' },
          { name: 'Features', path: '/fa/features' },
        ])}
      />
    </>
  );
}
