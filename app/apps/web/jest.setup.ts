import '@testing-library/jest-dom';

import fs from 'fs';
import path from 'path';

import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Headers, Request, Response } from 'undici';

/**
 * JSDOM browser API polyfills + module mocks needed by the landing page tests.
 */

// Node's web Request/Response/Headers are hidden by the jsdom environment;
// the /api/leads route tests construct NextRequest against them.
if (typeof globalThis.Request === 'undefined') {
  Object.assign(globalThis, { Request, Response, Headers });
}

// matchMedia (used by useReducedMotion; also required by ScrollTrigger's
// plugin registration below).
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// GSAP plugin registration for tests (same single-registration point as
// lib/gsap.ts; SSR-safe via the window guard). Runs after the matchMedia
// polyfill so ScrollTrigger's enable() can read window.matchMedia.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// requestAnimationFrame / cancelAnimationFrame (used by useCountUp, useEntrance).
if (typeof globalThis.requestAnimationFrame !== 'function') {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback): number =>
    setTimeout(() => callback(performance.now()), 16) as unknown as number;
}
if (typeof globalThis.cancelAnimationFrame !== 'function') {
  // RN 0.87 global type: { (handle: number): void; (handle: number | null | undefined): void }
  globalThis.cancelAnimationFrame = (id: number | null | undefined): void => {
    if (id != null) {
      clearTimeout(id);
    }
  };
}

// next/image renders a plain <img> in tests.
jest.mock('next/image', () => {
  const NextImage = ({
    src,
    alt = '',
    width,
    height,
    style,
    className,
    ...rest
  }: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string;
  }) =>
    React.createElement('img', {
      src: typeof src === 'string' ? src : '',
      alt,
      width,
      height,
      style,
      className,
      ...rest,
    });
  return { __esModule: true, default: NextImage };
});

// next/navigation hooks throw "invariant expected app router to be mounted"
// outside the App Router context, so every suite that renders the Header or
// Footer (which mount the LanguageSwitcher — TASK-450) needs stubs. A global
// default keeps those suites green; tests that assert navigation behavior or
// pathname tracking override it locally via their own jest.mock('next/navigation')
// (e.g. LanguageSwitcher.test.tsx, the analytics provider tests), which take
// precedence over this setup-level mock.
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
  useServerInsertedHTML: jest.fn(),
}));

/**
 * GSAP teardown (TASK-290) — unit tests exit cleanly.
 *
 * The scene/hero motion hooks register infinite `repeat: -1` timelines
 * (OrbitViz, motion.ts useSceneMotion, MenuHero) inside `gsap.matchMedia()`
 * contexts. In jsdom the mock matchMedia reports `(prefers-reduced-motion:
 * no-preference)` as false so the timeline callbacks never fire, but any test
 * that runs with motion enabled leaves its timelines on GSAP's global
 * timeline and keeps the ticker alive. These afterEach/afterAll hooks:
 *
 *  1. clear the global timeline (kills every tween, including repeat:-1);
 *  2. kill any tween targeting `*` that was created outside the timeline;
 *  3. kill every ScrollTrigger instance (also clears the refresh ticker);
 *  4. revert all matchMedia contexts (kills context tweens + matchMedia
 *     change listeners), matching what gsap.context().revert() does on
 *     unmount for any context that leaked past React cleanup.
 */

// Track every gsap.matchMedia() context created during a test so teardown
// can revert them deterministically (GSAP exposes no public registry for
// matchMedia instances). The wrapper delegates to the original and returns
// the same instance, so runtime behavior is unchanged.
const matchMediaContexts: Array<{ revert: () => void }> = [];
const originalMatchMedia = gsap.matchMedia.bind(gsap);
gsap.matchMedia = ((scope?: Element | string | object) => {
  const mm = originalMatchMedia(scope);
  matchMediaContexts.push(mm);
  return mm;
}) as typeof gsap.matchMedia;

function teardownGtween(): void {
  try {
    gsap.globalTimeline.clear();
    gsap.killTweensOf('*');
    ScrollTrigger.killAll();
    while (matchMediaContexts.length > 0) {
      matchMediaContexts.pop()?.revert();
    }
  } catch {
    // GSAP may not be initialized in suites that never import it.
  }
}

afterEach(() => {
  teardownGtween();
});

afterAll(() => {
  teardownGtween();
});

/**
 * TASK-523 — HARD 600-line cap on unit test files (jest tripwire).
 *
 * ESLint `max-lines` (root .eslintrc.cjs overrides) blocks oversized test
 * files at lint time (pre-commit + `pnpm lint`), but lint never runs inside
 * the jest process. This hook reads the currently-executing test file path
 * from the jest global state and fails the suite BEFORE any of its tests
 * execute — a file that outgrew the cap is caught in milliseconds instead
 * of after a multi-minute run.
 *
 * Counting matches ESLint's max-lines default: every physical line in the
 * file counts (blank lines included, the trailing newline's empty line
 * excluded), so a file that passes lint also passes this tripwire and vice
 * versa. The 2308-line locationView.test.ts was split into 7 concern files
 * (TASK-521) that are all under the limit; this guard keeps future test
 * files from growing back. e2e specs (*.spec.ts) run under Playwright, not
 * jest, so they are inherently exempt.
 */
beforeAll(() => {
  const testPath = expect.getState().testPath ?? '';
  if (!testPath) {
    return;
  }
  const source = fs.readFileSync(testPath, 'utf8');
  const lines = source.split('\n');
  // ESLint's max-lines pops the trailing empty line produced by a final
  // newline before counting, so mirror that here for identical semantics.
  if (lines.length > 1 && lines[lines.length - 1] === '') {
    lines.pop();
  }
  const lineCount = lines.length;
  if (lineCount > 600) {
    throw new Error(
      `Test file exceeds the 600-line limit (${lineCount} lines): ${path.relative(process.cwd(), testPath)}. ` +
        'Split the file into focused suites by concern (see TASK-521 for the pattern).',
    );
  }
});
