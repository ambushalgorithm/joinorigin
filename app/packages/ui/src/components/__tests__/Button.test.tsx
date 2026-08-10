import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@joinorigin/design';

import { Button } from '../Button';

function renderButton(props: React.ComponentProps<typeof Button>) {
  return render(
    <ThemeProvider theme={theme}>
      <Button {...props} />
    </ThemeProvider>,
  );
}

describe('Button', () => {
  it('renders its label', () => {
    const { getByText } = renderButton({ label: 'Save', onPress: jest.fn() });
    expect(getByText('Save')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = renderButton({ label: 'Save', onPress });
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled', () => {
    const onPress = jest.fn();
    const { getByRole } = renderButton({ label: 'Save', onPress, disabled: true });
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not fire while loading', () => {
    const onPress = jest.fn();
    const { getByRole } = renderButton({ label: 'Save', onPress, loading: true });
    fireEvent.press(getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
