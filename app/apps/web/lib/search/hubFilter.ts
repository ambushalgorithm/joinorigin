/**
 * Client-side hub filter helpers (TASK-317).
 *
 * Pure, framework-free functions used by the `/location` and `/guides` hub
 * search inputs. Filtering happens entirely in the browser against registry
 * data already present in the render model — no new route, no server
 * round-trip, no separate index.
 *
 * The debounce delay is shared (~180ms — the 150–200ms band from the task);
 * components that need it can also import the constant directly.
 */

/** Default debounce delay for hub search inputs (~180ms). */
export const HUB_FILTER_DEBOUNCE_MS = 180;

/**
 * Case-insensitive substring match. `true` for an empty/whitespace keyword so
 * an empty search shows the full set. The keyword is trimmed before matching
 * so surrounding whitespace never breaks a match.
 */
export function matchesKeyword(text: string, keyword: string): boolean {
  const needle = keyword.trim().toLowerCase();
  if (!needle) return true;
  return text.toLowerCase().includes(needle);
}

/**
 * Filter a list of items by a keyword using a text accessor. Case-insensitive
 * substring match; empty keyword returns the original list.
 */
export function filterByKeyword<T>(items: T[], keyword: string, getText: (item: T) => string): T[] {
  const needle = keyword.trim().toLowerCase();
  if (!needle) return items;
  return items.filter((item) => getText(item).toLowerCase().includes(needle));
}

/** Cancelable debounce wrapper (trailing-edge: fires after quiet period). */
export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  delayMs = HUB_FILTER_DEBOUNCE_MS,
): ((...args: A) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: A) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, delayMs);
  };

  debounced.cancel = () => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };

  return debounced;
}
