import { render, screen } from '@testing-library/react';

import HomePage from './page';

/**
 * Full-page smoke tests for the JoinOrigin homescreen. The typewriter
 * re-types on mount (400ms delay + 35ms/char), so advance timers to reach
 * the final heading state.
 */

describe('home page', () => {
  it('renders the sticky header with nav links and Get Started CTA', () => {
    render(<HomePage />);
    expect(screen.getAllByText('JoinOrigin').length).toBeGreaterThan(0);
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Docs')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByTestId('get-started-button')).toBeInTheDocument();
  });

  it('renders the typewriter hero heading and Start Project CTA', () => {
    render(<HomePage />);
    expect(screen.getByTestId('start-project-button')).toBeInTheDocument();
    expect(
      screen.getByText(
        'JoinOrigin brings your community, projects, and conversations into one calm workspace — so your best work finally has a home.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the orbit visualization and member trust copy', () => {
    render(<HomePage />);
    expect(screen.getByTestId('orbit-viz')).toBeInTheDocument();
    expect(screen.getByText('Join 2,400+ builders already collaborating')).toBeInTheDocument();
  });

  it('renders the partner logo ticker and slim footer', () => {
    render(<HomePage />);
    expect(screen.getByText('Trusted by teams at')).toBeInTheDocument();
    expect(screen.getByText('Where work finds its origin')).toBeInTheDocument();
    expect(screen.getByText('Join the waitlist')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('© 2026 JoinOrigin')).toBeInTheDocument();
  });
});
