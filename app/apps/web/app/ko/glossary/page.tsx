import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { GlossaryHubView } from '../../glossary/glossary-hub-view';

/**
 * `/ko/glossary` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/glossary/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/ko/glossary' })`, breadcrumb `Home` → `/ko`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/ko/glossary` and `alternates.languages` `ko` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community OS Glossary | JoinOrigin',
  description:
    'Learn the core terms of Origin — Origin, community manager, community OS, moderation, onboarding, activation, engagement loop, hybrid events, and co-founder.',
  path: '/ko/glossary',
  locale: 'ko',
  keywords: [
    'community glossary',
    'community manager',
    'community OS',
    'community terms',
    'hybrid events',
  ],
});

export default function KoGlossaryPage() {
  return (
    <>
      <GlossaryHubView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/ko' },
          { name: 'Glossary', path: '/ko/glossary' },
        ])}
      />
    </>
  );
}
