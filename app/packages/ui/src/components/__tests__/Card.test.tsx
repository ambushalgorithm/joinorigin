import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';

import { Card } from '../Card';
import { Text } from '../Text';

describe('Card', () => {
  it('renders children', async () => {
    const { getByText } = await render(
      <ThemeProvider theme={theme}>
        <Card>
          <Text>Card content</Text>
        </Card>
      </ThemeProvider>,
    );
    expect(getByText('Card content')).toBeTruthy();
  });
});
