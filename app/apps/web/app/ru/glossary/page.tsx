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
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/ru/glossary` and `alternates.languages` `ru` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Community OS Glossary | JoinOrigin',
  description:
    'Learn the core terms of Origin — Origin, community manager, community OS, moderation, onboarding, activation, engagement loop, hybrid events, and co-founder.',
  path: '/ru/glossary',
  locale: 'ru',
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
