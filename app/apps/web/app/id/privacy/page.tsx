import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { PrivacyView } from '../../privacy/privacy-view';

/**
 * `/id/privacy` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/privacy/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/id/privacy' })`, breadcrumb `Home` → `/id`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'Privacy Policy | JoinOrigin',
  description:
    "JoinOrigin's privacy policy: what we collect, how analytics works, your data rights, and how to contact us. Short and plain-English.",
  path: '/id/privacy',
  keywords: ['JoinOrigin privacy policy'],
});

export default function IdPrivacyPage() {
  return (
    <>
      <PrivacyView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/id' },
          { name: 'Privacy', path: '/id/privacy' },
        ])}
      />
    </>
  );
}
