/**
 * JoinOrigin responsive breakpoints (px, min-width semantics).
 *
 * Mobile-first: the default (no-query) styles are the minimum-viewport
 * layout; every `@media (min-width: …)` enhancement applies from `mobile`
 * upward. `minimum` anchors the researched floor (TASK-526) — the app is
 * designed and verified from 320px CSS width up; widths below it degrade
 * gracefully rather than being designed for.
 */
export const breakpoints = {
  /** Minimum supported viewport width (researched floor, TASK-526). */
  minimum: 320,
  /** Narrowest foldable-cover class (Z Fold 4/5, Z Flip 5/6 covers). */
  foldable: 360,
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export type BreakpointTokens = typeof breakpoints;
