# apps/web/lib/analytics — Config-Driven Multi-Tracker Analytics

> Parent: [`apps/web/README.md`](../../README.md) · Design: [`app/docs/design/sprint-4-seo-arch.md`](../../../../docs/design/sprint-4-seo-arch.md) §2 (fe-analytics, TASK-217)

## Purpose

A single analytics subsystem that runs **any combination** of trackers
(Plausible self-hosted, Umami self-hosted, GA4) **from configuration alone —
zero code change** when the tracker mix changes. A site operator flips an env
var; the provider instantiates the enabled adapters and starts reporting.
Default tracker: **self-hosted Plausible** (privacy-lean, no external
dependency). Consent/consent-banner handling is **out of scope** (deferred to a
later sprint); the adapter interface isolates a future consent gate.

**ACTIVATION (Sprint 10, TASK-279):** the shipped default points the Plausible
adapter at the **local self-hosted Plausible** stack provisioned by
infra-plausible (TASK-277) — `docker-compose.yml` runs the Plausible
Community Edition collector on `http://localhost:8000`, and `config.ts` +
`adapters/plausible.ts` default `apiHost` to that endpoint (matching
`apps/web/.env.example`). Production deployments MUST override
`NEXT_PUBLIC_PLAUSIBLE_API_HOST` with the public analytics origin
(`https://analytics.qa1.joinorigin.co`).

**DEV GUARD (Sprint 17, TASK-402):** the Plausible tracker script is **never
injected** when running in development (`NODE_ENV=development`) or when the
site domain is a local dev domain (`localhost`, `127.0.0.1`, `0.0.0.0`). This
prevents the script from loading in the first place, which kills the
collector's "Ignoring Event: localhost" server log. Config resolution is
unchanged; only the adapter's script-injection step is skipped. Production
(`NODE_ENV=production`, domain `joinorigin.co`, apiHost
`https://analytics.qa1.joinorigin.co`) is unaffected.

## Directory Map

```text
apps/web/lib/analytics/
├── types.ts                 # TrackerAdapter, AnalyticsTrackerConfig, AnalyticsConfig, TrackEvent
├── config.ts                # resolveAnalyticsConfig(): env + defaults, parseAndValidate (JSON override)
├── url.ts                   # absoluteUrl() — analytics-local URL helper
├── scriptLoader.ts          # loadScript(src, attrs) — DOM injection helper (idempotent, testable)
├── adapters/
│   ├── plausible.ts         # PlausibleAdapter  (self-hosted, default)
│   ├── umami.ts             # UmamiAdapter      (self-hosted, opt-in)
│   ├── ga4.ts               # Ga4Adapter        (Google Analytics 4, opt-in)
│   └── index.ts             # createAdapters(config) → TrackerAdapter[] (registry/selection)
├── tracker-runtime.ts       # cached config + adapter instances; initTrackers/trackPageView/trackEvent
├── AnalyticsProvider.tsx    # 'use client' provider — mounts in root layout (fe-seo, TASK-216)
├── index.ts                 # public API: AnalyticsProvider, resolveAnalyticsConfig, trackEvent
└── __tests__/               # config, adapters, provider, scriptLoader unit tests
```

## Config Schema

The config file is `config.ts`. It reads a single optional JSON override from
the environment and merges it over **built-in defaults** — the
"config-driven" property: changing the tracker mix never requires code edits.

Resolution order (lowest → highest precedence):

1. **Built-in defaults** — the shipped default config:
   - `plausible` — **enabled**, domain from `NEXT_PUBLIC_SITE_DOMAIN` (or
     `localhost` in dev), apiHost from `NEXT_PUBLIC_PLAUSIBLE_API_HOST`
     (default `http://localhost:8000` — the local self-hosted Plausible
     endpoint from `docker-compose.yml`, infra-plausible TASK-277).
   - `umami` — **disabled** by default, configured only if
     `NEXT_PUBLIC_UMAMI_WEBSITE_ID` is set (hostUrl defaults to
     `https://analytics.joinorigin.co` when only the id is given).
   - `ga4` — **disabled** by default, configured only if
     `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set.
2. **`NEXT_PUBLIC_ANALYTICS_JSON`** — optional full JSON config
   (`{"trackers":[{...}], "trackPageViews": true}`). When present it
   **replaces** the tracker list entirely (explicit operator override).

```ts
interface AnalyticsTrackerConfig {
  id: string;                       // 'plausible' | 'umami' | 'ga4'
  kind: 'plausible' | 'umami' | 'ga4';
  enabled: boolean;
  domain?: string;                  // plausible
  apiHost?: string;                 // plausible
  websiteId?: string;               // umami
  hostUrl?: string;                 // umami
  measurementId?: string;           // ga4
}
```

**Validation rules (unit-tested):**

- Malformed `NEXT_PUBLIC_ANALYTICS_JSON` → throw (fails fast, never silently
  disables analytics).
- Unknown `kind` → throw.
- `enabled: true` with missing required field (`domain` for plausible,
  `websiteId` for umami, `measurementId` for ga4) → throw.
- Trackers with duplicate `id` → throw.
- Empty tracker list → valid, provider is a no-op (renders children, injects
  nothing).

## Mount Contract (fe-analytics → fe-seo)

fe-seo mounts the provider in `apps/web/app/layout.tsx` exactly as:

```tsx
<body>
  <Registry>
    <AnalyticsProvider>{children}</AnalyticsProvider>
  </Registry>
</body>
```

- `AnalyticsProvider` is a **client** component; import it with the `'use
  client'` boundary intact (no server-only APIs inside `lib/analytics`).
- It accepts **no required props**; optional `trackPageViews?: boolean`
  (default from config, normally `true`).
- fe-seo must **not** duplicate the provider or add its own analytics script
  tags — the adapters own script injection.
- fe-analytics owns `apps/web/lib/analytics/**` + its tests; fe-seo owns the
  one-line mount in `layout.tsx` (plus site-wide metadata, sitemap, robots,
  JSON-LD, llms.txt).

Programmatic events: `trackEvent('signup_click', { source: 'hero' })` may be
imported by client components — the runtime forwards to all enabled adapters
and is a no-op if none are enabled or during SSR.

## Public API

```ts
import { AnalyticsProvider, resolveAnalyticsConfig, trackEvent } from '@/lib/analytics';
```

- `AnalyticsProvider` — client component (mount contract above).
- `resolveAnalyticsConfig(): AnalyticsConfig` — env-resolved config.
- `trackEvent(event: TrackEvent): void` — client-only event forwarding.
- `__getTrackersForTests(): TrackerAdapter[]` — test hook (adapter selection).

## Testing

```bash
pnpm --filter @joinorigin/web test lib/analytics
```

Test files under `__tests__/` cover config parsing/validation, adapter
selection + script-injection contracts, provider page-view dispatch, and the
script loader idempotency. The script loader is stubbed in adapter/provider
tests; `NEXT_PUBLIC_ANALYTICS_JSON` is set in `process.env` per test and the
runtime cache reset via `__resetForTests()`.
