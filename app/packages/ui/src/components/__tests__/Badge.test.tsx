import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';

import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders its label', async () => {
    const { getByText } = await render(
      <ThemeProvider theme={theme}>
        <Badge label="New" tone="primary" />
      </ThemeProvider>,
    );
    expect(getByText('New')).toBeTruthy();
  });
});
