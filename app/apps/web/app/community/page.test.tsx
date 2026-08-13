import { screen } from '@testing-library/react';

import CommunityPage, { metadata } from './page';
import { renderWithI18n } from '../../test-utils';

/**
 * Unit tests for the /community page (discovery §5.3): metadata export per
 * the arch pattern + semantic HTML (single h1, values, communities, trust).
 */

describe('community page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe('Community — Find Your People & Build Together | JoinOrigin');
    expect(metadata.description).toContain('social collaboration network');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/community');
    expect(metadata.openGraph?.url).toBe('http://localhost:3100/community');
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['online communities', 'join a community']),
    );
  });

  it('renders a single h1 and the definitional intro', () => {
    renderWithI18n(<CommunityPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Where people find each other');
    expect(
      screen.getByText(/organized around communities — groups of people who share interests/i),
    ).toBeInTheDocument();
  });

  it('renders values, example communities, and the trust stat', () => {
    renderWithI18n(<CommunityPage />);
    expect(screen.getByText('How we run the network')).toBeInTheDocument();
    expect(screen.getByText('People First')).toBeInTheDocument();
    expect(screen.getByText('Example communities')).toBeInTheDocument();
    expect(screen.getByText('Book Clubs')).toBeInTheDocument();
    expect(screen.getByText('Startup Founders')).toBeInTheDocument();
    expect(screen.getByTestId('community-members-stat')).toHaveTextContent('2,400+');
  });

  it('renders the FAQ block and mirrors it in FAQPage JSON-LD', () => {
    renderWithI18n(<CommunityPage />);
    expect(screen.getByText('What communities can I join?')).toBeInTheDocument();

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    const faq = payloads.find((p) => p['@type'] === 'FAQPage');
    expect(faq?.mainEntity).toHaveLength(5);
    expect(payloads.some((p) => p['@type'] === 'BreadcrumbList')).toBe(true);
  });
});
