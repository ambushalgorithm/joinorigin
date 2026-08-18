#!/usr/bin/env node
/**
 * generate-locale-routes — deterministic `app/<locale>/**` route-tree
 * generator (Rule 12, TASK-448).
 *
 * Input tables (committed here, mirroring the codebase):
 *   - LOCALES = SUPPORTED_LOCALES (21: en + 20 translations) from
 *     `@joinorigin/i18n` — single source of truth for the locale matrix.
 *   - STATIC_PAGES = every public non-location page (home, features,
 *     community, docs, about, contact, privacy, terms, glossary).
 *   - LOCATION_SEGMENTS = the 5 location page kinds (hub, [country],
 *     [country]/[region], [country]/[region]/[city],
 *     [country]/[region]/[city]/[variant]).
 *
 * Output for every locale × page: `app/<locale>/<route>/page.tsx`
 * wrapper mirroring the EN wrapper — `createMetadata({ path:
 * '/<locale>/<route>' })` (or `locationMetadata(entry)` for location
 * pages), breadcrumb `Home` → `/<locale>`, rendering the shared view
 * (per-locale content resolves via the existing loaders).
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
    title: 'JoinOrigin — Social Collaboration Network & Community OS',
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
    title: 'Features — Communities, Chat, Projects & Opportunities | JoinOrigin',
    description:
      "Explore Origin's features: profiles, ideas, communities, chat, feed, projects, and opportunities — a social collaboration network for real outcomes.",
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
    route: 'community',
    name: 'Community',
    viewModule: '../../community/community-view',
    viewName: 'CommunityView',
    crumb: 'Community',
    title: 'Community — Find Your People & Build Together | JoinOrigin',
    description:
      "Join Origin's social collaboration network of 2,400+ builders. Start or join a community around any idea — a small business, an AI startup, a book club.",
    keywords: [
      'online communities',
      'join a community',
      'communities for founders',
      'community for AI builders',
      'find your community',
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
      'Learn how Origin works: profiles, ideas, communities, chat, projects, and opportunities. Explore the roadmap, tech stack, Matrix standards, and FAQ.',
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
      "Origin's mission: a social collaboration network where people post ideas, form communities, and build projects together. The network is the product.",
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
      'Questions about JoinOrigin or starting a community? Contact the team — we reply within 2 business days.',
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
      'Learn the core terms of community building — community, community manager, community OS, moderation, onboarding, activation, engagement loop, hybrid events, and co-founder.',
    keywords: [
      'community glossary',
      'community manager',
      'community OS',
      'community terms',
      'hybrid events',
    ],
  },
];

/** Location page kinds — the 5 segment surfaces under `/<locale>/location`. */
const LOCATION_SEGMENTS = ['hub', 'country', 'region', 'city', 'variant'] as const;
type LocationSegment = (typeof LOCATION_SEGMENTS)[number];

/** Files that pre-date TASK-448 and are maintained outside this generator
 *  (the committed Berlin de location surface — never clobbered). */
const PRE_EXISTING_FILES = new Set([
  'app/de/location/[country]/[region]/[city]/page.tsx',
  'app/de/location/[country]/[region]/[city]/[variant]/page.tsx',
]);

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

  return `import type { Metadata } from 'next';

${jsonLdScriptImport}${jsonLdImport}import { createMetadata } from '${ups(depth)}lib/seo/metadata';
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
 */
export const metadata: Metadata = createMetadata({
  title: ${js(page.title)},
  description: ${description},
  path: ${js(`/${locale}${routePath}`)},
  keywords: ${jsArray(page.keywords)},
});

export default function ${name}() {
  return (
    <>
      <${page.viewName} />
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
  const itemList =
    segment === 'variant'
      ? `      {jsonLd.itemList ? <JsonLd data={jsonLd.itemList} /> : null}\n`
      : '';

  if (segment === 'hub') {
    return `import type { Metadata } from 'next';

import { LocationView } from '${ups(depth)}components/location/LocationView';
import { JsonLd } from '${ups(depth)}lib/seo/JsonLdScript';
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
 * canonical EN hub (per-locale location entries exist only where committed
 * content is registered); view data renders the active locale's chrome via
 * \`buildLocationViewData(entry, '${locale}')\`.
 */
export const revalidate = 2592000;

export const metadata: Metadata = (() => {
  const entry = hubEntry();
  return entry ? locationMetadata(entry) : {};
})();

export default async function ${name}() {
  const entry = hubEntry();
  if (!entry) {
    return null;
  }
  const data = buildLocationViewData(entry, '${locale}');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
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
import {
  buildLocationViewData,
  locationJsonLd,
  locationMetadata,
  resolveLocationEntry,
  warmParamsForLocale,
} from '${ups(depth)}lib/seo/locationView';

/**
 * \`/${locale}/location/${dynamic[segment]}\` — generated locale location
 * ${capitalize(segment)} page (TASK-448).
 *
 * Mirrors the EN \`app/location/${dynamic[segment]}/page.tsx\` wrapper with
 * the locale fixed: \`warmParamsForLocale\` enumerates only committed
 * per-locale entries, unknown slugs → \`notFound()\` (localization R5),
 * and metadata comes from \`locationMetadata(entry)\`.
 */
export const revalidate = 2592000;

export const dynamicParams = true;

export function generateStaticParams() {
  return warmParamsForLocale('${segment}', '${locale}');
}

interface ${interfaceName} {
  params: Promise<{ ${paramsType} }>;
}

export async function generateMetadata({ params }: ${interfaceName}): Promise<Metadata> {
  const { ${paramsObject} } = await params;
  const entry = resolveLocationEntry({ ${paramsObject} }, '${locale}');
  if (!entry) {
    return {};
  }
  return locationMetadata(entry);
}

export default async function ${name}({ params }: ${interfaceName}) {
  const { ${paramsObject} } = await params;
  const entry = resolveLocationEntry({ ${paramsObject} }, '${locale}');
  if (!entry) {
    notFound();
  }
  const data = buildLocationViewData(entry, '${locale}');
  const jsonLd = locationJsonLd(data);
  return (
    <>
      <LocationView data={data} />
      {jsonLd.breadcrumbs ? <JsonLd data={jsonLd.breadcrumbs} /> : null}
${faq}${itemList}    </>
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

/** The complete deterministic route plan — 21 locales × 14 pages. */
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
 *   - `generated`: every planned wrapper owned by this generator,
 *   - `preExisting`: files maintained outside the generator (de Berlin
 *     location surface),
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
