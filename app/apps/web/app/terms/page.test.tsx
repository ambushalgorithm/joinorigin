import { screen } from '@testing-library/react';

import TermsPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

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
    renderWithI18n(<TermsPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Terms of Service');
    // Section titles also appear in the sticky anchor nav (Sprint 10) —
    // assert at least one render of each.
    for (const title of [
      'Acceptance',
      'Accounts',
      'User content',
      'Acceptable use',
      'Intellectual property',
      'Disclaimers',
      'Changes',
    ]) {
      expect(screen.getAllByText(title).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('emits BreadcrumbList JSON-LD only', () => {
    renderWithI18n(<TermsPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads).toHaveLength(1);
    expect(payloads[0]['@type']).toBe('BreadcrumbList');
  });
});
