import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '../../../lib/seo/JsonLdScript';
import { getGuideContent } from '../../../lib/seo/content';
import { GUIDE_SLUGS, GUIDES_HUB_PATH, guidePageEntry } from '../../../lib/seo/guides';
import { breadcrumbList, faqPage } from '../../../lib/seo/jsonLd';
import { createMetadata } from '../../../lib/seo/metadata';
import { GuideView } from './guide-view';

/**
 * L1 how-to guide page (design §6.2) — server wrapper exporting per-guide
 * metadata + server-rendered `BreadcrumbList` + `FAQPage` JSON-LD.
 *
 * The FAQPage JSON-LD mirrors the visible FAQ block 1:1 — both read the same
 * committed content file (`lib/seo/content/en/guide/<slug>.ts`), so the
 * structured data can never drift from the page copy.
 */
interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = guidePageEntry(slug);
  if (!entry) return {};
  return createMetadata({
    title: entry.title,
    description: entry.description,
    path: entry.path,
    keywords: [slug.replace(/-/g, ' '), 'community', 'how to', 'guide'],
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const entry = guidePageEntry(slug);
  const content = getGuideContent(slug, 'en');
  if (!entry || !content || content.kind !== 'guide') {
    notFound();
  }

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
