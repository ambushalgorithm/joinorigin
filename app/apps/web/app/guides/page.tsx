import type { Metadata } from 'next';

import { getServerLocale } from '../../lib/i18n-server';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import { guideHubFaq, guideHubMetadata, guidePageEntries } from '../../lib/seo/guides';
import { breadcrumbList, faqPage } from '../../lib/seo/jsonLd';
import { GuidesHubView } from './guides-hub-view';

/**
 * Community Building hub (design §6.3 — L2a pillar page).
 *
 * Server wrapper exporting hub metadata + server-rendered `BreadcrumbList`
 * + `FAQPage` JSON-LD (G-12 — the FAQPage mirrors the visible FAQ block on
 * the hub 1:1 via `guideHubFaq`, resolved per-locale with EN fallback). The
 * view lists all 12 L1 guides, the glossary, and the flagship city pages
 * (topic-cluster backbone). Metadata carries the hreflang cluster for the
 * per-locale hub surfaces (TASK-421).
 *
 * Locale-aware body (TASK-446): entries resolve through the active server
 * locale (proxy-forwarded `x-joinorigin-locale`), so a visitor with e.g. a
 * `de` cookie sees the committed German guide set on the canonical `/guides`
 * URL instead of hardcoded English. SEO metadata stays EN (arch-i18n §1.2).
 */
export const metadata: Metadata = guideHubMetadata();

export default async function GuidesHubPage() {
  const locale = await getServerLocale();
  const entries = guidePageEntries(locale);
  const faq = guideHubFaq(locale);
  return (
    <>
      <GuidesHubView entries={entries} faq={faq} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
        ])}
      />
      <JsonLd data={faqPage(faq)} />
    </>
  );
}
