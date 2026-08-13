import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import AnchorNav from './AnchorNav';

/**
 * Unit tests for the sticky in-page anchor nav (spec sprint-10 §4.9).
 *
 * A `nav` landmark inside `<main>` (allowed — e2e nav assertions use
 * `.first()` which resolves to the Header nav). Pill links point at the
 * on-page h2 ids; the aria-label comes from the page eyebrow key.
 */

const LINKS = [
  { id: 'concepts', label: 'Concepts' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'faq', label: 'Frequently asked questions' },
];

function renderNav() {
  return render(
    <ThemeProvider theme={theme}>
      <AnchorNav label="Documentation" links={LINKS} />
    </ThemeProvider>,
  );
}

describe('AnchorNav', () => {
  it('renders a nav landmark labeled with the page eyebrow key result', () => {
    renderNav();
    const nav = screen.getByRole('navigation', { name: 'Documentation' });
    expect(nav).toBeInTheDocument();
    expect(nav.getAttribute('data-testid')).toBe('anchor-nav');
  });

  it('renders pill links pointing at the on-page h2 ids', () => {
    renderNav();
    for (const link of LINKS) {
      const anchor = screen.getByRole('link', { name: link.label });
      expect(anchor).toHaveAttribute('href', `#${link.id}`);
    }
  });
});
