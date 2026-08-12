import { act, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import TypewriterHeading from './TypewriterHeading';

const FULL_TEXT =
  'Origin brings your ideas, projects and communities into an organized collaboration space — so the best projects finally have a home';

function renderHeading() {
  return render(
    <ThemeProvider theme={theme}>
      <TypewriterHeading />
    </ThemeProvider>,
  );
}

describe('TypewriterHeading', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the full two-tone heading after typing completes', () => {
    renderHeading();

    // 400ms delay + 131 chars × 20ms ≈ 3.0s.
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain(FULL_TEXT);
    expect(heading.textContent).toContain('|');
  });

  it('keeps the caret visible after completion', () => {
    renderHeading();

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent?.endsWith('|')).toBe(true);
  });

  it('clears and re-types on mount', () => {
    renderHeading();

    // Before the 400ms delay elapses, the heading is being cleared/re-typed.
    expect(screen.getByRole('heading', { level: 1 }).textContent?.length).toBeLessThan(
      FULL_TEXT.length,
    );
  });

  it('wraps the split in a block body and a capitalized accent span after completion', () => {
    const { container } = renderHeading();

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    const spans = container.querySelectorAll('h1 > span');
    expect(spans).toHaveLength(3);

    // Body carries the first 127 chars on its own block line…
    const body = spans[0];
    expect(body.textContent).toBe(FULL_TEXT.slice(0, 127));
    expect(getComputedStyle(body).display).toBe('block');

    // …and the remainder renders in the accent span, capitalized (tweak 058007e).
    const accent = spans[1];
    expect(accent.textContent).toBe('home');
    expect(getComputedStyle(accent).textTransform).toBe('capitalize');
  });
});
