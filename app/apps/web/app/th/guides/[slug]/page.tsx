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
  return guidePageEntries('th').map((entry) => ({ slug: entry.slug }));
}

interface ThGuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ThGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = guidePageEntry(slug, 'th');
  if (!entry) {
    return {};
  }
  return guidePageMetadata(entry);
}

export default async function ThGuidePage({ params }: ThGuidePageProps) {
  const { slug } = await params;
  const page = guidePageForLocale(slug, 'th');
  if (!page) {
    notFound();
  }
  const { entry, content } = page;

  return (
    <>
      <GuideView entry={entry} content={content} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/th' },
          { name: 'Guides', path: guideHubPath('th') },
          { name: entry.title, path: entry.path },
        ])}
      />
      <JsonLd data={faqPage(content.faq)} />
    </>
  );
}
