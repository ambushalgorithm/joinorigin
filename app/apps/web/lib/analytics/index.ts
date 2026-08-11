/**
 * Public API of the config-driven multi-tracker analytics subsystem.
 *
 * Imported by fe-seo in `apps/web/app/layout.tsx` (mount contract — see
 * `AnalyticsProvider.tsx`):
 *
 * ```tsx
 * import { AnalyticsProvider } from '@/lib/analytics';
 * ...
 * <Registry>
 *   <AnalyticsProvider>{children}</AnalyticsProvider>
 * </Registry>
 * ```
 *
 * Exports:
 * - `AnalyticsProvider` — client component that inits enabled trackers and
 *   tracks page views on route change.
 * - `resolveAnalyticsConfig` — env-resolved config (tests + advanced ops).
 * - `trackEvent` — programmatic event forwarding to all enabled adapters
 *   (client-only; no-op during SSR or when no trackers are enabled).
 * - `__getTrackersForTests` — test hook exposing the selected adapters.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §2.7.
 */

export { AnalyticsProvider } from './AnalyticsProvider';
export { resolveAnalyticsConfig } from './config';
export { trackEvent, __getTrackersForTests } from './tracker-runtime';

export type {
  AnalyticsConfig,
  AnalyticsTrackerConfig,
  TrackEvent,
  TrackerAdapter,
  TrackerKind,
} from './types';
