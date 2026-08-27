import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { DocsView } from '../../docs/docs-view';

/**
 * `/zh-TW/docs` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/docs/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/zh-TW/docs' })`, breadcrumb `Home` → `/zh-TW`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/zh-TW/docs` and `alternates.languages` `zh-TW` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Docs — Concepts, Roadmap & Architecture | JoinOrigin',
  description:
    'Learn how Origin works: profiles, ideas, Origins, chat, feed, projects, and opportunities. Explore the roadmap, tech stack, and open Matrix standards.',
  path: '/zh-TW/docs',
  locale: 'zh-TW',
  keywords: [
    'JoinOrigin docs',
    'Origin docs',
    'how JoinOrigin works',
    'community platform documentation',
    'Matrix community platform',
    'open source community platform',
    'collaboration network architecture',
  ],
});

export default function ZhTWDocsPage() {
  return (
    <>
      <DocsView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/zh-TW' },
          { name: 'Docs', path: '/zh-TW/docs' },
        ])}
      />
    </>
  );
}
