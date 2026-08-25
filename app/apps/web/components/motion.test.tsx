import { act, render, renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { useRef } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import {
  SCROLL_TRIGGER_BUFFER_PX,
  SCROLL_TRIGGER_ROOT_MARGIN,
  SCROLL_TRIGGER_START,
  useEntrance,
  useReducedMotion,
  useSceneMotion,
} from './motion';
import { FeaturesScene } from './scenes/FeaturesScene';

/**
 * Unit tests for the GSAP scene-motion hook (design spec sprint-10-menu-anim
 * §5.5) hydration-deferral regression (TASK-407).
 *
 * The scene art is code-split through `next/dynamic` (TASK-404): the scene
 * SVG is present in the SSR HTML (no FOUC) but its React subtree hydrates in
 * a LATER commit than the page shell. Registering GSAP in a layout effect
 * (the old `useGSAP` behavior) mutated the SSR'd `.scene-main-group`
 * (`transform` / `data-svg-origin` / inline `style`) BEFORE React hydrated
 * the chunk, producing React 19 "attributes did not match" hydration errors.
 *
 * These tests pin the new contract:
 *  1. the initial server markup carries NO GSAP-written attributes on
 *     `.scene-main-group` (the scene SVG renders clean);
 *  2. the hook writes NO GSAP attributes before the post-paint rAF poll
 *     registers (nothing is mutated synchronously on mount);
 *  3. once the poll fires and the target is React-hydrated, the timeline
 *     starts (ring spin + hub float still work).
 */

/** Minimal motion-enabled matchMedia mock (jsdom default reports reduce). */
function mockMotionEnabledMatchMedia(): () => void {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    matches: query === '(prefers-reduced-motion: no-preference)',
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
  return () => {
    window.matchMedia = original;
  };
}

/** Harness: a scope with the GSAP targets, driven by useSceneMotion. */
function MotionHarness() {
  const ref = useRef<HTMLDivElement>(null);
  useSceneMotion(ref);
  return (
    <div ref={ref} data-testid="scene-scope">
      <svg viewBox="0 0 560 420">
        <g className="scene-main-group" data-testid="scene-main-group">
          <circle cx="280" cy="210" r="40" />
        </g>
      </svg>
      <span className="scene-ring" data-testid="scene-ring" />
    </div>
  );
}

describe('useSceneMotion hydration deferral (TASK-407)', () => {
  it('writes no transform/data-svg-origin/style on .scene-main-group in the initial SSR markup', () => {
    // The scene SVG is what Next.js streams for the code-split scene chunk
    // (ssr: true, no FOUC). GSAP must never touch this markup server-side.
    const html = renderToString(
      <ThemeProvider theme={theme}>
        <FeaturesScene alt="" primary="#5D7CFF" secondary="#38BDF8" />
      </ThemeProvider>,
    );
    const mainGroupTag = html.match(/<g[^>]*class="[^"]*scene-main-group[^"]*"[^>]*>/);
    expect(mainGroupTag).not.toBeNull();
    expect(mainGroupTag![0]).not.toContain('transform=');
    expect(mainGroupTag![0]).not.toContain('data-svg-origin');
    expect(mainGroupTag![0]).not.toContain('style=');
  });

  it('writes no GSAP attributes before animation starts (post-paint rAF poll not yet fired)', () => {
    const restore = mockMotionEnabledMatchMedia();
    try {
      const { container } = render(<MotionHarness />);
      const main = container.querySelector('.scene-main-group') as Element;
      const ring = container.querySelector('.scene-ring') as Element;

      // The old useGSAP layout effect ran synchronously on mount and wrote
      // transform/data-svg-origin/inline style before the scene chunk had a
      // chance to hydrate. The deferred registration must leave the targets
      // untouched until the post-paint rAF poll fires.
      expect(main.getAttribute('transform')).toBeNull();
      expect(main.getAttribute('data-svg-origin')).toBeNull();
      expect(main.getAttribute('style')).toBeNull();
      expect(ring.getAttribute('style')).toBeNull();
    } finally {
      restore();
    }
  });

  it('starts the ring spin + hub float after the rAF poll registers (motion enabled)', async () => {
    const restore = mockMotionEnabledMatchMedia();
    try {
      const { container } = render(<MotionHarness />);
      const main = container.querySelector('.scene-main-group') as Element;
      const ring = container.querySelector('.scene-ring') as Element;

      // Let the post-paint rAF poll run — the timeline should register and
      // start animating (transform written by GSAP).
      await new Promise((resolve) => setTimeout(resolve, 60));
      await act(async () => {});

      expect(main.getAttribute('style')).toContain('transform');
      expect(ring.getAttribute('style')).toContain('rotate');
    } finally {
      restore();
    }
  });
});

/**
 * Story B (Sprint 22) — scroll-trigger ~90% viewport entry + reduced-motion
 * settled state (TASK-530 contract, asserted at the unit level).
 *
 * The pre-entry buffer constants power BOTH the ScrollTrigger start string
 * (`top bottom+=150px`) and the IntersectionObserver rootMargin used by
 * `useInView`, so the unit tests pin the shared numbers exactly once here.
 */
describe('Story B: pre-entry scroll-trigger contract (~90% viewport entry)', () => {
  it('buffers the scroll trigger ~100–150px BELOW the viewport bottom (pre-entry)', () => {
    // Research decision (TASK-526/530): the animation must start while the
    // element is still ~150px below the fold so it is mid-flight when the
    // element becomes visible (~90% viewport height entry).
    expect(SCROLL_TRIGGER_BUFFER_PX).toBe(150);
  });

  it('builds the ScrollTrigger start from the pre-entry buffer', () => {
    // `top bottom+=150px` = the trigger fires when the element top passes a
    // line 150px BELOW the viewport bottom — i.e. BEFORE the element enters.
    expect(SCROLL_TRIGGER_START).toBe('top bottom+=150px');
  });

  it('expands the IntersectionObserver root by the same pre-entry buffer', () => {
    // Positive bottom rootMargin expands the detection box ~150px below the
    // viewport, so `useInView` flips true while the element is still below
    // the fold — the same contract Reveal/SectionBand use via ScrollTrigger.
    expect(SCROLL_TRIGGER_ROOT_MARGIN).toBe('0px 0px 150px 0px');
  });

  it('matches the buffer to the ~90% viewport-entry design target', () => {
    // At 100vh the buffer is roughly 150/1000 of the viewport — the spec
    // allows 100–150px; we lock the top of that band.
    const viewportShare = SCROLL_TRIGGER_BUFFER_PX / 1000;
    expect(viewportShare).toBeGreaterThanOrEqual(0.1);
    expect(viewportShare).toBeLessThanOrEqual(0.15);
  });
});

describe('Story B: reduced-motion settled state', () => {
  function mockReducedMotion() {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;
    return () => {
      window.matchMedia = original;
    };
  }

  it('useReducedMotion reports true when the user prefers reduced motion', () => {
    const restore = mockReducedMotion();
    try {
      const { result } = renderHook(() => useReducedMotion());
      // The mount effect reads the live media query (jsdom flushes effects
      // synchronously under renderHook) — reduced-motion users get `true`.
      expect(result.current).toBe(true);
    } finally {
      restore();
    }
  });

  it('useReducedMotion returns false when motion is enabled', () => {
    const restore = mockMotionEnabledMatchMedia();
    try {
      const { result } = renderHook(() => useReducedMotion());
      expect(result.current).toBe(false);
    } finally {
      restore();
    }
  });

  it('leaves scene targets at the settled static state under prefers-reduced-motion: reduce', async () => {
    // Default jsdom matchMedia reports `(prefers-reduced-motion: no-preference)`
    // as NOT matching, so the GSAP timeline under gsap.matchMedia() is never
    // registered — the scene stays in its static SSR state (settled).
    const restore = mockReducedMotion();
    try {
      const { container } = render(<MotionHarness />);
      const main = container.querySelector('.scene-main-group') as Element;
      const ring = container.querySelector('.scene-ring') as Element;

      // Let the post-paint rAF poll run — even after the poll, no tween may
      // be registered for reduced-motion users (settled state).
      await new Promise((resolve) => setTimeout(resolve, 60));
      await act(async () => {});

      expect(main.getAttribute('style')).toBeNull();
      expect(ring.getAttribute('style')).toBeNull();
      expect(main.getAttribute('transform')).toBeNull();
    } finally {
      restore();
    }
  });
});

describe('useEntrance (progressive enhancement)', () => {
  it('stays false on the first render and flips true after the post-paint rAF', async () => {
    const { result } = renderHook(() => useEntrance());
    expect(result.current).toBe(false);
    // The mount effect schedules a rAF (16ms setTimeout polyfill); wait for
    // the frame so the entrance flag flips.
    await new Promise((resolve) => setTimeout(resolve, 30));
    await act(async () => {});
    expect(result.current).toBe(true);
  });
});
