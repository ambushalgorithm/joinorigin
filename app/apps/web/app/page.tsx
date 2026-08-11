import type { Metadata } from 'next';

import { JsonLd } from '../lib/seo/JsonLd';
import { faqPage } from '../lib/seo/jsonLd';
import { createMetadata } from '../lib/seo/metadata';
import { SITE } from '../lib/seo/site';
import { HOME_FAQ } from './home-data';
import { HomeView } from './home-view';

/**
 * JoinOrigin homescreen — server wrapper (arch §3.3 pattern, matching
 * `app/features/page.tsx`): exports page metadata and renders the client
 * view plus server-rendered FAQPage JSON-LD so crawlers and LLMs see the
 * structured data in the initial HTML (arch §3.6, discovery §5.1/§8.3).
 *
 * The FAQ answers are defined once in `home-data.ts` and shared 1:1 between
 * the visible block (in `home-view.tsx`) and the FAQPage JSON-LD here.
 *
 * The layout still supplies site-wide defaults (Organization/WebSite JSON-LD,
 * icons, metadataBase); this page's metadata overrides the home title/canonical.
 * The description reuses `SITE.description` (152 chars, discovery §6 ≤160 rule
 * and brand/keyword intact — the discovery §5.1 draft is 184 chars and would
 * exceed the limit the e2e description-length check enforces).
 */
export const metadata: Metadata = createMetadata({
  title: 'JoinOrigin — Social Collaboration Network & Community OS',
  description: SITE.description,
  path: '/',
  keywords: [
    'social collaboration network',
    'community OS',
    'community operating system',
    'collaboration platform',
    'community collaboration',
  ],
});

export default function HomePage() {
  return (
    <>
      <HomeView />
      <JsonLd data={faqPage(HOME_FAQ)} />
    </>
  );
}
