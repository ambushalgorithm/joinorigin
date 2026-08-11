import type { Metadata } from 'next';

import { JsonLd } from '../../lib/seo/JsonLd';
import { breadcrumbList, faqPage } from '../../lib/seo/jsonLd';
import { createMetadata } from '../../lib/seo/metadata';
import { PRICING_FAQ } from './pricing-data';
import { PricingView } from './pricing-view';

/**
 * Pricing page (discovery §5.4) — server wrapper exporting page metadata +
 * server-rendered JSON-LD (`BreadcrumbList` + `FAQPage`). No `Product`/`Offer`
 * structured data: there are no real prices yet (discovery §7, Google policy).
 */
export const metadata: Metadata = createMetadata({
  title: 'Pricing — Free During Early Access | JoinOrigin',
  description:
    'JoinOrigin is free during early access. Reserve your spot on the waitlist, then choose the plan that fits your community when we launch. No spam, no lock-in.',
  path: '/pricing',
  keywords: [
    'JoinOrigin pricing',
    'community platform pricing',
    'free community platform',
    'community software pricing',
    'how much does JoinOrigin cost',
  ],
});

export default function PricingPage() {
  return (
    <>
      <PricingView />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' },
        ])}
      />
      <JsonLd data={faqPage(PRICING_FAQ)} />
    </>
  );
}
