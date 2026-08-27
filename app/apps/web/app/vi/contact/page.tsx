import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { contactPage, breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { ContactView } from '../../contact/contact-view';

/**
 * `/vi/contact` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/contact/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/vi/contact' })`, breadcrumb `Home` → `/vi`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * `/vi/contact` and `alternates.languages` `vi` + `en` + `x-default` → EN canonical.
 */
export const metadata: Metadata = createMetadata({
  title: 'Contact — Talk to the JoinOrigin Team | JoinOrigin',
  description:
    'Questions about Origin — or starting your own Origin? Contact the team — we reply within 2 business days.',
  path: '/vi/contact',
  locale: 'vi',
  keywords: [
    'contact JoinOrigin',
    'JoinOrigin support',
    'JoinOrigin email',
    'talk to JoinOrigin team',
  ],
});

export default function ViContactPage() {
  return (
    <>
      <ContactView />
      <JsonLd data={contactPage()} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/vi' },
          { name: 'Contact', path: '/vi/contact' },
        ])}
      />
    </>
  );
}
