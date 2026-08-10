/**
 * JoinOrigin typography scale (font sizes in px) and font weights.
 */
export const typography = {
  caption: 12,
  body: 14,
  bodyLarge: 16,
  title: 20,
  heading: 28,
  display: 36,
} as const;

export type TypographyTokens = typeof typography;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type FontWeightTokens = typeof fontWeights;
