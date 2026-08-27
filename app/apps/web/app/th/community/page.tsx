import type { Metadata } from 'next';

import ChipMarqueeServer from '../../../components/ChipMarqueeServer';
import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { CommunityView } from '../../community/community-view';

/**
 * `/th/community` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/community/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/th/community' })`, breadcrumb `Home` → `/th`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/th/community` and `alternates.languages` `th` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community — Find Your People & Build Together | JoinOrigin',
  description:
    "Join Origin's network of 2,400+ builders. Start or join an Origin around any idea — a small business, an AI startup, a book club — and find the people to move it forward.",
  path: '/th/community',
  locale: 'th',
  keywords: [
    'online communities',
    'join a community',
    'communities for founders',
    'community for AI builders',
    'find your community',
    'social network for builders',
  ],
});

export default function ThCommunityPage() {
  return (
    <>
      <CommunityView marquee={<ChipMarqueeServer />} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/th' },
          { name: 'Community', path: '/th/community' },
        ])}
      />
    </>
  );
}
