# apps/web — JoinOrigin Web App

> Parent: [`../../README.md`](../../README.md) · Sibling: [`../mobile`](../mobile) · Packages: [`@joinorigin/design`](../../packages/design) · [`@joinorigin/ui`](../../packages/ui)

## Purpose

The **JoinOrigin web application**: a Next.js 14 (App Router) + React 18 +
React Native Web + styled-components shell. It renders the **JoinOrigin
homescreen** (Sprint 3 hero landing page per
[`docs/design/sprint-3-homescreen-spec.md`](../../docs/design/sprint-3-homescreen-spec.md)) —
sticky blurred header, typewriter hero + orbit circles viz, partner logo
ticker, slim footer, and the any-button waitlist modal backed by a CSV-capture
API route. Shared design tokens (`@joinorigin/design`) and base universal UI
components (`@joinorigin/ui`) power every visual value.

## Directory Map

```text
apps/web/
├── app/
│   ├── layout.tsx              # Root layout (metadata + local font links)
│   ├── page.tsx                # Homescreen — composes all sections + waitlist provider
│   ├── page.test.tsx           # Jest unit tests for the homepage
│   ├── registry.tsx            # RNW + styled-components SSR style injection
│   └── api/
│       └── leads/
│           ├── route.ts        # POST /api/leads → RFC 4180 CSV append (rate-limited)
│           └── route.test.ts   # API route tests against a temp CSV
├── components/
│   ├── Header.tsx              # Sticky blurred header, nav underline hovers, hamburger
│   ├── RotatingBorderButton.tsx# Conic-gradient rotating-border CTA + hover fill
│   ├── Hero.tsx                # Hero region (glows, vignette, two columns)
│   ├── HeroLeft.tsx            # Typewriter H1, Start Project, cursor badge, trust row
│   ├── TypewriterHeading.tsx   # Two-tone JS typewriter with caret
│   ├── OrbitViz.tsx            # 4 orbit rings, 9 avatar chips, count-up hub
│   ├── useCountUp.ts           # rAF count-up hook (0 → 2,400, easeOutCubic)
│   ├── motion.ts               # useReducedMotion hook
│   ├── LogoMarquee.tsx         # Partner logo ticker (5 marks × 4, seamless)
│   ├── Footer.tsx              # Slim footer with waitlist CTA
│   ├── landingTokens.ts        # Raw accent/glow/orbit constants (single source)
│   ├── landingStyles.ts        # Global CSS: keyframes, masks, breakpoints, reduced motion
│   └── WaitlistModal/
│       ├── WaitlistModalProvider.tsx  # Context + render-once modal ("any button")
│       ├── WaitlistModal.tsx          # Dialog with focus trap, states, inline errors
│       └── leadsApi.ts                # Typed fetch wrapper for POST /api/leads
├── data/
│   └── leads.csv               # Committed header-only CSV; runtime rows appended by API
├── public/
│   └── assets/, fonts/         # Locally hosted logos, avatars, partners, hero, Inter+Urbanist
├── types/
│   └── react-native-web.d.ts  # Minimal ambient types for react-native-web
├── jest.config.mjs            # next/jest configuration
├── jest.polyfills.ts          # Node web API polyfills (TextDecoder, streams, undici)
├── jest.setup.ts              # jest-dom matchers + matchMedia/rAF/next-image mocks
├── next.config.mjs            # transpilePackages + RN→RNW webpack alias + allowedDevOrigins
├── package.json
└── tsconfig.json
```

## Contracts

- **Renders**: the homepage composes web-local landing components on the
  shared `Screen` shell; every color/spacing/radius/font-weight reads from
  `@joinorigin/design` tokens (`theme.colors`, `theme.spacing`, `theme.radius`,
  `theme.fontWeights`, `theme.fontFamilies`).
- **Consumes shared packages as TypeScript source** — no build step; Next.js
  transpiles them via `transpilePackages`.
- **SSR**: `app/registry.tsx` collects react-native-web `StyleSheet` output and
  styled-components `ServerStyleSheet` output and injects them during server
  rendering for correct hydration.
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
