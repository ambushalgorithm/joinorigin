import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import TrustRow from './TrustRow';

/**
 * Unit tests for the hero trust row (spec sprint-10 §4.4).
 *
 * 9 overlapping avatars (aria-hidden decorative stack) + the shared trust
 * copy `home.hero.trustCopy` — zero new strings.
 */

function renderRow() {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <ThemeProvider theme={theme}>
        <TrustRow />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('TrustRow', () => {
  it('renders the trust copy and the 9-avatar stack', () => {
    const { container } = renderRow();
    expect(screen.getByText('Join 2,400+ builders already collaborating')).toBeInTheDocument();
    const avatars = container.querySelectorAll('img');
    expect(avatars).toHaveLength(9);
    // Local avatar assets (zero CDN).
    for (let i = 0; i < 9; i += 1) {
      expect(avatars[i]).toHaveAttribute(
        'src',
        `/assets/avatars/avatar-${String(i + 1).padStart(2, '0')}.png`,
      );
    }
  });

  it('marks the overlapping avatar stack as aria-hidden (copy stays real text)', () => {
    const { container } = renderRow();
    const stack = container.querySelector('[aria-hidden="true"]');
    expect(stack).not.toBeNull();
    expect(stack?.tagName).toBe('DIV');
    // The copy is real, visible text (not hidden from AT).
    expect(screen.getByText('Join 2,400+ builders already collaborating')).toBeVisible();
  });
});
