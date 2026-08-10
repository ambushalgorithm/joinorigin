import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';

import Header from './Header';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

function renderHeader() {
  return render(
    <NativeThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <WaitlistModalProvider>
          <Header />
        </WaitlistModalProvider>
      </ThemeProvider>
    </NativeThemeProvider>,
  );
}

describe('Header', () => {
  it('renders the brand, desktop nav, Log In and Get Started CTA', () => {
    renderHeader();

    expect(screen.getByText('JoinOrigin')).toBeInTheDocument();
    for (const label of ['Product', 'Community', 'Pricing', 'Docs']) {
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

  it('toggles the mobile menu and closes it on ESC', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByTestId('mobile-menu-toggle'));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });
});
