import type { Metadata } from 'next';

import { JsonLd } from '../../lib/menuPages/JsonLd';
import { breadcrumbList } from '../../lib/menuPages/jsonLd';
import { createMetadata } from '../../lib/menuPages/metadata';
import { TermsView } from './terms-view';

/**
 * Terms of service page (discovery §5.9) — server wrapper exporting page
 * metadata + server-rendered `BreadcrumbList` only.
 */
export const metadata: Metadata = createMetadata({
  title: 'Terms of Service | JoinOrigin',
  description:
    "JoinOrigin's terms of service: acceptance, accounts, user content, acceptable use, intellectual property, disclaimers, changes, and contact. Plain-English and short.",
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
