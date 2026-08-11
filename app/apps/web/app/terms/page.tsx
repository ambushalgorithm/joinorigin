import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLd';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { TermsView } from './terms-view';

/**
 * Terms of service page (discovery §5.9) — server wrapper exporting page
 * metadata + server-rendered `BreadcrumbList` only.
 */
export const metadata: Metadata = createMetadata({
  title: 'Terms of Service | JoinOrigin',
  description:
    "JoinOrigin's terms of service: accounts, user content, acceptable use, intellectual property, disclaimers, and contact. Plain-English and short.",
  path: '/terms',
  keywords: ['JoinOrigin terms of service'],
});

export default function TermsPage() {
  return (
    <>
      <TermsView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Terms', path: '/terms' },
        ])}
      />
    </>
  );
}
