import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '../../../../lib/seo/JsonLdScript';
import {
  guideHubPath,
  guidePageEntries,
  guidePageEntry,
  guidePageForLocale,
  guidePageMetadata,
} from '../../../../lib/seo/guides';
import { breadcrumbList, faqPage } from '../../../../lib/seo/jsonLd';
import { GuideView } from '../../../guides/[slug]/guide-view';

/**
 * `/<locale>/guides/[slug]` — per-locale L1 how-to guide page (TASK-421).
 *
 * Mirrors the `/de/location` wiring: generateStaticParams enumerates only
 * guides with committed `<locale>` content; any untranslated slug →
 * `notFound()` (localization R5 — never publish locale-prefixed URLs with
 * untranslated body). Metadata emits the full hreflang set: `<locale>` self
 * + `en` alternate + `x-default` → EN canonical via `alternates.languages`.
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return guidePageEntries('zh-CN').map((entry) => ({ slug: entry.slug }));
}

interface ZhCNGuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ZhCNGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = guidePageEntry(slug, 'zh-CN');
  if (!entry) {
    return {};
  }
  return guidePageMetadata(entry);
}

export default async function ZhCNGuidePage({ params }: ZhCNGuidePageProps) {
  const { slug } = await params;
  const page = guidePageForLocale(slug, 'zh-CN');
  if (!page) {
    notFound();
  }
  const { entry, content } = page;

  return (
    <>
      <GuideView entry={entry} content={content} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/zh-CN' },
          { name: 'Guides', path: guideHubPath('zh-CN') },
          { name: entry.title, path: entry.path },
        ])}
      />
      <JsonLd data={faqPage(content.faq)} />
    </>
  );
}
