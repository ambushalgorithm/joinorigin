import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { DocsView } from './docs-view';

/**
 * Docs page (discovery §5.5) — server wrapper exporting page metadata +
 * server-rendered `BreadcrumbList` JSON-LD. This is the LLM-first
 * documentation hub: concepts, roadmap, architecture, and FAQ. The FAQPage
 * JSON-LD is rendered by the view from the active locale dictionary
 * (arch-i18n §7.4), mirrored 1:1 with the visible FAQ block in the initial
 * SSR HTML.
 */
export const metadata: Metadata = createMetadata({
  title: 'Docs — Concepts, Roadmap & Architecture | JoinOrigin',
  description:
    'Learn how Origin works: profiles, ideas, communities, chat, projects, and opportunities. Explore the roadmap, tech stack, Matrix standards, and FAQ.',
  path: '/docs',
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

export default function DocsPage() {
  return (
    <>
      <DocsView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Docs', path: '/docs' },
        ])}
      />
    </>
  );
}
