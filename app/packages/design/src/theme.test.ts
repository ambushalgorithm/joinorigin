import { theme, colors, spacing, typography, fontFamilies, radius, breakpoints } from './index';

describe('design tokens', () => {
  it('exposes a theme with all token groups', () => {
    expect(theme.colors).toEqual(colors);
    expect(theme.spacing).toEqual(spacing);
    expect(theme.typography).toEqual(typography);
    expect(theme.fontFamilies).toEqual(fontFamilies);
    expect(theme.radius).toEqual(radius);
  });

  it('uses brand-consistent starter values', () => {
    expect(theme.colors.primary).toBe('#5977f5');
    expect(theme.colors.background).toBe('#0A1022');
    expect(theme.spacing.md).toBe(16);
    expect(theme.radius.md).toBe(10);
    expect(theme.typography.body).toBe(14);
  });

  it('exposes the Origin Spectrum brand token set (spec sprint-10-menu-anim §3.2)', () => {
    // Base canvases — brand-tinted deep indigo (replaces the grey-black family).
    expect(theme.colors.background).toBe('#0A1022');
    expect(theme.colors.backgroundAlt).toBe('#0D1530');
    expect(theme.colors.surface).toBe('#141D3C');
    expect(theme.colors.surfaceElevated).toBe('#1D2850');
    expect(theme.colors.surfaceOverlay).toBe('#253261');
    expect(theme.colors.border).toBe('#2C3A6E');
    expect(theme.colors.borderStrong).toBe('#3E4F8F');
    // Brand core.
    expect(theme.colors.primary).toBe('#5977f5');
    expect(theme.colors.primaryHover).toBe('#4667F2');
    expect(theme.colors.primarySoft).toBe('#cfdaff');
    expect(theme.colors.primaryContrast).toBe('#FFFFFF');
    // Text.
    expect(theme.colors.text).toBe('#F5F8FF');
    expect(theme.colors.textMuted).toBe('#dddfe7');
    expect(theme.colors.textSubtle).toBe('#7E89B0');
    // Feedback + soft variants.
    expect(theme.colors.destructive).toBe('#F2555A');
    expect(theme.colors.destructiveSoft).toBe('#FFE3E5');
    expect(theme.colors.success).toBe('#2FBF71');
    expect(theme.colors.successSoft).toBe('#D9F7E6');
    expect(theme.colors.warning).toBe('#F5A524');
    expect(theme.colors.warningSoft).toBe('#FFF0D0');
    expect(theme.colors.info).toBe('#38BDF8');
    // Focus + overlay.
    expect(theme.colors.focusRing).toBe('#7C9CFF');
    expect(theme.colors.scrim).toBe('rgba(6, 10, 24, 0.72)');
    // Gradient-mesh spectrum stops.
    expect(theme.colors.meshIndigo).toBe('#5D7CFF');
    expect(theme.colors.meshViolet).toBe('#8B5CF6');
    expect(theme.colors.meshMagenta).toBe('#F472B6');
    expect(theme.colors.meshRose).toBe('#F43F5E');
    expect(theme.colors.meshAmber).toBe('#F5A524');
    expect(theme.colors.meshCyan).toBe('#38BDF8');
    expect(theme.colors.meshTeal).toBe('#2DD4BF');
    expect(theme.colors.meshGreen).toBe('#2FBF71');
  });

  it('has breakpoints in ascending order', () => {
    const values = Object.values(breakpoints);
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i]).toBeGreaterThan(values[i - 1]);
    }
  });

  it('exposes font weights for styled-components', () => {
    expect(theme.fontWeights.semibold).toBe('600');
  });

  it('exposes hosted font families for body and display text', () => {
    expect(theme.fontFamilies.sans).toBe('Inter');
    expect(theme.fontFamilies.display).toBe('Urbanist');
  });

  it('includes the landing display scale', () => {
    expect(theme.typography.displayLg).toBe(52);
    expect(theme.typography.displayXl).toBe(64);
  });
});
