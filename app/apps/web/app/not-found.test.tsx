import { render, screen } from '@testing-library/react';

import { I18nProvider, getDictionary } from '@joinorigin/i18n';

import NotFound from './not-found';

/**
 * Unit tests for the styled JoinOrigin 404 boundary (TASK-208), extended for
 * the Sprint 8 redesign (spec sprint-8 §9): local not-found scene, fade-up
 * entrance, and a secondary "Explore Origins" ghost link.
 *
 * The boundary renders a stable styled page for unknown routes (including the
 * well-known-path probes browsers/DevTools fire at page load) so 404s no
 * longer race the main page stream through the default `_not-found` machinery.
 * The component provides its own theme context (the root layout's
 * ThemeProviders live in page.tsx, which is not rendered for 404s) and reads
 * its copy from the i18n provider mounted by the root layout.
 */

function renderNotFound() {
  return render(
    <I18nProvider locale="en" dictionary={getDictionary('en')}>
      <NotFound />
    </I18nProvider>,
  );
}

describe('not-found boundary', () => {
  it('renders the JoinOrigin brand and 404 status', () => {
    renderNotFound();
    expect(screen.getByText('JoinOrigin')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('renders the decorative not-found scene inline above the brand', async () => {
    const { container } = renderNotFound();
    // The scene is registered through `next/dynamic` (TASK-404 code-split);
    // the SVG appears once the scene chunk resolves.
    const scene = await screen.findByTestId('menu-hero-scene');
    expect(container.querySelector('svg[data-testid="menu-hero-scene"]')).toBe(scene);
    // No sandboxed <img>-loaded scene SVG (the icon-spin fix).
    expect(container.querySelector('img[src*="not-found-scene"]')).toBeNull();
    expect(scene).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders a clear heading, supporting copy, and home CTA', () => {
    renderNotFound();
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByText(/doesn.t exist or has moved/i)).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: 'Back to home' });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the secondary Explore Origins link', () => {
    renderNotFound();
    const exploreLink = screen.getByRole('link', { name: /Explore Origins/ });
    expect(exploreLink).toHaveAttribute('href', '/community');
  });
});
