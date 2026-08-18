import type { Metadata } from 'next';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { contactPage, breadcrumbList } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { ContactView } from '../../contact/contact-view';

/**
 * `/de/contact` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN `app/contact/page.tsx`
 * wrapper with the locale-prefixed path: `createMetadata({ path:
 * '/de/contact' })`, breadcrumb `Home` → `/de`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded `x-joinorigin-locale` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 */
export const metadata: Metadata = createMetadata({
  title: 'Contact — Talk to the JoinOrigin Team | JoinOrigin',
  description:
    'Questions about JoinOrigin or starting a community? Contact the team — we reply within 2 business days.',
  path: '/de/contact',
  keywords: [
    'contact JoinOrigin',
    'JoinOrigin support',
    'JoinOrigin email',
    'talk to JoinOrigin team',
  ],
});

export default function DeContactPage() {
  return (
    <>
      <ContactView />
      <JsonLd data={contactPage()} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/de' },
          { name: 'Contact', path: '/de/contact' },
        ])}
      />
    </>
  );
}
