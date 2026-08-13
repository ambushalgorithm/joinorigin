import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { CommunityView } from './community-view';

/**
 * Community page (discovery §5.3) — server wrapper exporting page metadata +
 * server-rendered `BreadcrumbList` JSON-LD. The FAQPage JSON-LD is rendered
 * by the view from the active locale dictionary (arch-i18n §7.4), mirrored
 * 1:1 with the visible FAQ block in the initial SSR HTML.
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
      <CommunityView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Community', path: '/community' },
        ])}
      />
    </>
  );
}
