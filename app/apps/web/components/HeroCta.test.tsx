import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import HeroCta from './HeroCta';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

/**
 * Unit tests for the hero-level join CTA (spec sprint-10 §4.3).
 *
 * - waitlist variant: a RotatingBorderButton that opens the shared waitlist
 *   modal (testID="hero-join-button").
 * - contact variant: a muted ghost link to /contact, never the modal
 *   (testID="hero-contact-link").
 */

function renderCta(props: React.ComponentProps<typeof HeroCta>) {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <WaitlistModalProvider>
            <HeroCta {...props} />
          </WaitlistModalProvider>
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

describe('HeroCta', () => {
  it('renders a waitlist button and opens the shared modal (spec §4.3)', async () => {
    const user = userEvent.setup();
    renderCta({ variant: 'waitlist', label: 'Join the waitlist' });
    const button = screen.getByTestId('hero-join-button');
    expect(button).toHaveTextContent('Join the waitlist');
    await user.click(button);
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.queryByTestId('hero-contact-link')).not.toBeInTheDocument();
  });

  it('renders a contact ghost link (never the waitlist modal) on legal pages', async () => {
    const user = userEvent.setup();
    renderCta({ variant: 'contact', label: 'Contact us', href: '/contact' });
    const link = screen.getByTestId('hero-contact-link');
    expect(link).toHaveAttribute('href', '/contact');
    expect(link).toHaveTextContent('Contact us');
    expect(screen.queryByTestId('hero-join-button')).not.toBeInTheDocument();
    await user.click(link);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
