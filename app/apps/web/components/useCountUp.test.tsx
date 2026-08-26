import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

import { formatCount, useCountUp } from './useCountUp';

/** Tiny harness so the hook can be server-rendered (effects never run). */
function CountHarness({ target }: { target: number }) {
  const count = useCountUp(target, { delayMs: 200, durationMs: 1000 });
  return <span>{count}</span>;
}

describe('useCountUp', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('SSR/static HTML renders the FINAL target, not 0 (G-5)', () => {
    const html = renderToString(<CountHarness target={2400} />);
    expect(html).toContain('>2400<');
    expect(html).not.toContain('>0<');
  });

  it('starts the client animation at 0 and reaches the target after delay + duration', () => {
    const { result } = renderHook(() => useCountUp(2400, { delayMs: 200, durationMs: 1000 }));

    // After hydration (effects flushed) the animation restarts from 0.
    expect(result.current).toBe(0);

    act(() => {
      jest.advanceTimersByTime(199);
    });
    expect(result.current).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1200);
    });
    expect(result.current).toBe(2400);
  });

  it('snaps to the target when disabled (reduced motion)', () => {
    const { result } = renderHook(() =>
      useCountUp(2400, { delayMs: 200, durationMs: 1000, disabled: true }),
    );
    expect(result.current).toBe(2400);
  });

  it('formats counts with a thousands separator', () => {
    expect(formatCount(2400)).toBe('2,400');
    expect(formatCount(0)).toBe('0');
  });
});
