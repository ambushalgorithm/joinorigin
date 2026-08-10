# apps/web — JoinOrigin Web App

> Parent: [`../../README.md`](../../README.md) · Sibling: [`../mobile`](../mobile) · Packages: [`@joinorigin/design`](../../packages/design) · [`@joinorigin/ui`](../../packages/ui)

## Purpose

The **JoinOrigin web application**: a Next.js 14 (App Router) + React 18 +
React Native Web + styled-components shell. It renders the **Welcome to
JoinOrigin** homepage entirely from the shared design tokens
(`@joinorigin/design`) and base universal UI components (`@joinorigin/ui`),
proving the cross-platform frontend stack end-to-end.

## Directory Map

```text
apps/web/
├── app/
│   ├── layout.tsx       # Root layout (metadata + SSR registry)
│   ├── page.tsx         # Homepage — Welcome to JoinOrigin via shared packages
│   ├── page.test.tsx    # Jest unit tests for the homepage
│   └── registry.tsx     # RNW StyleSheet SSR injection (useServerInsertedHTML)
├── types/
│   └── react-native-web.d.ts  # Minimal ambient types for react-native-web
├── jest.config.mjs      # next/jest configuration
├── jest.setup.ts        # @testing-library/jest-dom matchers
├── next.config.mjs      # transpilePackages + RN→RNW webpack alias + allowedDevOrigins
├── package.json
└── tsconfig.json
```

## Contracts

- **Renders**: the homepage uses only `@joinorigin/design` tokens and
  `@joinorigin/ui` components (`Screen`, `Card`, `Badge`, `Text`, `Button`).
- **Consumes shared packages as TypeScript source** — no build step; Next.js
  transpiles them via `transpilePackages`.
- **SSR**: `app/registry.tsx` collects react-native-web's `StyleSheet` output
  and injects it during server rendering for correct hydration.
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
- E2E suite: [`../../e2e`](../../e2e)
