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
 * `/fr/guides/[slug]` — generated locale L1 how-to guide page
 * (TASK-453, TASK-458).
 *
 * Mirrors the canonical EN guide route: the active locale's committed
 * content resolves first, EN fallback otherwise
 * (`guidePageForLocale(slug, 'fr') ?? guidePageForLocale(slug)`).
 * Unknown slugs (no locale content AND no EN content) → `notFound()`.
 * Metadata is per-locale with EN fallback (TASK-458): the locale entry's
 * committed title/description/OG win when it exists; otherwise the EN
 * copy is used while canonical + hreflang stay on
 * `/fr/guides/[slug]` with `x-default` → EN canonical.
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

interface FrGuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: FrGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = guidePageEntry(slug, 'fr') ?? guidePageEntry(slug);
  if (!entry) {
    return {};
  }
  return guidePageMetadata(entry, 'fr');
}

export default async function FrGuidePage({ params }: FrGuidePageProps) {
  const { slug } = await params;
  const page = guidePageForLocale(slug, 'fr') ?? guidePageForLocale(slug);
  if (!page) {
    notFound();
  }
  const { entry, content } = page;

  return (
    <>
      <GuideView entry={entry} content={content} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/fr' },
          { name: 'Guides', path: guideHubPath('fr') },
          { name: entry.title, path: entry.path },
        ])}
      />
      <JsonLd data={faqPage(content.faq)} />
    </>
  );
}
