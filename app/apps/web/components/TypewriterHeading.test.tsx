import { act, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import TypewriterHeading from './TypewriterHeading';

const FULL_TEXT =
  'Ideas, projects and community collaboration space — where teams and the best projects find their Origin.';

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

    // 400ms delay + 104 chars × 20ms ≈ 2.5s.
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

    // Body carries the first 97 chars on its own block line…
    const body = spans[0];
    expect(body.textContent).toBe(FULL_TEXT.slice(0, 97));
    expect(getComputedStyle(body).display).toBe('block');

    // …and the remainder renders in the accent span, capitalized (tweak 058007e).
    const accent = spans[1];
    expect(accent.textContent).toBe('Origin.');
    expect(getComputedStyle(accent).textTransform).toBe('capitalize');
  });
});
