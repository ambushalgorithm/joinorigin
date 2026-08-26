import type { Metadata } from 'next';

import ChipMarqueeServer from '../../components/ChipMarqueeServer';
import { createMetadata } from '../../lib/seo/metadata';
import { SITE } from '../../lib/seo/site';
import { HomeView } from '../home-view';

/**
 * `/zh-CN` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/zh-CN' })`, breadcrumb `Home` → `/zh-CN`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/zh-CN` and `alternates.languages` `zh-CN` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'JoinOrigin — Social Collaboration Network & Community OS',
  description: SITE.description,
  path: '/zh-CN',
  locale: 'zh-CN',
  keywords: [
    'social collaboration network',
    'community OS',
    'community operating system',
    'collaboration platform',
    'community collaboration',
  ],
});

export default function ZhCNHomePage() {
  return (
    <>
      <HomeView marquee={<ChipMarqueeServer />} />
    </>
  );
}
