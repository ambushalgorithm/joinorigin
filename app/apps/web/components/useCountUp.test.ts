import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';

import { formatCount, useCountUp } from './useCountUp';

describe('useCountUp', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts at 0 and reaches the target after delay + duration', () => {
    const { result } = renderHook(() => useCountUp(2400, { delayMs: 200, durationMs: 1000 }));

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
