import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { GlossaryHubView } from '../../glossary/glossary-hub-view';

/**
 * `/ja/glossary` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/glossary/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ja/glossary' })`, breadcrumb `Home` → `/ja`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community OS Glossary | JoinOrigin',
  description:
    'Learn the core terms of community building — community, community manager, community OS, moderation, onboarding, activation, engagement loop, hybrid events, and co-founder.',
  path: '/ja/glossary',
  keywords: [
    'community glossary',
    'community manager',
    'community OS',
    'community terms',
    'hybrid events',
  ],
});

export default function JaGlossaryPage() {
  return (
    <>
      <GlossaryHubView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ja' },
          { name: 'Glossary', path: '/ja/glossary' },
        ])}
      />
    </>
  );
}
