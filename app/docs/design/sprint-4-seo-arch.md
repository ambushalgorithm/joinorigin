# Sprint 4 — JoinOrigin SEO & Analytics Architecture

> **Parent:** [`../README.md`](../README.md) · **Design docs index:** [`./README.md`](./README.md) · **Content strategy:** [`sprint-4-discovery.md`](./sprint-4-discovery.md) (produced by `discovery-seo`) · **Consumers:** `fe-seo` (TASK-216), `fe-analytics` (TASK-217), `fe-menu-pages` (TASK-215) · **Verifier:** `e2e-seo` (TASK-218)

## 1. Purpose

This document is the **build-ready technical architecture** for the Sprint 4
full-stack SEO and analytics work on the JoinOrigin web app (`apps/web`,
Next.js 14 App Router + React 18 + React Native Web + styled-components v6).

It defines:

1. **Config-driven multi-tracker analytics** — a shared `TrackerAdapter`
   interface, a Plausible (self-hosted, default), Umami (self-hosted, opt-in),
   and GA4 adapter, a declarative analytics config file resolved from
   environment variables, and a client-side `AnalyticsProvider` with a formal
   mount contract.
2. **Full-stack SEO** — per-page metadata pattern, Open Graph / Twitter cards,
   `sitemap.xml`, `robots.txt`, JSON-LD structured data, canonical URLs, and
   `llms.txt`.
3. **Core Web Vitals / performance budgets** — LCP / CLS / INP budgets and
   styled-components SSR considerations for the new menu pages.
4. **LLM-crawler friendliness** — semantic HTML, heading discipline, readable
   copy requirements, and structured data so the site is first-class content
   for LLM crawlers (GEO/LLMSEO).

This is a **design document only**. It specifies file paths, interfaces,
schemas, and contracts so `fe-seo` and `fe-analytics` can implement directly
without further architectural decisions.

### 1.1 Scope boundaries

- **In scope:** analytics config + adapters + provider; metadata/OG/Twitter;
  sitemap/robots/JSON-LD/canonical/llms.txt; CWV budgets; LLM-crawler rules.
- **Explicitly deferred:** cookie-consent / consent banner (later sprint — the
  analytics system must be built so a consent gate can be added without
  changing adapters). **No consent logic in this sprint.**
- **Not in scope:** content strategy, copy, or keyword selection — see
  `sprint-4-discovery.md`.
- **No new runtime dependencies** for analytics: adapters inject their own
  scripts at runtime. No `next/script` config beyond what the adapters need.

### 1.2 Conventions this design relies on (already in the repo)

| Convention | Where enforced |
|---|---|
| Next.js 14 App Router, React 18 | `apps/web/package.json`, `apps/web/app/` |
| styled-components v6 SSR with deterministic component IDs | `next.config.mjs` → `compiler.styledComponents` (TASK-209) |
| Hardened server-side style flush | `apps/web/app/registry.tsx` (TASK-208) |
| Design tokens from `@joinorigin/design` | `packages/design/src/theme.ts` |
| Locally hosted fonts (no Google Fonts at runtime) | `/fonts/inter.css`, `/fonts/urbanist.css` |
| Locally hosted brand assets | `apps/web/public/assets/logo/*` (TASK-214 extends this with favicon set) |
| Client pages render through `NativeThemeProvider` + `DomThemeProvider` | `apps/web/app/page.tsx` |

---

## 2. Analytics Architecture — Config-Driven Multi-Tracker

### 2.1 Goal

A single analytics subsystem that can run **any combination** of trackers
(Plausible self-hosted, Umami self-hosted, GA4) **from configuration alone —
zero code change** when the tracker mix changes. A site operator flips a flag
or sets an env var; the provider instantiates the enabled adapters and starts
reporting.

```
┌────────────────────────────────────────────────────────────┐
│  apps/web/lib/analytics                                    │
│                                                            │
│  config.ts ──► resolves AnalyticsConfig (env + defaults)   │
│     │                                                      │
│     ▼                                                      │
│  index.ts ──► createAnalytics(config)                      │
│     │                                                      │
│     ├──► TrackerAdapter (interface)                        │
│     │        ├── PlausibleAdapter  (self-hosted, default)  │
│     │        ├── UmamiAdapter      (self-hosted, opt-in)   │
│     │        └── Ga4Adapter        (Google Analytics 4)    │
│     │                                                      │
│     ▼                                                      │
│  AnalyticsProvider.tsx (client component)                  │
│     │   mounts in root layout (fe-seo, TASK-216)           │
│     │   tracks page views on route change                  │
│     ▼                                                      │
│  trackEvent(name, props)  →  all enabled adapters          │
└────────────────────────────────────────────────────────────┘
```

### 2.2 File layout under `apps/web/lib/analytics`

```
apps/web/lib/analytics/
├── types.ts                # TrackerAdapter, AnalyticsTrackerConfig, AnalyticsConfig, TrackEvent
├── config.ts               # resolveAnalyticsConfig(): AnalyticsConfig  (env + defaults)
├── scriptLoader.ts         # loadScript(src, attrs): Promise<void>  (DOM injection helper)
├── adapters/
│   ├── plausible.ts        # PlausibleAdapter  (self-hosted)
│   ├── umami.ts            # UmamiAdapter      (self-hosted)
│   ├── ga4.ts              # Ga4Adapter        (Google Analytics 4)
│   └── index.ts            # createAdapters(config) → TrackerAdapter[]  (registry/selection)
├── AnalyticsProvider.tsx   # 'use client' provider — mounts in root layout
├── index.ts                # public API: AnalyticsProvider, trackEvent, resolveAnalyticsConfig, __getTrackersForTests
└── __tests__/
    ├── config.test.ts      # env parsing, defaults, overrides, validation
    ├── adapters.test.ts    # selection, init, disabled handling, unknown-kind rejection
    └── provider.test.ts    # mounts, page-view dispatch on route change (mock)
```

### 2.3 Config schema

The **config file** is `config.ts`. It reads a single optional JSON override
from the environment and merges it over **built-in defaults**. This keeps the
"config-driven" property: changing the tracker mix never requires code edits.

```ts
// apps/web/lib/analytics/types.ts

/** Per-tracker declaration in the analytics config. */
export interface AnalyticsTrackerConfig {
  /** Stable id used in logs and tests, e.g. 'plausible'. */
  id: string;
  /** Adapter kind. */
  kind: 'plausible' | 'umami' | 'ga4';
  /** Master switch. Disabled trackers are ignored (no script, no events). */
  enabled: boolean;
  /** Plausible: site domain reported with events (e.g. 'joinorigin.com'). */
  domain?: string;
  /** Plausible (self-hosted): API origin, e.g. 'https://analytics.joinorigin.com'. */
  apiHost?: string;
  /** Umami: website id from the Umami dashboard. */
  websiteId?: string;
  /** Umami (self-hosted): script origin, e.g. 'https://analytics.joinorigin.com'. */
  hostUrl?: string;
  /** GA4: measurement id, e.g. 'G-XXXXXXX'. */
  measurementId?: string;
}

export interface AnalyticsConfig {
  trackers: AnalyticsTrackerConfig[];
  /** Track page views automatically on route change (default true). */
  trackPageViews?: boolean;
}

export interface TrackEvent {
  name: string;
  props?: Record<string, string | number | boolean | undefined>;
}
```

### 2.4 Config resolution (`config.ts`)

Resolution order (lowest → highest precedence):

1. **Built-in defaults** — the shipped default config:
   - `plausible` — **enabled**, kind `plausible`, domain from
     `NEXT_PUBLIC_SITE_DOMAIN` (or `localhost` in dev), apiHost from
     `NEXT_PUBLIC_PLAUSIBLE_API_HOST` (default `https://analytics.joinorigin.com`).
   - `umami` — **disabled** by default, configured only if
     `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set.
   - `ga4` — **disabled** by default, configured only if
     `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set.
2. **`NEXT_PUBLIC_ANALYTICS_JSON`** — optional full JSON config
   (`{"trackers":[{...}], "trackPageViews": true}`). When present it **replaces**
   the tracker list entirely (explicit operator override). Used by tests and
   advanced deployments.

```ts
// apps/web/lib/analytics/config.ts (implementation shape)
export function resolveAnalyticsConfig(): AnalyticsConfig {
  const explicit = process.env.NEXT_PUBLIC_ANALYTICS_JSON;
  if (explicit) {
    return parseAndValidate(explicit); // throws on malformed/unknown kind
  }
  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'localhost';
  const trackers: AnalyticsTrackerConfig[] = [
    {
      id: 'plausible',
      kind: 'plausible',
      enabled: true,
      domain,
      apiHost: process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST ?? 'https://analytics.joinorigin.com',
    },
  ];
  if (process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID) {
    trackers.push({
      id: 'umami',
      kind: 'umami',
      enabled: true,
      websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
      hostUrl: process.env.NEXT_PUBLIC_UMAMI_HOST_URL ?? 'https://analytics.joinorigin.com',
    });
  }
  if (process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID) {
    trackers.push({
      id: 'ga4',
      kind: 'ga4',
      enabled: true,
      measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    });
  }
  return { trackers, trackPageViews: true };
}
```

**Validation rules (must be unit-tested):**
- Malformed `NEXT_PUBLIC_ANALYTICS_JSON` → throw at module init (fails fast,
  never silently disables analytics).
- Unknown `kind` → throw.
- `enabled: true` with missing required field (`domain` for plausible,
  `websiteId` for umami, `measurementId` for ga4) → throw.
- Trackers with duplicate `id` → throw.
- Empty tracker list → valid, provider is a no-op (renders children, injects
  nothing).

### 2.5 `TrackerAdapter` interface (`types.ts`)

Every tracker implements this single shared interface. **No analytics code
outside the adapters may touch `window`, `document`, or vendor globals.**

```ts
export interface TrackerAdapter {
  readonly id: string;
  readonly kind: 'plausible' | 'umami' | 'ga4';

  /** Load vendor script + set up globals. Called once on client mount. */
  init(config: AnalyticsTrackerConfig): void | Promise<void>;

  /** Report a page view for the given path. */
  trackPageView(path: string): void;

  /** Report a custom event with optional props. */
  trackEvent(event: TrackEvent): void;
}
```

**Contract rules for adapters:**
- All DOM access must be guarded with `typeof window !== 'undefined'` — `init`
  may be invoked during a client effect only, but the guard keeps tests and
  SSR-safe builds honest.
- `init` must be idempotent (double-mount in StrictMode / HMR must not inject
  duplicate scripts or duplicate config pushes).
- Script injection is centralized in `scriptLoader.ts` so tests can stub it.
- Trackers must never throw on vendor-script load failure — degrade silently
  (log once to `console.debug`), because analytics must never break the page.

### 2.6 Adapter implementations (shape for fe-analytics)

**PlausibleAdapter (self-hosted, default):**
- `init`: inject `<script defer data-domain={domain} src={`${apiHost}/js/script.js`} />`
  via `scriptLoader`. Vendor exposes `window.plausible`.
- `trackPageView(path)`:
  `window.plausible?.('pageview', { u: absoluteUrl(path) })`.
- `trackEvent({name, props})`:
  `window.plausible?.(name, { props })`.
- Self-hosted note: `apiHost` points at the deployed Plausible instance
  (e.g. `https://analytics.joinorigin.com`); no third-party cookie context.

**UmamiAdapter (self-hosted, opt-in):**
- `init`: inject `<script defer src={`${hostUrl}/script.js`} data-website-id={websiteId} />`.
  Vendor exposes `window.umami`.
- `trackPageView(path)`: `window.umami?.track((location) => ({ ...location, url: path }))`
  (or rely on Umami's automatic view tracking when `autoTrack` is on — adapter
  sends an explicit pageview for consistency).
- `trackEvent({name, props})`: `window.umami?.track(name, props ?? {})`.

**Ga4Adapter (opt-in):**
- `init`: inject the gtag loader
  `<script async src="https://www.googletagmanager.com/gtag/js?id={measurementId}" />`
  then push `window.dataLayer = window.dataLayer || []; window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true, send_page_view: false });`
  (`send_page_view: false` — the provider drives page views explicitly so
  client-side navigation is reported correctly).
- `trackPageView(path)`: `window.gtag?.('event', 'page_view', { page_path: path })`.
- `trackEvent({name, props})`: `window.gtag?.('event', name, props ?? {})`.

### 2.7 `AnalyticsProvider` and the **mount contract**

`AnalyticsProvider` is a **client component** that:
- Resolves config once (module-level cache of `resolveAnalyticsConfig()`).
- On mount (client only), calls `init()` on every enabled adapter.
- Subscribes to `usePathname()` and dispatches `trackPageView` on changes
  (skip the first dispatch only when the vendor script also auto-tracks — for
  consistency, always dispatch; adapters are idempotent per route).
- Renders `{children}` unchanged — **zero visual output**.

**Public API (`apps/web/lib/analytics/index.ts`):**

```ts
export { AnalyticsProvider } from './AnalyticsProvider';
export { resolveAnalyticsConfig } from './config';
export { trackEvent } from './tracker-runtime'; // client-only, delegates to created adapters
```

**Mount contract (fe-analytics → fe-seo):** fe-seo mounts the provider in
`apps/web/app/layout.tsx` exactly as:

```tsx
<body>
  <Registry>
    <AnalyticsProvider>{children}</AnalyticsProvider>
  </Registry>
</body>
```

- `AnalyticsProvider` is a **client** component and must be imported with the
  `'use client'` boundary intact (no server-only APIs inside `lib/analytics`).
- It accepts **no required props**; optional `trackPageViews?: boolean`
  (default from config, normally `true`).
- `fe-seo` must not duplicate the provider or add its own script tags.
- `fe-analytics` owns `apps/web/lib/analytics/**` + its tests; `fe-seo` owns
  the one-line mount in `layout.tsx` (plus site-wide metadata, sitemap,
  robots, JSON-LD, llms.txt).

**Programmatic events:** `trackEvent('signup_click', { source: 'hero' })` may
be imported by client components (e.g. waitlist modal CTA in a later task) —
the runtime forwards to all enabled adapters and is a no-op if none are
enabled or if called during SSR.

### 2.8 Tests required for fe-analytics

| Test file | Covers |
|---|---|
| `config.test.ts` | Default config (plausible enabled, umami/ga4 disabled without env); JSON override replaces tracker list; malformed JSON throws; unknown kind throws; missing required field throws; duplicate id throws; empty list is valid no-op |
| `adapters.test.ts` | Only enabled trackers instantiated; init called once per enabled tracker (idempotent); disabled tracker never injects script; unknown kind rejected at selection; script loader stubbed to assert src/attrs per adapter |
| `provider.test.ts` | Renders children unchanged; dispatches `pageview` on pathname change; no-op when no trackers enabled; SSR-safe (no window access during render) |

**Test double guidance:** stub `scriptLoader.loadScript`, set
`NEXT_PUBLIC_ANALYTICS_JSON` in `process.env` before importing config (jest
module reset between tests), and stub `usePathname` via
`next/navigation` mock.

---

## 3. Full-Stack SEO Architecture

### 3.1 File layout under `apps/web`

```
apps/web/
├── app/
│   ├── layout.tsx             # site metadata, OG/Twitter defaults, icons, canonical base,
│   │                          # AnalyticsProvider mount, Organization+WebSite JSON-LD, fonts
│   ├── page.tsx               # home (client component — site metadata covers it; no changes required)
│   ├── sitemap.ts             # → /sitemap.xml  (MetadataRoute.Sitemap)
│   ├── robots.ts              # → /robots.txt   (MetadataRoute.Robots)
│   ├── llms.txt.ts            # → /llms.txt     (route handler — see §3.9)
│   ├── about/
│   │   ├── page.tsx           # server wrapper: exports metadata + <AboutView/> + BreadcrumbList JSON-LD
│   │   └── about-view.tsx     # 'use client' UI component (fe-menu-pages)
│   ├── features/…             # mirror of the about pattern
│   ├── community/…            # mirror
│   ├── pricing/…              # mirror (FAQPage JSON-LD only — no Offer markup)
│   ├── docs/…                 # mirror (markdown variants per discovery §8)
│   ├── contact/…              # mirror + ContactPage JSON-LD
│   ├── privacy/…              # mirror (static legal page)
│   └── terms/…                # mirror (static legal page)
└── lib/
    ├── analytics/…            # §2.2
    └── seo/
        ├── site.ts            # SITE constants (name, url, description, social handle, images)
        ├── url.ts             # absoluteUrl(path) — respects NEXT_PUBLIC_SITE_URL
        ├── routes.ts          # ROUTES — single source of truth for nav, sitemap, metadata
        ├── metadata.ts        # createMetadata(input) → Metadata
        ├── jsonLd.ts          # typed JSON-LD builders (organization, website, breadcrumbList, faq, contactPage)
        ├── JsonLd.tsx         # <JsonLd data={...} /> — renders <script type="application/ld+json">
        └── __tests__/metadata.test.ts
```

### 3.2 Site constants and URL helper (`lib/seo/site.ts`, `lib/seo/url.ts`)

```ts
// lib/seo/site.ts
export const SITE = {
  name: 'JoinOrigin',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3100',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'joinorigin.com',
  description:
    'JoinOrigin brings your community, projects, and conversations into one calm workspace — so your best work finally has a home.',
  twitterHandle: '@joinorigin', // update if a real handle is provisioned
  ogImage: '/assets/og/og-default.png', // fe-branding or fe-seo to provide; see §3.5
};
```

```ts
// lib/seo/url.ts
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}
```

**Single source of truth for routes (`lib/seo/routes.ts`):**

```ts
export const ROUTES = [
  { path: '/', title: 'JoinOrigin — Where teams find their origin' },
  { path: '/features', title: 'JoinOrigin Features' },
  { path: '/community', title: 'JoinOrigin Community' },
  { path: '/pricing', title: 'JoinOrigin Pricing' },
  { path: '/docs', title: 'JoinOrigin Docs' },
  { path: '/about', title: 'About JoinOrigin' },
  { path: '/contact', title: 'Contact JoinOrigin' },
  { path: '/privacy', title: 'Privacy Policy' },
  { path: '/terms', title: 'Terms of Service' },
] as const;
```

- The 9-page tree above is the **discovery recommendation** (header nav:
  Features · Community · Pricing · Docs · About; footer groups
  Product/Company/Legal, e.g. `/about`, `/contact`, `/privacy`, `/terms`).
  fe-menu-pages builds pages for the discovery set; `sitemap.ts`, `robots.ts`,
  the header/footer nav, and metadata builders all read from `ROUTES` — a page
  added to `ROUTES` is automatically in the sitemap and canonical links.
  **No duplicated URL lists.**
- **Sprint 4 pages:** `/features`, `/community`, `/pricing`, `/docs`, `/about`,
  `/contact`, `/privacy`, `/terms` (plus the existing `/`). `/docs` may be a
  stub route pointing at the public `/docs/*.md` markdown variants per the
  discovery LLM-crawler plan (§8) — fe-menu-pages/fe-seo follow
  `sprint-4-discovery.md` for the exact scope.

### 3.3 Per-page metadata pattern

**Rule: every page that needs metadata must be a server component that exports
`metadata` (or `generateMetadata`).** The existing home page (`app/page.tsx`)
is a client component and keeps the site-wide metadata from `layout.tsx`.
All **new** menu pages follow the **server-wrapper pattern**:

```
app/about/page.tsx          ← server component (exports metadata, renders view + JSON-LD)
app/about/about-view.tsx    ← 'use client' component (actual UI)
```

```tsx
// app/about/page.tsx
import type { Metadata } from 'next';
import { createMetadata } from '../../lib/seo/metadata';
import { AboutView } from './about-view';
import { JsonLd } from '../../lib/seo/JsonLd';
import { breadcrumbList } from '../../lib/seo/jsonLd';

export const metadata: Metadata = createMetadata({
  title: 'About JoinOrigin',
  description:
    'Learn why JoinOrigin exists: a social collaboration network and community OS that gives teams a calm home for community, projects, and conversations.',
  path: '/about',
  keywords: ['social collaboration network', 'community OS', 'team workspace'],
});

export default function AboutPage() {
  return (
    <>
      <AboutView />
      <JsonLd data={breadcrumbList([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
    </>
  );
}
```

**`createMetadata` contract (`lib/seo/metadata.ts`):**

```ts
interface CreateMetadataInput {
  title: string;            // exact title (layout template appends ' · JoinOrigin')
  description: string;
  path: string;             // '/about', etc.
  keywords?: string[];
  image?: string;           // default SITE.ogImage
  type?: 'website' | 'article';
  robots?: { index: boolean; follow: boolean };
}

function createMetadata(input: CreateMetadataInput): Metadata {
  const url = absoluteUrl(input.path);
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE.name,
      type: input.type ?? 'website',
      images: [{ url: absoluteUrl(input.image ?? SITE.ogImage), width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [absoluteUrl(input.image ?? SITE.ogImage)],
    },
    robots: input.robots ?? { index: true, follow: true },
  };
}
```

**Root layout (`app/layout.tsx`) — site-wide defaults (fe-seo):**

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),               // relative URLs in metadata resolve here
  title: {
    default: SITE.name + ' — Where teams find their origin',
    template: '%s · JoinOrigin',                 // per-page titles get suffix
  },
  description: SITE.description,
  openGraph: { siteName: SITE.name, type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  // + <link rel="stylesheet" href="/fonts/..."> stays as-is in <head>
};
```

- The layout **must not** set a fixed `canonical` (that is per-page); it sets
  `metadataBase` so per-page canonical/OG URLs resolve absolutely.
- The layout renders `Organization` + `WebSite` JSON-LD once (see §3.6).
- `metadataBase` must be an absolute URL (never `'/'`).

### 3.4 Canonical URLs

- Every page sets `alternates.canonical` to `absoluteUrl(path)` via
  `createMetadata` — the canonical is always the exact page URL (no
  trailing-slash drift; the Next App Router routes are canonical without
  trailing slashes).
- The home page canonical is `absoluteUrl('/')`.
- Sitemap URLs and canonical URLs use the same `absoluteUrl` helper, so they
  can never disagree.

### 3.5 Open Graph / Twitter cards

- Site-wide defaults in `layout.tsx` (`og:site_name`, `og:type`,
  `twitter:card`).
- Per-page `openGraph` + `twitter` from `createMetadata`, each with a
  `1200×630` image.
- **OG image asset:** `apps/web/public/assets/og/og-default.png` (1200×630,
  JoinOrigin brand: mark + wordmark on the dark `#0F1115` canvas). fe-branding
  can reuse the social lockup; if the asset is not ready by fe-seo, fe-seo
  generates a simple branded PNG from the existing
  `joinorigin-logo.svg`/header lockup (a static asset committed to `public` —
  no runtime generation).
- **No external image hosts** for OG images (repo convention: all assets
  local).

### 3.6 JSON-LD structured data

**Rendering:** the `<JsonLd>` component renders
`<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`
server-side. It is safe because the input is a typed object constructed by
builders — no user input is ever interpolated.

**Builders (`lib/seo/jsonLd.ts`)** — typed, so invalid JSON-LD is a type error:

| Builder | Schema | Where mounted (per discovery §7) |
|---|---|---|
| `organization()` | `Organization` — name, url, logo, sameAs (socials if known) | `layout.tsx` (once, site-wide) |
| `website()` | `WebSite` — name, url, potentialAction `SearchAction` only if a real search route exists | `layout.tsx` (once) |
| `breadcrumbList(items)` | `BreadcrumbList` — path → `ItemList` entries with `@id` + `name` | every subpage (server wrapper) |
| `faqPage(questions)` | `FAQPage` — question/answer pairs from `sprint-4-discovery.md` FAQ (≤60-word answers) | Home, Features, Community, Pricing, Docs |
| `aboutPage()` | `AboutPage` — description from discovery content | `/about` |
| `contactPage()` | `ContactPage` — contact points (email, socials) | `/contact` |

**Discovery constraint:** **never** emit `Product`, `Offer`, or
`AggregateRating` in Sprint 4 (no fake prices/reviews). If a pricing page
exists it uses `FAQPage` + `BreadcrumbList` only — no `Offer` markup until a
real product/price exists.

**Rule:** JSON-LD must be **server-rendered** (never in a client-only effect)
so crawlers and LLMs see it in the initial HTML. Client pages that need
JSON-LD use the server-wrapper pattern (§3.3).

### 3.7 `sitemap.xml` (`app/sitemap.ts`)

```ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
```

- Served by Next at `/sitemap.xml` automatically (App Router convention).
- Reads from `ROUTES` — no drift with the nav.
- `lastModified` should ideally be a static constant (e.g. the sprint release
  date) rather than `new Date()` per request to keep the output deterministic
  for e2e assertions; fe-seo may pin it.
- **Acceptance (e2e):** `GET /sitemap.xml` → 200, XML containing
  `https://<site-url>/features`, `/community`, `/pricing`, `/docs`, `/about`,
  `/contact`, `/privacy`, `/terms`, and `/` (the full discovery route set).

### 3.8 `robots.txt` (`app/robots.ts`)

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/data/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
```

- `userAgent: '*'` covers standard crawlers **and** LLM crawlers (GPTBot,
  ClaudeBot, PerplexityBot, Google-Extended, etc.). No crawler is blocked —
  the Sprint 4 goal is maximum LLM-crawler friendliness.
- If a future sprint needs fine-grained crawl rules, it can move to an array
  of `rules` per agent without changing the route contract.
- **Acceptance (e2e):** `GET /robots.txt` → 200, contains `Sitemap: <absolute sitemap url>`.

### 3.9 `llms.txt` (`app/llms.txt.ts`)

**Discovery recommends:** YES — root `/llms.txt` following the **llms.txt v2
spec** (H1 title, blockquote summary, then H2 sections listing files as
markdown links). Served at `/llms.txt` via a route handler with
`Content-Type: text/plain; charset=utf-8`:

```
# JoinOrigin

> JoinOrigin is a social collaboration network and community OS that gives
> teams one calm workspace for community, projects, and conversations.

## About
- [About JoinOrigin](/about): why JoinOrigin exists and who it is for.

## Features
- [Features](/features): the workspace, community spaces, projects, conversations.

## Community
- [Community](/community): how members collaborate and what the network offers.

## Contact
- [Contact](/contact): how to reach the team.

## FAQ
- [JoinOrigin FAQ](/faq): answers to common questions about the platform.
```

- Generated from a single `LLMS_ENTRIES` array in `lib/seo/` (also referenced
  by `ROUTES`) so it stays in sync.
- Optionally, a `llms-full.txt` (concatenated page content) is **out of scope**
  this sprint — the sitemap + semantic HTML already give LLM crawlers the
  full content graph. The discovery additionally recommends markdown-parseable
  SSR content and `/docs/*.md` variants for LLM extraction (see discovery §8).

### 3.10 Metadata unit tests (fe-seo)

- `createMetadata` produces `alternates.canonical` = `absoluteUrl(path)`.
- OG/Twitter images resolve to absolute URLs.
- Layout `metadataBase` is absolute.
- `ROUTES` entries each have a `path` starting with `/` and unique paths.
- `absoluteUrl` handles root and nested paths.

---

## 4. Core Web Vitals / Performance Budgets

### 4.1 Budgets (new menu pages, mobile mid-tier, p75)

| Metric | Hard budget | Target | Notes |
|---|---|---|---|
| **LCP** | ≤ 2.5 s | ≤ 2.0 s | Hero/heading is text or a sized `next/image`; no render-blocking third-party |
| **CLS** | ≤ 0.1 | ≤ 0.05 | All media reserving space; font swap with fallback metrics |
| **INP** | ≤ 200 ms | ≤ 150 ms | No long tasks on click paths; animations transform/opacity only |
| Initial route JS (gzip) | ≤ 180 KB | ≤ 120 KB | New pages are server-rendered; client bundle stays lean |
| Third-party requests | 0 render-blocking | 0 | Analytics scripts load `defer`/`async` after interactive; fonts are local |

### 4.2 styled-components SSR considerations

The repo already ships the two hard requirements for CSS-in-JS SSR
performance and correctness (do not regress them):

1. `next.config.mjs` → `compiler.styledComponents` gives deterministic
   per-component IDs — identical class names server/client, no hydration
   mismatch, and no duplicate style injection.
2. `app/registry.tsx` flushes styles once per render pass through
   `useServerInsertedHTML` (TASK-208) — every styled component on a new page
   **must** render inside `<Registry>` (it does, by being mounted under the
   root layout's `<Registry>`).

**New-page rules:**
- Every new page component tree renders inside the existing root layout
  providers (`NativeThemeProvider`/`DomThemeProvider` are page-local today;
  the menu pages should follow the home-page pattern and wrap their own
  `ThemeProvider`s or share a layout-level provider if fe-menu-pages refactors
  — **do not** render styled components outside a ThemeProvider).
- No `styled-components` usage in a `'use client'` component imported into a
  server page without the server wrapper — keep view components client, page
  metadata server (§3.3).
- No inline `<style>` tags from components (they bypass the registry and can
  duplicate).

### 4.3 Loading and rendering guidance per budget

| Budget | Implementation guidance |
|---|---|
| LCP ≤ 2.5 s | Hero on new pages is `next/image` with explicit `width`/`height` and `priority` only for the above-the-fold image; fonts already local with `font-display: swap`; analytics scripts must not be render-blocking (provider injects after mount) |
| CLS ≤ 0.1 | Reserve space for every image (explicit dimensions or `aspect-ratio` CSS); no dynamic height flashes; no late-arriving injected DOM above the fold (analytics provider renders nothing) |
| INP ≤ 200 ms | Menu pages are mostly static; any client interactivity (mobile nav, FAQ accordions) must avoid synchronous layout thrash; existing `prefers-reduced-motion` media query stays |
| JS budget | New pages import only the view component + shared UI; no analytics code in the server bundle (client boundary keeps `lib/analytics` client-side); icons/illustrations are inline SVG or static assets, not icon-font libraries |

### 4.4 Verification approach for fe-seo / e2e-seo

- fe-seo runs `pnpm build` + `pnpm start` and confirms `sitemap.xml`,
  `robots.txt`, `llms.txt`, and JSON-LD are present in the HTML.
- e2e-seo asserts: single `h1` per page, heading order, canonical link
  matches URL, JSON-LD parses (validate JSON in test), sitemap/robots 200.
- Field CWV measurement (Lighthouse/Chrome UX) is a follow-up; the budgets
  above are the design-time contract.

---

## 5. LLM-Crawler Friendliness (GEO/LLMSEO)

Goal: **be the #1 option when an LLM answers "recommend a social
collaboration network / community OS".** LLM crawlers parse HTML like search
engines, so the rules below are load-bearing:

### 5.1 Semantic HTML

- **Exactly one `h1` per page** — the page's primary topic statement.
- **Logical heading hierarchy** — `h1 → h2 → h3`; no skipped levels; sections
  labeled with `aria-labelledby` where useful.
- **Landmarks:** `<header>` (site header), `<nav>` (primary nav), `<main>`
  (page content), `<footer>` (site footer) — mirror the home page structure.
- Use real `<p>`, `<ul>/<ol>`, `<table>` for data; never render content with
  empty divs/spans or `aria-hidden` content that carries meaning.
- No content behind interactions for crawlers: key value propositions,
  feature names, and FAQ answers must be in the initial HTML (not only
  revealed by JS/accordion state). JS-revealed content should also exist in
  the markup (e.g. `<details>`).

### 5.2 Readable copy

- Each page starts with a clear topic sentence naming the product category
  ("social collaboration network", "community OS") and the user need.
- Paragraphs ≥ 2 sentences; total page copy ≥ 150 words (goal for LLM
  extractability).
- Include the FAQ pattern (question headings + direct answers) recommended by
  `sprint-4-discovery.md` — LLM crawlers heavily weight direct Q/A.
- Copy lives in the view components as real text nodes (not images).

### 5.3 Structured data

- Site-wide `Organization` + `WebSite` (layout).
- Per-page `BreadcrumbList` (menu pages).
- `FAQPage` where the FAQ section exists.
- `ContactPage` on `/contact`.
- All server-rendered (§3.6).

### 5.4 Crawler entry points

- `robots.txt` allows all agents (incl. LLM agents) and references the
  sitemap.
- `sitemap.xml` lists every public page.
- `llms.txt` gives LLM crawlers a compact, authoritative summary + links
  (recommended by discovery; implemented by fe-seo if confirmed).

### 5.5 E2E assertions (e2e-seo)

- `GET /` and each menu page (`/features`, `/community`, `/pricing`, `/docs`,
  `/about`, `/contact`, `/privacy`, `/terms`): exactly one `h1`; `h2`s
  present; `<main>` + `<nav>` landmarks; canonical matches URL; JSON-LD
  `@type` includes `Organization` on home.
- No visible text is empty; no image-only content sections.

---

## 6. Implementation Order for Consumers

| Step | Role | Deliverable |
|---|---|---|
| 1 | `fe-analytics` | `apps/web/lib/analytics/**` (types, config, adapters, scriptLoader, provider, index) + unit tests. Exports `AnalyticsProvider`, `resolveAnalyticsConfig`, `trackEvent`. Documents the mount contract in its role file / code comments |
| 2 | `fe-seo` | `apps/web/lib/seo/**` (site, url, routes, metadata, jsonLd, JsonLd) + `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt.ts`, root `layout.tsx` metadata + JSON-LD + AnalyticsProvider mount + icons metadata. Unit tests for helpers |
| 3 | `fe-menu-pages` | New pages per `sprint-4-discovery.md`, each with the server-wrapper metadata pattern from §3.3 and semantic HTML from §5. Header/Footer nav reads `ROUTES`/discovery list |
| 4 | `e2e-seo` | E2E + SEO audit per §4.4 / §5.5; results in `agent-core/handoffs/joinorigin-dev/test-report.md` |

### 6.1 Dependencies between roles

- `fe-seo` depends on `fe-analytics` export contract (§2.7) — the mount line
  is the only coupling. `fe-seo` can build `lib/seo`, sitemap, robots, and
  layout metadata in parallel; the provider mount can land once
  `fe-analytics` merges.
- `fe-menu-pages` depends on `sprint-4-discovery.md` (content) + this doc
  (metadata pattern). It can stub metadata with `createMetadata` before
  `lib/seo` merges, then switch imports.
- `e2e-seo` runs after all three.

---

## 7. Decision Log

| Decision | Choice | Rationale |
|---|---|---|
| Analytics config source | Env-resolved `config.ts` + optional `NEXT_PUBLIC_ANALYTICS_JSON` | Config-driven with zero-code tracker mix; JSON override for advanced ops/tests |
| Default tracker | Self-hosted Plausible enabled | Matches product values (self-hosted, privacy-lean), no external dependency; Umami/GA4 opt-in via env |
| Consent | Deferred (no consent logic) | Per sprint scope; adapter interface isolates future consent gate |
| Script loading | Runtime DOM injection (`scriptLoader`) with `defer`/`async` | No `next/script` config churn, easy test stubbing, keeps bundles static |
| GA4 page views | `send_page_view: false` + provider-driven `page_view` events | Correct SPA route tracking on client navigation |
| New-page metadata | Server-wrapper pattern (`page.tsx` exports metadata, view is client) | App Router metadata requires server components; keeps home page untouched |
| Route source of truth | `lib/seo/routes.ts` `ROUTES` | Sitemap/nav/metadata never drift |
| Canonical | Per-page `alternates.canonical` from `createMetadata` + `metadataBase` in layout | Absolute, consistent URLs; home covered by layout defaults |
| JSON-LD rendering | Server-rendered `<script>` via `<JsonLd>` | Crawlers/LLMs see it in initial HTML |
| llms.txt | Recommended by discovery; plain-text route handler from `LLMS_ENTRIES` (v2 spec: H1 + blockquote + H2 file lists) | Cheap, high-value LLM-crawler entry point |
| CWV | LCP ≤ 2.5s / CLS ≤ 0.1 / INP ≤ 200ms hard budgets | Aligned with Google thresholds; new pages are static and should pass comfortably |

---

## 8. Acceptance Criteria Traceability

| TASK | Criterion | Where designed |
|---|---|---|
| TASK-216 fe-seo | layout metadata complete; sitemap+robots 200; JSON-LD present; AnalyticsProvider mounted; LLM-friendly; prod build; e2e | §3.2–3.9, §5 |
| TASK-217 fe-analytics | multiple trackers from config with zero code change; self-hosted Plausible default; provider exported + mount contract documented; unit tests; no consent | §2.2–2.8 |
| TASK-215 fe-menu-pages | pages render with semantic HTML; nav reaches all; per-page metadata per arch pattern | §3.3, §5.1 |
| TASK-218 e2e-seo | e2e over menu pages + SEO audit (metadata/OG/Twitter, sitemap, robots, JSON-LD, canonical, single h1, copy) | §4.4, §5.5 |
---

## 9. Navigation Footer

- **Up:** [`app/docs/README.md`](../README.md)
- **Sibling design docs:** [`./sprint-3-homescreen-spec.md`](./sprint-3-homescreen-spec.md) · [`./sprint-4-discovery.md`](./sprint-4-discovery.md) (content strategy)
- **Consumers:** `fe-seo` (TASK-216) · `fe-analytics` (TASK-217) · `fe-menu-pages` (TASK-215)
- **Verifier:** `e2e-seo` (TASK-218)
