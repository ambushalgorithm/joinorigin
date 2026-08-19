import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { TermsView } from '../../terms/terms-view';

/**
 * `/es/terms` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/terms/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/es/terms' })`, breadcrumb `Home` → `/es`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458): title/description/OG
 * stay on the EN copy (no translated static-page content exists), while
 * canonical + hreflang stay per-locale — canonical
 * `/es/terms` and `alternates.languages` `es` +
 * `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Terms of Service | JoinOrigin',
  description:
    "JoinOrigin's terms of service: accounts, user content, acceptable use, intellectual property, disclaimers, and contact. Plain-English and short.",
  path: '/es/terms',
  locale: 'es',
  keywords: ['JoinOrigin terms of service'],
});

export default function EsTermsPage() {
  return (
    <>
      <TermsView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/es' },
          { name: 'Terms', path: '/es/terms' },
        ])}
      />
    </>
  );
}
