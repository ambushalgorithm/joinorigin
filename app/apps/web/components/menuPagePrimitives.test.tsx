import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';

import { theme } from '@joinorigin/design';

import {
  Card,
  CardBody,
  CardGrid,
  CardLink,
  CardTitle,
  PageContainer,
  PageTitle,
} from './menuPagePrimitives';

/**
 * Unit tests for the shared menu-page primitives (spec sprint-8 §5, Stories
 * A/C/D in Sprint 22).
 *
 * Story A (mobile-first): `CardGrid`, `PageContainer`, and `PageTitle` style
 * from the researched 320px minimum viewport (TASK-526) and enhance only at
 * `theme.breakpoints` (mobile 480 / tablet 768 / desktop 1024).
 * Story C (hover/focus): ONLY the interactive `CardLink` variant animates on
 * hover/focus and exposes a visible `:focus-visible` ring; the informational
 * `Card` gets no hover/focus animation.
 * Story D (full-card links): a clickable card is ONE semantic wrapping `<a>`
 * covering the entire card — no nested links inside.
 *
 * jsdom does not apply `@media` rules to layout, so breakpoint behavior is
 * asserted on the generated stylesheet (ServerStyleSheet), the same pattern
 * LanguageSwitcher.test.tsx uses.
 */

/** Renders the given tree server-side and returns the generated CSS text. */
function cssFor(tree: React.ReactElement): string {
  const sheet = new ServerStyleSheet();
  try {
    renderToString(sheet.collectStyles(<ThemeProvider theme={theme}>{tree}</ThemeProvider>));
    return sheet.getStyleTags();
  } finally {
    sheet.seal();
  }
}

function renderPrimitives() {
  return render(
    <ThemeProvider theme={theme}>
      <PageContainer data-testid="page-container">
        <PageTitle>Page title</PageTitle>
        <CardGrid data-testid="card-grid">
          <Card data-testid="info-card">
            <CardTitle>Info</CardTitle>
            <CardBody>Non-interactive card.</CardBody>
          </Card>
          <CardLink href="/en/features" data-testid="card-link">
            <CardTitle>Features</CardTitle>
            <CardBody>Clickable card.</CardBody>
          </CardLink>
        </CardGrid>
      </PageContainer>
    </ThemeProvider>,
  );
}

describe('menuPagePrimitives', () => {
  it('renders PageContainer, PageTitle, CardGrid, Card, and CardLink together', () => {
    const { container } = renderPrimitives();
    expect(container.querySelector('[data-testid="page-container"]')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 1, name: 'Page title' })).toBeInTheDocument();
    expect(container.querySelector('[data-testid="card-grid"]')).not.toBeNull();
    expect(screen.getByText('Non-interactive card.')).toBeInTheDocument();
    expect(screen.getByText('Clickable card.')).toBeInTheDocument();
  });
});

describe('Story A: CardGrid mobile-first breakpoints (min viewport = 320px)', () => {
  it('lays out one column at the 320px base and auto-fills at mobile+', () => {
    const css = cssFor(
      <CardGrid>
        <Card>1</Card>
      </CardGrid>,
    );
    // Base (320px floor): a single column — no fixed min width that could
    // overflow the narrowest supported viewport.
    expect(css).toContain('display:grid');
    expect(css).toContain('grid-template-columns:1fr');
    // Mobile enhancement (480px): auto-fill with a 280px minimum card width.
    expect(css).toContain('@media (min-width:480px)');
    expect(css).toContain('grid-template-columns:repeat(auto-fill,minmax(280px,1fr))');
  });

  it('keeps the base grid single-column (no desktop-first minmax in the base rule)', () => {
    const css = cssFor(
      <CardGrid>
        <Card>1</Card>
      </CardGrid>,
    );
    // The BASE rule must not contain the auto-fill pattern — the mobile-first
    // floor is 1fr; the multi-column layout only kicks in at min-width:480px.
    // styled-components emits the base rule before the first @media block.
    const basePart = css.split('@media')[0];
    expect(basePart).toContain('grid-template-columns:1fr');
    expect(basePart).not.toContain('auto-fill');
  });
});

describe('Story A: PageContainer mobile-first padding', () => {
  it('uses compact 20px gutters at the 320px base and widens at mobile/desktop', () => {
    const css = cssFor(
      <PageContainer>
        <p>content</p>
      </PageContainer>,
    );
    expect(css).toContain('padding:48px 20px');
    expect(css).toContain('@media (min-width:480px)');
    expect(css).toContain('padding:64px 32px');
    expect(css).toContain('@media (min-width:1024px)');
    expect(css).toContain('padding:96px 64px 64px');
  });
});

describe('Story A: PageTitle mobile-first typography', () => {
  it('sizes the heading for the 320px base and enhances at mobile/tablet', () => {
    const css = cssFor(<PageTitle>Title</PageTitle>);
    // Base (320px floor): the compact heading size.
    expect(css).toContain('font-size:28px');
    // Mobile enhancement: display size.
    expect(css).toContain('@media (min-width:480px)');
    expect(css).toContain('font-size:36px');
    // Tablet enhancement: displayLg size.
    expect(css).toContain('@media (min-width:768px)');
    expect(css).toContain('font-size:52px');
  });
});

describe('Story C: hover/focus only on interactive CardLink + visible focus ring', () => {
  it('gives CardLink the hover lift/glow animation and a focus-visible ring', () => {
    const css = cssFor(
      <CardLink href="/en/features">
        <CardTitle>Features</CardTitle>
      </CardLink>,
    );
    expect(css).toContain(':hover');
    expect(css).toContain(':focus-visible');
    expect(css).toContain('transform:translateY(-4px)');
    expect(css).toContain('border-color:#5977f5');
    // Visible keyboard focus indicator (Story C): outline in the focusRing token.
    expect(css).toContain('outline:2px solid #7C9CFF');
    expect(css).toContain('outline-offset:2px');
  });

  it('does NOT animate the informational Card (no hover/focus transition)', () => {
    const css = cssFor(
      <Card>
        <CardTitle>Info</CardTitle>
      </Card>,
    );
    // Non-interactive cards must have no hover/focus animation (Story C).
    expect(css).not.toContain(':hover');
    expect(css).not.toContain(':focus-visible');
    expect(css).not.toContain('transition');
    expect(css).not.toContain('translateY');
  });
});

describe('Story D: CardLink is a single wrapping link covering the ENTIRE card', () => {
  it('renders one semantic <a> with no nested links and full card content inside', () => {
    const { container } = renderPrimitives();
    const link = container.querySelector('[data-testid="card-link"]');
    expect(link?.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/en/features');

    // The link covers the WHOLE card: title + body are inside the anchor.
    expect(link?.textContent).toContain('Features');
    expect(link?.textContent).toContain('Clickable card.');
    // No nested anchors inside the full-card link (Story D contract).
    expect(link?.querySelector('a')).toBeNull();
  });

  it('exposes the entire card as one focusable target (link IS the card)', () => {
    const { container } = renderPrimitives();
    const link = container.querySelector('[data-testid="card-link"]') as HTMLAnchorElement;
    // One focusable element per card — the wrapping anchor.
    const focusables = container.querySelectorAll('a, button, [tabindex], input, select, textarea');
    expect(Array.from(focusables)).toContain(link);
    expect(link.querySelector('a, button, [tabindex], input, select, textarea')).toBeNull();
  });

  it('keeps informational cards link-free (no accidental hover/focus target)', () => {
    const { container } = renderPrimitives();
    const card = container.querySelector('[data-testid="info-card"]');
    expect(card?.querySelector('a')).toBeNull();
    expect(card?.querySelector('button')).toBeNull();
  });
});
