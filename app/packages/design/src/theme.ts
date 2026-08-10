import { colors } from './colors';
import { spacing } from './spacing';
import { typography, fontFamilies, fontWeights } from './typography';
import { radius } from './radius';
import { breakpoints } from './breakpoints';

/**
 * The single JoinOrigin theme consumed by styled-components ThemeProvider.
 * Keep token groups separate from styled-components — components read
 * values off the theme, they never hardcode raw design values.
 */
export const theme = {
  colors,
  spacing,
  typography,
  fontFamilies,
  fontWeights,
  radius,
  breakpoints,
} as const;

export type JoinOriginTheme = typeof theme;
