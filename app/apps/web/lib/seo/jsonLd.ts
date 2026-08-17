import { SITE } from './site';
import { absoluteUrl } from './url';

/**
 * Typed JSON-LD structured-data builders (arch §3.6).
 *
 * Each builder returns a plain object that is safe to serialize into
 * `<script type="application/ld+json">` via `<JsonLd>` — no user input is
 * ever interpolated. All data mirrors **visible** page content (Google
 * structured-data policies, `sprint-4-discovery.md` §7): `Product`,
 * `Offer`, `AggregateRating`, and `Review` are intentionally never emitted
 * — the platform does not present commercial offers.
 *
 * Types follow `sprint-4-discovery.md` §7. The layout mounts `Organization`
 * + `WebSite` once site-wide; menu pages mount `BreadcrumbList` and
 * `FAQPage`/`AboutPage`/`ContactPage` per page.
 */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/** Organization — mounted once in the root layout (site-wide). */
export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/assets/logo/joinorigin-logo.svg'),
    description: SITE.description,
    // Real social profiles are not provisioned yet (discovery Assumption 5);
    // the pattern is defined so they can be filled without touching markup.
    sameAs: [] as string[],
  };
}

/** WebSite — mounted once in the root layout. No SearchAction until real search exists. */
export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: absoluteUrl('/'),
    inLanguage: 'en',
  };
}

/** BreadcrumbList — every menu page (Home › Page). */
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

/** FAQPage — pages with a visible FAQ block (Home, Features, Community, Docs). */
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

/** AboutPage — /about. */
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
      sameAs: [] as string[],
    },
  };
}

/** ContactPage — /contact. */
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
        email: 'hello@joinorigin.co',
        url: absoluteUrl('/contact'),
      },
    },
  };
}
