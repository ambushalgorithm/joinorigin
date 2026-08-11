# apps/web — JoinOrigin Web App

> Parent: [`../../README.md`](../../README.md) · Sibling: [`../mobile`](../mobile) · Packages: [`@joinorigin/design`](../../packages/design) · [`@joinorigin/ui`](../../packages/ui)

## Purpose

The **JoinOrigin web application**: a Next.js 16 (App Router, Turbopack) +
React 19 + React Native Web + styled-components shell. It renders the
**JoinOrigin homescreen** (Sprint 3 hero landing page per
[`docs/design/sprint-3-homescreen-spec.md`](../../docs/design/sprint-3-homescreen-spec.md)) —
sticky blurred header, typewriter hero + orbit circles viz, partner logo
ticker, slim footer, and the any-button waitlist modal backed by a CSV-capture
API route — plus the **Sprint 4 menu pages** (`/about`, `/features`,
`/community`, `/docs`, `/contact`, `/privacy`, `/terms`) per
[`docs/design/sprint-4-discovery.md`](../../docs/design/sprint-4-discovery.md).
Shared design tokens (`@joinorigin/design`) and base universal UI components
(`@joinorigin/ui`) power every visual value.

**Positioning**: money is never mentioned anywhere in the web copy or
navigation. The site focuses on onboarding ("join via the waitlist", "what
can I do once I am in?") the way social platforms introduce themselves.

## Directory Map

```text
apps/web/
├── app/
│   ├── layout.tsx              # Root layout (metadata + local font links)
│   ├── page.tsx                # Homescreen — composes all sections + waitlist provider
│   ├── page.test.tsx           # Jest unit tests for the homepage
│   ├── registry.tsx            # RNW + styled-components SSR style injection
│   ├── about/                  # /about — server wrapper + client view + JSON-LD (AboutPage)
│   ├── features/               # /features — core objects, comparison table, FAQ (FAQPage)
│   ├── community/              # /community — values, example communities, trust stat
│   ├── docs/                   # /docs — concepts, roadmap, architecture, FAQ (LLM-first)
│   ├── contact/                # /contact — mailto: contact form + support paths (ContactPage)
│   ├── privacy/                # /privacy — plain-English privacy policy
│   ├── terms/                  # /terms — plain-English terms of service
│   └── api/
│       └── leads/
│           ├── route.ts        # POST /api/leads → RFC 4180 CSV append (rate-limited)
│           └── route.test.ts   # API route tests against a temp CSV
├── components/
│   ├── Header.tsx              # Sticky blurred header, nav → real pages, hamburger
│   ├── RotatingBorderButton.tsx# Conic-gradient rotating-border CTA + hover fill
│   ├── Hero.tsx                # Hero region (glows, vignette, two columns)
│   ├── HeroLeft.tsx            # Typewriter H1, Start Project, subcopy, trust row
│   ├── TypewriterHeading.tsx   # Two-tone JS typewriter with caret
│   ├── OrbitViz.tsx            # 4 orbit rings, 9 avatar chips, count-up hub
│   ├── useCountUp.ts           # rAF count-up hook (0 → 2,400, easeOutCubic)
│   ├── motion.ts               # useReducedMotion hook
│   ├── LogoMarquee.tsx         # Partner logo ticker (5 marks × 4, seamless)
│   ├── Footer.tsx              # Grouped footer (Product / Company / Legal) + waitlist CTA
│   ├── MenuPageShell.tsx       # Shared shell for menu pages (providers + header/footer)
│   ├── menuPagePrimitives.ts   # Semantic styled primitives for content pages
│   ├── landingTokens.ts        # Raw accent/glow/orbit constants (single source)
│   ├── landingStyles.ts        # Global CSS: keyframes, masks, breakpoints, reduced motion
│   └── WaitlistModal/
│       ├── WaitlistModalProvider.tsx  # Context + render-once modal ("any button")
│       ├── WaitlistModal.tsx          # Dialog with focus trap, states, inline errors
│       └── leadsApi.ts                # Typed fetch wrapper for POST /api/leads
├── data/
│   └── leads.csv               # Committed header-only CSV; runtime rows appended by API
├── lib/
│   ├── analytics/              # Config-driven multi-tracker analytics (Plausible/Umami/GA4)
│   │   └── README.md           # Config schema + mount contract (fe-seo mounts AnalyticsProvider)
│   └── seo/                    # SEO helpers: createMetadata + JSON-LD builders/JsonLdScript
├── public/
│   └── assets/, fonts/         # Locally hosted logos, avatars, partners, hero, Inter+Urbanist
├── types/
│   └── react-native-web.d.ts  # Minimal ambient types for react-native-web
├── jest.config.mjs            # next/jest configuration
├── jest.polyfills.ts          # Node web API polyfills (TextDecoder, streams, undici)
├── jest.setup.ts              # jest-dom matchers + matchMedia/rAF/next-image mocks
├── next.config.mjs            # transpilePackages + Turbopack RN→RNW alias/.web.* extensions + allowedDevOrigins
├── package.json
└── tsconfig.json
```

## Contracts

- **Renders**: the homepage composes web-local landing components on the
  shared `Screen` shell; every color/spacing/radius/font-weight reads from
  `@joinorigin/design` tokens (`theme.colors`, `theme.spacing`, `theme.radius`,
  `theme.fontWeights`, `theme.fontFamilies`). Menu pages reuse the same tokens
  via `MenuPageShell` + `menuPagePrimitives`.
- **Menu pages**: each page is a server wrapper (`page.tsx` exports `metadata`
  - server-rendered JSON-LD) rendering a client view inside `MenuPageShell`.
    Per-page metadata follows `docs/design/sprint-4-seo-arch.md` §3.3
    (canonical, OG, Twitter, keywords). FAQ answers are visible in the HTML and
    mirrored 1:1 in `FAQPage` JSON-LD. `Product`/`Offer`/`AggregateRating`
    structured data is never emitted — the platform presents no commercial
    offers (discovery §7 policy).
- **Consumes shared packages as TypeScript source** — no build step; Next.js
  transpiles them via `transpilePackages`.
- **SSR**: `app/registry.tsx` collects react-native-web `StyleSheet` output and
  styled-components `ServerStyleSheet` output and injects them during server
  rendering for correct hydration.
- **Next 16 + Turbopack** (TASK-226): Turbopack is the default bundler for
  `next dev`/`next build`. The legacy `webpack()` hook is gone — the
  react-native→react-native-web alias lives in `turbopack.resolveAlias`, and
  `.web.*` platform-split extension preference in `turbopack.resolveExtensions`
  (which **overwrites** the default extension list, so the standard extensions
  are listed explicitly). styled-components class-name determinism (the
  TASK-209 "Prop className did not match" fix) is preserved via
  `compiler.styledComponents` (SWC port of babel-plugin-styled-components),
  which is honored by both bundlers. The workspace root `package.json`
  `pnpm.overrides` pins one React (19.2.8), one styled-components (6.5.2) and
  one @types/react (19.x) monorepo-wide so the hoisted dependency tree has a
  single styled-components/React module identity (no dual-instance
  theme/hydration splits). Fallback if Turbopack cannot be satisfied:
  `next build --webpack` / `next dev --webpack`.
- **Fonts**: Inter + Urbanist are served locally from `public/fonts` via
  `<link>` tags — no Google Fonts network request at runtime.
- **Waitlist capture**: any CTA opens `WaitlistModal`; submit POSTs
  `{ name, email }` to `POST /api/leads`, which validates (400), rate-limits
  per IP (429), and appends an RFC 4180 row to `data/leads.csv`.
- **Verification**:
  ```bash
  pnpm --filter @joinorigin/web lint
  pnpm --filter @joinorigin/web typecheck
  pnpm --filter @joinorigin/web test
  pnpm --filter @joinorigin/web build
  pnpm --filter @joinorigin/e2e run test:e2e   # dev server on port 3100
  ```

## Navigation Footer

- Parent: [`../../README.md`](../../README.md)
- Sibling app: [`../mobile`](../mobile)
- Shared packages: [`../../packages/design`](../../packages/design) · [`../../packages/ui`](../../packages/ui)
- E2E suite: [`../../tests/e2e`](../../tests/e2e)
