import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '../../../../lib/seo/JsonLdScript';
import {
  GUIDE_SLUGS,
  guideHubPath,
  guidePageEntry,
  guidePageForLocale,
  guidePageMetadata,
} from '../../../../lib/seo/guides';
import { breadcrumbList, faqPage } from '../../../../lib/seo/jsonLd';
import { GuideView } from '../../../guides/[slug]/guide-view';

/**
 * `/pt-BR/guides/[slug]` — generated locale L1 how-to guide page
 * (TASK-453, TASK-458).
 *
 * Mirrors the canonical EN guide route: the active locale's committed
 * content resolves first, EN fallback otherwise
 * (`guidePageForLocale(slug, 'pt-BR') ?? guidePageForLocale(slug)`).
 * Unknown slugs (no locale content AND no EN content) → `notFound()`.
 * Metadata is per-locale with EN fallback (TASK-458): the locale entry's
 * committed title/description/OG win when it exists; otherwise the EN
 * copy is used while canonical + hreflang stay on
 * `/pt-BR/guides/[slug]` with `x-default` → EN canonical.
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

interface PtBRGuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PtBRGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = guidePageEntry(slug, 'pt-BR') ?? guidePageEntry(slug);
  if (!entry) {
    return {};
  }
  return guidePageMetadata(entry, 'pt-BR');
}

export default async function PtBRGuidePage({ params }: PtBRGuidePageProps) {
  const { slug } = await params;
  const page = guidePageForLocale(slug, 'pt-BR') ?? guidePageForLocale(slug);
  if (!page) {
    notFound();
  }
  const { entry, content } = page;

  return (
    <>
      <GuideView entry={entry} content={content} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/pt-BR' },
          { name: 'Guides', path: guideHubPath('pt-BR') },
          { name: entry.heading, path: entry.path },
        ])}
      />
      <JsonLd data={faqPage(content.faq)} />
    </>
  );
}
