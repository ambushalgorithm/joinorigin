import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { CommunityView } from '../../community/community-view';

/**
 * `/hi/community` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/community/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/hi/community' })`, breadcrumb `Home` → `/hi`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community — Find Your People & Build Together | JoinOrigin',
  description:
    "Join Origin's social collaboration network of 2,400+ builders. Start or join a community around any idea — a small business, an AI startup, a book club.",
  path: '/hi/community',
  keywords: [
    'online communities',
    'join a community',
    'communities for founders',
    'community for AI builders',
    'find your community',
    'social network for builders',
  ],
});

export default function HiCommunityPage() {
  return (
    <>
      <CommunityView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/hi' },
          { name: 'Community', path: '/hi/community' },
        ])}
      />
    </>
  );
}
