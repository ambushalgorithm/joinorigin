import { render, screen } from '@testing-library/react';

import NotFound from './not-found';

/**
 * Unit tests for the styled JoinOrigin 404 boundary (TASK-208).
 *
 * The boundary renders a stable styled page for unknown routes (including the
 * well-known-path probes browsers/DevTools fire at page load) so 404s no
 * longer race the main page stream through the default `_not-found` machinery.
 * The component provides its own theme context (the root layout's
 * ThemeProviders live in page.tsx, which is not rendered for 404s).
 */

function renderNotFound() {
  return render(<NotFound />);
}

describe('not-found boundary', () => {
  it('renders the JoinOrigin brand and 404 status', () => {
    renderNotFound();
    expect(screen.getByText('JoinOrigin')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('renders a clear heading, supporting copy, and home CTA', () => {
    renderNotFound();
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByText(/doesn.t exist or has moved/i)).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: 'Back to home' });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
