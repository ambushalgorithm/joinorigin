import { renderHook } from '@testing-library/react';

import { useInView } from './motion';

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
