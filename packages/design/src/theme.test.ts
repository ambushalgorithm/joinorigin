import { theme, colors, spacing, typography, radius, breakpoints } from './index';

describe('design tokens', () => {
  it('exposes a theme with all token groups', () => {
    expect(theme.colors).toEqual(colors);
    expect(theme.spacing).toEqual(spacing);
    expect(theme.typography).toEqual(typography);
    expect(theme.radius).toEqual(radius);
  });

  it('uses brand-consistent starter values', () => {
    expect(theme.colors.primary).toBe('#4F7DF9');
    expect(theme.colors.background).toBe('#0F1115');
    expect(theme.spacing.md).toBe(16);
    expect(theme.radius.md).toBe(10);
    expect(theme.typography.body).toBe(14);
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
});
