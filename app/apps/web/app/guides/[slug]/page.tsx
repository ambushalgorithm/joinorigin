import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getServerLocale } from '../../../lib/i18n-server';
import { JsonLd } from '../../../lib/seo/JsonLdScript';
import {
  GUIDES_HUB_PATH,
  guidePageEntry,
  guidePageForLocale,
  guidePageMetadata,
} from '../../../lib/seo/guides';
import { GUIDE_SLUGS } from '../../../lib/seo/guides';
import { breadcrumbList, faqPage } from '../../../lib/seo/jsonLd';
import { GuideView } from './guide-view';

/**
 * L1 how-to guide page (design §6.2) — server wrapper exporting per-guide
 * metadata + server-rendered `BreadcrumbList` + `FAQPage` JSON-LD.
 *
 * The FAQPage JSON-LD mirrors the visible FAQ block 1:1 — both read the same
 * committed content file (`lib/seo/content/<locale>/guide/<slug>.ts`), so the
 * structured data can never drift from the page copy.
 *
 * Locale-aware loader (TASK-421 + TASK-446): content resolution goes through
 * the shared `guidePageForLocale` loader, which resolves the ACTIVE server
 * locale surface (proxy-forwarded `x-joinorigin-locale`) with EN fallback —
 * the same code path the per-locale surfaces (`app/<locale>/guides/[slug]/page.tsx`)
 * use. A visitor with e.g. a `de` cookie sees the committed German guide body
 * on the canonical `/guides/<slug>` URL; guides without committed content in
 * the active locale fall back to the EN surface. SEO metadata stays EN
 * (arch-i18n §1.2).
 */
interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = guidePageEntry(slug, 'en');
  if (!entry) return {};
  return guidePageMetadata(entry);
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const page = guidePageForLocale(slug, locale) ?? guidePageForLocale(slug);
  if (!page) {
    notFound();
  }
  const { entry, content } = page;

  return (
    <>
      <GuideView entry={entry} content={content} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/' },
          { name: 'Guides', path: GUIDES_HUB_PATH },
          // G-9 — the crumb mirrors the visible H1 (no `| JoinOrigin` suffix).
          { name: entry.heading, path: entry.path },
        ])}
      />
      <JsonLd data={faqPage(content.faq)} />
    </>
  );
}
