import { useEffect, useRef, useState, type RefObject } from 'react';

import { ENTRANCE_EASING } from './landingTokens';

/**
 * Web-only motion utilities for the landing page: reduced-motion detection,
 * mount-gated entrance animation classes, and shared keyframe durations.
 *
 * Entrance animations follow the spec's progressive-enhancement rule (§7):
 * content is never hidden by CSS alone. Animated elements start visible in
 * SSR/static markup; the `useEntrance` hook returns `true` after the client
 * mounts, at which point components apply their animation classes.
 */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function getReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** True when the user prefers reduced motion (safe on server). */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    setReduced(getReducedMotion());
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Returns `false` on first render (SSR + first client paint) and `true` after
 * mount. Components use the returned flag to apply entrance animation classes,
 * so content is always present even if JS fails or animations are skipped.
 */
export function useEntrance(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
}

/** Staggered per-chip fly-in delays used by the orbit avatars (spec §5.4). */
export const AVATAR_FLYIN_DELAYS = [0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.3];

/**
 * IntersectionObserver-based `useInView` hook (design spec sprint-8
 * §4.3) for scroll-reveal animations.
 *
 * - Returns `{ ref, inView, mounted }`.
 * - Observes with `threshold: 0.15` and `rootMargin: 0px 0px -40px`.
 * - Fires once: `disconnect()` after the first intersecting observation.
 * - SSR-safe: `mounted` is `false` on the server and first client paint;
 *   `inView` becomes `true` on client mount if the element already
 *   intersects.
 * - Progressive enhancement: falls back to `inView === true` when
 *   `IntersectionObserver` is unavailable.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}): { ref: RefObject<T | null>; inView: boolean; mounted: boolean } {
  const ref = useRef<T | null>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setMounted(true);
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      // Progressive enhancement: content is never hidden when the observer
      // is unavailable (older browsers, jsdom tests).
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: options?.rootMargin ?? '0px 0px -40px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, inView, mounted };
}

export const EASE = ENTRANCE_EASING;

export const TIMING = {
  header: '0.8s',
  heroLeft: '1s',
  heroRight: '1.2s',
  startProject: '0.6s',
  cursorBadge: '0.5s',
  avatar: '0.8s',
  ticker: '0.7s',
  footer: '0.5s',
} as const;

export const DELAY = {
  header: '0ms',
  heroLeft: '0ms',
  heroRight: '0.3s',
  startProject: '3.2s',
  cursorBadge: '3.6s',
  ticker: '0.6s',
  footer: '1.1s',
} as const;
