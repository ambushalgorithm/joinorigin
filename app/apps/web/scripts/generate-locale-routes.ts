#!/usr/bin/env node
/**
 * generate-locale-routes — deterministic `app/<locale>/**` route-tree
 * generator (Rule 12, TASK-448).
 *
 * SOURCE OF TRUTH (TASK-548, Story C.2): this generator owns EVERY
 * `app/<locale>/**` wrapper — the committed wrapper tree is generated
 * output. NEVER hand-edit any `app/<locale>/**` file. When the route set
 * or a wrapper template changes, regenerate with
 * `pnpm --filter @joinorigin/web locale:generate --force`, run
 * `format:generated` (prettier --write), and commit the regenerated
 * wrappers + `locale-routes.manifest.json` together in the same change.
 *
 * Input tables (committed here, mirroring the codebase):
 *   - LOCALES = SUPPORTED_LOCALES (21: en + 20 translations) from
 *     `@joinorigin/i18n` — single source of truth for the locale matrix.
 *   - STATIC_PAGES = every public non-location page (home, features,
 *     network, docs, about, contact, privacy, terms, glossary, signup).
 *   - LOCATION_SEGMENTS = the 5 location page kinds (hub, [country],
 *     [country]/[region], [country]/[region]/[city],
 *     [country]/[region]/[city]/[variant]).
 *
 * Output for every locale × page: `app/<locale>/<route>/page.tsx`
 * wrapper mirroring the EN wrapper — `createMetadata({ path:
 * '/<locale>/<route>', locale })` (or `locationMetadata(entry)` for
 * location pages), breadcrumb `Home` → `/<locale>`, rendering the shared
 * view (per-locale content resolves via the existing loaders).
 *
 * Metadata is per-locale with EN fallback (TASK-458): title/description/OG
 * derive from the active locale where committed translated content exists
 * (guide/location entries), EN otherwise; canonical + hreflang always stay
 * per-locale (`/<locale>/...` with `x-default` → EN canonical).
 *
 * Deterministic rules:
 *   - Existing files are NEVER clobbered (`--force` overwrites) — the
 *     committed `de/guides`, `es/guides`, and `de/location` trees (and any
 *     file already committed for another role) stay untouched.
 *   - Existing non-EN guide wrappers get their breadcrumb `Home` path
 *     fixed to `/<locale>` (TASK-448d).
 *   - `locale-routes.manifest.json` is emitted at the web package root.
 *
 * Wrappers are emitted in the repo Prettier style (single quotes, expanded
 * arrays); after a `--force` regeneration run
 * `pnpm --filter @joinorigin/web format:generated` (prettier --write) so
 * the committed tree stays lint-clean.
 *
 * Usage: pnpm --filter @joinorigin/web locale:generate
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SUPPORTED_LOCALES, type Locale } from '@joinorigin/i18n';

/* ------------------------------------------------------------------ *
 * Input tables
 * ------------------------------------------------------------------ */

const LOCALES: Locale[] = [...SUPPORTED_LOCALES];

/** Sentinel for the home description — the wrapper imports `SITE.description`. */
const SITE_DESCRIPTION = '__SITE_DESCRIPTION__';

interface StaticPageSpec {
  /** Route path under the locale prefix; '' for the home page. */
  route: string;
  /** Component name suffix (e.g. 'Features' → `<L>FeaturesPage`). */
  name: string;
  /** Shared view module imported from the wrapper dir. */
  viewModule: string;
  /** Shared view component name. */
  viewName: string;
  /** Breadcrumb label (chrome label stays EN — SEO metadata scope). */
  crumb: string | null;
  /** Optional extra JSON-LD call rendered by the wrapper. */
  jsonLd?: 'aboutPage' | 'contactPage';
  /** Page title (mirrors the EN wrapper exactly). */
  title: string;
  /** Page description (or the SITE_DESCRIPTION sentinel for home). */
  description: string;
  /** Page keywords (mirrors the EN wrapper exactly). */
  keywords: string[];
}

/** Public non-location pages — mirrored from `app/<page>/page.tsx`. */
const STATIC_PAGES: StaticPageSpec[] = [
  {
    route: '',
    name: 'Home',
    viewModule: '../home-view',
    viewName: 'HomeView',
    crumb: null,
    title: 'Origin — Social Collaboration Network & Community OS',
    description: SITE_DESCRIPTION,
    keywords: [
      'social collaboration network',
      'community OS',
      'community operating system',
      'collaboration platform',
      'community collaboration',
    ],
  },
  {
    route: 'features',
    name: 'Features',
    viewModule: '../../features/features-view',
    viewName: 'FeaturesView',
    crumb: 'Features',
    title: 'Features — Origins, Chat, Projects & Opportunities | JoinOrigin',
    description:
      "Explore Origin's features: profiles, ideas, Origins, chat, feed, projects, and opportunities — one space where every idea finds the people and resources to move forward.",
    keywords: [
      'community platform features',
      'collaboration network',
      'community chat',
      'community feed',
      'online community platform',
      'project collaboration platform',
      'community building platform',
    ],
  },
  {
    route: 'network',
    name: 'Network',
    viewModule: '../../network/network-view',
    viewName: 'NetworkView',
    crumb: 'Network',
    title: 'Network — Find Your People & Build Together | JoinOrigin',
    description:
      "Join Origin's network of 2,400+ builders. Start or join an Origin around any idea — a small business, an AI startup, a book club — and find the people to move it forward.",
    keywords: [
      'network of builders',
      'join the network',
      'network for founders',
      'network for AI builders',
      'find your network',
      'social network for builders',
    ],
  },
  {
    route: 'docs',
    name: 'Docs',
    viewModule: '../../docs/docs-view',
    viewName: 'DocsView',
    crumb: 'Docs',
    title: 'Docs — Concepts, Roadmap & Architecture | JoinOrigin',
    description:
      'Learn how Origin works: profiles, ideas, Origins, chat, feed, projects, and opportunities. Explore the roadmap, tech stack, and open Matrix standards.',
    keywords: [
      'JoinOrigin docs',
      'Origin docs',
      'how JoinOrigin works',
      'community platform documentation',
      'Matrix community platform',
      'open source community platform',
      'collaboration network architecture',
    ],
  },
  {
    route: 'about',
    name: 'About',
    viewModule: '../../about/about-view',
    viewName: 'AboutView',
    crumb: 'About',
    jsonLd: 'aboutPage',
    title: 'About — The Operating System for Human Collaboration | JoinOrigin',
    description:
      "Origin's mission: one space where people start around a goal, gather the people and resources they need, and build together. The network is the product.",
    keywords: [
      'about JoinOrigin',
      'social collaboration network mission',
      'social operating system',
      'relationship network',
      'what is JoinOrigin',
    ],
  },
  {
    route: 'contact',
    name: 'Contact',
    viewModule: '../../contact/contact-view',
    viewName: 'ContactView',
    crumb: 'Contact',
    jsonLd: 'contactPage',
    title: 'Contact — Talk to the JoinOrigin Team | JoinOrigin',
    description:
      'Questions about Origin — or starting your own Origin? Contact the team — we reply within 2 business days.',
    keywords: [
      'contact JoinOrigin',
      'JoinOrigin support',
      'JoinOrigin email',
      'talk to JoinOrigin team',
    ],
  },
  {
    route: 'privacy',
    name: 'Privacy',
    viewModule: '../../privacy/privacy-view',
    viewName: 'PrivacyView',
    crumb: 'Privacy',
    title: 'Privacy Policy | JoinOrigin',
    description:
      "JoinOrigin's privacy policy: what we collect, how analytics works, your data rights, and how to contact us. Short and plain-English.",
    keywords: ['JoinOrigin privacy policy'],
  },
  {
    route: 'terms',
    name: 'Terms',
    viewModule: '../../terms/terms-view',
    viewName: 'TermsView',
    crumb: 'Terms',
    title: 'Terms of Service | JoinOrigin',
    description:
      "JoinOrigin's terms of service: accounts, user content, acceptable use, intellectual property, disclaimers, and contact. Plain-English and short.",
    keywords: ['JoinOrigin terms of service'],
  },
  {
    route: 'glossary',
    name: 'Glossary',
    viewModule: '../../glossary/glossary-hub-view',
    viewName: 'GlossaryHubView',
    crumb: 'Glossary',
    title: 'Community OS Glossary | JoinOrigin',
    description:
      'Learn the core terms of Origin — Origin, community manager, community OS, moderation, onboarding, activation, engagement loop, hybrid events, and co-founder.',
    keywords: [
      'community glossary',
      'community manager',
      'community OS',
      'community terms',
      'hybrid events',
    ],
  },
  {
    route: 'signup',
    name: 'Signup',
    viewModule: '../../signup/signup-view',
    viewName: 'SignupView',
    crumb: 'Signup',
    title: 'Sign Up — Create Your Account | JoinOrigin',
    description:
      'Create your account on Origin. Enter your name and email to get discovered — then start an Origin around your idea and find the people and resources to move it forward.',
    keywords: [
      'sign up',
      'create account',
      'join Origin',
      'social collaboration network',
      'community OS',
      'get discovered',
    ],
  },
];

/** Location page kinds — the 5 segment surfaces under `/<locale>/location`. */
const LOCATION_SEGMENTS = ['hub', 'country', 'region', 'city', 'variant'] as const;
type LocationSegment = (typeof LOCATION_SEGMENTS)[number];

/** Files that pre-date TASK-448 and are maintained outside this generator
 *  (the committed Berlin de location surface — never clobbered). TASK-453
 *  regenerates every location + guide wrapper (EN fallback contract), so
 *  the generator now owns the full file set. */
const PRE_EXISTING_FILES = new Set<string>();

/** Every non-EN guide wrapper that owns the `Home` → `/<locale>` breadcrumb
 *  (TASK-448d) — hub + [slug] per non-EN locale. */
export function guideWrapperFiles(): string[] {
  const files: string[] = [];
  for (const locale of LOCALES) {
    if (locale === 'en') continue;
    files.push(`app/${locale}/guides/page.tsx`);
    files.push(`app/${locale}/guides/[slug]/page.tsx`);
  }
  return files;
}

/* ------------------------------------------------------------------ *
 * Deterministic helpers
 * ------------------------------------------------------------------ */

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** PascalCase a BCP-47 locale tag for component names: 'pt-BR' → 'PtBR'. */
export function pascalLocale(locale: Locale): string {
  return locale
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/** Component name for a generated wrapper. */
export function wrapperName(locale: Locale, page: string): string {
  return `${pascalLocale(locale)}${page}Page`;
}

/** Relative path of a static wrapper from `apps/web/` — e.g.
 *  `app/de/features/page.tsx`. */
export function wrapperFile(locale: Locale, route: string): string {
  const segments = route ? `${route}/` : '';
  return `app/${locale}/${segments}page.tsx`;
}

/** Location wrapper file path — `app/<locale>/location/[country]/page.tsx`. */
export function locationFile(locale: Locale, segment: LocationSegment): string {
  const dynamic: Partial<Record<LocationSegment, string>> = {
    country: '[country]',
    region: '[country]/[region]',
    city: '[country]/[region]/[city]',
    variant: '[country]/[region]/[city]/[variant]',
  };
  const path = dynamic[segment] ?? '';
  return `app/${locale}/location/${path ? `${path}/` : ''}page.tsx`;
}

/** Guide wrapper file path — `app/<locale>/guides/page.tsx` (hub) or
 *  `app/<locale>/guides/[slug]/page.tsx` (detail). */
export function guideFile(locale: Locale, kind: 'hub' | 'slug'): string {
  return kind === 'hub' ? `app/${locale}/guides/page.tsx` : `app/${locale}/guides/[slug]/page.tsx`;
}

/** Number of `../` hops from a wrapper directory up to `apps/web/`. */
function depthToWeb(route: string, segment: LocationSegment | null): number {
  if (segment === null) {
    return route === '' ? 2 : 3;
  }
  const dynamic: Partial<Record<LocationSegment, number>> = {
    hub: 0,
    country: 1,
    region: 2,
    city: 3,
    variant: 4,
  };
  return 3 + (dynamic[segment] ?? 0);
}

function ups(n: number): string {
  return '../'.repeat(n);
}

/** Single-quoted JS string literal (prettier `singleQuote` style) with the
 *  same escaping prettier applies — backslashes and apostrophes escaped. */
function js(value: string): string {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

/** Expanded array literal — one element per line (prettier-stable). */
function jsArray(values: readonly string[]): string {
  return `[\n${values.map((value) => `    ${js(value)},`).join('\n')}\n  ]`;
}

/* ------------------------------------------------------------------ *
 * Wrapper source builders
 * ------------------------------------------------------------------ */

function staticWrapperSource(locale: Locale, page: StaticPageSpec): string {
  const name = wrapperName(locale, page.name);
  const depth = depthToWeb(page.route, null);
  const routePath = page.route ? `/${page.route}` : '';
  const description =
    page.description === SITE_DESCRIPTION ? 'SITE.description' : js(page.description);
  const siteImport =
    page.description === SITE_DESCRIPTION
      ? `import { SITE } from '${ups(depth)}lib/seo/site';\n`
      : '';
  const jsonLdImport =
    page.crumb !== null
      ? `import { ${page.jsonLd ? `${page.jsonLd}, ` : ''}breadcrumbList } from '${ups(depth)}lib/seo/jsonLd';\n`
      : '';
  const jsonLdScriptImport =
    page.crumb !== null || page.jsonLd
      ? `import { JsonLd } from '${ups(depth)}lib/seo/JsonLdScript';\n`
      : '';
  const jsonLdBlock = page.jsonLd ? `      <JsonLd data={${page.jsonLd}()} />\n` : '';
  const crumbBlock =
    page.crumb === null
      ? ''
      : `      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/${locale}' },
          { name: '${page.crumb}', path: '/${locale}/${page.route}' },
        ])}
      />\n`;
  // Story B (TASK-547/TASK-548): the home + network wrappers pass the
  // server-rendered <ChipMarqueeServer /> into the view's `marquee` slot,
  // mirroring the hand-written EN wrappers (`app/page.tsx` and
  // `app/network/page.tsx`) — the 12 MB geo snapshot stays server-side.
  const marqueeSlot = page.route === '' || page.route === 'network';
  const marqueeImport = marqueeSlot
    ? `import ChipMarqueeServer from '${ups(depth)}components/ChipMarqueeServer';\n`
    : '';
  const viewElement = marqueeSlot
    ? `<${page.viewName} marquee={<ChipMarqueeServer />} />`
    : `<${page.viewName} />`;
  // hreflang note: EN surfaces emit the EN cluster (`en` + `x-default` →
  // EN canonical at `/en/...`); non-EN surfaces emit `[locale]` + `en` +
  // `x-default` → EN canonical (TASK-466: all-routes-prefixed).
  const languagesNote =
    locale === 'en'
      ? '`en` + `x-default` → EN canonical'
      : `\`${locale}\` + \`en\` + \`x-default\` → EN canonical`;

  return `import type { Metadata } from 'next';

${marqueeImport}${jsonLdScriptImport}${jsonLdImport}import { createMetadata } from '${ups(depth)}lib/seo/metadata';
${siteImport}import { ${page.viewName} } from '${page.viewModule}';

/**
 * \`/${locale}${routePath}\` — generated locale wrapper (TASK-448).
 *
 * Mirrors the EN \`${page.route ? `app/${page.route}/page.tsx` : 'app/page.tsx'}\`
 * wrapper with the locale-prefixed path: \`createMetadata({ path:
 * '/${locale}${routePath}' })\`, breadcrumb \`Home\` → \`/${locale}\`,
 * rendering the shared view. The chrome + body localize through the
 * proxy-forwarded \`x-joinorigin-locale\` header (root layout) and the
 * content loaders' per-locale + EN-fallback resolution.
 *
 * Metadata is per-locale with EN fallback (TASK-458 + TASK-466):
 * title/description/OG stay on the EN copy (no translated static-page
 * content exists), while canonical + hreflang stay per-locale — canonical
 * \`/${locale}${routePath}\` and \`alternates.languages\` ${languagesNote}.
 */
export const metadata: Metadata = createMetadata({
  title: ${js(page.title)},
  description: ${description},
  path: ${js(`/${locale}${routePath}`)},
  locale: ${js(locale)},
  keywords: ${jsArray(page.keywords)},
});

export default function ${name}() {
  return (
    <>
      ${viewElement}
${jsonLdBlock}${crumbBlock}    </>
  );
}
`;
}

function locationWrapperSource(locale: Locale, segment: LocationSegment): string {
  const name = wrapperName(locale, segment === 'hub' ? 'LocationHub' : capitalize(segment));
  const depth = depthToWeb('location', segment);
  const dynamic: Partial<Record<LocationSegment, string>> = {
    country: '[country]',
    region: '[country]/[region]',
    city: '[country]/[region]/[city]',
    variant: '[country]/[region]/[city]/[variant]',
  };
  const paramNames: Partial<Record<LocationSegment, string[]>> = {
    country: ['country'],
    region: ['country', 'region'],
    city: ['country', 'region', 'city'],
    variant: ['country', 'region', 'city', 'variant'],
  };
  const params = (paramNames[segment] ?? []) as string[];
  const interfaceName = `${pascalLocale(locale)}${capitalize(segment)}PageProps`;
  const faq = segment === 'hub' ? '' : `      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}\n`;
  const city =
    segment === 'city' ? `      {jsonLd.city ? <JsonLd data={jsonLd.city} /> : null}\n` : '';
  const itemList =
    segment === 'variant'
      ? `      {jsonLd.itemList ? <JsonLd data={jsonLd.itemList} /> : null}\n`
      : '';

  if (segment === 'hub') {
    return `import type { Metadata } from 'next';

import { LocationView } from '${ups(depth)}components/location/LocationView';
import { JsonLd } from '${ups(depth)}lib/seo/JsonLdScript';
import { getServerCountry } from '${ups(depth)}lib/seo/geo';
import { localizeMetadata } from '${ups(depth)}lib/seo/metadata';
import {
  buildLocationViewData,
  hubEntry,
  locationJsonLd,
  locationMetadata,
} from '${ups(depth)}lib/seo/locationView';

/**
 * \`/${locale}/location\` — generated locale location hub (TASK-448).
 *
 * Mirrors the EN \`app/location/page.tsx\` wrapper. The hub entry is the
 * canonical EN hub; view data renders the active locale's body via
 * \`buildLocationViewData(entry, '${locale}')\` (per-locale content with
 * EN fallback — TASK-453) and threads the proxy-forwarded IP country
 * (\`getServerCountry()\`) so the "Browse locations" directory orders
 * IP-country → locale-language → alphabetical (TASK-480 contract, now
 * encoded in the generator template). Metadata is per-locale with EN
 * fallback (TASK-458): the EN hub copy stays (no translated hub content),
 * while canonical + hreflang localize to \`/${locale}/location\` with
 * \`x-default\` → EN canonical. Rendered per-request: the root layout
 * reads \`headers()\`, so SSG/ISR would crash with DYNAMIC_SERVER_USAGE.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = (() => {
  const entry = hubEntry();
  if (!entry) {
    return {};
  }
  return localizeMetadata(locationMetadata(entry), '${locale}', entry.path);
})();

export default async function ${name}() {
  const entry = hubEntry();
  if (!entry) {
    return null;
  }
  const data = buildLocationViewData(entry, '${locale}', await getServerCountry());
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
      {jsonLd.faq ? <JsonLd data={jsonLd.faq} /> : null}
    </>
  );
}
`;
  }

  const paramsType = params.map((name) => `${name}: string`).join('; ');
  const paramsObject = params.join(', ');

  return `import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LocationView } from '${ups(depth)}components/location/LocationView';
import { JsonLd } from '${ups(depth)}lib/seo/JsonLdScript';
import { localizeMetadata } from '${ups(depth)}lib/seo/metadata';
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
} from '${ups(depth)}lib/seo/locationView';

/**
 * \`/${locale}/location/${dynamic[segment]}\` — generated locale location
 * ${capitalize(segment)} page (TASK-448, TASK-453, TASK-458).
 *
 * Mirrors the EN \`app/location/${dynamic[segment]}/page.tsx\` wrapper:
 * the active locale's committed entry resolves first
 * (\`resolveLocationEntry(params, '${locale}')\`), EN entry otherwise —
 * view data renders the active locale's body via
 * \`buildLocationViewData(entry, '${locale}')\` (per-locale content with
 * EN fallback), and unknown slugs with no EN entry → \`notFound()\`.
 * Metadata is per-locale with EN fallback (TASK-458): the locale entry's
 * committed title/description/OG win when it exists; otherwise the EN
 * copy is used with canonical + hreflang localized to
 * \`/${locale}/location/${dynamic[segment]}\` (\`x-default\` → EN
 * canonical). Rendered per-request: the root layout reads \`headers()\`,
 * so SSG/ISR would crash with DYNAMIC_SERVER_USAGE.
 */
export const dynamic = 'force-dynamic';

interface ${interfaceName} {
  params: Promise<{ ${paramsType} }>;
}

export async function generateMetadata({ params }: ${interfaceName}): Promise<Metadata> {
  const { ${paramsObject} } = await params;
  const localeEntry = resolveLocationEntry({ ${paramsObject} }, '${locale}');
  const entry = localeEntry ?? resolveLocationEntry({ ${paramsObject} });
  if (!entry) {
    return {};
  }
  return localeEntry
    ? locationMetadata(localeEntry)
    : localizeMetadata(locationMetadata(entry), '${locale}', entry.path);
}

export default async function ${name}({ params }: ${interfaceName}) {
  const { ${paramsObject} } = await params;
  const entry = resolveLocationEntry({ ${paramsObject} });
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, '${locale}');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
${faq}${city}${itemList}    </>
  );
}
`;
}

function guideHubWrapperSource(locale: Locale): string {
  const name = wrapperName(locale, 'GuidesHub');
  return `import type { Metadata } from 'next';

import { JsonLd } from '${ups(3)}lib/seo/JsonLdScript';
import {
  guideHubFaq,
  guideHubMetadata,
  guideHubPath,
  guidePageEntriesWithFallback,
} from '${ups(3)}lib/seo/guides';
import { breadcrumbList, faqPage } from '${ups(3)}lib/seo/jsonLd';
import { GuidesHubView } from '../../guides/guides-hub-view';

/**
 * \`/${locale}/guides\` — generated locale guide hub (TASK-453, TASK-458).
 *
 * Lists EVERY guide; each card's title/description resolves the active
 * locale's committed content with EN fallback
 * (\`guidePageEntriesWithFallback('${locale}')\`), matching the
 * EN-fallback contract on every \`/<locale>/**\` page. Metadata is
 * per-locale with EN fallback (TASK-458): the hub copy stays EN (no
 * translated hub content exists), while canonical + hreflang localize to
 * \`/${locale}/guides\` with \`x-default\` → EN canonical
 * (\`guideHubMetadata\`). The visible FAQ (G-12) resolves per-locale via
 * \`guideHubFaq\` and is mirrored 1:1 in the \`FAQPage\` JSON-LD.
 */
export const metadata: Metadata = guideHubMetadata('${locale}');

export default function ${name}() {
  const entries = guidePageEntriesWithFallback('${locale}');
  const faq = guideHubFaq('${locale}');
  return (
    <>
      <GuidesHubView entries={entries} faq={faq} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/${locale}' },
          { name: 'Guides', path: guideHubPath('${locale}') },
        ])}
      />
      <JsonLd data={faqPage(faq)} />
    </>
  );
}
`;
}

function guideSlugWrapperSource(locale: Locale): string {
  const name = wrapperName(locale, 'Guide');
  const interfaceName = `${pascalLocale(locale)}GuidePageProps`;
  return `import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '${ups(4)}lib/seo/JsonLdScript';
import {
  GUIDE_SLUGS,
  guideHubPath,
  guidePageEntry,
  guidePageForLocale,
  guidePageMetadata,
} from '${ups(4)}lib/seo/guides';
import { breadcrumbList, faqPage } from '${ups(4)}lib/seo/jsonLd';
import { GuideView } from '../../../guides/[slug]/guide-view';

/**
 * \`/${locale}/guides/[slug]\` — generated locale L1 how-to guide page
 * (TASK-453, TASK-458).
 *
 * Mirrors the canonical EN guide route: the active locale's committed
 * content resolves first, EN fallback otherwise
 * (\`guidePageForLocale(slug, '${locale}') ?? guidePageForLocale(slug)\`).
 * Unknown slugs (no locale content AND no EN content) → \`notFound()\`.
 * Metadata is per-locale with EN fallback (TASK-458): the locale entry's
 * committed title/description/OG win when it exists; otherwise the EN
 * copy is used while canonical + hreflang stay on
 * \`/${locale}/guides/[slug]\` with \`x-default\` → EN canonical.
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

interface ${interfaceName} {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ${interfaceName}): Promise<Metadata> {
  const { slug } = await params;
  const entry = guidePageEntry(slug, '${locale}') ?? guidePageEntry(slug);
  if (!entry) {
    return {};
  }
  return guidePageMetadata(entry, '${locale}');
}

export default async function ${name}({ params }: ${interfaceName}) {
  const { slug } = await params;
  const page = guidePageForLocale(slug, '${locale}') ?? guidePageForLocale(slug);
  if (!page) {
    notFound();
  }
  const { entry, content } = page;

  return (
    <>
      <GuideView entry={entry} content={content} />
      <JsonLd
        data={breadcrumbList([
          { name: 'Home', path: '/${locale}' },
          { name: 'Guides', path: guideHubPath('${locale}') },
          { name: entry.heading, path: entry.path },
        ])}
      />
      <JsonLd data={faqPage(content.faq)} />
    </>
  );
}
`;
}

/* ------------------------------------------------------------------ *
 * Route plan + writer
 * ------------------------------------------------------------------ */

export interface PlannedRoute {
  locale: Locale;
  page: string;
  /** Wrapper path relative to `apps/web/`. */
  file: string;
}

/** Page name for a static route ('' → 'home'). */
function pageNameForRoute(route: string): string {
  return route === '' ? 'home' : route;
}

/** The complete deterministic route plan — 21 locales × 17 pages
 *  (10 static + 5 location + guide hub + guide detail). */
export function routePlan(): PlannedRoute[] {
  const plan: PlannedRoute[] = [];
  for (const locale of LOCALES) {
    for (const page of STATIC_PAGES) {
      plan.push({
        locale,
        page: pageNameForRoute(page.route),
        file: wrapperFile(locale, page.route),
      });
    }
    for (const segment of LOCATION_SEGMENTS) {
      plan.push({
        locale,
        page: segment === 'hub' ? 'location' : `location-${segment}`,
        file: locationFile(locale, segment),
      });
    }
    plan.push({ locale, page: 'guides', file: guideFile(locale, 'hub') });
    plan.push({ locale, page: 'guides-slug', file: guideFile(locale, 'slug') });
  }
  return plan;
}

/** Static page spec for a planned route page name. */
function staticPageForName(page: string): StaticPageSpec {
  const spec = STATIC_PAGES.find((candidate) => pageNameForRoute(candidate.route) === page);
  if (!spec) {
    throw new Error(`[generate-locale-routes] no static page spec for "${page}"`);
  }
  return spec;
}

/** Location segment for a planned route page name. */
function segmentForPage(page: string): LocationSegment {
  const segment = page === 'location' ? 'hub' : page.slice('location-'.length);
  if (!(LOCATION_SEGMENTS as readonly string[]).includes(segment)) {
    throw new Error(`[generate-locale-routes] no location segment for "${page}"`);
  }
  return segment as LocationSegment;
}

/** Fix the breadcrumb `Home` path in existing non-EN guide wrappers
 *  (TASK-448d) — `/{locale}/guides` surfaces must link Home → `/<locale>`.
 *  Returns file paths relative to `apps/web` (with the `app/` prefix). */
export function fixGuideBreadcrumbs(appDir: string): string[] {
  const fixed: string[] = [];
  for (const locale of LOCALES) {
    if (locale === 'en') continue;
    for (const file of [
      join(appDir, locale, 'guides', 'page.tsx'),
      join(appDir, locale, 'guides', '[slug]', 'page.tsx'),
    ]) {
      if (!existsSync(file)) continue;
      const source = readFileSync(file, 'utf8');
      const marker = `{ name: 'Home', path: '/' },`;
      const replacement = `{ name: 'Home', path: '/${locale}' },`;
      if (source.includes(marker) && !source.includes(replacement)) {
        writeFileSync(file, source.replace(marker, replacement));
        fixed.push(`app/${relative(appDir, file)}`);
      }
    }
  }
  return fixed;
}

export interface WriteResult {
  generated: string[];
  skippedExisting: string[];
  guideBreadcrumbFixes: string[];
}

/** Deterministically write every planned wrapper (SKIP existing unless
 *  `force`), fix guide breadcrumbs, and emit the manifest. Returns the
 *  per-file disposition for the committed manifest. `webRootPath` is the
 *  `apps/web` package root — plan file paths are relative to it (they
 *  carry the leading `app/` segment). */
export async function writeAll(webRootPath: string, force = false): Promise<WriteResult> {
  const appDir = join(webRootPath, 'app');
  const generated: string[] = [];
  const skippedExisting: string[] = [];
  for (const { locale, page, file } of routePlan()) {
    const target = join(webRootPath, file);
    if (existsSync(target) && !force) {
      skippedExisting.push(file);
      continue;
    }
    mkdirSync(dirname(target), { recursive: true });
    const source = page.startsWith('location')
      ? locationWrapperSource(locale, segmentForPage(page))
      : page === 'guides'
        ? guideHubWrapperSource(locale)
        : page === 'guides-slug'
          ? guideSlugWrapperSource(locale)
          : staticWrapperSource(locale, staticPageForName(page));
    writeFileSync(target, source);
    generated.push(file);
  }
  const guideBreadcrumbFixes = fixGuideBreadcrumbs(appDir);
  return { generated, skippedExisting, guideBreadcrumbFixes };
}

/* ------------------------------------------------------------------ *
 * Manifest + CLI
 * ------------------------------------------------------------------ */

/** Committed manifest — a deterministic snapshot of the route tree and its
 *  ownership (stable across runs, never a run log):
 *   - `generated`: every planned wrapper owned by this generator (TASK-453
 *     regenerated the full location + guide surface, so the set is complete),
 *   - `preExisting`: files maintained outside the generator (none today),
 *   - `guideBreadcrumbsFixed`: every non-EN guide wrapper with the
 *     `Home` → `/<locale>` breadcrumb. */
export function manifestFrom(result: WriteResult) {
  const generated = routePlan()
    .map((entry) => entry.file)
    .filter((file) => !PRE_EXISTING_FILES.has(file))
    .sort();
  return {
    schema: 'joinorigin-locale-routes-v1',
    locales: [...LOCALES],
    pageCount: routePlan().length,
    generated,
    preExisting: [...PRE_EXISTING_FILES].sort(),
    guideBreadcrumbsFixed: guideWrapperFiles().sort(),
    lastRun: {
      generated: result.generated.length,
      skippedExisting: result.skippedExisting.length,
      guideBreadcrumbFixes: result.guideBreadcrumbFixes.length,
    },
  };
}

function webRoot(): string {
  // The script lives at apps/web/scripts/generate-locale-routes.ts.
  return dirname(dirname(fileURLToPath(import.meta.url)));
}

async function main(): Promise<void> {
  const root = webRoot();
  const force = process.argv.includes('--force');
  const result = await writeAll(root, force);
  writeFileSync(
    join(root, 'locale-routes.manifest.json'),
    `${JSON.stringify(manifestFrom(result), null, 2)}\n`,
  );
  const plan = routePlan();
  process.stdout.write(
    [
      `[generate-locale-routes] planned ${plan.length} wrappers (${LOCALES.length} locales × ${plan.length / LOCALES.length} pages)`,
      `  generated: ${result.generated.length}`,
      `  skipped (existing, no clobber): ${result.skippedExisting.length}`,
      `  guide breadcrumb fixes: ${result.guideBreadcrumbFixes.length}`,
      '  manifest: apps/web/locale-routes.manifest.json',
    ].join('\n') + '\n',
  );
}

// Run only when invoked as the CLI entry point (never on import in tests).
const isEntry =
  process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isEntry) {
  main().catch((error: unknown) => {
    process.stderr.write(`[generate-locale-routes] ${String(error)}\n`);
    process.exitCode = 1;
  });
}
