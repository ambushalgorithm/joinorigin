import { render, screen } from '@testing-library/react';

import HomePage from './page';

describe('home page', () => {
  it('renders Welcome to JoinOrigin via shared components', () => {
    render(<HomePage />);
    expect(screen.getByText('Welcome to JoinOrigin')).toBeInTheDocument();
  });

  it('renders the supporting copy', () => {
    render(<HomePage />);
    expect(screen.getByText('Your workspace is ready.')).toBeInTheDocument();
  });
});
