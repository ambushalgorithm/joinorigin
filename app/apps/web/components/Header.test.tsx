import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import Header from './Header';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

function renderHeader() {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <WaitlistModalProvider>
            <Header />
          </WaitlistModalProvider>
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

describe('Header', () => {
  it('renders the brand, desktop nav, Log In and Get Started CTA', () => {
    renderHeader();

    expect(screen.getByText('JoinOrigin')).toBeInTheDocument();
    for (const label of ['Features', 'Community', 'Docs', 'About']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByTestId('get-started-button')).toBeInTheDocument();
  });

  it('opens the waitlist modal from the Get Started CTA', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('get-started-button'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
  });

  it('restores focus to the trigger button when the modal closes (spec §9.2)', async () => {
    const user = userEvent.setup();
    renderHeader();

    const trigger = screen.getByTestId('get-started-button');
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // ESC closes the modal; the provider restores focus to the recorded trigger.
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('toggles the mobile menu and closes it on ESC', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('mobile-menu-toggle'));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });
});
