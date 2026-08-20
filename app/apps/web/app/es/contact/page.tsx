import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { contactPage, breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { ContactView } from '../../contact/contact-view';

/**
 * `/es/contact` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/contact/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/es/contact' })`, breadcrumb `Home` → `/es`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/es/contact` and `alternates.languages` `es` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Contact — Talk to the JoinOrigin Team | JoinOrigin',
  description:
    'Questions about JoinOrigin or starting a community? Contact the team — we reply within 2 business days.',
  path: '/es/contact',
  locale: 'es',
  keywords: [
    'contact JoinOrigin',
    'JoinOrigin support',
    'JoinOrigin email',
    'talk to JoinOrigin team',
  ],
});

export default function EsContactPage() {
  return (
    <>
      <ContactView />
      <JsonLd data={contactPage()} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/es' },
          { name: 'Contact', path: '/es/contact' },
        ])}
      />
    </>
  );
}
