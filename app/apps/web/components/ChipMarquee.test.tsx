import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import ChipMarquee from './ChipMarquee';

/**
 * Unit tests for the community-chip marquee (spec sprint-10 §4.6).
 *
 * The animated track repeats the 7 example-community chips 2× and is
 * `aria-hidden`; an equivalent visually-hidden static <ul> (aria-label = the
 * intro) lists each community name once, so screen readers never hear
 * duplicates.
 */

const INTRO =
  'These are the kinds of communities growing inside JoinOrigin today. If you share one of these goals, there is already a place for you:';

function renderMarquee() {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <ThemeProvider theme={theme}>
        <ChipMarquee intro={INTRO} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('ChipMarquee', () => {
  it('renders the marquee with every example-community label', () => {
    renderMarquee();
    expect(screen.getByTestId('chip-marquee')).toBeInTheDocument();
    for (const label of [
      'Startup Founders',
      'Small Businesses',
      'Book Clubs',
      'Community Organizations',
      'Run Clubs',
      'Pee-wee Leagues',
      'Anyone with an Idea',
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('hides the duplicate track and exposes a static sr-only list labeled with the intro', () => {
    const { container } = renderMarquee();
    // The animated track is aria-hidden (duplicates never read by AT).
    const track = container.querySelector('[aria-hidden="true"]');
    expect(track).not.toBeNull();
    // The static list is visually hidden and labeled with the intro.
    const list = container.querySelector('ul');
    expect(list).not.toBeNull();
    expect(list?.getAttribute('aria-label')).toContain('communities growing inside');
    // Each community name appears exactly once in the static list.
    const items = Array.from(list?.querySelectorAll('li') ?? []);
    expect(items.map((li) => li.textContent)).toEqual([
      'Startup Founders',
      'Small Businesses',
      'Book Clubs',
      'Community Organizations',
      'Run Clubs',
      'Pee-wee Leagues',
      'Anyone with an Idea',
    ]);
  });
});
