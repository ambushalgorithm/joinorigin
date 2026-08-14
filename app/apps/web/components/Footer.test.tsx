import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import Footer from './Footer';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

function renderFooter() {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <WaitlistModalProvider>
            <Footer />
          </WaitlistModalProvider>
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

describe('Footer', () => {
  it('renders the brand, tagline, and grouped nav', () => {
    renderFooter();

    expect(screen.getByText('JoinOrigin')).toBeInTheDocument();
    expect(screen.getByText('Where teams find their origin')).toBeInTheDocument();
    for (const label of ['Explore', 'Product', 'Company', 'Legal']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByTestId('footer-waitlist-button')).toBeInTheDocument();
  });

  it('renders the Explore group with Locations / Guides / Glossary links (TASK-316)', () => {
    renderFooter();

    expect(screen.getByRole('link', { name: 'Locations' })).toHaveAttribute('href', '/location');
    expect(screen.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', '/guides');
    expect(screen.getByRole('link', { name: 'Glossary' })).toHaveAttribute('href', '/glossary');

    // Community/Docs retained in the Product group.
    expect(screen.getByRole('link', { name: 'Community' })).toHaveAttribute('href', '/community');
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
  });
});
