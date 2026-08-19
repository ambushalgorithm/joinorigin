import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { CommunityView } from '../../community/community-view';

/**
 * `/ko/community` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/community/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ko/community' })`, breadcrumb `Home` → `/ko`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458): title/description/OG
 * stay on the EN copy (no translated static-page content exists), while
 * canonical + hreflang stay per-locale — canonical
 * `/ko/community` and `alternates.languages` `ko` +
 * `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community — Find Your People & Build Together | JoinOrigin',
  description:
    "Join Origin's social collaboration network of 2,400+ builders. Start or join a community around any idea — a small business, an AI startup, a book club.",
  path: '/ko/community',
  locale: 'ko',
  keywords: [
    'online communities',
    'join a community',
    'communities for founders',
    'community for AI builders',
    'find your community',
    'social network for builders',
  ],
});

export default function KoCommunityPage() {
  return (
    <>
      <CommunityView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ko' },
          { name: 'Community', path: '/ko/community' },
        ])}
      />
    </>
  );
}
