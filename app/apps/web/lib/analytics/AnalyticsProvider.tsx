'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { getTrackPageViews, initTrackers, trackPageView } from './tracker-runtime';

export interface AnalyticsProviderProps {
  children: React.ReactNode;
  /** Override the config's `trackPageViews` (default: from config, normally true). */
  trackPageViews?: boolean;
}

/**
 * Config-driven multi-tracker analytics provider.
 *
 * Resolves the analytics config once (module-level cache), inits every
 * enabled tracker on client mount, and dispatches page views on route
 * changes. Renders `{children}` unchanged — zero visual output, zero DOM
 * above the fold.
 *
 * MOUNT CONTRACT (fe-analytics → fe-seo):
 * fe-seo mounts this provider in `apps/web/app/layout.tsx`, inside the style
 * registry, wrapping the page content exactly as:
 *
 * ```tsx
 * <body>
 *   <Registry>
 *     <AnalyticsProvider>{children}</AnalyticsProvider>
 *   </Registry>
 * </body>
 * ```
 *
 * - `AnalyticsProvider` is a **client** component; the `'use client'` boundary
 *   must stay intact (no server-only APIs inside `lib/analytics`).
 * - It accepts **no required props**; optional `trackPageViews?: boolean`
 *   overrides the config (default `true`).
 * - fe-seo must NOT duplicate the provider or add its own analytics script
 *   tags — the adapters own script injection.
 *
 * Design source: `app/docs/design/sprint-4-seo-arch.md` §2.7.
 */
export function AnalyticsProvider({ children, trackPageViews }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const initStartedRef = useRef(false);
  const firstViewRef = useRef(false);

  // Init every enabled tracker once on client mount. Idempotent across
  // StrictMode / HMR double-mount (adapters guard their own initialization).
  useEffect(() => {
    if (!initStartedRef.current) {
      initStartedRef.current = true;
      void initTrackers();
    }
  }, []);

  // Dispatch page views on route changes. The initial view is dispatched
  // after init completes so vendor globals are ready (e.g. GA4's gtag); every
  // subsequent pathname change is dispatched immediately.
  useEffect(() => {
    if (trackPageViews === false) {
      return;
    }
    if (!pathname) {
      return;
    }

    const shouldTrack = getTrackPageViews();
    if (!shouldTrack) {
      return;
    }

    if (!firstViewRef.current) {
      firstViewRef.current = true;
      void initTrackers().then(() => {
        trackPageView(pathname);
      });
      return;
    }

    trackPageView(pathname);
  }, [pathname, trackPageViews]);

  return <>{children}</>;
}
