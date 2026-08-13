import fs from 'fs';
import path from 'path';

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';
import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import LogoMarquee from './LogoMarquee';

const PARTNER_ASSETS = [
  '../public/assets/partners/partner-01.svg',
  '../public/assets/partners/partner-02.svg',
  '../public/assets/partners/partner-03.svg',
  '../public/assets/partners/partner-04.svg',
  '../public/assets/partners/partner-05.svg',
];

function renderMarquee() {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <ThemeProvider theme={theme}>
        <LogoMarquee />
      </ThemeProvider>
    </I18nProvider>,
  );
}

describe('LogoMarquee', () => {
  it('renders the ticker label and 5 partner logos repeated 4 times', () => {
    renderMarquee();

    expect(screen.getByText('Trusted by teams at')).toBeInTheDocument();
    const logos = screen.getAllByRole('img');
    expect(logos).toHaveLength(20);

    for (let i = 1; i <= 5; i += 1) {
      const alt = `JoinOrigin partner ${i}`;
      expect(screen.getAllByAltText(alt)).toHaveLength(4);
    }
  });

  it('renders the 5 partner logo assets in off-white for the dark theme', () => {
    for (const asset of PARTNER_ASSETS) {
      const svg = fs.readFileSync(path.resolve(__dirname, asset), 'utf8');

      // Off-white fill (theme text token) — either via var() fallback or
      // gradient stops; never the legacy gray `#747474`.
      expect(svg).toContain('#F5F7FA');
      expect(svg).not.toContain('#747474');

      // Recognizable silhouettes preserved — geometry attributes remain.
      expect(svg).toContain('<path');
      expect(svg).toContain('d="');
    }
  });
});
