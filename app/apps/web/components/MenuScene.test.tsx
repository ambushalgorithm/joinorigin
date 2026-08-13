import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import MenuScene from './MenuScene';

/**
 * Unit tests for the upgraded menu-page scene wrapper (spec sprint-10 §4.2).
 *
 * The scene loads via a plain <img> (no next/image for SVGs) and stays
 * decorative (alt="" + aria-hidden). The wrapper paints the per-page glow
 * (::before) and a decorative orbit ring (::after).
 */

function renderScene(props: Partial<React.ComponentProps<typeof MenuScene>> = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <MenuScene src="/assets/menu/scenes/features-scene.svg" {...props} />
    </ThemeProvider>,
  );
}

describe('MenuScene', () => {
  it('renders the local SVG scene via a plain img (no next/image)', () => {
    const { container } = renderScene();
    const img = screen.getByTestId('menu-hero-scene');
    expect(img.tagName).toBe('IMG');
    expect(img).toHaveAttribute('src', '/assets/menu/scenes/features-scene.svg');
    expect(img).toHaveAttribute('width', '560');
    expect(img).toHaveAttribute('height', '420');
    // Decorative: empty alt + aria-hidden (spec §4.2).
    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('aria-hidden', 'true');
    // No next/image <img> styling wrapper beyond the plain img.
    expect(container.querySelector('img')).toBe(img);
  });

  it('accepts an explicit alt override', () => {
    renderScene({ alt: 'decorative scene' });
    expect(screen.getByTestId('menu-hero-scene')).toHaveAttribute('alt', 'decorative scene');
  });
});
