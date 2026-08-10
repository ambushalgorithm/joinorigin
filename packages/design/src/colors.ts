/**
 * JoinOrigin color tokens.
 * Keep palette decisions here — components must not hardcode raw colors.
 */
export const colors = {
  background: '#0F1115',
  surface: '#181B21',
  surfaceElevated: '#22262E',
  border: '#2C313A',
  primary: '#4F7DF9',
  primaryContrast: '#FFFFFF',
  text: '#F5F7FA',
  textMuted: '#9AA3B2',
  destructive: '#E5484D',
  success: '#30A46C',
  warning: '#F5A524',
} as const;

export type ColorTokens = typeof colors;
