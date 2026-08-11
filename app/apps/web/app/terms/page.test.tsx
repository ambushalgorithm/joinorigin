import { render, screen } from '@testing-library/react';

import TermsPage, { metadata } from './page';

/**
 * Unit tests for the /terms page (discovery §5.9): metadata export per the
 * arch pattern + plain-English legal content. BreadcrumbList only.
 */

describe('terms page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Terms of Service | JoinOrigin');
    expect(metadata.description).toContain('terms of service');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/terms');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/terms');
    expect(metadata.keywords).toEqual(['JoinOrigin terms of service']);
  });

  it('renders a single h1 and plain-English terms sections', () => {
    render(<TermsPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Terms of Service');
    expect(screen.getByText('Acceptance')).toBeInTheDocument();
    expect(screen.getByText('Accounts')).toBeInTheDocument();
    expect(screen.getByText('User content')).toBeInTheDocument();
    expect(screen.getByText('Acceptable use')).toBeInTheDocument();
    expect(screen.getByText('Intellectual property')).toBeInTheDocument();
    expect(screen.getByText('Disclaimers')).toBeInTheDocument();
    expect(screen.getByText('Changes')).toBeInTheDocument();
  });

  it('emits BreadcrumbList JSON-LD only', () => {
    render(<TermsPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads).toHaveLength(1);
    expect(payloads[0]['@type']).toBe('BreadcrumbList');
  });
});
