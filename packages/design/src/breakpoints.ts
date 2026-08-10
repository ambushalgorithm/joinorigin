/**
 * JoinOrigin responsive breakpoints (px, min-width semantics).
 */
export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export type BreakpointTokens = typeof breakpoints;
