import type { Metadata } from 'next';

import ChipMarqueeServer from '../../components/ChipMarqueeServer';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { CommunityView } from './community-view';

/**
 * Community page (discovery §5.3) — server wrapper exporting page metadata +
 * server-rendered `BreadcrumbList` JSON-LD. The FAQPage JSON-LD is rendered
 * by the view from the active locale dictionary (arch-i18n §7.4), mirrored
 * 1:1 with the visible FAQ block in the initial SSR HTML.
 *
 * Story B (TASK-547): the "Example communities" marquee is server-rendered
 * here by `ChipMarqueeServer` (geo + active locale from `next/headers`) and
 * passed into the client view through its `marquee` slot — so the 12 MB geo
 * snapshot never reaches the client bundle.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community — Find Your People & Build Together | JoinOrigin',
  description:
    "Join Origin's social collaboration network of 2,400+ builders. Start or join a community around any idea — a small business, an AI startup, a book club.",
  path: '/community',
  keywords: [
    'online communities',
    'join a community',
    'communities for founders',
    'community for AI builders',
    'find your community',
    'social network for builders',
  ],
});

export default function CommunityPage() {
  return (
    <>
      <CommunityView marquee={<ChipMarqueeServer />} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Community', path: '/community' },
        ])}
      />
    </>
  );
}
