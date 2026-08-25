import { act, fireEvent, render, screen } from '@testing-library/react';

import NavigationProgress, { NAV_PROGRESS_DELAY_MS } from './NavigationProgress';

/**
 * Unit tests for the thin top navigation progress bar (Sprint 22 Story G /
 * TASK-538): the >100ms show/hide contract.
 *
 * The component measures transitions with a capture-phase click listener +
 * `usePathname()` commit detection. `next/navigation` is mocked with a
 * mutable `mockPathname` so a test can simulate the router committing a new
 * route — `usePathname()` updates exactly when the new route's content
 * renders (navigation commit, not click time). Jest fake timers drive the
 * threshold clock deterministically.
 */
let mockPathname = '/';

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

const THRESHOLD = NAV_PROGRESS_DELAY_MS;

function renderProgress(delayMs?: number) {
  const view = render(<NavigationProgress delayMs={delayMs} />);
  const rerender = () => view.rerender(<NavigationProgress delayMs={delayMs} />);
  return {
    bar: () => screen.getByTestId('navigation-progress'),
    /** Simulate the router committing a new route (content rendered). */
    navigate: (pathname: string) => {
      mockPathname = pathname;
      rerender();
    },
  };
}

function clickLink(href: string, options: { target?: string } = {}) {
  const anchor = document.createElement('a');
  anchor.href = href;
  if (options.target) {
    anchor.target = options.target;
  }
  document.body.appendChild(anchor);
  fireEvent.click(anchor);
  anchor.remove();
}

/** Advance the fake clock inside React's act scope. */
function advance(ms: number) {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
}

describe('NavigationProgress', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockPathname = '/';
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('stays hidden on fast navigations (route commits inside the 100ms budget)', () => {
    const { bar, navigate } = renderProgress();

    clickLink('/en/features');
    // The route commits after 60ms — well inside the budget.
    advance(60);
    navigate('/en/features');

    // Well past the threshold: the pending timer was cleared on commit, so
    // the bar never flashes.
    advance(THRESHOLD * 2);
    expect(bar().getAttribute('data-visible')).toBe('false');
  });

  it('shows the bar only after the transition exceeds the >100ms threshold', () => {
    const { bar } = renderProgress();

    clickLink('/en/features');
    advance(THRESHOLD - 1);
    expect(bar().getAttribute('data-visible')).toBe('false');

    advance(1);
    expect(bar().getAttribute('data-visible')).toBe('true');
  });

  it('hides the bar when the new route content renders (route commit)', () => {
    const { bar, navigate } = renderProgress();

    clickLink('/en/features');
    advance(THRESHOLD + 1);
    expect(bar().getAttribute('data-visible')).toBe('true');

    navigate('/en/features');
    expect(bar().getAttribute('data-visible')).toBe('false');
  });

  it('honors a custom delay via the delayMs prop (test seam / tuning knob)', () => {
    const { bar } = renderProgress(50);

    clickLink('/en/guides');
    advance(49);
    expect(bar().getAttribute('data-visible')).toBe('false');

    advance(1);
    expect(bar().getAttribute('data-visible')).toBe('true');
  });

  it('ignores same-route, hash-only, and query-only links (no false positives)', () => {
    const { bar } = renderProgress();

    clickLink('/'); // current pathname
    clickLink('/#section'); // hash-only anchor
    clickLink('/?utm_source=test'); // same path, query delta only

    advance(THRESHOLD * 3);
    expect(bar().getAttribute('data-visible')).toBe('false');
  });

  it('ignores external, URI-scheme, and new-tab links (no route transition)', () => {
    const { bar } = renderProgress();

    clickLink('https://example.com');
    clickLink('mailto:hello@joinorigin.com');
    clickLink('//cdn.example.com/app.js');
    clickLink('/en/features', { target: '_blank' });

    advance(THRESHOLD * 3);
    expect(bar().getAttribute('data-visible')).toBe('false');
  });

  it('ignores clicks on non-anchor elements', () => {
    const { bar } = renderProgress();

    const button = document.createElement('button');
    document.body.appendChild(button);
    fireEvent.click(button);
    button.remove();

    advance(THRESHOLD * 3);
    expect(bar().getAttribute('data-visible')).toBe('false');
  });

  it('keeps the bar hidden for fast popstate traversals (back/forward within budget)', () => {
    const { bar, navigate } = renderProgress();

    // Browser back/forward starts a transition…
    act(() => {
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    advance(70);
    // …and the route commits before the budget elapses.
    navigate('/en/location');

    advance(THRESHOLD * 2);
    expect(bar().getAttribute('data-visible')).toBe('false');
  });

  it('respects prefers-reduced-motion: reports reduced, still shows on slow transitions', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = jest.fn((query: string) => ({
      matches: query.includes('prefers-reduced-motion') && query.includes('reduce'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(() => false),
    })) as unknown as typeof window.matchMedia;

    try {
      const { bar, navigate } = renderProgress();
      expect(bar().getAttribute('data-reduced-motion')).toBe('true');

      // Reduced motion means no animation — not no bar: the >100ms contract
      // still holds (appears only after the threshold, hides on commit).
      clickLink('/en/features');
      advance(THRESHOLD - 1);
      expect(bar().getAttribute('data-visible')).toBe('false');

      advance(1);
      expect(bar().getAttribute('data-visible')).toBe('true');

      navigate('/en/features');
      expect(bar().getAttribute('data-visible')).toBe('false');
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });
});
