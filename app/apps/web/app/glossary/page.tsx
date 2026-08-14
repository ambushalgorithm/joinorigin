import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { GlossaryHubView } from './glossary-hub-view';

/**
 * Community OS Glossary hub (design §6.3 — L2b hub).
 *
 * Server wrapper exporting hub metadata + server-rendered `BreadcrumbList`
 * JSON-LD. Sprint 12 ships the hub only — glossary term pages are deferred.
 * The hub links to the guides hub and the flagship city pages.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community OS Glossary | JoinOrigin',
  description:
    'Learn the core terms of community building — community, community manager, community OS, moderation, onboarding, activation, engagement loop, hybrid events, and co-founder.',
  path: '/glossary',
  keywords: [
    'community glossary',
    'community manager',
    'community OS',
    'community terms',
    'hybrid events',
  ],
});

export default function GlossaryHubPage() {
  return (
    <>
      <GlossaryHubView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Glossary', path: '/glossary' },
        ])}
      />
    </>
  );
}
