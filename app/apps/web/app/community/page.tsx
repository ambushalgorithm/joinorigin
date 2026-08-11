import type { Metadata } from 'next';

import { JsonLd } from '../../lib/menuPages/JsonLd';
import { breadcrumbList, faqPage } from '../../lib/menuPages/jsonLd';
import { createMetadata } from '../../lib/menuPages/metadata';
import { COMMUNITY_FAQ } from './community-data';
import { CommunityView } from './community-view';

/**
 * Community page (discovery §5.3) — server wrapper exporting page metadata +
 * server-rendered JSON-LD (`BreadcrumbList` + `FAQPage`). FAQ answers are
 * defined in the view module and mirrored 1:1 in the JSON-LD.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community — Find Your People & Build Together | JoinOrigin',
  description:
    'Join a growing social collaboration network of 2,400+ builders. Discover communities around AI, startups, trading, real estate, and local interests — and build with people who share your goals.',
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
      <JsonLd data={faqPage(COMMUNITY_FAQ)} />
    </>
  );
}
