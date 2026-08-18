import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { GlossaryHubView } from '../../glossary/glossary-hub-view';

/**
 * `/ru/glossary` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/glossary/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ru/glossary' })`, breadcrumb `Home` → `/ru`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community OS Glossary | JoinOrigin',
  description:
    'Learn the core terms of community building — community, community manager, community OS, moderation, onboarding, activation, engagement loop, hybrid events, and co-founder.',
  path: '/ru/glossary',
  keywords: [
    'community glossary',
    'community manager',
    'community OS',
    'community terms',
    'hybrid events',
  ],
});

export default function RuGlossaryPage() {
  return (
    <>
      <GlossaryHubView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ru' },
          { name: 'Glossary', path: '/ru/glossary' },
        ])}
      />
    </>
  );
}
