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
});
