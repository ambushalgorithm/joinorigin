'use client';

import { useEffect, useState } from 'react';

import { HUB_FILTER_DEBOUNCE_MS } from './hubFilter';

/**
 * Debounced state value for hub search inputs (TASK-317).
 *
 * The input value updates on every keystroke (so the field feels instant and
 * keyboard-accessible), but the *filtered* visible set only recomputes after
 * the user pauses typing for ~180ms — no server round-trip, pure client-side.
 */
export function useDebouncedValue<T>(value: T, delayMs = HUB_FILTER_DEBOUNCE_MS): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
