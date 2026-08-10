import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import LogoMarquee from './LogoMarquee';

describe('LogoMarquee', () => {
  it('renders the ticker label and 5 partner logos repeated 4 times', () => {
    render(
      <ThemeProvider theme={theme}>
        <LogoMarquee />
      </ThemeProvider>,
    );

    expect(screen.getByText('Trusted by teams at')).toBeInTheDocument();
    const logos = screen.getAllByRole('img');
    expect(logos).toHaveLength(20);

    for (let i = 1; i <= 5; i += 1) {
      const alt = `JoinOrigin partner ${i}`;
      expect(screen.getAllByAltText(alt)).toHaveLength(4);
    }
  });
});
