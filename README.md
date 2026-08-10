# JoinOrigin — Frontend Monorepo

Welcome to the JoinOrigin frontend monorepo: a shared cross-platform codebase that
powers the **web app** (Next.js + React Native Web) and the **mobile app**
(React Native, JS-side shell — no Expo yet), backed by **shared packages**
(design tokens + base universal UI components).

This skeleton follows the cross-platform frontend architecture documented in
[`app/docs/patterns/frontend-architecture.md`](app/docs/patterns/frontend-architecture.md).

---

## Monorepo Layout

```text
.
├── apps/
│   ├── web/                  # Next.js web app (App Router, React Native Web)
│   └── mobile/               # React Native app — JS-side structure (no ios/android)
├── packages/
│   ├── design/               # Design tokens: colors, spacing, typography, radius,
│   │                         #   breakpoints, theme (no React/styled-components deps)
│   └── ui/                   # Base universal UI components (styled-components/native)
├── e2e/                      # Playwright end-to-end tests
├── package.json              # Workspace root — task orchestration scripts
├── pnpm-workspace.yaml       # pnpm workspaces definition
├── turbo.json                # Turborepo task pipeline
├── tsconfig.base.json        # Shared TypeScript compiler options
├── .eslintrc.cjs             # Root ESLint config (applies to every package)
├── .prettierrc.json          # Root Prettier config
└── README.md                 # This file
```

### Apps

| App | Stack | Notes |
|---|---|---|
| `apps/web` | Next.js 14 (App Router), React 18, React Native Web, styled-components | Homepage renders **Welcome to JoinOrigin** using shared tokens/components |
| `apps/mobile` | React Native 0.74 (bare, no Expo), React 18, styled-components/native | JS-side shell: entry point, `App`, babel/metro/jest configs. Native `ios/`/`android/` scaffolds are deferred |

### Shared packages

| Package | Contents |
|---|---|
| `@joinorigin/design` | Starter design tokens (`colors`, `spacing`, `typography`, `fontWeights`, `radius`, `breakpoints`) composed into a single `theme`, plus the `JoinOriginTheme` type wired into styled-components' `DefaultTheme` |
| `@joinorigin/ui` | Base universal components: `Button`, `Card`, `Screen`, `Text`, `Badge`, `LoadingIndicator` — all styled with `styled-components/native` and theme tokens only |

Shared packages are consumed **as TypeScript source** (their `main` points at
`src/index.ts`) — there is no build step for them. Apps transpile them at
bundle/test time:

- Next.js: `transpilePackages: ['@joinorigin/ui', '@joinorigin/design']`
- Metro: `watchFolders` + `resolver.nodeModulesPaths` include the workspace root
- Jest: `transformIgnorePatterns` whitelists `@joinorigin`

---

## Tooling Choices

| Concern | Choice | Why |
|---|---|---|
| Workspaces | **pnpm workspaces** (`pnpm-workspace.yaml`) | Fast, disk-efficient installs, first-class workspace protocol (`workspace:*`) |
| Task orchestration | **Turborepo** (`turbo.json`) | Parallel `dev`/`build`/`lint`/`typecheck`/`test` with caching |
| Node module layout | **pnpm `node-linker=hoisted`** (`.npmrc`) | Flat `node_modules` keeps React Native's Metro bundler and Jest resolution simple with workspace symlinks |
| Language | TypeScript 5 (`tsconfig.base.json`, `moduleResolution: bundler`) | Strict, shared compiler options across all packages |
| Lint / format | ESLint 8 (root `.eslintrc.cjs`) + Prettier 3 | One root config lints every workspace package; `prettier/prettier` rule enforces formatting |
| Unit tests | Jest 29 | One runner across apps and packages; web uses `next/jest`, mobile/ui use the `react-native` preset |
| E2E tests | Playwright (`e2e/`) | Chromium against the Next.js dev server |
| Styling | styled-components (+ `styled-components/native`) | Primary styling system per the frontend architecture (no Tailwind) |

---

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm 10 (`corepack enable` or `npm i -g pnpm`)

### Install

```bash
pnpm install
```

### Start the web app (dev server)

```bash
pnpm --filter @joinorigin/web dev
# → http://localhost:3000  (or the next available port)
```

The homepage renders **Welcome to JoinOrigin** using shared tokens/components.

To pick a specific port:

```bash
PORT=3100 pnpm --filter @joinorigin/web dev
```

### Start the mobile app (JS-side)

There is no native runtime yet, so "starting" the mobile app means
typechecking / running its unit tests:

```bash
pnpm --filter @joinorigin/mobile dev      # tsc --watch (placeholder dev command)
pnpm --filter @joinorigin/mobile test
```

### Useful commands (from the repo root)

```bash
pnpm dev              # run dev tasks across the workspace (turbo)
pnpm build            # production build (web: next build; mobile: typecheck)
pnpm lint             # ESLint across all packages
pnpm typecheck        # tsc --noEmit across all packages
pnpm test             # unit tests across all packages (Jest)
pnpm test:e2e         # Playwright end-to-end tests (starts the web dev server)
pnpm format           # Prettier write
pnpm format:check     # Prettier check
```

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

<ThemeProvider theme={theme}>{/* app */}</ThemeProvider>
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

| Package | Config | What it covers |
|---|---|---|
| `apps/web` | `next/jest` + jsdom, `react-native` → `react-native-web` mapper | Homepage renders Welcome to JoinOrigin via shared components |
| `apps/mobile` | `react-native` preset + `@testing-library/react-native` | `App` renders the welcome screen via shared components |
| `packages/ui` | `react-native` preset + `@testing-library/react-native` | Component behaviour (labels, press handlers, disabled/loading states) |
| `packages/design` | `ts-jest` (node) | Token structure and brand values |

Run all unit tests: `pnpm test`

### E2E tests (Playwright)

`e2e/tests/home.spec.ts` boots the web dev server on a dedicated port
(default **3100**, override with `JOINORIGIN_WEB_PORT`), opens the homepage,
and asserts **Welcome to JoinOrigin** is visible.

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
4. Run `pnpm lint && pnpm typecheck && pnpm test` from the root.

---

## Definition of Done (Sprint 2 skeleton)

- [ ] `apps/web` dev server starts and renders **Welcome to JoinOrigin**
- [ ] `apps/mobile` JS-side structure exists and typechecks
- [ ] Shared `packages/design` + `packages/ui` exist with starter tokens/base components
- [ ] `pnpm lint` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` (unit) passes
- [ ] `pnpm test:e2e` (Playwright) passes
- [ ] Root `README.md` documents layout, tooling, commands, and consumption pattern

---

## Notes / Deferred (later sprints)

- **PWA** (manifest/service worker) — deferred.
- **Native iOS/Android build projects** for `apps/mobile` — deferred (JS-side only).
- **CI/CD workflows** — deferred.
- Backend/API/server features beyond Next.js app configuration — out of scope here.
