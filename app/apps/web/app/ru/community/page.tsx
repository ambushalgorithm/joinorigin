import type { Metadata } from 'next';

import ChipMarqueeServer from '../../../components/ChipMarqueeServer';
import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { CommunityView } from '../../community/community-view';

/**
 * `/ru/community` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/community/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ru/community' })`, breadcrumb `Home` → `/ru`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/ru/community` and `alternates.languages` `ru` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community — Find Your People & Build Together | JoinOrigin',
  description:
    "Join Origin's network of 2,400+ builders. Start or join an Origin around any idea — a small business, an AI startup, a book club — and find the people to move it forward.",
  path: '/ru/community',
  locale: 'ru',
  keywords: [
    'online communities',
    'join a community',
    'communities for founders',
    'community for AI builders',
    'find your community',
    'social network for builders',
  ],
});

export default function RuCommunityPage() {
  return (
    <>
      <CommunityView marquee={<ChipMarqueeServer />} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ru' },
          { name: 'Community', path: '/ru/community' },
        ])}
      />
    </>
  );
}
