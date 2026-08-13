import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import MenuScene from './MenuScene';
import { SCENE_MAP } from './scenes/sceneTypes';

/**
 * Unit tests for the menu-page scene wrapper (spec sprint-10-menu-anim §5.5).
 *
 * The scene SVGs are INLINED into the DOM as React components (no more
 * `<img src>` — the old sandboxed-SVG icon-spin mismatch is fixed). The
 * wrapper renders the shared `data-testid="menu-hero-scene"` svg, the
 * GSAP-driven `.scene-ring` element, and stays decorative (aria-hidden).
 */

function renderScene(props: Partial<React.ComponentProps<typeof MenuScene>> = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <MenuScene scene="features" {...props} />
    </ThemeProvider>,
  );
}

describe('MenuScene', () => {
  it('renders the scene SVG inline (no img, no external svg src)', () => {
    const { container } = renderScene();
    const scene = screen.getByTestId('menu-hero-scene');
    expect(scene.tagName).toBe('svg');
    // No sandboxed <img> SVG load — the icon-spin fix (TASK-283 gap).
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('svg')).toBe(scene);
    expect(scene).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders every scene key through the SCENE_MAP registry', () => {
    for (const key of Object.keys(SCENE_MAP) as Array<keyof typeof SCENE_MAP>) {
      const { unmount } = render(
        <ThemeProvider theme={theme}>
          <MenuScene scene={key} />
        </ThemeProvider>,
      );
      const scene = screen.getByTestId('menu-hero-scene');
      expect(scene.tagName).toBe('svg');
      unmount();
    }
  });

  it('renders the GSAP motion hook elements (orbit group + ring)', () => {
    const { container } = renderScene();
    // GSAP targets: the inline orbit group + the real background ring element.
    expect(container.querySelector('.scene-orbit-group')).not.toBeNull();
    expect(container.querySelector('.scene-main-group')).not.toBeNull();
    const ring = screen.getByTestId('scene-ring');
    expect(ring).toHaveAttribute('aria-hidden', 'true');
  });

  it('keeps the alt prop for accessibility parity', () => {
    const { rerender } = renderScene();
    expect(screen.getByTestId('menu-hero-scene')).toBeInTheDocument();
    rerender(
      <ThemeProvider theme={theme}>
        <MenuScene scene="features" alt="decorative scene" />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('menu-hero-scene')).toHaveAttribute('aria-hidden', 'true');
  });
});
