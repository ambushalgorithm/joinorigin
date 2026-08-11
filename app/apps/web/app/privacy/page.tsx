import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { PrivacyView } from './privacy-view';

/**
 * Privacy policy page (discovery §5.8) — server wrapper exporting page
 * metadata + server-rendered `BreadcrumbList` only (no FAQ spam).
 */
export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy | JoinOrigin',
  description:
    "JoinOrigin's privacy policy: what we collect, how analytics works, your data rights, and how to contact us. Short and plain-English.",
  path: '/privacy',
  keywords: ['JoinOrigin privacy policy'],
});

export default function PrivacyPage() {
  return (
    <>
      <PrivacyView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Privacy', path: '/privacy' },
        ])}
      />
    </>
  );
}
