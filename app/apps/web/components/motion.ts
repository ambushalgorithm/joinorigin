import { useEffect, useState } from 'react';

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
