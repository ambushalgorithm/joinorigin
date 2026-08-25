import { renderHook } from '@testing-library/react';

import { SCROLL_TRIGGER_ROOT_MARGIN, SCROLL_TRIGGER_START, useInView } from './motion';

/**
 * Unit tests for the `useInView` scroll-reveal hook (spec sprint-8 §4.3).
 *
 * jsdom has no `IntersectionObserver`, so the hook must fall back to
 * `inView === true` (progressive enhancement) while still reporting the
 * mount state used by `Reveal` to avoid hiding SSR content.
 */

describe('useInView', () => {
  it('reports mounted + inView fallback when IntersectionObserver is unavailable', () => {
    const { result } = renderHook(() => useInView<HTMLDivElement>());

    // Without IntersectionObserver the hook reports inView = true so content
    // is never hidden by CSS (progressive enhancement).
    expect(result.current.mounted).toBe(true);
    expect(result.current.inView).toBe(true);
    expect(result.current.ref).toHaveProperty('current');
    expect(result.current.ref.current).toBeNull();
  });
});

describe('Story B pre-entry scroll-trigger contract', () => {
  it('fires ScrollTrigger reveals ~100-150px BEFORE the element enters the viewport', () => {
    // `top bottom+=150px` = the trigger line sits 150px BELOW the viewport
    // bottom, so the animation starts pre-entry (~90% viewport height entry)
    // and is mid-flight when the element becomes visible.
    expect(SCROLL_TRIGGER_START).toBe('top bottom+=150px');
  });

  it('uses the same pre-entry buffer for the IntersectionObserver rootMargin', () => {
    // Positive bottom rootMargin expands the detection box ~150px below the
    // viewport, so useInView flips true while the element is still below the
    // fold — the same contract Reveal/SectionBand use via ScrollTrigger.
    expect(SCROLL_TRIGGER_ROOT_MARGIN).toBe('0px 0px 150px 0px');
  });
});
