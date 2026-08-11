import { SITE, absoluteUrl } from './metadata';

/**
 * Server-rendered JSON-LD builders for the Sprint 4 menu pages (TASK-215).
 *
 * Mirrors `sprint-4-seo-arch.md` §3.6: typed builders produce valid
 * `application/ld+json` blocks and the `<JsonLd>` component renders them
 * server-side so crawlers and LLMs see the structured data in the initial
 * HTML. Types follow sprint-4-discovery.md §7 — `FAQPage` on pages with a
 * visible FAQ, `BreadcrumbList` on every subpage, `AboutPage`/`ContactPage`
 * on their pages. `Product`/`Offer`/`AggregateRating` are intentionally
 * never emitted (no fake prices/reviews in Sprint 4).
 */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export function faqPage(entries: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

export function aboutPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About JoinOrigin',
    url: absoluteUrl('/about'),
    about: {
      '@type': 'Organization',
      name: SITE.name,
      url: absoluteUrl('/'),
      sameAs: [],
    },
  };
}

export function contactPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact JoinOrigin',
    url: absoluteUrl('/contact'),
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      url: absoluteUrl('/'),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hello@joinorigin.com',
        url: absoluteUrl('/contact'),
      },
    },
  };
}
