import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { TermsView } from '../../terms/terms-view';

/**
 * `/it/terms` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/terms/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/it/terms' })`, breadcrumb `Home` → `/it`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'Terms of Service | JoinOrigin',
  description:
    "JoinOrigin's terms of service: accounts, user content, acceptable use, intellectual property, disclaimers, and contact. Plain-English and short.",
  path: '/it/terms',
  keywords: ['JoinOrigin terms of service'],
});

export default function ItTermsPage() {
  return (
    <>
      <TermsView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/it' },
          { name: 'Terms', path: '/it/terms' },
        ])}
      />
    </>
  );
}
