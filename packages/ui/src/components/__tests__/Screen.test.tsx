import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';

import { Screen } from '../Screen';
import { Text } from '../Text';

describe('Screen', () => {
  it('renders children as the base layout root', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Screen>
          <Text>Screen content</Text>
        </Screen>
      </ThemeProvider>,
    );
    expect(getByText('Screen content')).toBeTruthy();
  });
});
