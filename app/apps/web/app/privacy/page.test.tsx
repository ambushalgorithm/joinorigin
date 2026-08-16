import { screen } from '@testing-library/react';

import PrivacyPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /privacy page (discovery §5.8): metadata export per the
 * arch pattern + plain-English legal content. BreadcrumbList only (no FAQ
 * spam — discovery §5.8).
 */

describe('privacy page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Privacy Policy | JoinOrigin');
    expect(metadata.description).toContain('privacy policy');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/privacy');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/privacy');
    expect(metadata.keywords).toEqual(['JoinOrigin privacy policy']);
  });

  it('renders a single h1 and plain-English privacy sections', () => {
    renderWithI18n(<PrivacyPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Privacy Policy');
    // Section titles also appear in the sticky anchor nav (Sprint 10) —
    // assert at least one render of each.
    expect(screen.getAllByText('What we collect').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Signup data')).toBeInTheDocument();
    expect(screen.getAllByText('Identity & flexibility').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Your rights').length).toBeGreaterThanOrEqual(1);
    // "Contact" appears as the page section title, the footer link, and the
    // anchor-nav link.
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('emits BreadcrumbList JSON-LD only', () => {
    renderWithI18n(<PrivacyPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads).toHaveLength(1);
    expect(payloads[0]['@type']).toBe('BreadcrumbList');
  });
});
