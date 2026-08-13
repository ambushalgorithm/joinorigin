import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import CountUpStat from './CountUpStat';

/**
 * Unit tests for the count-up gradient stat (spec sprint-10 §4.5).
 *
 * Parses the leading integer from the LOCALIZED value string ("2,400+" →
 * 2400, suffix "+"), animates with useCountUp, formats with the active
 * locale, and re-appends the suffix. On parse failure the source string
 * renders verbatim (no animation) — locale parity preserved.
 */

function renderStat(props: Partial<React.ComponentProps<typeof CountUpStat>> = {}) {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <ThemeProvider theme={theme}>
        <CountUpStat valueText="2,400+" label="Members building together" {...props} />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('CountUpStat', () => {
  it('renders the localized label and the exact final value (sr-only while counting)', () => {
    renderStat();
    expect(screen.getByText('Members building together')).toBeInTheDocument();
    // The exact localized value is present in a visually-hidden span.
    expect(screen.getByText('2,400+')).toBeInTheDocument();
  });

  it('renders the source string verbatim when parsing fails (spec §4.5 fallback)', () => {
    renderStat({ valueText: 'Invite-only' });
    expect(screen.getByText('Invite-only')).toBeInTheDocument();
    // No sr-only duplicate when parsing fails.
    expect(screen.getAllByText('Invite-only')).toHaveLength(1);
  });

  it('exposes the optional test id (community keeps community-members-stat)', () => {
    renderStat({ testID: 'community-members-stat' });
    const pill = screen.getByTestId('community-members-stat');
    expect(pill).toHaveTextContent('2,400+');
  });
});
