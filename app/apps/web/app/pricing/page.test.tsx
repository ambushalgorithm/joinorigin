import { render, screen } from '@testing-library/react';

import PricingPage, { metadata } from './page';

/**
 * Unit tests for the /pricing page (discovery §5.4): metadata export per the
 * arch pattern + semantic HTML. Asserts no Product/Offer JSON-LD is emitted
 * (no invented prices — discovery §7 + Google sd-policy).
 */

describe('pricing page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Pricing — Free During Early Access | JoinOrigin');
    expect(metadata.description).toContain('free during early access');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/pricing');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/pricing');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['JoinOrigin pricing', 'free community platform']),
    );
  });

  it('renders a single h1, the early-access offer, and future plan outline', () => {
    render(<PricingPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Simple pricing, free while we build');
    expect(screen.getByTestId('early-access-card')).toHaveTextContent('Early access: free');
    expect(screen.getByText('Future plan outline — coming soon')).toBeInTheDocument();
    // Plan names also appear in the header/footer nav links.
    expect(screen.getByRole('heading', { level: 3, name: 'Free' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Community' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Organization' })).toBeInTheDocument();
  });

  it('renders the FAQ block with honest answers', () => {
    render(<PricingPage />);
    expect(screen.getByText('Is JoinOrigin free right now?')).toBeInTheDocument();
    expect(screen.getByText(/we are not publishing prices/i)).toBeInTheDocument();
  });

  it('emits FAQPage + BreadcrumbList JSON-LD but never Product/Offer', () => {
    render(<PricingPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const types = payloads.map((p) => p['@type']);
    expect(types).toContain('FAQPage');
    expect(types).toContain('BreadcrumbList');
    expect(types).not.toContain('Product');
    expect(types).not.toContain('Offer');
    expect(types).not.toContain('AggregateRating');
  });
});
