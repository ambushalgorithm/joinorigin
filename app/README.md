# JoinOrigin — Frontend Monorepo

> **Parent:** [../AGENTS.md](../AGENTS.md) — repository entry point and agent navigation
>
> **Public / community-facing README:** [../README.md](../README.md) — product intro,
> features, getting started, contributing, and license for the open-source community.
> This file is the **internal monorepo developer guide**: layout, tooling choices,
> getting-started commands, shared-package consumption, test patterns, and definition of done.

The JoinOrigin frontend monorepo lives **inside `app/`**. The repo root contains
only `AGENTS.md`, `README.md`, `LICENSE`, `.gitignore`, and `app/`; all monorepo
components and configuration live here.

Welcome to the JoinOrigin frontend monorepo: a shared cross-platform codebase that
powers the **web app** (Next.js + React Native Web) and the **mobile app**
(React Native — native Android `android/` project generated, no Expo), backed
by **shared packages** (design tokens + base universal UI components).

The cross-platform frontend architecture is documented in
[`docs/patterns/frontend-architecture.md`](docs/patterns/frontend-architecture.md).

---

## Monorepo Layout

```text
app/                      # Monorepo root (this directory)
├── apps/
│   ├── web/                  # Next.js web app (App Router, React Native Web)
│   │   ├── app/              #   layout.tsx, page.tsx (homepage), registry.tsx, page.test.tsx
│   │   └── README.md         #   App-specific docs
│   └── mobile/               # React Native app — JS shell + generated native android/
│       ├── index.js          #   AppRegistry entry point
│       ├── App.tsx           #   Root component (ThemeProvider + HomeScreen)
│       ├── src/screens/      #   HomeScreen.tsx + unit test
│       └── android/          #   Native Android project (RN 0.87, Gradle) — see android/README.md
├── packages/
│   ├── design/               # Design tokens: colors, spacing, typography, radius,
│   │                         #   breakpoints, theme (no React/styled-components deps)
│   └── ui/                   # Base universal UI components (styled-components/native)
├── tests/
│   └── e2e/                  # Playwright end-to-end tests
│       ├── playwright.config.ts  #   Web server on port 3100, chromium project
│       └── tests/*.spec.ts       #   Home, hero, pages, SEO, a11y, waitlist, leads specs
├── package.json              # Workspace root — task orchestration scripts
├── pnpm-workspace.yaml       # pnpm workspaces definition
├── turbo.json                # Turborepo task pipeline
├── tsconfig.base.json        # Shared TypeScript compiler options
├── .eslintrc.cjs             # Root ESLint config (applies to every package)
├── .prettierrc.json          # Root Prettier config
└── README.md                 # This file
```

### Apps

| App           | Stack                                                                             | Notes                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web`    | Next.js 16 (App Router, Turbopack), React 19, React Native Web, styled-components | Landing page (hero, ticker, waitlist modal) + menu pages rendered with shared tokens/components                                             |
| `apps/mobile` | React Native 0.87 (bare, no Expo), React 19, styled-components/native             | JS-side shell: entry point, `App`, babel/metro/jest configs. Native `android/` project generated (RN 0.87, Gradle); `ios/` remains deferred |

### Shared packages

| Package              | Contents                                                                                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@joinorigin/design` | Starter design tokens (`colors`, `spacing`, `typography`, `fontWeights`, `radius`, `breakpoints`) composed into a single `theme`, plus the `JoinOriginTheme` type wired into styled-components' `DefaultTheme` |
| `@joinorigin/ui`     | Base universal components: `Button`, `Card`, `Screen`, `Text`, `Badge`, `LoadingIndicator` — all styled with `styled-components/native` and theme tokens only                                                  |

Shared packages are consumed **as TypeScript source** (their `main` points at
`src/index.ts`) — there is no build step for them. Apps transpile them at
bundle/test time:

- Next.js: `transpilePackages: ['@joinorigin/ui', '@joinorigin/design']`
- Metro: `watchFolders` + `resolver.nodeModulesPaths` include the workspace root
- Jest: `transformIgnorePatterns` whitelists `@joinorigin`

---

## Tooling Choices

| Concern            | Choice                                                           | Why                                                                                                       |
| ------------------ | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Workspaces         | **pnpm workspaces** (`pnpm-workspace.yaml`)                      | Fast, disk-efficient installs, first-class workspace protocol (`workspace:*`)                             |
| Task orchestration | **Turborepo** (`turbo.json`)                                     | Parallel `dev`/`build`/`lint`/`typecheck`/`test` with caching                                             |
| Node module layout | **pnpm `node-linker=hoisted`** (`.npmrc`)                        | Flat `node_modules` keeps React Native's Metro bundler and Jest resolution simple with workspace symlinks |
| Language           | TypeScript 5 (`tsconfig.base.json`, `moduleResolution: bundler`) | Strict, shared compiler options across all packages                                                       |
| Lint / format      | ESLint 8 (root `.eslintrc.cjs`) + Prettier 3                     | One root config lints every workspace package; `prettier/prettier` rule enforces formatting               |
| Unit tests         | Jest 29                                                          | One runner across apps and packages; web uses `next/jest`, mobile/ui use the `react-native` preset        |
| E2E tests          | Playwright (`tests/e2e/`)                                        | Chromium against the Next.js production server (build + `next start`)                                     |
| Styling            | styled-components (+ `styled-components/native`)                 | Primary styling system per the frontend architecture (no Tailwind)                                        |

---

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm 10 (`corepack enable` or `npm i -g pnpm`)

### Install

```bash
# from app/ (the monorepo root)
pnpm install
```

### Start the web app (dev server)

```bash
pnpm --filter @joinorigin/web dev
# → http://localhost:3000  (or the next available port)
```

The homepage renders the landing page using shared tokens/components.

To pick a specific port:

```bash
PORT=3100 pnpm --filter @joinorigin/web dev
```

### Start the mobile app

The native Android project is generated (see
[`apps/mobile/android/README.md`](apps/mobile/android/README.md)) and builds
with `./gradlew assembleDebug` from `apps/mobile/android/` (or
`pnpm --filter @joinorigin/mobile run android:build`). For day-to-day JS-side
work, typecheck / run the unit tests:

```bash
pnpm --filter @joinorigin/mobile dev      # tsc --watch (placeholder dev command)
pnpm --filter @joinorigin/mobile test
```

### Useful commands (from app/ — the monorepo root)

```bash
pnpm dev              # run dev tasks across the workspace (turbo)
pnpm build            # production build (web: next build; mobile: typecheck)
pnpm lint             # ESLint across all packages
pnpm typecheck        # tsc --noEmit across all packages
pnpm test             # unit tests across all packages (Jest)
pnpm test:e2e         # Playwright end-to-end tests (builds + starts the web production server)
pnpm format           # Prettier write
pnpm format:check     # Prettier check
```

### Workspace start checklist (first-time team member)

Run these in order — this is the exact flow every team member follows:

```bash
# 0. All commands below run from app/ (the monorepo root)

# 1. Install dependencies (creates node_modules + pnpm-lock.yaml)
pnpm install

# 2. Start the web app dev server (http://localhost:3000)
pnpm --filter @joinorigin/web dev

# 3. In a second terminal — run the mobile app's JS-side checks
#    (the native android/ project is generated; typecheck + unit tests are the
#    quick signal — full native builds use apps/mobile/android, see its README)
pnpm --filter @joinorigin/mobile dev
pnpm --filter @joinorigin/mobile test

# 4. Static checks across the whole workspace
pnpm lint
pnpm typecheck

# 5. Unit tests across all packages (Jest)
pnpm test

# 6. End-to-end tests (Playwright; builds + boots the web production server on port 3100)
pnpm test:e2e
```

Verify the homepage by opening `http://localhost:3000` — it should render the
landing page (hero, partner ticker, waitlist modal) built from the shared
design system (`@joinorigin/ui` components + `@joinorigin/design` tokens).

---

## Consuming Shared Packages

Both apps import from `@joinorigin/design` and `@joinorigin/ui` the same way:

```tsx
import { theme } from '@joinorigin/design';
import { Button, Card, Screen, Text } from '@joinorigin/ui';

function HomeScreen() {
  return (
    <Screen>
      <Card elevated>
        <Text variant="title" weight="semibold" color="text">
          Welcome to JoinOrigin
        </Text>
        <Button label="Get started" onPress={() => {}} />
      </Card>
    </Screen>
  );
}
```

The theme is provided once at the app root:

```tsx
// apps/web/app/page.tsx  and  apps/mobile/App.tsx
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';

<ThemeProvider theme={theme}>{/* app */}</ThemeProvider>;
```

**Rules of thumb** (from the frontend architecture):

- Share types, logic, tokens, and UI aggressively.
- Prefer one **universal** component via `styled-components/native`.
- Use `.web.tsx` / `.native.tsx` only when platforms genuinely differ.
- Never hardcode raw colors/spacing/typography — use the tokens.
- Keep Next.js server APIs out of shared packages.

---

## Test Patterns

### Unit tests (Jest)

| Package           | Config                                                          | What it covers                                                        |
| ----------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| `apps/web`        | `next/jest` + jsdom, `react-native` → `react-native-web` mapper | Landing + menu pages, layout, SEO/analytics libs, icons, leads API    |
| `apps/mobile`     | `react-native` preset + `@testing-library/react-native`         | `App` renders the welcome screen via shared components                |
| `packages/ui`     | `react-native` preset + `@testing-library/react-native`         | Component behaviour (labels, press handlers, disabled/loading states) |
| `packages/design` | `ts-jest` (node)                                                | Token structure and brand values                                      |

Run all unit tests: `pnpm test` — currently **162 tests / 30 suites** across 4
packages: (design 6, ui 7, mobile 5, web 144).

### E2E tests (Playwright)

`tests/e2e/tests/*.spec.ts` builds the web app once, then boots the
Next.js **production** server (`next start`) on a dedicated port (default
**3100**, override with `APP_PORT`), opens the homepage,
and asserts the landing experience end to end: hero, waitlist modal, leads API,
menu pages, SEO, a11y, and responsive behaviour. Running against the production
server (instead of `next dev`) keeps the suite deterministic and avoids the
dev server's multi-GB RSS / OOM failures.

```bash
pnpm test:e2e
```

Playwright browsers: `pnpm --filter @joinorigin/e2e exec playwright install chromium`

---

## Adding a New Package / Component

1. Create the package under `packages/` (or a component under
   `packages/ui/src/components/`) following the existing patterns.
2. Export it from the package `index.ts`.
3. Add/update unit tests next to the code.
4. Run `pnpm lint && pnpm typecheck && pnpm test` from app/ (the monorepo root).

---

## Definition of Done

A change to this monorepo is **done** when every item below is green:

- [x] `apps/web` dev server starts and renders the homepage
- [x] `apps/mobile` JS-side structure exists and typechecks; native `android/` project generated
- [x] Shared `packages/design` + `packages/ui` provide design tokens / base components
- [x] `pnpm lint` passes
- [x] `pnpm typecheck` passes
- [x] `pnpm test` (unit) passes — 162 tests / 30 suites
- [x] `pnpm test:e2e` (Playwright) passes — 100 tests (chromium)
- [x] `README.md` documents layout, tooling, commands, and consumption pattern

---

## Notes / Deferred (later sprints)

- **PWA** (manifest/service worker) — deferred.
- **Native iOS build project** for `apps/mobile` — deferred (JS-side only); the native
  **Android** project is generated (see `apps/mobile/android/README.md`).
- **CI/CD workflows** — deferred.
- Backend/API/server features beyond Next.js app configuration — out of scope here.
