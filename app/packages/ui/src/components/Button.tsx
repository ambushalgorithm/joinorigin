import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
}

const StyledPressable = styled(Pressable)<{ $variant: ButtonVariant; $disabled: boolean }>`
  align-items: center;
  justify-content: center;
  min-height: ${({ theme }) => theme.spacing.xl + theme.spacing.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme, $variant, $disabled }) => {
    if ($disabled) {
      return theme.colors.border;
    }
    switch ($variant) {
      case 'secondary':
        return theme.colors.surfaceElevated;
      case 'destructive':
        return theme.colors.destructive;
      default:
        return theme.colors.primary;
    }
  }};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const labelColor: Record<ButtonVariant, 'primaryContrast' | 'text'> = {
  primary: 'primaryContrast',
  secondary: 'text',
  destructive: 'primaryContrast',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  testID,
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  return (
    <StyledPressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      testID={testID}
      $variant={variant}
      $disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors[labelColor[variant]]} />
      ) : (
        <Text variant="bodyLarge" weight="semibold" color={labelColor[variant]}>
          {label}
        </Text>
      )}
    </StyledPressable>
  );
}
