import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLd';
import { breadcrumbList, faqPage } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { DOCS_FAQ } from './docs-data';
import { DocsView } from './docs-view';

/**
 * Docs page (discovery §5.5) — server wrapper exporting page metadata +
 * server-rendered JSON-LD (`BreadcrumbList` + `FAQPage`). This is the
 * LLM-first documentation hub: concepts, roadmap, architecture, and FAQ.
 */
export const metadata: Metadata = createMetadata({
  title: 'Docs — Concepts, Roadmap & Architecture | JoinOrigin',
  description:
    'Learn how JoinOrigin works: profiles, communities, chat, projects, and opportunities. Explore the roadmap, tech stack, Matrix standards, and FAQ.',
  path: '/docs',
  keywords: [
    'JoinOrigin docs',
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
      <JsonLd data={faqPage(DOCS_FAQ)} />
    </>
  );
}
