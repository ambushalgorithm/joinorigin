import type { Metadata } from 'next';

import ChipMarqueeServer from '../../components/ChipMarqueeServer';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { NetworkView } from './network-view';

/**
 * Network page (discovery §5.3) — server wrapper exporting page metadata +
 * server-rendered `BreadcrumbList` JSON-LD. The FAQPage JSON-LD is rendered
 * by the view from the active locale dictionary (arch-i18n §7.4), mirrored
 * 1:1 with the visible FAQ block in the initial SSR HTML.
 *
 * Story B (TASK-547): the "Example Origins" marquee is server-rendered
 * here by `ChipMarqueeServer` (geo + active locale from `next/headers`) and
 * passed into the client view through its `marquee` slot — so the 12 MB geo
 * snapshot never reaches the client bundle.
 */
export const metadata: Metadata = createMetadata({
  title: 'Network — Find Your People & Build Together | JoinOrigin',
  description:
    "Join Origin's network of 2,400+ builders. Start or join an Origin around any idea — a small business, an AI startup, a book club — and find the people to move it forward.",
  path: '/network',
  keywords: [
    'network of builders',
    'join the network',
    'network for founders',
    'network for AI builders',
    'find your network',
    'social network for builders',
  ],
});

export default function NetworkPage() {
  return (
    <>
      <NetworkView marquee={<ChipMarqueeServer />} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Network', path: '/network' },
        ])}
      />
    </>
  );
}
