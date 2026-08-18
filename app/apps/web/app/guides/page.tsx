import type { Metadata } from 'next';

import { getServerLocale } from '../../lib/i18n-server';
import { JsonLd } from '../../lib/seo/JsonLdScript';
import { guideHubMetadata, guidePageEntries } from '../../lib/seo/guides';
import { breadcrumbList } from '../../lib/seo/jsonLd';
import { GuidesHubView } from './guides-hub-view';

/**
 * Community Building hub (design §6.3 — L2a pillar page).
 *
 * Server wrapper exporting hub metadata + server-rendered `BreadcrumbList`
 * JSON-LD. The view lists all 12 L1 guides, the glossary, and the flagship
 * city pages (topic-cluster backbone). Metadata carries the hreflang
 * cluster for the per-locale hub surfaces (TASK-421).
 *
 * Locale-aware body (TASK-446): entries resolve through the active server
 * locale (proxy-forwarded `x-joinorigin-locale`), so a visitor with e.g. a
 * `de` cookie sees the committed German guide set on the canonical `/guides`
 * URL instead of hardcoded English. SEO metadata stays EN (arch-i18n §1.2).
 */
export const metadata: Metadata = guideHubMetadata();

export default async function GuidesHubPage() {
  const entries = guidePageEntries(await getServerLocale());
  return (
    <>
      <GuidesHubView entries={entries} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
        ])}
      />
    </>
  );
}
