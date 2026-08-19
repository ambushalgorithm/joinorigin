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
├── next.config.mjs            # standalone output + transpilePackages + Turbopack RN→RNW alias/.web.* extensions + allowedDevOrigins
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
  pnpm --filter @joinorigin/e2e run test:e2e   # production server on port 3100
  ```

## Docker Local Launch

The web app ships with a multi-stage Docker setup at the **monorepo root**
(`app/Dockerfile` + `app/docker-compose.yml` + `app/.dockerignore`). It builds
the Next.js **standalone** output (`output: 'standalone'` in `next.config.mjs`)
and runs a minimal non-root `node:22-slim` image — zero host dependencies
besides Docker itself.

### Prerequisites

- Docker Engine with BuildKit (Docker ≥ 23) and the Compose plugin.
- Port `3100` free (override with `WEB_PORT`, see below).

### Quick start

```bash
# from the monorepo root (the directory containing docker-compose.yml)
docker compose up --build
# open http://localhost:3100
```

- `docker compose up --build` — build + start (first build installs pnpm deps
  with a frozen lockfile and runs `next build` inside the container).
- `docker compose build` — build the image only.
- `docker compose up -d` — start detached; logs via `docker compose logs -f web`.
- `docker compose down` — stop + remove the container (keeps the leads volume).
- `docker compose ps` — status; the container is `healthy` once it serves 200.

### Verification

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3100/   # 200
docker compose ps --format 'table {{.Name}}\t{{.Status}}'          # healthy
```

### Configuration

All variables are documented in [`apps/web/.env.example`](./.env.example).
`NEXT_PUBLIC_*` values are baked into the client bundle at **build** time, so
they are passed as compose build args:

```bash
# optional: override from the shell or a root .env before building
NEXT_PUBLIC_SITE_URL=http://localhost:3100 \
NEXT_PUBLIC_SITE_DOMAIN=joinorigin.co \
docker compose up --build
```

Runtime knobs (compose `environment`, no rebuild needed):

- `WEB_PORT` — host port mapped to container `3100` (default `3100`).
- `LEADS_CSV_PATH` — where `POST /api/leads` appends rows. Defaults to
  `/app/apps/web/data/leads.csv`, persisted on the `joinorigin-web-leads`
  named volume so waitlist submissions survive container restarts.
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_UMAMI_HOST_URL`,
  `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, `NEXT_PUBLIC_ANALYTICS_JSON` — optional
  analytics trackers (see `.env.example`).

### Image details

- Build context is the **monorepo root** — the Dockerfile copies the pnpm
  manifests first, runs `pnpm install --frozen-lockfile` (honoring
  `.npmrc`'s `node-linker=hoisted`), then `next build` in the builder stage.
- The runner image contains only `.next/standalone`, `.next/static`, and
  `public`; it runs as user `nextjs` (uid 1001) on `HOSTNAME=0.0.0.0` with
  `PORT=3100` and a writable `data/` dir for the waitlist CSV.
- `.dockerignore` keeps `node_modules`, `.next`, `.git`, `agent-core`,
  `working-directories`, coverage/test dirs, and other generated files out of
  the build context.

## Self-Hosted Plausible Analytics (Local)

The same `docker-compose.yml` also runs a **self-hosted Plausible** stack
(Plausible Community Edition) so analytics can be verified locally with zero
external dependency:

| Service              | Image                                    | Role                                  |
| -------------------- | ---------------------------------------- | ------------------------------------- |
| `plausible`          | `ghcr.io/plausible/community-edition`    | Dashboard + tracking API (`:8000`)    |
| `plausible_db`       | `postgres:16-alpine`                     | Users / site config (Postgres)        |
| `plausible_events_db` | `clickhouse/clickhouse-server:24.12-alpine` | Analytics event store (ClickHouse) |

Event data persists in named volumes (`plausible-data` is also the server's
event-cache buffer dir via `TMPDIR`); `docker compose down` keeps them.

### Start analytics

The stack starts automatically with `docker compose up --build`. To start only
analytics (leave the web app for later):

```bash
docker compose up -d plausible_db plausible_events_db plausible
docker compose ps --format 'table {{.Name}}\t{{.Status}}'   # all three healthy
```

Plausible is then available at `http://localhost:8000` (override the host port
with `PLAUSIBLE_PORT`, e.g. `PLAUSIBLE_PORT=8001 docker compose up -d plausible`).

### First-run setup

1. Open `http://localhost:8000/register` and create the first user account.
2. In the dashboard, add the site with the **same domain** the web app reports:
   the default is `joinorigin.co` (`NEXT_PUBLIC_SITE_DOMAIN`, see
   `apps/web/.env.example`). Use a custom domain such as `localhost` if you set
   `NEXT_PUBLIC_SITE_DOMAIN=localhost` and restart with a rebuild.
3. The tracking script is already pointed at the local instance:
   `NEXT_PUBLIC_PLAUSIBLE_API_HOST` defaults to `http://localhost:8000` in the
   compose build args. Changing it requires a rebuild:
   `NEXT_PUBLIC_PLAUSIBLE_API_HOST=http://localhost:8000 docker compose up --build`.

### Verify events

```bash
# Tracker script + dashboard respond
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8000/js/script.js   # 200
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8000/register        # 200

# Send a pageview like the browser would (202 = accepted)
curl -s -o /dev/null -w '%{http_code}\n' -X POST http://localhost:8000/api/event \
  -H 'Content-Type: application/json' \
  -d '{"domain":"joinorigin.co","name":"pageview","url":"http://localhost:3100/"}'
```

Then open `http://localhost:3100` in a browser and watch the realtime view in
the Plausible dashboard. The analytics config contract (env vars, JSON
override) is documented in `apps/web/lib/analytics/README.md`.

### Production notes

- `PLAUSIBLE_SECRET_KEY_BASE` ships a **dev-only default** so `docker compose
  up` works out of the box. Override it for anything non-local:
  `openssl rand -base64 48` (>= 64 bytes).
- Set `PLAUSIBLE_BASE_URL` to the public origin and `PLAUSIBLE_DISABLE_REGISTRATION`
  to `true`/`invite_only` before exposing analytics beyond localhost.
- All `PLAUSIBLE_*` variables are documented in `apps/web/.env.example`; put
  them in a root `.env` next to `docker-compose.yml`.

## Navigation Footer

- Parent: [`../../README.md`](../../README.md)
- Sibling app: [`../mobile`](../mobile)
- Shared packages: [`../../packages/design`](../../packages/design) · [`../../packages/ui`](../../packages/ui)
- E2E suite: [`../../tests/e2e`](../../tests/e2e)
