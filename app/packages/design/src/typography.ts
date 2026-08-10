/**
 * JoinOrigin typography scale (font sizes in px) and font weights.
 * `displayLg`/`displayXl` power the landing hero heading scale.
 */
export const typography = {
  caption: 12,
  body: 14,
  bodyLarge: 16,
  title: 20,
  heading: 28,
  display: 36,
  displayLg: 52,
  displayXl: 64,
} as const;

export type TypographyTokens = typeof typography;

/**
 * Hosted font families. Inter renders body/UI copy, Urbanist renders
 * display/headings. Both are served locally from `apps/web/public/fonts`.
 */
export const fontFamilies = {
  sans: 'Inter',
  display: 'Urbanist',
} as const;

export type FontFamilyTokens = typeof fontFamilies;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export type FontWeightTokens = typeof fontWeights;
