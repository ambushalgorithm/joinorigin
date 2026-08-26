import { useEffect, useState } from 'react';

/**
 * requestAnimationFrame-based count-up hook (spec §5.4).
 *
 * SSR/static-safe (G-5): the initial render — and therefore the server-rendered
 * HTML — is the FINAL target, so no-JS/static output shows "2,400+" / "484"
 * instead of a "0+" placeholder. The `0 → target` animation runs client-side
 * ONLY: after hydration the effect resets the value to 0, then animates to the
 * target over `durationMs` with `easeOutCubic`, starting after `delayMs`.
 *
 * With `disabled` (reduced motion) it stays snapped straight to the target.
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
  // SSR/static-safe (G-5): initialize at the FINAL target so server-rendered
  // HTML shows the finished figure; the count-up animation starts from 0 in
  // the effect below, i.e. only after hydration on the client.
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (disabled) {
      setValue(target);
      return undefined;
    }

    // Begin the client-side animation at 0 (the SSR HTML already showed the
    // final target; effects never run during server rendering).
    setValue(0);
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

/** Formats the count with a thousands separator in the active locale
 *  (arch-i18n §9.1 — e.g. `2,400` en, `2.400` de). Defaults to `en-US`. */
export function formatCount(value: number, locale = 'en'): string {
  return value.toLocaleString(locale);
}

export default useCountUp;
