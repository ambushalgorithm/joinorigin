import { useEffect, useRef, useState, type RefObject } from 'react';

import { gsap } from '../lib/gsap';

import { ENTRANCE_EASING } from './landingTokens';

/**
 * Web-only motion utilities for the landing page: reduced-motion detection,
 * mount-gated entrance animation classes, shared keyframe durations, and the
 * GSAP timing tokens + scene-motion hook (design spec sprint-10-menu-anim §5.3).
 *
 * Entrance animations follow the spec's progressive-enhancement rule (§7):
 * content is never hidden by CSS alone. Animated elements start visible in
 * SSR/static markup; GSAP uses `fromTo()` (never `from()`) inside
 * `gsap.matchMedia()` under `(prefers-reduced-motion: no-preference)` so the
 * final static state is always rendered first.
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

/* ---------------------------------------------------------------------------
 * GSAP motion tokens (design spec sprint-10-menu-anim §5.3)
 * ------------------------------------------------------------------------- */

/** Shared GSAP entrance easing. */
export const GSAP_EASE = { ease: 'power3.out' } as const;

/** Scene float/ring timings in seconds. */
export const SCENE_TIMINGS = {
  /** s up, yoyo down (hub float). */
  float: 4.5,
  /** s per counter-revolution (background ring). */
  ring: 60,
} as const;

/** Menu hero staggered entrance offsets (seconds). */
export const HERO_STAGGER = {
  eyebrow: 0,
  title: 0.08,
  lead: 0.16,
  actions: 0.26,
  meta: 0.34,
  scene: 0.2,
} as const;

/**
 * Shared GSAP scene timeline (design spec sprint-10-menu-anim §5.5) — drives
 * the inline scene SVG motion in ONE document: hub float and background ring
 * counter-spin. The `.scene-orbit-group` rotation and its coupled
 * `.scene-node` counter-rotation (which existed only to keep glyphs upright
 * during the orbit spin) were REMOVED (TASK-291) — GSAP 3.15's SVG
 * transform-origin handling made the orbit cluster drift off-center despite
 * the TASK-290 pivot pin, so the orbit cluster now stays static and centered.
 * Reduced-motion users get the final static state instantly (no tweens
 * registered).
 *
 * Hydration safety (TASK-407): the scene art is code-split through
 * `next/dynamic` (TASK-404), so the scene SVG is present in the SSR HTML
 * (no FOUC) but its React subtree hydrates in a LATER commit than the
 * surrounding page shell. A layout-effect registration (useGSAP's default)
 * would mutate the SSR'd `.scene-main-group` — `transform`, `data-svg-origin`,
 * inline `style` — BEFORE React hydrates the scene chunk, producing React 19
 * "attributes did not match" hydration errors. Registration is therefore
 * deferred to a post-paint `useEffect` + `requestAnimationFrame` poll that
 * waits until a GSAP target (`.scene-main-group` / `.scene-ring`) exists in
 * the DOM AND React has claimed it (React attaches `__reactFiber$` /
 * `__reactProps$` internal markers to hydrated host nodes). Everything runs
 * inside `gsap.context()` so the timeline/matchMedia revert cleanly on
 * unmount.
 */
const SCENE_TARGET_SELECTORS = ['.scene-main-group', '.scene-ring'] as const;

/**
 * Give the code-split scene chunk a generous window to hydrate before giving
 * up (a failed/lost chunk must not spin the rAF poll forever — the scene then
 * simply stays in its static SSR state, matching reduced-motion behavior).
 */
const SCENE_HYDRATION_MAX_WAIT_MS = 30_000;

/** True once React has hydrated the node (attaches fiber/props internals). */
function isReactHydrated(node: Element | null | undefined): boolean {
  if (!node) {
    return false;
  }
  return Object.keys(node).some(
    (key) => key.startsWith('__reactFiber') || key.startsWith('__reactProps'),
  );
}

export function useSceneMotion(scopeRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) {
      return undefined;
    }

    let cancelled = false;
    let rafId = 0;
    let context: gsap.Context | null = null;
    const startedAt = Date.now();

    const tryRegister = (): void => {
      if (cancelled) {
        return;
      }
      // Wait until the code-split scene chunk has hydrated: the GSAP targets
      // exist in the SSR HTML immediately (no FOUC), but React only claims
      // them when the lazy chunk hydrates in a later commit. Registering
      // earlier mutates SSR DOM that React is about to diff (TASK-407).
      // NOTE: `.scene-ring` is shell-owned (hydrates with the first commit),
      // so EVERY present target must be React-claimed — `some()` would pass
      // as soon as the ring hydrates, while `.scene-main-group` (inside the
      // lazy chunk) is still unclaimed.
      const q = gsap.utils.selector(scope);
      const targets = SCENE_TARGET_SELECTORS.flatMap(
        (selector) => Array.from(q(selector)) as Element[],
      );
      const hydrated = targets.length > 0 && targets.every((target) => isReactHydrated(target));

      if (!hydrated) {
        // Keep polling while the chunk could still arrive; give up quietly
        // after the window (scene stays static, same as reduced-motion).
        if (Date.now() - startedAt < SCENE_HYDRATION_MAX_WAIT_MS) {
          rafId = requestAnimationFrame(tryRegister);
        }
        return;
      }

      context = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
          const q2 = gsap.utils.selector(scope);

          // GSAP-native SVG pivot (TASK-290). GSAP rewrites transform-origin
          // for SVG elements in viewBox units, so the CSS-only
          // `transform-box: fill-box; transform-origin: center` rule on the
          // scene primitives is NOT honored when a transform tween starts — the
          // floating hub group would pivot around the viewBox origin and drift
          // off-center. Pinning the transform-box/origin per target via
          // gsap.set() keeps the float tween positioned correctly. Only set
          // targets that exist (not every scene ships every group — avoids GSAP
          // "target not found" console noise).
          const pinPivot = (selector: string): void => {
            if (q2(selector).length > 0) {
              gsap.set(q2(selector), {
                transformBox: 'fill-box',
                transformOrigin: 'center center',
              });
            }
          };
          pinPivot('.scene-main-group');

          const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
          // Only add tween steps for groups the scene actually ships — GSAP
          // warns on empty targets (e.g. the 404 page has no `.scene-ring`).
          if (q2('.scene-main-group').length > 0) {
            tl.to(
              q2('.scene-main-group'),
              {
                y: -10,
                duration: SCENE_TIMINGS.float,
                yoyo: true,
                repeat: 1,
                ease: 'sine.inOut',
              },
              0,
            );
          }
          if (q2('.scene-ring').length > 0) {
            tl.to(q2('.scene-ring'), { rotation: -360, duration: SCENE_TIMINGS.ring }, 0);
          }
        });
      }, scope);
    };

    rafId = requestAnimationFrame(tryRegister);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      context?.revert();
    };
  }, [scopeRef]);
}
