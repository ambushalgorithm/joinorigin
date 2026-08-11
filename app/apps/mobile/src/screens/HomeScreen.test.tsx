import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';

import HomeScreen from './HomeScreen';

function renderScreen() {
  return render(
    <ThemeProvider theme={theme}>
      <HomeScreen />
    </ThemeProvider>,
  );
}

describe('HomeScreen', () => {
  it('renders the Welcome to JoinOrigin heading', async () => {
    const { getByText } = await renderScreen();
    expect(getByText('Welcome to JoinOrigin')).toBeTruthy();
  });

  it('renders the supporting copy', async () => {
    const { getByText } = await renderScreen();
    expect(getByText('Your workspace is ready.')).toBeTruthy();
  });

  it('renders the Welcome badge', async () => {
    const { getByText } = await renderScreen();
    expect(getByText('Welcome')).toBeTruthy();
  });
});
