/**
 * JoinOrigin color tokens — "Origin Spectrum" brand palette
 * (design spec sprint-10-menu-anim §3.2).
 *
 * The palette IS the brand: every surface, border, glow, and mesh derives
 * from this token set. Components must not hardcode raw colors — keep all
 * hex decisions here (web-local gradient strings live in landingTokens /
 * menuTokens).
 */
export const colors = {
  // Base canvases — brand-tinted deep indigo (replaces grey-black #0F1115 family)
  background: '#0A1022', // page canvas
  backgroundAlt: '#0D1530', // alternating canvas for plain section bands
  surface: '#141D3C', // cards, panels, mobile menu, modal
  surfaceElevated: '#1D2850', // inputs, table headers, hover
  surfaceOverlay: '#253261', // strong hover/press, active mobile link
  border: '#2C3A6E', // hairlines, card borders
  borderStrong: '#3E4F8F', // strong borders, focus-companion hairlines

  // Brand core
  primary: '#5D7CFF', // electric indigo
  primaryHover: '#4667F2', // button/CTA hover
  primarySoft: '#9DB4FF', // secondary gradient stop
  primaryContrast: '#FFFFFF', // text on primary fills

  // Text
  text: '#F5F8FF', // primary text
  textMuted: '#dddfe7', // secondary text
  textSubtle: '#7E89B0', // tertiary text, placeholders

  // Feedback
  destructive: '#F2555A', // errors
  destructiveSoft: '#FFE3E5', // error surfaces/banners
  success: '#2FBF71', // success
  successSoft: '#D9F7E6', // success surfaces
  warning: '#F5A524', // warning
  warningSoft: '#FFF0D0', // warning surfaces
  info: '#38BDF8', // info/accent cyan

  // Focus + overlay
  focusRing: '#7C9CFF', // :focus-visible outline
  scrim: 'rgba(6, 10, 24, 0.72)', // modal backdrop

  // Gradient-mesh spectrum (brand identity stops — "Origin Spectrum")
  meshIndigo: '#5D7CFF',
  meshViolet: '#8B5CF6',
  meshMagenta: '#F472B6',
  meshRose: '#F43F5E',
  meshAmber: '#F5A524',
  meshCyan: '#38BDF8',
  meshTeal: '#2DD4BF',
  meshGreen: '#2FBF71',
} as const;

export type ColorTokens = typeof colors;
