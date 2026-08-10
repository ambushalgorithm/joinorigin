/**
 * JoinOrigin corner radius scale (px).
 */
export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 999,
} as const;

export type RadiusTokens = typeof radius;
