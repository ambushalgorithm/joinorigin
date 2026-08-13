import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import SectionBand from './SectionBand';

/**
 * Unit tests for the glass section band (spec sprint-10 §4.7).
 *
 * A full-bleed wrapper that alternates plain and glass bands for page
 * rhythm. Children keep their own semantics; the wrapper only adds the
 * band styling (and an optional faint per-page glow).
 */

function renderBand(props: Partial<React.ComponentProps<typeof SectionBand>> = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <SectionBand {...props}>
        <section>
          <h2>Band content</h2>
        </section>
      </SectionBand>
    </ThemeProvider>,
  );
}

describe('SectionBand', () => {
  it('renders children unchanged inside a plain div wrapper (no extra landmarks)', () => {
    const { container } = renderBand();
    expect(screen.getByRole('heading', { level: 2, name: 'Band content' })).toBeInTheDocument();
    // The band is a div wrapper; the only <section> is the child's own.
    expect(container.querySelectorAll('section')).toHaveLength(1);
    expect(container.querySelector('div')).not.toBeNull();
    expect(container.querySelector('div')?.querySelector('section')).not.toBeNull();
  });

  it('accepts plain and glass variants with an accent glow without crashing', () => {
    renderBand({ variant: 'plain' });
    renderBand({ variant: 'glass', accent: 'features', glow: true });
    expect(screen.getAllByRole('heading', { level: 2, name: 'Band content' })).toHaveLength(2);
  });
});
