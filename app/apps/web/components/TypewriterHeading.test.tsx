import { act, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import TypewriterHeading from './TypewriterHeading';

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

    // 400ms delay + 30 chars × 35ms ≈ 1.45s.
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('Where teams find their origin');
    expect(heading.textContent).toContain('▍');
  });

  it('keeps the caret visible after completion', () => {
    renderHeading();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent?.endsWith('▍')).toBe(true);
  });

  it('clears and re-types on mount', () => {
    renderHeading();

    // Before the 400ms delay elapses, the heading is being cleared/re-typed.
    expect(screen.getByRole('heading', { level: 1 }).textContent?.length).toBeLessThan(
      'Where teams find their origin'.length,
    );
  });

  it('wraps the split in a block body and a capitalized accent span after completion', () => {
    const { container } = renderHeading();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const spans = container.querySelectorAll('h1 > span');
    expect(spans).toHaveLength(3);

    // Body carries the first 23 chars on its own block line…
    const body = spans[0];
    expect(body.textContent).toBe('Where teams find their ');
    expect(getComputedStyle(body).display).toBe('block');

    // …and the remainder renders in the accent span, capitalized (tweak 058007e).
    const accent = spans[1];
    expect(accent.textContent).toBe('origin');
    expect(getComputedStyle(accent).textTransform).toBe('capitalize');
  });
});
