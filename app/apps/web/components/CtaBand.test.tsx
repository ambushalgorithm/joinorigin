import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import CtaBand from './CtaBand';
import { WaitlistModalProvider } from './WaitlistModal/WaitlistModalProvider';

/**
 * Unit tests for the menu-page join CTA band (spec sprint-8 §4.2).
 *
 * The default band renders the join headline + a `Get discovered`
 * rotating-border button (wired to the shared waitlist modal). Legal pages
 * pass `ctaOverride` to render `Questions about Origin?` with a `Contact us`
 * link to `/contact` (no modal).
 */

function renderBand(props: React.ComponentProps<typeof CtaBand> = {}) {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <NativeThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <WaitlistModalProvider>
            <CtaBand {...props} />
          </WaitlistModalProvider>
        </ThemeProvider>
      </NativeThemeProvider>
    </I18nProvider>,
  );
}

describe('CtaBand', () => {
  it('renders the default join band with an h2 headline', () => {
    renderBand();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Find your people. Build together.' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Join 2,400\+ builders on Origin's social collaboration network/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get discovered' })).toBeInTheDocument();
  });

  it('renders the contact override as a link to /contact (no join button)', () => {
    renderBand({
      headline: 'Questions about Origin?',
      subline: 'Our team replies within 2 business days.',
      ctaLabel: 'Contact us',
    });
    expect(
      screen.getByRole('heading', { level: 2, name: 'Questions about Origin?' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Our team replies within 2 business days.')).toBeInTheDocument();
    const contactLink = screen.getByRole('link', { name: 'Contact us' });
    expect(contactLink).toHaveAttribute('href', '/contact');
    expect(screen.queryByRole('button', { name: 'Get discovered' })).not.toBeInTheDocument();
  });
});
