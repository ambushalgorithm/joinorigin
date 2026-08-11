import React from 'react';
import { render } from '@testing-library/react-native';

import App from './App';

describe('App', () => {
  it('renders Welcome to JoinOrigin via shared components', async () => {
    const { getByText } = await render(<App />);
    expect(getByText('Welcome to JoinOrigin')).toBeTruthy();
  });

  it('renders the supporting copy', async () => {
    const { getByText } = await render(<App />);
    expect(getByText('Your workspace is ready.')).toBeTruthy();
  });
});
