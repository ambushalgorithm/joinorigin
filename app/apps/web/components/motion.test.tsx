import { act, render } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { useRef } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import { useSceneMotion } from './motion';
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
