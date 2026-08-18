import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
 * committed content file (`lib/seo/content/en/guide/<slug>.ts`), so the
 * structured data can never drift from the page copy.
 *
 * Locale-aware loader (TASK-421): content resolution goes through the shared
 * `guidePageForLocale` loader, which resolves the active locale surface
 * ('en' on this canonical route) with EN fallback — the same code path the
 * per-locale surfaces (`app/<locale>/guides/[slug]/page.tsx`) use.
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
  const page = guidePageForLocale(slug);
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
          { name: entry.title, path: entry.path },
        ])}
      />
      <JsonLd data={faqPage(content.faq)} />
    </>
  );
}
