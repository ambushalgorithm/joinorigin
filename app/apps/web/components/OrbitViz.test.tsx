import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
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
 *
 * G-5 SSR/static contract: the server-rendered hub shows the FINAL count
 * ("2,400+", never "0+") because useCountUp initializes at the target.
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

/** Server-render the orbit exactly like SSR (effects never run). */
function serverHtml(): string {
  return renderToString(
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

  it('SSR/static HTML renders the FINAL hub count — no 0+ Members (G-5)', () => {
    const html = serverHtml();
    // React SSR splits text children with comment markers, so the CountValue
    // span content is `2,400<!-- -->+` — assert on the visible hub fragment.
    const hubHtml = html.slice(html.indexOf('data-testid="orbit-hub"'));
    const countValue = hubHtml.match(/CountValue[^>]*>([\s\S]*?)<\/span>/)?.[1] ?? '';
    expect(countValue).toContain('2,400');
    // The visible count must not start at the count-up 0 in static HTML.
    expect(countValue.startsWith('0')).toBe(false);
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

  it('renders the hub OUTSIDE the rotating rings (sibling, TASK-292)', () => {
    const { container } = renderOrbit();
    const hub = container.querySelector('.orbit-hub');
    expect(hub).not.toBeNull();
    // The hub must not be a descendant of any rotating ring — it inherits
    // ZERO rotation, so no counter-rotation tween is needed (fixes the
    // sub-pixel trembling of the count-up under ScaleFrame's scale()).
    for (let i = 1; i <= 4; i += 1) {
      expect(hub?.closest(`.orbit-${i}`)).toBeNull();
    }
    // It sits directly inside the centered ScaleFrame (visual position kept).
    const parent = hub?.parentElement;
    expect(parent).not.toBeNull();
    expect(parent?.getAttribute('data-testid') ?? '').not.toMatch(/^orbit-[1-4]$/);
  });
});
