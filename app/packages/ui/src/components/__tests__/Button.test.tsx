import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';

import { Button } from '../Button';

async function renderButton(props: React.ComponentProps<typeof Button>) {
  return await render(
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>,
  );
}

describe('Button', () => {
  it('renders its label', async () => {
    const { getByText } = await renderButton({ label: 'Save', onPress: jest.fn() });
    expect(getByText('Save')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderButton({ label: 'Save', onPress });
    await fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderButton({ label: 'Save', onPress, disabled: true });
    await fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not fire while loading', async () => {
    const onPress = jest.fn();
    const { getByRole } = await renderButton({ label: 'Save', onPress, loading: true });
    await fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
