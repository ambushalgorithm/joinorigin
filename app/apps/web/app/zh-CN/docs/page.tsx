import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { DocsView } from '../../docs/docs-view';

/**
 * `/zh-CN/docs` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/docs/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/zh-CN/docs' })`, breadcrumb `Home` → `/zh-CN`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'Docs — Concepts, Roadmap & Architecture | JoinOrigin',
  description:
    'Learn how Origin works: profiles, ideas, communities, chat, projects, and opportunities. Explore the roadmap, tech stack, Matrix standards, and FAQ.',
  path: '/zh-CN/docs',
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

export default function ZhCNDocsPage() {
  return (
    <>
      <DocsView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/zh-CN' },
          { name: 'Docs', path: '/zh-CN/docs' },
        ])}
      />
    </>
  );
}
