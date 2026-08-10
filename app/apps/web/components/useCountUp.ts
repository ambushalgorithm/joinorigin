import { useEffect, useState } from 'react';

/**
 * requestAnimationFrame-based count-up hook (spec §5.4).
 *
 * Animates `0 → target` over `durationMs` with `easeOutCubic`, starting after
 * `delayMs`. Returns the current integer value so callers can format it.
 * With `disabled` (reduced motion) it snaps straight to the target.
 *
 * A setTimeout fallback keeps the hook working in test environments that do
 * not implement requestAnimationFrame.
 */

export interface UseCountUpOptions {
  durationMs?: number;
  delayMs?: number;
  disabled?: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function requestFrame(callback: (now: number) => void): number {
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(callback);
  }
  return setTimeout(() => callback(performance.now()), 16) as unknown as number;
}

function cancelFrame(id: number): void {
  if (typeof cancelAnimationFrame === 'function') {
    cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
}

export function useCountUp(target: number, options: UseCountUpOptions = {}): number {
  const { durationMs = 2000, delayMs = 1200, disabled = false } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (disabled) {
      setValue(target);
      return undefined;
    }

    let frameId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) {
        startTime = now;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) {
        frameId = requestFrame(tick);
      }
    };

    timeoutId = setTimeout(() => {
      frameId = requestFrame(tick);
    }, delayMs);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      cancelFrame(frameId);
    };
  }, [target, durationMs, delayMs, disabled]);

  return value;
}

/** Formats the count with a thousands separator (e.g. `2,400`). */
export function formatCount(value: number): string {
  return value.toLocaleString('en-US');
}

export default useCountUp;
