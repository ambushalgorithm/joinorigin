import type { Metadata } from 'next';

import ChipMarqueeServer from '../components/ChipMarqueeServer';
import { createMetadata } from '../lib/seo/metadata';
import { SITE } from '../lib/seo/site';
import { HomeView } from './home-view';

/**
 * JoinOrigin homescreen — server wrapper (arch §3.3 pattern, matching
 * `app/features/page.tsx`): exports page metadata and renders the client
 * view. The FAQPage JSON-LD is rendered by the view itself from the active
 * locale dictionary (arch-i18n §7.4) — because client components are
 * server-rendered during SSR, the structured data still appears in the
 * initial HTML, mirrored 1:1 with the visible FAQ block.
 *
 * Story B (TASK-547): the "Example communities" marquee is server-rendered
 * here by `ChipMarqueeServer` (geo + active locale from `next/headers`) and
 * passed into the client view through its `marquee` slot — so the 12 MB geo
 * snapshot never reaches the client bundle.
 *
 * The layout still supplies site-wide defaults (Organization/WebSite JSON-LD,
 * icons, metadataBase); this page's metadata overrides the home title/canonical.
 * The description reuses `SITE.description` (152 chars, discovery §6 ≤160 rule
 * and brand/keyword intact — the discovery §5.1 draft is 184 chars and would
 * exceed the limit the e2e description-length check enforces).
 */
export const metadata: Metadata = createMetadata({
  title: 'JoinOrigin — Social Collaboration Network & Community OS',
  description: SITE.description,
  path: '/',
  keywords: [
    'social collaboration network',
    'community OS',
    'community operating system',
    'collaboration platform',
    'community collaboration',
  ],
});

export default function HomePage() {
  return <HomeView marquee={<ChipMarqueeServer />} />;
}
