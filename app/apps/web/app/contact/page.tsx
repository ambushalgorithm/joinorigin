import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLdScript';
import { breadcrumbList, contactPage } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { ContactView } from './contact-view';

/**
 * Contact page (discovery §5.7) — server wrapper exporting page metadata +
 * server-rendered JSON-LD (`ContactPage` + `BreadcrumbList`). The form is a
 * web-local `mailto:` fallback (discovery Assumption 4: no new backend in
 * Sprint 4).
 */
export const metadata: Metadata = createMetadata({
  title: 'Contact — Talk to the JoinOrigin Team | JoinOrigin',
  description:
    'Questions about JoinOrigin, early access, or starting a community? Contact the team — we reply within 2 business days.',
  path: '/contact',
  keywords: [
    'contact JoinOrigin',
    'JoinOrigin support',
    'JoinOrigin email',
    'talk to JoinOrigin team',
  ],
});

export default function ContactPage() {
  return (
    <>
      <ContactView />
      <JsonLd data={contactPage()} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
    </>
  );
}
