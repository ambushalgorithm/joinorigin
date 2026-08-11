import { render, screen } from '@testing-library/react';

import AboutPage, { metadata } from './page';

/**
 * Unit tests for the /about page (discovery §5.6): server-wrapper metadata
 * export per the arch pattern (§3.3) + semantic HTML content.
 */

describe('about page', () => {
  it('exports metadata per the arch pattern (title, description, canonical, keywords)', () => {
    expect(metadata.title).toBe(
      'About — The Operating System for Human Collaboration | JoinOrigin',
    );
    expect(metadata.description).toContain('social collaboration network');
    expect(metadata.alternates?.canonical).toBe('http://localhost:3100/about');
    expect(metadata.openGraph?.title).toBe(metadata.title);
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
    expect(metadata.keywords).toEqual(
      expect.arrayContaining(['social collaboration network mission', 'social operating system']),
    );
  });

  it('renders a single h1 and the mission intro paragraph', () => {
    render(<AboutPage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('The most valuable asset is your network');
    expect(
      screen.getByText(/the most valuable asset on the internet is not content or software/i),
    ).toBeInTheDocument();
  });

  it('renders the principles, founder guidance, and FAQ sections', () => {
    render(<AboutPage />);
    expect(screen.getByText('Guiding principles')).toBeInTheDocument();
    expect(screen.getByText('People First')).toBeInTheDocument();
    expect(screen.getByText('Founder guidance')).toBeInTheDocument();
    expect(screen.getByText(/Does this help people find each other/i)).toBeInTheDocument();
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument();
    expect(screen.getByText('What is JoinOrigin?')).toBeInTheDocument();
  });

  it('links to the real pages via the nav and footer', () => {
    render(<AboutPage />);
    // Header nav + footer both link the real pages; assert hrefs on the links.
    const featuresLinks = screen.getAllByRole('link', { name: 'Features' });
    expect(featuresLinks.length).toBeGreaterThan(0);
    expect(featuresLinks[0]).toHaveAttribute('href', '/features');
    expect(screen.getAllByRole('link', { name: 'Community' })[0]).toHaveAttribute(
      'href',
      '/community',
    );
    expect(screen.getAllByRole('link', { name: 'Docs' })[0]).toHaveAttribute('href', '/docs');
    expect(screen.getAllByRole('link', { name: 'About' })[0]).toHaveAttribute('href', '/about');
  });

  it('renders server-side JSON-LD: AboutPage + BreadcrumbList', () => {
    render(<AboutPage />);
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const payloads = scripts.map((script) => JSON.parse(script.textContent ?? '{}'));
    expect(payloads.some((p) => p['@type'] === 'AboutPage')).toBe(true);
    const breadcrumb = payloads.find((p) => p['@type'] === 'BreadcrumbList');
    expect(breadcrumb?.itemListElement).toHaveLength(2);
    expect(breadcrumb?.itemListElement[1].item).toBe('http://localhost:3100/about');
  });
});
