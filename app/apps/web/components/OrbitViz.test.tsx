import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import OrbitViz from './OrbitViz';

/**
 * Unit tests for the hero orbit visualization (spec §5.4, GSAP elevation
 * sprint-10-menu-anim §5.7).
 *
 * Testids are unchanged (`orbit-viz`, `orbit-1..4`, `orbit-hub`); ring spins
 * + chip fly-ins are now GSAP-driven via the `orbit-{n}` / `orbit-chip` class
 * hooks (DOM transforms, verifiable in e2e). jsdom has no real scroll/ticker,
 * so we assert structure + GSAP hooks, not live rotation.
 */

function renderOrbit() {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <OrbitViz />
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

describe('OrbitViz', () => {
  it('renders the container with 4 rings and the count-up hub (testids unchanged)', () => {
    const { container } = renderOrbit();
    expect(screen.getByTestId('orbit-viz')).toBeInTheDocument();
    for (let i = 1; i <= 4; i += 1) {
      expect(screen.getByTestId(`orbit-${i}`)).toBeInTheDocument();
    }
    expect(screen.getByTestId('orbit-hub')).toBeInTheDocument();
    expect(container.querySelectorAll('.orbit-chip')).toHaveLength(9);
  });

  it('exposes the GSAP class hooks (orbit-1..4 + orbit-chip)', () => {
    const { container } = renderOrbit();
    for (let i = 1; i <= 4; i += 1) {
      const ring = container.querySelector(`.orbit-${i}`);
      expect(ring).not.toBeNull();
      expect(ring).toHaveAttribute('data-testid', `orbit-${i}`);
    }
    expect(container.querySelector('.orbit-hub')).not.toBeNull();
  });
});
