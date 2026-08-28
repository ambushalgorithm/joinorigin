import type { Metadata } from 'next';

import ChipMarqueeServer from '../../../components/ChipMarqueeServer';
import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { NetworkView } from '../../network/network-view';

/**
 * `/ja/network` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/network/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ja/network' })`, breadcrumb `Home` → `/ja`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/ja/network` and `alternates.languages` `ja` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Network — Find Your People & Build Together | JoinOrigin',
  description:
    "Join Origin's network of 2,400+ builders. Start or join an Origin around any idea — a small business, an AI startup, a book club — and find the people to move it forward.",
  path: '/ja/network',
  locale: 'ja',
  keywords: [
    'network of builders',
    'join the network',
    'network for founders',
    'network for AI builders',
    'find your network',
    'social network for builders',
  ],
});

export default function JaNetworkPage() {
  return (
    <>
      <NetworkView marquee={<ChipMarqueeServer />} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ja' },
          { name: 'Network', path: '/ja/network' },
        ])}
      />
    </>
  );
}
